import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      "Name : " + name +
      "\nEmail : " + email +
      "\nGender : " + gender +
      "\nCourse : " + course
    );
  }

  return (
    <div>
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        {/* Remaining fields (gender, course, checkbox, submit) as per notes */}
      </form>
    </div>
  );
}

export default App;