"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Chatbot } from "../components/chatbot"

export function Skills() {
  const technicalSkills = [
    { name: "TypeScript", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React.js", level: 85 },
    { name: "Node.js", level: 80 },
     { name: "Tailwind CSS", level: 90 },
    { name: "Zustand", level: 90 },
    { name: "Python", level: 80 },
    { name: "SQL", level: 60 },
  ];

  const otherSkills = [
    { name: "UI/UX Design", level: 70 },
    { name: "Figma", level: 70 },
    { name: "Git", level: 85 },
    { name: "Agile Methodologies", level: 80 },
    { name: "AI Automation", level: 65 },
    { name: "CI/CD", level: 70 },
    { name: "Docker", level: 60 },
    { name: "Agile/Scrum", level: 80 },
    { name: "RESTful APIs", level: 85 },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
             What I Am Good At
            </h2>
           
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
              I know some things, always learning more.
            </p>
          </motion.div>
        </div>

        <Tabs
          defaultValue="technical"
          className="mt-12 w-full max-w-3xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="technical">Frontend</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="technical" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  {technicalSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-start mb-1">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden"></div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="other" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  {otherSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-start mb-1">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden"></div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
