import PropTypes from "prop-types";
import React, { useState } from "react";

export function MultiSelectDropdown({ options, selectedValues, onChange, name }) {

    MultiSelectDropdown.propTypes = {
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired
    }
    
    const [isOpen, setIsOpen] = useState(false);

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    function handleSelect(option) {
        const newValues = selectedValues.includes(option)
            ? selectedValues.filter(value => value !== option)
            : [
                ...selectedValues,
                option
            ];

        const event = {
            target: {
                name: name || "multiSelect",
                value: newValues
            }
        };

        onChange(event);
    }

    return (
        <div className="multi-select">
            <button type="button" onClick={handleToggle} className="dropdown-btn">
                {selectedValues.length > 0
                    ? selectedValues.join(", ")
                    : "Select options"}
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map(option => (
                        <li key={option}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(option)}
                                    onChange={() => handleSelect(option)} /> {option}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
