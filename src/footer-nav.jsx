// Template for nav sections in footer

import React from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css';

function footer_nav(props) {
    return (
        <ul>
            <li className="list-title">{props.title}</li>
            <li><Link to={props.link1}>{props.text1}</Link></li>
            <li><Link to={props.link2}>{props.text2}</Link></li>
            <li><Link to={props.link3}>{props.text3}</Link></li>
        </ul>
    )
}

export default footer_nav;