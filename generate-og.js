/**
 * generate-og.js
 * Harness Master OG Image Generator
 * Usage: node generate-og.js
 * Output: public/og-image.png (1200x630)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WIDTH = 1200;
const HEIGHT = 630;

// Dark Blue gradient background SVG
const svgContent = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3A8A;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1D4ED8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
    </linearGradient>

    <!-- Accent Gradient -->
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:#BFDBFE;stop-opacity:0.7" />
    </linearGradient>

    <!-- Card Gradient -->
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.12" />
      <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:0.04" />
    </linearGradient>

    <!-- Text Shadow Filter -->
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="0" />

  <!-- Grid Pattern -->
  <g opacity="0.05">
    ${Array.from({ length: 20 }, (_, i) =>
      `<line x1="${i * 65}" y1="0" x2="${i * 65}" y2="${HEIGHT}" stroke="white" stroke-width="1"/>`
    ).join('')}
    ${Array.from({ length: 12 }, (_, i) =>
      `<line x1="0" y1="${i * 60}" x2="${WIDTH}" y2="${i * 60}" stroke="white" stroke-width="1"/>`
    ).join('')}
  </g>

  <!-- Decorative Orbs -->
  <circle cx="1050" cy="100" r="250" fill="white" opacity="0.04"/>
  <circle cx="1000" cy="80" r="150" fill="white" opacity="0.05"/>
  <circle cx="150" cy="520" r="200" fill="white" opacity="0.04"/>

  <!-- Top Accent Line -->
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="url(#accent)" rx="0" />

  <!-- Logo Box -->
  <rect x="60" y="60" width="72" height="72" rx="16" fill="white" opacity="0.15"/>
  <rect x="64" y="64" width="64" height="64" rx="14" fill="url(#card)"/>
  <text x="96" y="108" font-family="system-ui, sans-serif" font-size="36" font-weight="900"
    fill="white" text-anchor="middle" dominant-baseline="middle">H</text>

  <!-- Brand Name -->
  <text x="154" y="86" font-family="system-ui, sans-serif" font-size="28" font-weight="800"
    fill="white" dominant-baseline="middle">Harness</text>
  <text x="154" y="112" font-family="system-ui, sans-serif" font-size="12" font-weight="600"
    fill="#93C5FD" dominant-baseline="middle" letter-spacing="3">MASTER</text>

  <!-- Badge -->
  <rect x="60" y="180" width="240" height="36" rx="18" fill="white" opacity="0.15"/>
  <text x="180" y="198" font-family="system-ui, sans-serif" font-size="13" font-weight="700"
    fill="white" text-anchor="middle" dominant-baseline="middle" letter-spacing="1">
    🤖 Claude Code AI 에이전트 마스터
  </text>

  <!-- Main Title -->
  <text x="60" y="300" font-family="system-ui, sans-serif" font-size="72" font-weight="900"
    fill="white" dominant-baseline="middle" filter="url(#shadow)">Harness</text>
  <text x="60" y="388" font-family="system-ui, sans-serif" font-size="72" font-weight="900"
    fill="url(#accent)" dominant-baseline="middle" filter="url(#shadow)">완전 정복</text>

  <!-- Subtitle -->
  <text x="60" y="460" font-family="system-ui, sans-serif" font-size="22" font-weight="400"
    fill="white" dominant-baseline="middle" opacity="0.85">
    Claude Code로 구축하는 AI 팀 아키텍처
  </text>
  <text x="60" y="495" font-family="system-ui, sans-serif" font-size="18" font-weight="400"
    fill="white" dominant-baseline="middle" opacity="0.65">
    6가지 패턴 · 다중 에이전트 · 실전 프로젝트
  </text>

  <!-- Right Side Cards -->
  <!-- Card 1 -->
  <rect x="820" y="190" width="320" height="85" rx="12" fill="url(#card)" stroke="white" stroke-opacity="0.15" stroke-width="1"/>
  <text x="850" y="222" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="white" opacity="0.9">🔗 Pipeline Pattern</text>
  <text x="850" y="248" font-family="system-ui, sans-serif" font-size="12" fill="white" opacity="0.6">순차적 에이전트 체이닝</text>
  <text x="850" y="265" font-family="system-ui, sans-serif" font-size="11" fill="white" opacity="0.4">Linear workflow execution</text>

  <!-- Card 2 -->
  <rect x="820" y="290" width="320" height="85" rx="12" fill="url(#card)" stroke="white" stroke-opacity="0.15" stroke-width="1"/>
  <text x="850" y="322" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="white" opacity="0.9">🌊 Fan-out/Fan-in</text>
  <text x="850" y="348" font-family="system-ui, sans-serif" font-size="12" fill="white" opacity="0.6">병렬 처리 패턴</text>
  <text x="850" y="365" font-family="system-ui, sans-serif" font-size="11" fill="white" opacity="0.4">Parallel agent orchestration</text>

  <!-- Card 3 -->
  <rect x="820" y="390" width="320" height="85" rx="12" fill="url(#card)" stroke="white" stroke-opacity="0.15" stroke-width="1"/>
  <text x="850" y="422" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="white" opacity="0.9">🏢 Expert Pool</text>
  <text x="850" y="448" font-family="system-ui, sans-serif" font-size="12" fill="white" opacity="0.6">전문가 에이전트 풀</text>
  <text x="850" y="465" font-family="system-ui, sans-serif" font-size="11" fill="white" opacity="0.4">Specialized agent delegation</text>

  <!-- Bottom Stats -->
  <line x1="60" y1="548" x2="760" y2="548" stroke="white" stroke-opacity="0.2" stroke-width="1"/>

  <text x="60" y="580" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="white">7+</text>
  <text x="60" y="602" font-family="system-ui, sans-serif" font-size="11" fill="white" opacity="0.6">학습 경로</text>

  <text x="170" y="580" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="white">42+</text>
  <text x="170" y="602" font-family="system-ui, sans-serif" font-size="11" fill="white" opacity="0.6">세부 섹션</text>

  <text x="290" y="580" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="white">6</text>
  <text x="290" y="602" font-family="system-ui, sans-serif" font-size="11" fill="white" opacity="0.6">아키텍처 패턴</text>

  <!-- Domain -->
  <text x="760" y="591" font-family="system-ui, sans-serif" font-size="14" font-weight="600"
    fill="white" opacity="0.5" text-anchor="end">harness-study.dreamitbiz.com</text>

  <!-- Bottom Gradient Overlay -->
  <rect x="0" y="590" width="${WIDTH}" height="40" opacity="0.1"
    fill="url(#bg)" rx="0"/>
</svg>
`;

async function generateOGImage() {
  const outputDir = path.join(__dirname, 'public');
  const outputPath = path.join(outputDir, 'og-image.png');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const svgBuffer = Buffer.from(svgContent);

    await sharp(svgBuffer)
      .png({
        quality: 95,
        compressionLevel: 6,
      })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log(`✅ OG image generated successfully!`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📐 Size: ${WIDTH}x${HEIGHT}px`);
    console.log(`💾 File size: ${fileSizeKB}KB`);
  } catch (error) {
    console.error('❌ Failed to generate OG image:', error.message);
    process.exit(1);
  }
}

generateOGImage();
