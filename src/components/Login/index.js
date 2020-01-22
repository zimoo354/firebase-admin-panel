import React from 'react';
import Firebase from 'firebase';
import { Redirect, Link } from 'react-router-dom';
import Base from '../Base';
import Button from 'react-bulma-components/lib/components/button';
import Notification from 'react-bulma-components/lib/components/notification';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import logo from '../../media/logo.png';
import {
  Field,
  Control,
  Input
} from 'react-bulma-components/lib/components/form';
import Loader from 'react-bulma-components/lib/components/loader';
import PasswordField from '../PasswordField';
import { toast } from 'react-toastify';


class Login extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false,
        error: '',
        redirect: false,
        viewPassword: false,
    }

    componentDidMount() {
        Firebase.auth().signOut().then(() => {
            // console.log('Sign-out successful.');
          }).catch(function(error) {
            // console.log(error.message);
          });
    }

    ref = Firebase.database().ref('/');

    showError = errorMsg => toast.error(errorMsg);

    handleAuth = () => {
        if (this.state.loading) return 0;

        let userObj;
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                this.ref.child('administrators').on('value', snapshot => {
                    const state = snapshot.val();
                    if (state[result.user.uid]) {
                        userObj = state[result.user.uid];
                        userObj.uuid = result.user.uid;
                        localStorage.setItem('user', JSON.stringify(userObj))
                        this.setState({redirect: true});
                    } else {
                        Firebase.auth().signOut().then(() => {
                            // console.log('Sign-out successful.');
                          }).catch(function(error) {
                            // console.log(error.message);
                          });
                        this.showError("There is no user record corresponding to this identifier. The user may have been deleted.");
                    }
                });
            })
            .catch(error => {
                this.showError(error.message);
            })
            .finally(() => this.setState({ loading: false }));
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/dashboard' />
        }
    }    

    onChange = evt => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
            [evt.target.name]: value,
        });
    };

    _handleKeyUp = e => {
        if (e.key === 'Enter') this.handleAuth();
    }

    render() {
        const { email, password } = this.state;
        return(
            <Base class='login' full={true} dark={true} removeHeader>
            <Container>
            <Columns mobile>
                <Columns.Column size="one-third">
                    {this.renderRedirect()}
                    <img src={logo} alt='Logo' className='logo' />
                    <Field>
                    <Control>
                        <Input
                            type='text'
                            name='email'
                            onChange={this.onChange}
                            placeholder='Email'
                            value={email}
                            onKeyUp={this._handleKeyUp}
                        />
                    </Control>
                    </Field>
                    <Field>
                    <Control>
                        <PasswordField
                            name='password'
                            onChange={this.onChange} 
                            placeholder='Password'
                            value={password}
                            onKeyUp={this._handleKeyUp}
                        />
                    </Control>
                    </Field>   
                    <Field kind='group'>
                        <Button className='gradient' type='primary' onClick={this.handleAuth}>
                            {(!this.state.loading) ? 'Login' : <Loader />}
                        </Button>
                    </Field>
                    <Field className='reset'>
                        <Link to='/reset-password'>Reset password</Link>
                    </Field>                    
                    </Columns.Column>
                </Columns>                
            </Container>
            </Base>
        )
    }
}

export default Login;