// Displays all tutorials from database on a single page. Each tutorial can be clicked on for more information.

import React, {useContext, useEffect, useState} from 'react'
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import './css/Card.css'
import {getDownloadURL, listAll, ref} from 'firebase/storage'
import { storage } from './utilities/firebase';
import { TutorialContext } from './context/tutorial.context';


const FeaturedTutorials = () =>
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

    // Selects first 3 articles to be displayed on featured page.
    const shortTutorials = mappedTutorials.slice(0,3)
    return <div className="row" style={{marginLeft: "35px"}}>
        {shortTutorials.map( (tut, id) => {
            
            // Matches video title to tutorial title to display correct video with tutorial
            var vid_url
            for (const i in videoDetails) {
                if (videoDetails[i][0] === tut[0].toLowerCase()) vid_url = videoDetails[i][1]
            }

            var avgRating;
            if (tut[1].numRatings === 0) avgRating = null;
            else avgRating = tut[1].avgRating;

        return (
            <Link to={{ pathname: `/full-tutorial/${id}/${tut[0]}`, state: id }}
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
            )}
        )} 
    </div>
}

export default FeaturedTutorials