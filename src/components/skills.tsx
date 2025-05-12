"use client";

import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Skills() {
  const technicalSkills = [
    { name: "Java", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Python", level: 80 },
    { name: "React.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 90 },
    { name: "HTML/CSS", level: 90 },
    { name: "SQL", level: 60 },
  ];

  const otherSkills = [
    { name: "UI/UX Design", level: 70 },
    { name: "Test Automation", level: 60 },
    { name: "Cloud Computing (Azure & AWS)", level: 60 },
    { name: "Git", level: 85 },
    { name: "Agile Methodologies", level: 80 },
    { name: "AI Automation", level: 65 },
    { name: "CI/CD", level: 70 },
    { name: "Docker", level: 60 },
    { name: "Figma", level: 70 },
    { name: "Postman", level: 75 },
    { name: "Agile/Scrum", level: 80 },
    { name: "RESTful APIs", level: 85 },
  ];
  const MotionDiv = motion.div as React.ComponentType<
    React.HTMLAttributes<HTMLDivElement> & MotionProps
  >;

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
              Technical Skills
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
            <TabsTrigger value="technical">Programming</TabsTrigger>
            <TabsTrigger value="other">Technologies</TabsTrigger>
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
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <MotionDiv
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
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
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <MotionDiv
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
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
