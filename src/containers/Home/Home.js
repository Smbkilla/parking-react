import React, {useEffect, useState} from "react";

import {
  Grid,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog
} from "@material-ui/core";

import {getAllEntrances} from "../../service/entranceService";
import {getClosestParkingSpace, numberOfUnoccupiedSpaces} from "../../service/parkingSpaceService";

import "./Home.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import image from "../../images/155.png"
import MenuItem from "@material-ui/core/MenuItem";

export default function Home() {
  const [entrances, setEntrances] = useState([]);
  const [numberOfFreeSpaces, setNumberOfFreeSpaces] = useState(0);
  const [closestParkingSpace, setClosestParkingSpace] = useState({});
  const [open, setOpen] = useState(false);

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
      if (res.data) {
        setClosestParkingSpace(res.data);
        setOpen(true);
      }
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
      {entrances.map(entrance => (
        <Grid item>
          <Card className="root">
            <CardActionArea onClick={onEntranceClick(entrance.id)}>
              <CardMedia className="media"
                         image={image}
                         title="Contemplative Reptile"/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {`Ulaz ${entrance.entranceName}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Kat: ${entrance.floor.level}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Dialog open={open}
              onClose={() => setOpen(false)}
              maxWidth="md"
              PaperProps={{className: "dialogPaper"}}>
        <DialogTitle>Otiđite na parkirno mjesto</DialogTitle>
        <DialogContent className="content">
          <Grid container spacing={2} alignContent="space-between">
            <Grid item xs={12}>
              <Typography className="parkingSpaceTitle" variant="h1" align="center">
                {`${closestParkingSpace.section}${closestParkingSpace.spaceNumber}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                {`KAT: ${closestParkingSpace.floor ? closestParkingSpace.floor.level : ""}`}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" variant="contained">Ok</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}