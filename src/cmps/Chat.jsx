import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
export function Chat() {
    const userFromStore = useSelector(storeState => storeState.userModule.loggedInUser);
    const messagesEndRef = useRef(null);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([{ id: 1, sender: "support", text: "How can I help?" }])
    const isOnline = useOnlineStatus()


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function handleSend(ev) {
        ev.preventDefault()
        if (inputText.trim() === "") return;
        const newMessage = {
            id: messages.length + 1,
            sender: userFromStore ? userFromStore.fullname : 'guest',
            text: inputText,
        };

        setMessages([...messages, newMessage]);
        setInputText("");
        setTimeout(_addSupportMsg, 1500)
    }

    function _addSupportMsg() {
        setMessages(prevMessages => [
            ...prevMessages,
            {
                id: prevMessages.length + 1,
                sender: "support",
                text: "Sure thing honey",
            }
        ]);
    }


    return (
        <div className="chat-container">
            <div className="status-container">
                <span className={`status-dot ${isOnline ? "online" : "offline"}`}></span>
                <span>{isOnline ? "Online" : "Offline"}</span>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={msg.id} className={`chat-message ${index % 2 === 0 ? "even" : "odd"}`}>
                        <strong className={msg.sender === "support" ? "support" : "guest"}>
                            {msg.sender}:
                        </strong>
                        {msg.text}
                    </div>
                ))}
            </div>

            <form className="chat-input" onSubmit={handleSend}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                />
                <SendButton></SendButton>
            </form>

        </div>
    );
}

function SendButton() {
    const isOnline = useOnlineStatus()

    return (
        <button disabled={!isOnline} >
            {isOnline ? 'Send' : 'Reconnecting...'}
        </button>
    )
}