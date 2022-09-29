// Template for post button

import React from 'react';
import './css/post-button.css';

function PostButton(props) {
    return (
        <div className='post-button'>
            <div className='container'>
                <button type='submit'>{props.text}</button>
            </div>
        </div>
    )
}

export default PostButton;