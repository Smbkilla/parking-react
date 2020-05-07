import React, {useEffect, useState} from "react";

import {Grid, Fab, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ViewStreamIcon from "@material-ui/icons/ViewStream";

import ItemList from "../../components/ItemList/ItemList";
import EditFloorDialog from "./EditFloorDialog";
import {getAllFloors, createFloor, deleteFloor, updateFloor} from "../../service/floorService";

import "./Floors.css"

export default function Floors() {
  const [floors, setFloors] = useState([]);
  const [open, setOpen] = useState(false);
  const [floor, setFloor] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    (async () => {
      await updateFloors();
    })();
  }, []);

  const updateFloors = async () => {
    const allFloors = (await getAllFloors()).data;
    setFloors(allFloors);
  };

  const onEdit = (item) => async () => {
    setFloor(item);
    setEdit(true);
    setOpen(true);
  };

  const onAdd = () => {
    setEdit(false);
    setFloor({});
    setOpen(true);
  };

  const onAddNew = (item) => async () => {
    await createFloor(item);
    setOpen(false);
    await updateFloors();
  };

  const onDelete = (item) => async () => {
    await deleteFloor(item.id);
    setFloors(floors.filter(floor => floor.id !== item.id))
  };

  const onUpdate = (item) => async () => {
    await updateFloor(item);
    setFloors([...floors.filter(floor => floor.id !== item.id), item]);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid container justify="center" className="Floors" spacing={5}>
        <Grid item xs={12}>
          <Typography className="title" variant="h3">
            Popis katova
          </Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <ItemList items={floors}
                    icon={<ViewStreamIcon color="primary"/>}
                    getText={item => item.level}
                    getKey={item => item.level}
                    onDelete={onDelete}
                    onEdit={onEdit}/>
        </Grid>
      </Grid>
      <EditFloorDialog open={open} floor={floor} onClose={() => setOpen(false)} onUpdate={onUpdate} onAdd={onAddNew}
                       edit={edit}/>
      <div className="fab">
        <Fab color="primary" aria-label="add" onClick={onAdd}>
          <AddIcon/>
        </Fab>
      </div>
    </React.Fragment>
  );
}