"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { EmailForm } from "./ui/email-form";
import { sendEmail, type EmailData } from "../services/emailService";
import { AnimatedMarkdownRenderer } from "./ui/animated-markdown-renderer";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export function Chatbot() {
  const initialMessage: Message = {
    id: "1",
    content:
      "Hi! I'm Yash's AI assistant. Feel free to ask me anything about his experience, projects, or skills!",
    role: "assistant",
    timestamp: new Date(),
  };
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailForm, setEmailForm] = useState<{
    isOpen: boolean;
    requestType: "resume" | "contact";
  }>({
    isOpen: false,
    requestType: "contact",
  });
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const placeholders = [
    "What's Yash's work experience?",
    "I am looking for a ..",
    "Tell me about his projects",
    "What technologies does he use?",
    "Where did he study?",
    "How can I contact him?",
    "What are his skills?",
    "Can you send me his resume?",
    "Email me his resume",
  ];

  const detectEmailIntent = (
    userInput: string
  ): "resume" | "contact" | null => {
    const input = userInput.toLowerCase();

    if (
      (input.includes("resume") || input.includes("cv")) &&
      (input.includes("email") ||
        input.includes("send") ||
        input.includes("share"))
    ) {
      return "resume";
    }

    // Contact-related keywords
    if (
      input.includes("email me") ||
      input.includes("send me") ||
      input.includes("contact me") ||
      (input.includes("contact") &&
        (input.includes("email") || input.includes("send"))) ||
      input.includes("get in touch") ||
      input.includes("reach out")
    ) {
      return "contact";
    }

    return null;
  };

  const handleEmailSubmit = async (data: {
    name: string;
    email: string;
    message?: string;
  }) => {
    setIsEmailLoading(true);

    try {
      const emailData: EmailData = {
        name: data.name,
        email: data.email,
        message: data.message,
        requestType: emailForm.requestType,
      };

      const result = await sendEmail(emailData);

      if (result.success) {
        setEmailForm({ isOpen: false, requestType: "contact" });

        const successMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: result.message,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMessage]);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I couldn't send the email right now. Please try contacting me directly at yashpwaikar@gmail.com",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const getOfflineResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("resume") || input.includes("cv")) {
      if (input.includes("download")) {
        return "You can download my resume directly from this link: [Download Resume](/assets/Yash-Waikar-Resume.pdf). Alternatively, I can email it to you if you prefer!";
      }
      return "I'd be happy to share my resume! You can either download it directly or I can email it to you. Just let me know your preference!";
    }

    if (
      input.includes("experience") ||
      input.includes("work") ||
      input.includes("job") ||
      input.includes("company") ||
      input.includes("ampcus")
    ) {
      return "Yash is currently a Junior Software Engineer at Ampcus Inc. since January 2025, working on pharma serialization apps and AI features for ComplyX. He previously interned at the same company from September 2024, where he developed React components, implemented CI/CD pipelines, and worked with various technologies.";
    }

    if (
      input.includes("education") ||
      input.includes("school") ||
      input.includes("degree") ||
      input.includes("university") ||
      input.includes("college") ||
      input.includes("gmu") ||
      input.includes("george mason") ||
      input.includes("nova")
    ) {
      return "Yash graduated with a B.S. in Computer Science from George Mason University in December 2024 with a 3.7 GPA. He also has an A.S. in Computer Science from NOVA Community College (2022) with a 3.9 GPA.";
    }

    if (input.includes("salesforce")) {
      return "Yes, **Yash has experience with Salesforce!** He's worked with:\n* Salesforce development\n* System integration\n* Custom solutions\n\nHe's comfortable working in the Salesforce ecosystem.";
    }

    if (input.includes("typescript") || input.includes("ts")) {
      return "**Yash is highly proficient in TypeScript** (90% proficiency). He uses it extensively for:\n* React projects\n* Type-safe development\n* Large-scale applications\n* Better code maintainability";
    }

    if (input.includes("react")) {
      return "**Yash has strong React.js skills** (85% proficiency) and uses it for:\n* Modern web applications\n* Component architecture\n* React hooks and context\n* State management\n* UI/UX development";
    }

    if (input.includes("python")) {
      return "**Yash has good Python skills** (80% proficiency) and has used it for:\n* Data analysis and processing\n* Backend development\n* Automation scripts\n* API development\n* Machine learning projects";
    }

    if (input.includes("tailwind")) {
      return "**Yash is very skilled with Tailwind CSS** (90% proficiency) and uses it for:\n* Responsive design\n* Modern UI components\n* Rapid prototyping\n* Consistent styling\n* Mobile-first development";
    }

    if (input.includes("node") || input.includes("nodejs")) {
      return "Yash has solid Node.js experience (80% proficiency) for backend development and API creation.";
    }

    if (input.includes("docker")) {
      return "Yes, Yash has experience with Docker for containerization and deployment of applications.";
    }

    if (input.includes("git") || input.includes("github")) {
      return "Yash is experienced with Git and GitHub for version control and collaborative development workflows.";
    }

    if (input.includes("resume it") || input.includes("resumeit")) {
      return "**Resume IT** is an AI-powered resume builder that Yash developed. Features include:\n* **Technology Stack:** React.js, Node.js, AI APIs\n* **Key Features:**\n  * Professional resume creation\n  * Intelligent suggestions\n  * Modern formatting\n  * Real-time preview\n* **Purpose:** Helping users create standout resumes efficiently";
    }

    if (input.includes("wave tune") || input.includes("wavetune")) {
      return "**Wave Tune** is a hand gesture-controlled music player created by Yash. Details:\n* **Technology Stack:** Python, OpenCV, MediaPipe\n* **Key Features:**\n  * Hand gesture recognition\n  * Music playback control\n  * Webcam integration\n  * Real-time processing\n* **Innovation:** Touchless music control through computer vision";
    }

    if (input.includes("patriot pop")) {
      return "**Patriot Pop** is a radio management system built for WGMU Radio at George Mason University. Features:\n* **Technology Stack:** Web technologies\n* **Key Features:**\n  * Playlist management\n  * Scheduling system\n  * Real-time broadcasting controls\n  * User-friendly interface\n* **Impact:** Streamlined radio station operations";
    }

    if (input.includes("choremate")) {
      return "**ChoreMATE** is a task management application developed by Yash. Features:\n* **Purpose:** Daily task and chore organization\n* **Key Features:**\n  * Task tracking\n  * User-friendly interface\n  * Progress monitoring\n  * Productivity enhancement\n* **Goal:** Simplifying personal task management";
    }

    if (
      input.includes("skill") ||
      input.includes("technology") ||
      input.includes("tech") ||
      input.includes("programming") ||
      input.includes("languages")
    ) {
      return "Yash's technical skills include TypeScript (90%), JavaScript (85%), React.js (85%), Tailwind CSS (90%), Node.js (80%), Python (80%), Zustand (90%), Docker, Git, CI/CD pipelines, RESTful APIs, and many other modern development technologies.";
    }

    if (input.includes("project")) {
      return "Yash has developed several notable projects including Resume IT (AI-powered resume builder), Wave Tune (hand gesture-controlled music player), Patriot Pop (radio management system), and ChoreMATE (task management app). Each project showcases different aspects of his full-stack development skills.";
    }

    if (
      input.includes("contact") ||
      input.includes("reach") ||
      input.includes("email") ||
      input.includes("hire") ||
      input.includes("opportunity")
    ) {
      return "You can contact Yash directly at yashpwaikar@gmail.com. I can also help you send a message through the contact form if you'd like! He's always open to discussing new opportunities and collaborations.";
    }

    if (
      input.includes("location") ||
      input.includes("where") ||
      input.includes("based")
    ) {
      return "Yash is currently based in the Washington D.C. metro area and is available for both remote and on-site opportunities.";
    }

    return "**Hi! I'm here to help you learn about Yash Waikar.** I can provide information about:\n\n* **Professional Experience** - His work history and roles\n* **Education & Skills** - Academic background and technical expertise\n* **Projects** - Resume IT, Wave Tune, Patriot Pop, and more\n* **Technologies** - React, TypeScript, Python, Salesforce, etc.\n* **Resume & Contact** - Get his resume or connect with him\n\n**Try asking:** *'Tell me about Yash's React experience'* or *'What is Resume IT?'*";
  };

  const extractWebsiteContext = (): string => {
    const extractTextContent = (selector: string): string => {
      const elements = document.querySelectorAll(selector);
      return Array.from(elements)
        .map((el) => el.textContent?.trim())
        .filter(Boolean)
        .join(" ");
    };

    const heroContent = extractTextContent('h1, .hero p, [class*="hero"] p');
    const skillsContent = extractTextContent(
      '[id="skills"] *, [class*="skill"] *'
    );
    const projectsContent = extractTextContent(
      '[id="projects"] *, [class*="project"] *'
    );
    const experienceContent = extractTextContent(
      '[id="experience"] *, [class*="experience"] *'
    );

    const metaDescription =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || "";
    const title = document.title;

    return `
WEBSITE CONTEXT:
Page Title: ${title}
Meta Description: ${metaDescription}

HERO SECTION: ${heroContent}

SKILLS SECTION: ${skillsContent}

PROJECTS SECTION: ${projectsContent}

EXPERIENCE SECTION: ${experienceContent}

Based on this current website content, provide helpful information about Yash Waikar's professional background.
    `.trim();
  };

  const sendMessage = async (value?: string) => {
    const messageContent = value || inputValue.trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Check for email intent first
    const emailIntent = detectEmailIntent(messageContent);
    if (emailIntent) {
      setEmailForm({ isOpen: true, requestType: emailIntent });
      setIsLoading(false);
      return;
    }

    try {
      // Extract current website context
      const websiteContext = extractWebsiteContext();

      console.log("🚀 Attempting AI API call...");
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://yashwaikar.com",
            "X-Title": "Yash Waikar Portfolio",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3.1:free",
            messages: [
              {
                role: "system",
                content: `You are Yash Waikar's AI assistant on his portfolio website. You should be helpful, friendly, and knowledgeable about Yash's background. 

Use this current website content to answer questions accurately:

${websiteContext}

Keep responses concise, friendly, and focused on Yash's professional background. If asked about something not covered in the website content, politely redirect to contacting Yash directly at yashpwaikar@gmail.com.`,
              },
              ...messages.slice(-5).map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
              {
                role: "user",
                content: userMessage.content,
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        console.log("❌ AI API failed with status:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ AI API response received");
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          data.choices[0]?.message?.content ||
          "I'm sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("❌ Error sending message:", error);
      console.log("🔄 Falling back to offline response");

      // Fallback to offline response
      const offlineResponse = getOfflineResponse(userMessage.content);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: offlineResponse,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        ></motion.div>

        {/* Fixed width container for input - keeps consistent width */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <HoverBorderGradient
            containerClassName="rounded-full w-full"
            className=" relative overflow-visible"
            as="div"
            bluePurple={true}
          >
            <div className="relative w-full overflow-visible">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Bot className="h-5 w-5 text-muted-foreground" />
              </div>
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleInputChange}
                onSubmit={handleFormSubmit}
              />
            </div>
          </HoverBorderGradient>
        </motion.div>

        {/* Response container - separate from input to prevent layout shifts */}
        <div className="max-w-5xl mx-auto w-full">
          {(messages.length > 1 || isLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg border-border/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">{/* Content will be here */}</div>
                    {messages.length > 1 && !isLoading && (
                      <button
                        onClick={() => setMessages([initialMessage])}
                        className="ml-2 p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                        title="Clear response"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    messages
                      .filter((message) => message.role === "assistant")
                      .slice(-1)
                      .map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                          }}
                        >
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <AnimatedMarkdownRenderer
                              content={message.content}
                              className="text-base leading-relaxed"
                            />
                          </div>
                        </motion.div>
                      ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      <EmailForm
        isOpen={emailForm.isOpen}
        onClose={() => setEmailForm({ isOpen: false, requestType: "contact" })}
        requestType={emailForm.requestType}
        onSubmit={handleEmailSubmit}
        isLoading={isEmailLoading}
      />
    </section>
  );
}
