declare global {
  interface Window {
    Telegram: {
      WebApp: {
        colorScheme: string;
        onEvent: (event: string, callback: () => void) => void;
        setEmojiStatus: (customEmojiId: string, options?: { duration?: number }, callback?: (result: boolean) => void) => void;
        requestEmojiStatusAccess: (callback: (allowed: boolean) => void) => void;
        showAlert: (message: string) => void;
      };
    };
  }
}

export {};
