// The template for a full question. Clicking on a question card will route to this component.

import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import '../css/full-article.css'
import '../css/header.css';
import {UserContext} from '../context/user.context'
import Footer from '../footer'
import { QuestionContext } from '../context/question.context';


const FullQuestion = () =>
{  
    const navigate = useNavigate()

    // Loads to top of page, navigates back to login page if no authorised user detected
    useEffect(() => {
        if (auth.currentUser == null)
        {
            navigate('/')
        }

        window.scrollTo(0, 0)
    }, [])

    // Gets user and question contexts, gets id from URL parameters
    const { id } = useParams();
    const {currentUser} = useContext(UserContext);
    const {question} = useContext(QuestionContext)

     // Maps question context to array
    var mappedQuestions = Object.entries(question)

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
                <div className='article-container'>
                    <div className='article-details' style={{backgroundColor: "#F5F5F5", padding: "50px", width: "800px", borderRadius: "30px"}}>
                        <h3 style={{marginBottom: "15px"}}>{mappedQuestions[id][0]}</h3>
                        <div className='author-name' style={{display: "flex"}}>
                            <h5 style={{color: "#3E3E3E", fontWeight: "normal", fontSize: "13px"}} className='fname'>{mappedQuestions[id][1].postDate}</h5>
                            <h5 style={{fontSize: "13px"}} className='lname'>{mappedQuestions[id][1].tags}</h5>
                        </div>
                        <h5 style={{fontWeight: "normal", fontSize: "20px"}}>{mappedQuestions[id][1].description}</h5>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FullQuestion