import React, { Component } from 'react'
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props)
  }

  skipSong() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/skip', requestOptions)
  }

  previousSong() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/previous', requestOptions)
  }

  pauseSong() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/pause', requestOptions)
  }

  playSong() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/play', requestOptions)
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100

    return (
      <div id='musicplayer'>
        <Grid id='musiccontainer' container alignItems='center'>
          <Grid id='music-img' item align='center'>
            <img src={this.props.image_url} height='100%' width='100%' />
          </Grid>

          <div id='music-btm'>
            <Grid align='center' xs={8}>
              <div id='song-info'>
                <Typography component='h5' variant='h5'>
                  {this.props.title}
                </Typography>
                <Typography color='textSecondary' variant='subtitle1'>
                  {this.props.artist}
                </Typography>
              </div>

              <LinearProgress variant='determinate' value={songProgress} />
              <div>
                <IconButton onClick={() => this.previousSong()}>
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    this.props.is_playing ? this.pauseSong() : this.playSong()
                  }}
                >
                  {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={() => this.skipSong()}>
                  {/* {this.props.votes} / {this.props.votes_required} */}
                  <SkipNextIcon />
                </IconButton>
              </div>
            </Grid>
          </div>
        </Grid>
      </div>
    )
  }
}
