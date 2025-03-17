# Buffered-Reader

A high-performance Node.js library for efficient reading of large files and streams with advanced buffering capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- Efficient memory usage with customizable buffer sizes
- Support for large file handling without memory issues
- Stream-based reading capabilities
- Async/await interface for modern JavaScript applications
- Configurable reading strategies
- Comprehensive error handling

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/Pratham2403/Buffered-Reader.git

# Navigate to the project directory
cd Buffered-Reader

# Install dependencies
npm i

# Build the project
npm run build
```

## ⚙️ Setup

1. Create your environment configuration:

````bash
# Copy the example environment file
cp .env.example .env


## 📖 Usage

Start the server:

```bash
node server.cjs
````

### Basic Example

```javascript
const { BufferedReader } = require("buffered-reader");

async function example() {
  const reader = new BufferedReader("/path/to/large/file.txt");

  // Read the file in chunks
  for await (const chunk of reader.read()) {
    console.log(`Read ${chunk.length} bytes`);
    // Process chunk...
  }

  // Or read the entire file at once (not recommended for very large files)
  const content = await reader.readAll();
}

example().catch(console.error);
```

## 📚 API Documentation

### BufferedReader

The main class for reading files with buffering.

#### Constructor

```javascript
new BufferedReader(filePath, options);
```

- `filePath` - Path to the file to read
- `options` - Configuration object with the following properties:
  - `bufferSize` - Size of the buffer in bytes (default: 8192)
  - `encoding` - File encoding (default: 'utf8')

#### Methods

- `read()` - Returns an async iterator for reading chunks
- `readAll()` - Reads and returns the entire file content
- `close()` - Closes the reader and releases resources

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
