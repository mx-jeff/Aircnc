import React, { useEffect, useState, useMemo } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import socketIo from 'socket.io-client'
import './styles.css'

export default function Dashboard() {
    const[spots, setSpots] = useState([])
    const[requests, setRequests] = useState([])

    const user_id = localStorage.getItem('user')
    const socket = useMemo(() => socketIo('http://localhost:3333', {
        query: user_id
    }), [user_id])

    useEffect(() => {
        socket.on('booking', data => {
            setRequests([...requests, data])
        })
    }, [requests, socket])

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            })
            
           setSpots(response.data)
        }

        loadSpots()
    }, [])

    async function handleAccept(id) {
        await api.post(`/booking/${id}/approvals`)
        
        setRequests(requests.filter(request => request._id === id))
    }

    async function handleReject(id) {
        await api.post(`/booking/${id}/rejection`)
        
        setRequests(requests.filter(request => request._id === id))
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> esta solicitando uma reserva em <strong>{request.spot.conpany}</strong> para a data: <strong>{request.data}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>RECUSAR</button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}></header>
                        <strong>{spot.conpany}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}