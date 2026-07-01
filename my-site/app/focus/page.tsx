"use client";

import Link from "next/link";
import { useState } from "react";

export default function FocusSystemPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const response = await fetch("/api/focus", {
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
        .fs-page {
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
        .fs-inner {
          width: 100%;
          max-width: 640px;
        }
        .fs-back {
          display: inline-block;
          margin-bottom: 32px;
          font-size: 13px;
          color: rgba(180, 195, 210, 0.65);
          text-decoration: none;
          letter-spacing: 0.02em;
        }
        .fs-back:hover {
          color: #f5f5f4;
        }
        .fs-stripes {
          display: flex;
          gap: 4px;
          margin-bottom: 28px;
          justify-content: center;
        }
        .fs-stripes span {
          width: 28px;
          height: 4px;
          border-radius: 2px;
          opacity: 0.85;
        }
        .fs-stripes span:nth-child(1) {
          background: #4fb3f2;
          box-shadow: 0 0 8px rgba(79, 179, 242, 0.5);
        }
        .fs-stripes span:nth-child(2) {
          background: #e94e3c;
          box-shadow: 0 0 8px rgba(233, 78, 60, 0.5);
        }
        .fs-stripes span:nth-child(3) {
          background: #c84b7d;
          box-shadow: 0 0 8px rgba(200, 75, 125, 0.5);
        }
        .fs-stripes span:nth-child(4) {
          background: #2a3fbb;
          box-shadow: 0 0 8px rgba(42, 63, 187, 0.5);
        }
        .fs-kicker {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-align: center;
          color: #4fb3f2;
          margin: 0 0 16px;
        }
        .fs-title {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: clamp(26px, 5vw, 36px);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #f5f5f4;
          margin: 0 0 16px;
          text-align: center;
        }
        .fs-sub {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(214, 211, 209, 0.55);
          margin: 0 0 32px;
          text-align: center;
        }
        .fs-card {
          padding: 28px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(180deg, #0a0a0a 0%, #060606 100%);
          position: relative;
          overflow: hidden;
        }
        .fs-card::before {
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
        .fs-card-label {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(245, 245, 244, 0.9);
          margin: 0 0 16px;
          text-align: center;
        }
        .fs-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 540px) {
          .fs-form {
            flex-direction: row;
          }
        }
        .fs-input {
          flex: 1;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(10, 10, 10, 0.9);
          color: #f5f5f4;
          font-size: 15px;
          font-family: inherit;
        }
        .fs-input:focus {
          outline: none;
          border-color: rgba(79, 179, 242, 0.5);
          box-shadow: 0 0 0 3px rgba(79, 179, 242, 0.15);
        }
        .fs-submit {
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
        .fs-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .fs-msg {
          margin: 14px 0 0;
          font-size: 13px;
          text-align: center;
        }
        .fs-error {
          color: #f87171;
        }
        .fs-success {
          color: rgba(180, 195, 210, 0.75);
        }
      `}</style>

      <main className="fs-page">
        <div className="fs-inner">
          <Link href="/" className="fs-back">
            ← Back to GrantLannin.com
          </Link>

          <div className="fs-stripes" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>

          <p className="fs-kicker">Free guide</p>
          <h1 className="fs-title">
            how to tame your hyper-active mind &amp; use it to get rich
          </h1>
          <p className="fs-sub">
            Enter your email below and I&apos;ll send you the free PDF.
          </p>

          <section className="fs-card">
            {status === "success" ? (
              <p className="fs-msg fs-success">
                You&apos;re in — check your inbox for the free guide.
              </p>
            ) : (
              <>
                <p className="fs-card-label">Get the free PDF</p>
                <form className="fs-form" onSubmit={handleSubmit}>
                  <input
                    className="fs-input"
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
                    className="fs-submit"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending…" : "Send me the guide"}
                  </button>
                </form>
                {error ? (
                  <p className="fs-msg fs-error">{error}</p>
                ) : null}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
