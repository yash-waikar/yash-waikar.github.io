import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send, Download } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface EmailFormProps {
  isOpen: boolean;
  onClose: () => void;
  requestType: "resume" | "contact";
  onSubmit: (data: { name: string; email: string; message?: string }) => void;
  isLoading: boolean;
}

export function EmailForm({
  isOpen,
  onClose,
  requestType,
  onSubmit,
  isLoading,
}: EmailFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div
              className="w-full max-w-md mx-4"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <Card className="shadow-2xl border-border/50">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {requestType === "resume"
                      ? "Request Resume"
                      : "Get in Touch"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {requestType === "resume"
                      ? "Get my resume via email or download it directly!"
                      : "Let's connect! I'll get back to you soon."}
                  </p>
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          errors.name ? "border-red-500" : "border-border"
                        }`}
                        placeholder="Your full name"
                        disabled={isLoading}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          errors.email ? "border-red-500" : "border-border"
                        }`}
                        placeholder="your.email@example.com"
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {requestType === "contact" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message (Optional)
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                          placeholder="Tell me about your project, opportunity, or question..."
                          rows={3}
                          disabled={isLoading}
                        />
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      {requestType === "resume" && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = "/assets/Yash-Waikar-Resume.pdf";
                            link.download = "Yash-Waikar-Resume.pdf";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          disabled={isLoading}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className={
                          requestType === "resume" ? "flex-1" : "flex-1"
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 flex items-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {requestType === "resume"
                              ? "Email Resume"
                              : "Send Message"}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
