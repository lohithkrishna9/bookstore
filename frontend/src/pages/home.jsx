import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-sky-800 hover:text-sky-600" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                {['No', 'Title', 'Author', 'Publish Year', 'Operations'].map((header) => (
                  <th key={header} className="p-2 font-medium text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td className="p-2 text-center border rounded-md">{index + 1}</td>
                  <td className="p-2 border rounded-md">{book.title}</td>
                  <td className="p-2 border rounded-md">{book.author}</td>
                  <td className="p-2 border rounded-md">{book.publishingyear}</td>
                  <td className="p-2 border rounded-md">
                    <div className="flex justify-center gap-3">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-xl text-blue-600 hover:text-blue-800" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-800" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;