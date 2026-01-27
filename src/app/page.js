"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>
      <textarea
        rows={10}
        cols={60}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={createPaste}>Create Paste</button>

      <pre>{result}</pre>
    </main>
  );
}
