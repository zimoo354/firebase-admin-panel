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
            label: "License",
            key: 'driver_license',
        },     
    ];
    initialState = {
        first_name: '',
        last_name: '',
        driver_license: '',
    }

    render() {
        return (
            <Form
                idToEdit={this.props.match.params.id}
                initialState={this.initialState}
                fields={this.fields}
                route={'drivers'}
                firebaseCollection={'drivers'}
                credential={true}
                shouldNotExist={['driver_license']}
            />
        )
    }
}

export default FormDrivers;