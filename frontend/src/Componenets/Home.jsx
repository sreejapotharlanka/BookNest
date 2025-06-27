import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/item')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Error fetching books:', err));
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "blue" }} variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: 'white', textDecoration: "none" }}>BookStore</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link to="/login" style={{ padding: "10px", color: "white", textDecoration: "none" }}>User</Link>
              <Link to="/slogin" style={{ padding: "10px", color: "white", textDecoration: "none" }}>Seller</Link>
              <Link to="/alogin" style={{ padding: "10px", color: "white", textDecoration: "none" }}>Admin</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Book Cards */}
      <Container className="mt-4">
        <h3 className="mb-3">📚 Available Books</h3>
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <div className="row">
            {books.map(book => (
              <div className="col-md-3 mb-4" key={book._id}>
                <div className="card h-100">
                  <img
                    src={`http://localhost:4000/${book.itemImage}`}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.author}</p>
                    <p className="text-muted">₹{book.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
