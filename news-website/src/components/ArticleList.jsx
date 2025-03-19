import { useState } from 'react';
import Article from "./Article";
import NewArticleForm from './NewArticleForm';
import Modal from "./Modal";

function ArticleList() {

    const [articles, setArticles] = useState([
        { title: "React 101: Getting Started", content: "Learn the basics of React, a powerful UI library." },
        { title: "Understanding JSX", content: "JSX is a syntax extension for JavaScript that allows writing HTML in React." },
        { title: "Component Reusability in React", content: "Building modular components improves scalability and maintainability." }
      ]);

    const handleAddArticle = (newArticle) => {
        console.log(newArticle) // {title, content}
        console.log("Handle add article passed!")
        // setArticles(prevArticles => [...prevArticles, newArticle])
        setArticles(function(prevArticles) {
            return prevArticles.concat(newArticle);
        });    
        setShowModal(false);
    }

    const [showModal, setShowModal] = useState(false)

    return (
        <div className = "advertisement-list">
            <button onClick={() => setShowModal(true)}>Add Article</button>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <NewArticleForm onSubmit={handleAddArticle}/> 
            </Modal>
            {
                articles.map((article, index) => (
                    <Article key={index} title={article.title} content={article.content} />
                ))
            }
        </div>
    );
}

export default ArticleList;


