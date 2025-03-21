import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/articles/${id}/`)
        .then(response => response.json())
        .then(data => {
            setArticle(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching article:", err);
            setError("Error fetching article");
            setLoading(false);
        });
    }, [id])

    if (loading) return <p>Loading articles...</p>
    if (error) return <p>{error}</p>
    if(!article) return <p>No article found</p>

    return (
        <div className="article-detail">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p><em>Published on: {new Date(article.published_at).toLocaleDateString()}</em></p>
        </div>
    )
}

export default ArticleDetail;