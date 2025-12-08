import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";

export interface EmailData {
  name: string;
  email: string;
  message?: string;
  requestType: "resume" | "contact";
}

export const sendEmail = async (
  data: EmailData
): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message || "",
      request_type: data.requestType,
      to_email: "yashpwaikar@gmail.com",
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return {
        success: true,
        message:
          data.requestType === "resume"
            ? "Thanks! I'll send my resume to your email shortly."
            : "Thanks for reaching out! I'll get back to you soon.",
      };
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message:
        "Sorry, I couldn't send the email right now. Please try contacting me directly at yashpwaikar@gmail.com",
    };
  }
};

export const sendResumeEmail = async (
  recipientEmail: string,
  recipientName: string
): Promise<{ success: boolean; message: string }> => {
  return sendEmail({
    name: recipientName,
    email: recipientEmail,
    message: `Resume request from ${recipientName}`,
    requestType: "resume",
  });
};
