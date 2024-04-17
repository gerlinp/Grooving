import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './HomePage'

function App() {
  return (
    <div id='app'>
      <HomePage />
    </div>
  )
}

const appDiv = document.getElementById('app')
ReactDOM.render(<App />, appDiv)
