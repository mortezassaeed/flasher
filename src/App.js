import logo from './logo.svg';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './Home';
import About from './About';
import User from './User';
function App() {
  return (
   
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              <Nav.Link><Link to="/About">About</Link></Nav.Link>
              <Nav.Link><Link to="/User">User</Link></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/About" element={<About></About>}></Route>
          <Route path="/User" element={<User></User>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
