import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTodo()
    }, [params.toyId])


    function loadTodo() {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function onBack() {
        navigate('/toy')
    }

    if (!toy) return <div className="loader"></div>
    return (
        <section className="toy-details">
            <h1 >Name: {toy.name}</h1>
            <img src={toy.imgUrl} alt={toy.name} />
            <h2>Price: ${toy.price}</h2>
            <h3 >In Stock: {toy.inStock ? <span className="available">Available</span> : <span className="unavailable">Out of Stock</span>}</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <div className="labels">
                <h3>Labels: </h3>
                {toy.labels.map((label, idx) => (
                    <span key={idx} className="label">{label}</span>
                ))}
            </div>
            <button onClick={onBack}>Back to list</button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>
        </section>
    )
}