import DownloadSound from "../../public/download.wav";

function playSound() {
   const audio = new Audio(DownloadSound);
   audio.play().catch((err) => {
      console.error("Erro ao tocar o som:", err);
   });
};

export default playSound;