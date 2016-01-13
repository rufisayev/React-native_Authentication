'use strict';

import React,{
    StyleSheet,
    Navigator
} from 'react-native';
var SignIn = require('./components/authentication/signin');
var Parse = require('parse/react-native');
var SignUp = require('./components/authentication/signup');
var Tweets = require('./components/tweets/tweets');

var ROUTES = {
    signin: SignIn,
    signup:SignUp,
    tweets:Tweets
};

var Main = React.createClass({
    componentWillMount: function () {
        Parse.initialize("6OSp9JbUmKpQBIbl2970JZDpLopzXlyOwV1fPBB0", "aw5JXuxRfCpTOuBZUtYbaQ2eppRoJ7cIOTMONWh7");
    },
    renderScene:function(route,navigator){
        var Component = ROUTES[route.name];
        return <Component route={route} navigator={navigator}/>
    },
    render: function () {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{name:'signin'}}
                renderScene={this.renderScene}
                configureScene={() => {return Navigator.SceneConfigs.FloatFromRight}}/>
        )
    }
});

var styles = StyleSheet.create({
    contaienr: {
        flex: 1
    }
});

module.exports = Main;
