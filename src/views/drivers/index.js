import React from 'react';
import Collection from '../../components/Collection';

class Drivers extends React.Component {
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
            name: 'License',
            selector: 'driver_license',
        },      
    ];   
    
    render() {
        return(
        <Collection
            title='Drivers'
            firebaseCollection='drivers'
            route='drivers'
            columns={this.columns}
            credential={true}
            masterCollection={{collection: 'driver_routes', field: 'driver_id'}}
        />
        )
    }
}

export default Drivers;