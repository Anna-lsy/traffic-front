import React, { PureComponent, Fragment } from 'react';

import { connect } from 'react-redux';

import './style/css/dashboard.css';
import './style/plugins/charts-c3/plugin.css';
import './style/plugins/maps-google/plugin.css';
import { actionCreators } from './store';
import { actionCreators as loginactionCreators} from '../login/store';
import { Link } from 'react-router-dom';
import {actionCreators as owneractionCreators} from "../owner/store";
class Admin extends PureComponent{

    componentWillMount() {
        this.props.init(this.props.local);
    }

    handleDelete = (username) => {
        const id = username;
        const local = this.props.local;

        this.props.deleteUser(id ,local);
    };

    handleCars = (username,password) => {
        const id = username;
        const local = this.props.local;
        this.props.setEditMessage(id,password);
        this.props.getCars1(id ,local);
    };

    render(){

        const { cops, users, cars, id, password} = this.props;
        const { setId, setPassword,  setEditMessage, logout, deleteOwner} = this.props;

        return(
            <Fragment>
                <div className="page">
                    <div className="page-main">
                        <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-3 ml-auto">
                                        <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                                            <li className="nav-item">
                                                <i className="fe fe-log-out"></i><Link  to="/"  onClick={()=>logout()} >退出</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 my-md-5">
                            <div className="container">
                                <h3>车主</h3>
                                <div className="btn btn-secondary btn-sm ">
                                    <Link  to="/admin/addOwner" >添加</Link>
                                </div>
                                <div className="row">
                                    {
                                        users.map((user)=> {
                                            return <div className="col-md-6 col-xl-4">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">信息</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>&ensp;</p>
                                                        <p>姓名：{user.name}</p>
                                                        <p>身份证号：{user.username}</p>
                                                        <p>密码：{user.password}</p>
                                                        <div className="btn btn-secondary btn-sm ">
                                                            <Link  to="/admin/change" onClick={() => setEditMessage(user.username, user.password)}>修改</Link>
                                                        </div>
                                                        <div className="btn btn-secondary btn-sm ">
                                                            <Link  to="/admin/checkCar" onClick={() => this.handleCars(user.username,user.password)} >查看车辆</Link>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn-secondary btn-sm "
                                                                type="submit"
                                                                id="form-submit"
                                                                onClick={()=>this.handleDelete(user.username)}
                                                            >删除</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                                <h3>警察</h3>
                                <div className="btn btn-secondary btn-sm ">
                                    <Link  to="/admin/addCop" >添加</Link>
                                </div>
                                <div className="row">

                                    {
                                        cops.map((cop) => {
                                            return <div className="col-md-6 col-xl-4">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">信息</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>&ensp;</p>
                                                        <p>姓名：{cop.name}</p>
                                                        <p>编号：{cop.username}</p>
                                                        <p>密码：{cop.password}</p>
                                                        <div className="btn btn-secondary btn-sm ">
                                                            <Link  to="/admin/change" onClick={() => setEditMessage(cop.username, cop.password)}>修改</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <script src="./style/js/require.min.js"/>
                <script src="./style/plugins/input-mask/plugin.js"/>

                <script src="./style/plugins/maps-google/plugin.js"/>
                <script src="./style/plugins/charts-c3/plugin.js"/>
                <script src="./style/js/dashboard.js"/>
            </Fragment>
        )
    }
}

const mapState = (state) => ({
    city_id: state.getIn(['login', 'city_id']),
    cops: state.getIn(['admin', 'cops']),
    users: state.getIn(['admin', 'users']),
    id: state.getIn(['admin', 'id']),
    cars: state.getIn(['owner', 'cars']),

    password: state.getIn(['admin', 'password']),
    local: state.getIn(['login', 'local'])
});

const mapDispatchToProps = (dispatch) => ({
    init(local){
        dispatch(actionCreators.getCops(local));
        dispatch(actionCreators.getUsers(local));
    },
    getCars1(id, local){
        console.log('id:',id);
        console.log('l:',local);
        dispatch(owneractionCreators.getCars1(id, local));
    },
    setId(id){
        dispatch(actionCreators.setId(id));
    },
    setPassword(password){
        console.log(password);
        dispatch(actionCreators.setPassword(password));
    },
    setEditMessage(id, password){
        dispatch(actionCreators.setEditMessage(id, password));
    },
    edit(id, password ,local){
        dispatch(actionCreators.edit(id, password ,local));
    },
    logout(){
        dispatch(loginactionCreators.logout());
    },
    deleteUser(id ,local){
        dispatch(actionCreators.deleteUser(id ,local));
    }
});

export default connect(mapState, mapDispatchToProps)(Admin);