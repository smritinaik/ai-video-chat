import { useState } from 'react';
import './index.css';

const createConversation = async () => {
  try {
    const response = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_TAVUS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        replica_id: "r4317e64d25a",
        persona_id: "p16f7857c422"
      }),
    });

    const data = await response.json();
    console.log("Tavus API response:", data);
    return data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
};

function App() {
  const [loading, setLoading] = useState(false);

  const joinConversation = async () => {
    setLoading(true);
    const res = await createConversation();

    if (res && res.conversation_url) {
      window.location.href = res.conversation_url;
    } else {
      alert("Failed to create or join the conversation. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Video Chat Platform</h1>
      <button onClick={joinConversation} disabled={loading}>
        {loading ? "Joining..." : "JOIN CALL"}
      </button>
    </div>
  );
}

export default App;
