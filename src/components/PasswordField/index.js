import React from 'react';
import { Input } from 'react-bulma-components/lib/components/form';
import Icon from 'react-fontawesome';

class PasswordField extends React.Component {
    state = {
        isVisible: false,
    }

    togglePassword = () => this.setState({isVisible: !this.state.isVisible})

    render() {
        return (
            <div className='password-field'>
                <Input 
                    {...this.props}
                    type={(this.state.isVisible) ? 'text' : 'password'}
                />
                <Icon
                    name={(this.state.isVisible) ? 'eye-slash' : 'eye'}
                    onClick={this.togglePassword}    
                />
            </div>
        )
    }
}

export default PasswordField;