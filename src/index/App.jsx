import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed,
} from './store/actions';

import Header from '../common/Header/Header';
import CitySelector from '../common/CitySelector/CitySelector';
import HighSpeed from './components/HighSpeed/HighSpeed';
import DepartDate from './components/DepartDate/DepartDate';
import Journey from './components/Journey/Journey';
import Submit from './components/Submit/Submit';
import DateSelector from '../common/DateSelector/DateSelector';

import './App.css';

import { h0 } from '../utils/fp';

function App(props) {
    const {
        from,
        to,
        dispatch,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        departDate,
        highSpeed,
        isDateSelectorVisible,
    } = props;
    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    const cbs = useMemo(() => {
        return bindActionCreators(
            {
                exchangeFromTo,
                showCitySelector,
                hideCitySelector,
            },
            dispatch
        );
    }, []);
    const citySelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideCitySelector,
                fetchCityData,
                onSelect: setSelectedCity,
            },
            dispatch
        );
    }, []);

    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, []);

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggle: toggleHighSpeed,
            },
            dispatch
        );
    }, []);

    const onSelectDate = useCallback(day => {
        if (!day) {
            return;
        }

        if (day < h0()) {
            return;
        }

        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, []);

    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack}></Header>
            </div>
            <form action="./query.html" className="form">
                <Journey from={from} to={to} {...cbs}></Journey>
                <DepartDate time={departDate} {...departDateCbs}></DepartDate>
                <HighSpeed highSpeed={highSpeed} {...highSpeedCbs}></HighSpeed>
                <Submit></Submit>
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            ></CitySelector>
            <DateSelector
                {...dateSelectorCbs}
                show={isDateSelectorVisible}
                onSelect={onSelectDate}
            ></DateSelector>
        </div>
    );
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);
