import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <>
      <Navbar bg="light" variant="light" fixed="bottom" className='footer'>
        <Container>
          <Navbar.Brand href="#home">Footer</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
