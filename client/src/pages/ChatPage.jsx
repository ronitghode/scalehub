import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { MessageSquare, Send } from 'lucide-react';

const ChatPage = () => {
    const { socket, isConnected } = useSocket();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [joined, setJoined] = useState(false);
    const messagesEndRef = useRef(null);

    // Hardcoded room for now (Global Chat)
    const ROOM_ID = 'global-chat';

    useEffect(() => {
        if (socket && isConnected) {
            socket.emit('join_room', ROOM_ID);
            setJoined(true);

            socket.on('receive_message', (data) => {
                setMessages((prev) => [...prev, data]);
            });

            return () => {
                socket.off('receive_message');
            };
        }
    }, [socket, isConnected]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && socket) {
            const messageData = {
                roomId: ROOM_ID,
                message: input
            };

            // We rely on server to echo it back via 'receive_message' for simplicity
            // Or we can add it optimistically.
            socket.emit('send_message', messageData);
            setInput('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 h-[calc(100vh-100px)] flex flex-col">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <MessageSquare className="text-blue-400" /> Global Public Chat
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {isConnected ? 'Connected' : 'Disconnected'}
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-slate-500 mt-10">
                            No messages yet. Say hello!
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.senderId === socket?.id ? 'items-end' : 'items-start'}`}>
                            <div className="bg-slate-700 rounded-lg px-4 py-2 max-w-[80%] break-words">
                                <div className="text-xs text-slate-400 mb-1">{msg.senderName}</div>
                                <p>{msg.message}</p>
                            </div>
                            <span className="text-xs text-slate-500 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} className="p-4 bg-slate-900/50 border-t border-slate-700 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                        placeholder="Type a message..."
                        disabled={!isConnected}
                    />
                    <button
                        type="submit"
                        disabled={!isConnected}
                        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
