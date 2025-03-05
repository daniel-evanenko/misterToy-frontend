import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { addUserActivity } from "../store/actions/user.actions.js"

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        setIsLoading(true)
        toyService.get(params.toyId)
            .then(setToyToEdit)
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false));

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setToyToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveToy({ ...toyToEdit })
            .then((savedToy) => {
                navigate('/toy')
                const action = toyToEdit._id ? 'updated' : 'added'
                addUserActivity(`Toy '${toyToEdit.name}' was ${action} `)
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.log('err:', err)
            })

    }

    const { name, inStock, price } = toyToEdit
    const loadingClass = isLoading ? "loading" : "";

    return (
        <section className={`toy-edit ${loadingClass}`}>
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />
                <label htmlFor="txt">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />
                <div>
                    <label htmlFor="inStock">InStock:</label>
                    <input onChange={handleChange} checked={inStock} type="checkbox" name="inStock" id="inStock" />
                </div>

                <button>Save</button>
            </form>
        </section>
    )
}