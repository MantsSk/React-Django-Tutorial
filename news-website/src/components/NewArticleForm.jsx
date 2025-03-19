import React, { useState } from 'react';

function NewArticleForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [content, setContent] = useState(initialData ? initialData.content : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the article data, including the id if editing
    const articleData = {
      title,
      content,
    };

    // If initialData is provided and contains an id, add it
    if (initialData && initialData.id) {
      articleData.id = initialData.id;
    }
    
    onSubmit(articleData);
    // Optionally, reset the form fields if not editing
    if (!initialData) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Article" : "Create New Article"}</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input 
          id="title"
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea 
          id="content"
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          required 
        />
      </div>
      <button type="submit">{initialData ? "Update Article" : "Add Article"}</button>
    </form>
  );
}

export default NewArticleForm;
