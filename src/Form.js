import firebase from './firebase';
import { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import LoggedEntries from './LoggedEntries';


const Form = () => {

    const [entry, setEntry] = useState([]);
        const [userEntry, setUserEntry] = useState("");
        const scrollToEntry = useRef();

        useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database)

        onValue(dbRef, (response) => {
            const newState = [];
            const data = response.val();
            
            for (let key in data) {
            newState.push(
                {
                key: key,
                name: data[key]
                });
            }
            setEntry(newState);
        })

    }, [])

        const handleSubmit = (event) => {
            event.preventDefault();
            const database = getDatabase(firebase)
            const dbRef = ref(database);
            
            push(dbRef, userEntry);
            setUserEntry("");
            scrollToEntry.current.scrollIntoView()

            if (scrollToEntry !== "undefined") {
            }
        }

        const handleInputChange = (event) => {
            setUserEntry(event.target.value);
        }

        const handleBurn = (burnEntry) => {
            const database = getDatabase(firebase)
            const dbRef = ref(database, `${burnEntry}`);
            remove(dbRef);
        }


    return (
        <main>
            <section className="entryForm">
                <div className="formWrapper">
                <div className="formContainer">
                    <form className="form"action="submit">
                    <label htmlFor="newEntry">To begin, type your stream of consciousness here:</label>
                    </form>
                </div>
                <textarea
                    rows="10"
                    placeholder=""
                    id="newEntry"
                    onChange={ handleInputChange }
                    value={ userEntry }
                    >
                    </textarea>
                <div className="formButton">
                    <button className="submitEntry" onClick={ handleSubmit } disabled={ !userEntry }> Submit my entry </button>
                </div>
                </div>
            </section>

            <section className="burnQueue">
                <div className="wrapper">
                    <ul className="allEntries">
                    {entry.map( (entry) => {
                        return (
                        <LoggedEntries 
                        key={ entry.key }  
                        id={ entry.key }
                        entryName={ entry.name }
                        handleBurn={ handleBurn }
                        scrollToEntry={ scrollToEntry }
                        />
                        )
                        })
                    }
                    </ul>
                </div>
            </section>
        </main>
    )

}

export default Form;