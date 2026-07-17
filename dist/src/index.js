import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const server = new McpServer({
    name: "trivia-mcp-server",
    version: "1.0.0",
});
server.tool("get_trivia_questions", "Get random trivia quiz questions from Open Trivia Database", {
    amount: z.number().min(1).max(20).describe("Number of questions (1-20)"),
    difficulty: z.enum(["easy", "medium", "hard"]).optional().describe("Difficulty level"),
}, async ({ amount, difficulty }) => {
    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    if (difficulty)
        url += `&difficulty=${difficulty}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.response_code !== 0) {
        return { content: [{ type: "text", text: "Error fetching questions. Try again." }] };
    }
    const questions = data.results.map((q, i) => {
        const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
        return [
            `**Q${i + 1}: ${decodeHTML(q.question)}**`,
            `Category: ${q.category} | Difficulty: ${q.difficulty}`,
            ...allAnswers.map((a, j) => `  ${String.fromCharCode(65 + j)}. ${decodeHTML(a)}`),
            `Answer: ${decodeHTML(q.correct_answer)}`,
            "",
        ].join("\n");
    });
    return { content: [{ type: "text", text: questions.join("\n---\n") }] };
});
server.tool("list_trivia_categories", "List all available trivia quiz categories", {}, async () => {
    const res = await fetch("https://opentdb.com/api_category.php");
    const data = await res.json();
    const list = data.trivia_categories.map((c) => `- ${c.name} (ID: ${c.id})`).join("\n");
    return { content: [{ type: "text", text: `Available Categories:\n\n${list}` }] };
});
server.tool("get_category_stats", "Get question count stats for a trivia category", {
    category_id: z.number().describe("Category ID from list_trivia_categories"),
}, async ({ category_id }) => {
    const res = await fetch(`https://opentdb.com/api_count.php?category=${category_id}`);
    const data = await res.json();
    const counts = data.category_question_count;
    const text = [
        `Category Stats:`,
        `Total: ${counts.total_question_count}`,
        `Easy: ${counts.total_easy_question_count}`,
        `Medium: ${counts.total_medium_question_count}`,
        `Hard: ${counts.total_hard_question_count}`,
    ].join("\n");
    return { content: [{ type: "text", text }] };
});
function decodeHTML(text) {
    return text
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Trivia MCP server running!");
