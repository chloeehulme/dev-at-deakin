// Displays all articles from database on a single page. Each article can be clicked on for more information.

import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ArticleContext} from '../context/article.context'
import {getDownloadURL, listAll, ref} from 'firebase/storage'
import { storage, auth } from '../utilities/firebase';
import Card from '../ArticleCard'
import Header from '../header'
import Banner from '../Banner'
import Footer from '../footer'
import '../css/Card.css'


const CardList = () =>
{  
    const imageListRef = ref(storage, "articles/")

    const [imageDetails, setImageDetails] = useState([])

    const navigate = useNavigate()

    // Load page at top and gets all images from storage bucket (name and url), navigates back to login page if no authorised user detected
    useEffect(() => {
        if (auth.currentUser == null)
        {
            navigate('/')
        }

        window.scrollTo(0, 0)
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url)=>{
                    setImageDetails( (prevState) => [...prevState, [item.name, url]])
                })
            })
        })
    }, [])

    // Maps articles from context and converts to array
    const {article} = useContext(ArticleContext)
    var mappedArticles = Object.entries(article)

    // Concatenates the nested arrays so they are able to be indexed correctly, so custom url maps successfully
    const concatArray = mappedArticles.reduce((articleA, articleB) => articleA.concat(articleB))

    return <div style={{marginTop: "130px"}}>
        <Banner text="All Articles"/>
        <div className="row question-row" style={{flexWrap: "wrap", width: "90%", borderRadius: "30px", 
     top: "0", bottom: "0", left: "0", right: "0", margin: "auto", marginTop: "60px", backgroundColor: "#F5F5F5", marginBottom: "120px", paddingBottom: "130px"}}>
        <Header />
        {mappedArticles.map( (art) => {
            // Creates index from concatenated array to pass to custom url
            const index = (concatArray.indexOf(art[0]) / 2)
            
            // Matches image title to article title to display correct image with article
            var img_url
            for (const i in imageDetails) {
                if (imageDetails[i][0] === art[0].toLowerCase()) img_url = imageDetails[i][1]
            }

        return (
            <div style={{maxWidth: "33.33%"}}>
                <div style={{marginTop: "30px"}}>
                    {/* custom url using index created above */}
                    <Link to={{ pathname: `/full-article/${index}/${art[0]}`, state: index }}
                            className={`card-wrapper restore-${art}`} style={{textDecoration: "none"}}>
                        <Card 
                        image = {img_url}
                        title = {art[0]}
                        abstract = {art[1].abstract}
                        author = {art[1].author}
                        postDate = {art[1].postDate}
                        />
                    </Link>
                </div>
            </div>
            )}
    )} 
        </div>
        <Footer />
    </div>
}

export default CardList