// Template for frequently asked question card

import React from 'react'
import './css/faqCard.css';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const FaqCard = (props) =>
{
    return <div className='faq-card-container'>
        <span className='symbol'><QuestionMarkIcon style={{fontSize: "70px", marginTop: "15px", color: "rgb(249, 140, 78)"}}/></span>
        <div>
            <div className='header-symbol'>
                <h3 className='faq-card-header'>{props.question}</h3>
            </div>
            <div className='question-answer'>
                <div className='faq-question'>
                    <p>{props.answer}</p>
                </div>
            </div>
        </div>
    </div>
}

export default FaqCard