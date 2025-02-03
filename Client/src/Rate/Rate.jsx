import { useEffect } from 'react'
import MiniNav from '../NavBar/MiniNav'
import Nav from '../NavBar/Nav'
import './Rate.css'
import { useNavigate } from 'react-router-dom'

const Rate = ()=>{
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('authToken')

        if(!token){
            navigate('/')
        }
    },[])

    return <div id='/rate' className="rate">
        <Nav/>
        <h3>coming soon</h3>
    <MiniNav/>
    </div>
}

export default Rate