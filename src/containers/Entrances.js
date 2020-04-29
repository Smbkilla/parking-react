import React, {useState, useEffect} from "react";

import {Grid, Button} from "@material-ui/core";
import {getAllEntrances} from "../service/entranceService";

export default function Entrances() {
  const [entrances, setEntrances] = useState([]);

  useEffect(() => {
    (async () => {
      const allEntrances = (await getAllEntrances()).data;
      setEntrances(allEntrances);
    })();
  }, []);

  return (
    <Grid container justify="center" className="Home">
      {entrances.map(entrance => (
        <Grid item xs={12} key={entrance.id}>
          <Button>{entrance.entranceName}</Button>
        </Grid>
      ))}
    </Grid>
  );
}