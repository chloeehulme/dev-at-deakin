// The card template for quetions

import React from 'react'
import { Link } from 'react-router-dom'
import './css/Card.css'

const QCard = (props) =>
{
    return <div className='column question-card'>
        {props.children}
        <Link to={props.link}><h3>{props.title}</h3></Link>
        <div className='rating-author'>
            <div className='author'>
                <h5 style={{color: "#3E3E3E", fontWeight: "normal"}} className='fname'>{props.postDate}</h5>
                <h5 className='lname'>{props.tags}</h5>
            </div>
        </div>
    </div>
}

export default QCard