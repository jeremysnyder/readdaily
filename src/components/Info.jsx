import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function Info(props) {
  return (
    <div className="content">
      <Paper style={{ margin: 10, marginTop: -12, padding: 15 }} elevation={3}>
        <Typography variant="h5" component="h3">
          Read Daily Version 2024.0
        </Typography>
        <Typography variant="body1" gutterBottom>
          This plan provides a path through the Scriptures that is systematic
          and sustainable.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b><i>New in 2024:</i></b><br/>
          The Family Reading Plan: an overview of the Bible in a year, with selections
          from OT narratives, psalms, prophecy, then portions of the Gospels, Acts, a few epistles, and selections from Revelation.
          Each day has a single chapter that a family could read together.
          Select the Family Readings option from the selections at the bottom of your screen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Psalms are read twice and the New Testament once in each year.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Old Testament is divided into three portions, allowing it to be
          read in 1-3 years.
        </Typography>
      </Paper>
    </div>
  );
}
