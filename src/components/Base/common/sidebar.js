import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'react-fontawesome';
import Logout from './logout.js';

const links = [
    {
        title: 'Dashboard',
        icon: 'tachometer',
        to: '/dashboard'
    },    
    {
        title: 'Drivers Management',
        icon: 'user',
        to: '/drivers'
    },
    {
        title: 'Vehicles Management',
        icon: 'car',
        to: '/vehicles'
    },
    {
        title: 'Administrators Management',
        icon: 'user-secret',
        to: '/users'
    },
];

const SidebarLink = props => {
    const current_location = window.location.href;
    const is_current = (current_location.search(props.to) > -1);
    
    return (<>
        <Link to={props.to} className={`sidebar-link ${(is_current) ? 'current' : ''}`}>
            <h4><Icon name={props.icon} /> <span>{props.label}</span></h4>
        </Link>
    </>)
};

class Sidebar extends React.Component {
    state = {
        isOpen: false,
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

    render() {
        return(
            <>
            <Icon
                name={(this.state.isOpen) ? 'close' : 'bars'}
                className='sidebar-toggle show-for-small-only'
                onClick={() => this.setState({isOpen: !this.state.isOpen})}
            />
            <div className={`sidebar ${(this.state.isOpen) ? 'open' : ''}`}>
                {
                    links.map((link, index) => (
                        <SidebarLink
                        key={index}
                        label={link.title}
                        icon={link.icon}
                        to={link.to}
                    />
                    ))
                }
                <Logout user={this.state.user} mobile={true} />
            </div>
            </>
        )
    }
}

export default Sidebar;