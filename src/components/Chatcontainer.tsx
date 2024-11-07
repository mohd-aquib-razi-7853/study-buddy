// components/ChatWindow.js
import { useState } from 'react';

export default function Chatcontainer() {
  const [messages, setMessages] = useState([
    { user: 'John Doe', text: 'Hello, how are you?', align: 'left' },
    { user: 'You', text: "I'm good, thanks! How about you?", align: 'right' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { user: 'You', text: input, align: 'right' }]);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.align === 'right' ? 'justify-end' : ''}`}
          >
            <div
              className={`p-3 rounded-lg ${
                msg.align === 'right'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              } max-w-xs`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full border rounded-md p-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
