import React, {useState} from 'react';
import RegnoIcon from '@material-ui/icons/IndeterminateCheckBox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/PhoneBluetoothSpeakerTwoTone';
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Slideshow';
import PasswordIcon from '@material-ui/icons/Lock';
import { NavLink, useHistory } from 'react-router-dom';
import Navbar from "./Navbar";


const Signup = () => {
    const history = useHistory();
    let name, value;
    const [user, setUser] = useState({
        regno:"", name:"", email:"", phone:"", gpa:"", password:"", cpassword:"", year:"" 
    });
    

    const handleInput = (e) => {
        // This is for applicant
        name = e.target.name;
        value = e.target.value; 

        setUser({...user, [name]:value});
    }

    const PostData = async(e) => {
        e.preventDefault();

        const { regno, name, email, phone, gpa, password, cpassword, year } = user;

        const res = await fetch("/register", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                regno, name, email, phone, gpa, password, cpassword, year
            })
        });

        const data = await res.json();
        if(res.status === 420 || !data){
            window.alert(`Please fill all fields`);
            console.log(`Inavalid registration`);
        } else if(res.status === 421 || !data){
            window.alert(`Email already exist`);
            console.log(`Inavalid registration`);
        } else if(res.status === 422 || !data){
            window.alert(`Regno already exist`);
            console.log(`Inavalid registration`);
        } else if(res.status === 423 || !data){
            window.alert(`password are not matching`);
            console.log(`Inavalid registration`);
        } else if(res.status === 428 || !data){
            window.alert(`gpa should not be less then 0`);
            console.log(`gpa should not be greater then 4`);
        } else if(res.status === 427 || !data){
            window.alert(`gpa should not be greater then 4`);
            console.log(`gpa should not be less then 0`);
        }else {
            window.alert("Registration successful");
            console.log("Registration successful");

            history.push("/login")
        } 
    }

    return (
        <>
            <Navbar />
            <section className="signup">
                <div className="container mt-5">
                    <div className="row signup-content">
                        <div className="signup-form col-md-6 order-2 order-lg-2">
                            <h2 className="form-title">Sign Up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="regno">
                                        {/* regno */}
                                        <RegnoIcon />
                                    </label>
                                    <input type="text" name="regno" id="regno" autoComplete="off"
                                    value={user.regno} onChange={handleInput}
                                    placeholder="Your Registration No" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">
                                        {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                                        <AccountCircle />
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off"
                                    value={user.name} onChange={handleInput}
                                    placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        {/* <i className="zmdi zmdi-email material-icons-name"></i> */}
                                        <EmailIcon />
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off"
                                    value={user.email} onChange={handleInput}
                                    placeholder="Your Email Address" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        {/* <i className="zmdi zmdi-phone-in-talk material-icons-name"></i> */}
                                        <PhoneIcon />
                                    </label>
                                    <input type="number" name="phone" id="phone" autoComplete="off"
                                    value={user.phone} onChange={handleInput}
                                    placeholder="Your Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="work">
                                        {/* <i className="zmdi zmdi-slideshow material-icons-name"></i> */}
                                        <WorkIcon />
                                    </label>
                                    <input type="number" name="gpa" id="gpa" autoComplete="off"
                                    value={user.gpa} onChange={handleInput}
                                    placeholder="Your CGPA" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        {/* <i className="zmdi zmdi-lock material-icons-name"></i> */}
                                        <PasswordIcon />
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                    value={user.password} onChange={handleInput}
                                    placeholder="Your password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                                        <PasswordIcon />
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                    value={user.cpassword} onChange={handleInput}
                                    placeholder="Confirm password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="year">
                                        {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                                        <PasswordIcon />
                                    </label>
                                    <select className="form-select form-select-lg mb-3 selectInp" aria-label=".form-select-lg example" 
                                    name="year" value={user.year} onChange={handleInput}>
                                        <option selected>Year in university</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div> 

                                
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="btn" value="Register" onClick={PostData} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-img col-md-6 order-1 order-lg-2 ">
                                <img src="./images/signin-user.jpg" className="signup_img" alt="signup" />
                                <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
