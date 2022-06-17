import './App.css';
import firebase from './firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push, remove} from 'firebase/database';
import LoggedEntries from './LoggedEntries';

function App() {
  // console.log("App has rendered")
  // Initalize state to store morning pages in an empty array
  const [entry, setEntry] = useState([]);
  // Initialize state to receive new entries from users.
  const [userEntry, setUserEntry] = useState("");
  // console.log(entry);
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
        // for in to push the entries to the newState empty array
        newState.push(
          {
            key: key,
            name: data[key]
          });
      }
      // console.log(newState)
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

    const handleBurn = (burnEntry) => {
      const database = getDatabase(firebase)
      const dbRef = ref(database, `${burnEntry}`);
      remove(dbRef);
      // console.log(burnEntry);
    }
  

  return (

    <div className="App"> 
      <header className="appHeader">
        <h1>Morning Pages</h1>
        <p>An adaptation of a writing exercise from “The Artist’s Way” by Julia Cameron.  Morning Pages was created as a daily writing ritual; every morning, you write everything that's clogging your headspace.</p>

        <p>This exercise aims to “empty the mind"-- a brain cleanse, thus ushering more room for clarity.</p>
        <p>Once your entry is submitted, you are welcome to burn the entry.</p>
      </header>

      <main>
        <section className="">
          <form action="submit">
            <label htmlFor="newEntry">Type your stream of consciousness here:</label>
            <textarea
                rows="10"
                placeholder="Brain cleanse"
                id="newEntry"
                onChange={ handleInputChange }
                value={userEntry}
            ></textarea>
          </form>
          <button onClick={ handleSubmit } disabled={!userEntry}> Submit my entry </button>
        </section>
        <section>
          <h2>Burn Queue</h2>
            <ul>
              {entry.map( (entry) => {
                
                return (
                  <LoggedEntries 
                  key={entry.key} 
                  id={entry.key}
                  entryName={entry.name}

                  handleBurn={ handleBurn }
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
