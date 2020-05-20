import React, {useEffect, useState} from "react";

import _ from "lodash";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,} from "@material-ui/core";
import {getAllFloors} from "../../service/floorService";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const parkingSpaceObject = (parkingSpace) => ({
  id: parkingSpace.id || "",
  section: parkingSpace.section || "",
  spaceNumber: _.get(parkingSpace, "spaceNumber", ""),
  floor: {
    id: _.get(parkingSpace, "floor.id", ""),
    level: _.get(parkingSpace, "floor.level", ""),
  },
  occupied: _.get(parkingSpace, "occupied", ""),
  reserved: _.get(parkingSpace, "reserved", ""),
  sensorId: _.get(parkingSpace, "sensorId", ""),
});

export default function EditParkingSpaceDialog({edit, parkingSpace, open, onClose, onAdd, onUpdate}) {
  const [newParkingSpace, setNewParkingSpace] = useState(parkingSpaceObject(parkingSpace));
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    setNewParkingSpace(parkingSpaceObject(parkingSpace))
  }, [parkingSpace]);

  useEffect(() => {
    (async () => {
      const allFloors = (await getAllFloors()).data;
      setFloors(allFloors);
    })();
  }, []);

  const onParkingSpaceSectionChange = (e) => {
    const value = _.get(e, "target.value", "");
    setNewParkingSpace({...newParkingSpace, section: value});
  };

  const onParkingSpaceNumberChange = (e) => {
    const value = _.get(e, "target.value", "");
    setNewParkingSpace({...newParkingSpace, spaceNumber: value});
  };

  const onParkingSpaceSensorIdChange = (e) => {
    const value = _.get(e, "target.value", "");
    setNewParkingSpace({...newParkingSpace, sensorId: value});
  };

  const onParkingSpaceOccupiedChange = () => {
    setNewParkingSpace({...newParkingSpace, occupied: !newParkingSpace.occupied});
  };

  const onParkingSpaceReservedChange = () => {
    setNewParkingSpace({...newParkingSpace, reserved: !newParkingSpace.reserved});
  };

  const onParkingSpaceLevelChange = (e) => {
    const value = _.get(e, "target.value", "");
    const floor = floors.find(floor => floor.id === value);
    setNewParkingSpace({
      ...newParkingSpace,
      floor,
    });
  };

  return (
    <Dialog open={open}
            onClose={onClose}
            maxWidth="md"
            PaperProps={{className: "dialogPaper"}}>
      <DialogTitle>{edit ? "Dodaj novi kat" : "Uredi kat"}</DialogTitle>
      <DialogContent className="content">
        <Grid container spacing={2} alignContent="space-between">
          <Grid item xs={12}>
            <TextField label="Sekcija"
                       required
                       fullWidth
                       variant="outlined"
                       value={newParkingSpace.section}
                       onChange={onParkingSpaceSectionChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Broj mjesta"
                       required
                       fullWidth
                       variant="outlined"
                       value={newParkingSpace.spaceNumber}
                       onChange={onParkingSpaceNumberChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Kat"
                       required
                       variant="outlined"
                       select
                       fullWidth
                       value={newParkingSpace.floor.id}
                       onChange={onParkingSpaceLevelChange}>
              {floors.map(floor => <MenuItem value={floor.id} key={floor.id}>{floor.level}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Is senzora"
                       required
                       fullWidth
                       variant="outlined"
                       value={newParkingSpace.sensorId}
                       onChange={onParkingSpaceSensorIdChange}/>
          </Grid>
          <Grid item xs={12} justify="center">
            <FormControlLabel
              control={<Switch
                checked={newParkingSpace.occupied}
                onChange={onParkingSpaceOccupiedChange}
                name="occupied"/>}
              label="Zauzeto"
            />
            <FormControlLabel
              control={<Switch
                checked={newParkingSpace.reserved}
                onChange={onParkingSpaceReservedChange}
                name="reserved"/>}
              label="Rezervirano"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Zatvori</Button>
        <Button onClick={edit ? onUpdate(newParkingSpace) : onAdd(newParkingSpace)} color="primary" variant="contained">{edit ? "Uredi" : "Dodaj"}</Button>
      </DialogActions>
    </Dialog>
  );
}