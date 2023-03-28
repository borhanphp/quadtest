import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { data, ThemeContext } from '../App';

const AllUsers = () => {

  // mode change 
const toggle = useContext(ThemeContext);


const [currentPage, setCurrentPage] = useState(0);
const [users, setUsers] = useState([]);
const [searchInput, setSearchInput] = useState('');
const [totalPages, setTotalPages] = useState(0);

const perPage = 8;
const pages = 10;

useEffect(() => {
  const fetchData = async () => {
    const data = await getUsers(currentPage);
    setUsers(data);
  };
  fetchData();
}, [currentPage]);

const getUsers = async (currentPage) => {
  const response = await fetch(`https://api.github.com/users?per_page=${perPage}&since=${currentPage}`);
  const data = await response.json();
  console.log('data',data);
  setTotalPages(Math.ceil(10));
  return data;
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
  
  try {
    const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(search)}&per_page=${perPage}&since=${currentPage}`);
    const data = response.data;
    setUsers(data.items);
    setTotalPages(Math.ceil(20));
  } catch (error) {
    console.error(error);
  }
};

 const handlePageClick = (data) => {
  setCurrentPage(data.selected + 1);
};

 
  return (
    <>
      <div className='container'>
        <div className='search-container'>
          <div className='row justify-content-center'>
            <div className='col-12 mb-2'>
              <div className='search-box'>
              <Input className={`${toggle.theme === 'dark' ? 'bg-dark text-white' : 'bg-white'}`} placeholder='Search By Username' value={searchInput} onChange={(e) => handleSearch(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>
        <div className='clearfix'>
          <div className='row'>
            {users?.map((data) => (
              <div className='col-md-3 animated fadeIn mb-2' key={data.id}>
                <Link to={`/user/${data.login}`} className='link-style'>
                  <div className={`card ${toggle.theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                    <div className={`card-body ${toggle.theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                      <div className='avatar'>
                        <img src={data.avatar_url} className='card-img-top' alt='' />
                      </div>
                      <h5 className={`card-title ${toggle.theme === 'dark' ? 'text-white' : 'text-dark'}`}>{data.login.toUpperCase()}</h5>
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