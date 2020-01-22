import React from 'react';
import Form from '../../components/Form';

class FormVehicle extends React.Component {
    fields = [
        {
            label: "Vehicle Name",
            key: 'tuk_id',
        },
        {
            label: "Number of Seats",
            key: 'places',
            type: 'number',
        },
        {
            label: 'Year',
            key: 'year',
            type: 'number',
        },
        {
            label: 'Brand',
            key: 'brand',
        },
        {
            label: 'Model',
            key: 'model',
        },
        {
            label: 'Owner',
            key: 'owner',
        },
        {
            label: 'Description',
            key: 'description',
        },
        {
            label: 'Plate',
            key: 'tuk_plate',
        },
        {
            label: 'Serial Number',
            key: 'serial_number',
        },     
    ];
    initialState = {
        tuk_id: '',
        places: '',
        year: '',
        brand: '',
        model: '',
        owner: '',
        description: '',
        tuk_plate: '',
        serial_number: '',
    }

    render() {
        return (
            <Form
                idToEdit={this.props.match.params.id}
                initialState={this.initialState}
                fields={this.fields}
                route={'vehicles'}
                firebaseCollection={'vehicles'}
                shouldNotExist={['tuk_id','tuk_plate','serial_number']}
            />
        )
    }
}

export default FormVehicle;