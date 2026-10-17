import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import "@n8n/chat/style.css";

const webhookUrl = import.meta.env.VITE_N8N_CHAT_URL as string | undefined;
const targetId = "n8n-chat";
const labelText = "Ask my AI assistant";

type ChatElements = { toggle: HTMLElement; panel: HTMLElement };

// createChat mounts its own Vue app. Keep one instance for the page's lifetime so
// React Strict Mode's double effect (and HMR re-runs) never create a second widget.
let chatLoad: Promise<ChatElements | null> | null = null;

// Wire up the widget's DOM after it mounts: fix its landmarks and make the toggle keyboard-operable.
function enhance(target: HTMLElement): ChatElements | null {
  // The widget renders its layout as <main> with an <h1> title. Expose them as a named
  // region and a level-2 heading so the page keeps a single main landmark and h1.
  const layout = target.querySelector(".chat-layout");
  layout?.setAttribute("role", "region");
  layout?.setAttribute("aria-label", "Chat with Abdullah's assistant");
  const heading = target.querySelector(".chat-header h1");
  heading?.setAttribute("role", "heading");
  heading?.setAttribute("aria-level", "2");

  const toggle = target.querySelector<HTMLElement>(".chat-window-toggle");
  const panel = target.querySelector<HTMLElement>(".chat-window");
  if (!toggle || !panel) return null;
  if (toggle.dataset.enhanced) return { toggle, panel };
  toggle.dataset.enhanced = "true";

  // The toggle is a plain <div> with a click handler; give it button semantics and keys.
  panel.id = "n8n-chat-window";
  toggle.setAttribute("role", "button");
  toggle.setAttribute("tabindex", "0");
  toggle.setAttribute("aria-controls", panel.id);
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle.click();
    }
  });
  // Escape closes the open window from anywhere in the widget (including the toggle itself)
  // and returns focus to the toggle.
  target.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.style.display !== "none") {
      toggle.click();
      toggle.focus();
    }
  });
  return { toggle, panel };
}

function loadChat(): Promise<ChatElements | null> {
  // After an HMR re-run the widget is already on the page; reuse it.
  const existing = document.getElementById(targetId);
  if (existing) return Promise.resolve(enhance(existing));

  // Mount outside React's tree so React never reconciles the Vue-owned DOM.
  const target = document.createElement("div");
  target.id = targetId;
  document.body.appendChild(target);

  // Loaded on demand: the widget bundle is large and isn't needed for first paint.
  return import("@n8n/chat")
    .then(({ createChat }) => {
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
      });
      return enhance(target);
    })
    .catch((error) => {
      console.error("Failed to load the chat widget.", error);
      target.remove();
      chatLoad = null;
      return null;
    });
}

// On phones the pill spans most of the bottom-right corner, so keep it hidden while any element
// marked data-chat-label-avoid (the hero's buttons) is on screen. The bubble itself stays visible.
function useAvoidContentOnPhones() {
  const [avoiding, setAvoiding] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-chat-label-avoid]");
    if (!targets.length) return;
    const phone = window.matchMedia("(max-width: 640px)");
    const visible = new Set<Element>();
    const update = () => setAvoiding(phone.matches && visible.size > 0);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      update();
    });
    targets.forEach((target) => observer.observe(target));
    phone.addEventListener("change", update);
    return () => {
      observer.disconnect();
      phone.removeEventListener("change", update);
    };
  }, []);

  return avoiding;
}

export function ChatWidget() {
  const [chat, setChat] = useState<ChatElements | null>(null);
  const [open, setOpen] = useState(false);
  // The first appearance waits ~2s after page load; later ones (after closing) fade straight in.
  const [introDone, setIntroDone] = useState(false);
  const [introDelay] = useState(() => Math.max(300, 2200 - performance.now()));
  const focusInputOnOpen = useRef(false);
  const avoidingContent = useAvoidContentOnPhones();

  useEffect(() => {
    if (!webhookUrl) {
      if (import.meta.env.DEV) console.warn("VITE_N8N_CHAT_URL is not set; the chat widget is disabled.");
      return;
    }
    let active = true;
    chatLoad ??= loadChat();
    chatLoad.then((elements) => {
      if (active && elements) setChat(elements);
    });
    return () => {
      active = false;
    };
  }, []);

  // The widget shows and hides its window with an inline display style; mirror that state.
  useEffect(() => {
    if (!chat) return;
    const sync = () => {
      const isOpen = chat.panel.style.display !== "none";
      setOpen(isOpen);
      chat.toggle.setAttribute("aria-expanded", String(isOpen));
      chat.toggle.setAttribute("aria-label", isOpen ? "Close chat" : `Open chat: ${labelText}`);
      if (isOpen) {
        setIntroDone(true);
        if (focusInputOnOpen.current) {
          focusInputOnOpen.current = false;
          // The label unmounts on open, so move focus into the chat instead of losing it.
          chat.panel.querySelector<HTMLTextAreaElement>("textarea")?.focus();
        }
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(chat.panel, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, [chat]);

  if (!chat || open || avoidingContent) return null;

  return (
    <button
      type="button"
      className={`chat-launcher-label${introDone ? " is-returning" : ""}`}
      style={{ "--chat-label-delay": `${introDelay}ms` } as CSSProperties}
      aria-label={`${labelText} (opens chat)`}
      onClick={() => {
        focusInputOnOpen.current = true;
        chat.toggle.click();
      }}
    >
      <Sparkles className="chat-launcher-label__icon" aria-hidden="true" />
      <span className="chat-launcher-label__full">{labelText}</span>
      <span className="chat-launcher-label__short" aria-hidden="true">Ask my AI</span>
    </button>
  );
}
