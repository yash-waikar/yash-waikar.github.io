"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { TextShimmer } from "./ui/shimmer-text";
import { OpenToWorkNote } from "./ui/open-to-work-note";
import { EmailForm } from "./ui/email-form";
import { sendEmail, type EmailData } from "../services/emailService";
import { toast } from "sonner";

export function Hero() {
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

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
        message: data.message || "",
        requestType: "contact",
      };

      const result = await sendEmail(emailData);

      if (result.success) {
        setEmailFormOpen(false);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error(
        "Sorry, couldn't send the message. Please email me directly at yashpwaikar@gmail.com",
      );
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <section className="container relative flex min-h-screen flex-col justify-center px-4 py-24 md:px-6">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Yash Waikar.
          <br />
          <span className="flex w-full flex-wrap items-baseline justify-center gap-x-2 sm:flex-nowrap sm:whitespace-nowrap">
            <span className="relative inline-flex">
              <TextShimmer>Software</TextShimmer>
            </span>
            <span>Engineer.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={() => setEmailFormOpen(true)}>
            <Mail className="mr-1.5 h-4 w-4" />
            Get in touch
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/yash-waikar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-1.5 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <OpenToWorkNote onClick={() => setEmailFormOpen(true)} />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <a
            href="https://github.com/yash-waikar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-waikar-509866202/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:yashpwaikar@gmail.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <EmailForm
            isOpen={emailFormOpen}
            onClose={() => setEmailFormOpen(false)}
            requestType="contact"
            onSubmit={handleEmailSubmit}
            isLoading={isEmailLoading}
          />,
          document.body,
        )}
    </section>
  );
}
