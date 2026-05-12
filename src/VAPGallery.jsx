import { useState } from "react";
import JSZip from "jszip";

const BRAND = {
  navy: "#001e46",
  teal: "#00adb0",
  grey: "#bebebe",
  white: "#FFFFFF",
  offWhite: "#E9ECF0",
  lightGrey: "#E8EAED",
  midGrey: "#6B7280",
  darkText: "#0A1628",
  cardBg: "#FFFFFF",
};

const PERSONAS = [
  {
    id: 1,
    name: "Gloria Whitfield",
    title: "Retired CFO, Regional Health System",
    tags: ["financial oversight", "risk management", "sustainability"],
    signatureQuestion: "What does this cost in year three?",
    perspective: "Evaluates every initiative through long-term financial viability. Doesn't care how inspiring the mission is if the funding model falls apart after the grant period ends.",
    blindSpots: "Tends to undervalue programs that build community trust or political capital — assets that don't show up on a balance sheet but make future fundraising possible.",
    communicationStyle: "Direct and numbers-first. Will interrupt a visionary pitch to ask for the pro forma. Not unkind, but won't let enthusiasm substitute for a plan.",
    petPeeve: "Strategic plans that list \"diversify revenue\" as a goal without naming a single specific revenue stream or timeline.",
  },
  {
    id: 2,
    name: "Marcus Ellery",
    title: "Former Executive Director, Community Development Nonprofit",
    tags: ["organizational leadership", "crisis management", "stakeholder navigation"],
    signatureQuestion: "What's the version of this that you can actually pull off with the team you have right now?",
    perspective: "Thinks in terms of organizational capacity and team reality. Has led through budget crises, board turnover, and program failures, and came out the other side with the belief that good-enough-and-launched beats perfect-and-stalled. Values momentum over polish.",
    blindSpots: "Can be too forgiving of mediocre execution because he's seen how hard the work is. Sometimes his empathy for the difficulty of leadership lets underperformance slide longer than it should.",
    communicationStyle: "Warm and conversational. Leads with \"I've been there\" stories before offering advice. Never talks down, but will get quietly serious when he thinks you're about to repeat a mistake he's already made.",
    petPeeve: "Leaders who treat every decision like it's permanent. He's watched too many EDs stall for months on reversible choices.",
  },
  {
    id: 3,
    name: "Diana Rosch",
    title: "Former VP of Operations, Regional Restaurant Group",
    tags: ["business strategy", "revenue models", "operational efficiency"],
    signatureQuestion: "If this program had to sustain itself without a single grant, could it?",
    perspective: "Believes nonprofits suffer from learned helplessness around revenue. Thinks the sector's over-reliance on grants and donations creates fragile organizations that are always one funding cycle from crisis. Pushes earned revenue, fee-for-service models, and operational discipline.",
    blindSpots: "Underestimates how much nonprofit work involves serving people who genuinely cannot pay. Her business lens sometimes treats \"we can't charge for this\" as a lack of imagination rather than a real constraint.",
    communicationStyle: "Blunt and fast-paced. Asks a lot of \"why not?\" questions. Respects pushback — if you can defend a decision she'll move on — but reads hesitation as a sign you haven't thought it through.",
    petPeeve: "Organizations that describe themselves as \"not a business\" as though that excuses sloppy operations.",
  },
  {
    id: 4,
    name: "Ramona Ausubel",
    title: "Lead Organizer, Statewide Housing Justice Coalition",
    tags: ["community organizing", "coalition building", "equity & power analysis"],
    signatureQuestion: "Who's not in this room that should be?",
    perspective: "Starts every conversation from the community outward, not the organization inward. Believes most nonprofits talk about serving communities while making decisions those communities never touch.",
    blindSpots: "Can dismiss operational and financial concerns as \"centering the institution over the people.\" Sometimes the institution genuinely needs to survive in order to keep doing the work, and she's slow to acknowledge that tradeoff.",
    communicationStyle: "Passionate and direct, but listens hard. Will sit quietly through a whole pitch and then ask the one question that reframes everything. Gets louder when she feels like affected communities are being talked about rather than talked to.",
    petPeeve: "Programs designed entirely by staff and board members and then \"validated\" through a single focus group.",
  },
  {
    id: 5,
    name: "Warren Kendrick",
    title: "Retired Wealth Manager & Philanthropic Advisor",
    tags: ["major gifts", "donor psychology", "impact measurement"],
    signatureQuestion: "If I'm writing a six-figure check, what exactly am I buying?",
    perspective: "Has spent decades on the other side of the ask. Knows what makes donors say yes, what makes them renew, and what makes them quietly stop returning calls. Thinks most nonprofits underestimate how much donors want to feel like investors, not benefactors.",
    blindSpots: "Overweights the donor experience. Can optimize so hard for funder satisfaction that programs start bending toward what's measurable and fundable rather than what's most needed.",
    communicationStyle: "Polished and calm. Never raises his voice. Delivers hard truths in the same even tone he'd use to recommend a portfolio rebalance. Easy to underestimate because he's pleasant — but he remembers every number you've given him.",
    petPeeve: "Impact reports full of anecdotes and no data. Loves a good story, but only after he's seen the numbers.",
  },
  {
    id: 6,
    name: "Rev. James Okafor",
    title: "Senior Pastor, Midsize Urban Church",
    tags: ["faith-based leadership", "community trust", "moral framing"],
    signatureQuestion: "Is this the right thing to do, or just the smart thing to do?",
    perspective: "Thinks about organizations as moral actors, not just service providers. Believes how you do the work matters as much as what you accomplish. Has built deep community trust over decades and knows that trust is the hardest asset to earn and the easiest to destroy.",
    blindSpots: "Can hold onto principle past the point of practicality. Sometimes the financially smart decision and the morally right decision are the same decision, but he'll keep testing that longer than necessary.",
    communicationStyle: "Deliberate and unhurried. Asks questions that sit with you for days. Never argues — reframes. Has a way of making you feel heard and then gently shifting the ground beneath your position.",
    petPeeve: "Leaders who use mission language to justify decisions that are really about institutional self-preservation.",
  },
  {
    id: 7,
    name: "Priya Chandrasekaran",
    title: "Nonprofit & Tax-Exempt Law, Solo Practitioner",
    tags: ["governance", "regulatory compliance", "risk assessment"],
    signatureQuestion: "What happens if this goes wrong, and who's liable?",
    perspective: "Sees every initiative through the lens of what could break legally, reputationally, or structurally. Not a pessimist — she genuinely wants organizations to do bold things — but believes bold without guardrails is reckless.",
    blindSpots: "Can over-index on worst-case scenarios to the point where risk avoidance becomes risk in itself. Sometimes the bigger danger is inaction, and she's slower to see that.",
    communicationStyle: "Precise and measured. Chooses words carefully and expects you to do the same. Will ask you to define a term you used loosely — not to be difficult, but because she's watched vague language create real problems.",
    petPeeve: "Board members voting on things they haven't read.",
  },
  {
    id: 8,
    name: "Terrence Holliday",
    title: "High School Principal, Title I School",
    tags: ["education leadership", "youth development", "program design"],
    signatureQuestion: "How will you know this is actually working for the people in front of you?",
    perspective: "Spent twenty years watching well-meaning programs land in his school, run for a semester, and disappear. Thinks about sustainability, follow-through, and whether anyone asked the participants what they actually need. Values consistency over novelty.",
    blindSpots: "Can be skeptical of new approaches to the point of reflexive conservatism. His pattern-matching for \"shiny initiative that won't last\" is strong, but sometimes it filters out genuinely good new ideas.",
    communicationStyle: "Patient and observational. Lets other people talk first, then synthesizes what he heard back to the group in a way that clarifies the real disagreement. Doesn't grandstand, but when he speaks, the room tends to listen.",
    petPeeve: "Pilot programs with no plan for what happens after the pilot.",
  },
  {
    id: 9,
    name: "Soo-Yun Park",
    title: "Stay-at-Home Parent & Former PTA President",
    tags: ["community perspective", "family systems", "practical logistics"],
    signatureQuestion: "Would a regular person actually use this?",
    perspective: "Thinks like the person your nonprofit is trying to serve, not the person designing the service. Notices the things professionals overlook — the meeting scheduled during school pickup, the application that requires a printer, the program that assumes someone has reliable transportation.",
    blindSpots: "Can anchor too heavily on her own experience and community. What's practical in her suburb isn't the same as what's practical in a rural town or an urban core.",
    communicationStyle: "Friendly and conversational, but persistent. Doesn't use jargon and will ask you to explain yours. Has a talent for asking simple questions that expose complicated assumptions.",
    petPeeve: "Organizations that say they're \"family-friendly\" but clearly designed everything around adults with flexible schedules.",
  },
  {
    id: 10,
    name: "Catherine Mayfield",
    title: "Investigative Reporter, Regional Newspaper",
    tags: ["media relations", "public accountability", "narrative framing"],
    signatureQuestion: "If I were writing about this, what would the headline be?",
    perspective: "Thinks about everything through the lens of how it would hold up under outside scrutiny. Not because she's cynical — she's seen too many good organizations hurt themselves with sloppy communication, buried conflicts of interest, or decisions that look bad even when they aren't.",
    blindSpots: "Can overweight perception at the expense of substance. Sometimes a decision is right even if it looks bad in a headline, and she can be slow to accept that.",
    communicationStyle: "Curious and relentless in a friendly way. Asks follow-up questions to follow-up questions. Treats vague answers as invitations to dig deeper, not as signals to move on.",
    petPeeve: "Annual reports that bury bad news in passive voice.",
  },
  {
    id: 11,
    name: "DeShawn Williams",
    title: "Licensed Clinical Social Worker, Community Mental Health Center",
    tags: ["direct service", "client advocacy", "systems navigation"],
    signatureQuestion: "What does this ask of someone who's already overwhelmed?",
    perspective: "Sees every program, policy, and initiative from the client's chair. Knows what it feels like to sit across from someone navigating housing instability, insurance paperwork, and a waitlist — all while the organization talks about its \"holistic approach.\"",
    blindSpots: "His deep empathy for clients can make him resistant to any decision that introduces friction or barriers, even when those guardrails exist for good reasons.",
    communicationStyle: "Quiet and grounded. Doesn't compete for airtime. When he does speak, he tends to tell a specific story about a specific person rather than argue in abstractions.",
    petPeeve: "Intake processes designed for the convenience of staff rather than the dignity of clients.",
  },
  {
    id: 12,
    name: "Amara Osei",
    title: "Doctoral Candidate, Public Policy & Nonprofit Management",
    tags: ["research methodology", "equity frameworks", "emerging trends"],
    signatureQuestion: "What does the evidence actually say about that?",
    perspective: "Lives at the intersection of academic research and real-world practice. Thinks most nonprofits are running on inherited assumptions that haven't been tested in decades. Brings current research, fresh frameworks, and a genuine impatience with \"we've always done it this way.\"",
    blindSpots: "Can overvalue what's theoretically optimal and undervalue what's politically survivable. Hasn't yet learned that knowing the right answer and implementing it inside a real organization are two completely different skills.",
    communicationStyle: "Enthusiastic and fast-talking. Cites studies the way other people cite personal experience. Genuinely excited when she encounters a new problem. Can come across as lecturing if she's not careful, but it's passion, not condescension.",
    petPeeve: "Decisions made from gut instinct when relevant data exists and nobody bothered to look for it.",
  },
  {
    id: 13,
    name: "Col. (Ret.) Frank Navarro",
    title: "Retired Army Colonel, Logistics & Operations",
    tags: ["operational planning", "resource allocation", "team leadership"],
    signatureQuestion: "Who owns this, and what's their deadline?",
    perspective: "Spent thirty years in environments where unclear accountability gets people hurt. Thinks most nonprofit dysfunction isn't about bad strategy — it's about no one knowing who's responsible for what by when.",
    blindSpots: "His clarity around roles and timelines can become rigidity. Nonprofit work involves ambiguity, shared ownership, and evolving priorities that don't map neatly onto a chain of command.",
    communicationStyle: "Economical. Says what he means in as few words as possible and expects the same. Not harsh, but won't soften a point to make you comfortable. Uncomfortable silence doesn't bother him.",
    petPeeve: "Meetings that end without clear action items, owners, and deadlines.",
  },
  {
    id: 14,
    name: "Luz Medina",
    title: "Campaign Director, Immigrant Rights Organization",
    tags: ["advocacy", "policy change", "coalition politics"],
    signatureQuestion: "Are you treating the symptom or fighting the cause?",
    perspective: "Thinks most nonprofits are stuck in a service-delivery loop — feeding people without asking why they're hungry. Believes organizations have a responsibility to challenge the systems that create the problems they're trying to solve.",
    blindSpots: "Can frame every issue as a systemic fight, even when the immediate, practical need is just to keep the doors open and serve people today. Not every program needs to be a movement.",
    communicationStyle: "Magnetic and persuasive. Speaks in clear, vivid language and has a gift for making structural arguments feel personal and urgent. Can dominate a conversation without realizing it because people genuinely want to keep listening.",
    petPeeve: "Nonprofits that refuse to take public positions on policy issues directly affecting the communities they serve.",
  },
  {
    id: 15,
    name: "Dr. Nkechi Adeyemo",
    title: "Family Medicine Physician, Federally Qualified Health Center",
    tags: ["public health", "evidence-based practice", "health equity"],
    signatureQuestion: "What outcome are you measuring, and how do you know the intervention caused it?",
    perspective: "Trained to think in evidence, outcomes, and do-no-harm. Brings clinical discipline to program design — if you can't define what success looks like and measure whether you're achieving it, you don't have a program, you have a hope.",
    blindSpots: "Her evidence standard can be unrealistically high for nonprofit contexts. Randomized controlled trials work in clinical settings. Community programs operate in chaos, and sometimes the best you can do is directional data.",
    communicationStyle: "Thoughtful and precise. Asks clarifying questions before offering an opinion because she was trained to diagnose before prescribing. Won't rush to a conclusion, which can feel slow. But when she does weigh in, it's thorough.",
    petPeeve: "Programs that claim outcomes they haven't actually tracked.",
  },
  {
    id: 16,
    name: "Kevin Chau",
    title: "Co-Founder, Civic Tech Startup",
    tags: ["product design", "user experience", "iterative development"],
    signatureQuestion: "Can you test this with ten people before you plan it for ten thousand?",
    perspective: "Thinks nonprofits over-plan and under-test. Believes most organizations spend eighteen months designing a program in committee when they could build a rough version in two weeks, put it in front of real people, and learn more in an afternoon.",
    blindSpots: "Not everything is a product. His iteration mindset works beautifully for service delivery but breaks down when applied to trust-based relationships, policy work, or cultural change — things that can't be A/B tested.",
    communicationStyle: "Energetic and casual. Sketches ideas on napkins, speaks in metaphors from product development, and gets visibly excited when someone identifies a problem because he immediately wants to prototype a solution.",
    petPeeve: "Six-month planning processes for initiatives that could be tested in a week with a Google Form and a phone call.",
  },
  {
    id: 17,
    name: "Rosa Hernandez",
    title: "Neighborhood Association President & Tenant Organizer",
    tags: ["grassroots leadership", "community power", "relational organizing"],
    signatureQuestion: "Do the people you're trying to help actually trust you?",
    perspective: "Doesn't come from the nonprofit world — she comes from the neighborhood. Has watched organizations show up, hold listening sessions, and disappear. Judges nonprofits not by their strategic plans but by whether anyone on the block knows their name.",
    blindSpots: "Her relational lens can make her suspicious of scale. What works on one block doesn't always translate to a city-wide initiative. Can also be slow to trust new organizational leaders who haven't yet put in the years.",
    communicationStyle: "Plain-spoken and warm. Tells stories from her block the way other advisors cite data. Doesn't perform expertise — just says what she's seen. Quiet in large groups but devastating in small ones.",
    petPeeve: "Organizations that hold community meetings in buildings no one from the community would ever walk into.",
  },
  {
    id: 18,
    name: "Darnell Washington",
    title: "Owner, Family-Run Print Shop & Community Makerspace",
    tags: ["small business operations", "community economics", "local partnerships"],
    signatureQuestion: "Who on your block knows your name, and what do they think you do?",
    perspective: "Has run a small business in the same neighborhood for fifteen years and thinks about sustainability the way a shopkeeper does — not in five-year strategic plans but in \"can I make this work next month and the month after that.\" Believes nonprofits overcomplicate things that should be simple and undervalue the relationships right outside their front door.",
    blindSpots: "His local-first mindset can make him dismissive of anything that feels abstract or large-scale. Policy work, systems change, and long-term research all sound like distractions from the real work to him. Can also overestimate how transferable his own scrappy resourcefulness is.",
    communicationStyle: "Straightforward and warm. Talks the way he'd talk across the counter — no jargon, no performance, just honest observation. Uses examples from his own business constantly, which can feel limiting but is usually more illuminating than he gets credit for.",
    petPeeve: "Organizations that spend more on a website redesign than they spend getting to know their neighbors.",
  }
];

const AVATAR_COLORS = [
  { bg: "#001e46", text: "#8ecfd0" },
  { bg: "#003d5c", text: "#b0e4e5" },
  { bg: "#0a2e4d", text: "#00adb0" },
  { bg: "#1a3a5c", text: "#8ecfd0" },
  { bg: "#002b45", text: "#a0dfe0" },
  { bg: "#0d3b5e", text: "#00adb0" },
  { bg: "#001e46", text: "#b0e4e5" },
  { bg: "#143d5f", text: "#8ecfd0" },
  { bg: "#002842", text: "#00adb0" },
  { bg: "#0a3555", text: "#a0dfe0" },
  { bg: "#001e46", text: "#8ecfd0" },
  { bg: "#0d2e50", text: "#00adb0" },
  { bg: "#003352", text: "#b0e4e5" },
  { bg: "#0a2640", text: "#8ecfd0" },
  { bg: "#001e46", text: "#a0dfe0" },
  { bg: "#0d3858", text: "#00adb0" },
  { bg: "#002d4a", text: "#8ecfd0" },
];

const HEADSHOTS = {
  1: "data:image/webp;base64,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",
  2: "data:image/webp;base64,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",
  3: "data:image/webp;base64,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",
  4: "data:image/webp;base64,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",
  5: "data:image/webp;base64,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",
  6: "data:image/webp;base64,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",
  7: "data:image/webp;base64,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",
  8: "data:image/webp;base64,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",
  9: "data:image/webp;base64,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",
  10: "data:image/webp;base64,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",
  11: "data:image/webp;base64,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",
  12: "data:image/webp;base64,UklGRvoKAABXRUJQVlA4IO4KAAAQLwCdASqQAJAAPpVCm0klo6KhLdOqyLASiWYA05pMYJ5V/rPNyrj+Z/sHBS1b56vOv/O9g3oj8wTnK/+b0Iebt/t/2A92f2S+8B/gOtn9BX9evTt/bf4ff8jYMONbcekxnG/ZVQV2X/yPiBZSdcCZSsL+h9Mb/s+V3644Evo8fsc12RiXDc0O2YY9viaT43VWoelJRrAuRn9X2Zd87WCKtCy+gkQTRTxAKRGlialq2N6arbWJH02XObyajhUmPzfk8hdWcYY4dnA2bTBCyOGsVGuo/8codmLaIgAaUIMPWlUx2X2LQH4+UPSO7oy7j8FJqHAbzEu6/5AOtTGuHwMtePCZE8RAB+Tv8GizsOUDYPy1SzHo0Em622QENHWvDkXZDuZ8w/e6T8jkyVC6WVcj/eiONhN09LAfK2PrKpRb8yrCuem/40NmdtNLeP1en8dYWqU86BukrFY6EM8r/duNXcw/1ho3IpgrlN3gmABLgmaxb6N2o2tWfkjYfY9pnCOAAP784gErynefQTsPyvP/7jHcV2smlNevqM0lXPw87yx/3TjlMjF20EEGzxQOzJqUGGgyac7xz2R8Zw6eGq0W0Kx71Txn3zC6gt+Fv039leRUP0Y3O0C242BnMJU2nuPiF7BkxLtfeNax6HGujZX+6Ld0Br+dRS2vZ7NT93AzBdSJfkk7FXxrvf6jhwNH63GYxOOiv2Cwmd/VAB8/LP9yRtz7N7UZ75Zn+/83YHbkDV67O+t9Z97oOQ3EkuPFv1HM6r7BK0xjgoIKyVos+C+c+xGZFRUUP51hyi7ySQ5aih4srOSkz2UuNuq8ZfYHaX+nF/nA9sFqs36b/GTtcmfn47Vnj1Lbwn+G3Gme+0zTCQn12qkGup1n2vYdd/GT+HKsCWLy9MAqNg1h5S0opbXHnkVbKz+4chQDisk5YR6oeCVXGNZOfdL20KZHZGyfjRRMbYGl7r7j6qouMISz0s/9pI0a/4KPMfwVFPfMrwOInvVLTIlaQubhF35Vqd7e7YPGf8aJfmhJ4AYaVPpkIgEwIMKF40V6d0ESwbaqSuhz2o/Zf8k/dE8HeD245amJ8zRTfv/kVnQRDpNDQwTqkHJdtgBydgL+L0leEx5eIZlBI/V40LvUmKJOsBGv5qadCiOa6ObrmkG3k/qUJLInor+jrSM02Y+gcQVlcMZXHtfEZrEnwSAfLz/lCp5z7XIL/pf3ER06z7obUwV9pTJIGDhx2HFpD8WWsos2YjJOx/dbn+TpNwiVPjJw9YF0zQjhDvwhW6EQw8kVrP70nnED4j6wJ4OFtm2vlr522bUNVR1z0mSiJv270SQ4jeP04ZrIPgueWCHFRk7/77G7uPVswBMf/BLSB9h+gob6v86fc6U/AzX9GcRmQ0OsNpB3bfUJUhWAB72d1miVl0Qnkietez3SuY6/ky3h7RaoTpsnWPnEw2Vj/PFOrXwVu1ARkdfssDHopFDgM/muLxjj2DBAj3dwS6mrCGcaENc8owLkG2ffKOqKI6NFQlE8LmWlUOS4F6E2yQ5Lkip1G3Gi1sl8vKVSknxIpwDpeXqjeAvsGXKKmc/wdu+QV/oExFR9QjSEfOfT6P9lHowxfqo/GYbXNKqWmoNWwLv6e6WXCE0alxcdVshmDrRMeshZaWYr5WbpYqjZulban0DPbnD0y/iXMDAmkzBYGKChcIIx9yHBx0Z/QndP7Ad4kmblZczSbhyv1kcykpVBC4te0D1btejL1D2PB6FtYu4TmnokeWS/9WzPbcHK+p4vJZ6BuRAJbseOpWqxzvx8+gA8ftlC5homVJlSrwgbv6Joov0uhbSctRjXe8ez0BS6rW+bg+BrRXbTawmYSDNDnkWFxXICVxM+WRKhmHLgT4X6lBlDwpT0jGMm6Y1SZMwbCLSJ1zXi2zlwdvpbRGH6esMsVFD0eFwBu6j/2kmWMbUofFuPHGDqkKtGnO+2UyrFPqeSSp78bNTq96g5DZd3lDFUmAgWhnBkuiGZTeRuF/h1WG1+qZ/llnB+h50wJdmD0psXP03MBVE+O2+OBGOSlcJQykslLH69dZC+7cK/Rb2cnIKvOH8SNbBanQil9KDOBqP/FcZPt0gyC4uT+h9y8RsR6QnSkXBuzd0+gOZvqWlEbkgFRL3kF1cIJBSJru88n1jtOhm0N8C3S+E8fKvSzGX1A2mLsYuSlAQUi65SrToQEGP5FryB2gLV6XWsGb1K+9X5cNdJ3gJmC+nciJXaMXkaxXOv+VJ9sR5YuFIIvbYv1G5K5ntsek3M3PTFxxpK3Z6r7x+kr2bR5c9pU6KGyxZt8dpjz69QjKlCnTBFZNRkkpTJIaVPJ+J+tZ9MPYPWn9mLtEvkB+uyJv/quQu8DtYUZHCHAbr03rwi6JYvCqk2ThnW4WT2BlKtlBx/nVPoiChtaj08/Sike0IXn+P+zSH1C/cIY95OQk1OQgshIDHODOj6852zqUx6OoqdHQZzo4j3Nc837BOA1VOkVehevVNyT/mP23H/I8T/9RwMYT9zo/Was03GIV+MPrRtT8TY18dthylvJ/jCUnUJW+WucjZLvbt0/QV9WEyL0cpqUc8LUlgFAsWrqhfVCETTftnSgmDZ2K/RwhMW1/MUKNhy3op/GFNqZT783vIhimGpMAr8C54JVNPq6kG5+j475+yaqk1BwZEQHoL4uIntuZMzrpYkMTNUvj1Lxpl6lyBciwaC2AQfw65kwKwV3RgMi8b5lSi49ore0C+0Ta65jz3QqKfxbZAj9jcXllALjfTpQoBwXLQT3C7NLAd8E34aw47aJf/OuAeEsFdo87dn0LEKWIB3qCWE2Vf44mCQurxOiNiajn5RyNuU6bA9nV53yUSLT18XK28PLMgW9QyLCRvX8JNQtQc5AWKWv7xJ+X/x/1pkDkmJGSm/hn4C5uvNVEbeHZo3YGQfDEE6ZXqc9mkyK/GOmmMA92csaaYkjT6aI51w7WhQjVKtCnUfliVup7gN1RbZkRXyi87NgVqhyDEcyc1Mftr15JYvPq9gXmRgc4r+H6M7gQpdSGcBoDBj/sgq4LEFAUHtsR263iDx8CtI6z+WgRymICKXwYV4ih9Y99z/96/DlpeztDSDcSTtxOzPbfDx7ueCWJgb3td1Q6WyCbFwT8MmT/1cjuhp+l2i18Pnu//TvT7Za9CGbKsNhUjI9/1lErR9XFGoobstn2UaBaYN+HdQIhfZrJe9+BEkIhMpS1vxRAAkxHsx9Blzfo7oppOmRS4Q9oWRZrtAPnlNN7KBXIVBuGi2Jxei4w45cc2FJQTBETrD4d0p1jXfaVHWEo3BuvLyWLf66QY3S7utwO/cQ5PwrjKBjo+Tgh3r6mkZV4KYJdAUV8JaYS/+f08FxN6Rp7qUOMWKzMlyRTa371w1d5t5yJTNAfjkMd8oufja76EcH3kTZjtwBQqLEDJ4wy2vjgByHOsNw+dn0zG1Auj+oTEWd/eLycuGE0PSiOtDL2iCJSMMQnVU57cM8zNcn7dKrZQiNslaLs+FsDXS3A6W5ZS+C0iTJibVAwLOOA80vsJFAL6bVIcWwMf5th8f9lg6OSVi3kKfWG8o1GwDrvNVrQ5BmV6Z58Ifo3fp2lpKVl5hn9LdosSa0R96gk9JZog1/PC/Sm8xFpwBqQyZe8yvAbgo+P4643+XtwGnYz108Wb8N4B+ihsqllRrJSVEjC2pdyJ0ZbVvEXttgjACIma224KAAAAAAA==",
  13: "data:image/webp;base64,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",
  14: "data:image/webp;base64,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",
  15: "data:image/webp;base64,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",
  16: "data:image/webp;base64,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",
  17: "data:image/webp;base64,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",
  18: "data:image/webp;base64,UklGRmAJAABXRUJQVlA4IFQJAAAQLACdASqQAJAAPpVCm0mlo6MhK3Pr2LASiWQA09Ya3751fnvOutf+K4fE3/b5ky9T3iudMDzI+bt6SfQA/s38A63n0AP2j63P+9+dVqoXl7+o9veO3oKp8e0WWpDQfaGrWqqHjf9DyYfW3Te+x39uPYw/Z1E6weEr28ppShwDXdZEZBq1rSBbPcKZ9onMdOG9n7kXC02NAZOxPL7VPmXY5xkwRWes7QaBXFfox/6PEWVfJRZSjgMxZlXdsjbVhdDtKvYYBJ0symtXP6ozjpA2RaEuHXaG7JRJFc/paidb/6UHSBD5UwNy1FGErY0P5pbBw9Ns7Qf6znGUAbTSElgmDIkr//fKHUfke/yoRV48SgS7r2k9XqrnytxmC4Xg81ZBCbiMLW9IFh4c2MJQ9pmvkmoSaUZ7ui4Bto3FqHELOT5pw96fCLmZLSb4duij1qnCO4CUEm0am5jvPudOc8Hjub10eN0XnIgAAP76+AR0cT+b/pQodZXyTi/38Wg+37z42tf0nDCN8bRiOWgdDSo+wMPq+Kost/x7afsPqotNTAdEHLumwYaAkQbEOg2hV6cAGNYd4ihmpbqWAltYQ6xredErRQqT7dtoZkBQTRAv/9shAU6c+PznvmexsjlsCizOF9AbTxhZur6WdP2+MCZ4rnHd2IGXXlysg/Lxt03bOzcziqgygnSTCuY86lMNw8vK7EzzellZoeHNWl/upje82I1at3Oo6VLVn9WmH12IxwXjaVoVVx7WXmN6yuEvy07lA43tOJ2uAZxBc+9wEcJw87yu7NvJiIa+WUV0FxQH69R1DYsd2d3lLsbuf/LUIG6Xe4zoFcJ3YnyciPvrc5b7TMcqnLstjjfDtAzM8vrLypensj+Fshv3eMi4soseeGCawEMv7scwpVH2HeJtx9vjFHUgBAhwDWxHUII0b+LuPOPy7je0v2noa/6h73UJHUjH/Tetfe3yWsf4UhssG8tf1V35S7vomui6EOKS6K+ij+7lvTor+l45zfHsd1vDAQZfaszwe41LZxEe6lyACcsAky9zt9jYhpMC/wsfH1LQSd2rv9ZzNSTQvtbAKzYmuUtovz0OMygJi0jnnAeoQTd+4yRqEUcpeX75cr9RaAHEZggYytwAhqeEZyVS994HtSaGve9MBnmrSB+Fx2t7zfpLPsv8Bo3bcSn6IkD2d5ERBi/UpscVMmxnU5UIKYkNmy4KnJCNv+EY2vc0Y0U9rlNOsUQQHSEel7/Pqttzu8UPh3Z1xT/9YtCE9zuqTRvGGuiOvnv1MzF6z8Jg/k1JwgxgeZqNAmlI51R+Ou92p/JYxAwKI6u6HkqsOWEl9VHN3Hz/yje38kxni4lbNeGg++t6z2hpWmSBtvcYty1fGncTmHc2HRevPK8YUS0LN2WnND20piz+et/AY1vzxYEnT/IP0Nn7Ggn5z4cuGWADcFtARqCV+6UGiNGrIwkC5ytVkK7NSDdkJ5F6lYr7smvqvuNk0mwJXoBFfRZjr52UBXsWK8kQj0bBIarYroOnAES1puy6P/Ys5mVyOpgSnj//xjmhmqsENxMLUX8J/fJC/P8bNFEvDJwwGgUPVHER2L9Repo/LHyTHtXU6DqO4LuV4sj540pfZuXB0a0c/QA7WkxHSBEmSj76QKIhLK4DaUDIGtk6Od+37tie7LAGr5R6mRsIEVeR5KRp37wGOYePBVNFgkt9tSMi1Mx6S+OX6EAxfIWABpj44/q4hYETke+7b3NLAoDX9kyFPPKNiH82R3aC+9xbVy+e1Is7YOUgHCeA+TO2cLbofJEBfAaZC+xPvYm1k+gjHDr65DlN9pIRF2enQdK0XNbnFw4Xj2Xwgwo5a3paJ+W1a1TdgHy0zgsfR20fOadqSxzv9eVLI/qE17Ur8n0X7TeEypoiRr5wFCCcvXHXG5N3PX4Asz07cb+ZVhx304VKq7sUaq+qqfsnuE2wd5ehafvdhcB5Et9V+LBZIaPWlGTfn2nGn6s+LgauPJeEbg+DAbZNKoTUa3YzRbUTIT+ZwbhF1p+Qcz+k5+8i1cnl/SYKqujC+lWsZ7dzSv+wjRvPKYj1zDNCqUr/FGpfjbTFouknD2SRB0YSZWwZMAIwIl/Ws44dSm+vqFyofLYOBkZYlq1NFNmmuRzO27LFq6Sry4xBf5yYqhu25C2rLSO0JmOvSa6JUWnwmws6Px3HiE23ToZFOlwBXjZMeozp7DAuGi4itBLT8gsPOub7J0zjs+EVAiUyz7swhbdo8/HogWI6TpW38SHQLFt/eTChMAebUhAPF1Ugfw/V28XcSn5FkTLVjjeHHuRrNQUQpAqvpvkwlqyhqkXuupBas5/fnFKYBXhk0z0bLszYtwNQ9++YYRWczREBgwUdiuvEMq4Z9x+YebLs6kvlIZ6Arc6rPCnzDnjb2mryE7dwYfnZW6vMrDYNLC49TdBFxYc4vOnGqdP21UBvmyXTR/fIkeZGBlVwvEWC9EszmPK6E9JxMV4J1eN2M3yeNZ7v2hNj/46IZi3x1lQumH3F5QHm0LnNinfZe3lJQE7CMsUqmOsyG0980LasGi9S5GDemBvqYWCULTOUlhvZcVd4y5VlJwbX/8oz8ZKvT3QnjOtKxTT3gbb+75Wa5Z4LE+9DDXd08WWltDKyFLzZJ6bdLM5fnGOYp5Uq6pwD/HNJmzJMxX0V6XUDf43ZwI/Km9qX/vOYeQygTQoa47ECt8RZkwET059FXac61GH7kjzZ6/Irxrn/jX7LxNexevNgSwAoiiMQw8VpTRbdu57DQJIJA3EjtAIE/4hR9EEPUPZr2+iMy9KjWveGgXOjWoPxsvAHhnmz1sW1xyNpnZ+6fb+CHiP2gdqQAR/TAxfVUa/Vc81UUigSps6Qp1H9OaXbuBV9FYLwtfpfI7lFTmcVdhncMJ6BPBz0+nsXbPo0e00NqOLpkMGWhAl9fcUN+In5fMEnTH7oZ7TvWSIYxuwxSz3BFAtkQCR9xUlP0DOsvuIrdDhMUwz90tp88ASD7kpMV7d34/zF4lu046WTldbGWTeUgd1UWxaOtlSUZKAG+VtHDjfnzcZHWiuspCkvU/YQ4g7cCvM8/stx8qvfC+K4GT024AcXiwrQQBR8OvmJzNZtgN11QVM6n618QSVppeksdmErwOqT5dMWq+RLOURU7ExnZHIWW1igeoAAAAA=",
};

function Avatar({ name, personaId }) {
  const src = HEADSHOTS[personaId];
  return (
    <img src={src} alt={name} style={{
      width: 96, height: 96, borderRadius: "50%",
      objectFit: "cover", flexShrink: 0,
    }} />
  );
}

function SectionLabel({ children }) {
  return (
    <h4 style={{
      margin: "0 0 5px", fontSize: 10,
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      fontWeight: 700, textTransform: "uppercase",
      letterSpacing: 1.4, color: "#7A8290",
    }}>
      {children}
    </h4>
  );
}

function Tag({ label }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px",
      fontSize: 11, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      fontWeight: 500, color: BRAND.navy,
      backgroundColor: "#E8F7F7", borderRadius: 20,
      letterSpacing: 0.3, lineHeight: "18px",
    }}>
      {label}
    </span>
  );
}

function PersonaCard({ persona, index, isSelected, onToggle, isExpanded, onExpand, maxReached }) {
  const canSelect = isSelected || !maxReached;

  return (
    <div
      style={{
        backgroundColor: BRAND.cardBg, borderRadius: 12,
        border: isSelected ? `3px solid ${BRAND.navy}` : `1px solid #D5D9E0`,
        borderTop: isSelected ? `3px solid ${BRAND.navy}` : `3px solid ${BRAND.teal}`,
        boxShadow: isSelected
          ? "0 8px 28px rgba(0,30,70,0.18)"
          : "0 2px 8px rgba(0,30,70,0.08)",
        transition: "all 0.25s ease",
        cursor: "pointer", overflow: "hidden", position: "relative",
        display: "flex", flexDirection: "column",
      }}
      onClick={() => onExpand(isExpanded ? null : persona.id)}
    >
      {isSelected && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          width: 26, height: 26, borderRadius: "50%",
          backgroundColor: BRAND.navy,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7L6 10L11 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Name & Title — fixed height */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", minHeight: 96 }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{
              margin: 0, fontSize: 18,
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontWeight: 700, color: BRAND.navy, lineHeight: 1.3,
            }}>
              {persona.name}
            </h3>
            <p style={{
              margin: "4px 0 0", fontSize: 13,
              fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
              color: BRAND.midGrey, lineHeight: 1.4,
            }}>
              {persona.title}
            </p>
          </div>
          <Avatar name={persona.name} personaId={persona.id} />
        </div>

        {/* Expertise Tags — fixed height */}
        <div style={{ marginTop: 16, minHeight: 52 }}>
          <SectionLabel>Expertise</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
            {persona.tags.map((tag, i) => <Tag key={i} label={tag} />)}
          </div>
        </div>

        {/* Signature Question — fixed height */}
        <div style={{ marginTop: 16, minHeight: 72 }}>
          <SectionLabel>Signature Question</SectionLabel>
          <div style={{
            marginTop: 4, padding: "10px 14px",
            backgroundColor: "#F0F9F9", borderRadius: 8,
            borderLeft: `3px solid ${BRAND.teal}`,
          }}>
            <p style={{
              margin: 0, fontSize: 13,
              fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
              fontStyle: "italic", color: BRAND.navy,
              lineHeight: 1.5,
            }}>
              "{persona.signatureQuestion}"
            </p>
          </div>
        </div>

        {/* Expanded Fields */}
        {isExpanded && (
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Perspective", value: persona.perspective },
              { label: "Blind Spots", value: persona.blindSpots },
              { label: "Communication Style", value: persona.communicationStyle },
              { label: "Pet Peeve", value: persona.petPeeve },
            ].map((field, i) => (
              <div key={i}>
                <SectionLabel>{field.label}</SectionLabel>
                <p style={{
                  margin: 0, fontSize: 14,
                  fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                  color: "#374151", lineHeight: 1.6,
                }}>
                  {field.value}
                </p>
              </div>
            ))}

            <button
              onClick={(e) => { e.stopPropagation(); if (canSelect) onToggle(persona.id); }}
              disabled={!canSelect}
              style={{
                marginTop: 4, padding: "10px 20px",
                fontSize: 14, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                fontWeight: 600,
                color: isSelected ? BRAND.navy : canSelect ? BRAND.white : BRAND.grey,
                backgroundColor: isSelected ? "#E8F7F7" : canSelect ? BRAND.navy : BRAND.lightGrey,
                border: isSelected ? `1px solid ${BRAND.teal}` : "none",
                borderRadius: 8,
                cursor: canSelect ? "pointer" : "not-allowed",
                transition: "all 0.2s ease", width: "100%",
              }}
            >
              {isSelected ? "Remove from Panel" : maxReached ? "Panel Full (7 max)" : "Add to Panel"}
            </button>
          </div>
        )}
      </div>

      {/* Footer — always at bottom */}
      <div style={{
        padding: "10px 24px", borderTop: `1px solid ${BRAND.lightGrey}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <span style={{
            fontSize: 12, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
            color: BRAND.teal, fontWeight: 600,
          }}>
            {isExpanded ? "Collapse" : "▶ See how they think"}
          </span>
          {isExpanded && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              style={{ transition: "transform 0.2s ease" }}>
              <path d="M3 8L6 5L9 8" stroke={BRAND.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); if (canSelect) onToggle(persona.id); }}
          disabled={!canSelect}
          style={{
            padding: "5px 14px",
            fontSize: 12, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
            fontWeight: 600,
            color: isSelected ? BRAND.teal : canSelect ? BRAND.white : BRAND.grey,
            backgroundColor: isSelected ? "transparent" : canSelect ? BRAND.navy : BRAND.lightGrey,
            border: isSelected ? `1px solid ${BRAND.teal}` : "1px solid transparent",
            borderRadius: 6,
            cursor: canSelect ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          {isSelected ? "Remove" : maxReached ? "Panel Full" : "+ Add to Panel"}
        </button>
      </div>
    </div>
  );
}

function PanelBar({ selected, personas, onRemove, onDownload }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      backgroundColor: BRAND.navy, color: BRAND.white,
      padding: "16px 24px", zIndex: 100,
      transition: "transform 0.3s ease",
      transform: selected.length > 0 ? "translateY(0)" : "translateY(100%)",
      boxShadow: "0 -4px 24px rgba(0,30,70,0.2)",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: selected.length > 0 ? 12 : 0,
        }}>
          <div>
            <span style={{
              fontSize: 14, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
              fontWeight: 600,
            }}>
              Your Panel
            </span>
            <span style={{
              fontSize: 13, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
              fontWeight: 400, color: "rgba(255,255,255,0.55)", marginLeft: 8,
            }}>
              {selected.length}/7 advisors
              {selected.length < 5 && ` · we recommend at least 5`}
              {selected.length >= 5 && selected.length < 7 && ` · looking good`}
              {selected.length === 7 && ` · panel full`}
            </span>
          </div>

          <button
            disabled={selected.length < 1}
            onClick={(e) => { e.stopPropagation(); onDownload(); }}
            style={{
              padding: "8px 20px", fontSize: 13,
              fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
              fontWeight: 600,
              color: BRAND.navy,
              backgroundColor: selected.length >= 5 ? BRAND.teal : "rgba(255,255,255,0.3)",
              border: "none", borderRadius: 6,
              cursor: selected.length >= 1 ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
          >
            Download Panel →
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {selected.map((id) => {
            const p = personas.find((x) => x.id === id);
            if (!p) return null;
            const colors = AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
            return (
              <div key={id} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 12px",
                backgroundColor: "rgba(0,173,176,0.15)",
                borderRadius: 20, fontSize: 13,
                fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
              }}>
                <img src={HEADSHOTS[id]} alt={p.name} style={{
                  width: 24, height: 24, borderRadius: "50%",
                  objectFit: "cover",
                }} />
                <span>{p.name.split(" ")[0]}</span>
                <span
                  onClick={(e) => { e.stopPropagation(); onRemove(id); }}
                  style={{
                    cursor: "pointer", color: "rgba(255,255,255,0.4)",
                    fontSize: 16, lineHeight: 1, marginLeft: 2,
                  }}
                >
                  ×
                </span>
              </div>
            );
          })}
        </div>

        {selected.length > 0 && selected.length < 5 && (
          <div style={{
            marginTop: 8, height: 3,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${(selected.length / 5) * 100}%`,
              backgroundColor: BRAND.teal, borderRadius: 2,
              transition: "width 0.3s ease",
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function VAPGallery() {
  const [selected, setSelected] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const maxReached = selected.length >= 7;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const removeFromPanel = (id) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const generatePersonaMd = (p) => {
    const safeName = p.name.replace(/[^a-zA-Z]/g, "_");
    const firstName = p.name.split(" ")[0];
    const content = `# ${p.name}
## ${p.title}

You are ${p.name}, a ${p.title.toLowerCase()}. You are serving as an advisor on a Virtual Advisory Panel for a nonprofit Executive Director who wants honest, perspective-driven feedback on their ideas, strategies, and decisions.

---

**Expertise:** ${p.tags.join(", ")}

**Signature Question:** "${p.signatureQuestion}"

**Perspective:** ${p.perspective}

**Blind Spots:** ${p.blindSpots}

**Communication Style:** ${p.communicationStyle}

**Pet Peeve:** ${p.petPeeve}

---

## How to Use This Advisor

When responding, stay fully in character as ${firstName}. Apply your unique lens to whatever the Executive Director shares with you. Ask your signature question when it is relevant. Let your communication style, perspective, and even your pet peeves shape how you engage. Be real — supportive when the idea earns it, challenging when it needs it.

Do not break character. Do not offer generic advice. Respond the way ${firstName} would respond — with all of ${firstName}'s strengths and blind spots intact.
`;
    return { filename: `${safeName}.md`, content };
  };

  const blankTemplate = `# [Advisor Name]
## [Title / Occupation]

You are [Advisor Name], a [title/occupation]. You are serving as an advisor on a Virtual Advisory Panel for a nonprofit Executive Director who wants honest, perspective-driven feedback on their ideas, strategies, and decisions.

---

**Expertise:** [list 2-3 areas of expertise]

**Signature Question:** "[The one question this advisor always asks]"

**Perspective:** [How this advisor approaches problems — what lens do they apply? What do they prioritize?]

**Blind Spots:** [What does this advisor tend to undervalue or miss? Where is their lens too narrow?]

**Communication Style:** [How do they deliver their feedback? Are they blunt? Warm? Methodical? Story-driven?]

**Pet Peeve:** [What sets them off in a meeting? What behavior or pattern do they have zero patience for?]

---

## How to Use This Advisor

When responding, stay fully in character as [First Name]. Apply your unique lens to whatever the Executive Director shares with you. Ask your signature question when it is relevant. Let your communication style, perspective, and even your pet peeves shape how you engage. Be real — supportive when the idea earns it, challenging when it needs it.

Do not break character. Do not offer generic advice. Respond the way [First Name] would respond — with all of [First Name]'s strengths and blind spots intact.
`;

  const getPlatformSetup = (platform) => {
    const setups = {
      claude: `SETTING UP YOUR PANEL IN CLAUDE

1. Go to claude.ai and click "Projects" in the left sidebar
2. Create a new Project and give it a name (e.g., "My Advisory Panel")
3. In the Project's knowledge base, upload ALL the files from the "Advisors" folder in this download — every advisor you selected, plus the Session_Guide.md file. The Session Guide tells the AI how to run your panel sessions.
4. In the Project instructions, paste the following:

   "You have access to multiple advisor personas and a session guide. Follow the session guide to facilitate advisory panel sessions. When responding as a specific advisor, embody that persona fully using their profile. Stay in character throughout the conversation. Do not blend advisors unless the user asks for a synthesis."

5. Start a new conversation within the Project whenever you want to consult your panel

To swap an advisor: Remove their file from the Project knowledge base and upload a replacement. The other advisors are unaffected.`,

      chatgpt: `SETTING UP YOUR PANEL IN CHATGPT

1. Go to chat.openai.com and click "Projects" in the left sidebar (or create a Custom GPT under Explore GPTs > Create)
2. Create a new Project or GPT and give it a name (e.g., "My Advisory Panel")
3. Upload ALL the files from the "Advisors" folder in this download to the project files or GPT's knowledge section — every advisor you selected, plus the Session_Guide.md file. The Session Guide tells the AI how to run your panel sessions.
4. In the instructions, paste the following:

   "You have access to multiple advisor personas and a session guide. Follow the session guide to facilitate advisory panel sessions. When responding as a specific advisor, embody that persona fully using their profile. Stay in character throughout the conversation. Do not blend advisors unless the user asks for a synthesis."

5. Start a new conversation within the Project or GPT whenever you want to consult your panel

To swap an advisor: Remove their file from the project and upload a replacement. The other advisors are unaffected.`,

      gemini: `SETTING UP YOUR PANEL IN GEMINI

1. Go to gemini.google.com and create a new Gem
2. Give your Gem a name (e.g., "My Advisory Panel")
3. In the Gem's instructions, paste the contents of ALL the files from the "Advisors" folder — every advisor you selected, plus the Session_Guide.md file. The Session Guide tells the AI how to run your panel sessions.
4. Add this instruction at the top:

   "You have access to multiple advisor personas and a session guide. Follow the session guide to facilitate advisory panel sessions. When responding as a specific advisor, embody that persona fully using their profile. Stay in character throughout the conversation. Do not blend advisors unless the user asks for a synthesis."

5. Start a conversation with your Gem whenever you want to consult your panel

To swap an advisor: Edit the Gem's instructions to remove one advisor's profile and paste in a replacement.`,

      other: `SETTING UP YOUR PANEL

These advisor profiles work with any AI chatbot that supports system prompts or custom instructions.

1. Create a new conversation or custom setup in your preferred AI tool
2. Upload or paste ALL the files from the "Advisors" folder — every advisor you selected, plus the Session_Guide.md file. The Session Guide tells the AI how to run your panel sessions.
3. Add this instruction:

   "You have access to multiple advisor personas and a session guide. Follow the session guide to facilitate advisory panel sessions. When responding as a specific advisor, embody that persona fully using their profile. Stay in character throughout the conversation. Do not blend advisors unless the user asks for a synthesis."

4. Start a conversation whenever you want to consult your panel

To swap an advisor: Remove their profile text and replace it with a new one. Each advisor is self-contained.`
    };
    return setups[platform];
  };

  const generateReadme = (platform, selectedPersonas) => {
    const advisorList = selectedPersonas.map(p => `  - ${p.name} -- ${p.title}`).join("\n");
    const platformSetup = getPlatformSetup(platform);

    return `HOW TO USE YOUR VIRTUAL ADVISORY PANEL
======================================

You have built a panel of AI-powered advisors, each with a distinct perspective, communication style, and set of blind spots. This guide will help you set up your panel, run your first session, and turn diverse feedback into a clear decision.


YOUR PANEL
----------

${advisorList}


WHAT IS IN THIS DOWNLOAD
-------------------------

  - Advisor profiles: one markdown file for each advisor you selected. Each file contains everything an AI chatbot needs to embody that advisor's perspective.

  - Session Guide (Session_Guide.md): upload this file to your project alongside your advisors. It tells the AI how to facilitate your panel sessions — greeting you, listing your advisors, guiding the conversation, and helping you synthesize feedback into a decision.

  - Blank template (Custom_Advisor_Template.md): use this to create your own advisor if you need a voice the library did not cover. Fill in each field and add it to your project alongside the rest of your panel.


${platformSetup}


RUNNING A SESSION
-----------------

Step 1: Start with your position

  Do not ask an open-ended question. Present a specific idea, decision, or proposal and explain your current thinking. For example:

  "I am considering launching a fee-for-service consulting arm to diversify revenue. Here is my reasoning: [your reasoning]. I would like to hear from Gloria on this."

  This gives your advisor something concrete to react to rather than generating opinions from scratch.

Step 2: Consult individual advisors

  Ask for feedback from one advisor at a time. This keeps each perspective distinct and prevents the AI from blending voices. For example:

  "Now I would like to hear from Marcus on the same proposal."
  "What would Priya flag about this from a legal perspective?"

Step 3: Read the disagreement

  Your advisors will disagree. That is the point. Here is how to read it:

  - If multiple advisors flag the same concern from different angles, that is a real blind spot in your plan. Pay attention.

  - If advisors disagree with each other, that means the decision involves legitimate tradeoffs. You are the one who gets to weigh them.

  - If an advisor's pushback makes you uncomfortable, that is usually the feedback worth sitting with the longest.

Step 4: Synthesize and decide

  After hearing from your panel, ask the AI for a synthesis:

  "Based on all the feedback from my panel, summarize the key tensions, identify where there was unexpected agreement, and help me name what I would need to believe in order to move forward with my original position."

  This moves you from "I heard seven opinions" to "I see the real tradeoffs and I know which ones I am willing to accept."


TIPS
----

  - You do not need to consult every advisor every time. Pick the 2-3 most relevant voices for each decision.

  - Revisit your panel composition periodically. As your organization evolves, different perspectives may become more or less relevant.

  - The blank template is there for a reason. If you find yourself wishing for a voice that is not on your panel, build one.

  - Disagreement is data, not a verdict. The panel is designed to surface tensions. The decision is always yours.


DISCLAIMER
----------

The Virtual Advisory Panel provides fictional advisor personas for use with third-party AI platforms. Filament does not operate, host, or control the AI sessions conducted with these personas. All advice generated during a session is produced by the AI platform you choose and does not represent the views, recommendations, or professional guidance of Filament or its staff. The personas are designed to simulate diverse perspectives, not to replace qualified professional counsel. Filament assumes no liability for decisions made based on AI-generated feedback.

All advisor personas are entirely fictional. Any resemblance to actual persons, living or dead, is purely coincidental and unintentional.


Built with the Virtual Advisory Panel by Filament.

Questions? Contact Paul Durban at pauld@fes.org
Follow Paul on LinkedIn and subscribe to his newsletters!
`;
  };

  const generateSessionGuide = (selectedPersonas) => {
    const advisorSummary = selectedPersonas.map(p => 
      `- ${p.name} (${p.title}) — Signature question: "${p.signatureQuestion}"`
    ).join("\n");

    return `# Virtual Advisory Panel — Session Guide

You are a session facilitator for a Virtual Advisory Panel. Your role is to help the Executive Director get focused, actionable feedback from their panel of advisors. You have access to each advisor's full profile. Follow this guide to run effective sessions.

---

## YOUR AVAILABLE ADVISORS

${advisorSummary}

---

## HOW TO FACILITATE A SESSION

### When the user starts a new conversation or says hello:

First, check whether you already know about their organization from earlier in the conversation. If you do not, start here before anything else:

Greet them warmly and ask for a quick snapshot of their organization. Keep it to ONE question — do not make this feel like an intake form. Something like:

"Welcome! Before we bring in your advisors, I need a quick snapshot of your organization so they can give you relevant feedback. You can:

  - Share your website URL and I will pull the key details from there (fastest option)
  - Upload a recent strategic plan, annual report, or any document that describes your organization
  - Or just tell me in a few sentences: what you do, who you serve, and roughly how big you are (team size, budget, whatever feels relevant)

Any of these works — pick whichever is easiest for you."

Accept whatever they give you, even if it is brief. If they share a URL or document, read it and summarize what you learned back to them for confirmation before proceeding. Hold this context for the rest of the session — every advisor should factor it into their feedback. If an advisor needs a specific detail the user has not provided (for example, Gloria needs to know about the budget and the user did not mention it), that advisor can ask within their response naturally, in character.

Do NOT ask follow-up questions about the organization before starting. Get the snapshot and move on. You can always learn more as the session unfolds.

Once you have their organization context (or if you already have it from earlier), remind them of who is on their panel:

Example:
"Welcome back! Here is your current panel:
${selectedPersonas.map(p => `  - ${p.name} — ${p.title.toLowerCase()}`).join("\n")}

What are you working through today?"

### When the user presents an idea or decision:

1. Acknowledge what they have shared. Briefly reflect back the core of their idea so they know you understood it.
2. Ask which advisor they would like to hear from first. Remind them of the full list if needed. If they are unsure, suggest 1-2 advisors whose lenses seem most relevant to the topic and explain why.

### When responding as an advisor:

1. State clearly which advisor is speaking (e.g., "Here is Gloria's take:").
2. Stay fully in character using that advisor's perspective, communication style, blind spots, and pet peeves as defined in their profile.
3. Apply their signature question if it is relevant to the topic.
4. Keep the response focused and direct — aim for 2-4 paragraphs, not an essay.
5. Do NOT blend multiple advisors into one response unless the user specifically asks for it.

### After delivering an advisor's feedback:

Show the user their full panel status so they can see at a glance who they have heard from and who is still available. Format it as a simple list with checkmarks next to advisors who have already weighed in, and include a brief description of each advisor's lens. For example:

"Here is where your panel stands:

  ✓  Gloria Whitfield      — financial viability, long-term costs
  ✓  Marcus Ellery         — organizational capacity, team reality
     Priya Chandrasekaran  — governance, legal risk
     DeShawn Williams      — frontline client experience
     Rosa Hernandez        — grassroots community trust

Who would you like to hear from next, or would a synthesis be helpful at this point?"

Use each advisor's actual expertise tags or a brief summary of their perspective for the description — not their full title. Keep it short enough to scan quickly.

Then let the user choose. If they seem unsure, suggest 1-2 advisors whose lenses seem most relevant to the topic and explain why (for example, "Given that your proposal involves legal liability, Priya might be a good voice to hear from next").

Do NOT automatically cycle through every advisor. Let the user drive the pace.

### When the user has heard from 2 or more advisors:

You may gently offer the option to synthesize, but do not push it. Something like: "You have heard from [names]. Would you like to hear from anyone else, or would a synthesis be helpful at this point?"

### When the user asks for a synthesis:

Provide a clear summary that includes:
1. Key tensions — where advisors disagreed and why
2. Unexpected agreement — anything multiple advisors flagged from different angles (this usually signals a real blind spot)
3. The core tradeoff — what the user would need to believe or accept in order to move forward
4. A clear restatement of the decision the user faces, framed as a choice rather than an open question

Do NOT make the decision for them. Frame the synthesis so they can see the tradeoffs clearly and decide for themselves.

### When the user starts a new topic:

Recognize that this is a fresh session. Do not carry over assumptions from the previous topic. Ask them to present the new idea and reset the process.

---

## COMMON STUMBLING BLOCKS TO WATCH FOR

- If the user asks a vague or open-ended question like "what should I do about revenue?", ask them to share their current thinking first. The panel works best when reacting to a position, not generating options from scratch.

- If the user seems overwhelmed after hearing from several advisors, acknowledge that directly. Say something like: "That is a lot of different perspectives. Would it help if I pulled out the two or three key tensions so you can focus on what matters most?"

- If the user only wants to hear from advisors who will agree with them, gently note that the panel is designed to surface tensions, not confirm decisions. Suggest an advisor who might push back and explain why hearing that perspective could strengthen their plan.

- If the user asks you to break character or respond as "yourself" instead of an advisor, you can step out of advisor mode and respond as the facilitator. Make it clear you are no longer speaking as a specific advisor.

- If the user asks about an advisor who is not on their panel, let them know that advisor is not currently available and remind them of who is. Mention the blank template if they want to add a new voice.

---

## TONE AND APPROACH

- Be warm and professional. You are a skilled facilitator, not a robot.
- Keep things moving without rushing. Some users will want to linger on one advisor's feedback. That is fine.
- Use the user's own words when reflecting their ideas back to them.
- Never be preachy about the process. If the user wants to skip steps or go straight to synthesis, let them.
- Remember: the goal is a decision, not a discussion. Everything you do should move the user closer to clarity.
`;
  };

  const handleDownload = async (platform) => {
    setIsGenerating(true);
    try {
      const zip = new JSZip();
      const panelFolder = zip.folder("Virtual_Advisory_Panel");

      // Add persona files
      const selectedPersonas = PERSONAS.filter(p => selected.includes(p.id));
      const advisorsFolder = panelFolder.folder("Advisors");
      selectedPersonas.forEach(p => {
        const { filename, content } = generatePersonaMd(p);
        advisorsFolder.file(filename, content);
      });

      // Add blank template (at root level, not in Advisors folder)
      panelFolder.file("Custom_Advisor_Template.md", blankTemplate);

      // Add session guide (in Advisors folder so it gets uploaded with the advisors)
      const sessionGuide = generateSessionGuide(selectedPersonas);
      advisorsFolder.file("Session_Guide.md", sessionGuide);

      // Add readme
      const readme = generateReadme(platform, selectedPersonas);
      panelFolder.file("README.txt", readme);

      // Generate and download
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Virtual_Advisory_Panel.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
    }
    setIsGenerating(false);
    setShowPlatformPicker(false);
  };

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: BRAND.offWhite,
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>

      {/* How It Works — horizontal stepper */}
      <div style={{
        maxWidth: 800, margin: "0 auto", padding: "32px 24px 44px",
      }}>
        <div style={{
          display: "flex", gap: 0, alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
          {[
            {
              step: "1",
              title: "Browse & Select",
              desc: "Each advisor has a signature question — the one thing they'll always push you on. Expand any card to learn how they think and where they're blind. Choose 5–7 for a well-rounded panel.",
            },
            {
              step: "2",
              title: "Download Your Panel",
              desc: "Your download includes advisor profiles, a session guide that teaches the AI how to facilitate your panel, and a blank template for creating your own. Works with any major AI platform — Claude, ChatGPT, Gemini, or others.",
            },
            {
              step: "3",
              title: "Run a Session",
              desc: "Present your idea to each advisor and get feedback from genuinely different perspectives. Your download includes a guide for running your first session and moving from feedback to a decision.",
            },
          ].map((item, i) => (
            <div key={i} style={{
              flex: "1 1 220px", display: "flex", flexDirection: "column",
              padding: "0 20px", position: "relative",
              borderLeft: i > 0 ? `1px solid ${BRAND.lightGrey}` : "none",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  backgroundColor: BRAND.teal, color: BRAND.white,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                  fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  margin: 0, fontSize: 14,
                  fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                  fontWeight: 700, color: BRAND.navy,
                }}>
                  {item.title}
                </h3>
              </div>
              <p style={{
                margin: 0, fontSize: 13, color: BRAND.midGrey,
                lineHeight: 1.55, paddingLeft: 38,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div style={{
        maxWidth: 960, margin: "0 auto",
        padding: "0 24px 120px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 20,
      }}>
        {PERSONAS.map((persona, index) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            index={index}
            isSelected={selected.includes(persona.id)}
            onToggle={toggleSelect}
            isExpanded={expandedId === persona.id}
            onExpand={setExpandedId}
            maxReached={maxReached}
          />
        ))}
      </div>

      {/* Bottom Panel Bar */}
      <PanelBar
        selected={selected}
        personas={PERSONAS}
        onRemove={removeFromPanel}
        onDownload={() => setShowPlatformPicker(true)}
      />

      {/* Platform Picker Modal */}
      {showPlatformPicker && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,30,70,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 200,
          }}
          onClick={() => setShowPlatformPicker(false)}
        >
          <div
            style={{
              backgroundColor: BRAND.white, borderRadius: 16,
              padding: "36px 32px", maxWidth: 480, width: "90%",
              boxShadow: "0 20px 60px rgba(0,30,70,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              margin: "0 0 8px", fontSize: 22,
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontWeight: 700, color: BRAND.navy,
            }}>
              Almost there!
            </h2>
            <p style={{
              margin: "0 0 24px", fontSize: 14,
              fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
              color: BRAND.midGrey, lineHeight: 1.6,
            }}>
              Which AI platform will you use? We will tailor your setup instructions accordingly.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { id: "claude", label: "Claude", desc: "by Anthropic" },
                { id: "chatgpt", label: "ChatGPT", desc: "by OpenAI" },
                { id: "gemini", label: "Gemini", desc: "by Google" },
                { id: "other", label: "Other / Not Sure", desc: "general instructions" },
              ].map((platform) => (
                <button
                  key={platform.id}
                  disabled={isGenerating}
                  onClick={() => handleDownload(platform.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 20px",
                    backgroundColor: BRAND.white, border: `1px solid #D5D9E0`,
                    borderRadius: 10, cursor: isGenerating ? "wait" : "pointer",
                    transition: "all 0.15s ease",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = BRAND.teal;
                    e.currentTarget.style.backgroundColor = "#F0F9F9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#D5D9E0";
                    e.currentTarget.style.backgroundColor = BRAND.white;
                  }}
                >
                  <div>
                    <span style={{
                      fontSize: 15, fontWeight: 600,
                      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                      color: BRAND.navy,
                    }}>
                      {platform.label}
                    </span>
                    <span style={{
                      fontSize: 13, fontWeight: 400,
                      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                      color: BRAND.midGrey, marginLeft: 8,
                    }}>
                      {platform.desc}
                    </span>
                  </div>
                  <span style={{ fontSize: 16, color: BRAND.teal }}>→</span>
                </button>
              ))}
            </div>

            {isGenerating && (
              <p style={{
                margin: "16px 0 0", fontSize: 13, textAlign: "center",
                fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                color: BRAND.teal, fontWeight: 600,
              }}>
                Generating your panel...
              </p>
            )}

            <button
              onClick={() => setShowPlatformPicker(false)}
              style={{
                marginTop: 20, padding: "8px", width: "100%",
                fontSize: 13, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                fontWeight: 500, color: BRAND.midGrey,
                backgroundColor: "transparent", border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}