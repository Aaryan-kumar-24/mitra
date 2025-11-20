import React, { useState, useRef, useEffect } from 'react';

// Assuming your API base URL and token function are defined elsewhere
const API_BASE_URL = 'http://localhost:8000'; 
const getToken = () => localStorage.getItem('token'); // Function to get your JWT

// --- Chat Bot Logic Component (Frosted Sky Glass Theme) ---
const OffcanvasChatBot = ({ onClose }) => { 
    // State to hold the chat history
    const [messages, setMessages] = useState([
        { role: 'system', content: '👋 Welcome! I am MITRA, your College AI Assistant. Ask me anything about your notes, projects, or the market.' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Scroll reference for the chat window
    const chatEndRef = useRef(null);
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage = { role: 'user', content: input };
        
        const newHistory = [...messages, newUserMessage];
        setMessages(newHistory);
        setInput('');
        setIsLoading(true);

        const token = getToken();
        if (!token) {
            alert("You must be logged in to chat.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chat-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ messages: newHistory }),
            });

            if (!response.ok || !response.body) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let aiResponseContent = '';
            setMessages((prev) => [...prev, { role: 'assistant', content: aiResponseContent }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.startsWith('data:'));
                
                for (const line of lines) {
                    const dataString = line.substring(5).trim();
                    try {
                        const data = JSON.parse(dataString);
                        
                        if (data.error) {
                            aiResponseContent += `\n\n**Error:** ${data.error}`;
                        } else if (data.content) {
                            aiResponseContent += data.content;
                        }

                        setMessages((prev) => {
                            const updatedMessages = [...prev];
                            if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].role === 'assistant') {
                                updatedMessages[updatedMessages.length - 1].content = aiResponseContent;
                            }
                            return updatedMessages;
                        });
                        scrollToBottom();

                    } catch (e) {
                        // Handle incomplete JSON lines
                    }
                }
            }

        } catch (error) {
            console.error('Streaming API Error:', error);
            setMessages((prev) => [...prev, { role: 'assistant', content: `❌ Error: Could not connect to the AI service. Please ensure your backend is running.` }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Styling and JSX ---
    return (
        // Main Chat Container: White/Transparent glass effect, border-l uses sky blue accent
        <div className="flex flex-col h-full bg-white/30 backdrop-blur-3xl text-gray-800 shadow-2xl border-l-4 border-sky-400">
            
            {/* Header: Clean White/Sky Gradient */}
            <div className="p-4 bg-white/50 backdrop-blur-md shadow-lg flex items-center justify-between border-b border-sky-300">
                <div className="flex items-center">
                    <span className="text-3xl mr-3 font-extrabold text-sky-600 animate-pulse">💡</span> 
                    <h3 className="text-2xl font-bold tracking-wide text-gray-800">
                        Ask Your Doubts! <span className="text-sky-500"></span>
                    </h3>
                </div>
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="p-1 rounded-full text-gray-700 hover:bg-sky-100 transition duration-300"
                    aria-label="Close Chatbot"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Message Area: Light glass background with very light overlay */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/10 custom-scrollbar">
                {messages.filter(m => m.role !== 'system').map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {/* Message Bubbles: Use white and sky blue transparent glass */}
                        <div className={`max-w-[85%] p-3 rounded-2xl shadow-lg border border-white/80 ${
                            msg.role === 'user' 
                                ? 'bg-sky-500/80 text-white rounded-br-md transform transition duration-300 hover:scale-[1.01]' // User: Sky Blue Glass
                                : 'bg-white/60 text-gray-800 rounded-tl-md transform transition duration-300 hover:scale-[1.01]' // AI: White Glass
                        }`}>
                            <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-xl bg-white/70 text-gray-600 italic">
                            <div className="flex space-x-1">
                                <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce animation-delay-200"></span>
                                <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce animation-delay-400"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Form: Transparent background for glass effect */}
            <form onSubmit={handleSend} className="p-4 border-t border-sky-300 flex space-x-3 bg-white/50 backdrop-blur-sm">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question here..."
                    disabled={isLoading}
                    // Input field styling for glass look
                    className="flex-grow p-3 text-gray-800 placeholder-gray-500 border border-white/90 rounded-full focus:outline-none bg-white/80 focus:ring-2 focus:ring-sky-500 transition shadow-inner"
                />
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full transition duration-150 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105" // Added hover scale animation
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A5.996 5.996 0 0110.04 1.25l10.51 10.51a1.25 1.25 0 010 1.77L10.04 22.75a5.996 5.996 0 01-6.77-1.876L6 12z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

// --- Parent Container Component (The Offcanvas Structure) ---
export function AIChatOffcanvas() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    // Function to toggle the offcanvas
    const toggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    return (
        <>
            {/* 1. Floating AI Button (Fixed Position) - Conditionally rendered and animated */}
            {!showOffcanvas && (
                <button
                    onClick={toggleOffcanvas}
                    className="fixed bottom-28 right-8 bg-gradient-to-r from-sky-400 to-cyan-500 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl hover:scale-110 transition-all duration-300  animate-bounce"
                    aria-label="Open AI Chatbot"
                >
                    🤖
                </button>
            )}

            {/* 2. Offcanvas Container (Slides In) */}
            
            {/* Full-screen overlay when open to handle clicks outside - Lighter background to complement the white glass */}
            {showOffcanvas && (
                <div 
                    className="fixed inset-0 bg-black/30 z-[9997] transition-opacity duration-500" 
                    onClick={toggleOffcanvas} // Close offcanvas when clicking outside
                />
            )}
            
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-[9998] transition-transform duration-500 ease-in-out ${
                    showOffcanvas ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="relative h-full" onClick={(e) => e.stopPropagation()}>
                    <OffcanvasChatBot onClose={toggleOffcanvas} />
                </div>
            </div>
        </>
    );
}