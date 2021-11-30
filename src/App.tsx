import './App.css';
import { useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import User from './User';
import notifyMe from './components/notify';
import {PrivateRoute} from './components/router/privateRoute'
import Dashboard from './components/dashboard'
import NotFound from './components/notFound'

function App() {

  useEffect(() => {
    // notifyMe("notify from app js")
  }, [])

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
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/User" element={<User />}></Route>
          <Route
            path="/dashboard"
            element={<PrivateRoute RouteComponent={Dashboard} path="/dashboard" />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
