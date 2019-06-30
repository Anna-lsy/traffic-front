import { fromJS } from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
    loginStatus: false,
    username: '',
    password: '',
    who: '',
    name: '',
    phoneNumber: '',
    city_id: '',
    local:''
});

const changeLocal = (state, action) => {
    return state.merge({
        local: action.local
    });
};

const changeUserMessage = (state, action) => {
    return state.merge({
        loginStatus: action.data.result,
        username: action.data.username,
        password: action.data.password,
        who: action.data.who,
        name: action.data.name,
        phoneNumber: action.data.phoneNumber,
        city_id: action.data.city_id,
    });
};

const changeLogin = (state, action) => {
    return state.merge({
        loginStatus:false
    });
};

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_LOCAL:
            return changeLocal(state, action);
        case constants.CHANGE_USER_MESSAGE:
            return changeUserMessage(state, action);
        case constants.CHANGE_LOGIN:
            return changeLogin(state,action);
        default:
            return state;
    }
}