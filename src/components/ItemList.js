import React from "react";

import {Grid, Typography} from "@material-ui/core";
import InputIcon from '@material-ui/icons/Input';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

import "./ItemList.css";

export default function ItemList({items, getText, getKey, onDelete, onEdit}) {
  return (
    <List className="List">
      {items.map(item => (
        <React.Fragment key={item.id}>
          <ListItem>
            <Grid container justify="space-between" key={getKey(item)}>
              <Grid item xs={11} direction="row" container justify="flex-start" spacing={2}>
                <Grid item>
                  <InputIcon/>
                </Grid>
                <Grid item>
                  <Typography>{getText(item)}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={1} direction="row" container justify="space-between">
                <Grid item>
                  <IconButton onClick={onDelete(item)}>
                    <DeleteIcon/>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={onEdit(item)}>
                    <EditIcon/>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          {item !== items[items.length - 1]
          && <div className="divider"></div>}
        </React.Fragment>
      ))}
    </List>
  );
}