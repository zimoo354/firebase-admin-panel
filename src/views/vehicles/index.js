import React from 'react';
import Collection from '../../components/Collection';

class Vehicles extends React.Component {
    columns = [
        {
            name: 'Vehicle ID',
            selector: 'tuk_id',
            sortable: true,
        },
        {
            name: 'Brand',
            selector: 'brand',
        },
        {
            name: 'Model',
            selector: 'model',
        },
        {
            name: 'Owner',
            selector: 'owner',
        },
        {
            name: 'Plate',
            selector: 'tuk_plate',
        },        
    ];    

    render() {
        return(
        <Collection
            title='Vehicles'
            route={'vehicles'}
            firebaseCollection='vehicles'
            columns={this.columns}
            defaultSortField="tuk_id"
            masterCollection={{collection: 'driver_routes', field: 'tuk_id'}}
        />
        )
    }
}

export default Vehicles;