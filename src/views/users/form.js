import React from 'react';
import Form from '../../components/Form';

class FormDrivers extends React.Component {
    fields = [
        {
            label: "First Name",
            key: 'first_name',
        },    
        {
            label: "Last Name",
            key: 'last_name',
        },
        {
            label: "Phone",
            key: 'phone_number',
            type: 'phone',
        },     
    ];
    initialState = {
        first_name: '',
        last_name: '',
        phone_number: '',
    }

    render() {
        return (
            <Form
                idToEdit={this.props.match.params.id}
                initialState={this.initialState}
                fields={this.fields}
                route={'users'}
                firebaseCollection={'administrators'}
                credential={true}
            />
        )
    }
}

export default FormDrivers;