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
import { toast } from 'react-toastify';


class ResetPassword extends React.Component {
    state = {
        email: '',
        loading: false,
        error: '',
        redirect: false
    }

    showError = errorMsg => this.setState({error: errorMsg}, () => setTimeout(() => this.setState({error: ''}), 5000))

    handleAuth = () => {
        this.setState({ error: '', loading: true });
        const { email } = this.state;
        Firebase.auth().sendPasswordResetEmail(email)
            .then(result => {
                toast.success('Password reset email sent.');
                this.setState({redirect: true});
            })
            .catch(error => {
                this.showError(error.message);
            })
            .finally(() => this.setState({ loading: false }));
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }    

    onChange = evt => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
            [evt.target.name]: value,
        });
    };

    render() {
        const { email } = this.state;
        return(
            <Base class='login' full={true} dark={true} removeHeader>
            <Container>
            <Columns mobile>
                <Columns.Column size="one-third">
                    {this.renderRedirect()}
                    <img src={logo} alt="Logo" className='logo' />
                    <Field>
                    <Control>
                        <Input
                            type='text'
                            name='email'
                            onChange={this.onChange}
                            placeholder='Email'
                            value={email} />
                    </Control>
                    </Field>
                    <Field kind='group'>
                        <Button className='gradient' type='primary' onClick={this.handleAuth}>
                            {(!this.state.loading) ? 'Reset password' : <Loader />}
                        </Button>
                    </Field>
                    <Field className='reset'>
                        <Link to='/'>Back to login</Link>
                    </Field>                       
                    {
                        this.state.error &&
                        <Notification color="danger">
                            <p className="bd-notification is-danger">{this.state.error}</p>
                        </Notification>
                    }
                    </Columns.Column>
                </Columns>                
            </Container>
            </Base>
        )
    }
}

export default ResetPassword;