import React from 'react'
import { IconButton, LinearProgress } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'

function MusicPlayer(props) {
  const skipSong = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/skip', requestOptions)
  }

  const previousSong = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/previous', requestOptions)
  }

  const pauseSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/pause', requestOptions)
  }

  const playSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/play', requestOptions)
  }

  const songProgress = (props.time / props.duration) * 100

  return (
    <div id='musicplayer'>
      <div id='musiccontainer' container alignItems='center'>
        <div id='music-img' item align='center'>
          <img
            src={props.image_url}
            height='100%'
            width='100%'
            alt='Album Cover'
          />
        </div>

        <div id='music-btm'>
          <div align='center' xs={8}>
            <div id='song-info'>
              <div component='h5' variant='h5'>
                {props.title}
              </div>
              <div color='textSecondary' variant='subtitle1'>
                {props.artist}
              </div>
            </div>

            <LinearProgress variant='determinate' value={songProgress} />
            <div>
              <IconButton onClick={previousSong}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  props.is_playing ? pauseSong() : playSong()
                }}
              >
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={skipSong}>
                <SkipNextIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
