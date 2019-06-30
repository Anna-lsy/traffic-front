import { combineReducers} from "redux-immutable";
import { reducer as loginReducer } from '../page/login/store';
import { reducer as ownerReducer } from '../page/owner/store';
import { reducer as copReducer } from '../page/cop/store';
import { reducer as adminReducer } from '../page/admin/store';

const reducer = combineReducers({
    login: loginReducer,
    owner: ownerReducer,
    cop: copReducer,
    admin: adminReducer,
});

export default reducer;