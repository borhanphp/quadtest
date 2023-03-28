import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { data } from '../App';

const AllUsers = () => {
  const allUsers = useContext(data);

const [currentPage, setCurrentPage] = useState(0);
const [users, setUsers] = useState([]);
const [searchInput, setSearchInput] = useState('');
const [totalPages, setTotalPages] = useState(0);

const perPage = 8;
const pages = 10;
const baseUrl = "https://api.github.com/users";

useEffect(() => {
  getUsers(currentPage);
}, [currentPage]);

// loading all users on first load
const getUsers = async (page) => {
  const token = "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";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  
  try {
    const response = await fetch(`${baseUrl}?per_page=${perPage}&since=${page * perPage}`, { headers });
    const data = await response.json();
    setUsers(data);
    setTotalPages(pages);
  } catch (error) {
    console.error(error);
  }
};


  // this function is for searching data from api
  const handleSearch = (value) => {
    if (value === "") {
      getUsers(0);
      setSearchInput("");
    } else {
      setSearchInput(value);
      searchResult(value, 1);
    }
  };
  
  const searchResult = async (search, page) => {
    const token = "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";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(search)}&per_page=${perPage}&since=${currentPage}`,{ headers });
      const data = response.data;
      setUsers(data.items);
      setTotalPages(Math.ceil(pages));
    } catch (error) {
      console.error(error);
    }
  };

 const handlePageClick = (data) => {
  setCurrentPage(data.selected);
};



 
  return (
    <>
      <div className='container'>
        <div className='search-container'>
          <div className='row justify-content-center'>
            <div className='col-12 mb-2'>
              <div className='search-box'>
                <Input placeholder='Search By Username' value={searchInput} onChange={(e) => handleSearch(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>
        <div className='clearfix'>
          <div className='row'>
            {users?.map((data) => (
              <div className='col-md-3 animated fadeIn mb-2' key={data.id}>
                <Link to={`/user/${data.login}`} className='link-style'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='avatar'>
                        <img src={data.avatar_url} className='card-img-top' alt='' />
                      </div>
                      <h5 className='card-title '>{data.login.toUpperCase()}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-4'>
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers
