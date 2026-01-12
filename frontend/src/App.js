import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map(n => <p key={n._id}>{n.title}</p>)}
    </div>
  );
}

export default App;