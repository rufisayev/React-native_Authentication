'use strict';

import React,{
    View,Text,StyleSheet,TextInput,ToolbarAndroid,Image
} from 'react-native';

var Button = require('../common/button');
var Parse = require('parse/react-native');

var SignUp = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
            email: ''
        }
    },
    render: function () {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../images/register.png')}/>

                <TextInput
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={(text)=>this.setState({username:text})}
                    style={styles.input}/>

                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text)=>this.setState({password:text})}
                    style={styles.input}/>

                <TextInput
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    value={this.state.passwordConfirmation}
                    onChangeText={(text)=>this.setState({passwordConfirmation:text})}
                    style={styles.input}/>

                <Button text={'Register'} onPress={this.registerPress}/>
                <Button text={'Back'} onPress={this.backPress}/>
                <Text style={styles.label}>{this.state.errorMessage}</Text>
            </View>
        )
    },
    registerPress: function () {
        if (this.state.password !== this.state.passwordConfirmation) {
            return this.setState({
                errorMessage: 'Your passwords do not match'
            })
        }
        var user = new Parse.User();
        user.set('username', this.state.username);
        user.set('password', this.state.password);
        user.signUp(null, {
            success: (user)=> {
                this.setState({errorMessage: 'Successfully registered'});
                this.props.navigator.pop();
            },
            error: (error)=> {
                this.setState({errorMessage: 'Username is already exist'});
            }
        })
    },
    backPress: function () {
        this.props.navigator.pop();
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    label: {
        fontSize: 18
    },
    image: {
        width: 100,
        height: 100,
        marginTop: -50
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 5,
        width: 250,
        alignSelf: 'center'
    }
});
module.exports = SignUp;