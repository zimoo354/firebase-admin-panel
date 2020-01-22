import React from 'react';
import { Link } from 'react-router-dom';

const SectionLink = props => (
    <div className='section-link'>
        <Link to={props.to}>
        <div className='bg'>
            <img src='http://placehold.it/64'/>
        </div>
        <div className='title'>
            <h5>{props.title}</h5>
            <button>X</button>
            <button>X</button>
            <button>X</button>
        </div>
        </Link>
    </div>
)

export default SectionLink;