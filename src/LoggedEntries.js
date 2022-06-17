const LoggedEntries = (props) => {
    // console.log("LoggedEntries.js has rendered")
    // console.log(props)
    return (
        <>
        <li>
            <p>{props.entryName}</p>
            <button onClick={ () => { props.handleBurn( props.id) } }> Burn entry </button>
        </li>
        </>
    )
}

export default LoggedEntries;