import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_portfolio';
const EMAILJS_TEMPLATE_ID_CONTACT = process.env.REACT_APP_EMAILJS_TEMPLATE_CONTACT || 'template_contact';
const EMAILJS_TEMPLATE_ID_RESUME = process.env.REACT_APP_EMAILJS_TEMPLATE_RESUME || 'template_resume';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

export interface EmailData {
  name: string;
  email: string;
  message?: string;
  requestType: 'resume' | 'contact';
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Initialize EmailJS (only needs to be done once)
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Choose template based on request type
    const templateId = data.requestType === 'resume' 
      ? EMAILJS_TEMPLATE_ID_RESUME 
      : EMAILJS_TEMPLATE_ID_CONTACT;

    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message || '',
      request_type: data.requestType,
      to_email: 'yashpwaikar@gmail.com',
      reply_to: data.email,
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: data.requestType === 'resume' 
          ? "Thanks! I'll send my resume to your email shortly."
          : "Thanks for reaching out! I'll get back to you soon."
      };
    } else {
      throw new Error('Email service returned non-200 status');
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      message: "Sorry, I couldn't send the email right now. Please try contacting me directly at yashpwaikar@gmail.com"
    };
  }
};

// Function to send resume directly (alternative approach)
export const sendResumeEmail = async (recipientEmail: string, recipientName: string): Promise<{ success: boolean; message: string }> => {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const templateParams = {
      to_email: recipientEmail,
      to_name: recipientName,
      from_name: 'Yash Waikar',
      message: 'Thank you for your interest! Please find my resume attached.',
      resume_url: `${window.location.origin}/assets/Yash-Waikar-Resume.pdf`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_RESUME,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Resume sent successfully! Please check your email."
      };
    } else {
      throw new Error('Failed to send resume');
    }
  } catch (error) {
    console.error('Resume email error:', error);
    return {
      success: false,
      message: "Sorry, I couldn't send the resume right now. You can download it directly from my portfolio."
    };
  }
};
