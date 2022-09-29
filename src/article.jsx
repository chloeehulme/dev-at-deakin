// Posts article to database and adds article to article.context to be displayed on 'all-articles' page.
// Allows user to select and post an image only. The image will receive the same title as the article.

import React, { useState, useContext } from 'react';
import Title from './text-box-title'
import {addCollectionAndDocument, storage} from './utilities/firebase'
import {ref, uploadBytes} from 'firebase/storage'
import './css/post-article.css';
import { ArticleContext } from './context/article.context';
import {UserContext} from './context/user.context'


function Article() {

    // Gets current date to store in database
    var postDate = new Date();
    var dd = String(postDate.getDate()).padStart(2, '0');
    var mm = String(postDate.getMonth() + 1).padStart(2, '0'); 
    var yyyy = postDate.getFullYear();

    const {article} = useContext(ArticleContext)
    const {currentUser} = useContext(UserContext);

    postDate = dd + '/' + mm + '/' + yyyy;

    var author

    const [article_in, setArticle_in] = useState({
        title: '',
        abstract:'',
        article_text: '',
        tags: ''
    })

    const {title, abstract, article_text, tags} = article_in

    // Posts the article to the database, adding post date and author, then resetting form elements
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
            const response = addCollectionAndDocument('articles', [{title, abstract, article_text, tags, postDate, author}])
            article[title] = {abstract: abstract, article_text: article_text, tags: tags, postDate: postDate, author: author}
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
        setArticle_in ((preValue)=>{  
        return {
        ...preValue,
        [name]: value
        }})
    }

    const [imageUpload, setImageUpload] = useState(null)

    // Handles user image upload to firestore storage bucket
    const uploadImage = (e) => {
        e.preventDefault()
        if (imageUpload == null) {
            return
        }

        try {
            const imageRef = ref(storage, 'articles/' + article_in.title.toLowerCase());
            if (!article_in.title) {
                throw new Error()
            }
            uploadBytes(imageRef, imageUpload).then(() => {
                alert("image uploaded successfully")
            })
        } catch (error) {alert("Please add a title to your article.")}
    }

    return (
        <div className="post">
            <form id='myForm' onSubmit={handleSubmit}>
                <div className='title-container'>
                    <Title text="Title"/>
                </div>
                <textarea name='title' type='text' value={article.title} onChange={handleChange} placeholder="Start your article with how, what, why, etc..."/>
                <div className='title-container' style={{marginRight: "65%"}}>
                    <Title text="Add an image:"/>
                </div>
                <div className='title-container' >
                    <input type="file" accept="image/*" onChange={(e) => {setImageUpload(e.target.files[0])}}></input>
                    <button className="file-upload" onClick={uploadImage}>Upload</button>
                </div>
                <div className='title-container'>
                    <Title text="Abstract" className="abstract"/>
                </div>
                <textarea name='abstract' type='text' value={article.abstract} onChange={handleChange} placeholder="Enter a 1-paragraph abstract" style={{height: "75px"}}/>
                <div className='title-container'>
                    <Title text="Article Text"/>
                </div>
                <textarea name='article_text' type='text' value={article.article_text} onChange={handleChange} style={{height: "300px"}}/>
                <div className='title-container'>
                    <Title text="Tags"/>
                </div>
                <textarea name='tags' type='text' value={article.tags} onChange={handleChange} placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"/>
                <div className='container post-button'>
                    <button type='submit'>POST</button>
                </div>
            </form>
        </div>
    );
}

export default Article;