import React from 'react';
import {Link} from 'react-router-dom';
import Collection from '../../components/Collection';

class Users extends React.Component {
    columns = [
        {
            name: 'First name',
            selector: 'first_name',
            sortable: true,
        },
        {
            name: 'Last name',
            selector: 'last_name',
            sortable: true,
        },        
        {
            name: 'Email',
            selector: 'email',
        },
        {
            name: 'Phone number',
            selector: 'phone_number',
        },
    ];    

    render() {
        return(
        <Collection
            title='Administrators'
            firebaseCollection='administrators'
            route={'users'}
            columns={this.columns}
            credential={true}
        />
        )
    }
}

export default Users;