import React, { useState } from "react"

export function AccordionGroup({ children }) {
    const [activeIdx, setActiveIdx] = useState(0)

    const childrenWithProps = React.Children.map(children, (child, idx) => {
        const childProps = {
            onToggle: () => setActiveIdx(activeIdx === idx ? null : idx),
            isActive: idx === activeIdx
        }
        return React.cloneElement(child, childProps)
    })

    return (
        <section className="accordion-group">
            {childrenWithProps}
        </section>
    )
}



