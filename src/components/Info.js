import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export function Info(props) {
  return (
    <div className='page'>
      <Paper style={{ margin: 10, marginTop: -12, padding: 15 }} elevation={3}>
        <Typography variant="h5" component="h3">
          Read Daily Version 2020.0
        </Typography>
        <Typography variant="body1" gutterBottom>
          This plan aims to provide readers with a path
          through the Scriptures that is systematic,
          sustainable, and spirituality nourishing.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Old Testament history and prophets can be
          covered in one or two years.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The New Testament, along with Old Testament
          wisdom literature, is covered each year — with
          the Four Gospels read twice and the Proverbs
          read three times annually.
        </Typography>
      </Paper>
    </div>
  )
}
