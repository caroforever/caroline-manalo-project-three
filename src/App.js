import './App.css';
import firebase from './firebase';
import { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import LoggedEntries from './LoggedEntries';
// import Birds from './assets/birds.mp3';

function App() {
  const [entry, setEntry] = useState([]);
  const [userEntry, setUserEntry] = useState("");
  const scrollToEntry = useRef();
  

  
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

  // Submit entry
    const handleSubmit = (event) => {
      event.preventDefault();
      const database = getDatabase(firebase)
      const dbRef = ref(database);
      push(dbRef, userEntry);

      scrollToEntry.current.scrollIntoView();
      setUserEntry("");
    }

  // Handling input change
    const handleInputChange = (event) => {
      setUserEntry(event.target.value);
      // console.log(event)
      // console.log(event.target.value)
    }

  // Handling delete entry
    const handleBurn = (burnEntry) => {
      const database = getDatabase(firebase)
      const dbRef = ref(database, `${burnEntry}`);
      remove(dbRef);
      // console.log(burnEntry);
    }
  
  

  return (
    <div className="App"> 
      <header className="appHeader">
        <div className="borderWrapper">
          <h1><span className="headerSpan1">Morning</span><span className="headerSpan2"> Pages</span></h1>
          {/* <div className="audioContainer">
          <button data-key="birds">test</button>
          <audio data-key="birds" src="./assets/birds.mp3"></audio>
        </div> */}
        </div>
        
        <div className="headerTextContainer">
          <div className="textContainer">
            <p>An adaptation of a writing exercise from “The Artist’s Way” by Julia Cameron.</p> 
          </div>
          <div className="textContainer"> <p> Every morning, write out an unfiltered stream of consciousness in the text box below.</p>
          </div>
          <div className="textContainer"><p>Any thought that bubbles up is written down with no judgement.</p></div>
          <div className="textContainer">
            <p>The aim is to “empty the mind". The result offers more room for a clarity within your headspace.</p>
          </div>
          <div className="textContainer">
            <p>Once your entry is submitted, you may opt to burn your entry.</p>
          </div>
        </div>
      </header>
      <main>
        <section className="entryForm">
          <div className="formWrapper">
            <div className="formContainer">
              <form className="form"action="submit">
                <label htmlFor="newEntry">To begin, type your stream of consciousness here:</label>
              </form>
            </div>
            <textarea
                rows="3"
                placeholder=""
                id="newEntry"
                onChange={ handleInputChange }
                value={userEntry}
                >
                </textarea>
            <div className="formButton">
              <button className="submitEntry" onClick={ handleSubmit } disabled={!userEntry}> Submit my entry </button>
            </div>
          </div>
        </section>

        <section className="burnQueue">
            <div className="burnHeaderContainer">
              <h2>Burn Queue</h2>
            </div>
            <div className="wrapper">
              <ul className="allEntries">
                {entry.map( (entry) => {
                  return (
                    <LoggedEntries 
                    key={entry.key} 
                    id={entry.key}
                    entryName={entry.name}
                    handleBurn={ handleBurn }
                    scrollToEntry={ scrollToEntry }
                    />
                  )
                })}
              </ul>
          </div>
        </section>
      </main>
      <footer>
        <p>Created at Juno College by Caroline Manalo </p>
      </footer>
    </div>
  );
}

export default App;
