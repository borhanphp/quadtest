import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import PaginationCom from './Pagination';
import { data } from '../App';

const AllUsers = () => {

  const allUsers = useContext(data);

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);

  useEffect(() => {
    setUserData(allUsers);
  }, [allUsers]);



  // this snippet is for pagination
  let indextOfLastData = currentPage * dataPerPage;
  let indexOfFirstData = indextOfLastData - dataPerPage;
  let currentData = userData.slice(indexOfFirstData, indextOfLastData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // this function is searching serverside data from api
  const searchResult = (search) => {
      const url = `https://api.github.com/search/users?q=${encodeURIComponent(search)}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const userData = data.items;
          setUserData(userData);
        });
    };




  return (
    <>
      <div className='container'>
        <div className='search-container'>
          <div className="row justify-content-center">
            <div className='col-12 mb-2'>
              <div className='search-box'>
                <Input placeholder='Search By Username' onChange={(e) => searchResult(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className="row">
            {currentData.map(data => (
              <div className="col-md-3 animated fadeIn mb-2" key={data.id}>
                <Link to={`/user/${data.login}`} className="link-style">
                  <div className="card">
                    <div className="card-body">
                      <div className="avatar">
                        <img
                          src={data.avatar_url}
                          className="card-img-top"
                          alt=""
                        />
                      </div>
                      <h5 className="card-title ">
                        {data.login.toUpperCase()}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-4'>
            <PaginationCom dataPerPage={dataPerPage} totalData={userData.length} paginate={paginate} />
          </div>
        </div>
      </div>
    </>

  )
}

export default AllUsers
