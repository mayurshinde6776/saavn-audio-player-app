import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#2BC5B4', color: 'white' }} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: '700', textDecoration: 'none', color: 'white' }}>
            Saavn
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" style={{ color: 'white' }}>
                PlayList
              </Nav.Link>
              <Nav.Link as={Link} to="/upload-song" style={{ color: 'white' }}>
                Upload Song
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
