import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EmployeeCards from './components/EmployeeCards';

function App() {
    return (
        <Router>
            <main className='mainDiv'>
                <Route path="/" component={EmployeeCards} />
            </main>
        </Router>
    );
};

export default App;