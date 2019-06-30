import * as constants from './constants';
import axios from 'axios';
import {actionCreators} from "./index";
import {actionCreators as owneractionCreators} from "../../owner/store";

const changeCops = (cops) => ({
    type: constants.CHANGE_COPS,
    cops: cops,
});

const changeUsers = (users) => ({
    type: constants.CHANGE_USERS,
    users: users,
});

const changeId = (id) => ({
    type: constants.CHANGE_ID,
    id: id,
});

const changePassword = (password) => ({
    type: constants.CHANGE_PASSWORD,
    password: password,
});

const changeEditMessage = (id, password) => ({
    type: constants.CHANGE_EDIT_MESSAGE,
    id: id,
    password: password,
});




export const getCops = (local) => {
    return(dispatch) => {
        axios.get('http://localhost:'+local+'/getCops').then((res) => {
        // axios.get('/api/getCops.json',).then((res) => {
            let data = res.data;
            // console.log(data);
            let cops = data;

            dispatch(changeCops(cops));
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const getUsers = (local) => {
    return(dispatch) => {
        axios.get('http://localhost:'+local+'/getOwners').then((res) => {
        // axios.get('/api/getUsers.json',).then((res) => {
            let data = res.data;
            // console.log(data);
            let users = data;

            dispatch(changeUsers(users));
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const setId = (id) => {
    return(dispatch) => {
        dispatch(changeId(id));
    }
};

export const setPassword = (password) => {
    return(dispatch) => {
        dispatch(changePassword(password));
    }
};

export const setEditMessage = (id, password) => {
    return(dispatch) => {
        dispatch(changeEditMessage(id, password));
    }
};



export const edit = (id, password, local) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/edit',{
            userName: id,
            password: password
        }).then((res) => {
        // axios.get('/api/edit.json',).then((res) => {
            let data = res.data;
            let result = data.result;

            console.log(data);
            if(result === "1"){
                alert('修改成功！');
                dispatch(setEditMessage("", ""));
            }else if(result === "2"){
                alert('用户不存在！');
            }
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const addOwner = (id, password, name, phone, local) => {
    return(dispatch) => {
        console.log("username:",name);
        axios.post('http://localhost:'+local+'/addOwner',{
            userName: id,
            password: password,
            name:name,
            phone:phone,
            local:local
        }).then((res) => {
            // axios.get('/api/edit.json',).then((res) => {
            let data = res.data;
            let result = data.result;
            console.log(data);
            if(result === "1"){
                alert('添加成功！');
            }
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const addCop = (id, password, name, phone, local) => {
    return(dispatch) => {
        console.log("username:",name);
        axios.post('http://localhost:'+local+'/addCop',{
            userName: id,
            password: password,
            name:name,
            phone:phone,
            local:local
        }).then((res) => {
            // axios.get('/api/edit.json',).then((res) => {
            let data = res.data;
            let result = data.result;
            console.log(data);
            if(result === "1"){
                alert('添加成功！');
            }
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const addCar = (id,carid ,local) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/addCar',{
            userName: id,
            carid: carid,
            local:local
        }).then((res) => {
            // axios.get('/api/edit.json',).then((res) => {
            let data = res.data;
            let result = data.result;
            console.log(data);
            if(result === "1"){
                alert('添加成功！');
                dispatch(owneractionCreators.getCars1(id, local));
            }
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const deleteUser = (id, local) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/deleteUser',{
            userName: id,

        }).then((res) => {
            // axios.get('/api/edit.json',).then((res) => {
            let data = res.data;
            let result = data.result;
            console.log(data);
            if(result === "1"){
                alert('删除成功！');
                dispatch(actionCreators.getCops(local));
                dispatch(actionCreators.getUsers(local));
            }
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const deleteCar = (id, local) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/deleteCar',{
            car: id
        }).then((res) => {
            // axios.get('/api/edit.json',).then((res) => {
            let data = res.data;
            let result = data.result;
            console.log(data);
            if(result === "1"){
                alert('删除成功！');
                dispatch(owneractionCreators.getCars1(id, local));
            }
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};


