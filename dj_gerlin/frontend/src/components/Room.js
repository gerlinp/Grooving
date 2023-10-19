import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import CreateRoomPage from './CreateRoomPage'
import MusicPlayer from './MusicPlayer'

function Room(props) {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
    spotifyAuthenticated: false,
    song: {},
  })
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)
  const roomCode = props.match.params.roomCode

  useEffect(() => {
    getRoomDetails()
    const interval = setInterval(getCurrentSong, 1000)

    return () => clearInterval(interval)
  }, [])

  const getRoomDetails = () => {
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallback()
          props.history.push('/')
        }
        return response.json()
      })
      .then((data) => {
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        })
        if (data.is_host) {
          authenticateSpotify()
        }
      })
  }

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails((prevState) => ({
          ...prevState,
          spotifyAuthenticated: data.status,
        }))

        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url)
            })
        }
      })
  }

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {}
        } else {
          return response.json()
        }
      })
      .then((data) => {
        setRoomDetails((prevState) => ({
          ...prevState,
          song: data,
        }))
      })
  }

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/api/leave-room', requestOptions).then((_response) => {
      props.leaveRoomCallback()
      props.history.push('/')
    })
  }

  const updateShowSettings = (value) => {
    setRoomDetails((prevState) => ({
      ...prevState,
      showSettings: value,
    }))
  }

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <CreateRoomPage
            update={true}
            votesToSkip={roomDetails.votesToSkip}
            guestCanPause={roomDetails.guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    )
  }

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    )
  }

  if (isSettingsVisible) {
    return renderSettings()
  }

  return (
    <Grid container spacing={1} justifyContent='center'>
      <Grid item xs={12} align='center'>
        <div variant='h4' component='h4'>
          Room Code: {roomCode}
        </div>
      </Grid>
      <MusicPlayer {...roomDetails.song} />
      <div id='btm-bar'>
        {roomDetails.isHost ? renderSettingsButton() : null}
        <Grid item xs={12} align='center'>
          <Button
            variant='contained'
            color='secondary'
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </div>
    </Grid>
  )
}

export default Room
