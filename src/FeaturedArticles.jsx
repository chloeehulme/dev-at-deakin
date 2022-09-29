// Displays 3 articles fro database for 'featured articles' section on home page.

import React, {useContext, useState, useEffect} from 'react'
import Card from './ArticleCard'
import { Link } from 'react-router-dom';
import './css/Card.css'
import {ArticleContext} from './context/article.context'
import {getDownloadURL, listAll, ref} from 'firebase/storage'
import { storage } from './utilities/firebase';


const CardList = (props) =>
{  
  const imageListRef = ref(storage, "articles/")

  const [imageDetails, setImageDetails] = useState([])

    // Load page at top and gets all images from storage bucket (name and url)
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url)=>{
                    setImageDetails( (prevState) => [...prevState, [item.name, url]])
                })
            })
        })
    }, [])

  // Maps articles from article context to array
  const {article} = useContext(ArticleContext)
  var mappedArticles = Object.entries(article)
  
  // Selects first 3 articles to be displayed on featured page.
  const shortArticles = mappedArticles.slice(0,3)
  return <div className="row">
  {shortArticles.map( (art, id) => {

    // Matches image title to article title to display correct image with article
    var img_url
    for (const i in imageDetails) {
        if (imageDetails[i][0] == art[0].toLowerCase()) img_url = imageDetails[i][1]
    }
    return (
      <Link to={{ pathname: `/full-article/${id}/${art[0]}`, state: id }}
                className={`card-wrapper restore-${art}`} style={{textDecoration: "none"}}>
        <Card 
          image = {img_url}
          title = {art[0]}
          abstract = {art[1].abstract}
          author = {art[1].author}
          postDate = {art[1].postDate}
        />
      </Link>
    )}
  )}
  </div>
}

export default CardList
