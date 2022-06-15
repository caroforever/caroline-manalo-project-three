import './App.css';
import firebase from './firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue} from 'firebase/database';

function App() {
  console.log("App has rendered")
  // Initalize state to store morning pages in an empty array
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    // this variable holds firebase details
    const database = getDatabase(firebase)
    // references my database
    const dbRef = ref(database)

    onValue(dbRef, (response) => {
      // console.log(response.val());
      // defining the variable that will store the new state
      const newState = [];
      // store the response from our call to firebase inside a variable
      const data = response.val();

      for (let key in data) {
        // for in to push the entry's key values to the newState empty array
        newState.push(data[key]);
      }

      setEntry(newState);
    })

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Morning Pages</h1>
      </header>
      <main>
        <h2>Logged entries</h2>
        <ul>
          {entry.map((entry) => {
            return (
              <li>
                <p>{entry}</p>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
