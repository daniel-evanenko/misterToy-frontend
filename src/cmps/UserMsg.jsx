import { eventBusService } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from "react"
export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutRef = useRef()

    useEffect(() => {

        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            clearTimeout(timeoutRef.current)
            setMsg(msg)
            timeoutRef.current = setTimeout(() => setMsg(null), 1500)
        })

        return unsubscribe
    }, [])

    if (!msg)
        return null

    return (
        <section className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
        </section>
    )
}
