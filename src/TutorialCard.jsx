// The card template for tutorials

import React from 'react'
import Card from './ArticleCard'
import tutorialList from './TutorialList'
import { Link } from 'react-router-dom';
import './css/Card.css'


const CardList = () =>
{  
    return <div className="row">
    {tutorialList.map(  (art ) => 
      <Link to={{ pathname: `/full-tutorial/${art.key}/${art.title}`, state: art.key }}
      className={`card-wrapper restore-${art}`} style={{textDecoration: "none"}}>
        <Card 
          key = {art.key}
          image = {art.image}
          title = {art.title}
          description = {art.description}
          rating = {art.rating}
          fname = {art.fname}
          lname = {art.lname}
        />
      </Link>
)}
     
    </div>
}

export default CardList