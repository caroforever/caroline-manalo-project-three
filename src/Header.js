import Form from './Form';
import Footer from './Footer';

const Header = () => {
    return (
        <>   
            <header className="landingPageHeader">
                <div className="landingPageWrapper">
                    <div className="mainHeader">
                    {/* <h1><span className="headerSpan1">Morning</span><span className="headerSpan2"> Pages</span></h1> */}
                    </div>
                </div>
            <div className="headerPageWrapper2">
                <div className="mainHeader">
                <h1>
                    <span className="headerSpan1">What are</span>
                    <span className="headerSpan2"> "morning</span>
                    <span className="headerSpan3"> pages"?</span>
                </h1>
                </div>
            </div>
            </header>
            <div className="headerTextContainer">
                    <div className="textContainer">
                        <p>This is an adaptation of a writing exercise from “The Artist’s Way” by Julia Cameron.</p> 
                    </div>
                    <div className="textContainer">
                        <p> Every morning, write out an unfiltered stream of consciousness in the text box below.</p>
                    </div>
                    <div className="textContainer">
                        <p>Any thought that bubbles up is written down with no judgement.</p></div>
                    <div className="textContainer">
                        <p>The aim is to “empty the mind". The result offers more room for clarity within your headspace.</p>
                    </div>
                    <div className="textContainer">
                        <p>Once your entry is submitted, you may opt to burn your entry.</p>
                    </div>
                </div>
            <Form />
            <Footer />
        </>
    )
}

export default Header;