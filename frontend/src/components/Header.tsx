import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" style={{ background: '#333' }}>
      <Container>
        <Navbar.Brand>
          <Link href="/" className='nav-link'>Work-Genius</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/users" className="nav-link">
              Manage-Users
            </Link>
            <Nav.Link href="http://localhost:8000/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
