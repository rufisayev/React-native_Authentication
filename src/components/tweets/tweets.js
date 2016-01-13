'use strict';
import React,{
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
var Parse = require('parse/react-native');
var Button = require('../common/button');

var Tweet = React.createClass({
    getInitialState: function () {
        return {
            user: null
        }
    },
    componentWillMount: function () {
        Parse.User.currentAsync().then((user) => {
            console.log('ww',user)
            this.setState({user: user})
        })
    },
    render: function () {
        if (!this.state.user) {
            return <Text>Done</Text>
        }
        var username = this.state.user.get('username');

        return <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../images/user.png')}/>
            <Text style={styles.textHeader}>Welcome</Text>
            <Text style={styles.text}>Your username: {username}</Text>
            <Button text={'Log out'} onPress={this.logoutPress}/>
        </View>

    },
    logoutPress: function () {
        Parse.User.logOut();
        this.props.navigator.push({name: 'signin'});
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader:{
      fontSize:22
    },
    text:{
        fontSize:16
    },
    image: {
        width: 100,
        height: 100,
        marginTop: -50
    }
});

module.exports = Tweet;