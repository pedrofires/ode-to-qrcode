import { QrImageType } from "../App";

interface GeneratedQrCodesProps {
  qrImages: QrImageType[];
}

const GeneratedQrCodes = ({ qrImages }: GeneratedQrCodesProps) => {
  return (
    <div className="flex flex-wrap max-h-[25vh] overflow-auto mx-4 justify-center gap-2 mt-0 mb-8 animate-[bounce_1s_ease-in-out_1]">
      {qrImages.map((item: QrImageType, index: any) => (
        <div key={index} style={{ textAlign: "center" }}>
          <img src={item.dataUrl} alt={`QR Code ${index}`} width={120} className="rounded-xl" />
          <p style={{ fontSize: 12 }}>{item.link}</p>
        </div>
      ))}
    </div>
  );
};

export default GeneratedQrCodes;
