import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Saavn</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">PlayList</Nav.Link>
            <Nav.Link href="/upload-song">Upload Songs</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;