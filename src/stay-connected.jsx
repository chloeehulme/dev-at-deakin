// Template for 'stay connected' links on footer

import React from 'react';
import './css/footer.css';

function stay_connected(props) {
    return (
        <ul>
            <li className="list-title">{props.title}</li>
            <div className='images'>
                <li><a href={props.link1}><img src= {props.src1} alt={props.alt1} /></a></li>
                <li><a href={props.link2}><img src= {props.src2} alt={props.alt2} /></a></li>
                <li><a href={props.link3}><img src= {props.src3} alt={props.alt3} /></a></li>
            </div>
        </ul>
    )
}

export default stay_connected;