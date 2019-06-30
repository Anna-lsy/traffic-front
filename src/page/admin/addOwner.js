import React, { PureComponent, Fragment } from 'react';

import { connect } from 'react-redux';

import './style/css/dashboard.css';
import './style/plugins/charts-c3/plugin.css';
import './style/plugins/maps-google/plugin.css';
import { actionCreators } from './store';
import { actionCreators as loginactionCreators} from '../login/store';
import { Link } from 'react-router-dom';
class Admin extends PureComponent{

    componentWillMount() {
        this.props.init(this.props.local);
    }

    handleAddOwner = () => {
        const id = this.refs.id.value;
        const password = this.refs.password.value;
        const phone = this.refs.phone.value;
        const name = this.refs.name.value;
        const local = this.props.local;

        this.props.addOwner(id, password, name, phone ,local);
    };

    render(){

        const {id, password, phone, name} = this.props;
        const { logout} = this.props;

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
                                <div className="row">
                                    <div className="col-md-6 col-xl-4">

                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">添加车主</h3>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <div className="col-md-12 ">
                                                        <fieldset>
                                                            <div className="margin_10">
                                                                <input
                                                                    name="id"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="用户名"
                                                                    id="id"
                                                                    required={true}
                                                                    value={id}
                                                                    ref="id"
                                                                />
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <fieldset>
                                                            <div className="margin_10">
                                                                <input
                                                                    name="id"
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="id"
                                                                    placeholder="密码"
                                                                    required={true}
                                                                    value={password}
                                                                    ref="password"
                                                                  />
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <fieldset>
                                                            <div className="margin_10">
                                                                <input
                                                                    name="id"
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="id"
                                                                    placeholder="电话"
                                                                    required={true}
                                                                    value={phone}
                                                                    ref="phone"
                                                                />
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <fieldset>
                                                            <div className="margin_10">
                                                                <input
                                                                    name="id"
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="id"
                                                                    placeholder="姓名"
                                                                    required={true}
                                                                    value={name}
                                                                    ref="name"
                                                                />
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="form-footer">
                                                        <button
                                                            className="btn btn-secondary btn-sm "
                                                            type="submit"
                                                            id="form-submit"
                                                            onClick={this.handleAddOwner}
                                                        >添加</button>
                                                        <div className="btn btn-secondary btn-sm ">
                                                            <Link  to="/admin">返回</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                    </div>
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
    cops: state.getIn(['admin', 'cops']),
    users: state.getIn(['admin', 'users']),
    // id: state.getIn(['admin', 'id']),
    // password: state.getIn(['admin', 'password']),
    local: state.getIn(['login', 'local'])
});

const mapDispatchToProps = (dispatch) => ({
    init(local){
        dispatch(actionCreators.getCops(local));
        dispatch(actionCreators.getUsers(local));
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
    addOwner(id, password, name, phone ,local){
        dispatch(actionCreators.addOwner(id, password, name, phone ,local));
    }
});

export default connect(mapState, mapDispatchToProps)(Admin);