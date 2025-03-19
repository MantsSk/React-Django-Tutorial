import React, { useState, useEffect } from 'react';
import Article from './Article';
import Modal from './Modal';
import NewArticleForm from './NewArticleForm';
import './ArticleList.css';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null); // For updating an article
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles from the Django API when the component mounts
  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/articles/')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setError('Failed to fetch articles.');
        setLoading(false);
      });
  }, []); // Runs only once on mount

  // Function to add a new article via POST request
  const handleAddArticle = (newArticle) => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle)
    })
    .then(response => response.json())
    .then(createdArticle => {
      setArticles(prevArticles => [createdArticle, ...prevArticles]);
      setShowModal(false);
    })
    .catch(error => console.error('Error adding article:', error));
  };

  // Function to update an existing article via PUT request
  const handleUpdateArticle = (updatedArticle) => {
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

  // Conditionally render a loading indicator or an error message
  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="article-list-container">
      <button onClick={() => setShowModal(true)}>Add New Article</button>
      
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <NewArticleForm onSubmit={handleAddArticle} />
      </Modal>

      {editArticle && (
        <Modal show={!!editArticle} onClose={() => setEditArticle(null)}>
          {/* Pass initialData to pre-populate the form for editing */}
          <NewArticleForm onSubmit={handleUpdateArticle} initialData={editArticle} />
        </Modal>
      )}
      
      <div className="article-list">
        {articles.map((article) => (
          <Article 
            key={article.id} 
            title={article.title} 
            content={article.content} 
            onEdit={() => setEditArticle(article)}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
