import './Article.css';
import {useState} from 'react';
import { Link } from 'react-router-dom'


function Article(props) {

    const [clickCount, setClickCount] = useState(0)
    const [liked, setLiked] = useState(false)

    console.log({props})


    // Function to increment count
    // function incrementCount(prevCount) {
    //     return prevCount + 1;
    // }

    // // Click handler function
    // function handleArticleClick() {
    //     setClickCount(incrementCount);
    // }

    const handleButtonClick = () => {
        setLiked(prevLiked => !prevLiked) 
    }
    
    const handleArticleClickCount = () => {
        setClickCount(prevCount => prevCount + 1)
    }
    
    return (
        <article className={`article ${liked ? 'liked' : ' '}`  } onClick={handleArticleClickCount}>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
            <p>This article was clicked {clickCount} times!</p>
            <button onClick={handleButtonClick}>
                {liked ? 'Unlike': 'Like'}
            </button>
            {props.onEdit && <button onClick={props.onEdit}>Edit</button>}
            <Link to={`/articles/${props.id}`} className="read-more-link">
                Read More
            </Link>
            <button onClick={() => props.onDelete(props.id)}>
               Delete
            </button>
        </article>
    );
}

export default Article;