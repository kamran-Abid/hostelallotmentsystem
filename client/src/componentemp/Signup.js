import React, {useState} from 'react'; 
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
        name:"", email:"", phone:"",sk:"", password:"", cpassword:"" 
    });
    const skey = "secretkey"; 
    

    const handleInput = (e) => {
        // This is for applicant
        name = e.target.name;
        value = e.target.value;
        
        setUser({...user, [name]:value});
    }

    const PostData = async(e) => {
        e.preventDefault();

        const {name, email, phone, sk, password, cpassword } = user;

        console.log(`sk : ${sk}`);

        const res = await fetch("/registere", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, sk              , password, cpassword
            })
        });

        const data = await res.json();
        if(res.status === 420 || !data){
            window.alert(`Please fill all fields`);
            console.log(`Please fill all fields`);
        } else if(res.status === 421 || !data){
            window.alert(`Email already exist`);
            console.log(`Email already exist`);
        }  else if(res.status === 423 || !data){
            window.alert(`password are not matching`);
            console.log(`password are not matching`);
        } else if(res.status === 427 || !data){
            window.alert(`Invalid secret key`);
            console.log(`Inavalid scret key`);
        } else {
            window.alert("Registration successful");
            console.log("Registration successful");

            history.push("/logine")
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
                                    <label htmlFor="name"> 
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
                                    <label htmlFor="secret_key"> 
                                        <WorkIcon />
                                    </label>
                                    <input type="string" name="sk" id="sk" autoComplete="off"
                                    value={user.sk} onChange={handleInput}
                                    placeholder="Employee secret key" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <PasswordIcon />
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                    value={user.password} onChange={handleInput}
                                    placeholder="Your password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword"> 
                                        <PasswordIcon />
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                    value={user.cpassword} onChange={handleInput}
                                    placeholder="Confirm password" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="btn" value="Register" onClick={PostData} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-img col-md-6 order-1 order-lg-2 ">
                                <img src="images/signup-admin.jpg" className="signup_img" alt="signup image for employee" />
                                <NavLink to="/logine" className="signup-image-link">I am already registered</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
