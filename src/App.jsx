// App.js
import React, { useState } from "react";
import img from "./assets/NeuroNest.png";

// Main App component
export default function App() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Checkup"); // State for active main content tab (within General AI)
  const [activeSidebarItem, setActiveSidebarItem] = useState("Home"); // State for active sidebar item

  // Function to call the Gemini API
  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    const userMessage = { role: "user", parts: [{ text: input }] };
    setChatHistory((prev) => [...prev, userMessage]); // Add user message to history
    setInput(""); // Clear input field
    setIsLoading(true); // Show loading indicator

    try {
      const payload = { contents: [...chatHistory, userMessage] }; // Include full chat history
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setChatHistory((prev) => [
          ...prev,
          { role: "model", parts: [{ text: aiResponseText }] },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: "Sorry, I could not get a response." }],
          },
        ]);
        console.error("Unexpected API response structure:", result);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "An error occurred while fetching the response." }],
        },
      ]);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      sendMessage();
    }
  };

  // Render content based on activeSidebarItem
  const renderMainContent = () => {
    switch (activeSidebarItem) {
      case "Home":
      case "New Chat": // New chat also leads to the home/general AI interface
        return (
          <>
            {/* Conditional rendering based on activeTab within Home/New Chat */}
            {chatHistory.length === 0 ? (
              <div className="-mt-[120px]">
                {/* Greeting */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center drop-shadow-sm">
                  Hi there, Sam
                </h1>
                <p className="text-xl md:text-3xl font-semibold text-gray-700 mb-12 text-center opacity-90">
                  How can I help you today?
                </p>

                {/* Feature Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12 px-4">
                  <div className="bg-white p-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center border border-gray-100 transform hover:-translate-y-2">
                    <svg
                      className="w-9 h-9 text-purple-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14V10zm-2 0h-1.5a2.5 2.5 0 00-2.5 2.5v3.5a2.5 2.5 0 002.5 2.5H13a2.5 2.5 0 002.5-2.5V12.5A2.5 2.5 0 0013 10z"
                      ></path>
                    </svg>
                    <p className="text-lg font-medium text-gray-700">
                      Experience Premium General Health Checkups
                    </p>
                  </div>
                  <div className="bg-white p-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center border border-gray-100 transform hover:-translate-y-2">
                    <svg
                      className="w-9 h-9 text-purple-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                    <p className="text-lg font-medium text-gray-700">
                      Painless Injections with Expert Care
                    </p>
                  </div>
                  <div className="bg-white p-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center border border-gray-100 transform hover:-translate-y-2">
                    <svg
                      className="w-9 h-9 text-purple-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    <p className="text-lg font-medium text-gray-700">
                      Trusted Vaccination for Every Age
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col mb-[200px] max-w-[40%] px-4">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="font-semibold">
                      {message.role === "user" ? "You:" : "AI:"}
                    </p>
                    <p>{message.parts[0].text}</p>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center justify-center p-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    <span className="ml-3 text-gray-600">Thinking...</span>
                  </div>
                )}
              </div>
            )}
            {/* Tabbed Navigation */}
            <div className="flex fixed bottom-[125px] space-x-2 bg-gray-100 p-1 rounded-full mb-6 mx-auto shadow-inner">
              {[
                "Checkup",
                "Blood Test",
                "Ultrasound",
                "IV Drip",
                "Injection",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Input Area */}
            <div className="w-full fixed bottom-[50px] max-w-3xl flex items-center bg-white rounded-full shadow-xl p-2 border border-gray-100">
              <textarea
                className="flex-grow p-3 pl-5 outline-none rounded-full resize-none max-h-24 overflow-y-auto text-gray-700 placeholder-gray-400"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-3 rounded-full ml-2 hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </div>
          </>
        );
      case "History":
        return (
          <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Interaction History
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              This section will display your past conversations and generated
              content.
            </p>
            <p className="text-gray-500">
              Stay tuned for updates to manage and review your AI interactions
              efficiently!
            </p>
          </div>
        );
      case "Settings":
        return (
          <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Application Settings
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Customize your AI experience here.
            </p>
            <p className="text-gray-500">
              Options for themes, preferences, and account management will be
              available soon.
            </p>
          </div>
        );
      case "Profile": // Assuming the bottom user icon maps to a 'Profile' page
        return (
          <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              User Profile
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Manage your profile information and account details.
            </p>
            <p className="text-gray-500">
              Update your personal settings and view your subscription status.
            </p>
          </div>
        );
      case "Info": // Assuming the bottom info icon maps to an 'Info' page
        return (
          <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About This AI Assistant
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Learn more about the features and capabilities of this
              application.
            </p>
            <p className="text-gray-500">
              Find FAQs, support contacts, and version information here.
            </p>
          </div>
        );
      default:
        return null; // Or a default error/empty state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 font-sans text-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-20 fixed h-screen bg-white shadow-xl rounded-r-3xl flex flex-col items-center py-6 z-10">
        <div className="mb-6 cursor-pointer">
          <img className="60px" src={img} alt="Logo" />
        </div>{" "}
        {/* Logo */}
        <nav className="flex flex-col space-y-6">
          {/* Home */}
          <button
            onClick={() => {
              setActiveSidebarItem("New Chat");
              setChatHistory([]); // Clear chat history for new chat
              setActiveTab("Checkup"); // Reset to general tab
            }}
            className={`p-3 rounded-full transition-all duration-200 ${
              activeSidebarItem === "New Chat"
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
            }`}
            title="Home"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
          </button>

          {/* Other Navigation Items */}
          {[
            {
              name: "History",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              ),
            },
            {
              name: "Settings",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              ),
            },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSidebarItem(item.name)}
              className={`p-3 rounded-full transition-all duration-200 ${
                activeSidebarItem === item.name
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
              }`}
              title={item.name}
            >
              {item.icon}
            </button>
          ))}
        </nav>
        {/* User Profile / Settings at bottom */}
        <div className="mt-auto flex flex-col items-center space-y-6">
          <button
            onClick={() => setActiveSidebarItem("Profile")}
            className={`p-3 rounded-full transition-all duration-200 ${
              activeSidebarItem === "Profile"
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
            }`}
            title="Profile"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => setActiveSidebarItem("Info")}
            className={`p-3 rounded-full transition-all duration-200 ${
              activeSidebarItem === "Info"
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
            }`}
            title="Info"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </aside>
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Header Section */}

        {/* Main AI Content Area */}
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
          {renderMainContent()}
        </main>
      </div>
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Custom styles for animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
