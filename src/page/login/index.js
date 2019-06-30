import React, { PureComponent, Fragment } from 'react';

import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import './style/css/dashboard.css';
import './style/plugins/charts-c3/plugin.css';
import './style/plugins/maps-google/plugin.css';
import { actionCreators } from './store';

class Login extends PureComponent{

    handleSubmit = () => {
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const local = this.refs.local.value;
        // console.log('local4:',local);

        this.props.login(username, password, local, this.props.city_id);
    };

    render(){

        const { loginStatus, who } = this.props;

        if(!loginStatus){
            return(
                <Fragment>
                    <div className="page">
                        <div className="page-single">
                            <div className="container">
                                <div className="row">
                                    <div className="col col-login mx-auto">
                                        <div className="card">
                                            <div className="card-body p-6">
                                                <div className="card-title">Login</div>
                                                <div className="form-group">
                                                    <label className="form-label">用户名</label>
                                                    <input type="text" className="form-control" ref="username"
                                                           id="exampleInputEmail1"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        密码
                                                    </label>
                                                    <input type="password" className="form-control" ref="password"
                                                           id="exampleInputPassword1"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">城市</label>
                                                    <select ref="local" name="city" id="select-beast"
                                                            className="form-control custom-select">
                                                        <option value="8080/beijing">北京</option>
                                                        <option value="8081/shanghai">上海</option>
                                                        <option value="8082/guangdong">广东</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input"/>
                                                    </label>
                                                </div>
                                                <div className="form-footer">
                                                    <button onClick={this.handleSubmit}
                                                            className="btn btn-primary btn-block">Sign in
                                                    </button>
                                                </div>
                                            </div>
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
        }else if(who === 'owner'){
            return <Redirect to='/owner' />
        }else if(who === 'cop'){
            return <Redirect to='/cop' />
        }else if(who === 'admin'){
            return <Redirect to='/admin' />
        }
    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'loginStatus']),
    who: state.getIn(['login', 'who']),
    local: state.getIn(['login', 'local']),
    city_id: state.getIn(['login', 'city_id']),
});

const mapDispatchToProps = (dispatch) => ({
    login(userName, password, local, city_id){
        // console.log('local8:',local);

        dispatch(actionCreators.setLocal(local));
        dispatch(actionCreators.login(userName, password, local, city_id));
    }
});

export default connect(mapState, mapDispatchToProps)(Login);