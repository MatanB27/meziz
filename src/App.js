import logo from './logo.svg';
import Game from './screens/game/index'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path='/' exact element={<Game/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;

function AboutUs()  {
  return(
      <div>About us</div>
  )
}