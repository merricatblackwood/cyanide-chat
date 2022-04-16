const MessageInput = ({ sendFunc, changeFunc }) => {
    return (
        <div className="message-input">
            <textarea 
                className="message-box"
                rows="4"
                onChange={e => {
                    changeFunc(e.target.value);
                }}
                onKeyDown={e => {
                    if (e.keyCode === 13) {
                        sendFunc();
                    }
                }}
                onKeyUp={ e => {
                    if (e.keyCode === 13) {
                        e.target.value = "";
                    }

                }}>
            </textarea>
            <button 
                onClick={sendFunc}
                className="send-button"
            >Send</button> 
        </div>
    )
}

export default MessageInput;
