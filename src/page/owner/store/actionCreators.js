import * as constants from './constants';
import axios from 'axios';

const changeCars = (cars) => ({
    type: constants.CHANGE_CARS,
    cars: cars,
});

const changeBans0 = (bans0) => ({
    type: constants.CHANGE_BANS0,
    bans0: bans0,
});

const changeBans1 = (bans1) => ({
    type: constants.CHANGE_BANS1,
    bans1: bans1,
});

const changeBanID = (id) => ({
    type: constants.CHANGE_BAN_ID,
    id: id,
});

export const getCars = (id,local, city_id) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/getCars',{
            id: id,
            city_id: city_id
        }).then((res) => {
        // axios.get('/api/getCars.json',).then((res) => {
            let data = res.data;
            let cars = data;

            // console.log('cars:', cars);
            dispatch(changeCars(cars));
        }).catch((e) => {
            console.log('getCars:',e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const getCars1 = (id,local) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/getCars1',{
            id: id
        }).then((res) => {
            // axios.get('/api/getCars.json',).then((res) => {
            let data = res.data;
            let cars = data;

            // console.log('cars:', cars);
            dispatch(changeCars(cars));
        }).catch((e) => {
            console.log('getCars1:',e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const getBans0 = (id,local, city_id) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/getBans0',{
            id: id,
            city_id: city_id
        }).then((res) => {
            // axios.get('/api/getBans.json',).then((res) => {
            let data = res.data;
            let bans0 = data;

            // console.log('bans0:', bans0);
            dispatch(changeBans0(bans0));
        }).catch((e) => {
            console.log('getBans:',e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const getBans1 = (id,local, city_id) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/getBans1',{
            id: id,
            city_id: city_id
        }).then((res) => {
        // axios.get('/api/getBans.json',).then((res) => {
            let data = res.data;
            let bans1 = data;

            // console.log('bans1:', bans1);
            dispatch(changeBans1(bans1));
        }).catch((e) => {
            console.log('getBans:',e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};

export const setBanID = (id) => {
    return(dispatch) => {
        dispatch(changeBanID(id));
    }
};

export const charge = (oid, ban_id ,local) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/charge',{
            ban_id: ban_id
        }).then((res) => {
        // axios.get('/api/charge.json',).then((res) => {
            let data = res.data;
            let result = data.result;

            console.log(oid);
            if(result === "1"){
                alert('缴费成功！');
                dispatch(changeBanID(""));
                dispatch(getBans0(oid ,local));
                dispatch(getBans1(oid ,local));
            }else if(result === "2"){
                alert('罚单不存在！\n请检查违章单号是否正确');
            }else if(result === "3"){
                alert('罚单已缴过费！\n请检查违章单号是否正确');
            }
        }).catch((e) => {
            console.log('charge:',e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};