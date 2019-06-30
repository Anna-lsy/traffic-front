import { fromJS } from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
    cars: [],
    bans0: [],
    bans1: [],
    ban_id: "",
});

const changeCars = (state, action) => {
    return state.merge({
        cars: action.cars
    });
};

const changeBans0 = (state, action) => {
    return state.merge({
        bans0: action.bans0
    });
};

const changeBans1 = (state, action) => {
    return state.merge({
        bans1: action.bans1
    });
};

const changeBanID = (state, action) => {
    return state.merge({
        ban_id: action.id
    });
};

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_CARS:
            return changeCars(state, action);
        case constants.CHANGE_BANS0:
            return changeBans0(state, action);
        case constants.CHANGE_BANS1:
            return changeBans1(state, action);
        case constants.CHANGE_BAN_ID:
            return changeBanID(state, action);
        default:
            return state;
    }
}