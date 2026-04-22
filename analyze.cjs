"use strict";
const fs=require("fs");
const path=require("path");
function walkTsx(d){let f=[];fs.readdirSync(d).forEach(x=>{const fp=path.join(d,x);if(fs.statSync(fp).isDirectory())f=f.concat(walkTsx(fp));else if(x.endsWith(".tsx"))f.push(fp);});return f;}
function cnt(c,re){const m=c.match(re);return m?m.length:0;}
function cSec(c){return cnt(c,/className=[\x22\x27\x60][^\x22\x27\x60]*\bsection\b[^\x22\x27\x60]*[\x22\x27\x60]/g);}
function cCB(c){return cnt(c,/className=[\x22\x27\x60][^\x22\x27\x60]*\bcode-block\b[^\x22\x27\x60]*[\x22\x27\x60]/g);}
function cCT(c){return cnt(c,/className=[\x22\x27\x60][^\x22\x27\x60]*\bcomparison-table\b[^\x22\x27\x60]*[\x22\x27\x60]/g);}
function cIG(c){return cnt(c,/className=[\x22\x27\x60][^\x22\x27\x60]*\binfo-grid(?:-2)?\b[^\x22\x27\x60]*[\x22\x27\x60]/g);}
function cTB(c){return cnt(c,/className=[\x22\x27\x60][^\x22\x27\x60]*\btip-box\b[^\x22\x27\x60]*[\x22\x27\x60]/g);}
const PD="D:/dreamit-web/harness-study/src/pages";
const files=walkTsx(PD);
const res=[];
files.forEach(fp=>{
  const c=fs.readFileSync(fp,"utf8");
  const lc=c.split("\n").length;
  const rp=fp.replace(PD.split("/").join(path.sep)+path.sep,"").split(path.sep).join("/");
  res.push({file:rp,lines:lc,sections:cSec(c),codeBlocks:cCB(c),compTables:cCT(c),infoGrids:cIG(c),tipBoxes:cTB(c)});
});
res.sort((a,b)=>b.lines-a.lines);
const T=res.reduce((a,r)=>{a.lines+=r.lines;a.sections+=r.sections;a.codeBlocks+=r.codeBlocks;a.compTables+=r.compTables;a.infoGrids+=r.infoGrids;a.tipBoxes+=r.tipBoxes;return a;},{lines:0,sections:0,codeBlocks:0,compTables:0,infoGrids:0,tipBoxes:0});
function pad(s,n,r){const x=String(s);return r?x.padStart(n):x.padEnd(n);}
const D="-".repeat(82);
console.log("\n=== harness-study Quality Analysis ===");
console.log("Pages dir : "+PD);
console.log("TSX files : "+res.length);
console.log(D);
console.log(pad("File",38)+"  "+pad("Lines",6,1)+"  "+pad("Sec",5,1)+"  "+pad("Code",5,1)+"  "+pad("Cmp",5,1)+"  "+pad("Grid",5,1)+"  "+pad("Tip",5,1));
console.log(D);
res.forEach(r=>{console.log(pad(r.file,38)+"  "+pad(r.lines,6,1)+"  "+pad(r.sections,5,1)+"  "+pad(r.codeBlocks,5,1)+"  "+pad(r.compTables,5,1)+"  "+pad(r.infoGrids,5,1)+"  "+pad(r.tipBoxes,5,1));});
console.log(D);
console.log(pad("TOTALS",38)+"  "+pad(T.lines,6,1)+"  "+pad(T.sections,5,1)+"  "+pad(T.codeBlocks,5,1)+"  "+pad(T.compTables,5,1)+"  "+pad(T.infoGrids,5,1)+"  "+pad(T.tipBoxes,5,1));
console.log(D);
const avg=n=>(n/res.length).toFixed(1);
console.log("\n--- Averages Per Page ---");
console.log("  Lines          : "+avg(T.lines));
console.log("  Sections       : "+avg(T.sections));
console.log("  Code Blocks    : "+avg(T.codeBlocks));
console.log("  Comparison Tbl : "+avg(T.compTables));
console.log("  Info Grids     : "+avg(T.infoGrids));
console.log("  Tip Boxes      : "+avg(T.tipBoxes));
console.log("\n--- Per-File Deep Breakdown ---");
res.forEach(r=>{
  const s=r.sections+r.codeBlocks+r.compTables+r.infoGrids+r.tipBoxes;
  const d=r.lines>0?(s/r.lines*100).toFixed(1):"0.0";
  console.log("\n  "+r.file);
  console.log("    Lines             : "+r.lines);
  console.log("    Sections          : "+r.sections);
  console.log("    Code Blocks       : "+r.codeBlocks);
  console.log("    Comparison Tables : "+r.compTables);
  console.log("    Info Grids        : "+r.infoGrids);
  console.log("    Tip Boxes         : "+r.tipBoxes);
  console.log("    Component Score   : "+s+"  (density "+d+"% of lines)");
});
console.log("\n--- Pages Needing Attention ---");
const nc=res.filter(r=>r.codeBlocks===0&&r.compTables===0&&r.infoGrids===0&&r.tipBoxes===0);
if(nc.length){console.log("  No rich components (code-block/comparison-table/info-grid/tip-box):");nc.forEach(r=>console.log("    "+r.file+"  ("+r.lines+" lines)"));}
const hv=res.filter(r=>r.lines>400);
if(hv.length){console.log("  Heavy pages (>400 lines):");hv.forEach(r=>console.log("    "+r.file+"  ("+r.lines+" lines)"));}
const sp=res.filter(r=>r.sections===0&&r.lines<150);
if(sp.length){console.log("  Sparse pages (<150 lines, 0 sections):");sp.forEach(r=>console.log("    "+r.file+"  ("+r.lines+" lines)"));}
console.log("\n=== Analysis Complete ===\n");