import PropTypes from "prop-types"
import React, { useEffect } from "react";

export function NicePopup({ isOpen, onClose, header, main, footer }) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    if (!isOpen)
        return null;

    NicePopup.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        header: PropTypes.string,
        main: PropTypes.string,
        footer: PropTypes.string
    }

    return (
        <div className="nice-popup">
            <div className="modal">
                <button className='btn-close-modal' onClick={onClose}>X</button>
                <header>{header}</header>
                <main>{main}</main>
                <footer>{footer}</footer>
            </div>
        </div>
    )

}