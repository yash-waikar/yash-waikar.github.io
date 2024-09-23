import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import resumePDF from '../assets/Yash-Waikar-Resume.pdf';

const DrawOutlineButton = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={`draw-outline-button ${className}`}>
      <span>{children}</span>
      <span className="outline top"></span>
      <span className="outline right"></span>
      <span className="outline bottom"></span>
      <span className="outline left"></span>
    </button>
  );
};
export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            
            <Nav.Link
              href="#home"
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('home')} >
              Home
            </Nav.Link>

            <Nav.Link
              href="#skills"
              className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('skills')} >
              Skills
            </Nav.Link>

            <Nav.Link
              href="#projects"
              className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('projects')} >
              Projects
            </Nav.Link>

            <Nav.Link
              href="#experience"
              className={activeLink === 'qualification' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('experience')} >
              Experience
            </Nav.Link>
            <Nav.Link
              href={resumePDF}
              target= "_blank"
              //rel="noopener noreferrer"
              className={activeLink === 'resume' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('resume')} >
              Resume
            </Nav.Link>

           
           
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/yash-waikar-509866202/"><img src={navIcon1} alt="" /></a>
              <a href="https://github.com/yash-waikar"><img src={navIcon2} alt="" /></a>
              
            </div>
            <DrawOutlineButton onClick={() => window.location.href = 'mailto: yashpwaikar@gmail.com'}>
             Contact Me
            </DrawOutlineButton>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};