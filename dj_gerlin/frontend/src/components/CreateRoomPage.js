import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField } from '@material-ui/core'
import FormHelperText from '@material-ui/core'
import FormControl from '@material-ui/core'
import { Link } from 'react-router-dom'
import Radio from '@material-ui/core'
import RadioGroup from '@material-ui/core'
import FormControlLabel from '@material-ui/core'

export default class CreateRoomPage extends Component {
  defaultVotes = 2

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid itemxs={12} align='center'>
          <Typography component='h4' variant='h4'>
            Create A Room
          </Typography>
        </Grid>
        <Grid itemxs={12} align='center'>
          <FormControl component='fieldset'>
            <FormHelperText>
              <div align='center'>Guest Controls of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue='true'>
              <FormControlLabel
                value='true'
                control={<Radio color='primary' />}
                label='Play/Pause'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='false'
                control={<Radio color='secondary' />}
                label='No control'
                labelPlacement='bottom'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}
