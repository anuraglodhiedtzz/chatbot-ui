import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot } from "lucide-react";

export default function ChatbotUI({ userName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState(userName || ""); // Stores the user's name

  useEffect(() => {
    // Send automatic greeting when the user visits for the first time
    if (!userName) {
      setMessages([{ sender: "bot", text: "Hello! What's your name? 😊" }]);
    } else {
      setMessages([{ sender: "bot", text: `Hello ${userName}! How can I assist you today? 😊` }]);
    }
  }, [userName]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    if (!name) {
      // If user hasn't provided a name yet, save it
      setName(input);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Nice to meet you, ${input}! How can I assist you today? 😊` }
      ]);
      setInput("");
      return;
    }

    setInput("");

    // Send message to backend (replace with actual API endpoint)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, name })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-gray-100 border shadow-lg rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Bot className="mr-2" /> AI Chatbot
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start"}`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      
      {/* Input Field */}
      <div className="p-4 bg-white flex items-center border-t">
        <input 
          type="text" 
          className="flex-1 p-2 border rounded-lg" 
          placeholder="Type a message..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg" onClick={sendMessage}>
          <Send />
        </button>
      </div>
    </div>
  );
}
