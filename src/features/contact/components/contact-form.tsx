"use client";
import { useState, type FormEvent } from "react";
import { submitContactForm } from "../actions/submit-contact-form";
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    await submitContactForm({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      message: fd.get("message") as string,
    });
    setStatus("done");
  }
  if (status === "done") return <p>Thanks! Message sent.</p>;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        className="rounded border px-3 py-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="rounded border px-3 py-2"
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        rows={5}
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-brand-500 hover:bg-brand-600 rounded px-6 py-2 text-white disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
