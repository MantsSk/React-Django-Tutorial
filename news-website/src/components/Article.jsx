import React, { useState } from 'react';
import './Article.css';

function Article(props) {
    const [clickCount, setClickCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleButtonClick = (event) => {
        event.stopPropagation();
        setLiked(prevLiked => !prevLiked);
    };

    const handleArticleClickCount = () => {
        setClickCount(prevCount => prevCount + 1);
    };

    return (
        <article className={`article ${liked ? 'liked' : ''}`} onClick={handleArticleClickCount}>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
            <p>This article was clicked {clickCount} times!</p>
            <button onClick={handleButtonClick}>
                {liked ? 'Unlike' : 'Like'}
            </button>
            {props.onEdit && (
                <button onClick={(e) => { e.stopPropagation(); props.onEdit(); }}>
                    Edit
                </button>
            )}
        </article>
    );
}

export default Article;
