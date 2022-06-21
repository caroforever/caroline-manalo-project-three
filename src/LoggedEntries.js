

const LoggedEntries = (props) => {
    return (
        <>
                <li className="postedEntry" ref={props.scrollToEntry}>
                    <p>{props.entryName}</p>
                    <button 
                        className="burnButton" 
                        onClick={ () => { props.handleBurn( props.id ) }
                        }
                    > Burn entry </button>
                </li>
        </>
    )
}

export default LoggedEntries;