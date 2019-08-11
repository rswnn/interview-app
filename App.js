import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import Navigation from './src/Navigation'

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    )
  }
}

export default App
