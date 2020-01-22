import React from 'react';
import Base from '../Base';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Loader from 'react-bulma-components/lib/components/loader';

class LoadingPage extends React.Component {
    render() {
        return (
            <Base>
                <Container className={'pad-und-md'}>
                    <Columns>
                        <Columns.Column size={12} style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Loader 
                                style={{
                                    width: 60,
                                    height: 60,
                                }}                            
                            />
                        </Columns.Column>
                    </Columns>
                </Container>
            </Base>    
        )
    }
}

export default LoadingPage;