import React, { useState, useContext } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";


const Login = () => {
    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LoginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else {
            dispatch({ type: "USER", payload: true });
            history.push("/home");
        }
    }

    return (
        <>
            <Navbar />
            <section className="sign-in">
                <div className="container mt-5">
                    <div className="row signin-content">
                        <div className="signup-img col-md-6">
                            <figure>
                                <img src="./images/login-user.jpg" className="signup_img" alt="signup" />
                            </figure>
                            <NavLink to="/signup" className="signin-image-link">Create an account</NavLink>
                        </div>
                        <div className="signin-form col-md-6">
                            <h2 className="form-title">Login</h2>
                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="email">
                                        {/* <i className="zmdi zmdi-email material-icons-name"></i> */}
                                        <EmailIcon />
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your Email Address" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        {/* <i className="zmdi zmdi-lock material-icons-name"></i> */}
                                        <PasswordIcon />
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Your password" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="submitup" className="btn" value="Log In" onClick={LoginUser} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
