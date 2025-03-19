import { utilService } from "../services/util.service.js"
import { useState, useRef } from "react"
import { MultiSelectDropdown } from "./MultiSelectDropdown.jsx";
import PropTypes from "prop-types";
import { useEffectUpdate } from "../hooks/useEffectUpdate.js";
import { setFilterBy } from "../store/actions/toy.actions.js";
export function ToyFilter({ filterBy }) {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered'
    ];
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterByDebounce = useRef(utilService.debounce(setFilterBy)).current


    useEffectUpdate(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    ToyFilter.propTypes = {
        filterBy: PropTypes.shape({
            name: PropTypes.string.isRequired,
            byStock: PropTypes.oneOf(["all", "inStock", "outOfStock"]).isRequired,
            byLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
            sortBy: PropTypes.oneOf(["name", "createdAt", "price"]).isRequired,
        }).isRequired,
        onSetFilterBy: PropTypes.func.isRequired,
    };
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
        setFilterBy(filterByToEdit)
    }

    const { name, byStock, byLabels, sortBy } = filterByToEdit
    const filterByOpts = ['all', 'inStock', 'outOfStock']
    const sortByOpts = ['name', 'price', 'created']
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
                <label htmlFor="sortBy">Sort by:</label>
                <select value={sortBy} onChange={handleChange} name="sortBy">
                    {sortByOpts.map(opt => (
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