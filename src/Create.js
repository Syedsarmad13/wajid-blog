import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Create = () => {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [author, setAuthor] = useState('');
const [isPending, setIsPending] = useState(false);
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {title, body, author};
    setIsPending(true)

    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        header: {'Content type' : 'application/json'},
        body: JSON.stringify(blog)
    }).then(()=> console.log('Blog added'))
        setIsPending(false)
        navigate('/create');
}

    return ( 
        <div className="create">
         <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input 
            type="text" 
            required 
            value= {title}
            onChange={(e)=> setTitle(e.target.value)}/>
          <label>Blog body:</label>
          <textarea 
            required
            value = {body}
            onChange={(e) => setBody(e.target.value)}>
          </textarea>
          <label>Blog author</label>
            <select
             value={author}
             onChange={(e)=> setAuthor(e.target.value)}>
             <option value="Sarmad">Sarmad</option>
             <option value="Asjad">Asjad</option>
            </select>
            {!isPending && <button>Add Blog</button>}
            {isPending && <button disabled>Adding Blog</button>}

            <p>{title}</p>
            <p>{body}</p>
            <p>{author}</p>
         </form>
        </div>

     );
}
 
export default Create;