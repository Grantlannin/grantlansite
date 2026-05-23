"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <>
      <style jsx>{`
        .gl-newsletter {
          width: 100%;
          max-width: 620px;
          margin-bottom: 40px;
          padding: 28px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(180deg, #0a0a0a 0%, #060606 100%);
          position: relative;
          overflow: hidden;
        }
        .gl-newsletter::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            #4fb3f2 0%,
            #e94e3c 33%,
            #c84b7d 66%,
            #2a3fbb 100%
          );
        }
        .gl-newsletter-title {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 10px;
          text-align: center;
          color: #f5f5f4;
          letter-spacing: -0.01em;
        }
        .gl-newsletter-desc {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(214, 211, 209, 0.55);
          margin: 0 0 20px;
          text-align: center;
        }
        .gl-newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 540px) {
          .gl-newsletter-form {
            flex-direction: row;
          }
        }
        .gl-newsletter-input {
          flex: 1;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(10, 10, 10, 0.9);
          color: #f5f5f4;
          font-size: 15px;
          font-family: inherit;
        }
        .gl-newsletter-input:focus {
          outline: none;
          border-color: rgba(79, 179, 242, 0.5);
          box-shadow: 0 0 0 3px rgba(79, 179, 242, 0.15);
        }
        .gl-newsletter-submit {
          padding: 14px 22px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.03em;
          white-space: nowrap;
          color: #050505;
          background: linear-gradient(100deg, #4fb3f2, #c84b7d, #2a3fbb);
        }
        .gl-newsletter-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .gl-newsletter-msg {
          margin: 12px 0 0;
          font-size: 13px;
          text-align: center;
        }
        .gl-newsletter-error {
          color: #f87171;
        }
        .gl-newsletter-success {
          color: rgba(180, 195, 210, 0.75);
        }
        .gl-newsletter-testimonial {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          line-height: 1.55;
          color: rgba(214, 211, 209, 0.38);
          margin: 16px 0 0;
          text-align: center;
        }
      `}</style>

      <section className="gl-newsletter">
        <h2 className="gl-newsletter-title">
          Get the world&apos;s best weekly emails sent directly to your inbox
        </h2>
        <p className="gl-newsletter-desc">
          A personal email that will help you become stronger, raise your
          emotional intelligence / self-awareness, design your dream life
          better, or make more money online.
        </p>
        {status === "success" ? (
          <p className="gl-newsletter-msg gl-newsletter-success">
            You&apos;re in — check your inbox soon.
          </p>
        ) : (
          <form className="gl-newsletter-form" onSubmit={handleSubmit}>
            <input
              className="gl-newsletter-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              disabled={status === "loading"}
            />
            <button
              className="gl-newsletter-submit"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        {error ? (
          <p className="gl-newsletter-msg gl-newsletter-error">{error}</p>
        ) : null}
        <p className="gl-newsletter-testimonial">
          &ldquo;Wow. These emails are so good that i no longer read bedtime
          stories to my illegitimate son - Herald - at night. I only read these
          emails to him, and nothing else. He is now only 3 years old and is
          close to being able to levitate small animals (under 3lbs), with his
          mind. And that was only after 6 emails! Thanks Grant!&rdquo; &mdash;
          Real Mark (definitely a real person)
        </p>
      </section>
    </>
  );
}
