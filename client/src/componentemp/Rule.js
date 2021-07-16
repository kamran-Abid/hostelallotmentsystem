import React, {useState, useContext, useEffect} from 'react';
import Navbar from './Navbar';
import {useHistory} from 'react-router-dom';


const Rule = () => {
    const [hallnames, setHallnames] = useState([]);
    let userdata = [];
    const history = useHistory();
    let name, value;
    const [rule, setRule] = useState({
        lrr:"", urr:"",gpa:"", spr:"", yr:""
    }); 

    const [hostels, setHostels] = useState(["Ali Hall", "Bilal Hall", "Abu Bakar Hall", "Quaid-e-Azam Hall", "Iqbal Hall" ]);

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value; 

        setRule({...rule, [name]:value});
    }

       // Getting hallnames
    
    const callHallname = async () => {

        try {
            const res = await fetch('/gethallname',{
                method:"GET",
                headers:{
                    Accept:"appllication/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const halldata = await res.json();
            halldata.map((ele, i)=>{
                userdata[i] = ele.hallname;
            })
            setHallnames(userdata);
            if(!res.status === 200){
                const error = new Error(`Status code is not 200:  ${res.error}`);
                throw error;
            }

        } catch(e){
            console.log("Error in getting hallname")
            console.log(e);
            history.push('/rule')
        }
    }

 // Send data back end

    const deleteRule = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/deleterule',{
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
                window.alert("Policies deleted");
            }
            setHostels(["Ali Hall", "Bilal Hall", "Abu Bakar Hall", "Quaid-e-Azam Hall", "Iqbal Hall" ])

        } catch(e){
            console.log("Error in getting deleting file")
            console.log(e);
            history.push('/rule')
        }
    }

    // Add Policy
    const addPolicy = async(e) => {
        // if(){} else {}
        // setRoomArr([...roomArr, rule]);
        
        e.preventDefault();

        const {hallname, lrr, urr, gpa, spr, yr} = rule;

        const res = await fetch('/rule',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hallname, lrr, urr, gpa, spr, yr
            })
        });
        const data = await res.json();

        if(!data || res.status === 422 ){
            window.alert("Policy not defined properly");
        } else if(!data || res.status === 423 ){
            window.alert("Room policy already daefine ")
        } else if(!data || res.status === 420 ){
            window.alert("please fill all fields before adding ... ")
        } else {
            window.alert("Policy defined successfully");
            var hallnamename = rule.hallname;
            setRule({hallname:"", lrr:"", urr:"",gpa:"", spr:"", yr:""});
            setRule({hallname: hallnamename});
            setHostels(hostels.filter(x => !hallnames.includes(x)));
            history.push('/rule');
        }
    }

    const defPolicy = () => {
        setHostels(hostels.filter(x => !hallnames.includes(x)));
        setRule({hallname: ""});
    }

    useEffect(() => {
        defPolicy();
        callHallname();
    },[]);

        return (
            <>
                <Navbar />
                <div className="rule-div col-10 mx-auto my-5">
                    <h1 className="m-5 text-center" style={{textShadow: "5px 5px 10px #aeaeae"}}>Define the rules</h1>
                    <form method="POST">
                        <div className="form-group" > 
                            <select className="form-select form-select-lg mb-5 selectInp" aria-label=".form-select-lg example" 
                                name="hallname" value={rule.hallname} onChange={handleInput} style={{boxShadow: "12px 10px 20px 1px #cecece"}} required="true" >
                                <option selected value="">Select Hall</option>
                                {
                                    hostels.map((currEle)=>{
                                        return(
                                            <option value={currEle}>{currEle}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group mt-5">
                            <label className='col-md-4' htmlFor="rr">
                                Rooms range from :
                            </label>
                            <input className='col-md-8' type="number" name="lrr" id="lrr" autoComplete="off"
                                value={rule.lrr} onChange={handleInput} placeholder="  -  - " required="true" />
                            <label className='ml-5 mr-2'>to</label>
                            <input type="number" name="urr" id="urr" autoComplete="off"
                                value={rule.urr} onChange={handleInput} placeholder="  -  - " required="true" /><br />
                            <label className='col-md-4 mt-5' htmlFor="spr1">
                                Student having GPA greater or = :
                            </label>
                            <input className='col-md-8' type="number" name="gpa" id="gpa" autoComplete="off"
                                value={rule.gpa} onChange={handleInput} placeholder="  -  - " required="true" /><br />
                            <label className='col-md-4' htmlFor="spr1">
                                Number of students in a room :
                            </label>
                            <input className='col-md-8' type="number" name="spr" id="spr" autoComplete="off"
                                value={rule.spr} onChange={handleInput} placeholder="  -  - " required="true" /><br />
                            <label className='col-md-4' htmlFor="yr1">
                                Year in university :
                            </label>
                            <input className='col-md-8' type="number" name="yr" id="yr" autoComplete="off"
                                value={rule.yr} onChange={handleInput} placeholder="  -  - " required="true" />
                        </div>
                        {/* {
                            roomArr.map((currEle, ind) => {
                                return(
                                    <div key={ind}>
                                        <Policy />
                                    </div>
                                );
                            })
                        } */}

                        <div className="subdiv my-5">
                            <input type="submit" className="btn rule-btn" value="Delete Policy" onClick={deleteRule} />
                            <input type="submit" className="btn rule-btn" value="Add Policy" onClick={addPolicy} />
                            <input className="btn rule-btn" value="Define Policy" onClick={defPolicy} />
                        </div>
                    </form>
                </div>
            </>
        );
    }


export default Rule;

