#!/bin/bash

echo "🔍 GitHub Pages Deployment Status Check"
echo "========================================"
echo

# Check if the site is responding
echo "📡 Checking main domain (yashwaikar.com)..."
response=$(curl -s -o /dev/null -w "%{http_code}" https://yashwaikar.com/)
if [ "$response" == "200" ]; then
    echo "✅ Site is responding (HTTP $response)"
else
    echo "❌ Site returned HTTP $response"
fi

# Check if it's showing the React app
echo
echo "🔍 Checking if site shows React portfolio..."
content=$(curl -s https://yashwaikar.com/ | head -10)
if echo "$content" | grep -q "Create React App"; then
    echo "❌ Still showing default Create React App README"
    echo "   ⚠️  This means GitHub Pages source needs to be changed to 'GitHub Actions'"
else
    echo "✅ Showing custom portfolio content"
fi

echo
echo "📋 Next Steps Required:"
echo "1. 🔑 Add GitHub Secrets:"
echo "   - Go to: https://github.com/yash-waikar/yash-waikar.github.io/settings/secrets/actions"
echo "   - Add all the API keys from DEPLOYMENT_GUIDE.md"
echo
echo "2. ⚙️  Change GitHub Pages Source:"
echo "   - Go to: https://github.com/yash-waikar/yash-waikar.github.io/settings/pages"
echo "   - Change Source from 'Deploy from a branch' to 'GitHub Actions'"
echo
echo "3. 🔄 Check Workflow Status:"
echo "   - Go to: https://github.com/yash-waikar/yash-waikar.github.io/actions"
echo "   - Look for the latest workflow run triggered by the recent push"
echo
echo "⏰ After completing steps 1 & 2, the workflow should run automatically"
echo "   and your portfolio will be live at https://yashwaikar.com/"
