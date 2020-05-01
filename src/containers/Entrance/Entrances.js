import React, {useEffect, useState} from "react";

import {Grid, Typography} from "@material-ui/core";

import ItemList from "../../components/ItemList/ItemList";
import EditEntranceDialog from "./EditEntranceDialog";
import {getAllEntrances, deleteEntrance, updateEntrance} from "../../service/entranceService";

import "./Entrances.css"

export default function Entrances() {
  const [entrances, setEntrances] = useState([]);
  const [open, setOpen] = useState(false);
  const [entrance, setEntrance] = useState({});

  useEffect(() => {
    (async () => {
      const allEntrances = (await getAllEntrances()).data;
      setEntrances(allEntrances);
    })();
  }, []);

  const onEdit = (item) => async () => {
    setEntrance(item);
    setOpen(true);
  };

  const onDelete = (item) => async () => {
    await deleteEntrance(item.id);
    setEntrances(entrances.filter(entrance => entrance.id !== item.id))
  };

  const onUpdate = (item) => async () => {
    await updateEntrance(item);
    setEntrances((await getAllEntrances()).data);
    setOpen(false);
  };

  return (
    <Grid container justify="center" className="Entrances" spacing={5}>
      <Grid item xs={12}>
        <Typography className="title" variant="h3">
          Popis ulaza
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ItemList items={entrances}
                  getText={(item) => item.entranceName}
                  getKey={(item) => item.id}
                  onDelete={onDelete}
                  onEdit={onEdit}/>
      </Grid>
      <EditEntranceDialog open={open} entrance={entrance} onClose={() => setOpen(false)} onAdd={onUpdate}/>
    </Grid>
  );
}