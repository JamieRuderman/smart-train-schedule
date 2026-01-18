import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style as StatusBarStyle } from "@capacitor/status-bar";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";

type Theme = "dark" | "light" | "system";

const isNative = () => Capacitor.isNativePlatform();
const isAndroid = () => Capacitor.getPlatform() === "android";

const resolveSystemTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyStatusBarTheme = async (theme: "dark" | "light") => {
  const style = theme === "dark" ? StatusBarStyle.Dark : StatusBarStyle.Light;

  if (isAndroid()) {
    // Android edge-to-edge: transparent status bar
    await Promise.allSettled([
      StatusBar.setStyle({ style }),
      StatusBar.setBackgroundColor({ color: "#00000000" }),
    ]);
  } else {
    // iOS: solid background
    const backgroundColor = theme === "dark" ? "#0f172a" : "#ffffff";
    await Promise.allSettled([
      StatusBar.setStyle({ style }),
      StatusBar.setBackgroundColor({ color: backgroundColor }),
    ]);
  }
};

export function useNativeUi(theme: Theme) {
  useEffect(() => {
    if (!isNative()) return;

    // Add platform class to body for platform-specific CSS
    if (isAndroid()) {
      document.body.classList.add("platform-android");
      // Android: enable edge-to-edge fullscreen mode
      StatusBar.setOverlaysWebView({ overlay: true }).catch(() => undefined);
    }

    Keyboard.setResizeMode({ mode: KeyboardResize.Body }).catch(
      () => undefined
    );

    const listenerPromises = Promise.all([
      Keyboard.addListener("keyboardWillShow", () => {
        document.body.classList.add("keyboard-visible");
      }),
      Keyboard.addListener("keyboardWillHide", () => {
        document.body.classList.remove("keyboard-visible");
      }),
      Keyboard.addListener("keyboardDidHide", () => {
        document.body.classList.remove("keyboard-visible");
      }),
    ]);

    return () => {
      listenerPromises.then(([showListener, hideListener, didHideListener]) => {
        showListener.remove();
        hideListener.remove();
        didHideListener.remove();
      });
    };
  }, []);

  useEffect(() => {
    if (!isNative()) return;

    const activeTheme = theme === "system" ? resolveSystemTheme() : theme;

    applyStatusBarTheme(activeTheme);

    if (theme !== "system") {
      return;
    }

    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      applyStatusBarTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);
}
