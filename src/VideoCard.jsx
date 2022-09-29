// Card template for Tutorial cards

import React from 'react'
import './css/Card.css'
import './css/video.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const VideoCard = (props) =>
{
    return <div className='column'>
        <div class="thumbnail-container">
            <div class="thumbnail">
                <iframe title='video-card' src={props.video} frameborder="0" onload="this.style.opacity = 1"></iframe>
            </div>
        </div>
        <h3>{props.title}</h3>
        <p className='text-colour-grey' >{props.abstract}</p>
        <div className='rating-author'>
            <div>
                <div className='author'>
                    <h5 className='fname' style={{color: "#3E3E3E", fontWeight: "normal", marginRight: "12px"}}>{props.postDate}</h5>
                    <h5 className='fname'>{props.author}</h5>
                </div>
                <div style={{color: "#3E3E3E", marginTop: "5px"}}>
                    <VisibilityIcon style={{fontSize: "17px", color: "#f98c4e", verticalAlign: "middle", paddingBottom:"3px"}}/>
                    <span style={{marginLeft: "8px"}}>{props.views}</span>
                    <StarBorderIcon style={{fontSize: "17px", color: "#c74298", marginLeft: "30px", verticalAlign: "middle", paddingBottom:"3px"}}/>
                    <span style={{marginLeft: "8px"}}>{props.rating}</span>
                </div>
            </div>
        </div>
    </div>
}

export default VideoCard

