// Posts question to database and adds posted question to question.context to be displayed on 'all questions' page.

import React, { useState,useContext } from 'react';
import Title from './text-box-title';
import {addCollectionAndDocument} from './utilities/firebase';
import './css/post-article.css';
import './css/post-button.css';
import { QuestionContext } from './context/question.context';
import Editor from './Editor';

function Question() {

    // Gets current date
    var postDate = new Date();
    var dd = String(postDate.getDate()).padStart(2, '0');
    var mm = String(postDate.getMonth() + 1).padStart(2, '0'); 
    var yyyy = postDate.getFullYear();

    const {question} = useContext(QuestionContext)

    postDate = dd + '/' + mm + '/' + yyyy;

    const [question_in, setQuestion_in] = useState({
        title: '',
        description:'',
        tags: ''
    })

    const {title, description, tags} = question_in

    // Adds question to database and updates question context to display question on 'all questions' page
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            return
        }
        try {
            const response = addCollectionAndDocument('questions', [{title, description, tags, postDate, code}])
            question[title] = {description: description, tags: tags, postDate: postDate, code: code}
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
        setQuestion_in ((preValue)=>{  
        return {
        ...preValue,
        [name]: value
        }})
    }

    const [code, setCode] = useState("");

    return (
        <div className="post">
            <form id='myForm' onSubmit={handleSubmit}>
                <div className='title-container'>
                    <Title text="Title"/>
                </div>
                <textarea name='title' type='text' value={question.title} onChange={handleChange} placeholder="Start your article with how, what, why, etc..."/>
                <div className='title-container'>
                    <Title text="Describe Your Problem" className="description"/>
                </div>
                <textarea name='description' type='text' value={question.description} onChange={handleChange} style={{height: "200px"}}/>
                <div className='title-container'>
                    <Title text="Code Editor" className="codepen"/>
                </div>
                <Editor
                    language="javascript"
                    value={code}
                    onChange={setCode}
                />
                <div className='title-container'>
                    <Title text="Tags"/>
                </div>
                <textarea name='tags' type='text' value={question.tags} onChange={handleChange} placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"/>
                <div className='container post-button'>
                    <button type='submit'>POST</button>
                </div>
            </form>
        </div>
    )
}

export default Question;