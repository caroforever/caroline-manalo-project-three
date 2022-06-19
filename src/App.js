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
  
  //   componentDidUpdate(prevProps) {
  // // `formVisible` went from false -> true, scroll the <form> into view
  // if (!prevProps.formVisible && this.props.formVisible) {
  //   this.formRef.current.scrollIntoView();

  return (
    <div className="App"> 
      <header className="appHeader">
        <div className="borderWrapper">
          <h1><span className="headerSpan1">Morning</span><span className="headerSpan2"> Pages</span></h1>
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
