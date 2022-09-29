// Handles conditional rendering of article vs questions for the post page

import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import Banner from './Banner'
import Question from './question'
import Article from './article';
import './css/radio.css';

function RadioGroup(props) {
    
    // Load page at top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { register, watch } = useForm();
    const postType = watch('postType')

    return (
        <div>
            <div className='radio-group'>
                <form className="container" >
                    <h4>
                        Selected Post Type:
                    </h4>
                    <div className="question">
                        <input 
                            type='radio'
                            id='question'
                            name='radioGroup'
                            value='question'
                            {...register('postType', {required: true})}
                            onClick={()=>props.getData(postType)}
                        />
                        <label for="question">Question</label>
                    </div>
                    <div className="article">
                        <input
                            type='radio'
                            id='article'
                            name='radioGroup'
                            value='article'
                            defaultChecked
                            {...register('postType', {required: true})}
                            onClick={()=>props.getData(postType)}
                        />
                        <label for="article">Article</label>
                    </div>
                </form>
            </div>

            <Banner text = "What do you want to ask or share..." />

            {postType === 'question' ? <Question /> : <Article />}
        </div>
    )
}

export default RadioGroup;