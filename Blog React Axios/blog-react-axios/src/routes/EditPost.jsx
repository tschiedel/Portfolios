import React from 'react';
import './EditPost.css';
import blogFetch from '../axios/config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = () => {

    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const {id} = useParams();

    const getPost = async() => {
        try {
            console.log(id);
            const response = await blogFetch.get(`/posts/${id}`);

            const data = response.data;
            setTitle(data.title);
            setBody(data.body);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        getPost();
    }, []);

    const editPost = async(e) => {
      e.preventDefault();
      const post = {title, body, userId: 1};
      await blogFetch.put(`/posts/${id}`, {
        body: post,
      });
    };

  return (
    <div className='new-post'>
      <h2>Editando: {title}</h2>

      <form onSubmit={(e) => editPost(e)}>

        <div className="form-control">
          <label htmlFor='title'>Título:</label>
          <input 
            type="text" 
            name='title' 
            id='title' 
            placeholder='Digite o título do post'
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>

        <div className="form-control">
          <label htmlFor='body'>Conteúdo:</label>
          <textarea
            name='body' 
            id='body' 
            placeholder='Digite o conteúdo do post'
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          />
        </div>

        <input type="submit" value="Editar Post" className='btn'/>
      </form>
    </div>
  );
};

export default EditPost;
