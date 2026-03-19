"use client";

import React, { useEffect } from "react";
import { Widget } from "@/services/dataTypes";
import RenderPredefinedScript from "./Scripts/RenderPredefinedScript";

interface Props {
  scripts: Widget[];
}

const HeaderScriptsComponent = ({ scripts }: Props) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;
    const injected: HTMLElement[] = [];

    // small helper to "unescape" common escaped JSON-ish strings
    const unescapeSnippet = (s: string) => {
      if (typeof s !== "string") return s;
      return s
        .replace(/\\r/g, "")
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");
    };

    const injectSnippets = async () => {
      for (let i = 0; i < scripts.length && mounted; i++) {
        const item = scripts[i];
        if (item.type !== "CUSTOM" || !Array.isArray(item.data)) continue;

        for (let j = 0; j < item.data.length && mounted; j++) {
          let snippet = item.data[j];
          if (typeof snippet !== "string") continue;

          // try to unescape JSON-escaped strings
          snippet = unescapeSnippet(snippet);

          // parse snippet into DOM nodes
          const container = document.createElement("div");
          try {
            container.innerHTML = snippet;
          } catch (err) {
            // fallback: treat it as plain text
            container.textContent = snippet;
          }

          // process nodes in DOM order (preserves execution order)
          const nodes = Array.from(container.childNodes);
          for (const node of nodes) {
            if (!mounted) break;

            // If it's an element node
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as Element;
              const tag = el.tagName.toLowerCase();

              if (tag === "script") {
                const scriptEl = el as HTMLScriptElement;
                const src = scriptEl.getAttribute("src") || scriptEl.src || null;

                // Create new script node and copy attributes
                const newScript = document.createElement("script");
                // copy attributes
                for (let k = 0; k < scriptEl.attributes.length; k++) {
                  const a = scriptEl.attributes[k];
                  // avoid copying id to prevent duplicates unless you want them
                  if (a.name === "id") {
                    // optionally set a controlled id:
                    newScript.setAttribute("data-origin-id", a.value);
                  } else {
                    newScript.setAttribute(a.name, a.value);
                  }
                }

                if (src) {
                  // avoid injecting same src multiple times
                  if (!document.querySelector(`script[src="${src}"]`)) {
                    // append and wait for load (so subsequent snippets that depend on it run after)
                    const p = new Promise<void>((resolve) => {
                      newScript.onload = () => resolve();
                      newScript.onerror = () => resolve(); // resolve even on error to continue
                      // append to head (or body if you prefer)
                      document.head.appendChild(newScript);
                      injected.push(newScript);
                    });

                    // set src after attaching attributes to preserve crossorigin etc.
                    newScript.src = src;

                    await p;
                  } else {
                    // script already present, continue
                  }
                } else {
                  // inline script text
                  const inlineCode = scriptEl.textContent || "";
                  newScript.text = inlineCode;
                  document.head.appendChild(newScript);
                  injected.push(newScript);
                }
              } else if (tag === "noscript") {
                // preserve noscript by inserting a <noscript> tag into body
                const n = document.createElement("noscript");
                n.innerHTML = el.innerHTML;
                document.body.appendChild(n);
                injected.push(n);
              } else {
                // some other HTML element - append a clone into body
                const clone = el.cloneNode(true) as HTMLElement;
                document.body.appendChild(clone);
                injected.push(clone);
              }
            } else if (node.nodeType === Node.COMMENT_NODE) {
              // ignore comments
            } else if (node.nodeType === Node.TEXT_NODE) {
              // text node - if it has meaningful text, append as a text node wrapper
              const txt = node.textContent?.trim();
              if (txt) {
                const wrap = document.createElement("div");
                wrap.textContent = txt;
                document.body.appendChild(wrap);
                injected.push(wrap);
              }
            }
          } // nodes loop
        } // item.data loop
      } // scripts loop
    };

    injectSnippets().catch((err) => {
      // keep going even if one snippet fails; log for debugging
      // eslint-disable-next-line no-console
      console.error("injectSnippets error:", err);
    });

    return () => {
      mounted = false;
      // cleanup injected nodes
      for (const el of injected) {
        try {
          el.remove();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [scripts]);

  return (
    <>
      {/* keep predefined/string scripts rendered the same way as before */}
      {scripts.map((item, index) =>
        typeof item.data === "string" ? (
          <RenderPredefinedScript key={index} type={item.type} value={item.data} />
        ) : null
      )}
    </>
  );
};

export default React.memo(HeaderScriptsComponent);
