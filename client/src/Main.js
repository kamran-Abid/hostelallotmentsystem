import React, { createContext, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
//import "./App.css";


const Main = () => {
    return (
        <>
            <div className="carcon mx-auto">
                <h1>Welcome to Hostel Allotment System</h1>
                <div className="carbtn">
                    <NavLink className="btn btn-success" to="/home">I'm Applicant</NavLink>
                    {/* <UserContext.Provider value={{ state, dispatch }}> */}
                    <NavLink className="btn btn-warning" to="/dashboard">I'm Employees</NavLink>
                    {/* </UserContext.Provider> */}
                </div>
            </div>

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000" data-pause="none">
                <div className="carblack"></div>
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner carousel-div my-auto">
                    <div className="carousel-item">
                        <img className="d-block w-100" src="images/carl3.jpeg" alt="Third slide" />
                    </div>
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="images/carl1.jpeg" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="images/carl4.jpeg" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="images/carl2.jpeg" alt="Third slide" />
                    </div>
                </div>
                {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span> 
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span> 
                    <span className="sr-only">Next</span>
                </a> */}
            </div>
        </>
    )
}

export default Main
