import { useState } from 'react'
import './NewArticleForm.css'
function NewArticleForm({onSubmit}) {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({title, content}) // Submittinam jau kas irasyta
        setTitle("") // resettinam values
        setContent("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Article</h2>
            <div className='form-group'>
                <label>Title:</label>
                <input 
                    id="title"
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>
                <div className='form-group'>
                    <label>Content:</label>
                    <input 
                        id="content"
                        type="text" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                />                
                </div>
            <button type="submit">Add Article</button>
        </form>
    );
}

export default NewArticleForm;