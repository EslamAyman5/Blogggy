import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEditBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/blogs", { title, body, tags: tags.split(",") }, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(() => navigate("/"))
    .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Create a Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEditBlog;
