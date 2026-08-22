"use client";
import { useEffect } from 'react';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "";

export default function TelegramVisitorLogger() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionKey = "tg_visitor_logged_" + window.location.pathname;
    if (sessionStorage.getItem(sessionKey)) return;

    const logVisitor = async () => {
      try {
        sessionStorage.setItem(sessionKey, "true");

        // Non-blocking fetch with strict 1.2s timeout
        let ipData: Record<string, any> = {};
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);

        try {
          const res = await fetch("https://ipapi.co/json/", { 
            signal: controller.signal, 
            cache: "no-store" 
          });
          clearTimeout(timeoutId);
          if (res.ok) {
            ipData = await res.json();
          }
        } catch {
          clearTimeout(timeoutId);
        }

        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? "📱 Mobile Device" : "💻 Desktop Computer";
        const referrer = document.referrer || "Direct / Bookmark";
        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        const message = `🚨 <b>NEW VISITOR ON WEBSITE</b> 🚨\n\n` +
          `🌐 <b>Domain:</b> ${window.location.hostname}\n` +
          `📄 <b>Page Path:</b> <code>${window.location.pathname}</code>\n` +
          `💻 <b>Device:</b> ${deviceType}\n` +
          `📍 <b>IP:</b> <code>${ipData.ip || 'Hidden / Protected'}</code>\n` +
          `🏙️ <b>City:</b> ${ipData.city || 'N/A'}, ${ipData.country_name || 'N/A'}\n` +
          `📡 <b>Network:</b> ${ipData.org || 'N/A'}\n` +
          `🔗 <b>Source:</b> ${referrer}\n` +
          `⏰ <b>Timestamp:</b> ${timestamp} IST\n` +
          `⚙️ <b>User Agent:</b> <code>${userAgent.slice(0, 90)}...</code>`;

        const token = TELEGRAM_BOT_TOKEN;
        const chatId = TELEGRAM_CHAT_ID;

        if (token && chatId) {
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: "HTML",
            }),
          }).catch(() => {});
        }
      } catch (err) {
        console.debug("Telegram visitor logger notice:", err);
      }
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(logVisitor, { timeout: 3000 });
    } else {
      setTimeout(logVisitor, 2500);
    }
  }, []);

  return null;
}
