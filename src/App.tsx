import { useEffect } from "react";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        colorScheme: string;
        onEvent: (event: string, callback: () => void) => void;
        setEmojiStatus: (
          customEmojiId: string,
          options?: { duration?: number },
          callback?: (result: boolean) => void
        ) => void;
        requestEmojiStatusAccess: (callback: (allowed: boolean) => void) => void;
        showAlert: (message: string) => void;
      };
    };
  }
}

const DemoApp = {
  emojiStatusInit: function () {
    window.Telegram?.WebApp.onEvent("emojiStatusFailed", function (params: any) {
      DemoApp.showAlert("emojiStatusFailed: " + params.error);
    });
  },
  setEmojiStatus: function (el: HTMLAnchorElement, customEmojiId: string, duration?: number) {
    window.Telegram?.WebApp.setEmojiStatus(customEmojiId, duration ? { duration } : {}, function (result) {
      const statusPopup = document.getElementById("status");
      if (statusPopup) {
        statusPopup.innerHTML = "";
        const span = document.createElement("span");
        span.textContent = result ? "(status set!)" : "(status NOT set)";
        span.className = result ? "ok" : "err";
        statusPopup.appendChild(span);
        statusPopup.style.display = "block"; // Show popup
        setTimeout(() => {
          statusPopup.style.display = "none"; // Hide after 3 seconds
        }, 3000);
      }
    });
  },
  requestEmojiStatusAccess: function (el: HTMLAnchorElement) {
    window.Telegram?.WebApp.requestEmojiStatusAccess(function (allowed) {
      const span = el.nextElementSibling as HTMLSpanElement;
      if (span) {
        span.textContent = allowed ? "(Access granted)" : "(User declined this request)";
        span.className = allowed ? "ok" : "err";
      }
    });
  },
  showAlert: function (message: string) {
    window.Telegram?.WebApp.showAlert(message);
  },
};

const App = () => {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const setThemeClass = () => {
        document.documentElement.className = window.Telegram!.WebApp.colorScheme;
      };
      window.Telegram!.WebApp.onEvent("themeChanged", setThemeClass);
      setThemeClass();
    }
    DemoApp.emojiStatusInit();
  }, []);

  return (
    <div className="container">
      <div className="h1">
        <a href="https://imgbb.com/">
          <img src="etnicon.png" alt="done" border={0} />
        </a>
      </div>
      <div className="info">
        <h3>Set Emoji status</h3>
        <p>+500 Coins</p>
      </div>
      <a
        href="#"
        className="start-btn"
        onClick={(e) => {
          e.preventDefault();
          DemoApp.setEmojiStatus(e.currentTarget as HTMLAnchorElement, "5845951029639648949");
        }}
      >
        Start
      </a>
      <p id="status"></p> {/* Popup element */}
    </div>
  );
};

export default App;
