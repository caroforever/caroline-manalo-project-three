import './App.css';
import firebase from './firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push, remove} from 'firebase/database';
import LoggedEntries from './LoggedEntries';

function App() {
  console.log("App has rendered")
  // Initalize state to store morning pages in an empty array
  const [entry, setEntry] = useState([]);
  // Initialize state to receive new entries from users.
  const [userEntry, setUserEntry] = useState("");
  console.log(entry);
  // call to Firebase
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
        newState.push(
          {
            key: key,
            name: data[key]
          });
      }

      setEntry(newState);
    })

  }, [])

  // Event handlers
    const handleSubmit = (event) => {
    event.preventDefault();
    const database = getDatabase(firebase)
    const dbRef = ref(database);

    push(dbRef, userEntry);
    setUserEntry("");
    }

    const handleInputChange = (event) => {
      setUserEntry(event.target.value);
      // console.log(event)
      // console.log(event.target.value)
    }

    const handleBurn = (burnNode) => {
      const database = getDatabase(firebase)
      const dbRef = ref(database, `/${burnNode}`);
      remove(dbRef);
    }
   

  return (

    <div className="App"> 
      <header className="App-header">
        <h1>Morning Pages</h1>
      </header>

      <main>
        <section>
          <form action="submit">
            <label htmlFor="newEntry">Type your stream of consciousness here:</label>
            <textarea
                rows="10"
                placeholder="Brain cleanse"
                onChange={ handleInputChange }
                value={userEntry}
            ></textarea>
          </form>

          <button onClick={ handleSubmit }> Add entry </button>
        </section>




        <section>
          <h2>Logged entries</h2>
            <ul>
              {entry.map( (entry) => {
                
                return (
                  <LoggedEntries 
                  key={entry.key} 
                  entryName={entry.name}
                  burnButton={ handleBurn }
                  
                  />
                )
              })}
            </ul>
        </section>



      </main>
    </div>
  );
}

export default App;
