import { useState, useEffect } from 'react';
import Article from "./Article";
import NewArticleForm from './NewArticleForm';
import Modal from "./Modal";

function ArticleList() {

    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editArticle, setEditArticle] = useState(null); // For updating an article

    // Fetch articles from the Django API when the component mounts
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/articles/', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setArticles(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching articles:', err);
            setError("Failed to fetch articles");
            setLoading(false);
        });
    }, []); // Runs only once on mount


    const handleAddArticle = (newArticle) => {
        console.log(newArticle)
        fetch('http://127.0.0.1:8000/api/articles/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newArticle)
        })
        .then(response => response.json())
        .then(createdArticle => {
            setArticles(prevArticles => [createdArticle, ...prevArticles]) // prie previous articles concatinam new article
            setShowModal(false);
        })
        // setArticles(prevArticles => [...prevArticles, newArticle])
        // setArticles(function(prevArticles) {
        //     return prevArticles.concat(newArticle);
        // });    
        // setShowModal(false);
    }

      // Function to update an existing article via PUT request
    const handleUpdateArticle = (updatedArticle) => {
        console.log(updatedArticle)
        fetch(`http://127.0.0.1:8000/api/articles/${updatedArticle.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedArticle)
        })
        .then(response => response.json())
        .then(data => {
            setArticles(prevArticles =>
            prevArticles.map(article => article.id === data.id ? data : article)
            );
            setEditArticle(null);
        })
        .catch(error => console.error('Error updating article:', error));
    };

        // Function to update an existing article via PUT request
    const handleDeleteArticle = (deletedArticle) => {
        console.log(deletedArticle)
        fetch(`http://127.0.0.1:8000/api/articles/${deletedArticle}/`, {
        method: 'delete'
        })
        .then(response => {
            if (response.ok) {
                setArticles(prevArticles =>
                    prevArticles.filter(article => article.id != deletedArticle)
                );
            }
            else {
                throw new Error ("Failed to delete article!")
            }
        })
        .catch(error => console.error('Error deleting article:', error));
    }


    if (loading) return <p>Loading articles...</p>
    if (error) return <p>{error}</p>


    return (
        <div className = "advertisement-list">
            <button onClick={() => setShowModal(true)}>Add Article</button>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <NewArticleForm onSubmit={handleAddArticle}/> 
            </Modal>

            {editArticle && (
                <Modal show={!!editArticle} onClose={() => setEditArticle(null)}>
                {/* Pass initialData to pre-populate the form for editing */}
                <NewArticleForm onSubmit={handleUpdateArticle} initialData={editArticle} />
                </Modal>
            )}
            {
                articles.map((article, index) => (
                    <Article id={article.id} key={index} title={article.title} content={article.content} onEdit={() => setEditArticle(article)} onDelete={handleDeleteArticle}/>
                ))
            }
        </div>
    );
}

export default ArticleList;


