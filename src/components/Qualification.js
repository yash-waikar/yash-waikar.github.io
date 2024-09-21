import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ReactComponent as SchoolIcon } from "../assets/img/arrow1.svg";
import { ReactComponent as WorkIcon } from "../assets/img/arrow2.svg";



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


export const Qualification = () => {
  const [activeTab, setActiveTab] = useState("education");
  return (
    <div className="qualification">
      {/* Tab Navigation */}
      <div className="tab-buttons">
        <DrawOutlineButton
          className={activeTab === "education" ? "active" : ""}
          onClick={() => setActiveTab("education")}
        >
          Education
        </DrawOutlineButton>
        <DrawOutlineButton
          className={activeTab === "work" ? "active" : ""}
          onClick={() => setActiveTab("work")}
        >
          Work
        </DrawOutlineButton>
      </div>

      {/* Render the selected timeline based on the active tab */}
      {activeTab === "education" && (
        <div className="experience">
          <VerticalTimeline lineColor="#3e497a">
          <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2022 - December 2024"
              iconStyle={{ background: "#000000", color: "#fff" }}
              contentStyle={{ background: "#000000", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  #90be6d" }}
              icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                George Mason Univeristy
              </h3>
              <h2 className="vertical-timeline-element-subtitle">
                Bachelors in Computer Science
              </h2> <p> Relevant Coursework: Algorithms, Operating Systems, Data Structures, Object Formal Methods, 
Computer Systems, Database Concepts, Object-Oriented Programming, Web App Development
</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2020 - 2022"
              iconStyle={{ background: "#000000", color: "#fff" }}
              contentStyle={{ background: "#000000", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  #90be6d" }}
              icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                NOVA Community College
              </h3>
              <h2 className="vertical-timeline-element-subtitle">
                Associates Degree in Computer Science
              </h2>
             
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      )}

      {activeTab === "work" && (
        <div className="experience">
          <VerticalTimeline lineColor="#3e497a">
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="Sep 2024 - Present"
              iconStyle={{ background: "#000000", color: "#fff" }}
              contentStyle={{ background: "#000000", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  #f94144" }}
              icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Software Engineer Intern
              </h3>
              <h2 className="vertical-timeline-element-subtitle">
                Ampcus Inc. 
              </h2>
              <p>Currently on the front-end team, developing a third party risk management application SaaS product using TypeScript, JavaScript, React, and Tailwind CSS. </p>
            </VerticalTimelineElement>

            
          </VerticalTimeline>
        </div>
      )}
    </div>
  );
};