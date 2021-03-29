import { createStore } from 'redux'
import { appReducer } from './reducers/appReducer'

export default createStore(appReducer)