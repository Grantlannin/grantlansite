"use client";

import Image from "next/image";
import { useState } from "react";

// ============================================================================
// TYPES
// ============================================================================
type Category = "self" | "biz" | null;
type CourseType = "free" | "paid" | null;
type Course = {
  title: string;
  price: string;
  type: "free" | "paid";
  slug: string;
  href?: string;
};
type Drop = readonly [x1: number, y2: number, opacity: number, dur: number, delay: number];

// ============================================================================
// COURSE DATA — edit titles, prices, and `href` to point at your real URLs.
// `href` overrides the default `/<slug>` link if set.
// ============================================================================
const COURSES: Record<"self" | "biz", { free: Course[]; paid: Course[] }> = {
  self: {
    free: [
      {
        title: "Identity Mini Course",
        price: "Free",
        type: "free",
        slug: "identityminicourse",
        href: "/identityminicourse",
      },
      { title: "Free Intro", price: "Free", type: "free", slug: "free-intro" },
    ],
    paid: [
      {
        title: "Psychology of Disrespect",
        price: "$9",
        type: "paid",
        slug: "disrespect",
      },
      {
        title: "Psychology of the Super-Charismatic",
        price: "$9",
        type: "paid",
        slug: "charisma",
      },
      { title: "ADHD Productivity", price: "$19", type: "paid", slug: "adhd" },
    ],
  },
  biz: {
    free: [
      {
        title: "Free Business Starter",
        price: "Free",
        type: "free",
        slug: "free-business",
      },
    ],
    paid: [
      {
        title: "High-Ticket Offer Masterclass",
        price: "$27",
        type: "paid",
        slug: "hto",
      },
      {
        title: "Genius Offer System",
        price: "TBD",
        type: "paid",
        slug: "gos",
      },
    ],
  },
};

// ============================================================================
// RAIN DATA — three depth layers
// Each row: [x1, y2, opacity, duration_seconds, delay_seconds]
// ============================================================================
const NEAR: Drop[] = [
  [22, 22, 0.26, 0.4, -0.1],
  [58, 26, 0.22, 0.46, -0.35],
  [95, 20, 0.3, 0.38, -0.55],
  [138, 28, 0.24, 0.44, -0.85],
  [175, 24, 0.28, 0.43, -0.2],
  [212, 21, 0.21, 0.48, -0.45],
  [248, 27, 0.29, 0.39, -0.7],
  [285, 23, 0.25, 0.46, -0.05],
  [322, 25, 0.27, 0.42, -0.3],
  [358, 22, 0.23, 0.45, -0.6],
  [395, 29, 0.3, 0.38, -0.9],
  [432, 24, 0.26, 0.46, -0.15],
  [468, 20, 0.21, 0.48, -0.4],
  [505, 26, 0.28, 0.41, -0.65],
  [542, 23, 0.24, 0.44, -0.8],
  [578, 28, 0.27, 0.4, -0.25],
  [615, 22, 0.22, 0.49, -0.5],
  [652, 25, 0.3, 0.38, -0.75],
  [688, 21, 0.24, 0.45, -0.0],
  [725, 27, 0.27, 0.42, -0.45],
  [762, 24, 0.28, 0.4, -0.7],
  [40, 24, 0.2, 0.5, -0.95],
  [115, 26, 0.25, 0.44, -0.18],
  [195, 23, 0.29, 0.39, -0.38],
  [265, 20, 0.22, 0.46, -0.58],
  [340, 28, 0.27, 0.42, -0.82],
  [412, 22, 0.24, 0.45, -0.12],
  [485, 25, 0.28, 0.4, -0.32],
  [560, 21, 0.21, 0.48, -0.52],
  [635, 27, 0.3, 0.38, -0.72],
  [708, 24, 0.26, 0.43, -0.92],
  [780, 22, 0.23, 0.46, -0.08],
];
const MID: Drop[] = [
  [12, 14, 0.17, 0.58, -0.22],
  [48, 16, 0.14, 0.62, -0.42],
  [78, 12, 0.19, 0.55, -0.67],
  [108, 18, 0.15, 0.6, -0.92],
  [148, 15, 0.18, 0.57, -0.12],
  [185, 13, 0.13, 0.63, -0.37],
  [225, 17, 0.2, 0.54, -0.57],
  [258, 14, 0.16, 0.59, -0.77],
  [295, 16, 0.18, 0.56, -0.02],
  [335, 12, 0.15, 0.61, -0.27],
  [372, 18, 0.19, 0.55, -0.47],
  [408, 15, 0.17, 0.58, -0.72],
  [445, 13, 0.14, 0.62, -0.97],
  [482, 17, 0.18, 0.56, -0.15],
  [518, 14, 0.16, 0.6, -0.4],
  [552, 16, 0.19, 0.55, -0.6],
  [592, 12, 0.15, 0.64, -0.85],
  [628, 18, 0.17, 0.57, -0.05],
  [665, 15, 0.15, 0.6, -0.3],
  [702, 13, 0.2, 0.54, -0.55],
  [738, 17, 0.16, 0.58, -0.78],
  [772, 14, 0.18, 0.56, -0.98],
  [30, 16, 0.17, 0.58, -0.17],
  [125, 12, 0.13, 0.65, -0.49],
  [208, 18, 0.2, 0.53, -0.69],
  [278, 13, 0.15, 0.62, -0.89],
  [358, 17, 0.18, 0.56, -0.09],
  [425, 14, 0.16, 0.59, -0.29],
  [498, 16, 0.19, 0.55, -0.49],
  [572, 13, 0.14, 0.62, -0.79],
  [645, 17, 0.17, 0.57, -0.99],
  [718, 15, 0.16, 0.6, -0.19],
  [788, 12, 0.15, 0.61, -0.39],
];
const FAR: Drop[] = [
  [8, 8, 0.1, 0.82, -0.12],
  [42, 10, 0.09, 0.88, -0.32],
  [72, 7, 0.11, 0.78, -0.52],
  [102, 9, 0.08, 0.9, -0.72],
  [135, 11, 0.12, 0.8, -0.92],
  [168, 8, 0.1, 0.85, -0.07],
  [202, 10, 0.11, 0.83, -0.27],
  [238, 7, 0.09, 0.89, -0.47],
  [272, 11, 0.12, 0.78, -0.67],
  [305, 8, 0.1, 0.86, -0.87],
  [342, 10, 0.09, 0.88, -0.02],
  [378, 9, 0.11, 0.81, -0.22],
  [415, 11, 0.08, 0.92, -0.42],
  [448, 7, 0.12, 0.79, -0.62],
  [482, 10, 0.1, 0.85, -0.82],
  [515, 8, 0.09, 0.88, -0.17],
  [548, 11, 0.11, 0.82, -0.37],
  [582, 9, 0.09, 0.9, -0.57],
  [618, 10, 0.12, 0.79, -0.77],
  [652, 7, 0.1, 0.86, -0.97],
  [688, 11, 0.11, 0.84, -0.13],
  [722, 8, 0.08, 0.91, -0.33],
  [755, 10, 0.12, 0.78, -0.53],
  [788, 9, 0.09, 0.87, -0.73],
];

function Storm() {
  const renderLayer = (drops: Drop[], stroke: string, strokeWidth: number) => (
    <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
      {drops.map(([x1, y2, opacity, dur, delay], i) => (
        <line
          key={i}
          x1={x1}
          y1={0}
          x2={x1 - 2}
          y2={y2}
          opacity={opacity}
          style={{
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </g>
  );

  return (
    <div className="gl-storm" aria-hidden>
      <svg viewBox="0 0 800 1060" preserveAspectRatio="xMidYMid slice">
        {renderLayer(NEAR, "rgb(190, 210, 225)", 1.1)}
        {renderLayer(MID, "rgb(170, 190, 210)", 0.75)}
        {renderLayer(FAR, "rgb(150, 170, 190)", 0.5)}
      </svg>
    </div>
  );
}

export default function Home() {
  const [currentCat, setCurrentCat] = useState<Category>(null);
  const [selectedType, setSelectedType] = useState<CourseType>(null);

  const selectCategory = (cat: "self" | "biz") => {
    if (currentCat === cat) {
      setCurrentCat(null);
      setSelectedType(null);
      return;
    }
    setCurrentCat(cat);
    setSelectedType(null);
  };
  const closePanel = () => {
    setCurrentCat(null);
    setSelectedType(null);
  };
  const goBack = () => setSelectedType(null);

  const courses =
    currentCat && selectedType ? COURSES[currentCat][selectedType] : [];

  return (
    <>
      <style jsx global>{`
        @import url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.17.0/dist/tabler-icons.min.css");

        :root {
          --gl-display: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          --gl-serif: var(--font-space-grotesk), "Space Grotesk", sans-serif;
          --gl-sans: var(--font-space-grotesk), "Space Grotesk", sans-serif;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #050505;
        }
        body {
          font-family: var(--gl-sans);
        }
        * {
          box-sizing: border-box;
        }

        .gl-root {
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
          padding: 80px 32px 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .gl-storm {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .gl-storm svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .gl-storm line {
          animation-name: gl-fall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          will-change: transform;
        }
        @keyframes gl-fall {
          0% {
            transform: translate(0, -80px);
          }
          100% {
            transform: translate(-70px, 1060px);
          }
        }

        .gl-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .gl-headline-wrap {
          position: relative;
          margin: 0 0 24px 0;
          display: inline-block;
        }
        .gl-headline-wrap::before,
        .gl-headline-wrap::after {
          content: "GRANTLANNIN.COM";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          font-family: var(--gl-display);
          font-size: 54px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-align: center;
          line-height: 1;
          pointer-events: none;
          z-index: 0;
        }
        .gl-headline-wrap::before {
          color: rgba(79, 179, 242, 0.18);
          filter: blur(10px);
        }
        .gl-headline-wrap::after {
          color: rgba(200, 75, 125, 0.12);
          filter: blur(18px);
        }
        .gl-headline {
          position: relative;
          z-index: 1;
          font-family: var(--gl-display);
          font-size: 54px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-align: center;
          line-height: 1;
          margin: 0;
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
          animation: gl-charge 6s linear infinite;
        }
        .gl-headline .dot {
          color: inherit;
        }
        @keyframes gl-charge {
          0% {
            background-position: 200% 50%;
          }
          100% {
            background-position: -50% 50%;
          }
        }

        .gl-stripes {
          display: flex;
          gap: 4px;
          margin-bottom: 28px;
        }
        .gl-stripes span {
          width: 28px;
          height: 4px;
          border-radius: 2px;
          opacity: 0.85;
        }
        .gl-stripes span:nth-child(1) {
          background: #4fb3f2;
          box-shadow: 0 0 8px rgba(79, 179, 242, 0.5);
        }
        .gl-stripes span:nth-child(2) {
          background: #e94e3c;
          box-shadow: 0 0 8px rgba(233, 78, 60, 0.5);
        }
        .gl-stripes span:nth-child(3) {
          background: #c84b7d;
          box-shadow: 0 0 8px rgba(200, 75, 125, 0.5);
        }
        .gl-stripes span:nth-child(4) {
          background: #2a3fbb;
          box-shadow: 0 0 8px rgba(42, 63, 187, 0.5);
        }

        .gl-tagline-block {
          text-align: center;
          max-width: 640px;
          margin: 0 0 36px 0;
          padding: 0 8px;
        }
        .gl-tagline {
          font-family: var(--gl-serif);
          font-weight: 400;
          font-size: 16px;
          color: rgba(214, 211, 209, 0.62);
          margin: 0 0 14px 0;
          letter-spacing: 0.01em;
          line-height: 1.55;
        }
        .gl-subtext {
          font-family: var(--gl-serif);
          font-weight: 400;
          font-size: 13px;
          color: rgba(170, 175, 180, 0.42);
          margin: 0;
          letter-spacing: 0.01em;
          line-height: 1.65;
        }
        .gl-life-design {
          font-weight: 600;
          background: linear-gradient(
            100deg,
            #4fb3f2 0%,
            #c84b7d 14%,
            #2a3fbb 28%,
            #e94e3c 38%,
            #4fb3f2 42%,
            #f5f5f4 45%,
            #e94e3c 48%,
            #c84b7d 51%,
            #2a3fbb 54%,
            #f5f5f4 57%,
            #4fb3f2 62%,
            #e94e3c 76%,
            #c84b7d 88%,
            #2a3fbb 100%
          );
          background-size: 360% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gl-charge 6s linear infinite;
        }
        .gl-design-emphasis {
          color: rgba(245, 245, 244, 0.95);
          text-decoration: underline;
          text-decoration-color: rgba(245, 245, 244, 0.75);
          text-underline-offset: 3px;
          text-shadow:
            0 0 10px rgba(255, 255, 255, 0.55),
            0 0 22px rgba(255, 255, 255, 0.35);
        }

        .gl-photo-frame {
          position: relative;
          width: 100%;
          max-width: 620px;
          margin-bottom: 40px;
          padding: 3px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            #4fb3f2 0%,
            #e94e3c 33%,
            #c84b7d 66%,
            #2a3fbb 100%
          );
          box-shadow:
            0 0 36px -6px rgba(79, 179, 242, 0.45),
            0 0 28px -8px rgba(200, 75, 125, 0.35),
            0 24px 48px rgba(0, 0, 0, 0.5);
        }
        .gl-photo-frame::before {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 22px;
          background: conic-gradient(
            from 0deg,
            #4fb3f2 0deg,
            #e94e3c 90deg,
            #c84b7d 180deg,
            #2a3fbb 270deg,
            #4fb3f2 360deg
          );
          opacity: 0.35;
          filter: blur(14px);
          z-index: -1;
        }
        .gl-photo {
          position: relative;
          width: 100%;
          aspect-ratio: 1024 / 573;
          border-radius: 15px;
          overflow: hidden;
          background: #0a0a0a;
        }
        .gl-photo img {
          object-fit: contain;
          object-position: center;
        }

        .gl-cta {
          width: 100%;
          max-width: 620px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gl-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
        }
        .gl-btn {
          position: relative;
          padding: 32px 26px 28px;
          background: linear-gradient(180deg, #0a0a0a 0%, #050505 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          overflow: hidden;
          transition:
            transform 0.25s,
            border-color 0.25s,
            opacity 0.3s,
            box-shadow 0.3s;
          text-align: left;
          font-family: var(--gl-sans);
          color: inherit;
        }
        .gl-btn:hover {
          transform: scale(1.02);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 0 24px -8px rgba(79, 179, 242, 0.25);
        }
        .gl-btn::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 5px;
          background: linear-gradient(
            90deg,
            #4fb3f2 0%,
            #4fb3f2 25%,
            #e94e3c 25%,
            #e94e3c 50%,
            #c84b7d 50%,
            #c84b7d 75%,
            #2a3fbb 75%,
            #2a3fbb 100%
          );
        }
        .gl-btn-title {
          font-family: var(--gl-serif);
          font-size: 24px;
          font-weight: 500;
          margin: 0 0 6px 0;
          letter-spacing: -0.02em;
          color: #f5f5f4;
          line-height: 1.15;
        }
        .gl-btn-sub {
          font-size: 13px;
          margin: 0;
          line-height: 1.5;
          letter-spacing: 0.01em;
          color: rgba(214, 211, 209, 0.6);
        }
        .gl-btn.active {
          border-color: rgba(79, 179, 242, 0.5);
          box-shadow: 0 0 32px -8px rgba(79, 179, 242, 0.4);
        }
        .gl-btn.dim {
          opacity: 0.45;
        }

        .gl-panel {
          width: 100%;
          max-height: 0;
          overflow: hidden;
          transition:
            max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            margin-top 0.3s ease-out,
            opacity 0.3s ease-out;
          opacity: 0;
          margin-top: 0;
        }
        .gl-panel.open {
          max-height: 700px;
          opacity: 1;
          margin-top: 14px;
        }
        .gl-panel-inner {
          position: relative;
          background: linear-gradient(180deg, #0a0a0a 0%, #060606 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 36px 24px 22px;
          overflow: hidden;
        }
        .gl-panel-inner::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 5px;
          background: linear-gradient(
            90deg,
            #4fb3f2 0%,
            #4fb3f2 25%,
            #e94e3c 25%,
            #e94e3c 50%,
            #c84b7d 50%,
            #c84b7d 75%,
            #2a3fbb 75%,
            #2a3fbb 100%
          );
        }
        .gl-panel-close {
          position: absolute;
          top: 12px;
          right: 14px;
          background: none;
          border: none;
          color: rgba(120, 113, 108, 0.7);
          font-size: 22px;
          cursor: pointer;
          line-height: 1;
          padding: 4px 8px;
          z-index: 2;
        }
        .gl-panel-close:hover {
          color: #f5f5f4;
        }

        .gl-sub-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .gl-sub-btn {
          position: relative;
          padding: 22px 18px 20px;
          background: linear-gradient(180deg, #111111 0%, #080808 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          cursor: pointer;
          overflow: hidden;
          transition:
            transform 0.2s,
            border-color 0.2s,
            box-shadow 0.2s;
          text-align: left;
          font-family: inherit;
          color: inherit;
        }
        .gl-sub-btn:hover {
          transform: scale(1.02);
          border-color: rgba(79, 179, 242, 0.4);
          box-shadow: 0 0 20px -6px rgba(79, 179, 242, 0.35);
        }
        .gl-sub-btn::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            #4fb3f2 0%,
            #4fb3f2 25%,
            #e94e3c 25%,
            #e94e3c 50%,
            #c84b7d 50%,
            #c84b7d 75%,
            #2a3fbb 75%,
            #2a3fbb 100%
          );
        }
        .gl-sub-btn-title {
          font-family: var(--gl-serif);
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 3px 0;
          letter-spacing: -0.01em;
          color: #f5f5f4;
        }
        .gl-sub-btn-sub {
          font-size: 12px;
          margin: 0;
          line-height: 1.5;
          color: rgba(214, 211, 209, 0.55);
        }

        .gl-view {
          animation: gl-spawn 0.3s ease-out;
        }
        @keyframes gl-spawn {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .gl-back {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(180, 195, 210, 0.7);
          font-size: 12px;
          padding: 0;
          margin-bottom: 14px;
          font-family: inherit;
          letter-spacing: 0.03em;
        }
        .gl-back:hover {
          color: #f5f5f4;
        }
        .gl-course {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: rgba(20, 20, 20, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          margin-bottom: 8px;
          cursor: pointer;
          transition:
            background 0.2s,
            border-color 0.2s;
          text-decoration: none;
        }
        .gl-course:hover {
          background: rgba(28, 28, 28, 0.85);
          border-color: rgba(255, 255, 255, 0.12);
        }
        .gl-course-title {
          font-size: 14px;
          font-weight: 500;
          color: #f5f5f4;
        }
        .gl-price {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid;
        }
        .gl-price-paid {
          background: rgba(30, 30, 30, 0.6);
          color: #d6d3d1;
          border-color: rgba(255, 255, 255, 0.1);
        }
        .gl-price-free {
          background: rgba(42, 63, 187, 0.25);
          color: #b5c8ff;
          border-color: rgba(79, 179, 242, 0.4);
        }
        .gl-empty {
          color: rgba(180, 195, 210, 0.5);
          text-align: center;
          padding: 20px;
          font-family: var(--gl-serif);
          font-size: 14px;
        }

        .gl-pointer-block {
          width: 100%;
          max-width: 620px;
          transition:
            opacity 0.3s ease,
            max-height 0.4s ease;
          overflow: hidden;
        }
        .gl-pointer-block.hidden {
          opacity: 0;
          max-height: 0;
          margin-top: 0;
          pointer-events: none;
        }
        .gl-pointer-row {
          position: relative;
          width: 100%;
          height: 36px;
          margin-top: 18px;
        }
        .gl-finger {
          position: absolute;
          top: 0;
          left: 25%;
          transform: translateX(-50%);
          font-size: 28px;
          color: rgba(220, 232, 245, 0.75);
          animation: gl-finger-slide 6.5s ease-in-out infinite;
          line-height: 1;
        }
        @keyframes gl-finger-slide {
          0%,
          100% {
            left: 25%;
          }
          50% {
            left: 75%;
          }
        }
        .gl-question {
          margin-top: 14px;
          text-align: center;
        }
        .gl-q-main {
          font-family: var(--gl-serif);
          font-weight: 500;
          font-size: 19px;
          color: rgba(245, 245, 244, 0.88);
          margin: 0 0 5px 0;
          letter-spacing: 0.01em;
        }
        .gl-q-sub {
          font-family: var(--gl-serif);
          font-weight: 400;
          font-size: 14px;
          color: rgba(180, 195, 210, 0.5);
          margin: 0;
          letter-spacing: 0.02em;
        }

        @media (max-width: 600px) {
          .gl-root {
            padding: 56px 20px 48px;
          }
          .gl-headline,
          .gl-headline-wrap::before,
          .gl-headline-wrap::after {
            font-size: 36px;
          }
          .gl-buttons {
            grid-template-columns: 1fr;
          }
          .gl-sub-buttons {
            grid-template-columns: 1fr;
          }
          .gl-tagline {
            font-size: 15px;
          }
          .gl-subtext {
            font-size: 12.5px;
          }
        }
      `}</style>

      <main className="gl-root">
        <Storm />

        <div className="gl-content">
          <div className="gl-headline-wrap">
            <h1 className="gl-headline">
              GRANTLANNIN<span className="dot">.</span>COM
            </h1>
          </div>

          <div className="gl-stripes" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="gl-tagline-block">
            <p className="gl-tagline">
              There are two paths. One is who you become, the other is what you
              build.
            </p>
            <p className="gl-subtext">
              These two together form the foundations of a process called{" "}
              <span className="gl-life-design">life design</span> — which is
              the art of{" "}
              <span className="gl-design-emphasis">
                consciously designing a life you absolutely love
              </span>
              . Many people don&apos;t realize they can build their life to look
              exactly how they want it to, they just need the skills to do it.
              My goal with this project is to give you the tools you need to
              make your life more beautiful.
            </p>
          </div>

          <div className="gl-photo-frame">
            <div className="gl-photo">
              <Image
                src="/grant.png"
                alt="Grant Lannin"
                fill
                sizes="(max-width: 620px) 100vw, 620px"
                className="gl-photo-img"
              />
            </div>
          </div>

          <div className="gl-cta">
            <div className="gl-buttons">
              <button
                type="button"
                className={`gl-btn ${currentCat === "self" ? "active" : currentCat === "biz" ? "dim" : ""}`}
                onClick={() => selectCategory("self")}
              >
                <p className="gl-btn-title">Life design / Personal development</p>
              </button>
              <button
                type="button"
                className={`gl-btn ${currentCat === "biz" ? "active" : currentCat === "self" ? "dim" : ""}`}
                onClick={() => selectCategory("biz")}
              >
                <p className="gl-btn-title">
                  Business / building your online income
                </p>
              </button>
            </div>

            <div className={`gl-panel ${currentCat ? "open" : ""}`}>
              <div className="gl-panel-inner">
                <button
                  type="button"
                  className="gl-panel-close"
                  onClick={closePanel}
                  aria-label="Close"
                >
                  ×
                </button>

                {selectedType === null ? (
                  <div className="gl-view">
                    <div className="gl-sub-buttons">
                      <button
                        type="button"
                        className="gl-sub-btn"
                        onClick={() => setSelectedType("free")}
                      >
                        <p className="gl-sub-btn-title">Free Courses</p>
                        <p className="gl-sub-btn-sub">No payment, just value</p>
                      </button>
                      <button
                        type="button"
                        className="gl-sub-btn"
                        onClick={() => setSelectedType("paid")}
                      >
                        <p className="gl-sub-btn-title">Paid Courses</p>
                        <p className="gl-sub-btn-sub">Go deeper, faster</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="gl-view">
                    <button type="button" className="gl-back" onClick={goBack}>
                      ← Back
                    </button>
                    <div>
                      {courses.length === 0 ? (
                        <p className="gl-empty">
                          Nothing here yet — check back soon.
                        </p>
                      ) : (
                        courses.map((c) => (
                          <a
                            key={c.slug}
                            href={c.href ?? `/${c.slug}`}
                            className="gl-course"
                          >
                            <span className="gl-course-title">{c.title}</span>
                            <span
                              className={`gl-price gl-price-${c.type}`}
                            >
                              {c.price}
                            </span>
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`gl-pointer-block ${currentCat ? "hidden" : ""}`}>
            <div className="gl-pointer-row">
              <i className="ti ti-hand-finger gl-finger" aria-hidden="true" />
            </div>
            <div className="gl-question">
              <p className="gl-q-main">what are we designing today?</p>
              <p className="gl-q-sub">Your way forward, or your business?</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
