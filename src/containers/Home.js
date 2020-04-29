import React, {useEffect, useState} from "react";

import {Grid, Button} from "@material-ui/core";

import {getAllEntrances} from "../service/entranceService";
import {getClosestParkingSpace} from "../service/parkingSpaceService";

export default function Home(){
  const [entrances, setEntrances] = useState([]);

  useEffect(() => {
    (async () => {
      const allEntrances = (await getAllEntrances()).data;
      setEntrances(allEntrances);
    })();
  }, []);

  const onEntranceClick = (entranceId) => async () => {
    await getClosestParkingSpace(entranceId).then(res => {
      console.log(res.data);
    });
  };

  return (
    <Grid container justify="center" className="Home">
      {entrances.map(entrance => (
        <Grid item xs={12} key={entrance.id}>
          <Button onClick={onEntranceClick(entrance.id)}>{entrance.entranceName}</Button>
        </Grid>
      ))}
    </Grid>
  );
}