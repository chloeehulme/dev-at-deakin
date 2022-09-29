// The template for a full tutorial. Clicking on a tutorial card will route to this component.

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/full-article.css'
import { Link } from 'react-router-dom';
import '../css/header.css';
import {UserContext} from '../context/user.context'
import { TutorialContext } from '../context/tutorial.context';
import Footer from '../footer'
import {getDownloadURL, listAll, ref} from 'firebase/storage'
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import { dB, storage } from '../utilities/firebase';
import { doc, setDoc } from "firebase/firestore";


const FullTutorial = () =>
{  
    const videoListRef = ref(storage, "tutorials/")

    const [videoDetails, setVideoDetails] = useState([])

    // Load page at top and gets all videos from storage bucket (name and url)
    // increments view count on tutorial
    useEffect(() => {
        // Load to page top
        window.scrollTo(0, 0)

        // get all videos from storage bucket
        listAll(videoListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url)=>{
                    setVideoDetails( (prevState) => [...prevState, [item.name, url]])
                })
            })
        })

        // increment view count in tutorial context for live update, as well as in firestore for future page load.
        tutorial[mappedTutorials[id][0]] = {description: mappedTutorials[id][1].description, tags: mappedTutorials[id][1].tags, 
            postDate: mappedTutorials[id][1].postDate, author: mappedTutorials[id][1].author, views: mappedTutorials[id][1].views + 1, 
            numRatings: mappedTutorials[id][1].numRatings, ratingSum: mappedTutorials[id][1].ratingSum, avgRating: mappedTutorials[id][1].avgRating}
        console.log("title:" + mappedTutorials[id][0])
        console.log("current views:" + mappedTutorials[id][1].views)

        const docRef = doc(dB, 'tutorials', mappedTutorials[id][0])
        const data = {
            views: mappedTutorials[id][1].views + 1
        };
        setDoc(docRef, data, {merge:true})
        .then(docRef => {
            console.log("Views in Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    // Gets user and tutorial contexts, gets id from URL parameters
    const { id } = useParams();
    const {currentUser} = useContext(UserContext);
    const {tutorial} = useContext(TutorialContext)

    // Maps tutorial context to array
    var mappedTutorials = Object.entries(tutorial)

    // Matches video title to tutorial title to display correct video with tutorial
    var vid_url
    for (const i in videoDetails) {
        if (videoDetails[i][0] === mappedTutorials[id][0].toLowerCase()) vid_url = videoDetails[i][1]
    }

    var avgRating;
    if (mappedTutorials[id][1].numRatings === 0) avgRating = null;
    else avgRating = mappedTutorials[id][1].avgRating;

    console.log(avgRating)

    const [toggle, setToggle] = useState(false)

    const handleChange = (e) => {
        console.log(e.target.value)
        var rating = e.target.value
        setToggle(true)

        var currentSum = mappedTutorials[id][1].ratingSum
        var currentNum = mappedTutorials[id][1].numRatings
        var newSum = (Number(currentSum) + Number(rating))
        var newNum = (Number(currentNum) + 1)

        // Calculate average rating
        var newAvg
        if (mappedTutorials[id][1].numRatings === 0) {
            newAvg = rating
        }
        else {
            newAvg = newSum / newNum
        }

        // Replace average, ratingSum and numRatings in tutorial.context and firestore
        tutorial[mappedTutorials[id][0]] = {description: mappedTutorials[id][1].description, tags: mappedTutorials[id][1].tags, 
            postDate: mappedTutorials[id][1].postDate, author: mappedTutorials[id][1].author, views: mappedTutorials[id][1].views, 
            numRatings: newNum, ratingSum: newSum, avgRating: Math.round(newAvg * 100) / 100}

        const docRef = doc(dB, 'tutorials', mappedTutorials[id][0])
        const data = {
            ratingSum: newSum,
            numRatings: newNum,
            avgRating: Math.round(newAvg * 100) / 100
        };
        setDoc(docRef, data, {merge:true})
        .then(docRef => {
            console.log("Rating stats of Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
    };

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
                top: "0", bottom: "0", left: "0", right: "0", margin: "auto", marginTop: "130px", backgroundColor: "#F5F5F5", marginBottom: "120px", paddingBottom: "60px"}}>
                    <div className='article-img'>
                        <iframe style={{borderRadius: "30px"}} title='video-card' width={'1000px'} height={'600px'} src={vid_url} frameborder="0" onload="this.style.opacity = 1" allowFullScreen></iframe>
                    </div>
                    <div className='article-details article-title'>
                        <h3 style={{marginBottom: "10px"}}>{mappedTutorials[id][0]}</h3>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <Rating name="half-rating" defaultValue={3} precision={0.5} onChange={handleChange} readOnly={toggle}/>
                    </div>
                    <div className='author-name' style={{display: "flex"}}>
                            <h5 style={{color: "#3E3E3E", fontWeight: "normal", fontSize: "13px"}} className='fname'>{mappedTutorials[id][1].postDate}</h5>
                            <h5 style={{fontSize: "13px"}} className='lname'>{mappedTutorials[id][1].author}</h5>
                    </div>
                    <div style={{color: "#3E3E3E", marginTop: "15px"}}>
                        <VisibilityIcon style={{fontSize: "17px", color: "#f98c4e", verticalAlign: "middle", paddingBottom:"3px"}}/>
                        <span style={{marginLeft: "8px"}}>{mappedTutorials[id][1].views}</span>
                        <StarBorderIcon style={{fontSize: "17px", color: "#c74298", marginLeft: "30px", verticalAlign: "middle", paddingBottom:"3px"}}/>
                        <span style={{marginLeft: "8px"}}>{avgRating}</span>
                    </div>
                    <div style={{marginTop: "40px"}}>
                        <p>{mappedTutorials[id][1].description}</p> <br/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FullTutorial