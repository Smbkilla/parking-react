import React, {useEffect, useState} from "react";

import {Grid, Fab, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InputIcon from '@material-ui/icons/Input';

import ItemList from "../../components/ItemList/ItemList";
import EditEntranceDialog from "./EditEntranceDialog";
import {getAllEntrances, deleteEntrance, updateEntrance, createEntrance} from "../../service/entranceService";

import "./Entrances.css"

export default function Entrances() {
  const [entrances, setEntrances] = useState([]);
  const [open, setOpen] = useState(false);
  const [entrance, setEntrance] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    (async () => {
      await updateEntrances();
    })();
  }, []);

  const updateEntrances = async () => {
    const allEntrances = (await getAllEntrances()).data;
    setEntrances(allEntrances);
  };

  const onEdit = (item) => async () => {
    setEntrance(item);
    setEdit(true);
    setOpen(true);
  };

  const onAdd = () => {
    setEdit(false);
    setEntrance({});
    setOpen(true);
  };

  const onAddNew = (item) => async () => {
    await createEntrance(item);
    setOpen(false);
    await updateEntrances();
  };

  const onDelete = (item) => async () => {
    await deleteEntrance(item.id);
    setEntrances(entrances.filter(entrance => entrance.id !== item.id))
  };

  const onUpdate = (item) => async () => {
    await updateEntrance(item);
    setEntrances([...entrances.filter(entrance => entrance.id !== item.id), item]);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid container justify="center" className="Entrances" spacing={5} direction="column">
        <Grid item xs={12}>
          <Typography className="title" variant="h3">
            Popis ulaza
          </Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <ItemList items={entrances}
                    icon={<InputIcon color="primary"/>}
                    getText={(item) => item.entranceName}
                    getKey={(item) => item.id}
                    onDelete={onDelete}
                    onEdit={onEdit}/>
        </Grid>
        <EditEntranceDialog open={open} entrance={entrance} onClose={() => setOpen(false)} onUpdate={onUpdate} onAdd={onAddNew} edit={edit}/>
      </Grid>
      <div className="fab">
        <Fab color="primary" aria-label="add" onClick={onAdd}>
          <AddIcon/>
        </Fab>
      </div>
    </React.Fragment>
  );
}