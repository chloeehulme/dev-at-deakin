// Displays all tutorials from database on a single page. Each tutorial can be clicked on for more information.

import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {getDownloadURL, listAll, ref} from 'firebase/storage'
import { storage } from '../utilities/firebase';
import { TutorialContext } from '../context/tutorial.context';
import VideoCard from '../VideoCard';
import Header from '../header'
import Footer from '../footer'
import Banner from '../Banner'
import SeeAllButton from '../see-all-button';
import '../css/Card.css'


const CardList = () =>
{  
    const videoListRef = ref(storage, "tutorials/")

    const [videoDetails, setVideoDetails] = useState([])

    // Load page at top and gets all videos from storage bucket (name and url)
    useEffect(() => {
        window.scrollTo(0, 0)
        listAll(videoListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url)=>{
                    setVideoDetails( (prevState) => [...prevState, [item.name, url]])
                })
            })
        })
    }, [])

    // Maps tutorials from context and converts to array
    const {tutorial} = useContext(TutorialContext)
    var mappedTutorials = Object.entries(tutorial)

    // Concatenates the nested arrays so they are able to be indexed correctly, so custom url maps successfully
    const concatArray = mappedTutorials.reduce((tutorialA, tutorialB) => tutorialA.concat(tutorialB))

    return <div style={{marginTop: "130px"}}>
        <Banner text="All Tutorials"/>
        <div className="row question-row" style={{flexWrap: "wrap", width: "90%", borderRadius: "30px", 
     top: "0", bottom: "0", left: "0", right: "0", margin: "auto", marginTop: "60px", backgroundColor: "#F5F5F5", paddingBottom: "130px"}}>
        <Header />
        {mappedTutorials.map( (tut) => {
            // Creates index from concatenated array to pass to custom url
            const index = (concatArray.indexOf(tut[0]) / 2)
            
            // Matches video title to tutorial title to display correct video with tutorial
            var vid_url
            for (const i in videoDetails) {
                if (videoDetails[i][0] === tut[0].toLowerCase()) vid_url = videoDetails[i][1]
            }
            
            var avgRating;
            if (tut[1].numRatings === 0) avgRating = null;
            else avgRating = tut[1].avgRating;

        return (
            <div style={{maxWidth: "33.33%"}}>
                <div style={{marginTop: "30px"}}>
                    <Link to={{ pathname: `/full-tutorial/${index}/${tut[0]}`, state: tut.key }}
                            className={`card-wrapper restore-${tut}`} style={{textDecoration: "none"}}>
                        <VideoCard 
                        video = {vid_url}
                        title = {tut[0]}
                        abstract = {tut[1].description}
                        author = {tut[1].author}
                        postDate = {tut[1].postDate}
                        views = {tut[1].views}
                        rating = {avgRating}
                        />
                    </Link>
                </div>
            </div>
            )}
            
        )} 
        </div>
            <Link to='/post-tutorial'>
                <SeeAllButton
                    text = "Post a tutorial"
                />
            </Link>
            <div style={{margin: "80px"}}></div>
        <Footer />
    </div>
}

export default CardList