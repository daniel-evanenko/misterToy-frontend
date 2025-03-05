import { utilService } from "../services/util.service.js"
import { useState, useEffect, useRef } from "react"
export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy)).current
    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { name } = filterByToEdit
    // const filterByOpts = ['all', 'true', 'false']
    return (
        <section className="todo-filter">
            <h2>Filter toys</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={name} onChange={handleChange}
                    type="search" placeholder="By Name" id="name" name="name"
                />

                {/* <label htmlFor="filterByOpt">Filter by:</label>
                <select value={filterByOpt} onChange={handleChange} name="filterByOpt">
                    {filterByOpts.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select> */}

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}