import React, { useState } from 'react';

function Student(props) {
  return <h2>Student Name: {props.name}</h2>
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Student name="Rahul" />
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;