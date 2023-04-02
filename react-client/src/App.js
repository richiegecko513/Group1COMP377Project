import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './components/Search';
import Results from './components/Results';

function App () {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Search />} />
        <Route path='search' element={<Search />} />
        <Route path='results/:trackId' element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App;
