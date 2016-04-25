/**
 * Created by liekkas on 15/12/17.
 */
//import { ActionTypes } from '../actions'
//import { UPDATE_LOCATION } from 'react-router-redux'

const initState = {
  route: 'home',
  user: {
    id: 'No10000',
    name: 'root',
    role: 'admin',
  }
}

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}
