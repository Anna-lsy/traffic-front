import { fromJS } from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
    cops: [],
    users: [],
    id: '',
    password: '',
});

const changeCops = (state, action) => {
    return state.merge({
        cops: action.cops
    });
};

const changeUsers = (state, action) => {
    return state.merge({
        users: action.users
    });
};

const changeId = (state, action) => {
    return state.merge({
        id: action.id
    });
};

const changePassword = (state, action) => {
    return state.merge({
        password: action.password
    });
};

const changeEditMessage = (state, action) => {
    return state.merge({
        id: action.id,
        password: action.password
    });
};


export default (state = defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_COPS:
            return changeCops(state, action);
        case constants.CHANGE_USERS:
            return changeUsers(state, action);
        case constants.CHANGE_ID:
            return changeId(state, action);
        case constants.CHANGE_PASSWORD:
            return changePassword(state, action);
        case constants.CHANGE_EDIT_MESSAGE:
            return changeEditMessage(state, action);
        default:
            return state;
    }
}