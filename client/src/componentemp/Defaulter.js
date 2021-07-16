import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import {useHistory} from 'react-router-dom';





const Defaulter = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);

    const DefaulterTable = async () => {
        try {
            const res = await fetch('/defaultertable',{
                method:"GET",
                headers:{
                    Accept:"appllication/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data_t = await res.json();
            data_t.map((ele, i)=>{
                tableData[i] = ele.regno;
            })
            setTableData(data_t);

            if(!res.status === 200){
                const error = new Error(`Status code is not 200:  ${res.error}`);
                throw error;
            }

        } catch(e){
            console.log("Error in getting defaulter table")
            console.log(e);
            history.push('/logine')
        }
    }
    useEffect(() => {
        DefaulterTable();
    },[]);
    // Send data back end
    
    const UpdateDefaulter = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/defaulter',{
                method:"GET",
                headers:{
                    Accept:"appllication/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            if(!res.status === 200){
                const error = new Error(`Status code is not 200:  ${res.error}`);
                throw error;
            }
            if(res.status === 211){
                window.alert("Defaulter list updated");
            }
        } catch(e){
            console.log("Error in uploading defaulter file")
            console.log(e);
        }
        window.location.reload(true);
    }

    return (
        <>
        <Navbar />
            {/* Contact us form */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_button d-flex justify-content-center">
                                        <button type="submit" className="button contact_submit_button mb-5" onClick={UpdateDefaulter}>Update list</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="container def-table">
                        <div className="row row-defaulter">
                            <div className="col-sm-4 def-cell">
                                <span className="def-info">Reg No.</span>
                            </div>
                            <div className="col-sm-4 def-cell">
                                <span className="def-info">Mess Bill</span>
                            </div>
                            <div className="col-sm-4 def-cell">
                                <span className="def-info">University bill</span>
                            </div>
                        </div>
                        {
                            tableData.map((currEle)=>{
                                return(
                                <div className="row row-defaulter-info">
                                    <div className="col-sm-4 def-cell">
                                        <span className="def-info">{currEle.regno}</span>
                                    </div>
                                    <div className="col-sm-4 def-cell">
                                        <span className="def-info">{currEle.messBill}</span>
                                    </div>
                                    <div className="col-sm-4 def-cell">
                                        <span className="def-info">{currEle.universityFees}</span>
                                    </div>
                                </div>
                                );
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Defaulter;
