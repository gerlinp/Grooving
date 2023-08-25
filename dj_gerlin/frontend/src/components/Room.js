import React, { component } from 'react'

export default class Room extends component {
  constructor(props) {
    super(props)
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: False,
    }
  }

  render() {
    return (
      <div>
        <p>Votes: {this.state.votesToSkip}</p>
        <p>Guest Can Pause: {this.state.guestCanPause}</p>
        <p>Host: {this.state.isHost}</p>
      </div>
    )
  }
}
