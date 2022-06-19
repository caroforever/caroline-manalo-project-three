const LoggedEntries = (props) => {
    // console.log("LoggedEntries.js has rendered")
    // console.log(props)
    
    return (
        <>
                <li class="postedEntry">
                    <p>{props.entryName}</p>
                    <button className="burnButton" onClick={ () => { props.handleBurn( props.id) } }> Burn entry </button>
                </li>
        </>
    )
}

export default LoggedEntries;