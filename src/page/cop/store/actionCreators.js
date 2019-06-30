import * as constants from './constants';
import axios from 'axios';

export const ban = (cop_id, car_id, message, fine, time ,local, city_id) => {
    return(dispatch) => {
        axios.post('http://localhost:'+local+'/ban',{
            cop_id: cop_id,
            car_id: car_id,
            message: message,
            fine: fine,
            time: time,
            city_id: city_id
        }).then((res) => {
        // axios.get('/api/ban.json',).then((res) => {

            let data = res.data;
            let result = data.result;
            console.log('result:',result);
            if(result === "1"){
                alert('成功！');
            }else if(result === "2"){
                alert('车牌号不存在！');
            }
        }).catch((e) => {
            console.log(e);
            alert('后台连接失败，请稍后再试！');
        })
    }
};