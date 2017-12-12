import React, {Component} from 'react';
import {View,Text} from 'react-native';
import firebase from 'firebase';
import {Button, Header} from "./component/common";
import LoginForm from './component/LoginForm';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBelsebwT2qQ3oJ06BBy-BekHCshyriYxs",
            authDomain: "auth-7a6ac.firebaseapp.com",
            databaseURL: "https://auth-7a6ac.firebaseio.com",
            projectId: "auth-7a6ac",
            storageBucket: "auth-7a6ac.appspot.com",
            messagingSenderId: "327646425143"
        });
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
               this.setState({loggedIn: true})
            }else{
                this.setState({loggedIn: false})
            }
        });
    }

    renderContent() {
        if (this.state.loggedIn) {
            return (
                <Button>
                    Log Out
                </Button>
            );
        }
        return <LoginForm/> ;
    }
    render() {
        return (
          <View>
              <Header headerText='Authentication'/>
              {this.renderContent()}
          </View>
        );
    }
}

export default App;