export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ reply: "Server configuration error." });
  }

  try {
    // 2. Send the message to the Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            // Here we give the AI its "system instructions" so it knows who it is!
            text: `You are the personal AI assistant for Ajit Dikshit's portfolio. You are helpful, professional, and concise. You answer questions about his skills in Java, Unity, C#, Data Analytics, and Full-Stack development. Keep answers brief (1-3 sentences maximum). Here is the visitor's message: "${message}"`
          }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'API Error');
    }

    // 3. Extract the text and send it back to the React frontend
    const reply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Sorry, my AI brain is currently offline. Please use the contact form to reach out directly!" });
  }
}