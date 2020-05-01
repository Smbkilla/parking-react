import React, {useEffect, useState} from "react";

import {Grid, Button, Typography} from "@material-ui/core";

import {getAllEntrances} from "../../service/entranceService";
import {getClosestParkingSpace, numberOfUnoccupiedSpaces} from "../../service/parkingSpaceService";

import "./Home.css";

export default function Home() {
  const [entrances, setEntrances] = useState([]);
  const [numberOfFreeSpaces, setNumberOfFreeSpaces] = useState(0);

  useEffect(() => {
    (async () => {
      const allEntrances = (await getAllEntrances()).data;
      setEntrances(allEntrances);
      const number = (await numberOfUnoccupiedSpaces()).data;
      setNumberOfFreeSpaces(number);
    })();
  }, []);

  const onEntranceClick = (entranceId) => async () => {
    await getClosestParkingSpace(entranceId).then(res => {
      console.log(res.data);
    });
    await numberOfUnoccupiedSpaces().then(res => {
      setNumberOfFreeSpaces(res.data);
    })
  };

  return (
    <Grid container justify="center" className="Home" spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h3">
          Odaberi ulaz
        </Typography>
      </Grid>
      <Grid item xs={12} className="countHeader">
        Broj slobodnih mjesta
        <span className={`count ${numberOfFreeSpaces ? "active" : ""}`}>
          {numberOfFreeSpaces}
        </span>
      </Grid>
      <Grid item xs={12}>
        {entrances.map(entrance => (
          <Button key={entrance.id} onClick={onEntranceClick(entrance.id)}>{entrance.entranceName}</Button>
        ))}
      </Grid>
    </Grid>
  );
}