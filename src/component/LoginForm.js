import React ,{Component} from 'react';
import {Text} from 'react-native';
import {Button, CardSection, Card, Input, Spinner} from "./common";
import * as firebase from 'firebase';

class LoginForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: ' ',
            password:'',
            error:'',
            loading: false
        };
    }

    onButtonPress() {
        const {email, password} = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email.trim(), password)
            .then(this.onLoginSuccess.bind(this))
            .catch( (err) => {
                firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFailed.bind(this));
            });
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }
    onLoginFailed() {
        this.setState({
            loading: false,
            error: 'Authentication failed'
        });
    }
    renderButton(){

        if(this.state.loading) {
            return <Spinner size='small'/>
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        );

    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        secureTextEntry={false}
                        label={'E-mail'}
                        placeholder={'user@gmail.com'}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry={true}
                        label={'Password'}
                        placeholder={'password'}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}

                    />
                </CardSection>
                <Text style={styles.errorStyle}>{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    };
}


const styles ={
    errorStyle:{
        fontSize:20,
        alignSelf: 'center',
        color: 'red'
    },

};

export default LoginForm;