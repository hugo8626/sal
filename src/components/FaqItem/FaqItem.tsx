import { useState } from "react";
import "./FaqItem.css";

type Props = {
  q: string;
  a: string;
  defaultOpen?: boolean;
};

export default function FaqItem({ q, a, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`faqItem ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="faqItem__head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="faqItem__q">{q}</span>
        <span className="faqItem__icon" aria-hidden="true">
          ˄
        </span>
      </button>

      {open && (
        <div className="faqItem__body">
          <p className="faqItem__a">{a}</p>
        </div>
      )}

      <div className="faqItem__line" />
    </div>
  );
}