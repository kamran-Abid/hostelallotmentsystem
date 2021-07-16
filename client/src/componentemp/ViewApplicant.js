import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import {useHistory} from 'react-router-dom';





const ViewApplicant = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);

    const DefaulterTable = async () => {
        try {
            const res = await fetch('/applicanttable',{
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
   
    return (
        <>
        <Navbar />
            {/* Contact us form */}
            <div className="contact_form">
                <div className="container">
                    <h1 className="m-5 text-center" style={{textShadow: "5px 5px 10px #aeaeae"}}>View applicant Details</h1>
                    <div className="container def-table">
                        <div className="row row-defaulter">
                            <div className="col-sm-2 def-cell">
                                <span className="def-info">Reg No.</span>
                            </div>
                            <div className="col-sm-3 def-cell">
                                <span className="def-info">Name</span>
                            </div>
                            <div className="col-sm-2 def-cell">
                                <span className="def-info">Email</span>
                            </div>
                            <div className="col-sm-1 def-cell">
                                <span className="def-info">CGPA</span>
                            </div>
                            <div className="col-sm-2 def-cell">
                                <span className="def-info">Phone No.</span>
                            </div>
                            <div className="col-sm-2 def-cell">
                                <span className="def-info">Year</span>
                            </div>
                        </div>
                        {
                            tableData.map((currEle)=>{
                                return(
                                <div className="row row-defaulter-info">
                                    <div className="col-sm-2 def-cell">
                                        <span className="def-info">{currEle.regno}</span>
                                    </div>
                                    <div className="col-sm-3 def-cell">
                                        <span className="def-info">{currEle.name}</span>
                                    </div>
                                    <div className="col-sm-2 def-cell">
                                        <span className="def-info">{currEle.email}</span>
                                    </div>
                                    <div className="col-sm-1 def-cell">
                                        <span className="def-info">{currEle.gpa}</span>
                                    </div>
                                    <div className="col-sm-2 def-cell">
                                        <span className="def-info">{currEle.phone}</span>
                                    </div>
                                    <div className="col-sm-2 def-cell">
                                        <span className="def-info">{currEle.year}</span>
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
export default ViewApplicant