import React, {useEffect, useState} from "react";

import {Grid, Typography} from "@material-ui/core";

import ItemList from "../../components/ItemList";
import {getAllParkingSpaces} from "../../service/parkingSpaceService";

import "./ParkingSpaces.css"

export default function ParkingSpaces() {
  const [parkingSpaces, setParkingSpaces] = useState([]);

  useEffect(() => {
    (async () => {
      const allParkingSpaces = (await getAllParkingSpaces()).data;
      setParkingSpaces(allParkingSpaces);
    })();
  }, []);

  return (
    <Grid container justify="center" className="ParkingSpaces" spacing={5}>
      <Grid item xs={12}>
        <Typography className="title" variant="h3">
          Popis parkirnih mjesta
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ItemList items={parkingSpaces} getText={item => `${item.section}${item.spaceNumber}, ${item.floor.level}`} getKey={item => item.id}/>
      </Grid>
    </Grid>
  );
}