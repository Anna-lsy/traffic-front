import * as constants from './constants';
import axios from 'axios';

const changeUsername = (data) => ({
    type: constants.CHANGE_USER_MESSAGE,
    data: data,
});

const changeLocal = (local) => ({
    type: constants.CHANGE_LOCAL,
    local: local,
});

export const setLocal = (local) => {
    return(dispatch) => {
        dispatch(changeLocal(local));
    }
};


const changeLogin = () => ({
    type: constants.CHANGE_LOGIN,
});

export const logout = () => {
    return(dispatch) => {
        dispatch(changeLogin());
    }
};

export const login = (userName, password, local, city_id) => {
    return(dispatch) => {
        // console.log('local5:',local);
        axios.post('http://localhost:'+local+'/getLoginResult',{
            userName: userName,
            password: password,
            city_id: city_id
        }).then((res) => {
        // axios.get('/api/getLoginResult.json',).then((res) => {
            let data = res.data;
            let result = data.result;
            console.log('result:',result);
            if(result === "1"){
                dispatch(changeUsername(data));
            }else if(result === "2"){
                alert('用户不存在');
            }else if(result === "3"){
                alert('用户名或密码错误');
            }
        }).catch((e) => {
            console.log(e.toString());
            alert('后台连接失败，请稍后再试');
        })
    }
};