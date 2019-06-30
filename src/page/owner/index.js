import React, { PureComponent, Fragment } from 'react';

import { connect } from 'react-redux';

import './style/css/dashboard.css';
import './style/plugins/charts-c3/plugin.css';
import './style/plugins/maps-google/plugin.css';
import { actionCreators } from './store';
import { actionCreators as loginactionCreators} from '../login/store';
import { Link } from 'react-router-dom';
class Owner extends PureComponent{

    componentWillMount() {
        this.props.init(this.props.id, this.props.local, this.props.city_id);
    }

    handleCharge = (ban_id) => {
        const oid = this.props.id;

        this.props.charge(oid, ban_id, this.props.local);
    };

    render(){

        const { name, id, phoneNumber, cars, bans0, bans1, ban_id, setBanID, logout} = this.props;

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
                                                <h3 className="card-title">个人信息</h3>
                                            </div>
                                            <div className="card-body">
                                                <li className="icon fa fa-user">
                                                    <p>姓名：{name}</p>
                                                    <p>身份证号：{id}</p>
                                                    <p>联系方式：{phoneNumber}</p>
                                                    {
                                                        cars.map((car, index) => {
                                                            return <p>车辆{index + 1}：{car}</p>
                                                        })
                                                    }
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                    </div>
                                </div>
                                    <h3>未缴费罚单</h3>
                                    <div className="row">
                                        {
                                            bans0.map((ban) => {
                                                return <div className="col-md-6 col-xl-4">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <h3 className="card-title">信息</h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <p>&ensp;</p>
                                                            <p>违章单号：{ban.id}</p>
                                                            <p>&ensp;</p>
                                                            <p>车牌号：{ban.carID}</p>
                                                            <p>时间：{ban.time}</p>
                                                            <p>金额：{ban.fine}元</p>
                                                            <p>违章信息：{ban.message}</p>
                                                            <p>缴费状态：未缴费</p>
                                                            <div>
                                                                <button
                                                                className="btn btn-secondary btn-sm "
                                                                onClick={()=>this.handleCharge(ban.id)}
                                                                >
                                                                    缴费
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                    <div><br/></div>

                                    <h3>已缴费罚单</h3>
                                    <div className="row">

                                        {
                                            bans1.map((ban) => {
                                                return <div className="col-md-6 col-xl-4">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <h3 className="card-title">信息</h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <p>&ensp;</p>
                                                            <p>违章单号：{ban.id}</p>
                                                            <p>&ensp;</p>
                                                            <p>车牌号：{ban.carID}</p>
                                                            <p>时间：{ban.time}</p>
                                                            <p>金额：{ban.fine}元</p>
                                                            <p>违章信息：{ban.message}</p>
                                                            <p>缴费状态：已缴费</p>
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
    name: state.getIn(['login', 'name']),
    id: state.getIn(['login', 'username']),
    phoneNumber: state.getIn(['login', 'phoneNumber']),
    city_id: state.getIn(['login', 'city_id']),
    cars: state.getIn(['owner', 'cars']),
    bans0: state.getIn(['owner', 'bans0']),
    bans1: state.getIn(['owner', 'bans1']),
    ban_id: state.getIn(['owner', 'ban_id']),
    local: state.getIn(['login', 'local']),
});

const mapDispatchToProps = (dispatch) => ({
    init(id, local, city_id){
        dispatch(actionCreators.getCars(id, local, city_id));
        dispatch(actionCreators.getBans0(id, local, city_id));
        dispatch(actionCreators.getBans1(id, local, city_id));
    },
    setBanID(id){
        dispatch(actionCreators.setBanID(id));
    },
    charge(oid, ban_id ,local){
        dispatch(actionCreators.charge(oid, ban_id,local));
    },
    logout(){
        dispatch(loginactionCreators.logout());
    }
});

export default connect(mapState, mapDispatchToProps)(Owner);