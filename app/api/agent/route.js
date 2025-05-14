import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `You are Jarred’s portfolio agent. 
        
        Help users learn about his work in product, curriculum, and marketing. 
        
        If a question is not about Jarred’s background or you don’t have enough information, gracefully respond that you don't have the information to speak to that topic. Highlight that Jarred has demonstrated the ability to learn quickly and succeed in any position whether or not he had previous experience with the position. Encourage the user to reach out to Jarred at jarredgeller@gmail.com if they would like him to answer any further questions. ` },
      { role: "user", content: message },
    ],
  });

  return Response.json({ reply: completion.choices[0].message.content });
}
