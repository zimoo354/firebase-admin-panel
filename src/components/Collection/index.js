import React from 'react';
import Firebase from 'firebase';
import Container from 'react-bulma-components/lib/components/container';
import Button from 'react-bulma-components/lib/components/button';
import {Link} from 'react-router-dom';
import Icon from 'react-fontawesome';
import Table from '../../components/Table';
import Base from '../../components/Base';
import {tableDataParser} from '../../utils/helper_functions';

class Collection extends React.Component {
    state = {
        loadingData: true,
    }

    columns = [];

    ref = Firebase.database().ref('/');

    SubHeader = () => (
        <>
            {
                this.props.subHeader
            }
            <Link className='linkbtn' to={`/${this.props.route}/form`}><Button className='gradient'><Icon name='plus' /> Add</Button></Link>
        </>
    );

    componentWillMount() {
        this.columns = this.props.columns;
        this.columns.push({
            name: 'Edit',
            selector: 'edit',
            ignoreRowClick: true,
            width: '72px',
            cell: c => (
                <Link className='collection-action collection-edit' to={`/${this.props.route}/form/${c.id}`}><Icon name='pencil' /></Link>
            )
        });

        this.columns.push({
            name: 'Delete',
            selector: 'delete',
            ignoreRowClick: true,
            width: '72px',
            cell: c => (
                <a  className='collection-action collection-delete' href='javascript:void(0);' onClick={() => this.delete(c.id)}><Icon name='trash' /></a>
            )
        });

        this.readData();
    }

    readData = () => {
        this.ref.child(this.props.firebaseCollection).on('value', snapshot => {
            const state = snapshot.val();
            this.setState({data: tableDataParser((state) ? state : {}), loadingData: false})
        });
    }

    delete = key => {
        let snap = {
            numChildren: () => 0,
        };
        let confirmCascade = false;
        const {
            masterCollection
        } = this.props;

        if (masterCollection !== undefined) {
            this.ref.child(masterCollection.collection).orderByChild(masterCollection.field).equalTo(key).on("value", snapshot => {           
                snap = snapshot;
            });

            if (snap.numChildren()) {
                confirmCascade = window.confirm(`You're deleting also ${snap.numChildren()} records from planning screen. Do you want to continue?`)
            } else {
                confirmCascade = true;
            }
            
        } else {
            confirmCascade = true;
        }
        
        if (confirmCascade) {
            const confirm = window.confirm('Are you sure?');

            if (confirm) {
                if (masterCollection !== undefined) {
                    let record;
                    const refDelete = Firebase.database().ref('/');
                    snap.forEach(data => {
                        record = data.val(); 
                        if(record[masterCollection.field] === key) {
                            refDelete.child(masterCollection.collection).child(data.key).remove();
                        }
                    });
                }

                if (this.props.credential) this.ref.child('deleted_uids').child(key).set(`deleted from '${this.props.firebaseCollection}'`);

                return this.ref.child(this.props.firebaseCollection).child(key).remove();
            }
        }
        return;
    }

    render() {
        return(
        <Base>
            <Container className="collection-container">
                <Table
                    className="data-table"
                    data={this.state.data}
                    loading={this.state.loadingData}
                    // responsive={false}
                    pagination={true}
                    subHeader={true}
                    subHeaderComponent={<this.SubHeader />}
                    columns={this.columns}
                    {...this.props}
                />
            </Container>
        </Base>
        )
    }
}

export default Collection;