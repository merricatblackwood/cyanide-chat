import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';

import Message from './components/Message.js';
import MessageInput from './components/MessageInput.js';

import firebaseConfig from './config.js';

import './App.css';

const fireApp = initializeApp(firebaseConfig);
const db = getDatabase(fireApp);
const analytics = getAnalytics(fireApp);

const messagesRef = ref(db, 'messages/');


function App() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({});
    const [messageCount, setMessageCount] = useState(0);
    const [input, setInput] = useState("");

    useEffect(() => {
        const listener = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            setMessageCount(Object.keys(data).length);
            setMessages(data);
        })
        return listener;
    }, []);

    
    const sendMessage = () => {
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
            message: input
        });
    }

    const updateMessage = (message) => {
        setInput(message)
    }

    const renderMessages= Object.keys(messages).map((key) => {
        return <Message text={messages[key].message} key={messages[key].id} />
    });

    return (
        <div className="app">
            <div className="messages">
                {renderMessages} 
            </div>
            <MessageInput sendFunc={sendMessage} changeFunc={updateMessage} />

        </div>
    );
}

export default App;
