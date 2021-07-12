import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.note_category == "work") {
        return yellow[700];
      }
      if (note.note_category == "money") {
        return green[500];
      }
      if (note.note_category == "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);

  const [elevationSize, setElevationSize] = useState(5);

  const changeElevationUp = () => {
    setElevationSize(10);
  };
  const changeElevationDown = () => {
    setElevationSize(5);
  };

  return (
    <div
      id="divContainer"
      onMouseEnter={changeElevationUp}
      onMouseLeave={changeElevationDown}
    >
      <Card elevation={elevationSize} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.note_category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => handleDelete(note.id)}
            >
              <DeleteOutlined />
            </IconButton>
          }
          title={note.note_title}
          subheader={note.note_category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.note_details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard;
