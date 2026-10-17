import { useEffect } from "react";
import "@n8n/chat/style.css";

const webhookUrl = import.meta.env.VITE_N8N_CHAT_URL as string | undefined;
const targetId = "n8n-chat";

// createChat mounts its own Vue app. Keep one instance for the page's lifetime so
// React Strict Mode's double effect (and HMR re-runs) never create a second widget.
let chatLoad: Promise<unknown> | null = null;

export function ChatWidget() {
  useEffect(() => {
    if (!webhookUrl) {
      if (import.meta.env.DEV) console.warn("VITE_N8N_CHAT_URL is not set; the chat widget is disabled.");
      return;
    }
    if (chatLoad || document.getElementById(targetId)) return;

    // Mount outside React's tree so React never reconciles the Vue-owned DOM.
    const target = document.createElement("div");
    target.id = targetId;
    document.body.appendChild(target);

    // Loaded on demand: the widget bundle is large and isn't needed for first paint.
    chatLoad = import("@n8n/chat")
      .then(({ createChat }) =>
        createChat({
          webhookUrl,
          target,
          mode: "window",
          showWelcomeScreen: false,
          // The widget awaits this request before starting a session, and the message input
          // only renders once a session exists, so any failure here (e.g. a CORS-blocked
          // origin) left the window without an input box. The workflow keeps no history to
          // restore, so skip the request and start a fresh session immediately.
          loadPreviousSession: false,
          defaultLanguage: "en",
          initialMessages: [
            "Hi! 👋 I'm Abdullah's assistant.",
            "Ask me about his skills, projects, or how to work with him.",
          ],
          i18n: {
            en: {
              title: "Ask about Abdullah",
              subtitle: "Usually replies in a few seconds",
              footer: "",
              getStarted: "New Conversation",
              inputPlaceholder: "Type your question...",
              closeButtonTooltip: "Close chat",
            },
          },
        }),
      )
      .then(() => {
        // The widget renders its layout as <main> with an <h1> title. Expose them as a named
        // region and a level-2 heading so the page keeps a single main landmark and h1.
        const layout = target.querySelector(".chat-layout");
        layout?.setAttribute("role", "region");
        layout?.setAttribute("aria-label", "Chat with Abdullah's assistant");
        target.querySelector(".chat-header h1")?.setAttribute("aria-level", "2");
        target.querySelector(".chat-header h1")?.setAttribute("role", "heading");
      })
      .catch((error) => {
        console.error("Failed to load the chat widget.", error);
        target.remove();
        chatLoad = null;
      });
  }, []);

  return null;
}
