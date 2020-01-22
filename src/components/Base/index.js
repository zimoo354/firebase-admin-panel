import React from 'react';
import firebase from 'firebase';
import Header from './common/header';
import Sidebar from './common/sidebar';


class Base extends React.Component {
    state = {
        isUserLoggedIn: false
    }

    componentWillMount() {
        const user = firebase.auth().currentUser;
        this.setState({isUserLoggedIn: (user) ? true : false });
    }

    render() {
        return(
        <div>
            {
                !this.props.removeHeader &&
                <Header />
            }
            {
                !this.props.full &&
                <Sidebar />
            }
            <div className={`main-container ${this.props.class || ''} ${this.props.full && 'full'} ${this.props.dark && 'dark'} ${this.props.removeHeader && 'no-header'}`}>
                <h1 className='section-title'>{this.props.title}</h1>
                {this.props.children}
            </div>
          </div>
        )
    }
}

export default Base;