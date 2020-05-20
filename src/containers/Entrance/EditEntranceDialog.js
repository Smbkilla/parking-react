import React, {useEffect, useState} from "react";

import _ from "lodash";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {getAllFloors} from "../../service/floorService";

const entranceObject = (entrance) => ({
  id: entrance.id || "",
  entranceName: entrance.entranceName || "",
  floor: {
    id: _.get(entrance, "floor.id", ""),
    level: _.get(entrance, "floor.level", ""),
  },
});

export default function EditEntranceDialog({edit, entrance, open, onClose, onAdd, onUpdate}) {
  const [newEntrance, setNewEntrance] = useState(entranceObject(entrance));
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    (async () => {
      const allFloors = (await getAllFloors()).data;
      setFloors(allFloors);
    })();
  }, []);

  useEffect(() => {
    setNewEntrance(entranceObject(entrance))
  }, [entrance]);

  const onEntranceNameChange = (e) => {
    const value = _.get(e, "target.value", "");
    setNewEntrance({
      ...newEntrance,
      entranceName: value,
    });
  };

  const onEntranceLevelChange = (e) => {
    const value = _.get(e, "target.value", "");
    const floor = floors.find(floor => floor.id === value);
    setNewEntrance({
      ...newEntrance,
      floor,
    });
  };

  return (
    <Dialog open={open}
            onClose={onClose}
            maxWidth="md"
            PaperProps={{className: "dialogPaper"}}>
      <DialogTitle>{edit ? "Dodaj novi ulaz" : "Uredi ulaz"}</DialogTitle>
      <DialogContent className="content">
        <Grid container spacing={2} alignContent="space-between">
          <Grid item xs={12}>
            <TextField label="Ime ulaza"
                       required
                       fullWidth
                       variant="outlined"
                       value={newEntrance.entranceName}
                       onChange={onEntranceNameChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Kat"
                       required
                       variant="outlined"
                       select
                       fullWidth
                       value={newEntrance.floor.id}
                       onChange={onEntranceLevelChange}>
              {floors.map(floor => <MenuItem value={floor.id} key={floor.id}>{floor.level}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Zatvori</Button>
        <Button onClick={edit ? onUpdate(newEntrance) : onAdd(newEntrance)} color="primary" variant="contained">{edit ? "Uredi" : "Dodaj"}</Button>
      </DialogActions>
    </Dialog>
  );
}