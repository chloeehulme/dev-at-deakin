// Card template for Article cards

import React from 'react'
import './css/Card.css'

const Card = (props) =>
{
    return <div className='column'>
        <img src={props.image} alt="article" />
        <h3>{props.title}</h3>
        <p className='text-colour-grey' >{props.abstract}</p>
        <div className='rating-author'>
            <div>
                <div className='author'>
                    <h5 className='fname' style={{color: "#3E3E3E", fontWeight: "normal", marginRight: "12px"}}>{props.postDate}</h5>
                    <h5 className='fname'>{props.author}</h5>
                </div>
            </div>
        </div>
    </div>
}

export default Card