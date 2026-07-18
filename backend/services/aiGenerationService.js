import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateSessionTitle(text) {

    const prompt = `
Generate a concise study session title from the study material below.

Rules:
- Maximum 6 words.
- Use Title Case.
- Do not use quotation marks.
- Do not include "Study Notes", "PDF", or "Document".
- Return ONLY the title.

Study Material:

${text.slice(0, 4000)}
`;

    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
    });

    return response.text.trim();
}

export async function generateStudyResources(chunks) {

    const studyMaterial = chunks
        .map(chunk => chunk.text)
        .join("\n\n");

    const prompt = `
You are Lumi, the AI study companion inside StudyFlow.

Your task is to analyze the uploaded study material and generate structured study resources.

The uploaded material may be lecture notes, textbook chapters, handwritten notes converted to text, documentation, or study guides.

Your goal is to help students understand, revise and remember the material.

Return ONLY valid JSON.

Do not wrap the JSON inside markdown.
Do not explain anything outside the JSON.

--------------------------------------------------------
RULES
--------------------------------------------------------

1. Understand the complete document before generating resources.
2. Organize the content into logical topics and subtopics.
3. The Overview must summarize the ENTIRE study material.
4. Every topic should contain only information related to that topic.
5. Keep explanations concise, student-friendly and easy to understand.
6. Use bullet points where appropriate.
7. Generate enough flashcards and quiz questions to cover every important concept.
8. Avoid duplicate flashcards or quiz questions.
9. Cover important definitions, concepts, formulas and comparisons whenever available.
10. If code exists, explain it simply.
11. If algorithms or processes exist, explain them step by step.
12. If tables exist, convert them into readable explanations.
13. Generate memory tricks only when meaningful.
14. Never invent information not present in the study material.
15. If information is incomplete, summarize only what exists.

--------------------------------------------------------
JSON FORMAT
--------------------------------------------------------

{
  "overview": {
    "title": "Quick Overview",
    "summary": "...",
    "learningObjectives": [
      "...",
      "...",
      "..."
    ]
  },

  "topics": [
    {
      "title": "...",

      "summary": "...",

      "keyPoints": [
        "...",
        "...",
        "..."
      ],

      "memoryTrick": {
        "title": "...",
        "content": "..."
      },

      "revisionTags": [
        "...",
        "...",
        "..."
      ],

      "continueWithLumi": [
        "...",
        "...",
        "..."
      ]
    }
  ],

  "flashcards": [
    {
      "question": "...",
      "answer": "..."
    }
  ],

  "quiz": [
    {
      "question": "...",
      "options": [
        "...",
        "...",
        "...",
        "..."
      ],
      "correctAnswer": "...",
      "explanation": "..."
    }
  ],

  "mindMap": {
    "title": "...",
    "explanation": "...",
    "children": [
      {
        "title": "...",
        "explanation": "...",
        "children": [
          {
            "title": "...",
            "explanation": "...",
            "children": []
          }
        ]
      }
    ]
  }
}

--------------------------------------------------------
QUALITY GUIDELINES
--------------------------------------------------------

Overview:
- Summarize the entire study material.
- Mention every major topic.
- Keep it between 150–250 words.

Topics:
- Create one topic object for every major concept.
- Keep each topic self-contained.
- Include concise summaries.
- Include important bullet points.
- Include one meaningful memory trick where appropriate.

Flashcards:
- Generate comprehensive flashcards covering all important concepts.
- Include conceptual, factual and definition-based questions.
- Avoid duplicates.

Quiz:
- Generate comprehensive MCQs covering all major topics.
- Every question must have exactly four options.
- Include the correct answer.
- Include a short explanation.

Mind Map:
- Organize concepts hierarchically.
- Parent topics should contain child concepts.
- Every node must include a short explanation.

Return ONLY valid JSON.

--------------------------------------------------------
STUDY MATERIAL
--------------------------------------------------------

${studyMaterial}
`;

    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            maxOutputTokens: 8192,
        },
    });

    try {
        return JSON.parse(response.text);
    } catch {
        throw new Error("Gemini returned invalid JSON.");
    }
}