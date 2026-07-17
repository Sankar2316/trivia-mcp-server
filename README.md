# 🧠 Trivia Quiz MCP Server for Kiro

A custom MCP server that connects Kiro to the Open Trivia Database (https://opentdb.com/) — giving Kiro the ability to fetch real quiz questions, categories, and stats to build interactive quiz applications.

## 🔌 What It Connects To

**Open Trivia Database (opentdb.com)** — a free, real API with 4,000+ trivia questions across 24 categories. No API key required.

## 🛠️ Tools

| Tool | Description |
|------|-------------|
| `get_trivia_questions` | Fetch random trivia questions by difficulty (easy/medium/hard) |
| `list_trivia_categories` | List all 24 available quiz categories |
| `get_category_stats` | Get question count stats per category |

## 🎯 What I Built With It

An **interactive HTML trivia quiz app** that Kiro builds using real data from the MCP server — fetching live questions, showing multiple choice options, tracking score, and displaying results. This is only possible because of the MCP integration — without it, Kiro has no access to trivia data.

## 🎥 Demo Video

[Watch Demo](https://drive.google.com/file/d/1vpYfxCJJ-q2_LqeVQlgCOc1d0xlEIHtc/view?usp=sharing)

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- Kiro (latest version)

### Installation

git clone https://github.com/Sankar2316/trivia-mcp-server.git
cd trivia-mcp-server
npm install
npm run build

### No API Key Needed! 🎉

Open Trivia DB is completely free — no signup, no authentication.

### Configure in Kiro

The .kiro/settings/mcp.json is already included. Just open this folder in Kiro and the MCP server auto-connects.

### Test

npx @modelcontextprotocol/inspector node dist/index.js

## 📁 Project Structure

trivia-mcp-server/
├── .kiro/
│   └── settings/
│       └── mcp.json
├── src/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md

## 📜 License

MIT
