import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export function Info(props) {
  return (
    <div className="content">
      <Paper style={{ margin: 10, marginTop: -12, padding: 15 }} elevation={3}>
        <Typography variant="h5" component="h3">
          Read Daily Version 2023.0
        </Typography>
        <Typography variant="body1" gutterBottom>
          This plan provides a path through the Scriptures that is systematic
          and sustainable.
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
