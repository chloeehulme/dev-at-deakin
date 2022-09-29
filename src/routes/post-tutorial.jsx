// Posts a tutorial to database and adds tutorial details to tutorial.context to be displayed on 'all-tutorials' page.
// Allows user to select and post a video only. The video will receive the same title as the tutorial.

import React, { useState, useContext, useEffect } from 'react';
import Title from '../text-box-title'
import {addCollectionAndDocument, storage} from '../utilities/firebase'
import {ref, uploadBytes} from 'firebase/storage'
import '../css/post-article.css';
import { TutorialContext } from '../context/tutorial.context';
import {UserContext} from '../context/user.context'
import { auth } from '../utilities/firebase';
import LoadingSpinner from '../loading-spinner';
import Header from '../header';
import Banner from '../Banner';
import Footer from '../footer';
import { useNavigate } from 'react-router-dom';


function PostTutorial() {

    const navigate = useNavigate()

    // Load to top of page, navigates back to login page if no authorised user detected
    useEffect(() => {
        if (auth.currentUser == null)
        {
            navigate('/')
        }

        window.scrollTo(0, 0)
    }, [])

    // Gets current date to store in database
    var postDate = new Date();
    var dd = String(postDate.getDate()).padStart(2, '0');
    var mm = String(postDate.getMonth() + 1).padStart(2, '0'); 
    var yyyy = postDate.getFullYear();

    const {tutorial} = useContext(TutorialContext)
    const {currentUser} = useContext(UserContext);

    postDate = dd + '/' + mm + '/' + yyyy;

    var author
    var views = 0
    var numRatings = 0
    var ratingSum = 0
    var avgRating = 0

    const [tutorial_in, setTutorial_in] = useState({
        title: '',
        description:'',
        tags: '',
    })

    const {title, description, tags} = tutorial_in

    // Posts the tutorial to the database, adding post date and author, then resetting form elements
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser != null)
        {
            author = currentUser.email
        }
        else {author = "anonymous"}

        if (title === "") {
            return
        }
        try {
            const response = addCollectionAndDocument('tutorials', [{title, description, tags, postDate, author, views, numRatings, ratingSum, avgRating}])
            tutorial[title] = {description: description, tags: tags, postDate: postDate, author: author, views: views, 
                numRatings: numRatings, ratingSum: ratingSum, avgRating: avgRating}
            console.log(response)
        } catch (error) {
            console.log("error writing to DB", error.message)
        }
        var form = document.getElementById("myForm");
        form.reset();
    }

    // Handles user input
    const handleChange = (e) => {
        const {name, value} = e.target
        setTutorial_in ((preValue)=>{  
        return {
        ...preValue,
        [name]: value
        }})
    }

    const [isLoading, setIsLoading] = useState(false);
    const [videoUpload, setVideoUpload] = useState(null)

    // Handles user video upload to firestore storage bucket, displays a loading 
    // spinner for the duration of video upload.
    const uploadVideo = (e) => {
        e.preventDefault()
        setIsLoading(true);
        if (videoUpload == null) {
            setIsLoading(false)
            return
        }

        try {
            const videoRef = ref(storage, 'tutorials/' + tutorial_in.title.toLowerCase());
            if (!tutorial_in.title) {
                throw new Error()
            }
            uploadBytes(videoRef, videoUpload).then(() => {
                setIsLoading(false)
                alert("tutorial uploaded successfully")
            })
        } catch (error) {
            setIsLoading(false)
            alert("Please add a title to your tutorial.")
        }
    }

    return (
        <div>
            <Header />
            <div style={{marginTop: "130px"}}></div>
            <Banner text="Post a Tutorial..."/>
            <div className="post" >
                <form id='myForm' onSubmit={handleSubmit}>
                    <div className='title-container'>
                        <Title text="Title"/>
                    </div>
                    <textarea name='title' type='text' value={tutorial.title} onChange={handleChange} placeholder="Start your tutorial with how, what, why, etc..."/>
                    <div className='title-container' style={{marginRight: "65%"}}>
                        <Title text="Add your tutorial:"/>
                    </div>
                    <div className='title-container' style={{display: "flex"}}>
                        <div>
                            <input type="file" accept=".mp4" onChange={(e) => {setVideoUpload(e.target.files[0])}}></input>
                            <button className="file-upload" onClick={uploadVideo} disabled={isLoading}>Upload</button>
                        </div>
                        <div style={{marginLeft: "50px"}}>
                            {isLoading ? <LoadingSpinner /> : <div></div>}
                        </div>
                    </div>
                    <div className='title-container'>
                        <Title text="Description" className="abstract"/>
                    </div>
                    <textarea name='description' type='text' value={tutorial.description} onChange={handleChange} placeholder="Enter a 1-paragraph description" style={{height: "75px"}}/>
                    <div className='title-container'>
                        <Title text="Tags"/>
                    </div>
                    <textarea name='tags' type='text' value={tutorial.tags} onChange={handleChange} placeholder="Please add up to 3 tags to describe what your tutorial is about e.g., Java"/>
                    <div className='container post-button'>
                        <button type='submit'>POST</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default PostTutorial;