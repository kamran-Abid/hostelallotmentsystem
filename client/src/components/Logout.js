import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from "../App";


const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

    // promises 

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            dispatch({ type: "USER", payload: false });
            history.push('/login');
            if (!res.status === 200) {
                const error = new Error(`Status code is not 200:  ${res.error}`);
                throw error;
            }
        }).catch((e) => {
            console.log(e);
        })
    })
    return (
        <div>
            <h1>Logout successfully</h1>
        </div>
    )
}

export default Logout
