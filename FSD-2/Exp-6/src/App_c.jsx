import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState("Click the button");

  function handleClick() {
    setMessage("Button clicked successfully");
  }

  return (
    <div>
      <h2>{message}</h2>
      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}

export default App;