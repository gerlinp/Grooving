import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography, IconButton } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { Link } from 'react-router-dom'

export default function Info(props) {
    const [page, setPage]
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
        <Typography component='h4' variant='h4'>
          What is Groove?
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color='secondary' variant='contained' to='/' component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  )
}
