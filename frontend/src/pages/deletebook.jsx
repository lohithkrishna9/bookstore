import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/backbutton';
import Spinner from '../components/spinner';

// Error Boundary to catch runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in <Deletebook>:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-xl text-red-600">
          Something went wrong while deleting the book.
        </div>
      );
    }
    return this.props.children;
  }
}

// Actual Deletebook Component
const Deletebook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='my-4 text-3xl'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button
          className='w-full p-4 m-8 text-white bg-red-600 rounded-md hover:bg-red-700'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

// Wrap and export with error boundary
export default function DeletebookWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Deletebook />
    </ErrorBoundary>
  );
}
