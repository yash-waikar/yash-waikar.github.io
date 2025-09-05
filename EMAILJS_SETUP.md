# EmailJS Setup Guide for Portfolio Email Functionality

## Overview
This portfolio uses EmailJS to handle email functionality directly from the browser, perfect for static sites hosted on GitHub Pages.

## Setup Steps

### 1. Sign up for EmailJS
- Go to [https://emailjs.com](https://emailjs.com)
- Create a free account (100 emails/month free)

### 2. Create an Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions for your provider
- Note down the **Service ID**

### 3. Create Email Templates

#### Template 1: Contact Form
- Go to "Email Templates" and click "Create New Template"
- Template ID: `template_contact`
- Subject: `New Contact from {{from_name}} - Portfolio`
- Content:
```
From: {{from_name}}
Email: {{from_email}}
Request Type: {{request_type}}

Message:
{{message}}

---
Sent via Portfolio Chatbot
```

#### Template 2: Resume Request
- Create another template
- Template ID: `template_resume`  
- Subject: `Resume Request from {{from_name}}`
- Content:
```
Resume request from: {{from_name}}
Email: {{from_email}}

Please send resume to: {{from_email}}

---
Sent via Portfolio Chatbot
```

### 4. Get Your Public Key
- Go to "Account" → "General"
- Copy your **Public Key**

### 5. Update Environment Variables
Update your `.env.local` file:
```bash
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_CONTACT=template_contact
REACT_APP_EMAILJS_TEMPLATE_RESUME=template_resume
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Test the Functionality
1. Restart your development server
2. Open the chatbot
3. Try phrases like:
   - "Can you send me his resume?"
   - "Email me his resume"
   - "I'd like to get in touch"
   - "Contact me"

## How It Works

1. **Email Detection**: The chatbot detects email-related keywords in user messages
2. **Form Trigger**: Opens a modal form for user details
3. **Email Sending**: Uses EmailJS to send emails directly from the browser
4. **Resume Access**: Users can also directly download the resume from `/assets/Yash-Waikar-Resume.pdf`

## Features

- **Resume Requests**: Automatically notifies you when someone requests a resume
- **Contact Forms**: General inquiries and messages
- **Direct Download**: Users can download resume directly
- **Offline Fallback**: Provides contact email if service is unavailable

## Security

- No server-side code required
- EmailJS handles email delivery securely
- Environment variables keep keys secure
- Rate limiting provided by EmailJS

## Troubleshooting

1. **Emails not sending**: Check service ID and template IDs match exactly
2. **Template errors**: Ensure template variable names match ({{from_name}}, etc.)
3. **Rate limits**: EmailJS free tier has 100 emails/month limit
4. **Spam issues**: Add your domain to EmailJS settings for better delivery
