const LoggedEntries = (props) => {
    console.log(props)
    return (
        <>
        <li>
            <p>{props.entryName}</p>
            <button onClick={ props.handleBurn }> Burn entry</button>
        </li>
        </>
    )
}

export default LoggedEntries;