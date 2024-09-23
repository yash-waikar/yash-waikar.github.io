import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/brain.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import {WaterDropGrid}from "./WaterDropGrid";


import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Software Engineer", "CS Student" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const BubbleText = ({ text }) => {
    return (
     <p >
        {"Skills".split("").map((child, idx) => (
          <span className="hoverText" key={idx}>
            {child}
          </span>
        ))}
      </p>
    );
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
            
                <h1>{'Hey! I am Yash Waikar. A'} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Software Engineer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Upcoming graduate from George Mason University studying Computer Science. I am passionate about Front-End Development and adapting to new Frameworks. Currently intrested in learning about cloud computing.</p>
                  <p> I also write and make indie music on the side, listen as you scroll!</p>
                  <iframe
                  src="https://open.spotify.com/embed/track/369Q8J2tgFH3GCFFneH8CK?utm_source=generator&theme=0"
                  style={{ borderRadius: "12px", width: "100%", height: "300px", border: "none" }}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                    loading="lazy"
                  ></iframe>
                  
                 
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                <WaterDropGrid/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
        <Row>
          
        
          
        </Row>
      </Container>
    </section>
  )
}