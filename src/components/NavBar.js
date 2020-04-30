import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import HomeIcon from '@material-ui/icons/Home';
import InputIcon from '@material-ui/icons/Input';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default function NavBar(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory();

  const onMenuClicked = () => {
    setOpenDrawer(!openDrawer);
  };

  const onNavigationButtonClick = (path) => () => {
    history.push(path);
    setOpenDrawer(false);
  };

  return (
    <div className="root">
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className="toolbar-icon" color="inherit" aria-label="menu" onClick={onMenuClicked}>
            <MenuIcon/>
          </IconButton>
          <Typography className="toolbar-title">
            ParkMe
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={openDrawer}
              anchor="left">
        <div className="drawer-header">
          <IconButton onClick={onMenuClicked}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <ListItem button key="Home" onClick={onNavigationButtonClick("/")}>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary={"Home"}/>
          </ListItem>
          <ListItem button key="Parking space" onClick={onNavigationButtonClick("/parkingSpaces")}>
            <ListItemIcon><LocalParkingIcon/></ListItemIcon>
            <ListItemText primary={"Parking space"}/>
          </ListItem>
          <ListItem button key="Entrance" onClick={onNavigationButtonClick("/entrances")}>
            <ListItemIcon><InputIcon/></ListItemIcon>
            <ListItemText primary={"Entrance"}/>
          </ListItem>
          <ListItem button key="Floor" onClick={onNavigationButtonClick("/floors")}>
            <ListItemIcon><ViewStreamIcon/></ListItemIcon>
            <ListItemText primary={"Floor"}/>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}