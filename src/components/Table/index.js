import React from 'react';
import Table from 'react-data-table-component';
import Loader from 'react-bulma-components/lib/components/loader';

const TableLoader = props => <Loader style={{border: '4px solid #2C3749', borderTopColor: 'transparent', borderRightColor: 'transparent'}} />;

class TableWrapper extends React.Component {
    render() {
        return  (
            <Table
                {...this.props}
                noDataComponent={(this.props.loading) ? <TableLoader /> : <p>There are no records to display</p>}
            />
        )
    }
}

export { TableLoader };
export default TableWrapper;