import React, {useState, useEffect} from 'react';
import PhoneIcon from '@material-ui/icons/PhoneBluetoothSpeakerTwoTone';
import EmailIcon from '@material-ui/icons/Email';
import AddressIcon from '@material-ui/icons/LocationCity';
import Navbar from "./Navbar";




const Contact = () => {
    const [userdata, setUserdata] = useState({name: "", email: "", phone: "", message: "" });
    // show data
    const userContact = async () => {
        try {
            const res = await fetch('/getdatae',{
                method:"GET",
                headers:{
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            setUserdata({...userdata, name:data.name, email:data.email, phone:data.phone});
            //setUserdata({ ...userdata, name:"zafeer", email:"emilzk@gmail.com",phone:"29396030001"});

            if(!res.status === 200){
                const error = new Error(`Status code is not 200:  ${res.error}`);
                throw error;
            }

        } catch(e){
            console.log("Error in contact us page of emploee")
            console.log(e);
        }
    }
    useEffect(() => {
        userContact();
    },[]);

    // We are storing data of inputs in states
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserdata({ ...userdata, [name]:value });
    }

    // Send data back end
    const contactForm = async (e) => {
        e.preventDefault();

        const {name, email, phone, message} = userdata;

        const res = await fetch('/contact',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,phone,message
            })
        });
        const data = await res.json();

        if(!data){
            console.log("Message not send");
        } else {
            window.alert("Message saved successfully");
            setUserdata({ ...userdata, message: "" })
        }
    }

    return (
        <>
        <Navbar />
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="row mt-5">
                                {/* Phone number */}
                                <div className="contact_info_item col-sm-4 col-12  d-flex justify-content-start">
                                    <div className="d-flex justify-content-center align-items-center m-3">
                                        <PhoneIcon />
                                    </div>
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">Phone</div>
                                        <div className="contact_info_text">+92 304 055 0911</div>
                                    </div>
                                </div>
                                {/* Email  */}
                                <div className="contact_info_item col-sm-4 col-12 d-flex justify-content-start">
                                    <div className="d-flex justify-content-center align-items-center m-3">
                                        <EmailIcon />
                                    </div>
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">Email</div>
                                        <div className="contact_info_text">email@gmail.com</div>
                                    </div>
                                </div>
                                {/* Address */}
                                <div className="contact_info_item col-sm-4 col-12 d-flex justify-content-start">
                                    <div className="d-flex justify-content-center align-items-center m-3">
                                        <AddressIcon />
                                    </div>
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">Addresss</div>
                                        <div className="contact_info_text">Khushab, Pakistan</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact us form */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">Get in touch</div>
                                <form method="POST" id="contact_form">
                                    <div className="d-flex justify-content-between align-items-between contact_form_name ">
                                        <input type="text" id="contact-form-name" className="contact-form-name input-field"
                                            name="name"  value={userdata.name} onChange={handleInputs} placeholder="Your name" required="true" />
                                        <input type="email" id="contact-form-email" className="contact-form-email input-field"
                                            name="email"  value={userdata.email} onChange={handleInputs} placeholder="Your Email" required="true" />
                                        <input type="number" id="contact-form-phone" className="contact-form-phone input-field"
                                            name="phone"  value={userdata.phone} onChange={handleInputs} placeholder="Your Phone Number" required="true" />
                                    </div>
                                    <div className="contact_form_text mt-5">
                                        <textarea className="text_field contacct_form_message"
                                            name="message"  value={userdata.message} onChange={handleInputs} placeholder="Message" cols="30" rows="10"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button" onClick={contactForm}>Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;
