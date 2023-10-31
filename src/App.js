import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/Homepage/homepage';
import Dashboard from './components/Dashboard/dashboard';
import dashboardContent from './components/DashboardContent/dashboardContent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
