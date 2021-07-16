import React, {useState, useContext, useEffect} from 'react';
import Navbar from './Navbar';
import {useHistory} from 'react-router-dom';


const Allotment = () => {
    const [policy, setPolicy] = useState("");
    //const [roommate, addRoommate] = useState("");

    const [roomData, setRoomData] = useState({
        hallname:"",roomno:"",roommate:""
});
    const [hostels, setHostels] = useState(["Ali Hall", "Bilal Hall", "Abu Bakar Hall", "Quaid-e-Azam Hall", "Iqbal Hall" ]);


    const checkAllotment = async (e) => {
        e.preventDefault();

        const {roommate} = roomData;

        const res = await fetch('/checkroomate',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roommate
            })
        });
        const data = await res.json();
        console.log(`data: \n${data}`);

        if(!data){
            window.alert("Error : \n    Room is not present");
        } else if(res.status === 200){
            window.alert("Success : \n  Room is available");
        } else if(res.status === 210){
            window.alert("Success : \n    You are eligible for this room");
        } else if(res.status === 411){
            window.alert("Error : \n    This room cannot allot your session");
        }  else if(res.status === 413){
            window.alert("Error : \n    You are in defaulter list "
        );

        } else {
            window.alert("Error : \n    Checking room");
            setRoomData({ ...roomData, hallname:"", roomno: "" })
        }
    }
    
    const GetRegno = async () => {
        try {
            const res = await fetch('/getregno', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            setPolicy(data.regno);

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
        GetRegno();
    },[]);

    // We are storing data of inputs in states
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setRoomData({ ...roomData, [name]:value });
    }

    // Check availability of room

    const CheckRoom = async (e) => {
        e.preventDefault();

        const {hallname, roomno} = roomData;

        const res = await fetch('/checkroom',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hallname, roomno
            })
        });
        const data = await res.json();
        console.log(`data: \n${data}`);


        if(!data){
            window.alert("Error : \n    Room is not present");
        } else if(res.status === 400){
            window.alert("Error : \n    Please fill hallname and room no fields ");
        } else if(res.status === 401){
            window.alert("Error : \n    Room is not available");
        } else if(res.status === 402){
            window.alert("Error : \n    You cannot get this hall ");
        } else if(res.status === 403){
            window.alert(`Error : \n    This room is allot to someone else`);
        } else if(res.status === 200){
            window.alert("Success : \n  Room is available");

            const res2 = await fetch('/getleader', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data2 = await res2.json();
            console.log(`data2: \n${data2}`);


            if(!data2){
                window.alert("Error : \n    Room is not present");
            }else if(res2.status === 410){
                window.alert("Error : \n    your gpa is less than requried");
            } else if(res2.status === 210){
                window.alert("Success : \n    You are eligible for this room");
            } else if(res2.status === 411){
                window.alert("Error : \n    This room cannot allot your session");
            }  else if(res2.status === 413){
                window.alert("Error : \n    You are in defaulter list "
                );
            }
        } else {
            window.alert("Error : \n    Checking room");
            setRoomData({ ...roomData, hallname:"", roomno: "" })
        }
    }

        return (
            <>
                <Navbar />
                <div className="rule-div col-10 mx-auto my-5">
                    <h1 className="m-5 text-center" style={{textShadow: "5px 5px 10px #aeaeae"}}>Room Allotment</h1>
                    <form method="POST">
                        <div className="row allot_fields" > 
                            <div className="col-sm-6 col-12">
                                <label className="allot_label">Room leader Registration number : </label>
                            </div>
                            <div className="col-sm-6 col-12">
                                <span className="leader_field">{policy}</span>
                            </div>
                        </div>
                        <div className="form-group" > 
                            <select className="form-select form-select-lg mb-5 selectInp" aria-label=".form-select-lg example" 
                                name="hallname" onChange={handleInputs}  value={roomData.hallname} style={{boxShadow: "12px 10px 20px 1px #cecece"}} required="true" >
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
                        <div className="row allot_fields" > 
                            <div className="col-sm-4 col-12">
                                <label className="allot_label">Room number : </label>
                            </div>
                            <div className="col-sm-4 col-12 allot_input_div">
                                <input type="text" className="allot_input" placeholder="nnn" 
                                    name='roomno' onChange={handleInputs} value={roomData.roomno}  />
                            </div>
                            <div className="col-sm-4 col-12 allot_input_div">
                                <button className="room-check-btn px-4" onClick={CheckRoom} >check room</button>
                                {/* <input type="submit" className="room-check-btn px-4" onClick={CheckRoom} value="check room" /> */}
                            </div>
                        </div>
                        <div className="col-md-3 order-1 order-lg-3 mt-5"> 
                        </div>
                        <div className="row allot_fields" > 
                            <div className="col-sm-6 col-12">
                                <label className="allot_label">Roommate Registration number : </label>
                            </div>
                            <div className="col-sm-6 col-12 allot_input_div">
                                <input type="text" className="allot_input" placeholder="nn-xx-nn" 
                                    name='roommate' onChange={handleInputs} value={roomData.roommate} />
                            </div>
                        </div>

                        <div className="subdiv my-5">
                            <input type="submit" className="btn rule-btn" value="Add Roommate" onClick={checkAllotment} />
                        </div>
                    </form>
                </div>
            </>
        );
    }


export default Allotment;

