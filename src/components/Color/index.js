import React from 'react';
import './style.css';

const Color = props => (
    <div 
        className='color-show'
        style={{
            backgroundColor: props.color,
        }}
    />
)

export default Color;