"use client";

import Link from "next/link";
import { FREE_COURSES } from "@/lib/courses/free-courses";

export default function FreeCoursesPage() {
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
        .fc-page {
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
        .fc-inner {
          width: 100%;
          max-width: 620px;
        }
        .fc-back {
          display: inline-block;
          margin-bottom: 32px;
          font-size: 13px;
          color: rgba(180, 195, 210, 0.65);
          text-decoration: none;
          letter-spacing: 0.02em;
        }
        .fc-back:hover {
          color: #f5f5f4;
        }
        .fc-title {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 42px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-align: center;
          margin: 0 0 12px;
          background: linear-gradient(
            100deg,
            #1a1a1a 0%,
            #1a1a1a 42%,
            #4fb3f2 45%,
            #e94e3c 48%,
            #c84b7d 51%,
            #2a3fbb 54%,
            #1a1a1a 57%,
            #1a1a1a 100%
          );
          background-size: 360% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fc-charge 6s linear infinite;
        }
        @keyframes fc-charge {
          0% {
            background-position: 200% 50%;
          }
          100% {
            background-position: -50% 50%;
          }
        }
        .fc-desc {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(214, 211, 209, 0.55);
          text-align: center;
          margin: 0 0 36px;
        }
        .fc-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .fc-course {
          display: block;
          padding: 22px 20px;
          background: linear-gradient(180deg, #0a0a0a 0%, #050505 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          text-decoration: none;
          transition:
            border-color 0.2s,
            background 0.2s;
          position: relative;
          overflow: hidden;
        }
        .fc-course::before {
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
        .fc-course:hover {
          border-color: rgba(255, 255, 255, 0.18);
          background: linear-gradient(180deg, #111 0%, #080808 100%);
        }
        .fc-course-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .fc-course-title {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #f5f5f4;
          margin: 0;
        }
        .fc-badge {
          flex-shrink: 0;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(42, 63, 187, 0.25);
          color: #b5c8ff;
          border: 1px solid rgba(79, 179, 242, 0.4);
        }
        .fc-course-desc {
          font-family: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          font-size: 13px;
          line-height: 1.55;
          color: rgba(214, 211, 209, 0.55);
          margin: 0;
        }
        @media (max-width: 600px) {
          .fc-title {
            font-size: 28px;
          }
        }
      `}</style>

      <main className="fc-page">
        <div className="fc-inner">
          <Link href="/" className="fc-back">
            ← Back to GrantLannin.com
          </Link>
          <h1 className="fc-title">FREE COURSES</h1>
          <p className="fc-desc">
            Two free courses to help you become who you want to be.
          </p>
          <div className="fc-list">
            {FREE_COURSES.map((course) => (
              <a
                key={course.slug}
                href={course.href}
                className="fc-course"
                {...(course.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <div className="fc-course-head">
                  <h2 className="fc-course-title">{course.title}</h2>
                  <span className="fc-badge">Free</span>
                </div>
                <p className="fc-course-desc">{course.description}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
