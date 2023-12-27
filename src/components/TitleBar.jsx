import React from "react";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Close from "@mui/icons-material/Close";
import Info from "@mui/icons-material/Info";

function ReadingTitle(props) {
  const { loadedDay, onInfoClick } = props;
  return (
    <div className="title">
      <Typography variant="h5">{loadedDay.format("ddd, MMMM D")}</Typography>
      <Typography variant="subtitle2">
        <Button
          variant="contained"
          color="primary"
          size="small"
          endIcon={<Info />}
          onClick={onInfoClick}
        >
          Read Daily
        </Button>
      </Typography>
    </div>
  );
}

function InfoTitle(props) {
  return (
    <div className="title">
      <Typography variant="h5">About Read Daily</Typography>
    </div>
  );
}

export function ReadingTitleBar(props) {
  const { loadedDay, changeDay } = props;
  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => changeDay(loadedDay.subtract(1, "days"))}
        size="large">
        <ArrowBack />
      </IconButton>
      <ReadingTitle {...props} />
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={() => changeDay(loadedDay.add(1, "days"))}
        size="large">
        <ArrowForward />
      </IconButton>
    </Toolbar>
  );
}

export function InfoTitleBar(props) {
  const { onInfoClose } = props;
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" size="large">
        <Info />
      </IconButton>
      <InfoTitle />
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={onInfoClose}
        size="large">
        <Close />
      </IconButton>
    </Toolbar>
  );
}

export function TitleBar(props) {
  return props.showConfig ? (
    <InfoTitleBar {...props} />
  ) : (
    <ReadingTitleBar {...props} />
  );
}
