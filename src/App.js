import './App.scss';
import { Routes, Route, Link } from "react-router-dom";

import Home from './components/Home';
import Comments from './components/Comments/Comments';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/" element={<Home />}>Home</Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/comments/:issueNum" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
