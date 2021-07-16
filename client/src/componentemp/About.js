import React, {useEffect, useState} from 'react';
import pImg from '../images/zk.jpg';
import pLogo from '../images/logo.png';
import {useHistory} from 'react-router-dom';
import Navbar from "./Navbar";


const About = () => {
    const history = useHistory();
    const [userdata, setUserdata] = useState([]);

    const callAboutPage = async () => {
        try {
            const res = await fetch('/aboute',{
                method:"GET",
                headers:{
                    Accept:"appllication/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setUserdata(data);
            console.log(`userdata: ${userdata}`)

            if(!res.status === 200){
                const error = new Error(`Status code is not 200:  ${res.error}`);
                throw error;
            }

        } catch(e){
            console.log("Error in about us page")
            console.log(e);
            history.push('/logine')
        }
    }
    useEffect(() => {
        callAboutPage();
    },[]);
    return (
        <>
            <Navbar />
            <div className="container emp_profile p-5" >
                <div className="row">
                    <div className="col-md-8 mx-auto form_content">
                    <form method="GET">
                            <div className="row">
                                <div className="col-md-4 order-2 order-lg-3 mt-5">
                                    <img src={userdata.name === "name7" ? pImg : pLogo} alt="profile pic" height="200" />
                                </div>
                                <div className="col-md-5 order-3 order-lg-3 mt-5"> 
                                    <div className='profile_head'>
                                        <h1 className='mb-5'>{userdata.name}</h1>
                                        <ul className="nav  nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab">TimeLine</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                {/* left side url  */}
                                {/* <div className="col-md-3 mt-5 profile-work">
                                    <p>WORK LINKS</p>
                                    <a href="https://www.youtube.com" target="_zk">Youtube</a><br />
                                    <a href="https://www.facebook.com" target="_zk">Facebook</a><br />
                                    <a href="https://www.instagram.com" target="_zk">Instagram</a><br />
                                    <a href="https://www.twitter.com" target="_zk">Twitter</a><br />
                                </div> */}

                                {/* Right side data toggle  */}
                                <div className="col-md-8 mt-5 ml-5 about-info">
                                    <div className="tab-content profile-tab" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>User ID</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userdata._id}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Name</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userdata.name}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Email</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userdata.email}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Phone</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{userdata.phone}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Reg no </label>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <p>{userdata.regno}</p>
                                                </div> */}
                                            </div>
                                        </div>
                                        {/* <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Experience</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Expert</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Hour Rate</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>10$/hr</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Total Project</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>230</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>English Level</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>expert</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>Availability</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>6 months</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
