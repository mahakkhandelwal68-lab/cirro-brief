import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Demo briefings are deliberately capped shorter (~1.5 min spoken) than the
// full product's 2-3 min briefings - a teaser, not the complete experience.
const TARGET_WORDS = "220-260";

export async function summarizeForDemo(title: string, textContent: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are writing a short spoken-word audio briefing script based on a newsletter/blog article.

Article title: ${title}

Article content:
"""
${textContent}
"""

Write a ${TARGET_WORDS} word script that:
- Sounds natural when read aloud (conversational, not a bulleted summary)
- Captures the key points and main takeaway of the article
- Has a brief intro sentence and a brief closing sentence
- Does NOT include stage directions, headers, or markdown - plain spoken text only

Output only the script text, nothing else.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export interface FullBriefOptions {
  title: string;
  textContent: string;
  style: string;
  specialInstructions?: string;
  pronunciations?: { word: string; pronunciation: string }[];
}

// Full (paid) briefings run 2-3 min spoken, uncapped/unwatermarked, styled
// to the customer's chosen tone - the actual product, not the demo teaser.
export async function generateFullBriefScript({ title, textContent, style, specialInstructions, pronunciations }: FullBriefOptions): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const pronunciationNote = pronunciations?.length
    ? `\n\nWhen the script includes these words, phonetically spell them out so they read the way they sound (do not add the phonetic spelling in parentheses - just write the word the way it should be pronounced):\n${pronunciations.map((p) => `- ${p.word} -> ${p.pronunciation}`).join("\n")}`
    : "";

  const prompt = `You are writing a spoken-word audio briefing script based on a newsletter/blog article, in a "${style}" tone/style.

Article title: ${title}

Article content:
"""
${textContent}
"""
${specialInstructions ? `\nAdditional instructions from the publisher: ${specialInstructions}` : ""}

Write a 400-500 word script that:
- Sounds natural when read aloud in a ${style.toLowerCase()} tone
- Captures the key points, main takeaway, and any notable details of the article
- Has a brief intro sentence and a brief closing sentence
- Does NOT include stage directions, headers, or markdown - plain spoken text only${pronunciationNote}

Output only the script text, nothing else.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function generateScriptVariants(options: FullBriefOptions): Promise<{ style: string; script: string }[]> {
  const variantStyles = ["Clear & Professional", "Conversational", "Analytical"];
  const scripts = await Promise.all(
    variantStyles.map((style) => generateFullBriefScript({ ...options, style }))
  );
  return variantStyles.map((style, i) => ({ style, script: scripts[i] }));
}
