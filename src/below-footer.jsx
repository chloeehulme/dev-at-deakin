// Nav template for the section below the footer links

import React from 'react';
import './css/footer.css';
import { Link } from 'react-router-dom';

var d = new Date();
const year = d.getFullYear();

function below_footer(props) {
    return (
        <div className="below-footer">
            <h3>&copy; {props.title} {year}</h3>
            <div className='privacy-terms-conditions'>
                <p><Link to={props.link1}>{props.text1}</Link></p>
                <p><Link to={props.link2}>{props.text2}</Link></p>
                <p><Link to={props.link3}>{props.text3}</Link></p>
                </div>
        </div>
    )
}

export default below_footer;