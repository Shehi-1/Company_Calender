import pptxgen from "pptxgenjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptx = new pptxgen();

// Layout: 16:9 widescreen
pptx.layout = "LAYOUT_16x9";

const COLOR_NAVY = "1E293B";       // Slate 800
const COLOR_DEEP_BLUE = "0F172A";  // Slate 900
const COLOR_BRAND_BLUE = "2563EB"; // Blue 600
const COLOR_PURPLE = "7C3AED";     // Purple 600
const COLOR_ACCENT = "38BDF8";     // Sky 400
const COLOR_BG_LIGHT = "F8FAFC";   // Slate 50
const COLOR_WHITE = "FFFFFF";
const COLOR_MUTED = "64748B";

const logoPath = path.join(__dirname, "public", "robotz-logo.png");

// ==========================================
// SLIDE 1: Title & Executive Overview
// ==========================================
const slide1 = pptx.addSlide();
slide1.background = { color: COLOR_DEEP_BLUE };

// Header brand pill
slide1.addText("ORGANISATION OPERATIONS & EVENT MANAGEMENT", {
  x: 0.8,
  y: 0.8,
  w: 6.0,
  h: 0.4,
  fontSize: 11,
  fontFace: "Arial",
  bold: true,
  color: COLOR_ACCENT,
  letterSpacing: 2
});

// Title
slide1.addText("Robotz Academy\nCalendar Management System", {
  x: 0.8,
  y: 1.4,
  w: 8.5,
  h: 1.6,
  fontSize: 32,
  fontFace: "Arial",
  bold: true,
  color: COLOR_WHITE,
  lineSpacing: 38
});

// Subtitle
slide1.addText(
  "A modern, responsive, and secure platform synchronizing corporate schedules, executive standups, staff birthdays, statutory Nigerian public holidays, and automated notifications.",
  {
    x: 0.8,
    y: 3.2,
    w: 7.5,
    h: 1.1,
    fontSize: 14,
    fontFace: "Arial",
    color: "CBD5E1",
    lineSpacing: 20
  }
);

// Metadata tags
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 4.8,
  w: 7.8,
  h: 0.9,
  rectRadius: 0.1,
  fill: { color: "1E293B" },
  line: { color: "334155", width: 1 }
});

slide1.addText(
  "Stack: React.js • Vite • Tailwind CSS • Supabase PostgreSQL • PWA Ready\nSecurity: 5-Digit PIN Admin Gate • Nigerian Public Holidays Engine • Dual Mode Cloud Sync",
  {
    x: 1.0,
    y: 4.9,
    w: 7.4,
    h: 0.7,
    fontSize: 11,
    fontFace: "Arial",
    color: "94A3B8"
  }
);

// Logo image on right
slide1.addImage({
  path: logoPath,
  x: 9.3,
  y: 1.5,
  w: 3.2,
  h: 3.6
});

// ==========================================
// SLIDE 2: Core Architecture & Dual Roles
// ==========================================
const slide2 = pptx.addSlide();
slide2.background = { color: COLOR_BG_LIGHT };

// Slide Title
slide2.addText("01 / PLATFORM ARCHITECTURE & ROLES", {
  x: 0.8,
  y: 0.5,
  w: 8.0,
  h: 0.3,
  fontSize: 10,
  bold: true,
  color: COLOR_BRAND_BLUE
});
slide2.addText("Two-Tier Role Access & Security Model", {
  x: 0.8,
  y: 0.8,
  w: 11.0,
  h: 0.6,
  fontSize: 22,
  bold: true,
  color: COLOR_NAVY
});

// Card 1: Staff Portal (Free Access)
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 1.6,
  w: 5.6,
  h: 4.8,
  rectRadius: 0.15,
  fill: { color: COLOR_WHITE },
  line: { color: "E2E8F0", width: 1.5 }
});

slide2.addText("STAFF DASHBOARD (OPEN / FREE ACCESS)", {
  x: 1.1,
  y: 1.9,
  w: 5.0,
  h: 0.3,
  fontSize: 11,
  bold: true,
  color: "059669"
});

slide2.addText("Frictionless Experience for Entire Organisation", {
  x: 1.1,
  y: 2.2,
  w: 5.0,
  h: 0.4,
  fontSize: 15,
  bold: true,
  color: COLOR_NAVY
});

const staffBullets = [
  "Zero Login Barrier: Free, instant access to general schedule without password fatigue.",
  "Interactive Multi-View: Explore Month, Week, and Year calendars with category badges.",
  "Nigerian Public Holidays: Real-time visibility of statutory federal observances.",
  "Staff Birthday Celebrations: View celebrants and send celebratory birthday wishes.",
  "Meetings & Deadlines: Track executive sessions, workshops, and deliverable targets.",
  "Protected Personnel Data: Strict read-only access prevents accidental modifications."
];

let startY1 = 2.8;
staffBullets.forEach((bullet) => {
  slide2.addText(`•  ${bullet}`, {
    x: 1.1,
    y: startY1,
    w: 5.0,
    h: 0.5,
    fontSize: 10.5,
    fontFace: "Arial",
    color: "334155"
  });
  startY1 += 0.52;
});

// Card 2: Administrator Dashboard (PIN Protected)
slide2.addShape(pptx.ShapeType.roundRect, {
  x: 6.8,
  y: 1.6,
  w: 5.6,
  h: 4.8,
  rectRadius: 0.15,
  fill: { color: COLOR_WHITE },
  line: { color: "CBD5E1", width: 1.5 }
});

slide2.addText("ADMINISTRATOR PORTAL (5-DIGIT PIN GATE)", {
  x: 7.1,
  y: 1.9,
  w: 5.0,
  h: 0.3,
  fontSize: 11,
  bold: true,
  color: "D97706"
});

slide2.addText("Full Governance & Administrative Control", {
  x: 7.1,
  y: 2.2,
  w: 5.0,
  h: 0.4,
  fontSize: 15,
  bold: true,
  color: COLOR_NAVY
});

const adminBullets = [
  "5-Digit Security PIN (20277): Fast keypad unlocking without complicated forms.",
  "Full Event Management: Create, update, reschedule, and delete corporate events.",
  "Staff Directory Management: Register new employees, assign departments, and track birthdays.",
  "Nigerian Holiday Manager: Adjust lunar observances (Eid-el-Fitr, Eid-el-Kabir) upon FG gazette.",
  "Automated Email Dispatch: Real-time broadcast logs for schedule changes & notices.",
  "Instant Lock Session: 1-click lock button resets access back to restricted staff mode."
];

let startY2 = 2.8;
adminBullets.forEach((bullet) => {
  slide2.addText(`•  ${bullet}`, {
    x: 7.1,
    y: startY2,
    w: 5.0,
    h: 0.5,
    fontSize: 10.5,
    fontFace: "Arial",
    color: "334155"
  });
  startY2 += 0.52;
});

// ==========================================
// SLIDE 3: Key Functional Features
// ==========================================
const slide3 = pptx.addSlide();
slide3.background = { color: COLOR_BG_LIGHT };

slide3.addText("02 / FUNCTIONAL HIGHLIGHTS", {
  x: 0.8,
  y: 0.5,
  w: 8.0,
  h: 0.3,
  fontSize: 10,
  bold: true,
  color: COLOR_BRAND_BLUE
});
slide3.addText("Engineered for Everyday Operations", {
  x: 0.8,
  y: 0.8,
  w: 11.0,
  h: 0.6,
  fontSize: 22,
  bold: true,
  color: COLOR_NAVY
});

// 4 Feature Pillars
const features = [
  {
    title: "Dynamic Interactive Calendar",
    color: "2563EB",
    points: [
      "Month, Week, and Year panoramic views.",
      "7 color-coded categories (Meetings, Holidays, Birthdays, Deadlines, etc.).",
      "Event modals with venue, participants, and quick-copy briefing summary."
    ]
  },
  {
    title: "Nigerian Public Holidays Engine",
    color: "059669",
    points: [
      "Fixed statutory days (Workers' Day, Democracy Day, Independence Day).",
      "Dynamic Islamic lunar observances flag (Eid-el-Fitr, Eid-el-Kabir).",
      "Admin adjustment tool when Federal Ministry gazettes declarations."
    ]
  },
  {
    title: "Staff Birthday System",
    color: "DB2777",
    points: [
      "Employee birthday registry with department and contact records.",
      "Automated calendar projection for any given year.",
      "1-click 'Send Birthday Wish' trigger simulating email dispatch."
    ]
  },
  {
    title: "Dual Notification & Alert Center",
    color: "7C3AED",
    points: [
      "Real-time top navigation in-app notification center with unread badges.",
      "Simulated SMTP outbound email audit log tracking delivered notices.",
      "Customizable notification timings (24h before, 1 hour, morning of)."
    ]
  }
];

features.forEach((feat, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.8 + col * 5.9;
  const y = 1.6 + row * 2.5;

  slide3.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 5.6,
    h: 2.2,
    rectRadius: 0.12,
    fill: { color: COLOR_WHITE },
    line: { color: "E2E8F0", width: 1.2 }
  });

  slide3.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.15,
    h: 2.2,
    fill: { color: feat.color }
  });

  slide3.addText(feat.title, {
    x: x + 0.35,
    y: y + 0.2,
    w: 5.0,
    h: 0.35,
    fontSize: 13,
    bold: true,
    color: COLOR_NAVY
  });

  let pointY = y + 0.65;
  feat.points.forEach(p => {
    slide3.addText(`• ${p}`, {
      x: x + 0.35,
      y: pointY,
      w: 5.0,
      h: 0.45,
      fontSize: 10,
      color: "475569"
    });
    pointY += 0.45;
  });
});

// ==========================================
// SLIDE 4: Technology, Database & Deployment
// ==========================================
const slide4 = pptx.addSlide();
slide4.background = { color: COLOR_DEEP_BLUE };

slide4.addText("03 / TECHNICAL SPECIFICATIONS & READINESS", {
  x: 0.8,
  y: 0.5,
  w: 8.0,
  h: 0.3,
  fontSize: 10,
  bold: true,
  color: COLOR_ACCENT
});
slide4.addText("Enterprise-Ready Stack & Cloud Synchronization", {
  x: 0.8,
  y: 0.8,
  w: 11.0,
  h: 0.6,
  fontSize: 22,
  bold: true,
  color: COLOR_WHITE
});

// 3 Column Grid
const techCols = [
  {
    heading: "Frontend & PWA Architecture",
    color: "38BDF8",
    items: [
      "React 18 & Vite: Ultra-responsive component design and sub-second builds.",
      "Tailwind CSS: Clean corporate aesthetic styled for desktop, tablet, and mobile.",
      "Progressive Web App (PWA): Installable on Android & iOS with offline service worker support."
    ]
  },
  {
    heading: "PostgreSQL & Supabase Security",
    color: "34D399",
    items: [
      "Live Cloud Integration: Connected to remote Supabase project endpoint.",
      "Row Level Security (RLS): Database-level policies enforcing admin-only mutations.",
      "Zero Downtime Dual Mode: Automatic fallback to local storage cache if disconnected."
    ]
  },
  {
    heading: "Deployment & Maintenance",
    color: "A78BFA",
    items: [
      "Version Control: Full Git repository synced with remote GitHub.",
      "Secrets Protection: All private tokens shielded from commits via .gitignore.",
      "Turnkey Production: Ready for instant deployment on Vercel, Netlify, or self-hosted Docker."
    ]
  }
];

techCols.forEach((col, idx) => {
  const x = 0.8 + idx * 3.95;
  slide4.addShape(pptx.ShapeType.roundRect, {
    x,
    y: 1.6,
    w: 3.75,
    h: 3.7,
    rectRadius: 0.15,
    fill: { color: "1E293B" },
    line: { color: "334155", width: 1.5 }
  });

  slide4.addText(col.heading, {
    x: x + 0.25,
    y: 1.9,
    w: 3.25,
    h: 0.4,
    fontSize: 13,
    bold: true,
    color: col.color
  });

  let itemY = 2.45;
  col.items.forEach(it => {
    slide4.addText(it, {
      x: x + 0.25,
      y: itemY,
      w: 3.25,
      h: 0.7,
      fontSize: 10,
      color: "CBD5E1",
      lineSpacing: 14
    });
    itemY += 0.85;
  });
});

// Bottom summary banner
slide4.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 5.6,
  w: 11.6,
  h: 0.8,
  rectRadius: 0.1,
  fill: { color: "0F172A" },
  line: { color: "2563EB", width: 1.5 }
});

slide4.addText("Robotz Academy Calendar System — Tested, Verified & Ready for Production Deployment", {
  x: 1.0,
  y: 5.85,
  w: 11.2,
  h: 0.35,
  fontSize: 12,
  bold: true,
  color: COLOR_WHITE,
  align: "center"
});

// Output presentation file
const outputPath = path.join(__dirname, "Robotz_Academy_Calendar_Presentation.pptx");
pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log(`Presentation successfully generated at: ${fileName}`);
});
