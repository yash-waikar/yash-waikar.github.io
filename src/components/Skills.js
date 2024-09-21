import react from "../assets/img/react-logo.png";
import meter1 from "../assets/img/meter1.svg";
import java from "../assets/img/java.svg"
import javascript from "../assets/img/javascript.svg"
import python from "../assets/img/python.svg"
import ui from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
   
   const BubbleText = ({ text }) => {
        return (
         <h2 >
            {"Technical~Skills".split("").map((child, idx) => (
              <span className="hoverText" key={idx}>
                {child}
              </span>
            ))}
          </h2>
        );
      };
  const responsive = {
    superLargeDesktop: {

      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <BubbleText> </BubbleText>
                        <p></p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            
                            <div className="item">
                                <img src={java} alt="Image" />
                                <h5>Java</h5>
                            </div>

                            <div className="item">
                                <img src={javascript} alt="Image" />
                                <h5>JavaScript</h5>
                            </div>

                            <div className="item">
                                <img src={python} alt="Image" />
                                <h5>Python</h5>
                            </div>

                            <div className="item">
                                <img src={react} alt="Image" />
                                <h5>React.js & Node.js</h5>
                            </div>


                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Test Automation</h5>
                            </div>
                            <div className="item">
                                <img src={ui} alt="Image" />
                                <h5>UI/UX Design</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5>Cloud Computing (Azure & AWS)</h5>
                            </div>
                            
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}