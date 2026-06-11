"use client";

import Link from "next/link";
import { useState } from "react";

export default function WorkWaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const response = await fetch("/api/work-waitlist", {
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
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background: #050505;
          color: #f5f5f4;
        }
      `}</style>
      <style jsx>{`
        .wl-page {
          min-height: 100vh;
          background:
            radial-gradient(
              ellipse at 20% 20%,
              rgba(42, 63, 187, 0.06) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 80% 80%,
              rgba(200, 75, 125, 0.04) 0%,
              transparent 50%
            ),
            #050505;
          padding: 56px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .wl-inner {
          width: 100%;
          max-width: 640px;
        }
        .wl-back {
          display: inline-block;
          margin-bottom: 32px;
          font-size: 13px;
          color: rgba(180, 195, 210, 0.65);
          text-decoration: none;
          letter-spacing: 0.02em;
        }
        .wl-back:hover {
          color: #f5f5f4;
        }
        .wl-stripes {
          display: flex;
          gap: 4px;
          margin-bottom: 28px;
          justify-content: center;
        }
        .wl-stripes span {
          width: 28px;
          height: 4px;
          border-radius: 2px;
          opacity: 0.85;
        }
        .wl-stripes span:nth-child(1) {
          background: #4fb3f2;
          box-shadow: 0 0 8px rgba(79, 179, 242, 0.5);
        }
        .wl-stripes span:nth-child(2) {
          background: #e94e3c;
          box-shadow: 0 0 8px rgba(233, 78, 60, 0.5);
        }
        .wl-stripes span:nth-child(3) {
          background: #c84b7d;
          box-shadow: 0 0 8px rgba(200, 75, 125, 0.5);
        }
        .wl-stripes span:nth-child(4) {
          background: #2a3fbb;
          box-shadow: 0 0 8px rgba(42, 63, 187, 0.5);
        }
        .wl-title {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: clamp(22px, 4.5vw, 28px);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: #f5f5f4;
          margin: 0 0 24px;
          text-align: center;
        }
        .wl-body {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(214, 211, 209, 0.62);
          margin: 0 0 32px;
          text-align: center;
        }
        .wl-note {
          font-size: 14px;
          color: rgba(214, 211, 209, 0.48);
          font-style: italic;
        }
        .wl-card {
          padding: 28px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(180deg, #0a0a0a 0%, #060606 100%);
          position: relative;
          overflow: hidden;
        }
        .wl-card::before {
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
        .wl-card-label {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(245, 245, 244, 0.9);
          margin: 0 0 16px;
          text-align: center;
        }
        .wl-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 540px) {
          .wl-form {
            flex-direction: row;
          }
        }
        .wl-input {
          flex: 1;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(10, 10, 10, 0.9);
          color: #f5f5f4;
          font-size: 15px;
          font-family: inherit;
        }
        .wl-input:focus {
          outline: none;
          border-color: rgba(79, 179, 242, 0.5);
          box-shadow: 0 0 0 3px rgba(79, 179, 242, 0.15);
        }
        .wl-submit {
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
        .wl-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .wl-msg {
          margin: 14px 0 0;
          font-size: 13px;
          text-align: center;
        }
        .wl-error {
          color: #f87171;
        }
        .wl-success {
          color: rgba(180, 195, 210, 0.75);
        }
      `}</style>

      <main className="wl-page">
        <div className="wl-inner">
          <Link href="/" className="wl-back">
            ← Back to GrantLannin.com
          </Link>

          <div className="wl-stripes" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>

          <h1 className="wl-title">
            I am dropping my extremely simple system for being productive (with
            a hyper-active brain/mind). This system allows me to know if
            i&apos;ll actually do the work i need to before I even start doing
            it by asking myself 3 questions and getting 3 &ldquo;yesses&rdquo;.
            If i answer yes to all 3, i know i&apos;ll actually get what I need
            to get done. if i don&apos;t answer one of them yes, i&apos;ll
            probably be distracted &amp; not do what I need to do.
          </h1>

          <p className="wl-body">
            If interested, enter your email below &amp; ill hit you up when I
            release it.{" "}
            <span className="wl-note">
              Note: I hate &ldquo;productivity&rdquo; stuff &amp; think
              it&apos;s all lies/cap, so this is basically a very barebones
              system, but it works for me.
            </span>
          </p>

          <section className="wl-card">
            {status === "success" ? (
              <p className="wl-msg wl-success">
                You&apos;re on the list — I&apos;ll hit you up when it drops.
              </p>
            ) : (
              <>
                <p className="wl-card-label">Join the waitlist</p>
                <form className="wl-form" onSubmit={handleSubmit}>
                  <input
                    className="wl-input"
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
                    className="wl-submit"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Joining…" : "Join waitlist"}
                  </button>
                </form>
                {error ? (
                  <p className="wl-msg wl-error">{error}</p>
                ) : null}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
