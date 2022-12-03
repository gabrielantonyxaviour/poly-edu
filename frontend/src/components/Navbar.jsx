import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ConnectButton } from "web3uikit";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">poly.edu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          style={{
            flexGrow: "0",
          }}
          id="basic-navbar-nav"
        >
          <Nav className="justify-content-end d-flex">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/mycourses">My Courses</Nav.Link>
            <Nav.Link href="/certificates">My Certificates</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Help</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Notifications
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Donate</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">About</NavDropdown.Item>
            </NavDropdown>
            <ConnectButton moralisAuth={false} chainId={137} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
