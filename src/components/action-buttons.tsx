import QRCode from "qrcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";
import { QrImageType } from "../App";
import playSound from "../utils/playSound";

interface ActionButtonsProps {
  qrImages: QrImageType[];
  input: string;
  setQrImages: (qrImages: QrImageType[]) => void;
}

const ActionButtons = ({ qrImages, setQrImages, input }: ActionButtonsProps) => {
  const [generateLoading, setGenerateLoading] = useState(false);
  const [downloadZipLoading, setDownloadZipLoading] = useState(false);

  const generateQRCodes = async () => {
    setGenerateLoading(true);
    const links = input
      .split(",")
      .map((link: any) => link.trim())
      .filter((link: any) => link.length > 0);

    const qrList: { link: string; dataUrl: string }[] = [];

    for (const link of links) {
      const dataUrl = await QRCode.toDataURL(link);
      qrList.push({ link, dataUrl });
    }

    setGenerateLoading(false);
    setQrImages(qrList);
    playSound();
  };

  const downloadZip = async () => {
    setDownloadZipLoading(true);

    const zip = new JSZip();
    const folder = zip.folder("qrcodes");

    if (!folder) return;

    for (let i = 0; i < qrImages.length; i++) {
      const { dataUrl, link } = qrImages[i];
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      folder.file(`qrcode-${i + 1}.png`, blob);
    }
    setDownloadZipLoading(false);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "qrcodes.zip");
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full mb-8">
      {qrImages.length === 1 && (
        <a
          href={qrImages[0].dataUrl}
          download="qrcode.png"
          className="w-[95%] rounded-xl bg-green-600 p-4 text-white cursor-pointer transition-all hover:text-green-600 hover:bg-zinc-200 border border-green-600 disabled:opacity-30 text-center"
        >
          Baixar QR Code
        </a>
      )}

      <button
        onClick={generateQRCodes}
        disabled={generateLoading || !input}
        className="w-[95%] rounded-xl bg-zinc-800 p-4 text-white cursor-pointer transition-all hover:text-zinc-800 hover:bg-zinc-200 border border-zinc-800 disabled:opacity-30"
      >
        Gerar QR Code(s)
      </button>

      {qrImages.length > 1 && (
        <button
          disabled={downloadZipLoading}
          onClick={downloadZip}
          className="w-[95%] rounded-xl bg-green-600 p-4 text-white cursor-pointer transition-all hover:text-green-600 hover:bg-green-200 border border-green-600 disabled:opacity-30"
        >
          Baixar QR Codes (.zip)
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
