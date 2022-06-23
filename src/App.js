import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function App() {
  
  return (
    
    <div className="App">
    <Routes>
      <Route path="/" element={
        <>
        <header className="landingPageHeader">
            <div className="landingPageContainer">
                <div className="mainHeader">
                  <h1><span className="headerSpan1">Morning</span><span className="headerSpan2"> Pages</span></h1>
                </div>
            </div>
            <div className="landingPageWrapper2">
                <div className="mainHeader">
                </div>
            </div>
    </header>
    <section className="enter">
      <div className="enterText">
        <p>A daily writing ritual </p>
      </div>
      <div className="enterContainer">
        <a href="/header"> ENTER </a>
      </div>
    </section>
    <Footer /> 
    </>
    } />
    <Route path="/header" element={<Header />} />

    </Routes>
    </div>
  )
}

export default App;
