import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Display = () => {
    const [state, setState] = useState([]);
    const [type, setType] = useState("eligible");
    const [formData, setformData] = useState({
        s1: "", h1: "", UG1: ""
    })
    const navigation = useNavigate();

    const eligiblestudents=()=>{
        axios.get(`http://localhost:5000/getEligibleStudents?s1=${formData.s1},h1=${formData.h1},UG=${formData.UG1}`)
            .then(res => {
                setState(() => res.data)
            })
            .catch(err => console.log(err))
    }
    const handleChange = (e) => {
        setformData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    useEffect(() => {
        if(type!='eligible'){
            axios.get(`http://localhost:5000/getAllStudents?type=${type}`)
            .then(res => {
                setState(() => res.data)
            })
            .catch(err => console.log(err))
        }
        else if(formData.UG1)
        {
            eligiblestudents()
        }
    }, [type])
    return (
        <>
            {state.length > 0 ? (
                <>
                    <h1>{type === 'eligible' ? 'Selected' : 'Applied'} Student Details</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>SSLC Mark</th>
                                <th>HSC Mark</th>
                                <th>Sem1 Mark</th>
                                <th>Sem2 Mark</th>
                                <th>Sem3 Mark</th>
                                <th>Sem4 Mark</th>
                                <th>Sem5 Mark</th>
                                <th>Sem6 Mark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.dob}</td>
                                    <td>{item.tenthMarkInPercentage}</td>
                                    <td>{item.twelthMarkInPercentage}</td>
                                    <td>{item.sem1}</td>
                                    <td>{item.sem2}</td>
                                    <td>{item.sem3}</td>
                                    <td>{item.sem4}</td>
                                    <td>{item.sem5}</td>
                                    <td>{item.sem6}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={e => setType(type === 'eligible' ? 'selected' : 'eligible')}>
                        {type !== 'eligible' ? "Selected Students" : "Applied Students"}
                    </button>
                    <input type="submit" value="Home" onClick={() => navigation('/home')} />
                </>
            ) : (
                <form onSubmit={e => { e.preventDefault(); eligiblestudents() }} method='post'>
                    <h1>Enter Eligibility Criteria</h1>
                    <label>SSLC Percentage</label>
                    <input name='s1' value={formData?.s1} onChange={e => handleChange(e)} required />
                    <label>HSC Percentage</label>
                    <input name='h1' value={formData?.h1} onChange={e => handleChange(e)} required />
                    <label>UG Percentage</label>
                    <input name='UG1' value={formData?.UG1} onChange={e => handleChange(e)} required />
                    <input type="submit" value="Submit" />
                    <input type="submit" value="Home" onClick={() => navigation('/home')} />
                </form>
            )}
        </>
    );
    
}

export default Display