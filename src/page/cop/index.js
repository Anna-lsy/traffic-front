import React, { PureComponent, Fragment } from 'react';

import { connect } from 'react-redux';

import './style/css/dashboard.css';
import './style/plugins/charts-c3/plugin.css';
import './style/plugins/maps-google/plugin.css';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from "moment";
import {actionCreators as loginactionCreators} from "../login/store";

class Cop extends PureComponent{

    componentWillMount() {
    }

    handleBan = () => {
        const cop_id = this.props.id;
        const car_id = this.refs.car_id.value;
        const message = this.refs.message.value;
        const fine = this.refs.fine.value;
        const local = this.props.local;
        const city_id = this.props.city_id;

        this.props.ban(cop_id, car_id, message, fine ,local, city_id);
    };

    render(){

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
                                                <h3 className="card-title">开罚单</h3>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <div className="form-group">
                                                        <label className="form-label">车牌号</label>
                                                        <input className="form-control"ref="car_id"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">违章信息</label>
                                                        <input className="form-control"ref="message"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">罚款金额</label>
                                                        <input className="form-control" ref="fine"/>
                                                    </div>
                                                    <div className="form-footer">
                                                        <button className="btn btn-primary btn-block" type="submit"
                                                                id="form-submit"
                                                                onClick={this.handleBan}>提交</button>
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
    id: state.getIn(['login', 'username']),
    local: state.getIn(['login', 'local']),
    city_id: state.getIn(['login', 'city_id']),
});

const mapDispatchToProps = (dispatch) => ({
    ban(cop_id, car_id, message, fine ,local, city_id){
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        dispatch(actionCreators.ban(cop_id, car_id, message, fine, time ,local, city_id));
    },
    logout(){
        dispatch(loginactionCreators.logout());
    }
});

export default connect(mapState, mapDispatchToProps)(Cop);