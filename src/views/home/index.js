import React from 'react';
import Firebase from 'firebase';
import Icon from 'react-fontawesome';
import Container from 'react-bulma-components/lib/components/container';
import Base from '../../components/Base';
import Columns from 'react-bulma-components/lib/components/columns';
import Loader from 'react-bulma-components/lib/components/loader';

class Dashboard extends React.Component {
    state = {
        dashboard: {
            loadingData: false,
            today_passes: null,
            total_sold_passes: null,
            week_users: null,
            total_users: null,
            active_users: null,            
        }
    }

    ref = Firebase.database().ref('/');

    componentWillMount() {
        this.readData();
    }

    readData = () => {
        this.ref.child('dashboard').on('value', snapshot => {
          const state = snapshot.val();
          this.setState({dashboard: state, loadingData: false})
        });
    }

    renderFacts = () => {
        const facts = [
            {
                icon: 'money',
                text: 'Icome Today:',
                number: 1234,
            },
        ];

        return facts.map(fact => (
                <Columns.Column key={fact.icon} className='fact'>
                    <Icon name={fact.icon} />
                    <p className='text'>{fact.text}</p>
                    <p className='number'>{fact.number}</p>
                </Columns.Column>
            )
        )
    }

    render() {
        return(
            <Base>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <h1>Dashboard</h1>
                        </Columns.Column>
                    </Columns>            
                    <Columns className='dashboard'>
                        {this.renderFacts()}
                    </Columns>
                </Container>
            </Base>
        )
    }
}

export default Dashboard;