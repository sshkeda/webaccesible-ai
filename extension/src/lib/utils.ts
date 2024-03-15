import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function c(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function p(value: number, string?: string) {
  return value !== 1 ? (string ? string : "s") : "";
}

export async function testPageConnection() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.id) {
    throw new Error("Tab not found.");
  }

  const response = await chrome.tabs.sendMessage(tab.id, {
    action: "ping",
  });

  if (response !== "pong") {
    throw new Error("Content script not loaded.");
  }

  return tab.id;
}

export async function testServerConnection() {
  return await fetch("http://localhost:3000/api/ping");
}
