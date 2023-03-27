import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RiUserFollowLine } from 'react-icons/ri'
import { BiLike } from 'react-icons/bi'
import { SiRadiopublic } from 'react-icons/si'
import { MdPublic } from 'react-icons/md'

const UserDetails = () => {
    const { login } = useParams();
    const [user, setUser] = useState([]);


    useEffect(() => {
        getUserData();
    });

    const getUserData = async () => {
        let users = await fetch(`https://api.github.com/users/${login}`);
        let userData = await users.json();
        setUser(userData);
        // console.log(user);
    }




    return (
        <>

            <div className='main-container container'>
                <div className="page-title">
                    <div className="row gutters">
                        <div className="col-md-12">
                            <h5 className="title">User Profile</h5>
                        </div>
                    </div>
                </div>
                <div className='content-wrapper container'>
                    <div className='row gutters'>
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                            <header className='custom-banner'>
                                <div className='row gutters'>
                                    <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12'>
                                        <div className='welcome-msg'>
                                            <div className='welcome-user-thumb'>
                                                <img src={user.avatar_url} className="details-img" />
                                            </div>
                                            <div className='welcome-title'>{user.name}</div>
                                            <div className='welcome-designation'>Location: {user.location}</div>
                                            <div className='welcome-email'>Company: {user.company}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-8 flex-container row px-1">
                                        <div className='gutters user-plans justify-content-center flex-items col-md-4'>

                                            <div className='welcome-msg p-2'>
                                                <div className='welcome-designation'>
                                                    <h4>Website</h4>
                                                    <p><a className='text-white' href={user.blog}>{user.blog}</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='gutters user-plans justify-content-center flex-items col-md-4'>

                                            <div className='welcome-msg p-2'>
                                                <div className='welcome-designation'>
                                                    <h4>Github Link</h4>
                                                    <p><a className='text-white' href={user.html_url}>Click Here</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='gutters user-plans justify-content-center flex-items col-md-4'>
                                            <div className='welcome-msg p-2'>
                                                <div className='welcome-designation'>
                                                    <h4>Twitter</h4>
                                                    <p><a className='text-white' href={`https://twitter.com/${user.twitter_username}`}>{user.twitter_username}</a></p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </header>
                        </div>
                    </div>

                    <div className='row gutters justify-content-center'>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="daylight">
                                <div className="activity-icon blue">
                                    <RiUserFollowLine />
                                </div>
                                <h6>Followers</h6>
                                <h1>{user.followers}</h1>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="daylight">
                                <div className="activity-icon blue">
                                    <BiLike />
                                </div>
                                <h6>Following</h6>
                                <h1>{user.following}</h1>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="daylight">
                                <div className="activity-icon blue">
                                    <SiRadiopublic />
                                </div>
                                <h6>Public Repos</h6>
                                <h1>{user.public_repos}</h1>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="daylight">
                                <div className="activity-icon blue">
                                    <MdPublic />
                                </div>
                                <h6>Public Gists</h6>
                                <h1>{user.public_gists}</h1>
                            </div>
                        </div>
                    </div>

                    <div className='row gutters'>
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 bg-dark'>
                            <header className='custom-banner bg-dark'>
                                <h3 className='text-white'>Latest Reposatory Of {user.name}</h3>
                                <p><a className='text-white' href={`${user.repos_url}`}>{user.repos_url}</a></p>
                            </header>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default UserDetails