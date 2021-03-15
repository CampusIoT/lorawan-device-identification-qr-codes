import { createStore } from 'redux'
import { scanReducer } from './reducers/scanReducer'

export default createStore(scanReducer)