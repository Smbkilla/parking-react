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
    level: _.get(entrance, "floor.level", ""),
  },
});

export default function EditEntranceDialog({edit, entrance, open, onClose, onAdd}) {
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
    setNewEntrance({
      ...newEntrance,
      floor: {
        level: value,
      },
    });
  };

  return (
    <Dialog open={open}
            onClose={onClose}
            maxWidth="md"
            PaperProps={{className: "dialogPaper"}}>
      <DialogTitle>Uredi ulaz</DialogTitle>
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
                       value={newEntrance.floor.level}
                       onChange={onEntranceLevelChange}>
              {floors.map(floor => <MenuItem value={floor.level} key={floor.level}>{floor.level}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zatvori</Button>
        <Button onClick={onAdd(newEntrance)}>Uredi</Button>
      </DialogActions>
    </Dialog>
  );
}