import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { WaterDropGrid } from "./WaterDropGrid";
import TrackVisibility from "react-on-screen";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Software", "Cloud"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const currentWord = toRotate[i];
    const updatedText = isDeleting
      ? currentWord.substring(0, text.length - 1)
      : currentWord.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === currentWord) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h1>
                    Hey! I am Yash Waikar. A{' '}
                    <span className="txt-rotate">
                      <span className="wrap">{text}</span>
                    </span>{' '}
                    Engineer
                  </h1>
                  <p>
                    Recent Computer Science Graduate from George Mason University. I am passionate about
                    designing and building web applications and adapting to new frameworks. Currently, I am
                     learning about AI/ML cloud services on AWS.
                  </p>
                  <p>In my free time, you can find me singing and composing music. Listen as you scroll!</p>
                  <iframe
                    src="https://open.spotify.com/embed/track/369Q8J2tgFH3GCFFneH8CK?utm_source=generator&theme=0"
                    style={{
                      borderRadius: "12px",
                      width: "100%",
                      height: "300px",
                      border: "none",
                    }}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <WaterDropGrid />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};