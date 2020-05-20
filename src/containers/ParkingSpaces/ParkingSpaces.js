import React, {useEffect, useState} from "react";

import {Grid, Fab, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LocalParkingIcon from "@material-ui/icons/LocalParking";

import EditParkingSpaceDialog from "./EditParkingSpaceDialog";
import ItemList from "../../components/ItemList/ItemList";
import occupationTypeConstants from "../../constants/occupationTypes";
import {
  createParkingSpace,
  deleteParkingSpace,
  getAllParkingSpaces,
  updateParkingSpace
} from "../../service/parkingSpaceService";

import "./ParkingSpaces.css"
import ViewStreamIcon from "@material-ui/icons/ViewStream";

export default function ParkingSpaces() {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [parkingSpace, setParkingSpace] = useState({});
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    (async () => {
      await updateParkingSpaces();
    })();
  }, []);

  const updateParkingSpaces = async () => {
    const allParkingSpaces = (await getAllParkingSpaces()).data;
    setParkingSpaces(allParkingSpaces);
  };

  const onEdit = (item) => async () => {
    setParkingSpace(item);
    setEdit(true);
    setOpen(true);
  };

  const onAdd = () => {
    setEdit(false);
    setParkingSpace({});
    setOpen(true);
  };

  const onAddNew = (item) => async () => {
    await createParkingSpace(item);
    setOpen(false);
    await updateParkingSpaces();
  };

  const onDelete = (item) => async () => {
    await deleteParkingSpace(item.id);
    setParkingSpaces(parkingSpaces.filter(parkingSpace => parkingSpace.id !== item.id))
  };

  const onUpdate = (item) => async () => {
    await updateParkingSpace(item);
    setParkingSpaces([...parkingSpaces.filter(parkingSpace => parkingSpace.id !== item.id), item]);
    setOpen(false);
  };

  const itemAdditionalInfo = (item) => {
    let text = "";
    if (item.occupied) {
      text = occupationTypeConstants.OCCUPIED;
    } else if (item.reserved) {
      text = occupationTypeConstants.RESERVED;
    } else {
      text = occupationTypeConstants.FREE;
    }

    return (
      <Grid item className={`status${text}`}>
        {text}
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Grid container justify="center" className="ParkingSpaces" spacing={5}>
        <Grid item xs={12}>
          <Typography className="title" variant="h3">
            Popis parkirnih mjesta
          </Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <ItemList items={parkingSpaces}
                    getText={item => `${item.section}${item.spaceNumber}, ${item.floor.level}`}
                    getKey={item => item.id}
                    icon={<LocalParkingIcon color="primary"/>}
                    onDelete={onDelete}
                    additionalInfo={itemAdditionalInfo}
                    onEdit={onEdit}/>
        </Grid>
      </Grid>
      <EditParkingSpaceDialog open={open}
                              parkingSpace={parkingSpace}
                              onClose={() => setOpen(false)}
                              onUpdate={onUpdate}
                              onAdd={onAddNew}
                              edit={edit}/>
      <div className="fab">
        <Fab color="primary" aria-label="add" onClick={onAdd}>
          <AddIcon/>
        </Fab>
      </div>
    </React.Fragment>
  );
}