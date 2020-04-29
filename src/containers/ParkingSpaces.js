import React from "react";

import {Grid, Button} from "@material-ui/core";

export default function ParkingSpaces(){
  return(
    <Grid container justify="center" className="Home">
      <Grid item xs={12}>
        <Button>button1</Button>
      </Grid>
      <Grid item xs={12}>
        <Button>button2</Button>
      </Grid>
      <Grid item xs={12}>
        <Button>button3</Button>
      </Grid>
    </Grid>
  )
}