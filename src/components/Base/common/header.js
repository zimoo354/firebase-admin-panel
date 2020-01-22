import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../../media/logo.png';
import Columns from 'react-bulma-components/lib/components/columns';
import Logout from './logout.js';

class Header extends React.Component {
    state = {
        redirect: false,
        user: null,
    }

    componentWillMount() {
        const current_user = JSON.parse(localStorage.getItem('user'));
        if (!current_user) {
            return this.setState({redirect: true});
        } else {
            if(!current_user.uuid) {
                return this.setState({redirect: true});
            }
        }
        this.setState({user: current_user});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }    

    render() {
        return(
            <div className="header">
                {this.renderRedirect()}
                <Columns>
                <Columns.Column>
                    <Link to='/dashboard'>
                        <img src={logo} alt='Logo' className='logo' />
                    </Link>
                </Columns.Column>
                <Logout user={this.state.user} />
                </Columns>
            </div>
        )
    }
}

export default Header;