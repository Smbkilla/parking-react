import React from "react";

import {Grid, Typography, IconButton, List, ListItem} from "@material-ui/core";
import InputIcon from '@material-ui/icons/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import "./ItemList.css";

export default function ItemList({items, getText, getKey, onDelete, onEdit}) {
  return (
    <>
      <List className="List">
        {items.map(item => (
          <React.Fragment key={item.id}>
            <ListItem>
              <Grid container justify="space-between" key={getKey(item)} className="ItemGrid">
                <Grid item xs={7} direction="row" container justify="flex-start" spacing={2} alignContent="center" className="ItemInfo">
                  <Grid item>
                    <InputIcon/>
                  </Grid>
                  <Grid item>
                    <Typography>{getText(item)}</Typography>
                  </Grid>
                </Grid>
                <div className="spacer"></div>
                <Grid item xs={5} direction="row" container justify="flex-end" className="ItemActions">
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
    </>
  );
}