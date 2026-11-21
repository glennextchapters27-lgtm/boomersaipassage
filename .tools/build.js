// Builds the multi-page static site for boomersaipassage.com from the single-page app (passage.html).
// Usage: node build.js /home/claude/passage.html /home/claude/site
const fs = require("fs"), path = require("path"), vm = require("vm");
const [, , SRC, OUT] = process.argv;
const DOMAIN = "https://boomersaipassage.com";
const GUMROAD = "https://theboomersaipassage.gumroad.com/l/wpfolg";
const ETSY = "https://www.etsy.com/shop/BoomersAIPassage";
const AMAZON = "https://www.amazon.com/dp/B0HS83RQ6X";
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
<meta property="og:image" content="${DOMAIN}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="The Boomer's AI Passage">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${extra}
</head>
<body>
<a class="skip" href="#main">Skip to the content</a>
<header class="topbar"><div class="inner">
  <a class="logo" href="/"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#173462" stroke="#e3b35a" stroke-width="2"/><path d="M9 27 Q20 7 31 27" fill="none" stroke="#e3b35a" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="18" r="4.2" fill="#e3b35a"/><path d="M8.5 29.5h23" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg><span>The Boomer's <b>AI Passage</b></span></a>
  <nav class="mainnav" aria-label="Main">
    <a href="/start/">Start here</a>
    <details class="dd"><summary>Find help</summary><div class="dd-panel">
      <a href="/#find">Pick a problem<small>Get the right AI and the words to type</small></a>
      <a href="/problems/">Every problem<small>All 17, by step</small></a>
      <a href="/picks/">Our picks<small>Which AI for which job</small></a>
      <a href="/agents/">Agents report card<small>What AI can do on its own</small></a>
    </div></details>
    <details class="dd"><summary>Learn the basics</summary><div class="dd-panel">
      <a href="/start/">What is AI?<small>Five minutes, no jargon</small></a>
      <a href="/ai-safety/">Is AI safe?<small>Five rules before you start</small></a>
      <a href="/chatgpt-for-seniors/">ChatGPT guide<small>Step by step</small></a>
      <a href="/words/">Word list<small>AI words in plain English</small></a>
      <a href="/news/">What's new<small>This month in AI</small></a>
    </div></details>
    <details class="dd"><summary>Holidays</summary><div class="dd-panel">
      <a href="/thanksgiving/">Thanksgiving<small>13 things to ask AI</small></a>
      <a href="/gift/">Christmas gift idea<small>The handbook</small></a>
      <a href="/set-up-ai-for-parents/">Set up AI for parents<small>In 20 minutes</small></a>
    </div></details>
  </nav>
  <a class="btn btn-gold topcta" href="${GUMROAD}"><span class="hide-sm">Get the&nbsp;</span>Handbook</a>
  <details class="mobilenav"><summary aria-label="Menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>Menu</summary><div class="dd-panel">
    <a href="/start/">Start here</a>
    <b>Find help</b><a href="/#find">Pick a problem</a><a href="/problems/">Every problem</a><a href="/picks/">Our picks</a><a href="/agents/">Agents report card</a>
    <b>Learn the basics</b><a href="/ai-safety/">Is AI safe?</a><a href="/chatgpt-for-seniors/">ChatGPT guide</a><a href="/words/">Word list</a><a href="/news/">What's new</a>
    <b>Holidays</b><a href="/thanksgiving/">Thanksgiving</a><a href="/gift/">Christmas gift idea</a><a href="/set-up-ai-for-parents/">Set up AI for parents</a>
    <a class="btn btn-gold" href="/#buy" style="margin-top:8px;justify-content:center">Get the handbook</a>
  </div></details>
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
    <a class="etsylink" href="${AMAZON}" rel="noopener">Paperback on Amazon, $12.99</a>
  </div>
</div></div></section>
<section class="band fb" aria-labelledby="fb-h"><div class="inner">
  <h2 id="fb-h">What should we cover next?</h2>
  <p>New terms, ideas and tool rankings go up every week, and readers decide what comes next. Tap what you'd like more of.</p>
  <div class="fb-form">
  <div class="fb-picks" role="group" aria-label="Topics">
    <label><input type="checkbox" value="AI Agents"> AI agents</label>
    <label><input type="checkbox" value="Spotting Scams"> Spotting scams</label>
    <label><input type="checkbox" value="Health & Medical"> Health and medical</label>
    <label><input type="checkbox" value="Money & Bills"> Money and bills</label>
    <label><input type="checkbox" value="Travel"> Travel</label>
    <label><input type="checkbox" value="Phones & Tablets"> Phones and tablets</label>
    <label><input type="checkbox" value="Family & Photos"> Family and photos</label>
    <label><input type="checkbox" value="More AI Terms"> More AI words</label>
  </div>
  <label class="fb-l" for="fb-note">Anything else? (optional)</label>
  <textarea id="fb-note" rows="3" placeholder="Like: how do I use AI to plan a trip?"></textarea>
  <button class="btn btn-gold" id="fb-send" type="button">Send my ideas</button>
  </div>
  <p class="fb-small" id="fb-msg" role="status" aria-live="polite">No name or email needed.</p>
</div></section>
<script>(function(){var b=document.getElementById("fb-send");if(!b)return;var F="https://docs.google.com/forms/d/e/1FAIpQLSda0B-EZsf5BenGolUu5YFwwUAhgBi7LgBKQkGDfni6RFUQSQ/formResponse";b.addEventListener("click",function(){var p=[].slice.call(document.querySelectorAll(".fb-picks input:checked")).map(function(i){return i.value;});var n=(document.getElementById("fb-note").value||"").trim();if(!p.length&&!n){document.getElementById("fb-msg").textContent="Tap a topic or type a note first.";return;}var d=new URLSearchParams();p.forEach(function(v){d.append("entry.767873080",v);});if(n)d.append("entry.1606713323",n);b.disabled=true;b.textContent="Sending…";fetch(F,{method:"POST",mode:"no-cors",body:d}).then(function(){document.querySelector(".fb-form").hidden=true;document.getElementById("fb-msg").textContent="Thank you! We read every note, and your ideas help decide next week's guides.";}).catch(function(){b.disabled=false;b.textContent="Send my ideas";document.getElementById("fb-msg").innerHTML='That did not go through. <a href="https://docs.google.com/forms/d/e/1FAIpQLSda0B-EZsf5BenGolUu5YFwwUAhgBi7LgBKQkGDfni6RFUQSQ/viewform">Open the form instead</a>.';});});})();</script>
<section class="newsletter" aria-labelledby="nl-h"><div class="inner" style="max-width:640px;margin:0 auto;padding:28px 16px;text-align:center">
  <h2 id="nl-h">Get one AI tip a week</h2>
  <p>Plain English, the exact words to type, and a heads-up on new scams. Free. Unsubscribe anytime.</p>
  <script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="648843b3-0da9-4f16-bbc5-7b9eb105541f"></script>
  <noscript><p><a href="https://boomersaipassage.beehiiv.com/subscribe">Sign up here</a></p></noscript>
</div></section>
<script async src="https://subscribe-forms.beehiiv.com/attribution.js"></script>
</main>
<footer class="sitefoot"><div class="inner">
  <a class="logo" href="/"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#173462" stroke="#e3b35a" stroke-width="2"/><path d="M9 27 Q20 7 31 27" fill="none" stroke="#e3b35a" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="18" r="4.2" fill="#e3b35a"/><path d="M8.5 29.5h23" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg><span>The Boomer's <b>AI Passage</b></span></a>
  <p>From Curious to Confident. No hype. No jargon. Just what it can do for you.</p>
  <nav class="footlinks" aria-label="Footer"><a href="/">Home</a><a href="/start/">Start here</a><a href="/problems/">Every problem</a><a href="/chatgpt-for-seniors/">ChatGPT guide</a><a href="/ai-safety/">Is AI safe?</a><a href="/thanksgiving/">Thanksgiving</a><a href="/gift/">Gift idea</a><a href="/set-up-ai-for-parents/">Set up AI for parents</a><a href="/words/">Word list</a><a href="/share/">Share your story</a></nav>
  <p class="fine">Prices change often; checked ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}. Rankings are never for sale.</p>
</div></footer>
<script>document.addEventListener("click",function(e){document.querySelectorAll("details.dd[open],details.mobilenav[open]").forEach(function(d){if(!d.contains(e.target))d.removeAttribute("open");});});document.querySelectorAll("details.dd").forEach(function(d){d.addEventListener("toggle",function(){if(d.open)document.querySelectorAll("details.dd[open]").forEach(function(o){if(o!==d)o.removeAttribute("open");});});});document.addEventListener("keydown",function(e){if(e.key==="Escape")document.querySelectorAll("details.dd[open],details.mobilenav[open]").forEach(function(d){d.removeAttribute("open");});});</script>
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
    `${answer} Plain-English steps, costs and the exact words to type. For anyone ready to go from curious to confident.`, url,
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


// Stand-alone guides
const GUIDES = require(path.join(__dirname, "guides.js"))(GUMROAD);
const COPYJS = `<script>function nextStep(c){const box=c.closest(".say,.starter,.card,.opt-body")||c.parentElement;if(!box||box.nextElementSibling&&box.nextElementSibling.classList.contains("nextstep"))return;const d=document.createElement("div");d.className="nextstep";d.innerHTML='<p class="ns-ok">✓ Copied. Now get your answer in 3 steps:</p><ol><li><b>Tap one helper.</b> It opens in a new tab.<span class="ns-btns"><a class="btn" href="https://chatgpt.com" target="_blank" rel="noopener">Open ChatGPT</a><a class="btn" href="https://claude.ai" target="_blank" rel="noopener">Open Claude</a><a class="btn" href="https://gemini.google.com" target="_blank" rel="noopener">Open Gemini</a></span></li><li><b>Paste your question.</b> Tap the message box at the bottom. Press and hold, then tap <b>Paste</b>. (On a computer: click the box, then Ctrl+V, or Command+V on a Mac.)</li><li><b>Send it.</b> Change any details to fit you, then tap the arrow or press Enter. Your answer appears in a few seconds.</li></ol><p class="ns-foot">First time? <a href="/start/#signup">How to make a free account</a> · <a href="/thanksgiving/#example">See a full example</a></p>';box.after(d);}document.addEventListener("click",e=>{const b=e.target.closest(".copy");if(!b)return;navigator.clipboard&&navigator.clipboard.writeText(b.dataset.say).then(()=>{const t=b.textContent;b.textContent="Copied";setTimeout(()=>b.textContent=t,1500);});nextStep(b);});</script>`;
for (const g of GUIDES) {
  const url = `${DOMAIN}/${g.slug}/`;
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": g.faq.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) };
  const page = head(g.title, g.desc, url, `<script type="application/ld+json">${JSON.stringify(faq)}</script>`) + `
<p class="crumb"><a href="/">Home</a> › ${esc(g.eyebrow)}</p>
<section class="article">
  <span class="eyebrow">${esc(g.eyebrow)}</span>
  <h1>${esc(g.h1)}</h1>
  <p class="lede">${esc(g.lede)}</p>
  <p class="answer"><b>Short answer:</b> ${esc(g.answer)}</p>
  ${g.body()}
  <div class="more"><h2>Common questions</h2>${g.faq.map(([q, a]) => `<p><b>${esc(q)}</b><br>${esc(a)}</p>`).join("")}</div>
</section>${COPYJS}` + foot;
  fs.mkdirSync(path.join(OUT, g.slug), { recursive: true });
  fs.writeFileSync(path.join(OUT, g.slug, "index.html"), page);
  urls.push(url);
}

// Problem index
const byLevel = LEVELS.map(l => `<h2>Step ${l.n}: ${esc(l.name)}</h2><ul class="linklist">${
  P.filter(p => p.level === l.n).map(p => `<li><a href="/problems/${p.id}/">${esc(p.title)}</a></li>`).join("")}</ul>`).join("");
fs.mkdirSync(path.join(OUT, "problems"), { recursive: true });
fs.writeFileSync(path.join(OUT, "problems", "index.html"),
  head("Everyday problems AI can help with | The Boomer's AI Passage",
    "Pick an everyday problem and see which AI to use, what it costs, and exactly what to type. Plain English, no tech background needed.",
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

// App pages: one short page per section, all built from the same app file
function keepOnly(src, keep) {
  return src.replace(/<!--P:(\w+)-->([\s\S]*?)<!--\/P:\1-->\n?/g, (m, name, body) => keep.includes(name) ? body : "");
}
function seoHead(title, desc, url) {
  return `<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:image" content="${DOMAIN}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">`;
}
let home = keepOnly(html, ["home", "all"])
  .replace("<title>The Boomer's AI Passage</title>", seoHead("The Boomer's AI Passage: AI for Boomers, From Curious to Confident", "Plain-English help for anyone ready to go from curious to confident with AI. Pick an everyday problem and get the right AI tool, what it costs, and the exact words to type.", DOMAIN + "/"))
  .replace("<!--GUIDES-->", "");
fs.writeFileSync(path.join(OUT, "index.html"), home);

const SUBPAGES = [
  { slug: "start", keep: "start", eyebrow: "Start here", h1: "New to AI? Start here.", lede: "Five minutes: what AI is, what you need (and don't), your first questions, and five safety rules.", title: "New to AI? Start Here | The Boomer's AI Passage", desc: "What AI is in plain English, what you need to use it, your first questions to try, and five safety rules. No tech background needed." },
  { slug: "picks", keep: "picks", eyebrow: "Our picks", h1: "The AI tools we recommend.", lede: "Our top all-purpose helpers and the best tool for each special job, with how we rank them.", title: "Best AI Tools for Seniors, Ranked | The Boomer's AI Passage", desc: "The AI tools we recommend for everyday life, ranked on how well they do the job, ease of use, value and trust. Rankings are never for sale." },
  { slug: "agents", keep: "agents", eyebrow: "Report card", h1: "AI agents: which are ready for you?", lede: "Agents do errands for you. Here's an honest look at which ones are ready, which need a helper, and which to skip for now.", title: "AI Agents Report Card for Seniors | The Boomer's AI Passage", desc: "An honest, plain-English report card on AI agents like Alexa+, ChatGPT agent mode and Claude in Chrome: ready, try with a helper, or not yet." },
  { slug: "news", keep: "news", eyebrow: "What's new", h1: "New in AI this month.", lede: "What changed lately, in plain words, and whether you need to care.", title: "AI News for Seniors, in Plain English | The Boomer's AI Passage", desc: "What changed in AI this month, explained in plain English, and whether you need to care." },
];
for (const sp of SUBPAGES) {
  const url = `${DOMAIN}/${sp.slug}/`;
  const ph = `<section class="pagehead"><div class="inner"><p class="crumb"><a href="/">Home</a> › ${esc(sp.eyebrow)}</p><h1>${esc(sp.h1)}</h1><p class="lede">${esc(sp.lede)}</p></div></section>`;
  const buyBand = (html.match(/<!--P:all-->([\s\S]*?)<!--\/P:all-->/) || ["", ""])[1];
  let pg = keepOnly(html, [sp.keep])
    .replace("</main>", buyBand + "\n</main>")
    .replace("<title>The Boomer's AI Passage</title>", seoHead(sp.title, sp.desc, url))
    .replace('<main id="main">', '<main id="main">\n' + ph)
    .replace("<!--GUIDES-->", "");
  fs.mkdirSync(path.join(OUT, sp.slug), { recursive: true });
  fs.writeFileSync(path.join(OUT, sp.slug, "index.html"), pg);
  urls.push(url);
}

// 404, robots, sitemap, llms.txt, CNAME
fs.writeFileSync(path.join(OUT, "404.html"), head("Page not found | The Boomer's AI Passage", "Page not found.", DOMAIN + "/") +
  `<section class="article"><h1>That page isn't here</h1><p class="lede"><a href="/">Go to the home page</a> or <a href="/problems/">browse everyday problems</a>.</p></section>` + foot);
fs.writeFileSync(path.join(OUT, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#173462" stroke="#e3b35a" stroke-width="2"/><path d="M9 27 Q20 7 31 27" fill="none" stroke="#e3b35a" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="18" r="4.2" fill="#e3b35a"/><path d="M8.5 29.5h23" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>`);
fs.copyFileSync(path.join(__dirname, "og.png"), path.join(OUT, "og.png"));
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(OUT, "llms.txt"), `# The Boomer's AI Passage

> Plain-English guidance on choosing and using AI tools, for anyone ready to go from curious to confident. Each guide answers "Which AI should I use for this?" with ranked picks, current prices, setup steps and the exact words to type. Rankings use four criteria (does the job well, easy to use, good value, trustworthy) and are never sold. Updated weekly.

## Everyday problems
${P.map(p => `- [${p.title}](${DOMAIN}/problems/${p.id}/): our top pick is ${T[p.picks[0].t].name}.`).join("\n")}

## Reference
- [AI word list](${DOMAIN}/words/): plain-English definitions of ${GLOSS.length} AI terms
- [Start here: what AI is, what you need, safety rules](${DOMAIN}/start/)
- [Our AI picks and how we rank](${DOMAIN}/picks/)
- [AI agents report card](${DOMAIN}/agents/)
- [AI news this month](${DOMAIN}/news/)
${GUIDES.map(g => `- [${g.h1}](${DOMAIN}/${g.slug}/): ${g.answer}`).join("\n")}

## Product
- [The Boomer's AI Passage handbook](${GUMROAD}): 100 things to ask AI, step by step
`);
fs.writeFileSync(path.join(OUT, "CNAME"), "boomersaipassage.com\n");
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
console.log(`built ${P.length} problem pages, ${GLOSS.length} word pages, ${urls.length} URLs in sitemap`);
