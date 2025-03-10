export function AccordionItem({ title, children, isActive, onToggle }) {

    function handleToggle(ev) {
        ev.preventDefault();
        onToggle();
    }

    return (
        <article className="accordion-item">
            <details onClick={handleToggle} open={isActive}>
                <summary>{title}</summary>
                <div className="content">
                    {children}
                </div>
            </details>
        </article>
    );
}
