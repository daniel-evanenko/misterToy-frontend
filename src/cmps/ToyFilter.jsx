import { utilService } from "../services/util.service.js"
import { useState, useEffect, useRef } from "react"
import { MultiSelectDropdown } from "./MultiSelectDropdown.jsx";
export function ToyFilter({ filterBy, onSetFilterBy }) {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered'
    ];
    const [filterByToEdit,
        setFilterByToEdit] = useState({
            ...filterBy
        })

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy)).current
    useEffect(() => {
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

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            [field]: value
        }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { name, byStock, byLabels = [] } = filterByToEdit
    const filterByOpts = ['all', 'inStock', 'outOfStock']
    return (
        <section className="toy-filter">
            <h2>Filter toys</h2>
            <form onSubmit={onSubmitFilter}>
                <input
                    value={name}
                    onChange={handleChange}
                    type="search"
                    placeholder="By Name"
                    id="name"
                    name="name" />
                <label htmlFor="byStock">Filter by:</label>
                <select value={byStock} onChange={handleChange} name="byStock">
                    {filterByOpts.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <label htmlFor="byLabels">Filter by labels:</label>
                <MultiSelectDropdown
                    options={labels}
                    selectedValues={byLabels}
                    onChange={handleChange}
                    name="byLabels"
                />
                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}