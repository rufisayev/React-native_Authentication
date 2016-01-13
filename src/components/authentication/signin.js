'use strict';

import React,{
    View,Text,StyleSheet,TextInput,Image
} from 'react-native';
var Button = require('../common/button');
var Parse = require('parse/react-native');

var SignIn = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    render: function () {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../images/signin.png')}/>
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username:text})}/>

                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password:text})}/>
                <Text >{this.state.errorMessage}</Text>

                <Button text={'Sign in'} onPress={this.onPress}/>
                <Button text={'Sign up'} onPress={this.onSignupPress}/>
            </View>
        )
    },
    onSignupPress: function () {
        this.props.navigator.push({name: 'signup'});
    },
    onPress: function () {
        Parse.User.logIn(this.state.username, this.state.password, {
            success: (user) => {
                this.props.navigator.immediatelyResetRouteStack([{name: 'tweets'}]);
            },
            error: (data, error) => {
                this.setState({errorMessage: error.message});
            }
        })
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width: 250,
        alignSelf: 'center'
    },
    label: {
        fontSize: 18
    },
    image:{
        width:100,
        height:100,
        marginTop:-50
    }
});
module.exports = SignIn;