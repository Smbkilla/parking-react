import React, {useEffect, useState} from "react";

import {Grid, Typography} from "@material-ui/core";

import ItemList from "../../components/ItemList";
import {getAllFloors} from "../../service/floorService";

import "./Floors.css"

export default function Floors() {
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    (async () => {
      const allFloors = (await getAllFloors()).data;
      setFloors(allFloors);
    })();
  }, []);

  const onEdit = (floor) => () => {

  };

  const onDelete = (floor) => () => {

  };

  return (
    <Grid container justify="center" className="Floors" spacing={5}>
      <Grid item xs={12}>
        <Typography className="title" variant="h3">
          Popis katova
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ItemList items={floors}
                  getText={item => item.level}
                  getKey={item => item.level}
                  onDelete={onDelete}
                  onEdit={onEdit}/>
      </Grid>
    </Grid>
  );
}