
import { useState } from "react";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";

export default function Chatbot({ faqItems }) {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const queryGroqAPI = async (userInput) => {
    const apiKey = "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";
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
   
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are a professional AI assistant. Always respond with clear, concise, and accurate answers. Avoid long explanations or unnecessary details. Keep replies short, formal, and to the point."
            },
            {
              role: "user",
              content: userInput
            }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          stream: false
        })
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Details:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
      }
 
      const data = await response.json();
      return data.choices[0]?.message?.content || "I couldn't process your request.";
    } catch (error) {
      console.error("Error querying Groq API:", error);
      return "Sorry, I encountered an error while processing your request. Please try again later.";
    }
  };

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;
   
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const faqItem = faqItems.find(
        (item) =>
          item.question.toLowerCase().includes(text.toLowerCase()) ||
          text.toLowerCase().includes(item.question.toLowerCase().replace("what is ", "").replace("how do i ", "").replace("how are ", ""))
      );

      if (faqItem) {
        setTimeout(() => {
          setMessages((prev) => [...prev, { text: faqItem.answer, isUser: false }]);
          setIsLoading(false);
        }, 500);
      } else {
        const botResponse = await queryGroqAPI(text);
        setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
        setIsLoading(false);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Sorry, I encountered an error. Please try again.", isUser: false }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-md md:w-3/4">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-xl font-semibold">AI Assistant</h3>
      </div>
      <div className="flex flex-col h-[500px] p-4">
        <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center justify-start">
              <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 max-w-xs">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length < 3 && (
          <SuggestedQuestions
            allQuestions={faqItems.map((f) => f.question)}
            inputValue={inputValue}
            onSelect={(q) => {
              setInputValue(q);
              handleSendMessage(q);
            }}
          />
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-3 border border-gray-200 rounded-md text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            disabled={isLoading}
          />
          <button
            className="px-6 py-3 bg-blue-500 text-white border-none rounded-md font-medium cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
