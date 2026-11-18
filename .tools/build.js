// Builds the multi-page static site for boomersaipassage.com from the single-page app (passage.html).
// Usage: node build.js /home/claude/passage.html /home/claude/site
const fs = require("fs"), path = require("path"), vm = require("vm");
const [, , SRC, OUT] = process.argv;
const DOMAIN = "https://boomersaipassage.com";
const GUMROAD = "https://theboomersaipassage.gumroad.com/l/wpfolg";
const ETSY = "https://www.etsy.com/shop/BoomersAIPassage";
const html = fs.readFileSync(SRC, "utf8");
const lines = html.split("\n");
const start = lines.findIndex(l => l.startsWith("const T = {"));
const stop = lines.findIndex(l => l.startsWith("const tilesEl"));
const dataJs = lines.slice(start, stop).join("\n");
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(`function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c]));}\n` + dataJs +
  `\n;this.D={T,P,GLOSS,RATE,AGENTS,LEVELS,LV,NEWS,STARTERS};`, ctx);
const { T, P, GLOSS, RATE, LEVELS } = ctx.D;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]));
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const today = new Date().toISOString().slice(0, 10);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "problems"), { recursive: true });
fs.mkdirSync(path.join(OUT, "words"), { recursive: true });

// Shared stylesheet = the app's own CSS, plus a few rules for article pages.
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
fs.writeFileSync(path.join(OUT, "style.css"), css);

const head = (title, desc, url, extra = "") => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="The Boomer's AI Passage">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${extra}
</head>
<body>
<a class="skip" href="#main">Skip to the content</a>
<header class="topbar"><div class="inner">
  <a class="logo" href="/"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#173462" stroke="#e3b35a" stroke-width="2"/><path d="M9 27 Q20 7 31 27" fill="none" stroke="#e3b35a" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="18" r="4.2" fill="#e3b35a"/><path d="M8.5 29.5h23" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg><span>The Boomer's <b>AI Passage</b></span></a>
  <nav class="mainnav" aria-label="Main"><a href="/#step0">Start here</a><a href="/problems/">Find help</a><a href="/#picks">Our picks</a><a href="/#agents">Agents</a><a href="/words/">Word list</a></nav>
  <a class="btn btn-gold topcta" href="${GUMROAD}"><span class="hide-sm">Get the&nbsp;</span>Handbook</a>
</div></header>
<main id="main"><div class="band"><div class="inner">`;

const foot = `
</div></div>
<section class="band navyband" aria-label="The handbook"><div class="inner"><div class="buy">
  <div class="buytext">
    <span class="lvtag">The Handbook · $19</span>
    <h2>Everything on this site, on paper.</h2>
    <p>Step 0, the word list, and 100 things to ask AI, with the exact words to type. Easy-to-read type.</p>
  </div>
  <div class="buyopts">
    <div class="price">$19 <small>instant PDF</small></div>
    <a class="btn btn-gold buybtn" href="${GUMROAD}" rel="noopener">Get the Handbook</a>
    <a class="etsylink" href="${ETSY}" rel="noopener">Also on Etsy</a>
  </div>
</div></div></section>
</main>
<footer class="sitefoot"><div class="inner">
  <a class="logo" href="/"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#173462" stroke="#e3b35a" stroke-width="2"/><path d="M9 27 Q20 7 31 27" fill="none" stroke="#e3b35a" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="18" r="4.2" fill="#e3b35a"/><path d="M8.5 29.5h23" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg><span>The Boomer's <b>AI Passage</b></span></a>
  <p>From Curious to Confident. No hype. No jargon. Just what it can do for you.</p>
  <nav class="footlinks" aria-label="Footer"><a href="/">Home</a><a href="/problems/">Every problem</a><a href="/words/">Word list</a><a href="/share/">Share your story</a><a href="${GUMROAD}">The Handbook</a></nav>
  <p class="fine">Prices change often; checked ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}. Rankings are never for sale.</p>
</div></footer>
</body>
</html>`;

const dotsTxt = n => "●".repeat(n) + "○".repeat(5 - n);
const urls = [DOMAIN + "/", DOMAIN + "/problems/", DOMAIN + "/words/", DOMAIN + "/share/"];

// One page per problem
for (const p of P) {
  const lvl = LEVELS.find(l => l.n === p.level) || { n: p.level, name: "" };
  const first = T[p.picks[0].t];
  const q = `Which AI should I use to ${p.title.charAt(0).toLowerCase() + p.title.slice(1)}?`;
  const answer = `Our top pick is ${first.name}. ${p.picks[0].why}`;
  const url = `${DOMAIN}/problems/${p.id}/`;
  urls.push(url);
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
    { "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": answer } },
    { "@type": "Question", "name": `What should I type into ${first.name}?`, "acceptedAnswer": { "@type": "Answer", "text": p.picks[0].say } },
    { "@type": "Question", "name": `How much does ${first.name} cost?`, "acceptedAnswer": { "@type": "Answer", "text": first.cost } }]};
  const cards = p.picks.map((k, i) => {
    const t = T[k.t], r = RATE[k.t];
    return `<article class="card ${i === 0 ? "top" : ""}">
  <div class="card-head"><span class="rank">${i + 1}</span><h3>${esc(t.name)}</h3><span class="pill ${i === 0 ? "best" : ""}">${esc(k.best)}</span></div>
  <p>${esc(k.why)}</p>
  ${r ? `<p class="cost">Easy to use ${dotsTxt(r[0])} · Value ${dotsTxt(r[1])}</p>` : ""}
  <p class="cost">${esc(t.cost)} Made by ${esc(t.maker)}.</p>
  <div><b>How to start</b><ol class="steps">${k.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
  <div class="say"><b>Try saying this:</b><span>${esc(k.say)}</span></div>
  <a href="${t.url}" rel="noopener">Open ${esc(t.name)}</a>
</article>`; }).join("\n");
  const related = P.filter(o => o.level === p.level && o.id !== p.id).slice(0, 4)
    .map(o => `<a href="/problems/${o.id}/">${esc(o.title)}</a>`).join("");
  const page = head(`${p.title}: which AI to use | The Boomer's AI Passage`,
    `${answer} Plain-English steps, costs and the exact words to type. Written for people over 60.`, url,
    `<script type="application/ld+json">${JSON.stringify(faq)}</script>`) + `
<p class="crumb"><a href="/">Home</a> › <a href="/problems/">Everyday problems</a> › Step ${lvl.n}</p>
<section class="article">
  <h1>${esc(p.title)}</h1>
  <p class="lede">${esc(p.sub)}</p>
  <p class="answer"><b>Short answer:</b> ${esc(answer)}</p>
  <h2>Our picks, best first</h2>
  ${cards}
  <p class="note">Ranked by: does the job well, easy to use, good value, and trustworthy. No company can pay for a spot.</p>
  ${related ? `<div class="more"><h2>More Step ${lvl.n} ideas: ${esc(lvl.name)}</h2>${related}</div>` : ""}
</section>` + foot;
  fs.mkdirSync(path.join(OUT, "problems", p.id), { recursive: true });
  fs.writeFileSync(path.join(OUT, "problems", p.id, "index.html"), page);
}

// Problem index
const byLevel = LEVELS.map(l => `<h2>Step ${l.n}: ${esc(l.name)}</h2><ul class="linklist">${
  P.filter(p => p.level === l.n).map(p => `<li><a href="/problems/${p.id}/">${esc(p.title)}</a></li>`).join("")}</ul>`).join("");
fs.mkdirSync(path.join(OUT, "problems"), { recursive: true });
fs.writeFileSync(path.join(OUT, "problems", "index.html"),
  head("Everyday problems AI can help with | The Boomer's AI Passage",
    "Pick an everyday problem and see which AI to use, what it costs, and exactly what to type. Plain English, for people over 60.",
    DOMAIN + "/problems/") + `
<p class="crumb"><a href="/">Home</a> › Everyday problems</p>
<section class="article"><h1>Everyday problems AI can help with</h1>
<p class="lede">Pick one. Each page shows our top picks, what they cost, and the exact words to type.</p>${byLevel}</section>` + foot);

// One page per word, plus the word index
const sorted = [...GLOSS].sort((a, b) => a[0].localeCompare(b[0]));
for (const g of sorted) {
  const s = slug(g[0]), url = `${DOMAIN}/words/${s}/`;
  urls.push(url);
  const faq = { "@context": "https://schema.org", "@type": "DefinedTerm", "name": g[0], "description": g[1],
    "inDefinedTermSet": DOMAIN + "/words/" };
  fs.mkdirSync(path.join(OUT, "words", s), { recursive: true });
  fs.writeFileSync(path.join(OUT, "words", s, "index.html"),
    head(`What does "${g[0]}" mean? In plain English | The Boomer's AI Passage`, `${g[0]}: ${g[1]} ${g[2]}`, url,
      `<script type="application/ld+json">${JSON.stringify(faq)}</script>`) + `
<p class="crumb"><a href="/">Home</a> › <a href="/words/">AI word list</a> › ${esc(g[0])}</p>
<section class="article">
  <h1>What does "${esc(g[0])}" mean?</h1>
  <p class="answer">${esc(g[1])}</p>
  <p class="lede"><i>${esc(g[2])}</i></p>
  <div class="more"><h2>Next step</h2><a href="/problems/">See what AI can help you with</a><a href="/words/">Back to the full word list</a></div>
</section>` + foot);
}
fs.writeFileSync(path.join(OUT, "words", "index.html"),
  head("AI word list in plain English | The Boomer's AI Passage",
    "AI words explained in one plain sentence each, with an everyday comparison. Chatbot, prompt, agent, hallucination and more.",
    DOMAIN + "/words/") + `
<p class="crumb"><a href="/">Home</a> › AI word list</p>
<section class="article"><h1>AI word list, in plain English</h1>
<dl class="gloss">${sorted.map(g => `<div><dt><a href="/words/${slug(g[0])}/">${esc(g[0])}</a></dt><dd>${esc(g[1])}</dd><dd class="like">${esc(g[2])}</dd></div>`).join("")}</dl>
</section>` + foot);

// Share-your-story page (form wired once a collection service is chosen)
fs.mkdirSync(path.join(OUT, "share"), { recursive: true });
fs.writeFileSync(path.join(OUT, "share", "index.html"),
  head("Share your Curious to Confident story | The Boomer's AI Passage",
    "Did AI help you with something real? Tell us. We may share it, first name and town only, with your permission.", DOMAIN + "/share/") + `
<section class="article"><h1>Share your Curious to Confident story</h1>
<p class="lede">Did AI help you with something real, like a letter, a trip, a doctor visit or your family history? We'd love to hear it.</p>
<p class="answer">Story sharing opens soon. Check back, or get the weekly tip so you hear first.</p>
<p class="note">We only share stories with permission, and only your first name and town.</p></section>` + foot);

// Home page: the full app, plus SEO head tags and plain links crawlers can follow
let home = html
  .replace("<title>The Boomer's AI Passage</title>", `<title>The Boomer's AI Passage: AI for Boomers, From Curious to Confident</title>
<meta name="description" content="Plain-English help choosing and using AI, written for people over 60. Pick an everyday problem and get the right AI tool, what it costs, and the exact words to type.">
<link rel="canonical" href="${DOMAIN}/">
<meta property="og:title" content="The Boomer's AI Passage: From Curious to Confident">
<meta property="og:description" content="No hype. No jargon. Just what AI can do for you.">
<meta property="og:url" content="${DOMAIN}/">
<meta property="og:type" content="website">`)
  .replace("<!--GUIDES-->", `<section class="band alt" aria-label="All guides"><div class="inner guides">
  <span class="eyebrow">Every guide</span><h2>Browse every guide</h2>
  <ul class="linklist">${P.map(p => `<li><a href="/problems/${p.id}/">${esc(p.title)}</a></li>`).join("")}</ul>
  <p><a href="/words/">The full AI word list</a> · <a href="/share/">Share your story</a></p>
</div></section>`);
fs.writeFileSync(path.join(OUT, "index.html"), home);

// 404, robots, sitemap, llms.txt, CNAME
fs.writeFileSync(path.join(OUT, "404.html"), head("Page not found | The Boomer's AI Passage", "Page not found.", DOMAIN + "/") +
  `<section class="article"><h1>That page isn't here</h1><p class="lede"><a href="/">Go to the home page</a> or <a href="/problems/">browse everyday problems</a>.</p></section>` + foot);
fs.writeFileSync(path.join(OUT, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#173462" stroke="#e3b35a" stroke-width="2"/><path d="M9 27 Q20 7 31 27" fill="none" stroke="#e3b35a" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="18" r="4.2" fill="#e3b35a"/><path d="M8.5 29.5h23" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>`);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(OUT, "llms.txt"), `# The Boomer's AI Passage

> Plain-English guidance on choosing and using AI tools, written for people over 60. Each guide answers "Which AI should I use for this?" with ranked picks, current prices, setup steps and the exact words to type. Rankings use four criteria (does the job well, easy to use, good value, trustworthy) and are never sold. Updated weekly.

## Everyday problems
${P.map(p => `- [${p.title}](${DOMAIN}/problems/${p.id}/): our top pick is ${T[p.picks[0].t].name}.`).join("\n")}

## Reference
- [AI word list](${DOMAIN}/words/): plain-English definitions of ${GLOSS.length} AI terms
- [Home: what AI is, what you need, agents report card, safety rules](${DOMAIN}/)

## Product
- [The Boomer's AI Passage handbook](${GUMROAD}): 100 things to ask AI, step by step
`);
fs.writeFileSync(path.join(OUT, "CNAME"), "boomersaipassage.com\n");
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
console.log(`built ${P.length} problem pages, ${GLOSS.length} word pages, ${urls.length} URLs in sitemap`);
