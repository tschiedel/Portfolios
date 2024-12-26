import React from 'react';
import './Admin.css';
import blogFetch from '../axios/config';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {

    const [posts, setPosts] = useState([]);

    const getPosts = async() => {
  
      try {
        const response = await blogFetch.get("/posts"); 
        //acessa apenas o endPoit através do Blogfetch definido na baseURL
        const data = response.data;
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
  
    };

    useEffect(() => {
        getPosts();
    }, []);

    const deletePost = async(id) => {
        await blogFetch.delete(`/posts/${id}`);
        //removendo o post da dom
        const filteredPost = posts.filter((post) => post.id !== id);
        setPosts(filteredPost);
    };
  
    return (
        <div className='admin'>
            <h1>Gerenciar posts</h1>
            {posts.length === 0 ? (<p>Carregando...</p>) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <div className="actions">
                            <Link 
                                className='btn edit-btn'
                                to={`/posts/edit/${post.id}`}
                            >
                                Editar
                            </Link>
                            <button 
                                className='btn delete-btn'
                                onClick={() => deletePost(post.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Admin;
