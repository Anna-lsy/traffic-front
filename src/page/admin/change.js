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

    handleEdit = () => {
        const id = this.refs.id.value;
        const password = this.refs.password.value;
        const local = this.props.local;

        this.props.edit(id, password ,local);
    };

    render(){

        const { cops, users, id, password} = this.props;
        const { setId, setPassword,  setEditMessage, logout} = this.props;

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
                                                <h3 className="card-title">修改信息</h3>
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
                                                                    id="id"
                                                                    placeholder="用户名"
                                                                    disabled={true}
                                                                    required=""
                                                                    value={id}
                                                                    ref="id"
                                                                    onChange={() => setId(this.refs.id.value)}
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
                                                                    required=""
                                                                    value={password}
                                                                    ref="password"
                                                                    onChange={() => setPassword(this.refs.password.value)}
                                                                />
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="form-footer">
                                                        <button
                                                            className="btn btn-secondary btn-sm "
                                                            type="submit"
                                                            id="form-submit"
                                                            onClick={this.handleEdit}
                                                        >修改</button>
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
    id: state.getIn(['admin', 'id']),
    password: state.getIn(['admin', 'password']),
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
    }
});

export default connect(mapState, mapDispatchToProps)(Admin);