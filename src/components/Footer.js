import { Container, Row, Col } from "react-bootstrap";

import logo from "../assets/img/logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-right">
          
          <Col size={6} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={6} sm={6} className="text-right text-sm-end">
            
            <p></p>
                <p>©Yash Waikar 2024. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}