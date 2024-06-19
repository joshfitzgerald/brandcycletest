import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from './App';
import AppV2 from './AppV2';

function Main() {
  return (
    <React.StrictMode>
      <Router>
        <nav className="versionNav">
          <ul>
            <li>
              <Link to="/">ver. 1</Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/v2">ver. 2</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/v2" element={<AppV2 />} />
        </Routes>
      </Router>
    </React.StrictMode>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));