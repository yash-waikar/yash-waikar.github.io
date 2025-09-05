# GitHub Pages Deployment Setup

This guide explains how to deploy your portfolio with environment variables to GitHub Pages.

## Step 1: Add GitHub Secrets

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each of these:

### Required Secrets:
- `REACT_APP_OPENROUTER_API_KEY` = `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`
- `REACT_APP_EMAILJS_SERVICE_ID` = (your EmailJS service ID)
- `REACT_APP_EMAILJS_TEMPLATE_CONTACT` = (your contact template ID)
- `REACT_APP_EMAILJS_TEMPLATE_RESUME` = (your resume template ID)
- `REACT_APP_EMAILJS_PUBLIC_KEY` = (your EmailJS public key)

## Step 2: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy when you push to main

## Step 3: Update Repository Settings

Make sure your repository has these settings:
- **Actions** → **General** → **Workflow permissions** → Select "Read and write permissions"
- **Pages** → **Build and deployment** → **Source** → "GitHub Actions"

## How It Works

1. When you push code to the `main` branch
2. GitHub Actions runs the build process
3. Environment variables are injected from GitHub Secrets
4. The built site is deployed to GitHub Pages
5. Your API keys remain secure and never appear in your code

## Local Development

- Keep using `.env.local` for local development
- Never commit `.env.local` to git (it's already in .gitignore)
- The GitHub Action will handle production environment variables

## Security Note

Even with this setup, remember that client-side API keys will be visible in the built JavaScript. For the OpenRouter API, make sure to:
1. Set usage limits on your API key
2. Restrict the API key to specific domains if possible
3. Monitor usage regularly
Triggering deployment workflow
