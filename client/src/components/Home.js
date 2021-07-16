import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../App";
import { NavLink } from 'react-router-dom';

import Navbar from "./Navbar";


const Home = () => {
    let { state, dispatch } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [show, setShow] = useState(false);
    const userHome = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            setUsername(data.name);
            setShow(true);
            dispatch({ type: "USER", payload: true });

            if (!res.status === 200) {
                const error = new Error(`Status code is not 200:  ${res.error}`);
                throw error;
            }

        } catch (e) {
            console.log("Error in home us page")
            console.log(e);
        }
    }
    useEffect(() => {
        userHome();
    }, []);
    return (
        <>
            <Navbar />
            <div className="Home_page">
                <div className="Home_div">
                    <p className="pt-5">Welcome</p>
                    <h1>{username}</h1>
                    {show ? <NavLink className="btn btnmain m-3" to="/allotment" >Allot Room</NavLink> : <h2>You are login yet as applicant</h2>}
                </div>
            </div>
        </>
    )
}

export default Home
