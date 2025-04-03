import React, { useEffect, useState } from 'react'
import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from './CreateRoomPage'
import Room from './Room'
import Info from './Info'
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'

function HomePage() {
  const [roomCode, setRoomCode] = useState(null)

  useEffect(() => {
    async function fetchUserInRoom() {
      const response = await fetch('/api/user-in-room')
      const data = await response.json()
      setRoomCode(data.code)
    }
    fetchUserInRoom()
  }, [])

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align='center'>
          <Typography variant='h3' compact='h3'>
            Groove
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <ButtonGroup disableElevation variant='contained' color='primary'>
            <Button color='primary' to='/join' component={Link}>
              Join a Room
            </Button>
            <Button color='default' to='/info' component={Link}>
              Info
            </Button>
            <Button color='secondary' to='/create' component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }

  const clearRoomCode = () => {
    setRoomCode(null)
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            return roomCode ? (
              <Redirect to={`/room/${roomCode}`} />
            ) : (
              renderHomePage()
            )
          }}
        />
        <Route path='/join' component={RoomJoinPage} />
        <Route path='/info' component={Info} />
        <Route path='/create' component={CreateRoomPage} />
        <Route
          path='/room/:roomCode'
          render={(props) => {
            return <Room {...props} leaveRoomCallback={clearRoomCode} />
          }}
        />
      </Switch>
    </Router>
  )
}

export default HomePage
