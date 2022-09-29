// Displays all questions from database on a single page. Each question can be clicked on for more information. Questions can be deleted 
// from users view and filter through search bar

import React, {useContext, useState, useEffect} from 'react'
import { QuestionContext } from '../context/question.context';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import QCard from '../QCard'
import Header from '../header'
import Footer from '../footer'
import Banner from '../Banner'
import CloseIcon from '@mui/icons-material/Close';
import '../css/Card.css'
import '../css/all-page.css'


const CardList = () =>
{  
    const navigate = useNavigate()

    // Load page at top, navigates back to login page if no authorised user detected
    useEffect(() => {
        if (auth.currentUser == null)
        {
            navigate('/')
        }

        window.scrollTo(0, 0)
    }, [])

    const {question} = useContext(QuestionContext)
    var mappedQuestions = Object.entries(question)

    const [list, updateList] = useState(mappedQuestions)

    // Handles user deleting questions from view. Will filter out by index in mapped question array.
    const handleClick = (param) => {
        console.log(param)
        updateList(list.filter(item => item[0] !== param))
    }

    // Gets the search term from the header search bar, filters the mapped question array by term.
    function getSearchTerm(term) {
        if (term === '') updateList(mappedQuestions)
        else updateList(mappedQuestions.filter(item => item[0].toLowerCase().includes(term.toLowerCase()) 
        || item[1].tags.toLowerCase().includes(term) 
        || item[1].postDate.includes(term)))
    }

    return <div style={{marginTop: "130px"}}>
        <Banner text="All Questions"/>
        <div className="row question-row" style={{flexWrap: "wrap", width: "90%", borderRadius: "30px", 
     top: "0", bottom: "0", left: "0", right: "0", margin: "auto", marginTop: "60px", backgroundColor: "#F5F5F5", marginBottom: "120px"}}>
    <Header getData={getSearchTerm}/>
    {list.map( (qu) => { 
        // Concatenates the nested arrays so they are able to be indexed correctly, so custom url maps successfully
        const concatArray = mappedQuestions.reduce((questionA, questionB) => questionA.concat(questionB))
        // Creates index from concatenated array to pass to custom url
        const index = (concatArray.indexOf(qu[0]) / 2)
        return (
            <div>
                <QCard
                    link = {{ pathname: `/full-question/${index}/${qu[0]}`, state: index }}
                    title = {qu[0]}
                    description = {qu[1].description}
                    tags = {qu[1].tags} 
                    postDate = {qu[1].postDate} >
                    <button type='button' style={{color: "grey", marginLeft: "90%", background: "none", border: "none", cursor: "pointer", padding: "0"}} 
                    value={qu[0]} removequestion={qu[0]} onClick={() => handleClick(qu[0])}><CloseIcon /></button>
                </QCard> 
            </div>
        )}
    )}
        </div>
        <Footer />
    </div>
}

export default CardList
