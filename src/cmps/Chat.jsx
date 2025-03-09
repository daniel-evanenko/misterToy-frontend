import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
export function Chat() {
    const userFromStore = useSelector(storeState => storeState.userModule.loggedInUser);
    const messagesEndRef = useRef(null);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([{ id: 1, sender: "support", text: "How can I help?" }])


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function handleSend() {
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
        <section>
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div key={msg.id} className={`chat-message ${index % 2 === 0 ? "even" : "odd"}`}>
                        <strong className={msg.sender === "support" ? "support" : "guest"}>
                            {msg.sender}:
                        </strong>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="chat-input">
                <input
                    value={inputText}
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </section>
    );
}