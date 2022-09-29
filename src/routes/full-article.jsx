// The template for a full article. Clicking on an article card will route to this component.

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/full-article.css'
import { Link } from 'react-router-dom';
import '../css/header.css';
import {UserContext} from '../context/user.context'
import {ArticleContext} from '../context/article.context'
import Footer from '../footer'
import {getDownloadURL, listAll, ref} from 'firebase/storage'
import { storage } from '../utilities/firebase';


const FullArticle = () =>
{  
    const imageListRef = ref(storage, "articles/")

    const [imageDetails, setImageDetails] = useState([])

    // Load page at top
    useEffect(() => {
        window.scrollTo(0, 0)
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url)=>{
                    setImageDetails( (prevState) => [...prevState, [item.name, url]])
                })
            })
        })
    }, [])

    console.log(imageDetails)

    // Gets user and article contexts, gets id from URL parameters
    const { id } = useParams();
    const {currentUser} = useContext(UserContext);
    const {article} = useContext(ArticleContext)

    // Maps article context to array
    var mappedArticles = Object.entries(article)

    // Matches image title to article title to display correct image with article
    var img_url
    for (const i in imageDetails) {
        if (imageDetails[i][0] === mappedArticles[id][0].toLowerCase()) img_url = imageDetails[i][1]
    }

    return (
        <div>
            <div className='full-article'>
                <div className='header'>
                    <header>
                        <div class="container">
                            <Link to = '/home-page' style={{textDecoration: "none"}}><h1>DEV<span>@</span>Deakin</h1></Link>
                            {currentUser !== null ? <div className='welcome-user'><h2>Welcome, <span style={{color: "darkcyan"}}>{currentUser.email}</span></h2></div> 
                            : <div className='welcome-user'></div>}
                        </div>
                    </header>
                </div>
                <div className='article-container' style={{padding: "70px", borderRadius: "30px", 
                top: "0", bottom: "0", left: "0", right: "0", margin: "auto", marginTop: "130px", backgroundColor: "#F5F5F5", marginBottom: "120px", paddingBottom: "130px"}}>
                    <div className='article-img'>
                        <img src={img_url} alt="article" style={{maxWidth: "65%"}}/>
                    </div>
                    <div className='article-details article-title'>
                        <h3>{mappedArticles[id][0]}</h3>
                    </div>
                    <div className='author-name' style={{display: "flex"}}>
                            <h5 style={{color: "#3E3E3E", fontWeight: "normal", fontSize: "13px"}} className='fname'>{mappedArticles[id][1].postDate}</h5>
                            <h5 style={{fontSize: "13px"}} className='lname'>{mappedArticles[id][1].author}</h5>
                        </div>
                    <div style={{marginTop: "40px"}}>
                        <p>{mappedArticles[id][1].article_text}</p> <br/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FullArticle