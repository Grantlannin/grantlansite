"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IDENTITY_MINICOURSE } from "@/lib/courses/identity-minicourse";

export function IdentityOptInClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const response = await fetch("/api/subscribe", {
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

    localStorage.setItem(IDENTITY_MINICOURSE.storageKey, "1");
    router.push("/identityminicourse");
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
        .course-page {
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
          padding: 48px 24px 80px;
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
        }
        .course-inner {
          max-width: 760px;
          margin: 0 auto;
        }
        .course-back {
          display: inline-block;
          margin-bottom: 28px;
          color: rgba(180, 195, 210, 0.75);
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 0.03em;
        }
        .course-back:hover {
          color: #f5f5f4;
        }
        .course-title {
          font-size: clamp(28px, 5vw, 38px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          text-align: center;
          line-height: 1.15;
          color: #f5f5f4;
        }
        .course-desc {
          font-size: 15px;
          text-align: center;
          color: rgba(214, 211, 209, 0.55);
          margin: 0 0 40px;
          line-height: 1.65;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }
        .course-gate {
          max-width: 440px;
          margin: 0 auto;
          padding: 32px 28px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(180deg, #0a0a0a 0%, #060606 100%);
          position: relative;
          overflow: hidden;
        }
        .course-gate::before {
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
        .course-gate h2 {
          font-weight: 500;
          font-size: 22px;
          margin: 0 0 8px;
          text-align: center;
        }
        .course-gate p {
          margin: 0 0 20px;
          text-align: center;
          font-size: 14px;
          color: rgba(214, 211, 209, 0.55);
          line-height: 1.55;
        }
        .course-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .course-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(10, 10, 10, 0.9);
          color: #f5f5f4;
          font-size: 15px;
          font-family: inherit;
          box-sizing: border-box;
        }
        .course-input:focus {
          outline: none;
          border-color: rgba(79, 179, 242, 0.5);
          box-shadow: 0 0 0 3px rgba(79, 179, 242, 0.15);
        }
        .course-submit {
          padding: 14px 20px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #050505;
          background: linear-gradient(100deg, #4fb3f2, #c84b7d, #2a3fbb);
        }
        .course-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .course-error {
          margin: 0;
          font-size: 13px;
          color: #f87171;
          text-align: center;
        }
      `}</style>

      <main className="course-page">
        <div className="course-inner">
          <Link href="/freecourses" className="course-back">
            ← Back to free courses
          </Link>

          <h1 className="course-title">{IDENTITY_MINICOURSE.title}</h1>
          <p className="course-desc">{IDENTITY_MINICOURSE.description}</p>

          <section className="course-gate">
            <h2>Enter your email to start</h2>
            <p>
              Get instant access to all five lessons. We&apos;ll send updates
              when new material drops.
            </p>
            <form className="course-form" onSubmit={handleSubmit}>
              <input
                className="course-input"
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
                className="course-submit"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Unlocking…" : "Unlock course"}
              </button>
              {error ? <p className="course-error">{error}</p> : null}
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
