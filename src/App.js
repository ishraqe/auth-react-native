import React, {Component} from 'react';
import {View,Text} from 'react-native';
import firebase from 'firebase';
import {Button, CardSection, Header, Spinner} from "./component/common";
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
            apiKey: "api_key",
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

    renderView() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={()=> firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/> ;
            default:
                return (
                    <CardSection>
                        <Spinner size="large"/>
                    </CardSection>);
        }
    }
    render() {
        return (
          <View>
              <Header headerText='Authentication'/>
              {this.renderView()}
          </View>
        );
    }
}

export default App;
