import React, {useEffect, useState} from "react";

import _ from "lodash";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,} from "@material-ui/core";

const floorObject = (floor) => ({
  id: floor.id || "",
  level: _.get(floor, "level", ""),
});

export default function EditFloorDialog({edit, floor, open, onClose, onAdd, onUpdate}) {
  const [newFloor, setNewFloor] = useState(floorObject(floor));

  useEffect(() => {
    setNewFloor(floorObject(floor))
  }, [floor]);

  const onFloorNameChange = (e) => {
    const value = _.get(e, "target.value", "");
    setNewFloor({...floor, level: value});
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
            <TextField label="Ime ulaza"
                       required
                       fullWidth
                       variant="outlined"
                       value={newFloor.level}
                       onChange={onFloorNameChange}/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Zatvori</Button>
        <Button onClick={edit ? onUpdate(newFloor) : onAdd(newFloor)} color="primary" variant="contained">{edit ? "Uredi" : "Dodaj"}</Button>
      </DialogActions>
    </Dialog>
  );
}