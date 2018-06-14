import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'

import MyData from './reducer-my-data'

const rootReducer = combineReducers({
    myData: MyData
})

export default rootReducer