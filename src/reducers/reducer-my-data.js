
import { ACTION_SET  } from '../actions'

// puts on .wizardClaim because this file is assigned as 'wizardClaim' property in reducers/index
export default function (state = {}, action) {
    const { type, event} = action
    switch (type) {
        case ACTION_SET:
            return state
        default:
            return state
    }
}