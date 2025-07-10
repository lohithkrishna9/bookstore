import React, { useState, useEffect } from 'react';
import BackButton from '../../componets/backbutton'; 
import Spinner from '../../componets/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Editbook=() =>{
    const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishingyear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    console.log("book ID from URL:", id); 
    setLoading(true);
    axios.get(`http://localhost:3000/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publisinghyear)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishingyear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='my-4 text-3xl'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='mr-4 text-xl text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-2 border-2 border-gray-500'
          />
        </div>
        <div className='my-4'>
          <label className='mr-4 text-xl text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='w-full px-4 py-2 border-2 border-gray-500 '
          />
        </div>
        <div className='my-4'>
          <label className='mr-4 text-xl text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishingyear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='w-full px-4 py-2 border-2 border-gray-500 '
          />
        </div>
        <button className='p-2 m-8 bg-sky-300' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Editbook