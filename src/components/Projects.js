import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/personalwb-logo.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
//import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Patriot Pop",
      description: "Collaboratively designed a web-based radio management system facilitating role-specific functionalities Implemented effective data management and real-time synchronization across profiles/roles.",
      imgUrl: projImg1,
      url : "https://github.com/yash-waikar/patriot-pop"
    },
    {
      title: "Pitch Desk AI",
      description: "Analyzes your pitch desk presentaiton and give you a summary and key points. Uses the OpenAI API. ",
      imgUrl: projImg2,
      url: "https://github.com/yash-waikar/AI-Pitch-Deck-Analyzer"
    },
    {
      title: "Personal Portofolio",
      description: "Designed and Developed this website using React, React-boot-strap, javascript, and css",
      imgUrl: projImg3,
    },
   
  
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p></p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}