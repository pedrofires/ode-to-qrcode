// src/App.tsx
import { useState } from "react";
import GeneratedQrCodes from "./components/generated-qrcodes";
import HeaderApp from "./components/header-app";
import ActionButtons from "./components/action-buttons";

export interface QrImageType {
  link: string;
  dataUrl: string;
}

function App() {
  const [input, setInput] = useState("");
  const [qrImages, setQrImages] = useState<QrImageType[]>([]);

  return (
    <div className="flex flex-col items-center justify-between max-w-2xl mx-auto h-[100vh] bg-zinc-200 gap-4">
      <HeaderApp setInput={setInput} input={input} />
      <GeneratedQrCodes qrImages={qrImages} />
      <ActionButtons qrImages={qrImages} setQrImages={setQrImages} input={input} />
    </div>
  );
}

export default App;
