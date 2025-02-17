import { useEffect } from "react";

const MintETNOGPass = () => {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const setThemeClass = () => {
        document.documentElement.className = window.Telegram.WebApp.colorScheme;
      };
      window.Telegram.WebApp.onEvent("themeChanged", setThemeClass);
      setThemeClass();
    }
  }, []);

  const setEmojiStatus = (customEmojiId: string, duration?: number) => {
    if (!window.Telegram?.WebApp) return;
    
    window.Telegram.WebApp.setEmojiStatus(
      customEmojiId,
      duration ? { duration } : {},
      (result: boolean) => {
        const statusPopup = document.getElementById("status");
        if (!statusPopup) return;
        
        statusPopup.innerHTML = "";
        const span = document.createElement("span");
        span.textContent = result ? "(status set!)" : "(status NOT set)";
        span.className = result ? "ok" : "err";
        
        statusPopup.appendChild(span);
        statusPopup.style.display = "block";
        setTimeout(() => {
          statusPopup.style.display = "none";
        }, 3000);
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#06110C]">
      <div className="flex items-center p-4 rounded-lg w-[350px] text-white font-sans">
        <div className="w-11 h-11 bg-[#313235] text-white text-lg font-bold rounded-full flex justify-center items-center">
          <a href="https://imgbb.com/">
            <img src="etnicon.png" alt="done" className="w-5 h-auto" />
          </a>
        </div>
        <div className="flex-grow ml-3">
          <h3 className="m-0 text-lg font-normal">Set Emoji status</h3>
          <p className="m-1 text-sm text-gray-400">+500 Coins</p>
        </div>
        <button
          className="bg-white/20 border-none text-white py-2 px-4 rounded-full text-sm cursor-pointer hover:bg-white/30"
          onClick={() => setEmojiStatus("5845951029639648949")}
        >
          Start
        </button>
        <p id="status" className="fixed top-[-50px] left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-4 rounded-lg text-sm font-bold text-center shadow-lg z-50 animate-slideDown animate-slideUp"></p>
      </div>
    </div>
  );
};

export default MintETNOGPass;
