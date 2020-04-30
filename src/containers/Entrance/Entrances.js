import React, {useEffect, useState} from "react";

import {Grid, Typography} from "@material-ui/core";

import ItemList from "../../components/ItemList";
import {getAllEntrances} from "../../service/entranceService";

import "./Entrances.css"

export default function Entrances() {
  const [entrances, setEntrances] = useState([]);

  useEffect(() => {
    (async () => {
      const allEntrances = (await getAllEntrances()).data;
      setEntrances(allEntrances);
    })();
  }, []);

  return (
    <Grid container justify="center" className="Entrances" spacing={5}>
      <Grid item xs={12}>
        <Typography className="title" variant="h3">
          Popis ulaza
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ItemList items={entrances} getText={(item) => item.entranceName} getKey={(item) => item.id}/>
      </Grid>
    </Grid>
  );
}