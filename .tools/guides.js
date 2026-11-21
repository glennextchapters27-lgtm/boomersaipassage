// Stand-alone guides: each becomes /<slug>/ with its own title, answer-first lead and FAQ data.
// Plain words, short sentences, for anyone ready to go from curious to confident. Prices come from the site's tool list (checked monthly).
const say = (label, text) => `<div class="say"><b>${label}</b><span>${text}</span><button class="copy" type="button" data-say="${text.replace(/"/g, "&quot;")}">Copy</button></div>`;

module.exports = (GUMROAD) => [
{
  slug: "set-up-ai-for-parents",
  title: "Set Up AI for Your Parents This Christmas: 5 Easy Steps | The Boomer's AI Passage",
  desc: "Home for the holidays? Spend 20 minutes setting up a free AI helper on your parents' phone: the right app, voice mode, bigger text, a scam-check habit, and a printed guide.",
  eyebrow: "For grown kids, home for the holidays",
  h1: "Set up AI for Mom and Dad in 20 minutes.",
  lede: "You're home for the holidays and they're curious. Here's exactly what to set up, so it still works after you leave.",
  answer: "Install one official AI app (ChatGPT, Claude or Gemini) on their phone, show them the microphone button, make the text bigger, save a scam-check request in their notes, and leave them a printed guide.",
  body: () => `
<h2>The 5 steps</h2>
<ol class="steps">
<li><b>Install one official app.</b> ChatGPT (by OpenAI), Claude (by Anthropic) or Gemini (by Google). Pick one, not three. Check the maker's name; copycat apps exist. Put it on their home screen.</li>
<li><b>Show them the microphone.</b> Most people over 60 find talking easier than typing. Have them ask one real question out loud while you watch.</li>
<li><b>Make the text bigger.</b> iPhone: Settings, then Display &amp; Brightness, then Text Size. Android: Settings, then Display, then Font size.</li>
<li><b>Save a scam-check habit.</b> Put the request below in their Notes app, so they can paste any suspicious text into the AI before they click.</li>
<li><b>Leave something on paper.</b> Print our <a href="/start/">Start here page</a> (free) or give <a href="/gift/">the handbook</a>.</li>
</ol>
${say("Save this in their Notes", "Is this a scam? What are the warning signs? [paste the message here, but don't click any link in it]")}
<h2>Their first three questions</h2>
${say("Something useful today", "I'm new to AI. In simple words, what are 5 useful things you could help me with this week?")}
${say("Something fun", "Who won the World Series in 1969? Tell me one fun fact about that team.")}
${say("Something personal", "Help me write a short note to my granddaughter for her birthday. She loves horses and just started 5th grade.")}
<h2>Before you leave, agree on two rules</h2>
<ul>
<li>Never type in passwords, Social Security, bank or card numbers.</li>
<li>Double-check health, money and legal answers with a real person.</li>
</ul>`,
  faq: [
    ["Which AI app is best for older parents?", "Any of the big three works. Pick the one you use, so you can help them later. ChatGPT, Claude and Gemini all have free versions and voice mode."],
    ["Does it cost anything?", "No. The free versions are plenty to start. Don't add a paid plan until they've used it for a few weeks."],
    ["How do I keep them safe from AI scams?", "Agree on the two rules above, and save a scam-check request in their Notes so they ask the AI before clicking any link."]]
},
{
  slug: "thanksgiving",
  title: "How to Use AI for Thanksgiving: 13 Things to Ask (Exact Words) | The Boomer's AI Passage",
  desc: "Thirteen easy ways to let a free AI helper handle Thanksgiving busywork: a shopping list, recipe cards, a cooking timeline, a grace or toast, games for the grandkids. Copy the exact words.",
  eyebrow: "Thanksgiving · Thursday, November 26",
  h1: "Let AI help with Thanksgiving.",
  lede: "Keep the traditions. Let AI do the busywork. Thirteen things to ask, with the exact words to copy.",
  answer: "Open any free AI helper (ChatGPT, Claude or Gemini), copy one of the requests below, change the details, and press Enter. It answers in seconds.",
  body: () => `
<div class="example" id="example">
<span class="eyebrow">See it work, start to finish</span>
<h2>Example: when to thaw the turkey</h2>
<ol class="steps">
<li><b>Tap the green "Ask ChatGPT" button</b> below. ChatGPT opens in a new tab with the question already typed in. No account needed.</li>
<li><b>Change the details to fit you.</b> Your turkey's weight, your dinner time.</li>
<li><b>Send it.</b> Tap the arrow, or press Enter. Wait a few seconds.</li>
</ol>
${say("Your question", "I have a 16-pound frozen turkey and we eat Thursday at 3 p.m. When do I move it to the fridge, and what if I forgot?")}
<div class="sample">
<p><b>What you'll get back (a sample; yours will be worded a little differently):</b></p>
<p><b>Move it to the fridge by Sunday morning.</b> A 16-pound turkey needs about 4 days in the refrigerator, about 1 day for every 4 to 5 pounds. Leave it in its wrapper, on a tray, on the bottom shelf. Starting a day early is fine: a thawed turkey keeps 1 to 2 days in the fridge.</p>
<p><b>If you forgot:</b> thaw it in cold water. Keep it wrapped, cover it with cold tap water, and change the water every 30 minutes. Allow about 30 minutes per pound, so about 8 hours. Then cook it right away. For a 3 p.m. dinner, start very early Thursday morning.</p>
<p><b>Last resort:</b> you can cook it frozen. It's safe, but it takes about 50% longer. Never thaw it on the counter.</p>
</div>
<p class="note">Then keep talking to it, like a person. Try: "Make me a reminder list for Sunday through Thursday." Sample checked against <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/lets-talk-turkey-roasting" target="_blank" rel="noopener">USDA turkey guidance</a>.</p>
</div>
<h2>Before the day</h2>
${say("Shopping list", "We're hosting 12 people for Thanksgiving: turkey, stuffing, mashed potatoes, green beans and two pies. Make me one shopping list, grouped by store aisle.")}
${say("When to thaw the turkey", "I have a 16-pound frozen turkey and we eat Thursday at 3 p.m. When do I move it to the fridge, and what if I forgot?")}
<h2>In the kitchen</h2>
${say("Grandma's recipe card", "[Take a photo of the handwritten card and upload it.] Type out this recipe clearly, and make it for 12 people.")}
${say("Cooking timeline", "We're eating at 3 p.m. Make me a cooking timeline for a 16-pound turkey, stuffing, mashed potatoes and two pies, with one oven.")}
${say("Leftovers", "I have leftover turkey, stuffing and cranberry sauce. Give me 3 easy recipes, with short ingredient lists.")}
${say("A guest who can't eat gluten", "One guest can't eat gluten. Which of these dishes are safe, and how can I change the others? [list your dishes]")}
<h2>At the table</h2>
${say("A grace or toast", "Write a short Thanksgiving grace for our family. Warm, simple, and under one minute to read.")}
${say("Table talk", "Give me 10 easy, kind conversation questions for a Thanksgiving table with ages 8 to 85.")}
${say("Family memories", "Help me write a one-page story about my first Thanksgiving as a kid, from these notes: [your notes]. Keep my words where you can.")}
<h2>With the grandkids</h2>
${say("Games", "Suggest 5 indoor games for kids ages 6 to 12 after Thanksgiving dinner. No screens, nothing to buy.")}
${say("Thank-you notes", "Help my grandkids write short thank-you notes to the cook. Give 3 simple examples they can copy.")}
<h2>After the holiday</h2>
${say("Black Friday scam check", "I got this text about a Black Friday deal or a package delivery: [paste it]. Is it a scam? What should I do? Don't tell me to click any link.")}
${say("Medicare deadline", "Medicare open enrollment ends December 7. Explain in plain words what I should compare before then.")}
<p class="note">AI can make mistakes. Check cooking times and food safety with a trusted source, and never type in account numbers or passwords.</p>
<p>New to AI? <a href="/start/">Start here: what it is, in five minutes</a>.</p>`,
  faq: [
    ["Can AI really read Grandma's handwritten recipe card?", "Usually, yes. Take a clear photo in good light, upload it to ChatGPT, Claude or Gemini, and ask it to type the recipe out. Check the result against the card."],
    ["Which AI should I use for Thanksgiving planning?", "Any of the free big three works: ChatGPT (chatgpt.com), Claude (claude.ai) or Google Gemini (gemini.google.com)."],
    ["Does it cost anything?", "No. The free versions handle everything on this page."]]
},
{
  slug: "gift",
  title: "AI Gift for Parents and Grandparents: An Easy-to-Read Handbook | The Boomer's AI Passage",
  desc: "A thoughtful Christmas gift for a parent or grandparent who's curious about AI: an easy-to-read handbook with 100 things to ask, safety rules and a gift page. Instant PDF, $19.",
  eyebrow: "Christmas gift idea",
  h1: "A gift for Mom, Dad, Grandma or Grandpa who's curious about AI.",
  lede: "Plain words. Easy-to-read type. No hype. A handbook they can keep by the chair, and a free website that stays up to date.",
  answer: "The Boomer's AI Passage handbook: an instant PDF ($19) with 100 things to ask AI, the AI word list, five safety rules and a gift page to sign. Print it or give it on a tablet.",
  body: () => `
<h2>What's inside</h2>
<ul>
<li><b>Step 0:</b> what AI is, in five minutes, with a first question to try</li>
<li><b>100 things to ask AI,</b> from easy (recipes, letters) to amazing (their life story)</li>
<li><b>The AI word list</b> in plain English, from "agent" to "vibe coding"</li>
<li><b>Five safety rules</b> that keep them away from AI scams</li>
<li><b>A gift page</b> with room for your note, signature and date</li>
</ul>
<h2>How to give it</h2>
<ol class="steps">
<li>Buy the PDF. It arrives by email right away.</li>
<li>Print it at home or at an office store (8.5 × 11), or load it on their tablet.</li>
<li>Sign the gift page. Then sit with them for ten minutes and try the first question together.</li>
</ol>
<div class="cta"><a class="btn btn-gold" href="${GUMROAD}" rel="noopener">Get the Handbook, $19</a><a href="https://www.etsy.com/shop/BoomersAIPassage" rel="noopener">Also on Etsy</a></div>
<h2>Not sure yet?</h2>
<p>Everything starts free on this website. Send them <a href="/start/">Start here</a> and see if it clicks.</p>`,
  faq: [
    ["Is this a good gift for someone who has never used AI?", "Yes. It starts from zero: what AI is, what they need (a phone, tablet or computer they already own), and the first thing to type."],
    ["Is it a printed book?", "It's an instant PDF you can print at home or at an office store, or read on a tablet. Prefer a printed copy? The paperback is on Amazon for $12.99."],
    ["How much does it cost?", "$19, one time. The AI tools it teaches have free versions."]]
},
{
  slug: "chatgpt-for-seniors",
  title: "How to Use ChatGPT: A Plain-English Guide for Seniors | The Boomer's AI Passage",
  desc: "How to start using ChatGPT in five minutes, in plain English: what you need, how to sign up for free, what to type first, and how to stay safe.",
  eyebrow: "Step-by-step guide",
  h1: "How to use ChatGPT, in plain English.",
  lede: "Five minutes, no tech skills. What you need, how to start for free, and what to type first.",
  answer: "Go to chatgpt.com on any phone, tablet or computer, type a question in the box at the bottom, and press Enter. The free version is enough to start.",
  body: () => `
<h2>What you need</h2>
<ul>
<li>The phone, tablet or computer you already own</li>
<li>Your regular internet</li>
<li>An email address, if you want it to save your chats (optional)</li>
</ul>
<h2>Start in 4 steps</h2>
<ol class="steps">
<li>Type <b>chatgpt.com</b> into your web browser. Or download the "ChatGPT" app made by OpenAI. Check the maker's name, because copycat apps exist.</li>
<li>Click in the box at the bottom.</li>
<li>Type your question in plain words, like you'd ask a helpful neighbor.</li>
<li>Press Enter. Read the answer. Ask a follow-up if you want more.</li>
</ol>
${say("Your first question", "I'm new to AI. In simple words, what are 5 useful things you could help me with this week?")}
<h2>Good things to try next</h2>
${say("Write a letter", "Help me write a polite letter to my insurance company asking why my claim was denied. Here are the details: [details]")}
${say("Explain something", "Explain what an annuity is in simple words, like you're talking to a smart friend who isn't a finance person.")}
${say("Check a message", "Is this text a scam? What are the warning signs? [paste the text, but don't click any link in it]")}
<h2>What it costs</h2>
<p>The free version handles everyday questions. Paid plans add more use and features; start free and pay only if it has helped you for a few weeks.</p>
<h2>Stay safe</h2>
<ul>
<li>Never type in your Social Security, bank or card numbers, or passwords.</li>
<li>It can be confidently wrong. Double-check anything about health, money or the law with a real person.</li>
</ul>
<p>Prefer a different helper? Claude (claude.ai) and Google Gemini (gemini.google.com) work the same way. See <a href="/picks/">our picks</a>.</p>`,
  faq: [
    ["Is ChatGPT free?", "Yes, there's a free version that handles everyday questions. Paid plans are optional."],
    ["Do I need to download anything?", "No. You can use it in your web browser at chatgpt.com. There's also an official app from OpenAI."],
    ["Is ChatGPT safe for seniors?", "It's safe to use if you follow two rules: never share passwords or account numbers, and double-check important health, money or legal answers with a real person."]]
},
{
  slug: "ai-safety",
  title: "Is AI Safe for Seniors? 5 Simple Rules | The Boomer's AI Passage",
  desc: "Is AI safe for older adults? Yes, with five simple rules: protect your numbers, double-check big answers, use official apps, start free, and spot AI scams.",
  eyebrow: "Stay safe",
  h1: "Is AI safe? Yes, with five simple rules.",
  lede: "AI helpers are as safe as any website when you follow a few habits. Here they are, plus how to spot the new AI scams.",
  answer: "Yes. Using ChatGPT, Claude or Gemini is safe if you never share passwords or account numbers, double-check health, money and legal answers, and use the official app or website.",
  body: () => `
<h2>The five rules</h2>
<ol class="steps">
<li><b>Protect your numbers.</b> Never type in your Social Security, bank or card numbers, or passwords.</li>
<li><b>Double-check big answers.</b> AI can be confidently wrong. Ask a real person about health, money or the law.</li>
<li><b>Use the official app or website.</b> Search for the name yourself rather than clicking a link someone sent you.</li>
<li><b>Start free.</b> Pay only after a tool has helped you for a few weeks.</li>
<li><b>Hurry plus money means stop.</b> If a message, call or "AI" asks for money or gift cards in a hurry, it's a scam pattern.</li>
</ol>
<h2>The new AI scams to know</h2>
<ul>
<li><b>Voice cloning:</b> a call that sounds like a grandchild in trouble. Hang up and call them back on their real number.</li>
<li><b>Deepfake videos:</b> a famous person "recommending" an investment. Real ones don't.</li>
<li><b>Fake AI apps:</b> copycats with similar names. Check who made the app before you download it.</li>
</ul>
${say("Check a suspicious message", "Is this a scam? What are the warning signs? [paste the message, but don't click any link in it]")}
<p>Free help: the AARP Fraud Watch Network helpline, 877-908-3360.</p>
<p>See the full guide: <a href="/problems/scam/">Is this text or email a scam?</a></p>`,
  faq: [
    ["Is it safe for seniors to use ChatGPT?", "Yes, if you never share passwords or account numbers and double-check important health, money or legal answers with a real person."],
    ["What is an AI voice-cloning scam?", "A scammer copies a loved one's voice from short recordings and calls asking for money in a hurry. Hang up and call the person back on the number you know."],
    ["Can AI tell me if a text is a scam?", "It can point out common warning signs. Paste the text into ChatGPT, Claude or Gemini without clicking any link, and ask."]]
}
];
