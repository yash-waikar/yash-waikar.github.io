"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { CalendarDays, GraduationCap, Briefcase } from "lucide-react"

export function Experience() {
  const [activeTab, setActiveTab] = useState("education")

  const education = [
    {
      institution: "George Mason University",
      degree: "B.S in Computer Science",
      period: "2022 - December 2024",
      description:
        "Relevant Coursework: Algorithms, Operating Systems, Data Structures, Object Formal Methods, Computer Systems, Database Concepts, Object-Oriented Programming, Web App Development",
    },
    {
      institution: "NOVA Community College",
      degree: "A.S in Computer Science",
      period: "2020 - 2022",
      description: "",
    },
  ]

  const work = [
    {
      company: "Ampcus Inc.",
      position: "Junior Engineer ",
      period: "January 2025 - Present",
      description:
        "Spearheading the development and integration of key AI and location based features for a TPRM SaaS platform. Download my resume to learn more about my work.",
      skills: ["TypeScript", "React", "Tailwind CSS", "React Query", "Node.js"],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
              My educational background and professional experience.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="education" className="mt-12 w-full max-w-3xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="work">Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="education" className="mt-6 space-y-6">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2 text-center">
                    <CardTitle className="text-xl">{item.institution}</CardTitle>
                    <CardDescription className="flex items-center justify-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      {item.degree}
                    </CardDescription>
                    <div className="flex items-center justify-center text-sm text-muted-foreground mt-1">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      {item.period}
                    </div>
                  </CardHeader>
                  {item.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">{item.description}</p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          <TabsContent value="work" className="mt-6 space-y-6">
            {work.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2 text-center">
                    <CardTitle className="text-xl">{item.company}</CardTitle>
                    <CardDescription className="flex items-center justify-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      {item.position}
                    </CardDescription>
                    <div className="flex items-center justify-center text-sm text-muted-foreground mt-1">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      {item.period}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 text-center">{item.description}</p>
                    {item.skills && (
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.skills.map((skill, i) => (
                          <Badge key={i} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
