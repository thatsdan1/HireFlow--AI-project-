#!/bin/bash

echo "🚀 Setting up HireFlow Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js version 16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Environment variables for HireFlow
REACT_APP_API_URL=http://localhost:8000
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
EOF
    echo "✅ .env file created"
fi

echo ""
echo "🎉 Setup complete! You can now run the following commands:"
echo "  npm start    - Start the development server"
echo "  npm test     - Run tests"
echo "  npm run build - Build for production"
echo ""
echo "The application will be available at http://localhost:3000" 