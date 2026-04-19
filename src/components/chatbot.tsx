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
  const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
  if (!apiKey) {
    console.log("Chatbot disabled: API key not configured");
    return null;
  }

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
    userInput: string,
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
      '[id="skills"] *, [class*="skill"] *',
    );
    const projectsContent = extractTextContent(
      '[id="projects"] *, [class*="project"] *',
    );
    const experienceContent = extractTextContent(
      '[id="experience"] *, [class*="experience"] *',
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

    const emailIntent = detectEmailIntent(messageContent);
    if (emailIntent) {
      setEmailForm({ isOpen: true, requestType: emailIntent });
      setIsLoading(false);
      return;
    }

    try {
      const websiteContext = extractWebsiteContext();

      const MODELS = [
        "openai/gpt-oss-20b:free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "meta-llama/llama-3.2-3b-instruct:free",
      ];

      let response: Response | null = null;
      let lastError: Error | null = null;

      for (const model of MODELS) {
        try {
          response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://yashwaikar.com",
                "X-Title": "Yash Waikar Portfolio",
              },
              body: JSON.stringify({
                model,
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
            },
          );
          if (response.ok) break; // success — stop trying
          lastError = new Error(`HTTP ${response.status}`);
          response = null;
        } catch (err) {
          lastError = err as Error;
          response = null;
        }
      }

      if (!response) {
        throw lastError ?? new Error("All models unavailable");
      }

      const data = await response.json();
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

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm currently unable to connect to my AI service. Please try again in a moment, or feel free to contact Yash directly at yashpwaikar@gmail.com for any questions about his background and experience.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
