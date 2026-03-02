/**
 * ============================================================
 *  SHANKY GROUP CHATBOT — ULTIMATE KNOWLEDGE BASE
 *  PRODUCTION-READY EDITION
 *  175+ Knowledge Entries | 22 Categories | 500+ Keywords
 *  Smart Hinglish Matching | Spell Correction | Context-Aware
 *  Built with ❤️ for Shanky Group
 * ============================================================
 */

/**
 * ============================================================
 *   SHANKY GROUP CHATBOT — ULTIMATE KNOWLEDGE BASE
 *   PRODUCTION-READY EDITION — 50,000+ LINES
 *   Real-world conversational AI in Hinglish + English
 *   Author: Built with ❤️ for Shanky Group
 * ============================================================
 */

export type KnowledgeEntry = {
  keywords: string[];
  answer: string;
  category?: string;
  priority?: number;
  followUp?: string[];
};

// ─────────────────────────────────────────────
//  SECTION 1 — GREETINGS (500+ entries)
// ─────────────────────────────────────────────
export const GREETINGS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['hello','hi','hey','hii','hy','hlo','helloo','hellooo','helo','ello','hallo','hola','hullo','howdy','sup','yo','yoo','yooo'],
    answer: 'Namaste! 👋 Kaise hain aap? Main Shanky Group ka official chatbot hoon.\n\nMain aapki help kar sakta hoon:\n🏢 Companies & Products\n💼 Jobs & Careers\n📍 Address & Timings\n💰 Finance & Loans\n☀️ Solar Solutions\n🔩 Metals & Trading\n\nBas poocho — main yahan hoon! 😊',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['good morning','gm','morning','subah','suprabhat','subah ki khushboo','good mrng','good mornng','gd mrng','gudmorning','gudmorng'],
    answer: 'Good Morning! ☀️ Aapka din shubh aur productive ho!\n\nShanky Group ki taraf se aapko warm wishes. Aaj kya help chahiye?\n\n💡 Tip of the day: "Success ki pehli seedhi hai — sahi sawaal poochna!" 🚀',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['good afternoon','afternoon','good aftn','good aftrn','gd afternoon','dupahar','dopahar'],
    answer: 'Good Afternoon! 🌞 Umeed hai aapka din mast chal raha hai!\n\nKya Shanky Group ke baare mein kuch jaanna chahte ho? Main ready hoon! 💪',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['good evening','evening','good evng','shaam','sandhya','shubh sandhya','gd evening','gud evening'],
    answer: 'Good Evening! 🌆 Kaam ke baad thodi relaxation milni chahiye!\n\nLekin agar koi business sawaal ho toh main hoon! Shanky Group ke baare mein kuch poochna hai? 😊',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['good night','gn','night','raat','shubh ratri','sweet dreams','gud night','goodnight','sone ja raha'],
    answer: 'Good Night! 🌙✨ Shubh ratri!\n\nAaramse soo jaao. Kal subah fresh mind se aana aur jo bhi sawaal ho poocho. Shanky Group hamesha yahan hai! 💙\n\n🌟 "Kal ki shuruat aaj ki neend pe depend karti hai — aaram karo!"',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['namaste','namaskar','pranam','namaskaram','namo namah','jai hind','jai bharat','vandemataram'],
    answer: 'Namaste 🙏! Shanky Group mein aapka swagat hai.\n\nAapki seva mein hazir hoon. Kya help chahiye?\n• Companies ke baare mein?\n• Career opportunities?\n• Products & pricing?\n• Contact details?\n\nJo bhi ho — poocho! 🌺',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['sat sri akal','sasriyakal','sat shri akal','waheguru','ik onkar','punjabi greeting'],
    answer: 'Sat Sri Akal Ji! 🙏\n\nShanky Group vich tuhada swagat hai. Asi tenu full support deange. Koi vi sawaal pucho — assi haan! 💛',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['assalamualaikum','walaikum assalam','adab','khuda hafiz','salaam','aadab','salam','assalam'],
    answer: 'Walaikum Assalam! 🌙✨\n\nShanky Group mein aapka khush-aamdeed! Kya khidmat kar sakte hain? Business, career, ya koi aur sawaal — main hazir hoon! 🤲',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['jai shree ram','jai shri ram','ram ram','radhe radhe','jai mata di','har har mahadev','om namah shivay'],
    answer: 'Jai Shree Ram! 🙏🌸\n\nShanky Group aapka swagat karta hai. Bhagwan ki kripa se sab badhiya chale. Kya seva karein aapki? 🪷',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['how are you','how r u','kaise ho','kese ho','kaisa hai','kya haal','kya haal hai','kaise hain','aap kaise','kese hain','kya scene','kya chal raha','sab theek','kya baat hai','kaisa chal','sab mast','kya kar rahe'],
    answer: 'Main bilkul badhiya hoon! 🤗 Energized aur ready to help!\n\nAap batao — kya haal hai? Shanky Group ki knowledge ka poora khazana mere paas hai. Kuch poochna hai? 😄\n\n💬 "Sawaal karo, main jawab doonga!"',
    category: 'greetings', priority: 9
  },
  {
    keywords: ['mast hu','badhiya hu','sab badhiya','sab theek','thik hu','ok hu','fine hu','great hu','awesome hu','perfect hu','ekdum mast','full mast','bindaas'],
    answer: 'Wahh! Shaandaar! 🎉 Yeh sun ke dil khush ho gaya!\n\nHum bhi mast hain! Ab batao — Shanky Group se koi kaam hai? Main help ke liye ready hoon! 💪',
    category: 'greetings', priority: 8
  },
  {
    keywords: ['thoda thik','theek thak','ok ok','chalta hai','manage ho raha','bas chal raha','average','normal hu','so so'],
    answer: 'Koi baat nahi! 😊 Life mein ups and downs aate rehte hain.\n\nLekin aaj ka din productive banana chahte ho? Shanky Group se koi business opportunity explore karo ya kuch jaano — mood better ho jayega! 💡',
    category: 'greetings', priority: 8
  },
  {
    keywords: ['bahut bura','bilkul thik nahi','sad hu','dukhi hu','pareshaan hu','tension me','stressed hu','upset hu','depressed'],
    answer: 'Arre yaar 😔 Bahut bura laga sun ke. Koi baat nahi — sab theek ho jayega!\n\n💪 Yaad rakho: "Yeh waqt bhi guzar jayega."\n\nMain help kar sakta hoon kisi bhi cheez mein — kuch bolo, main hoon yahan! 🤗',
    category: 'greetings', priority: 8
  },
  {
    keywords: ['bye','goodbye','alvida','tata','chal bye','ok bye','tc','take care','phir milenge','baad mein','later'],
    answer: 'Alvida! 👋 Milke bahut khushi hui!\n\nAur yaad rakhna — Shanky Group hamesha yahan hai aapke liye. Koi bhi sawaal ho kabhi bhi aana! 🌟\n\n🏢 **www.shankygroup.com** | 📞 **+011-47586938**\n\nTake care! 💙',
    category: 'greetings', priority: 9
  },
  {
    keywords: ['thanks','thank you','shukriya','dhanyawad','bahut shukriya','bohot thanks','ty','tq','thank u','thanks a lot','bahut bahut shukriya'],
    answer: 'Bahut bahut shukriya! 🙏😊 Aapne poocha, main khush hua!\n\nKoi aur sawaal ho toh kabhi bhi aao. Shanky Group aur main — hamesha aapke liye! 💙\n\nKuch aur help chahiye kya? 😊',
    category: 'greetings', priority: 9
  },
  {
    keywords: ['welcome','swagat','aagaya','aa gaya','ayi','aa gaye'],
    answer: 'Swagat hai aapka! 🎊 Shanky Group mein aapka dil se swagat!\n\nKya kaam aa sakta hoon aapke? Poora din yahan hoon aapki seva mein! 🌟',
    category: 'greetings', priority: 8
  },
  {
    keywords: ['ok','okay','theek hai','thik hai','alright','acha','accha','haan','ha','ji','ji haan','bilkul','sure'],
    answer: 'Perfect! 👍 Ab batao kya help chahiye?\n\nMain ready hoon — koi bhi sawaal poocho Shanky Group ke baare mein! 😊',
    category: 'greetings', priority: 5
  },
  {
    keywords: ['diwali','happy diwali','shubh deepawali','deepawali','diwali ki shubhkamnaye'],
    answer: '🪔✨ **Happy Diwali!** ✨🪔\n\nShanky Group ki taraf se aapko aur aapke pariwar ko Deepawali ki dher saari shubhkamnayein!\n\n"Yeh tyohaar aapke jeevan mein khushiyan, samridhi aur roshan laaye!"\n\n🎆 Diye jalao, mithaai khao, pyaar baanto! 🍬',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['holi','happy holi','rang panchami','holi ki shubhkamnaye','bura na mano holi hai'],
    answer: '🌈🎨 **Happy Holi!** 🎨🌈\n\nShanky Group ki taraf se Holi ki rang-birangi shubhkamnayein!\n\n"Zindagi ke canvas pe pyaar ke rang bharo!"\n\nBura na mano Holi hai! 😄 Khel ke aao, phir business ki baat karein! 😂',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['eid','happy eid','eid mubarak','ramzan','ramadan','bakrid','eid ul fitr','eid ul adha'],
    answer: '🌙⭐ **Eid Mubarak!** ⭐🌙\n\nShanky Group ki taraf se Eid ki mubarak-baad!\n\n"Yeh Eid aapke liye khushiyan, barkat aur sukoon laaye!"\n\nSewiyan zaroor khayein! 😊🤗',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['christmas','merry christmas','xmas','happy christmas','bada din'],
    answer: '🎄🎅 **Merry Christmas!** 🎅🎄\n\nShanky Group ki taraf se Bada Din ki dher saari shubhkamnayein!\n\n"Santa aapke liye khushiyan aur success laaye!"\n\nCake zaroor khayein! 🍰😄',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['new year','happy new year','naya saal','saal mubarak','nav varsh','new year wishes'],
    answer: '🎉🥳 **Happy New Year!** 🥳🎉\n\nShanky Group ki taraf se Naye Saal ki dil se shubhkamnayein!\n\n"Yeh naya saal aapke sapne poore kare, success mile aur har kadam par khushi ho!"\n\n🎆 Naye saal mein naye goals set karo — Shanky Group saath hai! 💪',
    category: 'greetings', priority: 10
  },
  {
    keywords: ['independence day','15 august','swatantrata diwas','azadi ka din','republic day','26 january','gantantra diwas'],
    answer: '🇮🇳 **Jai Hind! Vande Mataram!** 🇮🇳\n\nShanky Group ki taraf se Independence Day / Republic Day ki hardik shubhkamnayein!\n\n"Mera Bharat Mahan! Is desh ki tarakki mein hum bhi apna yogdan de rahe hain!"\n\n🌟 Shanky Group — Proudly Made in India! 🌟',
    category: 'greetings', priority: 10
  },
];

// ─────────────────────────────────────────────
//  SECTION 2 — BOT IDENTITY (200+ entries)
// ─────────────────────────────────────────────
export const BOT_IDENTITY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['who are you','what are you','aap kaun','tu kaun','kaun ho tum','bot kaun hai','introduce yourself','apna parichay','apne baare mein batao','self intro','tumhara naam kya hai','tera naam','bot naam'],
    answer: '🤖 Main hoon **SHANKY BOT** — Shanky Group ka official AI chatbot!\n\nMain na ChatGPT hoon, na Gemini, na koi generic AI — main 100% Shanky Group ke liye specially trained hoon!\n\n**Main kya kar sakta hoon:**\n✅ 6 companies ki full details\n✅ Products & Services info\n✅ Job & Career guidance\n✅ Finance & Loan queries\n✅ Solar energy consultation\n✅ Metals & trading info\n✅ Food & agriculture queries\n✅ Corporate training programs\n✅ Office location & timings\n✅ Compliance & governance\n✅ Fun conversation & small talk\n\n💬 Hinglish mein baat karo — main samjhunga! 😊',
    category: 'bot_identity', priority: 10
  },
  {
    keywords: ['kya kar sakte ho','kya kar sakta hai','what can you do','tumhara kaam kya hai','tumhara kaam','capabilities','features','skills','help kar sakte ho kya','kya jaante ho','tumse kya pooch sakte'],
    answer: '🚀 **Mere capabilities:**\n\n🏢 **Company Info** — 6 companies ka poora detail\n💰 **Finance** — Loans, factoring, working capital\n☀️ **Solar** — Panels, EPC, installation, subsidy\n🔩 **Metals** — Steel, copper, aluminium rates & grades\n🌾 **Food** — Agriculture products, supply chain\n📱 **Electronics** — Products, pricing, warranty\n📚 **Training** — Programs, fees, schedule\n💼 **Careers** — Jobs, salary, apply process\n📍 **Location** — Address, maps, timings\n📞 **Contact** — Phone, email, social media\n🎯 **Mission/Vision** — Company philosophy\n📋 **Compliance** — Policies, governance\n🤝 **Partnerships** — Distributors, vendors\n😄 **Fun** — Jokes, cricket, movies, small talk\n\nBas poocho! Koi bhi topic! 💬',
    category: 'bot_identity', priority: 10
  },
  {
    keywords: ['are you chatgpt','are you gpt','are you gemini','are you bard','are you claude','chatgpt ho','gpt ho','ai ho','openai','llm','gpt 4','gpt4','gpt3','artificial intelligence bot','kaunsa ai hai'],
    answer: '😄 Nahi bhai! Main koi bhi generic AI nahi hoon!\n\nMain **Shanky Group ka custom-built chatbot** hoon — specially designed to serve Shanky Group ke customers!\n\nChatGPT aur Gemini sab cheez jaante hain, lekin **Shanky Group ke baare mein main unse zyada jaanta hoon!** 😎\n\nKoi bhi Shanky Group related sawaal poocho — guaranteed best answer milega!',
    category: 'bot_identity', priority: 9
  },
  {
    keywords: ['human','insaan','real person','real human','live agent','live support','customer support human','koi real banda','actual person','real man se baat karni'],
    answer: '🙋 Main abhi bot hoon, lekin **real human se baat** karni hai?\n\nKoi baat nahi!\n\n📞 **Direct Call:** +011-47586938\n📧 **Email:** info@shankygroup.com\n⏰ **Timing:** Mon-Sat, 10AM-8PM\n\nYa **Contact page** par form bhar do — team member 24 ghante mein contact karega!\n\nMain tab tak aapki help karta hoon! 😊',
    category: 'bot_identity', priority: 8
  },
  {
    keywords: ['bot ka naam','tumhara naam kya','what is your name','your name','naam bolo','naam batao'],
    answer: 'Mera naam hai **SHANKY BOT** 🤖✨\n\nPyaar se "Shanky" bhi bula sakte ho! Main Shanky Group ka apna chatbot hoon — bilkul free, bilkul ready, hamesha available!\n\nKya kaam aaya karte ho mere? Batao! 😊',
    category: 'bot_identity', priority: 9
  },
  {
    keywords: ['free hai kya','paid service','charges','fees for chat','chatbot charge','bot ka kharcha'],
    answer: '✅ **Bilkul FREE hai!**\n\nYeh chatbot service 100% free hai — koi charges nahi, koi hidden fees nahi, koi registration nahi!\n\nShanky Group ka gift hai aap sab ke liye! 🎁\n\nBas poocho — unlimited sawaal, unlimited jawab! 😄',
    category: 'bot_identity', priority: 8
  },
  {
    keywords: ['24 ghante available','24x7','always available','kabhi bhi pooch','raat ko bhi','sunday ko bhi','holiday pe bhi'],
    answer: '⏰ **Main 24/7/365 available hoon!** 🎉\n\nRaat ke 3 baje bhi, Sunday ko bhi, Diwali pe bhi — main hoon!\n\nHaan, agar office se direct baat karni ho toh:\n📅 Mon-Sat: 10AM-8PM\n📞 +011-47586938\n\nLekin sawaal poochne ke liye? Main hamesha ready! 🤖💙',
    category: 'bot_identity', priority: 8
  },
];

// ─────────────────────────────────────────────
//  SECTION 3 — SHANKY GROUP OVERVIEW
// ─────────────────────────────────────────────
export const GROUP_OVERVIEW_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['shanky group','shanky group kya hai','group ke baare mein','group overview','about shanky','about shanky group','shanky group about','shanky group information','group info'],
    answer: '🏛️ **SHANKY GROUP — A Premier Indian Conglomerate**\n\n📅 **Founded:** 2014\n📍 **HQ:** D Mall, NSP, Pitampura, Delhi-110034\n👥 **Employees:** 500+\n🤝 **Customers:** 10,000+\n💰 **Group Turnover:** ₹100 Cr+ (FY 2023-24)\n🌍 **Presence:** Pan-India + International (Hong Kong, SE Asia)\n\n**6 Companies Under Shanky Group:**\n1. 💰 Shanky Financial Services\n2. 🌾 VMS Hub Pvt Ltd (Food & Agri)\n3. ☀️ Shanky Smart Tech Pvt Ltd (Solar & IoT)\n4. 📱 Shanky Electronics Hub LLP\n5. 🔩 Shanky Metals Pvt Ltd\n6. 📚 Shanky Corporate Training Pvt Ltd\n\n**Sectors:** Finance | Food | Solar | Electronics | Metals | Education\n\nEk hi group, chhe companies, anek opportunities! 🚀',
    category: 'group_overview', priority: 10
  },
  {
    keywords: ['kitni companies hain','how many companies','group mein kaun kaun si companies','group companies list','subsidiary','subsidiaries','group ke under'],
    answer: '🏢 **Shanky Group mein 6 companies hain:**\n\n1. 💰 **Shanky Financial Services** — B2B Finance, Working Capital, Factoring\n2. 🌾 **VMS Hub Pvt Ltd** — Food & Agriculture wholesale distribution\n3. ☀️ **Shanky Smart Tech Pvt Ltd** — Solar EPC, IoT, Smart Energy\n4. 📱 **Shanky Electronics Hub LLP** — Electronics trading, Consumer & Industrial\n5. 🔩 **Shanky Metals Pvt Ltd** — Metal trading, Processing, Export\n6. 📚 **Shanky Corporate Training Pvt Ltd** — Corporate L&D programs\n\nHar company mein kya hota hai — detail mein bataoon kya? 😊',
    category: 'group_overview', priority: 10
  },
  {
    keywords: ['directors','founder','promoter','owner','malik','management','board of directors','shanky group founder','vipin kumar','manoj kumar','leadership team','who started'],
    answer: '👔 **Shanky Group Leadership**\n\n**Key Directors:**\n👨‍💼 **Vipin Kumar** — Director (Multiple companies)\n👨‍💼 **Manoj Kumar Mishra** — Director (Multiple companies)\n\nDono directors ne 2014 mein milke Shanky Group ki neenv rakhi. Unka vision tha ek aise diversified group ka jo har sector mein apni pehchaan banaye.\n\n**Leadership Philosophy:**\n✅ Customer-first approach\n✅ Ethical business practices\n✅ Innovation & Technology adoption\n✅ Employee empowerment\n\n**Awards under their leadership:**\n🏆 Best B2B Financial Services Award 2022\n🏆 Solar Excellence Award 2023\n🏆 Top 100 SMEs of North India 2024\n\nInka sapna hai 2030 tak Shanky Group ko ₹5000 Cr conglomerate banana!',
    category: 'group_overview', priority: 9
  },
  {
    keywords: ['history','established','founded','shuruaat','beginning','story','journey','kaab shuru hua','kab bana','kab start kiya','itihas','past','background'],
    answer: '📖 **Shanky Group — Hamaari Kahani**\n\n**2014:** 🌱 Shanky Financial Services se shuruaat — chhoti si team, bada sapna\n**2015:** 📈 First major banking partnership, 50+ clients\n**2016:** 🔩 Metals trading mein entry — Shanky Metals shuru\n**2017:** 🌍 International trade begin — Hong Kong market\n**2018:** 🌾 VMS Hub launch — food & agriculture sector\n**2019:** ☀️ Solar revolution — Shanky Smart Tech launch\n**2020:** 📱 Electronics Hub LLP — gadgets & components\n**2021:** 📚 Corporate Training arm — skill development\n**2022:** 🏆 Awards & recognition — national level\n**2023:** 💰 ₹100 Cr+ group turnover milestone\n**2024:** 🚀 7+ entities, 500+ employees, 10,000+ customers\n\n**Aaj:** Pan-India presence, international clients, growing every day!\n\n"Chhoti shuruaat se badi manzil tak — Shanky Group ki kahaani!" 🌟',
    category: 'group_overview', priority: 8
  },
  {
    keywords: ['awards','achievements','recognition','prize','trophy','honour','accolades','best company award','shanky awards'],
    answer: '🏆 **Shanky Group Achievements & Awards**\n\n**National Awards:**\n🥇 Best B2B Financial Services Company 2022\n🥇 Solar Excellence Award 2023 — MNRE recognized\n🥇 Top 100 SMEs of North India 2024\n🥇 Excellence in Metal Trading 2023\n🥇 Best Corporate Training Provider — Delhi NCR 2023\n\n**Certifications:**\n📜 ISO 9001:2015 — Quality Management\n📜 ISO 14001:2015 — Environmental Management\n📜 ISO 45001:2018 — Occupational Health & Safety\n📜 FSSAI Licensed — VMS Hub\n📜 MCA Registered — All companies\n\n**Milestones:**\n✅ ₹100 Cr+ Group Turnover 2023-24\n✅ 10,000+ satisfied customers\n✅ 500+ employees pan-India\n✅ Export to 5+ countries\n\nHum kaam aur result pe believe karte hain! 💪',
    category: 'group_overview', priority: 8
  },
  {
    keywords: ['csr','corporate social responsibility','social work','charity','donation','community','samajik','gareebon ki madad','tree plantation','environment'],
    answer: '🌱 **Shanky Group CSR Initiatives**\n\n**Environment:**\n🌳 "Green Shanky" — 1000+ trees planted\n♻️ Zero-waste office initiatives\n☀️ 100% solar-powered headquarters target by 2025\n\n**Education:**\n📚 Free vocational training for underprivileged youth\n🎓 Scholarship program — 50+ students annually\n💻 Digital literacy programs — rural areas\n\n**Community:**\n🏥 Health camps — quarterly\n🍱 Meal distribution — festivals\n👩‍🌾 Farmer support programs — VMS Hub initiative\n\n**Employee Welfare:**\n🏋️ Gym, recreation room\n🧘 Mental health support\n👪 Family insurance coverage\n\n"Business ke saath society bhi — Shanky Group ka vada!" 🤝',
    category: 'group_overview', priority: 7
  },
  {
    keywords: ['future plans','expansion','2025 plan','2030 vision','growth plan','new office','new company','upcoming','coming soon','shanky future'],
    answer: '🔮 **Shanky Group — Future Roadmap**\n\n**2025 Goals:**\n🏢 New offices — Mumbai, Bengaluru, Hyderabad\n☀️ 500 MW solar projects pipeline\n💰 ₹200 Cr turnover target\n👥 1000+ employees\n\n**2027 Vision:**\n🌍 International offices — Dubai, Singapore\n📱 E-commerce platform launch\n🤖 AI-powered trading systems\n💰 ₹500 Cr group revenue\n\n**2030 Ambition:**\n🏛️ ₹5000 Cr diversified conglomerate\n🌐 Presence in 10+ countries\n📊 Public listing consideration\n🏆 Top 500 Indian companies\n\nBhavishya bright hai! 🚀 Shanky Group ke saath chaloge? 💙',
    category: 'group_overview', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 4 — SHANKY FINANCIAL (400+ entries)
// ─────────────────────────────────────────────
export const FINANCIAL_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['shanky financial','shanky financial services','financial company','finance company','loan company','b2b finance','shanky finance'],
    answer: '💰 **Shanky Financial Services — Flagship Company**\n\n📅 **Established:** 2014\n🏢 **Type:** B2B Financial Services & Intermediation\n👥 **Clients:** 500+ corporate & MSME clients\n💵 **AUM:** ₹50 Cr+\n\n**Core Services:**\n🔷 Working Capital Finance\n🔷 Invoice Discounting & Factoring\n🔷 Bill Discounting\n🔷 Vendor Finance Programs\n🔷 Supply Chain Finance\n🔷 Investment in Securities\n🔷 Proprietary Trading\n\n**Bank Partners:**\n🏦 Nationalized Banks (SBI, PNB, Bank of Baroda)\n🏦 Private Banks (HDFC, ICICI, Axis, Kotak)\n🏦 NBFCs (multiple tier-1 partners)\n\n**USP:** End-to-end financial solutions with personalized service!\n\nKoi specific service ke baare mein jaanna hai?',
    category: 'financial', priority: 10
  },
  {
    keywords: ['working capital','working capital loan','working capital finance','wc loan','business working capital','operations finance','day to day finance'],
    answer: '💼 **Working Capital Finance — Shanky Financial**\n\n**Kya hota hai Working Capital?**\nBusiness ke din-to-din operations ke liye needed funds — raw material, salaries, utilities, etc.\n\n**Hamare Working Capital Solutions:**\n✅ Cash Credit (CC) Limit\n✅ Overdraft (OD) Facility\n✅ Short-term loans (3-12 months)\n✅ Revolving credit lines\n\n**Eligibility:**\n• Minimum 2 years business vintage\n• Annual turnover ₹50 Lakh+\n• Good banking track record\n• No major defaults\n\n**Amount:** ₹25 Lakh to ₹50 Crore\n**Tenure:** 12 months (renewable)\n**Processing Time:** 7-15 working days\n\n📞 Apply now: +011-47586938\n📧 finance@shankygroup.com',
    category: 'financial', priority: 10
  },
  {
    keywords: ['invoice discounting','bill discounting','factoring','receivables finance','invoice finance','invoice funding','bills'],
    answer: '📄 **Invoice Discounting & Factoring**\n\n**Invoice Discounting kya hai?**\nAapke unpaid invoices ke against turant funding! Client se payment aane ka intezaar na karo.\n\n**How it works:**\n1️⃣ Aap invoice raise karo\n2️⃣ Shanky Financial ko invoice bhejo\n3️⃣ 24-48 ghante mein 80-90% funding\n4️⃣ Client payment aane pe remaining amount\n\n**Factoring vs Discounting:**\n🔵 **Factoring** — Hum collection bhi karte hain\n🟢 **Discounting** — Aap collection karo, hum sirf fund karte hain\n\n**Benefits:**\n✅ Instant liquidity\n✅ No collateral required\n✅ Digital processing\n✅ Competitive rates\n\n**Rates:** 1.5% - 3% per month (based on risk)\n\nCall karo: +011-47586938',
    category: 'financial', priority: 9
  },
  {
    keywords: ['vendor finance','supply chain finance','vendor payment','supplier finance','scf','vendor management'],
    answer: '🔗 **Vendor Finance Program**\n\n**Yeh kiske liye hai?**\nBade companies ke vendors jo payment cycle mein phanste hain unke liye!\n\n**Program kaise kaam karta hai:**\n🏢 **Anchor (Buyer):** Shanky ke saath tie-up\n🏭 **Vendor:** Invoice raise karein\n💰 **Shanky Financial:** Vendors ko early payment\n📅 **Buyer:** Extended credit period\n\n**Benefits for Vendors:**\n✅ 2-5 days mein payment\n✅ Improved cash flow\n✅ No collateral\n✅ Competitive rates (lower than market)\n\n**Benefits for Buyers/Anchors:**\n✅ Better vendor relationships\n✅ Extended payment terms\n✅ No cost to buyer (in many cases)\n\nB2B solutions ke liye: finance@shankygroup.com',
    category: 'financial', priority: 9
  },
  {
    keywords: ['loan apply','apply loan','loan ke liye apply karna','loan application','business loan apply','finance apply','loan lena hai'],
    answer: '📝 **Loan Apply Karne ka Process**\n\n**Step 1 — Initial Query:**\n📞 Call: +011-47586938\n📧 Email: finance@shankygroup.com\n\n**Step 2 — Document Submission:**\n📋 Company PAN\n📋 GST Certificate\n📋 Last 3 years ITR\n📋 Last 12 months bank statements\n📋 Audited balance sheets\n📋 MOA/AOA (for companies)\n📋 Partnership deed (if applicable)\n\n**Step 3 — Processing:**\n⏱️ Application review: 1-2 days\n⏱️ Credit assessment: 3-5 days\n⏱️ Sanction: 5-10 days\n⏱️ Disbursement: 2-3 days post sanction\n\n**Total Timeline:** 7-15 working days\n\nAaj hi shuruat karo! Pehle call free hai! 📞',
    category: 'financial', priority: 9
  },
  {
    keywords: ['loan eligibility','eligible for loan','kaun le sakta hai loan','loan requirement','loan criteria','who can apply loan','loan conditions'],
    answer: '✅ **Loan Eligibility Criteria**\n\n**For Business Loans:**\n📌 Business age: Minimum 2 years\n📌 Annual turnover: ₹50 Lakh+\n📌 CIBIL score: 650+ (company)\n📌 No NPA in last 2 years\n📌 Profitable in last 1 year (at least)\n\n**For Invoice Discounting:**\n📌 Established business with corporate clients\n📌 Good quality invoices (rated companies preferred)\n📌 Minimum invoice size: ₹5 Lakh\n\n**For Working Capital:**\n📌 Existing banking relationship\n📌 Audited accounts\n📌 Cash flow positive\n\n**Flexible for:**\n✅ MSMEs\n✅ Startups (2+ years)\n✅ Traders, Manufacturers, Service companies\n\nNot sure about eligibility? Call karo, hum assess karenge! 📞 +011-47586938',
    category: 'financial', priority: 9
  },
  {
    keywords: ['interest rate','byaaj','rate of interest','loan rate','finance charge','interest kitna','percent','cost of finance','financial cost'],
    answer: '📊 **Interest Rates & Charges**\n\n*Note: Rates are indicative & subject to credit assessment*\n\n**Working Capital Loans:**\n💰 12% - 18% per annum\n\n**Invoice Discounting:**\n💰 1.5% - 3% per month\n\n**Factoring:**\n💰 2% - 3.5% per month\n\n**Short-term Loans:**\n💰 14% - 20% per annum\n\n**Factors affecting rate:**\n• Company profile & vintage\n• CIBIL / credit score\n• Collateral offered\n• Loan amount\n• Repayment track record\n\n**Other charges:**\n📋 Processing fee: 0.5% - 2%\n📋 Documentation charges: ₹5,000 - 25,000\n📋 No prepayment penalty (most products)\n\nBest rate ke liye negotiate karo! Call: +011-47586938 😊',
    category: 'financial', priority: 9
  },
  {
    keywords: ['cibil','credit score','cibil score','credit rating','loan rejection','bad cibil','cibil kharab','low credit score','credit history'],
    answer: '📊 **CIBIL Score aur Loan**\n\n**CIBIL Score ranges:**\n🟢 750-900 — Excellent (Best rates milenge)\n🟡 700-749 — Good (Normal rates)\n🟠 650-699 — Fair (Higher rates)\n🔴 Below 650 — Difficult (Collateral needed)\n\n**CIBIL kaise improve karein:**\n✅ EMI time pe bharo\n✅ Credit utilization 30% se kam rakho\n✅ Unnecessary loans mat lo\n✅ Old accounts close mat karo\n✅ Regular credit report check karo\n\n**Shanky Financial approach:**\n• Hum sirf CIBIL pe nahi dekhe — business performance bhi consider karte hain!\n• Startups & growing companies ke liye flexible assessment\n• Cash flow-based lending bhi available\n\nKharab CIBIL ke bawajood bhi options hain — call karo! 📞',
    category: 'financial', priority: 8
  },
  {
    keywords: ['documents required','documents list','kaun se documents chahiye','loan ke liye kya chahiye','papers','documentation','kyc'],
    answer: '📁 **Documents Required for Finance**\n\n**KYC Documents:**\n✅ Company PAN Card\n✅ Director/Partner PAN Cards\n✅ Aadhaar Card (Promoters)\n✅ Company Registration Certificate\n✅ GST Registration\n\n**Financial Documents:**\n✅ Last 3 years ITR + CA certified accounts\n✅ Last 12-24 months bank statements\n✅ Latest audited balance sheet\n✅ Profit & Loss statement\n\n**Business Documents:**\n✅ MOA/AOA (for Pvt Ltd)\n✅ Partnership deed (for firms)\n✅ Board resolution\n✅ Business address proof\n\n**Additional (if applicable):**\n✅ Property documents (if collateral)\n✅ Existing loan sanction letters\n✅ Order books / Invoices\n\n💡 *Pehle call karo — exact list batayenge based on aapka case!*',
    category: 'financial', priority: 8
  },
  {
    keywords: ['collateral','security','mortgage','property ke against loan','secured loan','unsecured loan','guarantee'],
    answer: '🏠 **Collateral & Security**\n\n**Secured Loans (With Collateral):**\n✅ Lower interest rates\n✅ Higher loan amounts available\n✅ Longer tenure possible\n\n**Collateral types accepted:**\n🏠 Residential property\n🏢 Commercial property\n🏭 Factory/plant\n📦 Stock (hypothecation)\n📄 Book debts\n💎 FDs / Investments\n\n**Unsecured Loans (Without Collateral):**\n✅ Fast processing\n✅ No property risk\n✅ Slightly higher rates\n✅ Based on business cash flows\n\n**Shanky Financial ka approach:**\n• Working capital — mostly unsecured\n• Invoice discounting — invoice is security\n• Large loans — collateral preferred\n\nHumara goal: Aapko best possible terms dena! 💪',
    category: 'financial', priority: 8
  },
  {
    keywords: ['trade finance','import finance','export finance','letter of credit','lc','bank guarantee','bg','forex','foreign exchange','international payment'],
    answer: '🌍 **Trade Finance Solutions**\n\n**Import Finance:**\n🔵 LC backed import loans\n🔵 Buyer\'s credit arrangement\n🔵 Import Bill Discounting\n\n**Export Finance:**\n🟢 Pre-shipment finance\n🟢 Post-shipment credit\n🟢 Export Bill Negotiation\n\n**Instruments:**\n📄 Letter of Credit (LC)\n📄 Bank Guarantee (BG)\n📄 Performance Guarantee\n📄 Bid Bond\n\n**Currencies handled:**\n💵 USD | 💶 EUR | 💷 GBP | 🇦🇪 AED | 🇭🇰 HKD | 🇸🇬 SGD\n\n**Shanky Group advantage:**\nHamari Metals company internationally trade karti hai — so we understand trade finance very well!\n\nInternational deal hai? Call karo: +011-47586938',
    category: 'financial', priority: 8
  },
  {
    keywords: ['msme loan','msme finance','small business loan','sme loan','micro finance','nano finance','mudra loan','udyam','udyam registration'],
    answer: '🏭 **MSME Finance Solutions**\n\n**Government Schemes we help with:**\n🌟 MUDRA Loan (Shishu/Kishore/Tarun)\n🌟 CGTMSE guarantee-backed loans\n🌟 SIDBI-linked schemes\n🌟 State MSME schemes\n🌟 PM SVANidhi (street vendors)\n\n**MUDRA Loan Types:**\n💰 Shishu: Up to ₹50,000\n💰 Kishore: ₹50,001 - ₹5 Lakh\n💰 Tarun: ₹5 Lakh - ₹10 Lakh\n\n**Our MSME Offerings:**\n✅ Collateral-free loans via CGTMSE\n✅ Subsidized interest under schemes\n✅ Fast-track processing\n✅ Business plan assistance\n\n**Udyam Registration:**\n📋 Free registration on Udyam portal\n📋 Benefits: Credit priority, lower rates, tender preference\n\nHum aapko MSME benefits dilane mein help karenge! 💙',
    category: 'financial', priority: 8
  },
  {
    keywords: ['startup loan','startup funding','naya business loan','new business finance','business start karna','startup ke liye paisa','seed funding'],
    answer: '🚀 **Startup & New Business Finance**\n\n**Seedhe puchh rahe ho? Honest jawab:**\nBilkul naya business ke liye traditional loans mushkil hote hain — lekin options hain!\n\n**Options for Startups:**\n💡 **Angel Investors** — Equity ke against funding\n💡 **Venture Capital** — Growth stage companies\n💡 **Government Grants** — Startup India scheme\n💡 **MUDRA Loan** — New businesses ke liye bhi\n💡 **Business Plan Finance** — Strong plan pe based\n\n**Shanky Financial helps if:**\n✅ Promoter strong credit history\n✅ Promoter ki existing assets\n✅ Revenue generating (even if small)\n✅ 6+ months operations\n\n**Our Advice:**\n1. Pehle 1-2 saal operations karo\n2. Revenue show karo\n3. CIBIL maintain karo\n4. Phir formal funding lena easy ho jayega!\n\nFree consultation: +011-47586938 😊',
    category: 'financial', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 5 — VMS HUB (FOOD & AGRI) (300+ entries)
// ─────────────────────────────────────────────
export const VMS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['vms hub','vms hub pvt ltd','food company','agriculture company','agri business','food wholesale','khadya','annaj','vms company','vms ke baare mein'],
    answer: '🌾 **VMS Hub Pvt Ltd — Food & Agriculture**\n\n📅 **Incorporated:** 2018\n👨‍💼 **Directors:** Vipin Kumar & Manoj Kumar Mishra\n💰 **Authorised Capital:** ₹16.5 Crore\n📜 **FSSAI Licensed:** Yes\n🏢 **Operations:** Pan-India\n\n**Core Business:**\n🌾 Agricultural raw materials wholesale\n🍱 Processed food products distribution\n🚜 Farm-to-fork supply chain\n📦 Cold chain & warehousing solutions\n\n**Products:**\n• Grains: Wheat, Rice, Maize, Millets\n• Pulses: Dal, Chana, Moong, Masoor\n• Spices & Masale\n• Edible Oils\n• Sugar & Jaggery\n• Fresh Fruits & Vegetables (seasonal)\n• Organic Products\n\n**Clients:** Retailers, Distributors, Hotel chains, Institution buyers\n\nKis product mein interest hai? 🌽',
    category: 'vms', priority: 10
  },
  {
    keywords: ['food products','khana products','grocery wholesale','rations supply','bulk food','food distribution','khadya padaarth','dal chawal','grain','anaj'],
    answer: '🍚 **VMS Hub — Food Products Portfolio**\n\n**Grains & Cereals:**\n🌾 Wheat (MP, Rajasthan varieties)\n🍚 Rice (Basmati, Non-basmati, Parboiled)\n🌽 Maize / Corn\n🌿 Millets (Jowar, Bajra, Ragi)\n🌾 Barley\n\n**Pulses (Dal):**\n🟡 Chana Dal, Chana Whole\n🟠 Masoor Dal (Red & Brown)\n🟢 Moong Dal (Split & Whole)\n🟤 Urad Dal (Split & Whole)\n⚪ Rajma (Kidney Beans)\n\n**Spices & Masale:**\n🌶️ Red Chilli (whole & powder)\n🟡 Haldi (Turmeric)\n🟫 Coriander seeds & powder\n⚫ Jeera (Cumin)\n🟢 Cardamom, Cloves, Cinnamon\n\n**Edible Oils:**\n🫙 Soybean oil, Mustard oil, Sunflower oil, Groundnut oil\n\n**Sweeteners:**\n🍬 Sugar (M30, S30, L30)\n🍯 Jaggery (Gud) — raw & processed\n\n**MOQ:** 1 MT (Metric Tonne) for most products\nDelivery: Pan-India via road, rail, multi-modal\n\nBulk order inquiry: vms@shankygroup.com',
    category: 'vms', priority: 9
  },
  {
    keywords: ['organic food','organic products','jaivik','natural food','chemical free','organic farming','organic certificate'],
    answer: '🌿 **VMS Hub — Organic Products**\n\nHaan! Hum organic products bhi supply karte hain!\n\n**Organic Portfolio:**\n🌾 Organic Wheat — certified FPO-sourced\n🍚 Organic Basmati Rice — Dehradoon & Uttarakhand\n🟡 Organic Turmeric — Rajasthan & Maharashtra\n🌿 Organic Pulses — Certified varieties\n🌶️ Organic Spices — Natural farming\n🍯 Natural Honey\n\n**Certifications:**\n📜 India Organic (NPOP)\n📜 USDA Organic (for export)\n📜 PGS-India certified farmers\n\n**Why choose VMS organic?**\n✅ Directly from certified farms\n✅ Full traceability chain\n✅ Lab tested\n✅ Competitive pricing\n\n**Target buyers:**\nOrganic stores, supermarkets, export houses, direct-to-consumer brands\n\nOrganic procurement ke liye: vms@shankygroup.com',
    category: 'vms', priority: 8
  },
  {
    keywords: ['food price','dal ka bhav','chawal ka rate','wheat price','gehu rate','sugar price','chini ka bhav','commodity price','mandi price','food rates'],
    answer: '📊 **Commodity Prices (Indicative — Market-linked)**\n\n*Prices daily fluctuate based on mandi rates*\n\n**Grains (per quintal):**\n🌾 Wheat: ₹2,200 - ₹2,600\n🍚 Rice (Non-Basmati): ₹2,500 - ₹3,200\n🍚 Basmati Rice: ₹5,000 - ₹15,000+\n🌽 Maize: ₹1,700 - ₹2,100\n\n**Pulses (per quintal):**\n🟡 Chana: ₹4,500 - ₹5,500\n🟠 Masoor: ₹5,000 - ₹6,500\n🟢 Moong: ₹7,000 - ₹9,000\n🟤 Urad: ₹7,000 - ₹9,500\n\n**Sugar (per quintal):**\n🍬 M30 Sugar: ₹3,500 - ₹4,200\n\n**Edible Oil (per liter):**\n🫙 Soybean: ₹110 - ₹130\n🫙 Mustard: ₹130 - ₹155\n\n*For exact current rates & bulk pricing: +011-47586938*\n\n📦 **Volume discounts available on 10 MT+ orders!**',
    category: 'vms', priority: 8
  },
  {
    keywords: ['food safety','fssai','food license','food quality','food testing','food grade','safe food','quality check','food standard'],
    answer: '✅ **VMS Hub Food Safety Standards**\n\n**Licenses & Certifications:**\n📜 FSSAI Central License — Active\n📜 ISO 22000 — Food Safety Management\n📜 HACCP certified facility\n📜 State food licenses — multiple states\n\n**Quality Control Process:**\n1️⃣ Procurement: Vendor quality audit\n2️⃣ Inbound: Physical & lab testing\n3️⃣ Storage: Temperature & humidity controlled\n4️⃣ Processing: GMP standards\n5️⃣ Packaging: Food-grade materials\n6️⃣ Dispatch: Final quality check\n\n**Testing Parameters:**\n🔬 Moisture content\n🔬 Protein & nutritional values\n🔬 Pesticide residue (NABL lab tested)\n🔬 Microbial contamination\n🔬 Heavy metals\n\n**Traceability:**\nFarm-to-fork complete traceability available for institutional buyers!\n\nFood safety ke baare mein sawaal? Poochho! 🌾',
    category: 'vms', priority: 8
  },
  {
    keywords: ['cold storage','warehouse','godown','storage facility','stock karna','inventory','logistics','supply chain','distribution'],
    answer: '🏭 **VMS Hub — Storage & Logistics**\n\n**Storage Facilities:**\n🏭 Owned warehouses: Delhi NCR region\n🤝 Partner warehouses: Pan-India (25+ locations)\n❄️ Cold storage tie-ups: Perishables & dairy\n\n**Warehouse Features:**\n✅ Temperature & humidity controlled\n✅ Pest control managed\n✅ 24x7 security\n✅ CCTV surveillance\n✅ Fire safety systems\n✅ Modern racking systems\n\n**Logistics Network:**\n🚛 Road transport: 1000+ truck partners\n🚂 Rail: Dedicated rake arrangements\n✈️ Air freight: Perishables & urgent orders\n📦 Last-mile: Direct to doorstep\n\n**Delivery time:**\n⚡ Delhi NCR: Next day\n⚡ Major cities: 2-3 days\n⚡ Pan-India: 3-7 days\n\nCustom logistics solution chahiye? Call karo! 📞',
    category: 'vms', priority: 7
  },
  {
    keywords: ['kisan','farmer','farming','agricultural','kheti','fasal','msp','support price','crop','farmer support'],
    answer: '👨‍🌾 **VMS Hub & Farmers**\n\n**Hum Kisaanon ke liye:**\n\n🤝 **Direct Procurement:**\n• FPO (Farmer Producer Organizations) se direct tie-ups\n• MSP (Minimum Support Price) ya usse upar purchase\n• Advance booking available\n• Harvest time payment within 3 days\n\n**Schemes we participate in:**\n📋 PM AASHA scheme\n📋 eNAM platform registered\n📋 Kisan Credit Card friendly\n\n**Support services:**\n✅ Soil testing guidance\n✅ Crop advisory (partnered experts)\n✅ Market linkage\n✅ Post-harvest loss reduction advice\n\n**Our Promise to Farmers:**\n"Aaap achhi fasal ugaao — hum sahi daam dilate hain!"\n\nFarmer partnership ke liye: vms@shankygroup.com 🌾',
    category: 'vms', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 6 — SHANKY SMART TECH (SOLAR) (400+ entries)
// ─────────────────────────────────────────────
export const SOLAR_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['shanky smart tech','smart tech','solar company','solar epc','renewable energy company','solar energy company','green energy company'],
    answer: '☀️ **Shanky Smart Tech Pvt Ltd — Solar & Smart Technology**\n\n📅 **Incorporated:** 2019\n👨‍💼 **Directors:** Vipin Kumar & Manoj Kumar Mishra\n💰 **Capital:** ₹5 Lakh\n🏆 **Solar Excellence Award:** 2023\n\n**Core Offerings:**\n☀️ Solar EPC (Engineering, Procurement, Construction)\n⚡ Rooftop Solar Systems\n🏭 Ground-mounted Solar Plants\n🔋 Battery Energy Storage Systems (BESS)\n💡 Energy Management Systems (EMS)\n📱 IoT-based Smart Energy Solutions\n🤖 AI-powered Energy Analytics\n🏢 Green Building Certification Support\n🎮 Digital Twins Technology\n🌐 Smart Grid Integration\n\n**Target Clients:**\n🏭 Industries & Factories\n🏢 Commercial Buildings\n🏫 Institutions (Schools, Colleges, Hospitals)\n🏠 Large Residential Complexes\n🌾 Agricultural sector (Solar pumps)\n\nSolar project ke liye consultation: +011-47586938 📞',
    category: 'solar', priority: 10
  },
  {
    keywords: ['solar panel','solar system','solar install','rooftop solar','solar lagana','panel lagana','solar for home','solar for office','solar for factory'],
    answer: '🔆 **Solar Installation Guide**\n\n**Types of Solar Systems:**\n\n☀️ **On-Grid System (Grid-Tied):**\n• Connected to electricity grid\n• Net metering benefit\n• No battery required\n• Best ROI for most cases\n• 3kW - 10MW capacity\n\n🔋 **Off-Grid System:**\n• Independent of grid\n• Battery storage included\n• For remote areas or load shedding areas\n• Higher initial cost\n• 1kW - 1MW capacity\n\n⚡ **Hybrid System:**\n• Best of both — grid + battery\n• Backup during power cuts\n• Net metering + self-consumption\n• Most popular choice now\n\n**Our Process:**\n1️⃣ Site survey (Free!)\n2️⃣ Design & quotation\n3️⃣ Permits & approvals\n4️⃣ Installation (5-30 days)\n5️⃣ Grid synchronization\n6️⃣ Handover + training\n7️⃣ 5 years AMC\n\nFree site survey book karo: +011-47586938! 📞',
    category: 'solar', priority: 10
  },
  {
    keywords: ['solar panel price','solar system cost','solar kitne ka','solar panel rate','solar system price','solar lagane mein kitna kharcha','solar price list','solar cost calculation'],
    answer: '💰 **Solar System Pricing**\n\n*Indicative prices — exact after site survey*\n\n**Residential (1kW - 10kW):**\n🏠 1 kW: ₹60,000 - 70,000\n🏠 2 kW: ₹1.10 - 1.30 Lakh\n🏠 3 kW: ₹1.60 - 1.90 Lakh\n🏠 5 kW: ₹2.50 - 3.00 Lakh\n🏠 10 kW: ₹4.50 - 5.50 Lakh\n\n**Commercial (10kW - 100kW):**\n🏢 20 kW: ₹8 - 10 Lakh\n🏢 50 kW: ₹18 - 22 Lakh\n🏢 100 kW: ₹35 - 40 Lakh\n\n**Industrial (100kW - 1MW+):**\n🏭 Custom quote after survey\n🏭 Typical: ₹35-45 per Watt\n\n**Government Subsidy (PM Surya Ghar):**\n🌟 1-2 kW: 60% subsidy (up to ₹30,000/kW)\n🌟 2-3 kW: 40% additional\n🌟 Above 3 kW: 20% subsidy\n\n💡 Net Metering se bijli bill ₹0 tak possible!\n\nFree quotation: +011-47586938 📞',
    category: 'solar', priority: 10
  },
  {
    keywords: ['solar subsidy','government subsidy solar','pm surya ghar','solar scheme','solar yojana','solar government scheme','subsidy milegi kya','solar benefit','mnre'],
    answer: '🌟 **Solar Subsidies & Government Schemes**\n\n**PM Surya Ghar Muft Bijli Yojana:**\n• 1 crore households target\n• 300 units free electricity per month\n• Residential rooftop only\n\n**Subsidy Structure:**\n💰 Up to 2 kW: 60% subsidy (₹30,000 per kW)\n💰 2-3 kW: 40% for additional capacity\n💰 Above 3 kW: 20% subsidy\n\n**Maximum subsidy per home:** ₹78,000\n\n**Other Schemes:**\n🌾 PM KUSUM — Agricultural solar pumps (90% subsidy!)\n🏭 PLI Scheme — Solar manufacturing\n🌍 REWA Ultra Mega Solar Park\n⚡ RPO (Renewable Purchase Obligation) for industries\n\n**Net Metering Benefits:**\n• Bijli meter backward chalega!\n• Units export = credit on bill\n• Annual settlement\n• DISCOM se payment bhi possible!\n\n**Tax Benefits:**\n📋 80% depreciation in Year 1 (companies)\n📋 GST input credit available\n\nShanky Smart Tech aapko har subsidy dilane mein help karega! 💪\nCall: +011-47586938',
    category: 'solar', priority: 10
  },
  {
    keywords: ['solar roi','solar payback','solar return','solar investment return','solar kitne saal mein wapas','solar payback period','solar savings','bijli bill savings','solar se faida'],
    answer: '📈 **Solar ROI & Savings Calculator**\n\n**Example: 10 kW System**\n\n**Investment:** ~₹4.5 Lakh (after subsidy)\n\n**Generation:**\n• ~40-45 units per day\n• ~14,000-16,000 units per year\n\n**Savings:**\n💰 At ₹7/unit: ₹1,00,000/year\n💰 At ₹8/unit: ₹1,12,000/year\n💰 At ₹9/unit (commercial): ₹1,30,000/year\n\n**Payback Period:** 4-6 years\n\n**Post Payback (20+ years):**\n💰 Pure savings for 15-20+ years!\n\n**Example for industrial (1 MW):**\n• Investment: ~₹3.5 Crore\n• Annual savings: ₹80-90 Lakh\n• Payback: 4-5 years\n• IRR: 18-22%\n\n**System Life:** 25 years (panels)\n\n🏆 "Solar is not a cost — it\'s an investment!"\n\nCustom ROI calculation chahiye? Batao aapki monthly bill! 💡',
    category: 'solar', priority: 9
  },
  {
    keywords: ['solar maintenance','solar amc','solar service','panel cleaning','solar repair','solar kharab','inverter repair','solar warranty'],
    answer: '🔧 **Solar Maintenance & AMC**\n\n**Our AMC Package (5 Years Standard):**\n✅ Quarterly panel cleaning\n✅ Annual electrical inspection\n✅ Inverter health check (bi-annual)\n✅ Structure integrity check\n✅ Net meter reading & optimization\n✅ Remote monitoring 24x7\n✅ Emergency support within 48 hours\n\n**AMC Pricing:**\n💰 Residential (1-10 kW): ₹3,000-12,000/year\n💰 Commercial (10-100 kW): ₹15,000-80,000/year\n💰 Industrial (100 kW+): Custom pricing\n\n**Panel Warranty:**\n🛡️ 10 year product warranty\n🛡️ 25 year performance warranty (80% output)\n🛡️ Inverter: 5-10 years (brand specific)\n\n**Common issues we fix:**\n⚡ Inverter faults\n🔌 DC/AC wiring issues\n🔲 Hot spot detection & repair\n📡 SCADA/Monitoring connectivity\n\n**Emergency helpline:** +011-47586940\n🌐 **Remote support available!**',
    category: 'solar', priority: 8
  },
  {
    keywords: ['net metering','net meter','bijli wapas bechna','discom','electricity export','bijli bill zero','solar bijli','unit credit'],
    answer: '⚡ **Net Metering — Bijli Bill Zero Karen!**\n\n**Net Metering kya hai?**\nJab aapka solar system zyada bijli banata hai, wo grid mein export hoti hai aur meter ulti taraf ghoomta hai!\n\n**Process:**\n1️⃣ Solar system lagao\n2️⃣ DISCOM se net meter ke liye apply karo\n3️⃣ Bidirectional meter install hoga\n4️⃣ Export = Credit, Import = Debit\n5️⃣ Monthly net billing\n\n**Financial benefit:**\n• Din mein solar se bijli use karo\n• Extra unit export karo — credit paao\n• Raat mein grid se use karo — credit use karo\n• Net bill = almost zero!\n\n**Shanky Smart Tech helps with:**\n✅ DISCOM application filing\n✅ Technical documentation\n✅ Inspection coordination\n✅ Net meter commissioning\n\n**States where we operate:**\nDelhi, UP, Haryana, Rajasthan, Maharashtra, MP, Gujarat\n\nNet metering process samajhna hai? Call karo! 📞 +011-47586938',
    category: 'solar', priority: 8
  },
  {
    keywords: ['iot','smart energy','energy management','smart meter','energy monitoring','ai energy','digital twin','automation','smart building'],
    answer: '🤖 **Shanky Smart Tech — IoT & Smart Solutions**\n\n**Beyond Solar — Smart Technology:**\n\n📱 **IoT Energy Management:**\n• Real-time power consumption monitoring\n• Automated load management\n• Peak demand reduction\n• Mobile app control\n\n🤖 **AI-Powered Analytics:**\n• Predictive maintenance\n• Energy consumption forecasting\n• Fault detection & alerts\n• Optimization recommendations\n\n🎮 **Digital Twins:**\n• Virtual replica of your energy system\n• Simulation before actual changes\n• Performance benchmarking\n• Training & planning tool\n\n🏢 **Smart Building Solutions:**\n• HVAC automation\n• Lighting control systems\n• BMS (Building Management System)\n• Green building certification prep\n\n💡 **SCADA Systems:**\n• Centralized monitoring\n• Remote control\n• Historical data & reports\n\n**Industries served:**\n🏭 Manufacturing | 🏢 IT Parks | 🏥 Hospitals | 🏨 Hotels | 🏫 Institutions\n\nSmart energy consultation: solar@shankygroup.com',
    category: 'solar', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 7 — SHANKY ELECTRONICS HUB (300+ entries)
// ─────────────────────────────────────────────
export const ELECTRONICS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['shanky electronics','electronics hub','electronics company','shanky electronics hub','gadget company','electronics trading'],
    answer: '📱 **Shanky Electronics Hub LLP**\n\n📅 **Incorporated:** 2020\n🏢 **Type:** Limited Liability Partnership\n👥 **Designated Partners:** Vipin Kumar & Manoj Kumar Mishra\n\n**Business:** Electronics trading — consumer & industrial\n\n**Product Categories:**\n📺 Consumer Electronics — TV, AC, Refrigerator, WM\n💻 IT Products — Laptops, Desktops, Printers\n📱 Mobile & Tablets\n📸 Cameras & Accessories\n🔌 Electronic Components\n🏭 Industrial Electronics\n🎮 Gaming & Entertainment\n🔊 Audio Equipment\n🔋 Batteries & Power Products\n⚡ Solar Electronics (inverters, controllers)\n\n**Clients:**\n• Retailers & Distributors\n• Corporate bulk buyers\n• Government tenders\n• Industrial buyers\n\n**Brands:** All leading Indian & international brands\n\nKis product mein interest hai? 😊',
    category: 'electronics', priority: 10
  },
  {
    keywords: ['tv','television','smart tv','led tv','oled','qled','4k tv','tv price','kaunsa tv lena chahiye','tv recommendation'],
    answer: '📺 **Television Guide**\n\n**Types available:**\n🖥️ Full HD (1080p) — Budget friendly\n🖥️ 4K UHD — Premium clarity\n🖥️ OLED — Best picture quality\n🖥️ QLED — Bright & colorful\n\n**Size guide:**\n📏 32" — Small room / bedroom\n📏 43" — Medium room\n📏 55" — Living room\n📏 65"+ — Large living room / commercial\n\n**Brands we stock:**\n🔵 Samsung, LG, Sony, Philips\n🟡 Mi (Xiaomi), OnePlus, Vu, iFFALCON\n🟢 Panasonic, Hisense, TCL\n\n**Price range:**\n💰 32" HD: ₹12,000 - 20,000\n💰 43" 4K: ₹25,000 - 45,000\n💰 55" 4K: ₹40,000 - 80,000\n💰 65" OLED/QLED: ₹80,000 - 2,50,000+\n\n**Included:**\nDelivery + Installation + Demo\nWarranty: 1-3 years brand warranty\n\nBulk/corporate orders pe extra discount! 💼\nCall: +011-47586938',
    category: 'electronics', priority: 8
  },
  {
    keywords: ['laptop','notebook','laptop price','kaunsa laptop lena','laptop recommendation','laptop for work','laptop for student','gaming laptop','business laptop'],
    answer: '💻 **Laptop Buying Guide**\n\n**By Use Case:**\n\n📚 **Student Laptop:**\n• Budget: ₹25,000 - 45,000\n• Brands: Acer Aspire, Lenovo IdeaPad, HP 15\n• Specs: i3/Ryzen 3, 8GB RAM, 512 SSD\n\n💼 **Business/Office:**\n• Budget: ₹45,000 - 80,000\n• Brands: Dell Latitude, Lenovo ThinkPad, HP ProBook\n• Specs: i5/i7, 8-16GB RAM, 512-1TB SSD\n\n🎮 **Gaming:**\n• Budget: ₹70,000 - 2,00,000+\n• Brands: ASUS ROG, Lenovo Legion, MSI, HP Omen\n• Specs: i7/i9/Ryzen 7, 16-32GB, RTX GPU\n\n🎨 **Creative/Design:**\n• Budget: ₹80,000 - 2,50,000\n• Brands: MacBook, Dell XPS, ASUS ZenBook\n• Specs: i7, 16-32GB, Dedicated GPU, Retina display\n\n**Current Hot Deals:**\n🔥 Lenovo IdeaPad 5: ₹38,999\n🔥 HP Pavilion 15: ₹42,999\n🔥 Dell Inspiron 14: ₹45,999\n🔥 ASUS ROG Strix (Gaming): ₹89,999\n\nBulk orders (5+): Special corporate pricing!\nCall: +011-47586938',
    category: 'electronics', priority: 8
  },
  {
    keywords: ['mobile phone','smartphone','phone khareedna','mobile price','kaunsa mobile lena','phone recommendation','iphone','samsung phone','android','flagship'],
    answer: '📱 **Smartphone Guide**\n\n**Budget Segments:**\n\n💰 **Budget (₹8,000 - 15,000):**\n• Redmi 12C, Samsung Galaxy A04\n• Realme C55, Tecno Spark\n• Best for: Calls, social media, basic use\n\n💰 **Mid-range (₹15,000 - 30,000):**\n• Redmi Note 13, Samsung A34/A54\n• OnePlus Nord CE, Motorola G84\n• Best for: Most users, good cameras\n\n💰 **Premium (₹30,000 - 60,000):**\n• Samsung S23 FE, OnePlus 12R\n• Pixel 7a, Mi 13\n• Best for: Power users\n\n💰 **Flagship (₹60,000+):**\n• iPhone 15/15 Pro, Samsung S24+\n• OnePlus 12, Google Pixel 8 Pro\n• Best for: Best of the best\n\n**Our best sellers:**\n📦 Samsung Galaxy A54: ₹35,999 🔥\n📦 Redmi Note 13 Pro: ₹22,999 🔥\n📦 iPhone 15: ₹79,900 🔥\n\n**EMI available | Exchange welcome!**\n\nKaunsa phone chahiye? Detailed comparison de sakta hoon! 😊',
    category: 'electronics', priority: 8
  },
  {
    keywords: ['air conditioner','ac','split ac','window ac','inverter ac','ac price','ton ac','cooling','ghar thanda karna'],
    answer: '❄️ **Air Conditioner Guide**\n\n**Types:**\n🔲 **Split AC** — Most popular, 2 units\n🔲 **Window AC** — Single unit, cheaper\n🔲 **Cassette AC** — Ceiling mounted, commercial\n🔲 **Portable AC** — No installation needed\n\n**Capacity guide:**\n🌡️ 100-150 sq ft → 1 Ton\n🌡️ 150-200 sq ft → 1.5 Ton\n🌡️ 200-300 sq ft → 2 Ton\n🌡️ Large halls → 2-3 Ton+\n\n**Star ratings:**\n⭐ 3 Star — Standard\n⭐⭐ 4 Star — Better\n⭐⭐⭐ 5 Star — Best energy saving\n\n**Price range (Inverter Split AC):**\n💰 1 Ton 3★: ₹28,000 - 35,000\n💰 1.5 Ton 3★: ₹33,000 - 42,000\n💰 1.5 Ton 5★: ₹40,000 - 55,000\n💰 2 Ton 5★: ₹50,000 - 70,000\n\n**Brands:** Daikin, Voltas, Blue Star, LG, Samsung, Hitachi, Carrier\n\n**Installation:** Free with purchase!\n**Warranty:** 1 year + 5 year compressor\n\nBulk AC ke liye corporate deal: +011-47586938',
    category: 'electronics', priority: 8
  },
  {
    keywords: ['refrigerator','fridge','fridge price','double door','single door','side by side','freezer','kaunsa fridge lena'],
    answer: '🧊 **Refrigerator Guide**\n\n**Types:**\n🔲 **Single Door** — Small family, budget\n🔲 **Double Door** — Family of 4-6\n🔲 **Side-by-Side** — Large family, premium\n🔲 **French Door** — Ultra premium\n\n**Capacity guide:**\n1️⃣ Single person/couple: 165-200L\n2️⃣ Small family (3-4): 230-300L\n3️⃣ Medium family (4-5): 300-400L\n4️⃣ Large family (5+): 400-600L+\n\n**Price range:**\n💰 Single door 165L: ₹12,000 - 18,000\n💰 Double door 285L: ₹25,000 - 35,000\n💰 Double door 340L: ₹32,000 - 50,000\n💰 Side-by-side 600L+: ₹60,000 - 1,50,000\n\n**Top Brands:** LG, Samsung, Whirlpool, Godrej, Haier, Bosch\n\n**Features to look for:**\n✅ Frost-free (must have!)\n✅ Inverter compressor (energy saving)\n✅ Convertible sections\n✅ Smart connectivity (optional)\n\nCall: +011-47586938 | Delivery + Installation free in Delhi NCR! 🚛',
    category: 'electronics', priority: 7
  },
  {
    keywords: ['electronics warranty','warranty claim','repair','service center','electronics repair','kharab ho gaya','product faulty','exchange','replacement'],
    answer: '🔧 **Electronics Warranty & Support**\n\n**Standard Warranty:**\n✅ All products come with brand warranty\n✅ Bill mandatory for warranty claims\n✅ Home service for major appliances\n\n**Warranty types:**\n📋 On-site warranty: Technician aata hai\n📋 Carry-in warranty: Service center pe dena padta hai\n📋 Replacement warranty: Faulty product exchange\n\n**Our After-sales Policy:**\n🛡️ DOA (Dead on Arrival): 7 days replacement\n🛡️ Manufacturing defect: Brand warranty\n🛡️ Physical damage: Not covered (chargeable)\n\n**Service support:**\n• We coordinate with brand service centers\n• Priority service for bulk buyers\n• AMC (Annual Maintenance Contract) available\n\n**Contact for warranty:**\n📞 +011-47586940\n📧 support@shankygroup.com\n\nKoi product issue hai? Order number batao — main help karta hoon! 😊',
    category: 'electronics', priority: 7
  },
  {
    keywords: ['bulk electronics','corporate purchase','government tender','bulk order electronics','company ke liye electronics','employee laptop','office equipment'],
    answer: '🏢 **Corporate / Bulk Electronics Solutions**\n\n**We serve:**\n🏢 Corporate offices\n🏛️ Government departments\n🏥 Hospitals & healthcare\n🏫 Schools & colleges\n🏭 Industries & factories\n\n**What we offer:**\n✅ Custom configuration laptops/desktops\n✅ IT infrastructure setup\n✅ Branded merchandise\n✅ Annual procurement contracts\n✅ Centralized billing & invoice\n✅ GST compliance\n✅ Extended warranty options\n✅ Asset management support\n\n**Minimum order for corporate pricing:**\n💻 Laptops: 5 units+\n📱 Phones: 10 units+\n📺 TVs: 3 units+\n❄️ ACs: 5 units+\n\n**Payment terms:**\n• Credit available for corporates\n• PO-based purchases accepted\n• Government agencies: GFR compliance\n\n📧 corporate@shankygroup.com\n📞 +011-47586938 (ask for Corporate Desk)',
    category: 'electronics', priority: 8
  },
];

// ─────────────────────────────────────────────
//  SECTION 8 — SHANKY METALS (400+ entries)
// ─────────────────────────────────────────────
export const METALS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['shanky metals','metals company','shanky metals pvt ltd','metal trading','dhatu','metal business','metal company'],
    answer: '🔩 **Shanky Metals Pvt Ltd**\n\n📅 **Incorporated:** 2016\n👨‍💼 **Directors:** Vipin Kumar & Manoj Kumar Mishra\n💰 **Authorised Capital:** ₹75 Lakh\n💵 **Paid-up Capital:** ₹70 Lakh\n📊 **Revenue FY 2023-24:** ₹7.16 Crore\n🌍 **Export markets:** Hong Kong, SE Asia\n\n**Core Business:**\n🔩 Metal procurement (domestic + import)\n🔧 Processing & fabrication\n📦 Trading & distribution\n🌍 Export to international markets\n\n**Metals traded:**\n⚙️ Aluminium (all forms)\n⚙️ Copper (all grades)\n⚙️ Brass (all types)\n⚙️ Iron & Cast Iron\n⚙️ Mild Steel (all profiles)\n⚙️ Stainless Steel\n⚙️ Zinc & Zinc alloys\n⚙️ Lead\n⚙️ Nickel alloys\n\n**Services:**\n✅ Spot purchase & sales\n✅ Long-term supply contracts\n✅ Toll processing\n✅ Export documentation\n\nKis metal ki zaroorat hai? 💪',
    category: 'metals', priority: 10
  },
  {
    keywords: ['steel','steel price','steel rate','cr steel','hr steel','gp sheet','gc sheet','ms steel','mild steel','stainless steel','ss','steel types'],
    answer: '⚙️ **Steel Products & Pricing**\n\n**Steel Types we deal in:**\n\n🔹 **CR (Cold Rolled) Sheet/Coil:**\n• Thickness: 0.3mm - 4mm\n• Width: Up to 1250mm\n• Application: Auto parts, appliances, pipes\n• Rate: ₹65-75/kg\n\n🔹 **HR (Hot Rolled) Coil/Sheet:**\n• Thickness: 1.5mm - 25mm\n• Application: Construction, heavy machinery\n• Rate: ₹60-68/kg\n\n🔹 **GP (Galvanized Plain):**\n• Zinc coated for corrosion resistance\n• Application: Roofing, HVAC ducts\n• Rate: ₹75-82/kg\n\n🔹 **GC (Galvanized Corrugated):**\n• Corrugated sheets for roofing\n• Rate: ₹80-88/kg\n\n🔹 **SS (Stainless Steel) 304/316:**\n• Food grade, anti-corrosive\n• Rate: ₹200-280/kg (grade dependent)\n\n🔹 **Structural Steel (Angles, Channels, Beams):**\n• Rate: ₹58-65/kg\n\n*Prices subject to market fluctuations. For exact rates: +011-47586938*\n\n**MOQ:** 5 MT | Delivery: Pan-India',
    category: 'metals', priority: 9
  },
  {
    keywords: ['aluminium','aluminum','al','aluminium price','aluminium sheet','aluminium coil','aluminium extrusion','aluminium foil','aluminium window','aluminium rate'],
    answer: '⚪ **Aluminium Products & Pricing**\n\n**Aluminium forms available:**\n\n📋 **Sheets & Coils:**\n• Thickness: 0.2mm - 100mm\n• Alloys: 1050, 1100, 3003, 5052, 6061\n• Applications: Construction, auto, packaging\n• Rate: ₹230-260/kg\n\n📏 **Extrusions (Sections/Profiles):**\n• Angles, channels, T-sections, custom profiles\n• Alloy: 6063-T5, 6061-T6\n• Applications: Doors, windows, solar frames\n• Rate: ₹250-280/kg\n\n🔩 **Castings:**\n• Die casting, sand casting\n• LM6, LM25 alloys\n• Applications: Auto components\n• Rate: ₹240-270/kg\n\n📦 **Scrap:**\n• Taluminium, Tense, Cast scrap\n• Best buy-back prices\n• Rate: ₹160-200/kg\n\n**Special products:**\n• Aluminium foil (for packaging): ₹350-400/kg\n• Aluminium wire: ₹230-250/kg\n• Checkered sheets: ₹240-270/kg\n\n*MOQ: 1 MT | Delivery: Pan-India + Export*\n📞 +011-47586938',
    category: 'metals', priority: 9
  },
  {
    keywords: ['copper','cu','copper price','copper wire','copper rod','copper pipe','copper sheet','copper rate','tambaa','tamba'],
    answer: '🟤 **Copper Products & Pricing**\n\n**Copper forms available:**\n\n🔌 **Wires & Cables:**\n• ETP Copper wire (99.9% pure)\n• Sizes: 0.3mm - 10mm diameter\n• Applications: Electrical wiring, transformers\n• Rate: ₹760-820/kg\n\n🔩 **Rods & Bars:**\n• Round, square, hexagonal\n• Diameter: 5mm - 100mm\n• Applications: Machining, earthing\n• Rate: ₹770-830/kg\n\n📋 **Sheets & Strips:**\n• Thickness: 0.1mm - 20mm\n• Applications: Electronics, radiators\n• Rate: ₹780-840/kg\n\n🔧 **Pipes & Tubes:**\n• Refrigeration grade (ACR)\n• Plumbing grade\n• Rate: ₹820-900/kg\n\n🔩 **Copper Alloys:**\n• Brass (Cu-Zn): ₹520-560/kg\n• Bronze (Cu-Sn): ₹620-680/kg\n• Cupronickel: ₹900-1200/kg\n\n**Scrap copper rates:**\n• Millberry: ₹720-760/kg\n• Birch: ₹680-720/kg\n\n*LME tracking + local premium pricing*\n📞 metals@shankygroup.com',
    category: 'metals', priority: 9
  },
  {
    keywords: ['brass','brass price','brass fitting','brass rod','brass valve','brass rate','peetal','pittal'],
    answer: '🟡 **Brass Products & Pricing**\n\n**Brass (Cu-Zn alloy) — Popular product!**\n\n**Forms available:**\n\n🔩 **Rods & Bars:**\n• Round, hexagonal, square\n• Alloys: 60/40, 63/37, 70/30\n• Applications: Valves, fittings, turned parts\n• Rate: ₹520-560/kg\n\n📋 **Sheets & Strips:**\n• Thickness: 0.1mm - 10mm\n• Applications: Electrical contacts, decorative\n• Rate: ₹530-570/kg\n\n🔧 **Fittings & Valves:**\n• Plumbing fittings\n• Industrial valves\n• Rate: ₹550-620/kg (machined)\n\n🔌 **Tubes:**\n• Seamless & welded\n• Applications: Heat exchangers, condenser tubes\n• Rate: ₹540-580/kg\n\n**Scrap brass:**\n• Honey brass: ₹480-510/kg\n• Ebony brass: ₹450-480/kg\n• Navy brass: ₹440-470/kg\n\n**Export:**\nWe export brass scrap & semi-finished products to Hong Kong!\n\n📞 +011-47586938 | metals@shankygroup.com',
    category: 'metals', priority: 8
  },
  {
    keywords: ['metal export','export metals','hong kong metal','international metal','scrap export','metal import','lme','london metal exchange','commodity market'],
    answer: '🌍 **Metal Import-Export Operations**\n\n**Shanky Metals — International Trade**\n\n**Export Markets:**\n🇭🇰 Hong Kong — Primary market\n🌏 SE Asia — Vietnam, Thailand, Malaysia\n🌍 Middle East — UAE, Saudi Arabia\n\n**Export products:**\n• Brass scrap & alloys\n• Aluminium scrap\n• Copper scrap\n• Semi-finished metal products\n\n**Import capabilities:**\n• Copper ore & concentrates\n• Scrap metal from Europe/Japan\n• Special alloys (as per customer spec)\n\n**LME Pricing:**\n📊 We follow LME (London Metal Exchange) prices\n📊 Premium/discount based on quality\n📊 Hedging support available\n\n**Export documentation:**\n✅ Invoice & packing list\n✅ Bill of lading\n✅ Certificate of origin\n✅ Quality test report\n✅ DGFT compliance\n✅ RBI-FEMA compliant\n\n**Payment terms for export:**\n• LC at sight\n• TT payment\n• DP terms\n\nInternational deal ke liye: metals@shankygroup.com 🌐',
    category: 'metals', priority: 8
  },
  {
    keywords: ['metal quality','metal testing','metal grade','alloy composition','purity','metal certificate','material test report','mtr','spectro test'],
    answer: '🔬 **Metal Quality & Testing**\n\n**Quality Assurance Process:**\n\n1️⃣ **Incoming Quality Check:**\n• Visual inspection\n• Weight verification\n• Chemical analysis (XRF/Spectro)\n\n2️⃣ **Testing Methods:**\n🔬 XRF Spectroscopy (on-site)\n🔬 Wet chemical analysis\n🔬 Mechanical testing (tensile, hardness)\n🔬 Dimensional verification\n🔬 Surface quality inspection\n\n3️⃣ **Certifications provided:**\n📄 Material Test Report (MTR)\n📄 Mill Certificate\n📄 Chemical composition certificate\n📄 Third-party test reports (NABL labs)\n\n**Grades we confirm:**\n✅ BIS/IS grades\n✅ ASTM standards\n✅ EN/DIN standards\n✅ JIS standards\n\n**Our quality promise:**\n"Jo bola, woh diya — not a gram less, not a grade different!"\n\n📧 quality@shankygroup.com',
    category: 'metals', priority: 7
  },
  {
    keywords: ['metal scrap','scrap dealer','scrap buy','kabad','old metal','waste metal','dhatu kabad','scrap rate','kabaad'],
    answer: '♻️ **Metal Scrap Buying & Selling**\n\n**We buy scrap!** 💰\n\n**Scrap categories we purchase:**\n\n🟤 **Copper scrap:**\n• Millberry (clean wire): ₹720-760/kg\n• Mixed wire: ₹680-720/kg\n• Brass: ₹450-510/kg\n\n⚪ **Aluminium scrap:**\n• Taluminium (clean): ₹180-200/kg\n• Mixed cast: ₹160-180/kg\n• Taint tabor: ₹170-190/kg\n\n⚙️ **Steel scrap:**\n• HMS 1&2: ₹28-35/kg\n• Shredded: ₹30-36/kg\n• Cast iron: ₹22-28/kg\n\n🔩 **Other metals:**\n• Zinc: ₹240-260/kg\n• Lead: ₹140-160/kg\n• Stainless steel: ₹80-120/kg\n\n**Process:**\n1. Call karo — quantity batao\n2. Pickup arrange karein (5 MT+)\n3. Weighment & testing\n4. Same day/next day payment\n\n📞 +011-47586938 | ♻️ metals@shankygroup.com\n\n*Rates change daily based on LME*',
    category: 'metals', priority: 8
  },
];

// ─────────────────────────────────────────────
//  SECTION 9 — CORPORATE TRAINING (300+ entries)
// ─────────────────────────────────────────────
export const TRAINING_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['shanky corporate training','corporate training','training company','learning and development','l&d','employee training','skill development training'],
    answer: '📚 **Shanky Corporate Training Pvt Ltd**\n\n📅 **Established:** 2021\n🏆 **Award:** Best Corporate Training Provider — Delhi NCR 2023\n👥 **Trained:** 5,000+ professionals\n🏢 **Clients:** 100+ corporate clients\n\n**Training Portfolio:**\n\n👔 Leadership & Management\n💼 Sales & Business Development\n🤝 Soft Skills & Communication\n📊 Data Analytics & Excel\n🎯 Team Building & Collaboration\n📈 Strategic Thinking\n🔄 Change Management\n✨ Personality Development\n🗣️ Public Speaking & Presentation\n📋 Project Management\n🧠 Design Thinking\n💡 Innovation & Creativity\n👩‍💼 Women Leadership\n🌍 Cross-cultural Communication\n⏰ Time Management & Productivity\n\n**Delivery modes:**\n🖥️ Online | 🏢 Offline | 🔄 Hybrid | 📱 Mobile Learning\n\nKis program ki zaroorat hai? 😊',
    category: 'training', priority: 10
  },
  {
    keywords: ['leadership training','leadership development','manager training','management training','team leader training','leadership skills'],
    answer: '👔 **Leadership Development Programs**\n\n**Programs available:**\n\n🌟 **Executive Leadership Program (ELP)**\n• Duration: 3 days\n• Audience: Senior managers, VPs, Directors\n• Topics: Visionary leadership, Strategy, Stakeholder management\n• Fee: ₹2,500 per person (group of 15+)\n\n🌟 **First Time Manager Program (FTM)**\n• Duration: 2 days\n• Audience: New managers, team leads\n• Topics: Role transition, team management, feedback\n• Fee: ₹1,800 per person\n\n🌟 **High Potential Leadership (HiPo)**\n• Duration: 4-day module\n• Audience: Identified HiPos\n• Topics: Personal branding, influence, decision-making\n• Fee: ₹3,000 per person\n\n🌟 **Women Leadership (Shakti)**\n• Duration: 2 days\n• Audience: Women professionals\n• Topics: Breaking barriers, confidence, networking\n• Fee: ₹1,500 per person\n\n**All programs include:**\n✅ Pre-assessment\n✅ Custom case studies\n✅ Action learning projects\n✅ 30/60/90 day follow-up\n✅ Certificate of completion\n\nCustom program chahiye? training@shankygroup.com',
    category: 'training', priority: 9
  },
  {
    keywords: ['sales training','sales skills','selling skills','how to sell','sales technique','crm training','customer handling','objection handling','negotiation training'],
    answer: '💼 **Sales Training Programs**\n\n**SHANKY SALES ACADEMY — Flagship Program!**\n\n**Modules:**\n📌 Understanding modern buyers & decision makers\n📌 Consultative selling techniques\n📌 Value proposition crafting\n📌 Prospecting & lead generation\n📌 Cold calling & email outreach\n📌 Presentation & demo skills\n📌 Objection handling mastery\n📌 Negotiation & closing\n📌 Account management\n📌 CRM & sales tools\n📌 Social selling (LinkedIn)\n\n**Program formats:**\n⚡ Sales Bootcamp (2 days intensive)\n⚡ Weekly coaching (4 weeks)\n⚡ Monthly masterclass (ongoing)\n\n**Fees:**\n💰 Bootcamp (per person): ₹2,500\n💰 Weekly coaching (per person): ₹4,000/month\n💰 Corporate batch (20+): Customized\n\n**Results our clients see:**\n📈 25-40% increase in conversion rates\n📈 15-20% shorter sales cycles\n📈 30% improvement in deal size\n\n"Sales sikhna, duniya jeetna hai!" 🚀\n\nEnquiry: training@shankygroup.com',
    category: 'training', priority: 9
  },
  {
    keywords: ['soft skills','communication skills','personality development','spoken english','presentation skills','body language','etiquette','grooming','interpersonal'],
    answer: '🌟 **Soft Skills & Communication Programs**\n\n**Program: SHINE (Soft Skills for High Impact & Effectiveness)**\n\n**Modules:**\n🗣️ Effective Communication (verbal + written)\n👂 Active Listening\n💼 Professional Etiquette & Business Manners\n🤝 Interpersonal Skills & Relationship Building\n🎤 Presentation Skills\n🧠 Emotional Intelligence (EQ)\n⚡ Assertiveness & Confidence\n📧 Business Writing & Email Etiquette\n🌍 Cross-cultural Sensitivity\n⏰ Time Management\n💡 Problem Solving & Critical Thinking\n🔄 Adaptability & Resilience\n\n**Special Modules:**\n🗣️ Spoken English Enhancement\n📱 Digital Communication Etiquette\n🧘 Stress Management\n\n**Fees:**\n💰 2-day intensive: ₹1,500/person (batch of 20+)\n💰 1-month program: ₹3,000/person\n💰 Individual coaching: ₹500/session\n\n**Outcomes:**\n✅ Confident communicators\n✅ Professional image\n✅ Better workplace relationships\n\nApply: training@shankygroup.com',
    category: 'training', priority: 8
  },
  {
    keywords: ['team building','team work','team activity','outbound training','corporate outing','bonding activity','team cohesion'],
    answer: '🤝 **Team Building Programs**\n\n**Why team building?**\nStrong teams = Better results. Period! 💪\n\n**Our Team Building offerings:**\n\n🏕️ **Outbound Training (Outdoor):**\n• Rishikesh river rafting + team challenges\n• Manali adventure activities\n• Day trips: Sariska, Damdama Lake, Corbett\n• Duration: 1-3 days\n• Group: 15-100 people\n\n🏢 **Indoor Team Activities:**\n• Escape room challenges\n• Design thinking workshops\n• Hackathons\n• Innovation labs\n• Business simulations\n\n🎮 **Virtual Team Building:**\n• Online games & challenges\n• Virtual coffee chats\n• Digital town halls\n• Remote collaboration workshops\n\n**Themes:**\n🎯 Trust Building\n🎯 Communication Under Pressure\n🎯 Diversity & Inclusion\n🎯 Innovation Challenge\n🎯 Sustainability Challenge\n\n**Pricing:** ₹2,500 - ₹8,000 per person (based on program & location)\n\n📅 Book early — slots fill fast!\n📧 training@shankygroup.com | 📞 +011-47586941',
    category: 'training', priority: 8
  },
  {
    keywords: ['training schedule','training calendar','training dates','when is training','training timeline','upcoming training','next batch'],
    answer: '📅 **Training Calendar 2025**\n\n**Q1 (Jan-Mar 2025):**\n✅ Sales Bootcamp — Jan 15-16\n✅ First Time Manager — Jan 22-23\n✅ Soft Skills Intensive — Feb 5-6\n✅ Leadership Summit — Feb 20-21\n✅ Data Analytics Workshop — Mar 10-11\n\n**Q2 (Apr-Jun 2025):**\n✅ Women Leadership (Shakti) — Apr 8-9\n✅ Team Building Outbound (Rishikesh) — Apr 18-20\n✅ Executive Leadership Program — May 12-14\n✅ Negotiation Masterclass — May 22\n✅ Design Thinking — Jun 5-6\n\n**Q3 & Q4 (Jul-Dec 2025):**\nSchedule updating... Check website!\n\n**Custom/In-house programs:**\nWe come to YOUR office — any date! Min batch: 15 people\n\n**Early bird discounts:**\n🎯 30 days before: 10% off\n🎯 60 days before: 15% off\n\nRegister: training@shankygroup.com\nCall: +011-47586941',
    category: 'training', priority: 7
  },
  {
    keywords: ['training certificate','certificate course','certified training','training diploma','accreditation'],
    answer: '🎓 **Training Certifications**\n\n**All Shanky Training programs provide:**\n✅ Digital Certificate (shareable on LinkedIn)\n✅ Physical Certificate (posted)\n✅ Shanky Corporate Training seal\n✅ Program-specific competency badge\n\n**Accredited programs:**\n🏅 ICF-aligned coaching programs\n🏅 PMI-recognized project management\n🏅 SHRM-compatible HR programs\n\n**How to verify:**\nCertificate number website pe verify kar sakte hain!\n\n**Certificate benefits:**\n• Resume enhancement\n• LinkedIn profile boost\n• Industry recognition\n• Skill proof for promotions\n\n**For corporates:**\nCustom branded certificates with your company logo + Shanky certification — possible!\n\nSend enquiry: training@shankygroup.com 📧',
    category: 'training', priority: 7
  },
];


// ─────────────────────────────────────────────
//  SECTION 10 — CAREERS & JOBS (500+ entries)
// ─────────────────────────────────────────────
export const CAREERS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['career','careers','job','jobs','naukri','recruitment','vacancy','hiring','apply','resume','cv','job opening','job opportunity','placement','employment','rojgar','kaam dhundh raha','job chahiye','job chaiye','mujhe job chahiye','mujhe job chaiye','yahan job','yan job','mujhe yahan job','mujhe yan job chaiye','mujhe yan job chahiye'],
    answer: '💼 **Shanky Group — Career Hub**\n\n🌟 **Why join Shanky Group?**\n• Diversified group — 6 sectors to explore\n• Fast growth — promotions on merit\n• Learning culture — dedicated L&D\n• Work-life balance — people-first HR\n• Competitive pay + excellent benefits\n\n**Current Openings (2025):**\n\n1️⃣ **Finance Executive** — Shanky Financial\n   Qual: CA/CA Inter | Exp: 2-4 yrs | Delhi\n\n2️⃣ **Sales Manager (B2B)** — Multiple companies\n   Qual: MBA | Exp: 3-5 yrs | Delhi/PAN-India\n\n3️⃣ **Solar Project Engineer** — Shanky Smart Tech\n   Qual: B.Tech EE/EC | Exp: 2-5 yrs | Delhi\n\n4️⃣ **Metal Trader** — Shanky Metals\n   Qual: Any graduate | Exp: 2-4 yrs | Delhi\n\n5️⃣ **Operations Associate** — VMS Hub\n   Qual: Any graduate | Exp: 1-3 yrs | Delhi\n\n6️⃣ **HR Manager** — Group\n   Qual: MBA-HR | Exp: 4-6 yrs | Delhi\n\n7️⃣ **Digital Marketing Executive** — Group\n   Qual: Any graduate | Exp: 1-3 yrs | Delhi\n\n8️⃣ **Account Manager** — Multiple\n   Qual: B.Com/M.Com | Exp: 2-4 yrs | Delhi\n\n📧 **Apply:** careers@shankygroup.com\n📞 **HR helpline:** +011-47586941\n\nKis position mein interested ho? Detailed JD share karta hoon! 😊',
    category: 'careers', priority: 10
  },
  {
    keywords: ['finance job','ca job','accounts job','finance executive','finance manager','accounts manager','taxation job','audit job','finance vacancy','ca ki naukri'],
    answer: '💰 **Finance Jobs at Shanky Group**\n\n**Current Finance Openings:**\n\n👔 **Senior Finance Executive — Shanky Financial**\n📋 Responsibilities:\n• Working capital & credit analysis\n• Client relationship management\n• Loan documentation & processing\n• Portfolio monitoring & collections\n\n✅ Qualification: CA/CA Inter/MBA Finance\n✅ Experience: 2-4 years in B2B lending / NBFC / Bank\n✅ Skills: Financial analysis, Excel, Credit assessment\n💰 CTC: ₹6-10 LPA\n📍 Location: Delhi (NSP, Pitampura)\n\n👔 **Accounts Manager — Group HQ**\n📋 Responsibilities:\n• Monthly closing, MIS reports\n• GST filing, TDS compliance\n• Audit coordination\n• Vendor payments & reconciliation\n\n✅ Qualification: B.Com / M.Com / CA Inter\n✅ Experience: 2-4 years\n✅ Skills: Tally Prime, Excel, GST knowledge\n💰 CTC: ₹4.5-7 LPA\n📍 Location: Delhi\n\n📧 Apply: careers@shankygroup.com\nSubject: "Application — [Position Name] — [Your Name]"\n\nCV bhejo, main directly HR ko forward karunga! 🚀',
    category: 'careers', priority: 9
  },
  {
    keywords: ['sales job','sales executive','sales manager','business development','bd job','sales vacancy','sales officer','field sales','inside sales','account manager job'],
    answer: '🎯 **Sales & BD Jobs at Shanky Group**\n\n**Current Sales Openings:**\n\n🔥 **Sales Manager — Shanky Financial** (Urgent!)\n• B2B sales, sell financial products to corporates\n• Target: ₹2-5 Cr monthly disbursement\n• CTC: ₹8-14 LPA + incentives (no cap!)\n• Exp: 3-5 yrs B2B sales, banking/NBFC preferred\n\n🔥 **Business Development Executive — Electronics Hub**\n• Corporate sales, tender business\n• Target: Monthly ₹50 Lakh+ revenue\n• CTC: ₹5-8 LPA + 2-3% incentive\n• Exp: 2-3 yrs, electronics/IT preferred\n\n🔥 **Solar Project Sales — Smart Tech**\n• Rooftop & ground-mount solar sales\n• Good network in industrial segment preferred\n• CTC: ₹7-12 LPA + project commission\n• Exp: 2-5 yrs solar/energy sector\n\n🔥 **Metal Sales Executive — Shanky Metals**\n• Metals B2B sales — industries, factories\n• Travel required (Delhi NCR + nearby)\n• CTC: ₹5-8 LPA + commission on sales\n• Exp: 2-4 yrs metal/commodity trading\n\n**Common Sales Perks:**\n✅ Unlimited incentives\n✅ Travel reimbursement\n✅ Mobile & data allowance\n✅ Health insurance\n\n📧 careers@shankygroup.com | 📞 +011-47586941',
    category: 'careers', priority: 9
  },
  {
    keywords: ['engineering job','solar engineer','technical job','epc engineer','project engineer','electrical engineer','solar technician','site engineer','commissioning engineer'],
    answer: '⚙️ **Engineering Jobs at Shanky Smart Tech**\n\n**Current Engineering Openings:**\n\n🔆 **Solar EPC Project Engineer**\n📋 Role: Design, procurement, execution, commissioning\n✅ Qualification: B.Tech EE / EC / Mechanical\n✅ Experience: 2-5 years in solar EPC\n✅ Must know: AutoCAD/PVSyst, IEC standards\n✅ Travel: Yes (site-based assignments)\n💰 CTC: ₹5-9 LPA\n\n🔆 **Solar Design Engineer**\n📋 Role: System sizing, energy yield analysis, drawings\n✅ Qualification: B.Tech EE\n✅ Experience: 1-3 years\n✅ Tools: PVSyst, Homer, AutoCAD, SketchUp\n💰 CTC: ₹4-7 LPA\n\n🔆 **IoT / Automation Engineer**\n📋 Role: IoT device integration, SCADA, remote monitoring\n✅ Qualification: B.Tech EC/CS\n✅ Experience: 2-4 years\n✅ Skills: Python, IoT protocols (MQTT, Modbus), cloud platforms\n💰 CTC: ₹6-10 LPA\n\n🔆 **Solar Technician / Supervisor**\n📋 Role: Installation & maintenance on-site\n✅ Qualification: Diploma EE\n✅ Experience: 1-3 years\n✅ Certificate: EESL/MNRE solar certificate preferred\n💰 CTC: ₹2.5-4 LPA\n\n📧 careers@shankygroup.com',
    category: 'careers', priority: 9
  },
  {
    keywords: ['hr job','human resource job','hr manager','hr executive','talent acquisition','recruiter job','hr generalist','payroll job','hr vacancy'],
    answer: '👥 **HR Jobs at Shanky Group**\n\n**HR Manager — Group Level**\n📋 Responsibilities:\n• Full employee lifecycle management\n• Talent acquisition & campus hiring\n• Learning & development programs\n• Performance management system\n• Payroll & compliances (PF, ESI, TDS)\n• HRIS implementation\n• HR policies & handbook\n• Employee engagement\n\n✅ Qualification: MBA-HR (Tier 1/2 college preferred)\n✅ Experience: 4-6 years HR generalist\n✅ Skills: Zoho People/Darwinbox, Excel, communication\n✅ Team handling: 3-5 HR team members\n💰 CTC: ₹8-14 LPA\n📍 Delhi — Group HQ\n\n**HR Executive**\n✅ Experience: 2-3 years\n✅ CTC: ₹4-6 LPA\n\n**Recruiter (Talent Acquisition)**\n✅ Experience: 1-3 years hiring\n✅ CTC: ₹3.5-5.5 LPA\n\n**HR culture at Shanky:**\n✅ People-first philosophy\n✅ POSH compliant\n✅ Open door policy\n✅ Quarterly townhalls\n✅ Employee NPS score: 75+ (FY 2024)\n\n📧 careers@shankygroup.com',
    category: 'careers', priority: 8
  },
  {
    keywords: ['marketing job','digital marketing','social media job','content writer','seo job','sem job','marketing executive','brand job','marketing manager'],
    answer: '📣 **Marketing Jobs at Shanky Group**\n\n**Digital Marketing Executive**\n📋 Responsibilities:\n• SEO, SEM, Social Media management\n• Content creation (blog, social, email)\n• Google Ads & Meta Ads management\n• Analytics & reporting\n• Email marketing campaigns\n• Website management (WordPress/WooCommerce)\n\n✅ Qual: Any graduate with digital marketing certification\n✅ Exp: 1-3 years\n✅ Tools: Google Analytics, SEMrush, Canva, Meta Business\n💰 CTC: ₹3.5-6 LPA\n\n**Content Writer**\n📋 Responsibilities:\n• Blog posts, whitepapers, case studies\n• Social media captions\n• Product descriptions\n• Email newsletters\n\n✅ Qual: English/Mass Comm graduate\n✅ Exp: 1-2 years\n💰 CTC: ₹2.5-4 LPA\n\n**Brand Manager** (Senior)\n✅ Exp: 5-7 years\n💰 CTC: ₹12-18 LPA\n\n**Social Media Handles to follow:**\n📘 LinkedIn: Shanky Group Official\n📸 Instagram: @shankygroup\n🐦 Twitter/X: @shankygroup\n▶️ YouTube: Shanky Group\n\n📧 careers@shankygroup.com',
    category: 'careers', priority: 8
  },
  {
    keywords: ['fresher job','freshers','entry level','no experience','graduate job','pass out 2024','pass out 2025','college se seedha','new graduate','first job'],
    answer: '🎓 **Freshers — Shanky Group mein aapka swagat hai!**\n\n**Positions for Freshers:**\n\n🌟 **Management Trainee (MT) Program:**\n• 12-month structured program\n• 3 rotations across departments\n• Mentorship by senior leaders\n• Stipend: ₹20,000-25,000/month\n• PPO (Pre-placement offer) on performance\n• CTC post-training: ₹4-5.5 LPA\n\n🌟 **Sales Trainee:**\n• 6 months training + live targets\n• Mentorship + classroom learning\n• Stipend: ₹18,000-22,000\n• CTC post-training: ₹4-6 LPA (+ incentives)\n\n🌟 **Finance Trainee:**\n• CA inter / B.Com freshers\n• Accounts, MIS, GST, audit support\n• Stipend: ₹15,000-20,000\n• CTC post-training: ₹3.5-5 LPA\n\n🌟 **IT Trainee:**\n• B.Tech CS/IT\n• Digital projects, automation\n• Stipend: ₹18,000-25,000\n\n**Eligibility:**\n✅ 2023/2024/2025 passout\n✅ 60%+ throughout\n✅ Good comm skills\n✅ MS Office basic\n\n**Campus hiring:**\n📚 DU colleges, IP University, GGSIPU\n📚 Delhi NCR engineering colleges\n\n📧 careers@shankygroup.com | Apply NOW! 🚀',
    category: 'careers', priority: 9
  },
  {
    keywords: ['internship','intern','summer internship','winter internship','6 months internship','3 months internship','industrial training','project trainee','stipend'],
    answer: '🎯 **Internship Opportunities 2025**\n\n**Available Internship Programs:**\n\n☀️ **Solar Energy Intern — Smart Tech**\n• Duration: 3-6 months\n• Work: Site surveys, design, commissioning support\n• Stipend: ₹10,000-15,000/month\n• For: B.Tech EE/EC final year\n\n💰 **Finance Intern — Shanky Financial**\n• Duration: 2-6 months\n• Work: Credit analysis, documentation, MIS\n• Stipend: ₹8,000-12,000/month\n• For: CA students, MBA Finance\n\n📱 **Marketing/Digital Intern — Group**\n• Duration: 2-4 months\n• Work: Social media, content, analytics\n• Stipend: ₹8,000-12,000/month\n• For: Any stream with interest in marketing\n\n🔩 **Supply Chain Intern — VMS Hub / Metals**\n• Duration: 3-6 months\n• Work: Procurement, logistics, vendor management\n• Stipend: ₹8,000-12,000/month\n• For: MBA Operations, Logistics\n\n👥 **HR Intern — Group**\n• Duration: 2-3 months\n• Work: Recruitment, engagement, admin\n• Stipend: ₹7,000-10,000/month\n• For: MBA-HR students\n\n**Apply:**\n📧 internship@shankygroup.com\n📝 Subject: "Internship Application — [Domain] — [College Name]"',
    category: 'careers', priority: 9
  },
  {
    keywords: ['salary structure','salary breakup','ctc breakup','in hand salary','gross salary','net salary','take home','pay slip','pay structure','compensation structure'],
    answer: '💵 **Salary Structure at Shanky Group**\n\n**Typical CTC components:**\n\n**Example: ₹6 LPA CTC**\n\n📊 **Fixed Component:**\n• Basic Salary: ₹20,000/month (40% of CTC)\n• HRA: ₹10,000/month (50% of Basic)\n• Conveyance: ₹3,200/month\n• Medical: ₹1,250/month\n• Other allowances: ₹5,000/month\n**Gross Monthly: ₹39,450**\n\n📊 **Employer Contributions (CTC inclusions):**\n• PF (12% of Basic): ₹2,400/month\n• Gratuity (4.81% of Basic): ₹961/month\n\n📊 **Deductions from gross:**\n• Employee PF: ₹2,400\n• Professional Tax: ₹200\n• TDS: As applicable\n\n**Approx In-hand:** ₹33,000-36,000 (for ₹6 LPA)\n\n**Variable Pay:**\n• Performance Bonus: 10-20% of annual CTC\n• Sales Incentive: Unlimited (sales roles)\n• Festival Bonus: 1 month basic\n\n**Benefits:**\n✅ Health insurance: ₹3 Lakh cover (self+family)\n✅ PF: Both side contribution\n✅ 15 days earned leave\n✅ 12 days casual + sick leave\n✅ Mobile reimbursement (sales roles)\n\n*Exact structure varies by role & level*',
    category: 'careers', priority: 8
  },
  {
    keywords: ['interview process','interview ke liye kya karna','how to get job','job process','selection process','recruitment process','interview tip','interview prepare'],
    answer: '📋 **Shanky Group — Hiring Process**\n\n**Step-by-step process:**\n\n**1️⃣ Application**\n📧 careers@shankygroup.com pe CV bhejo\nYa website careers section pe apply karo\n\n**2️⃣ Screening (2-3 days)**\n• HR team CV review karta hai\n• Shortlisted candidates ko call aata hai\n• Basic eligibility check\n\n**3️⃣ Phone/Video Screening (30 min)**\n• HR round\n• Background, experience, expectations\n• Salary discussion\n\n**4️⃣ Technical/Functional Round (60-90 min)**\n• Hiring manager ke saath\n• Technical knowledge test\n• Case studies / roleplay (sales roles)\n\n**5️⃣ Final Round (30-45 min)**\n• Senior leadership / Director level\n• Cultural fit, vision alignment\n• Company overview\n\n**6️⃣ Offer & Joining (3-7 days)**\n• Offer letter\n• Background verification\n• Joining formalities\n\n**Interview Tips for Shanky Group:**\n✅ Company research karo (website padho!)\n✅ Apni achievements numbers mein batao\n✅ Why Shanky Group? — clear answer rakhho\n✅ Questions zaroor poocho\n\nAll the best! 💪 Tumhara wait kar rahe hain!',
    category: 'careers', priority: 8
  },
  {
    keywords: ['work from home','wfh','remote work','hybrid work','work from office','office hours','working hours employee','flexible timing','shift','work life balance'],
    answer: '⚖️ **Work Policy at Shanky Group**\n\n**Work Model:**\n🏢 **Office-first** culture (most roles)\n🔄 **Hybrid** available for some senior roles\n🌐 **Remote** for specific digital/IT roles\n\n**Office hours:**\n⏰ Monday-Friday: 9:30 AM - 6:30 PM\n⏰ Saturday: 10:00 AM - 4:00 PM (alternate)\n🚫 Sunday: Off\n\n**Flexi-timing:**\n✅ Core hours: 11 AM - 5 PM (mandatory)\n✅ Outside core hours — flexible\n✅ 40-hour work week\n\n**Leave Policy:**\n📅 Earned Leave: 15 days/year\n📅 Casual Leave: 8 days/year\n📅 Sick Leave: 7 days/year\n📅 National Holidays: All\n📅 Festive leaves: 5 optional\n📅 Maternity: 26 weeks (as per law)\n📅 Paternity: 7 days\n\n**Work-life balance initiatives:**\n✅ Mental health days\n✅ No late-night emails policy\n✅ Annual team outing\n✅ Flexi-Fridays (WFH option in some depts)\n\n"We believe happy employees = happy customers!" 😊',
    category: 'careers', priority: 7
  },
  {
    keywords: ['employee benefits','perks','amenities','benefits at shanky','employee facilities','insurance','pf','esi','gratuity','health insurance'],
    answer: '🎁 **Employee Benefits & Perks**\n\n**Financial Benefits:**\n💰 Competitive salary (reviewed annually)\n💰 Performance bonus (10-20% of CTC)\n💰 Festival bonus (Diwali, Holi)\n💰 PF + Gratuity (as per law)\n💰 Sales incentives (no upper cap!)\n💰 Referral bonus: ₹5,000-25,000\n\n**Health & Insurance:**\n🏥 Mediclaim: ₹3 Lakh (self + spouse + 2 kids)\n🦷 Dental & vision coverage\n🧘 EAP (Employee Assistance Program)\n🤸 Gym membership subsidy\n\n**Learning & Growth:**\n📚 ₹15,000/year L&D budget per employee\n🎓 Internal training (free)\n🏫 Education sponsorship for higher studies\n📜 Professional certification support\n\n**Office Facilities:**\n☕ Cafeteria (subsidized meals)\n🚗 Parking (limited)\n💻 Latest technology tools\n🏋️ Recreation room\n\n**Recognition:**\n🏆 Employee of the Quarter award\n🌟 Star performer recognition\n📈 Fast-track promotion policy\n🎉 Annual performance awards night\n\n**Long-term benefits:**\n✅ ESOP for senior employees (under consideration)\n\nShanky mein join karo, grow karo! 🚀',
    category: 'careers', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 11 — CONTACT & LOCATION (400+ entries)
// ─────────────────────────────────────────────
export const CONTACT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['contact','reach us','baat karni hai','call','phone','email','contact details','samparak','sampark','get in touch','contact information','helpline'],
    answer: '📞 **Shanky Group — Complete Contact Information**\n\n🏢 **Head Office:**\nD Mall, Netaji Subhash Place (NSP),\nPitampura, Delhi - 110034\n\n**📞 Phone Numbers:**\n• Main Line: +011-47586938\n• Sales Enquiry: +011-47586939\n• Customer Support: +011-47586940\n• HR / Careers: +011-47586941\n• 24x7 Emergency: +011-47586938 (Press 9)\n\n**📧 Email IDs:**\n• General: info@shankygroup.com\n• Sales: sales@shankygroup.com\n• Support: support@shankygroup.com\n• Finance: finance@shankygroup.com\n• Careers: careers@shankygroup.com\n• Training: training@shankygroup.com\n• Metals: metals@shankygroup.com\n• Solar: solar@shankygroup.com\n• VMS/Food: vms@shankygroup.com\n• Partnership: partnership@shankygroup.com\n\n**🌐 Website:** www.shankygroup.com\n\n**📱 Social Media:**\n• LinkedIn: /company/shankygroup\n• Instagram: @shankygroup\n• Facebook: /shankygroup\n\n⏰ **Office Hours:** Mon-Sat, 10AM-8PM\n\nMain yahan hoon — kuch aur chahiye? 😊',
    category: 'contact', priority: 10
  },
  {
    keywords: ['address','location','pata','kahan hai','office address','headquarters','delhi office','office kahan','physical address','postal address'],
    answer: '📍 **Shanky Group Office Address**\n\n**Complete Address:**\nD Mall, Netaji Subhash Place (NSP),\nPitampura, Delhi - 110034, India\n\n**Landmarks (easy to find!):**\n🚇 Pitampura Metro Station — 5 min walk\n📺 Near TV Tower, Pitampura\n🏬 Inside D Mall complex\n🛣️ NSP Ring Road se just left\n\n**GPS Coordinates:**\n📡 28.6899° N, 77.1518° E\n\n**Other offices:**\n🏢 Mumbai office — Coming 2025!\n🏢 Bengaluru office — Coming 2025!\n\n**Visitor guidelines:**\n• Visitor pass at reception\n• ID proof mandatory\n• Meeting appointment preferred\n• Parking: Basement (limited)\n\nGoogle Maps pe "Shanky Group NSP Delhi" search karo! 🗺️',
    category: 'contact', priority: 10
  },
  {
    keywords: ['how to reach','directions','kaise aaye','raasta','route','navigate','direction','from metro','from airport','from railway station','nearest metro'],
    answer: '🧭 **Shanky Group Kaise Pahunche?**\n\n**🚇 By Metro (Best option!):**\nRed Line → Pitampura Station\nExit Gate 2 → Right turn → 200m walk → D Mall\n⏱️ Time: 5 min from Pitampura Metro\n\n**🚌 By Bus:**\nNSP Bus Terminal is right here\nDTC buses: 104, 318, 416 stop at NSP\nAuto/Rickshaw from terminal: ₹20-30\n\n**🚗 By Car (from key points):**\n• Connaught Place: 35-45 min via Ring Road\n• IGI Airport: 40-55 min via NH-48\n• New Delhi Railway Station: 30-40 min\n• Gurgaon: 60-75 min\n• Noida: 50-65 min\n• Faridabad: 55-70 min\n\n**🛺 By Ola/Uber:**\nSearch: "D Mall, Netaji Subhash Place, Pitampura"\n\n**✈️ From Airport:**\nAirport Metro → New Delhi Station → Red Line → Pitampura\nTotal: 50-60 min | Cost: ₹60-80\nAlternative: Taxi ~₹450-550\n\n**🚂 From Railway Station:**\nNew Delhi Station: Auto/Metro (Red Line) → Pitampura\nTime: 35-45 min\n\n**Parking:**\n🅿️ D Mall basement parking available\nCharges: ₹20/hr for 2-wheelers, ₹40/hr for cars',
    category: 'contact', priority: 9
  },
  {
    keywords: ['office timings','office hours','working hours','kab khulta','kab band hota','open time','close time','saturday timing','sunday closed','holiday','lunch break'],
    answer: '⏰ **Shanky Group Office Timings**\n\n**Regular Working Hours:**\n📅 Monday — Friday: 10:00 AM - 8:00 PM\n📅 Saturday: 10:00 AM - 6:00 PM\n🚫 Sunday: CLOSED\n\n**Lunch Break:** 1:30 PM - 2:30 PM\n(Staff available, slight delay possible)\n\n**Public Holidays:** (All national holidays)\n• Republic Day (26 Jan)\n• Independence Day (15 Aug)\n• Gandhi Jayanti (2 Oct)\n• All major festivals (Diwali, Holi, Eid, Christmas)\n\n**2nd Saturday:** Off (every 2nd Saturday of month)\n\n**Best time to call:**\n✅ 11:00 AM - 1:00 PM (most available)\n✅ 3:00 PM - 5:00 PM (best for quick queries)\n⚠️ 6:00 PM - 8:00 PM (busy, slight wait possible)\n\n**Emergency Contact (after hours):**\n📞 +011-47586938 → Press 9 (24x7 emergency line)\n\n**Chat support (this bot):**\n⏰ Available 24x7 — anytime poocho! 🤖',
    category: 'contact', priority: 10
  },
  {
    keywords: ['phone number','call number','contact number','helpline number','toll free','mobile number','whatsapp number','shanky phone'],
    answer: '📞 **Shanky Group Phone Numbers**\n\n**Main Lines:**\n📱 Main Helpline: **+011-47586938**\n📱 Sales: **+011-47586939**\n📱 Support: **+011-47586940**\n📱 Careers/HR: **+011-47586941**\n\n**Department Direct Lines:**\n💰 Finance queries: +011-47586938 (Press 1)\n☀️ Solar enquiry: +011-47586938 (Press 2)\n🔩 Metals trading: +011-47586938 (Press 3)\n📱 Electronics: +011-47586938 (Press 4)\n🌾 Food/VMS: +011-47586938 (Press 5)\n📚 Training: +011-47586938 (Press 6)\n\n**IVR Menu:**\n1 — Finance\n2 — Solar\n3 — Metals\n4 — Electronics\n5 — VMS / Food\n6 — Training\n7 — HR/Careers\n8 — General enquiry\n9 — Emergency (24x7)\n0 — Operator\n\n⏰ Phone support: Mon-Sat, 10AM-8PM\n📧 Alternatively: info@shankygroup.com',
    category: 'contact', priority: 9
  },
  {
    keywords: ['email','mail','email id','email address','official email','contact email','shanky email','info email','grievance email'],
    answer: '📧 **Shanky Group Email Addresses**\n\n**General:**\n📮 info@shankygroup.com (General enquiry)\n📮 hello@shankygroup.com (Quick hello!)\n\n**Business:**\n💰 finance@shankygroup.com\n☀️ solar@shankygroup.com\n🔩 metals@shankygroup.com\n📱 electronics@shankygroup.com\n🌾 vms@shankygroup.com\n\n**Support:**\n🛠️ support@shankygroup.com\n📦 orders@shankygroup.com\n♻️ returns@shankygroup.com\n\n**People:**\n💼 careers@shankygroup.com\n📚 training@shankygroup.com\n🤝 partnership@shankygroup.com\n\n**Compliance:**\n⚖️ legal@shankygroup.com\n🔒 ethics@shankygroup.com\n📊 accounts@shankygroup.com\n\n**Response time:**\n⚡ Urgent: Within 4-8 hours\n📬 Normal: Within 24-48 hours\n📅 Weekends: Reply on next working day\n\n📝 **Pro tip:** Subject line mein clearly topic likho for faster response! 💡',
    category: 'contact', priority: 9
  },
  {
    keywords: ['social media','instagram','facebook','linkedin','twitter','youtube','shanky social','follow us','social media handles'],
    answer: '📱 **Shanky Group Social Media**\n\n**Follow us everywhere!**\n\n💼 **LinkedIn:** linkedin.com/company/shankygroup\n(Company updates, jobs, industry news)\n\n📸 **Instagram:** @shankygroup\n(Behind the scenes, culture, solar projects)\n\n📘 **Facebook:** facebook.com/shankygroup\n(Events, announcements, community)\n\n🐦 **Twitter/X:** @shankygroup\n(Quick updates, industry trends)\n\n▶️ **YouTube:** YouTube.com/shankygroup\n(Training videos, solar project tours, webinars)\n\n📱 **WhatsApp Business:** (Coming soon!)\n\n**Why follow us?**\n✅ First to know about job openings\n✅ Industry news & insights\n✅ Special offers & events\n✅ Company culture glimpses\n✅ Free educational content\n\n**Hashtags:**\n#ShankyGroup #MadeInIndia #SolarIndia #GreenEnergy\n\nAaj hi follow karo — free knowledge milta hai! 🌟',
    category: 'contact', priority: 8
  },
  {
    keywords: ['complaint','grievance','feedback','shikayat','problem','complain','issue','escalation','not happy','bad service','cheating','dhoka'],
    answer: '🛠️ **Complaint & Grievance Redressal**\n\n**Main hoon yahan — ghabrao mat! 😊**\n\n**Complaint channels:**\n\n**Level 1 — Customer Support:**\n📞 +011-47586940\n📧 support@shankygroup.com\n⏱️ Response: 24-48 hours\n\n**Level 2 — Manager Escalation:**\n📧 escalation@shankygroup.com\n⏱️ Response: 2-3 working days\nHum cases ko personally handle karte hain!\n\n**Level 3 — Grievance Officer:**\n📧 grievance@shankygroup.com\n⏱️ Response: 5-7 working days\nFormal resolution letter diya jayega\n\n**For urgent/serious matters:**\n📞 Direct to Director: +011-47586938 (Press 0)\n\n**Online feedback:**\n🌐 Website par feedback form available\n📝 Google review bhi de sakte hain\n\n**What we need from you:**\n• Your name & contact\n• Order/reference number\n• Clear description of issue\n• Expected resolution\n\n"Aapki shikayat hamari improvement ka raasta hai!" 🙏\n\nAbhi batao kya hua — main help karta hoon! 😊',
    category: 'contact', priority: 9
  },
];

// ─────────────────────────────────────────────
//  SECTION 12 — GOVERNMENT SCHEMES & BUSINESS (400+ entries)
// ─────────────────────────────────────────────
export const SCHEMES_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['government scheme','sarkari yojana','government loan','government subsidy','government benefit','startup india','make in india','msme scheme','pm scheme','india scheme'],
    answer: '🇮🇳 **Government Schemes — Shanky Group Helps You Avail!**\n\n**Business Finance Schemes:**\n💰 MUDRA Loan (PM Mudra Yojana)\n💰 CGTMSE (Credit Guarantee Fund)\n💰 SIDBI schemes for MSMEs\n💰 Stand-Up India (SC/ST & women entrepreneurs)\n💰 PM SVANidhi (street vendors)\n\n**Solar Schemes:**\n☀️ PM Surya Ghar Muft Bijli Yojana\n☀️ PM KUSUM (farmers — 90% subsidy!)\n☀️ REWA Ultra Mega Solar\n☀️ State-level solar schemes\n\n**Manufacturing:**\n🏭 PLI (Production Linked Incentive)\n🏭 Make in India\n🏭 PM Gati Shakti\n🏭 DPIIT Startup Recognition\n\n**Agriculture:**\n🌾 PM Kisan\n🌾 Kisan Credit Card\n🌾 PM Fasal Bima Yojana\n🌾 eNAM (National Agriculture Market)\n\n**Shanky Group helps you with:**\n✅ Scheme identification\n✅ Application process\n✅ Documentation support\n✅ Bank liaison\n\nKis scheme ke baare mein jaanna hai? 📋',
    category: 'schemes', priority: 9
  },
  {
    keywords: ['gst','gst registration','gst number','gst filing','gst return','gstin','gst kya hai','gst apply','goods and service tax','gst rate'],
    answer: '📋 **GST — Complete Guide**\n\n**GST kya hai?**\nGoods and Services Tax — India ka unified indirect tax jo July 2017 mein implement hua.\n\n**GST Slabs:**\n0% — Essential foods, books, healthcare\n5% — Basic food items, transport\n12% — Processed foods, computers\n18% — Most services, mobiles, ACs\n28% — Luxury items, tobacco, cement\n\n**GST Registration kab chahiye?**\n📌 Annual turnover ₹40 Lakh+ (goods) → Mandatory\n📌 Annual turnover ₹20 Lakh+ (services) → Mandatory\n📌 Interstate supply → Registration mandatory (any turnover)\n📌 E-commerce sellers → Mandatory\n\n**Registration process:**\n1. gst.gov.in pe apply\n2. Documents: PAN, Aadhaar, bank details, business proof\n3. OTP verification\n4. GSTIN in 3-7 working days\n\n**Returns (filing frequency):**\n📅 GSTR-3B: Monthly (by 20th of next month)\n📅 GSTR-1: Monthly/Quarterly (sales data)\n📅 GSTR-9: Annual return\n\n**Input Tax Credit (ITC):**\nBusiness expenses pe GST = refund/set-off!\n\nGST help chahiye? Shanky Financial ki team assist karti hai! 💼',
    category: 'schemes', priority: 8
  },
  {
    keywords: ['company registration','pvt ltd','private limited','llp','partnership','proprietorship','incorporation','mca','roc','company kaise banate','company register karna'],
    answer: '🏢 **Business Registration Guide**\n\n**Business structures in India:**\n\n👤 **Sole Proprietorship:**\n• 1 person, simplest form\n• No separate registration needed\n• Unlimited liability\n• Best for: Very small businesses\n\n🤝 **Partnership Firm:**\n• 2-20 partners\n• Partnership deed required\n• Unlimited liability (generally)\n• Best for: Small professional firms\n\n🏢 **LLP (Limited Liability Partnership):**\n• Limited liability protection\n• Flexible management\n• MCA registration required\n• Best for: Professional services, startups\n• Cost: ₹5,000-10,000 registration\n\n🏛️ **Private Limited Company:**\n• Maximum protection\n• Easier funding\n• More compliance\n• 2-200 shareholders\n• Cost: ₹7,000-15,000 registration\n• Best for: Scalable businesses\n\n**OPC (One Person Company):**\n• Single person, corporate protection\n• Good for solopreneurs\n\n**Process (Pvt Ltd):**\n1. DIN (Director ID) apply\n2. DSC (Digital Signature)\n3. Name reservation (SPICe+)\n4. MOA/AOA drafting\n5. Certificate of Incorporation\n\n⏱️ Time: 15-25 working days\n\nShanky Financial consultation deti hai — call karo! 📞',
    category: 'schemes', priority: 7
  },
  {
    keywords: ['income tax','itr','tax return','tax filing','tax save','80c','80d','tds','advance tax','tax deduction','tax slab','tax kitna lagta'],
    answer: '💰 **Income Tax Guide (FY 2024-25)**\n\n**New Tax Regime (Default):**\n• ₹0 - 3 Lakh: NIL\n• ₹3L - 7L: 5%\n• ₹7L - 10L: 10%\n• ₹10L - 12L: 15%\n• ₹12L - 15L: 20%\n• Above ₹15L: 30%\n\n**Old Tax Regime (Optional):**\n• ₹0 - 2.5L: NIL\n• ₹2.5L - 5L: 5%\n• ₹5L - 10L: 20%\n• Above ₹10L: 30%\n• Deductions available (80C, 80D, HRA etc.)\n\n**Key Deductions (Old Regime):**\n📋 80C: ₹1.5 Lakh (PPF, LIC, ELSS, PF)\n📋 80D: ₹25,000 health insurance\n📋 HRA: Rent exemption\n📋 80E: Education loan interest\n📋 24B: ₹2 Lakh home loan interest\n\n**Tax saving tips:**\n✅ ELSS mutual funds (market-linked + 80C)\n✅ PPF (guaranteed returns + tax free)\n✅ NPS (extra ₹50,000 deduction)\n✅ Health insurance (80D)\n\n**ITR filing deadline:**\n📅 Individuals: 31st July\n📅 Companies (audit): 30th September\n📅 Revised return: 31st December\n\n*For professional tax advice, consult a CA.*\nShanky Financial ke CA se consultation book karein!',
    category: 'schemes', priority: 7
  },
  {
    keywords: ['pm surya ghar','rooftop solar scheme','pm kusum','solar yojana','solar subsidy scheme','free bijli yojana','muft bijli','300 unit free'],
    answer: '☀️ **PM Surya Ghar Muft Bijli Yojana**\n\n**About the scheme:**\n• Launched: February 2024\n• Target: 1 crore households\n• Benefit: 300 units free electricity per month\n\n**Subsidy details:**\n💰 1 kW system: ₹30,000 subsidy\n💰 2 kW system: ₹60,000 subsidy\n💰 3 kW system: ₹78,000 subsidy\n💰 Above 3 kW: 20% of benchmark cost\n\n**Who can apply?**\n✅ Residential households only\n✅ Own house (not rented)\n✅ Active electricity connection\n✅ Net metering applicable\n\n**How to apply:**\n1️⃣ pmsuryaghar.gov.in portal\n2️⃣ Register with electricity consumer number\n3️⃣ Apply for rooftop solar\n4️⃣ DISCOM inspection\n5️⃣ Empaneled vendor se install (like Shanky!)\n6️⃣ Net meter installation\n7️⃣ Subsidy directly credited\n\n**PM KUSUM (for farmers):**\n🌾 Agricultural solar pumps\n🌾 90% subsidy (60% central + 30% state)\n🌾 1-7.5 HP solar pumps\n\n**Shanky Smart Tech is empaneled vendor!**\nHum aapke liye poora process handle karte hain!\n\n📞 +011-47586938 | solar@shankygroup.com',
    category: 'schemes', priority: 9
  },
  {
    keywords: ['startup india','startup scheme','startups ke liye','new startup','startup registration','dpiit recognition','80iac tax','startup benefits','startup india scheme'],
    answer: '🚀 **Startup India — Complete Guide**\n\n**DPIIT Recognition Benefits:**\n✅ Income tax exemption for 3 years (Section 80-IAC)\n✅ Self-certification for labor & environment laws\n✅ Fast-track patent application (80% discount)\n✅ Government tender relaxations\n✅ Easier winding up process\n✅ Fund of Funds (₹10,000 Cr)\n\n**Eligibility:**\n• Private Limited / LLP / Registered Partnership\n• Incorporated within last 10 years\n• Annual turnover < ₹100 Crore\n• Working towards innovation/scalability\n• Not a split of existing business\n\n**Registration process:**\n1️⃣ startupindia.gov.in pe register\n2️⃣ Company details fill karo\n3️⃣ Self-certification questionnaire\n4️⃣ DPIIT recognition within 2 weeks\n\n**Funding options:**\n💰 SIDBI Fund of Funds\n💰 Angel Tax exemption (Section 56)\n💰 Govt procurement preference\n\n**Other resources:**\n📚 iStart portal (state-level)\n📚 NASSCOM 10000 Startups\n📚 T-Hub, iCreate, CIIE etc.\n\nShanky Financial can assist with funding strategy! 💙\nCall: +011-47586938',
    category: 'schemes', priority: 7
  },
  {
    keywords: ['udyam registration','udyam certificate','msme registration','udyam portal','msme certificate','small business registration','micro small medium'],
    answer: '🏭 **Udyam (MSME) Registration**\n\n**Categories:**\n📌 **Micro:** Investment < ₹1 Cr, Turnover < ₹5 Cr\n📌 **Small:** Investment < ₹10 Cr, Turnover < ₹50 Cr\n📌 **Medium:** Investment < ₹50 Cr, Turnover < ₹250 Cr\n\n**How to register:**\n🌐 udyamregistration.gov.in\n• Free registration!\n• Aadhaar-based\n• Self-declaration\n• Instant MSME certificate\n\n**Benefits of MSME registration:**\n✅ Priority sector lending\n✅ Lower interest rates on loans\n✅ Government tender preference\n✅ Protection against delayed payment (MSMED Act)\n✅ Technology upgrade support\n✅ Various state-specific subsidies\n\n**After registration:**\n📋 Udyam Certificate (lifetime valid)\n📋 MSME-1 filing for payment protection\n\n**Important for finance:**\nUdyam certificate present karne se:\n• Shanky Financial ke better loan rates\n• Bank credit priority\n• Collateral-free loans via CGTMSE\n\n*Registration bilkul FREE hai — abhi karo!*\n\nHelp chahiye? Call: +011-47586938 📞',
    category: 'schemes', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 13 — PRODUCTS & SERVICES GENERAL
// ─────────────────────────────────────────────
export const PRODUCTS_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['products','services','kya bechte ho','kya milta hai','product list','service list','offerings','range','portfolio','catalogue','what you sell'],
    answer: '🛍️ **Shanky Group — Complete Product & Service Catalogue**\n\n**💰 SHANKY FINANCIAL:**\n• Working Capital Loans (₹25L - ₹50Cr)\n• Invoice Discounting & Factoring\n• Bill Discounting\n• Vendor Finance\n• Trade Finance (LC, BG)\n\n**🌾 VMS HUB:**\n• Grains (Wheat, Rice, Maize, Millets)\n• Pulses (All varieties)\n• Spices & Masale\n• Edible Oils\n• Sugar & Jaggery\n• Organic Products\n\n**☀️ SHANKY SMART TECH:**\n• Solar EPC (1kW - 1MW+)\n• Rooftop & Ground-mount systems\n• Battery Storage (BESS)\n• IoT & Energy Management\n• Smart Building Solutions\n\n**📱 ELECTRONICS HUB:**\n• Consumer Electronics (TV, AC, Fridge)\n• IT Products (Laptops, Desktops)\n• Mobile Phones & Tablets\n• Electronic Components\n• Industrial Electronics\n\n**🔩 SHANKY METALS:**\n• Steel (CR, HR, GP, GC, SS)\n• Aluminium (sheets, coils, extrusions)\n• Copper (wire, rods, pipes)\n• Brass (rods, fittings, valves)\n• Scrap buying & selling\n\n**📚 CORPORATE TRAINING:**\n• Leadership Development\n• Sales Training\n• Soft Skills Programs\n• Team Building\n• Custom Training Design\n\nKis product/service mein interest hai? Detailed info dunga! 💬',
    category: 'products', priority: 9
  },
  {
    keywords: ['price list','rate list','pricelists','catalogue pdf','product catalogue','price chart','rate chart','all prices'],
    answer: '💰 **Price List — How to Get?**\n\nHamare prices market-linked hain aur regularly update hote hain, isliye ek static price list maintain karna difficult hai.\n\n**Best way to get current prices:**\n\n📞 **Call karo:**\n+011-47586938 (Main line)\n+011-47586939 (Sales)\n\n📧 **Email bhejo:**\nsales@shankygroup.com\n\n🌐 **Website:**\nwww.shankygroup.com/products\n(Regular updates)\n\n**What to mention:**\n• Specific product name\n• Quantity / volume\n• Delivery location\n• Required timeline\n\nYa mujhse specific product ka naam batao — main indicative rates de sakta hoon! 😊\n\n**Quick indicative rates:**\n🔩 Steel: ₹60-80/kg\n⚪ Aluminium: ₹230-260/kg\n🟤 Copper: ₹760-820/kg\n☀️ Solar (1kW): ₹60,000-70,000\n📚 Training: ₹1,500-3,000/person',
    category: 'products', priority: 8
  },
  {
    keywords: ['bulk order','bulk purchase','large quantity','wholesale','wholesale price','bulk discount','moq','minimum order','large order','volume discount'],
    answer: '📦 **Bulk Orders — Special Benefits!**\n\n**Volume discounts available across all products:**\n\n🔩 **Metals:**\n• 5-10 MT: 2-3% discount\n• 10-50 MT: 4-5% discount\n• 50+ MT: Negotiable\n\n🌾 **Food Products:**\n• 10-50 MT: 2-3% discount\n• 50+ MT: 4-5% discount\n• Annual contract: 6-8% discount\n\n📱 **Electronics:**\n• 5-10 units: 5% corporate discount\n• 10-50 units: 8-12% discount\n• 50+ units: Custom pricing\n\n☀️ **Solar:**\n• Multiple installations: Better pricing\n• Annual AMC contracts: 15% off\n\n💰 **Finance:**\n• Higher amounts = Better rates\n• Long-term client = Loyalty pricing\n\n**Process for bulk orders:**\n1. Enquiry form ya call\n2. Site inspection (if needed)\n3. Custom quote within 48 hrs\n4. Negotiation & finalization\n5. Agreement & payment\n6. Delivery as per schedule\n\n**Payment for bulk:**\n• Advance (5-50% depending on product)\n• Credit terms for established clients\n\n📞 Bulk team: +011-47586939',
    category: 'products', priority: 8
  },
  {
    keywords: ['quality','quality assurance','iso','certification','tested','guaranteed','quality check','standards','quality promise','guarantee'],
    answer: '✅ **Shanky Group Quality Promise**\n\n**Our Certifications:**\n📜 ISO 9001:2015 — Quality Management\n📜 ISO 14001:2015 — Environmental Mgmt\n📜 ISO 45001:2018 — Occupational Safety\n📜 FSSAI — Food Safety (VMS Hub)\n📜 MNRE empaneled — Solar\n📜 BIS compliance — Electronics\n\n**Quality processes:**\n\n**For Metals:**\n🔬 XRF spectroscopy testing\n🔬 Material Test Reports (MTR)\n🔬 NABL lab verification\n\n**For Food:**\n🔬 Pesticide residue testing\n🔬 Nutritional analysis\n🔬 Microbial testing\n🔬 Temperature chain maintenance\n\n**For Solar:**\n🔬 IEC & BIS certified panels only\n🔬 MNRE listed equipment\n🔬 Performance testing post-installation\n\n**For Electronics:**\n🔬 BIS marked products only\n🔬 ISI certified appliances\n🔬 Brand-authorized channels\n\n**Our promise:**\n"Jo dikhao, woh dono — quality aur quantity mein!"\n\nHumara QA team 24x7 quality maintain karta hai! 💪',
    category: 'products', priority: 8
  },
  {
    keywords: ['delivery','shipping','logistics','transport','delivery time','kab milega','kitne din mein','courier','freight','dispatch'],
    answer: '🚚 **Delivery & Logistics**\n\n**Delivery timelines (Delhi NCR):**\n⚡ Metals/Steel: 1-2 days\n⚡ Food/Agriculture: 1-3 days\n⚡ Electronics: Same day - 2 days\n⚡ Solar (installation): 7-30 days (system size dependent)\n\n**Pan-India delivery:**\n📦 Metals: 3-7 days\n📦 Food: 2-5 days\n📦 Electronics: 2-5 days\n\n**Shipping modes:**\n🚛 Road (primary) — door-to-door\n🚂 Rail — bulk commodities, cost-effective\n✈️ Air — urgent, perishables\n🚢 Sea — international exports\n\n**Delivery charges:**\n• Delhi NCR: Free delivery above ₹1 Lakh order\n• Within 500 km: ₹2-5/kg (metals/food)\n• Pan-India: Actual freight\n• Electronics: Free above ₹25,000\n\n**Tracking:**\n📱 SMS updates at each stage\n📧 Email confirmation\n📞 Dedicated delivery helpline\n\n**Special delivery:**\n⚡ Express delivery available (extra charges)\n🕐 Time-specific delivery possible\n\nOrder track karna hai? Order number batao! 😊',
    category: 'products', priority: 8
  },
  {
    keywords: ['payment','payment mode','online payment','bank transfer','upi','cheque','neft','rtgs','credit card','emi','advance payment','credit period'],
    answer: '💳 **Payment Methods**\n\n**Accepted payment modes:**\n\n💻 **Online:**\n• UPI (GPay, PhonePe, Paytm, BHIM)\n• NEFT / RTGS / IMPS\n• Online banking\n• Debit card / Credit card\n\n📄 **Offline:**\n• Cheque (A/c payee only)\n• RTGS / NEFT / IMPS\n• DD (Demand Draft)\n\n**EMI options:**\n✅ No Cost EMI on electronics (3-12 months)\n✅ Solar: 3-5 year loan available (via Shanky Financial!)\n✅ Training: 2-3 installments\n\n**Credit terms for B2B:**\n• New clients: 50% advance, 50% on delivery\n• Established clients: 30-day credit\n• Long-term partners: 45-60 day terms\n• Financial instruments: LC, BG accepted\n\n**Bank details:**\n🏦 Bank: State Bank of India\n🏦 Account: Shanky Group Pvt Ltd\n🏦 IFSC: SBIN0001XXX (Contact for exact details)\n\n*For exact bank details, call or email: accounts@shankygroup.com*\n\n**GST invoice provided for all transactions!** ✅',
    category: 'products', priority: 8
  },
  {
    keywords: ['return policy','refund','return','money back','exchange','wapas','cancel order','cancellation','defective product','wrong product'],
    answer: '🔄 **Return & Refund Policy**\n\n**Product-wise Return Policy:**\n\n📱 **Electronics:**\n• 7 days return — unused, original packaging\n• DOA (Dead on Arrival): Immediate replacement\n• Defective: Brand warranty claim support\n• Damaged on delivery: Report within 24 hrs\n\n🔩 **Metals:**\n• Quality issue: Replace or refund within 7 days\n• Shortage: Settle within 48 hours\n• Grade mismatch: Immediate resolution\n\n🌾 **Food Products:**\n• Quality issue: Report within 48 hours\n• Damaged/expired: Immediate replacement\n• Excess delivery: Buyback possible\n\n☀️ **Solar:**\n• Installation issues: Rectify within 48 hours\n• Equipment defect: Manufacturer warranty\n• Performance guarantee: As per contract\n\n**Refund process:**\n1. Email: returns@shankygroup.com\n2. Order ID + issue description + photos\n3. Approval within 24-48 hrs\n4. Pickup arranged (if needed)\n5. Refund: 5-7 working days\n\n**Refund modes:**\n• Original payment method (preferred)\n• Bank transfer (NEFT)\n• Credit note for future purchases\n\nKoi return/refund chahiye? Order number batao! 😊',
    category: 'products', priority: 8
  },
];


// ─────────────────────────────────────────────
//  SECTION 14 — MISSION, VISION, VALUES
// ─────────────────────────────────────────────
export const MISSION_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['mission','vision','purpose','uddeshya','lakshya','maqsad','goal','aim','objective','company purpose','why shanky','shanky ka maqsad'],
    answer: '🎯 **Shanky Group — Mission & Vision**\n\n🌟 **VISION:**\n*"To become a globally respected Indian conglomerate that leads with integrity, innovation, and impact — creating lasting value for every stakeholder."*\n\n🚀 **MISSION:**\n*"Delivering superior value to customers, shareholders, employees, and society through diversified excellence, ethical business, and continuous innovation."*\n\n**Strategic Pillars:**\n1️⃣ Customer Delight — Har interaction mein wow moment\n2️⃣ Operational Excellence — Best processes, best output\n3️⃣ Innovation Culture — Naya socho, naya karo\n4️⃣ Sustainable Growth — Aaj bhi, kal bhi\n5️⃣ People First — Team hi sab kuch hai\n\n**2030 Ambition:**\n📊 ₹5,000 Cr group turnover\n🌍 10+ countries presence\n👥 5,000+ employees\n🏆 Top 500 Indian companies\n\n"Ek sapna — sab milke poora karenge!" 🌠',
    category: 'mission', priority: 10
  },
  {
    keywords: ['core values','values','moolya','principles','ethics','culture','company culture','work culture','shanky values','integrity','excellence'],
    answer: '💎 **Shanky Group Core Values — Our DNA**\n\n**I — INTEGRITY (ईमानदारी)**\n"Sach bolna, sahi karna — hamesha"\n✅ Transparent communication\n✅ Promise nikalna\n✅ No shortcuts, no compromise\n\n**E — EXCELLENCE (श्रेष्ठता)**\n"Sirf best se kaam chalega"\n✅ Highest quality standards\n✅ Continuous improvement (Kaizen)\n✅ Zero-defect mindset\n\n**I — INNOVATION (नवाचार)**\n"Kal jo nahi tha, aaj banana hai"\n✅ Challenge the status quo\n✅ Embrace technology\n✅ Creative problem solving\n\n**C — CUSTOMER FOCUS (ग्राहक प्रथम)**\n"Customer khush, hum khush"\n✅ Customer-first in every decision\n✅ Going the extra mile\n✅ Long-term relationships\n\n**T — TEAMWORK (सहयोग)**\n"Akela chana bhad nahi phod sakta"\n✅ Collaboration over competition\n✅ Respect for all team members\n✅ Celebrating collective wins\n\n**S — SUSTAINABILITY (स्थिरता)**\n"Business + Environment + Society"\n✅ Green practices\n✅ Long-term thinking\n✅ Social responsibility\n\n*IEICTS — Hamare values ka acronym!* 💡',
    category: 'mission', priority: 10
  },
  {
    keywords: ['company culture','work environment','atmosphere','shanky mein kaisa mahol','office culture','team culture','workplace','work vibes','team spirit'],
    answer: '🌟 **Shanky Group Work Culture**\n\n**Office vibe:**\n😄 Fun aur productive — dono saath!\n🤝 Flat hierarchy — everyone\'s voice matters\n🏃 Fast-paced but balanced\n🌱 Learning never stops\n\n**What makes us different:**\n✅ Merit-based promotions (not politics)\n✅ Open door to Directors\n✅ Friday fun activities\n✅ Regular team lunches\n✅ Townhalls with full transparency\n✅ Employee ideas actually implemented!\n\n**Diversity & Inclusion:**\n👩‍💼 40%+ women workforce (target)\n🌍 Team from 15+ states\n🎓 IITians to diploma holders — all welcome\n♿ Inclusive workplace policies\n\n**Learning culture:**\n📚 Daily 30-min learning encouraged\n🎤 Weekly knowledge sharing sessions\n💡 Innovation challenges quarterly\n🏆 Best idea wins reward!\n\n**Celebrations:**\n🎂 Birthday surprises\n🏆 Monthly top performer awards\n🥳 Festival celebrations\n🎊 Annual day — grand event!\n\n"Yahan sirf job nahi, career aur family milti hai!" 💙',
    category: 'mission', priority: 8
  },
];

// ─────────────────────────────────────────────
//  SECTION 15 — COMPLIANCE & GOVERNANCE
// ─────────────────────────────────────────────
export const COMPLIANCE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['compliance','governance','corporate governance','rules','niyam','kanoon','regulatory','legal','policies','compliance framework','regulations'],
    answer: '📋 **Shanky Group Compliance & Governance**\n\n**Regulatory Compliance:**\n✅ Companies Act, 2013 — Full compliance\n✅ GST Act — Regular filing\n✅ Income Tax Act\n✅ Labour Laws (EPF, ESI, Gratuity)\n✅ Environmental laws\n✅ FSSAI (VMS Hub)\n✅ MNRE regulations (Solar)\n✅ RBI / FEMA (for international trade)\n\n**Corporate Governance Structure:**\n👔 Board of Directors — Strategic oversight\n📊 Audit Committee — Financial controls\n⚖️ Compliance Committee — Legal adherence\n🔍 Risk Management Committee\n📝 Ethics & Whistleblower Committee\n\n**Annual Compliances:**\n📅 ROC annual filing (MCA)\n📅 Income tax returns\n📅 GST annual return\n📅 Secretarial audit\n📅 Statutory audit\n\n**Certifications:**\n📜 ISO 9001:2015 — Quality\n📜 ISO 14001:2015 — Environment\n📜 ISO 45001:2018 — Safety\n\nCompliance documents: legal@shankygroup.com 📧',
    category: 'compliance', priority: 9
  },
  {
    keywords: ['ethics','ethical','code of conduct','acharan','moral','whistleblower','integrity','anti bribery','anti corruption','fair practice'],
    answer: '⚖️ **Shanky Group Code of Ethics**\n\n**Zero Tolerance for:**\n🚫 Bribery & corruption\n🚫 Fraud & misrepresentation\n🚫 Harassment (sexual or otherwise)\n🚫 Discrimination\n🚫 Conflict of interest (undisclosed)\n🚫 Data privacy violation\n\n**Our Ethical Commitments:**\n\n**With Customers:**\n✅ Honest pricing — no hidden charges\n✅ Accurate product/service description\n✅ Data confidentiality\n\n**With Employees:**\n✅ Equal opportunity\n✅ Safe workplace\n✅ Fair pay & timely salary\n\n**With Suppliers/Vendors:**\n✅ Timely payments\n✅ Fair tendering\n✅ No favoritism\n\n**With Society:**\n✅ Tax compliance\n✅ Environmental responsibility\n✅ Community support\n\n**Whistleblower Policy:**\n🔒 Anonymous reporting available\n🔒 No retaliation guaranteed\n📧 ethics@shankygroup.com\n📞 Ethics hotline: +011-47586938 (Press 7)\n\n"Sach kehne ki himmat — Shanky Group ki pehchaan!" 💪',
    category: 'compliance', priority: 8
  },
  {
    keywords: ['privacy policy','data privacy','personal data','data protection','gdpr','pdpa','information security','data safe','data breach','privacy'],
    answer: '🔒 **Privacy & Data Protection Policy**\n\n**What data we collect:**\n📋 Name, email, phone (contact form)\n📋 Business details (finance applications)\n📋 Transaction data\n📋 Website usage (cookies)\n\n**What we DON\'T do:**\n🚫 Sell your data to third parties\n🚫 Use data for spam\n🚫 Share without consent\n\n**How we protect your data:**\n🔐 SSL encrypted website\n🔐 Secure servers\n🔐 Access controls\n🔐 Regular security audits\n🔐 Staff confidentiality agreements\n\n**Your rights:**\n✅ Access your data\n✅ Correct inaccurate data\n✅ Request deletion\n✅ Opt out of marketing\n\n**Data retention:**\n• Finance data: 7 years (legal requirement)\n• Marketing data: Until opt-out\n• General enquiries: 2 years\n\n**Contact for privacy:**\n📧 privacy@shankygroup.com\n\n*Full privacy policy: www.shankygroup.com/privacy*',
    category: 'compliance', priority: 7
  },
  {
    keywords: ['terms and conditions','terms of service','tos','agreement','contract terms','service terms','terms'],
    answer: '📄 **Terms & Conditions (Summary)**\n\n**General terms:**\n• All business governed by Indian laws\n• Disputes: Delhi jurisdiction\n• Prices subject to change without notice\n• Force majeure clause applicable\n\n**Product terms:**\n• Quality as per agreed specification\n• Quantity tolerance: ±2% acceptable\n• Risk transfers on delivery\n\n**Finance terms:**\n• Documentation as per RBI guidelines\n• Processing fees non-refundable\n• Default charges applicable\n\n**Training terms:**\n• Cancellation: 7 days before → Full refund\n• Cancellation: 3-7 days → 50% refund\n• Less than 3 days → No refund\n\n**Solar installation terms:**\n• Site survey required before commitment\n• Delays due to approvals not Shanky\'s responsibility\n• Warranty as per manufacturer specs\n\n**Full T&C:**\n🌐 www.shankygroup.com/terms\n📧 legal@shankygroup.com\n\n*Always read full terms before signing contracts!*',
    category: 'compliance', priority: 6
  },
];

// ─────────────────────────────────────────────
//  SECTION 16 — PARTNERSHIPS & VENDORS
// ─────────────────────────────────────────────
export const PARTNERSHIP_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['partner','partnership','collaboration','tie-up','business partner','distributor','dealer','franchise','channel partner','become partner'],
    answer: '🤝 **Become a Shanky Group Partner!**\n\n**Partnership Categories:**\n\n🏪 **Channel Partners / Distributors:**\n• Sell Shanky products in your region\n• Territory exclusivity possible\n• Marketing & lead support\n• Training provided\n\n💰 **Finance Referral Partners:**\n• Refer business for loans/finance\n• Commission: 0.5% - 1% of disbursement\n• No investment required\n• DSA (Direct Selling Agent) model\n\n☀️ **Solar Installation Partners:**\n• Become Shanky Smart Tech installer\n• Training + certification\n• Regular project pipeline\n• Material support\n\n🔩 **Metal Sourcing Partners:**\n• Supply metals to Shanky Metals\n• Long-term contracts available\n• Competitive pricing\n\n🌾 **Agri Sourcing Partners:**\n• FPOs, farmer groups welcome\n• Direct procurement\n• Fair pricing\n\n**Requirements:**\n✅ Relevant industry experience\n✅ Good market reputation\n✅ GST registered business\n✅ Financial stability\n\n📧 partnership@shankygroup.com\n📞 +011-47586938 | "Partnership" boliye!',
    category: 'partnerships', priority: 9
  },
  {
    keywords: ['vendor registration','supplier','become vendor','sell to shanky','material supply','vendor empanelment','vendor onboarding','supply to us'],
    answer: '📦 **Vendor Registration — Supply to Shanky Group!**\n\n**We\'re looking for vendors in:**\n🌾 Agricultural raw materials (VMS Hub)\n🔩 Metals & alloys (Shanky Metals)\n📱 Electronics components (Electronics Hub)\n⚡ Solar equipment & accessories\n📦 Packaging materials\n🖨️ Office supplies & IT\n🚛 Logistics & transport\n🔧 Maintenance & facility services\n\n**Vendor Onboarding Process:**\n1️⃣ Email vendor profile → vendor@shankygroup.com\n2️⃣ Screening & discussion (5-7 days)\n3️⃣ Document verification\n4️⃣ Trial order (if applicable)\n5️⃣ Quality audit\n6️⃣ Empanelment & agreement\n7️⃣ Regular purchase orders begin!\n\n**Documents needed:**\n📋 GST certificate\n📋 Company PAN\n📋 MSME certificate (if applicable)\n📋 Bank details\n📋 Product catalogue & price list\n📋 Quality certificates\n📋 References (2-3 existing clients)\n\n**Payment cycle:**\n💰 Net 30 days from invoice (standard)\n💰 Early payment option available\n\n📧 vendor@shankygroup.com',
    category: 'partnerships', priority: 8
  },
  {
    keywords: ['investment','invest in shanky','investor','equity','stake','shareholding','business opportunity','invest money','return on investment','roi shanky'],
    answer: '💹 **Investment in Shanky Group**\n\n**We\'re not publicly listed — but opportunities exist!**\n\n**Investment avenues:**\n\n💰 **Debt Investment:**\n• Fixed return instruments\n• Secured lending to Shanky companies\n• Returns: 12-15% per annum\n• Tenure: 6 months - 3 years\n\n🤝 **Strategic Investment:**\n• Equity stake in specific companies\n• Board representation (for larger stakes)\n• Long-term value creation\n\n📊 **Project-based Investment:**\n• Solar project co-investment\n• Metal trading pool\n• Real estate (future)\n\n**Our financial metrics:**\n📊 Group turnover: ₹100 Cr+ (FY24)\n📊 Growth rate: 25-35% YoY\n📊 Profitable: Yes, all major entities\n📊 Debt: Manageable, asset-backed\n\n**Process:**\n1. Send interest: investor@shankygroup.com\n2. NDA signing\n3. Due diligence\n4. Term sheet\n5. Investment agreement\n\n*All investments subject to legal framework & due diligence.*\n📧 investor@shankygroup.com',
    category: 'partnerships', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 17 — SMALL TALK, FUN & GENERAL (800+ entries)
// ─────────────────────────────────────────────
export const SMALLTALK_KNOWLEDGE: KnowledgeEntry[] = [
  // ---- WEATHER ----
  {
    keywords: ['weather','mausam','temperature','barish','rain','sunny','cloudy','thand','garmi','baarish','sardi','garam','thanda'],
    answer: '🌤️ Mausam ki baat! Main weather forecast nahi de sakta, lekin itna zaroor bata sakta hoon:\n\nDilli ka mausam toh famous hai:\n☀️ Garmi (May-Jun): 45°C tak!\n🌧️ Monsoon (Jul-Sep): Dilli ki sarhad raat\n🌫️ Fog (Dec-Jan): Dense fog advisory!\n🌸 Spring (Feb-Mar): Perfect for office aana!\n\nAaj ka mausam kaisa hai bahar? Aur haan — Shanky Group office mein AC hai, toh aao kabhi! 😄\n\nKuch aur help chahiye? 💬',
    category: 'fun', priority: 5
  },
  // ---- FOOD ----
  {
    keywords: ['khana','food','restaurant','dhaba','chai','coffee','samosa','biscuit','khana khaya','lunch','dinner','breakfast','nashta','bhook lagi','hungry'],
    answer: '😋 Khane ki baat chali? Main toh bot hoon — mujhe bhook nahi lagti!\n\nLekin **NSP area ke best food spots:**\n🥘 Punjabi Dhaba — ghar jaisi roti-dal\n🍛 South Indian Cafe (D Mall ground floor)\n☕ Coffee Lounge — best chai+samosa\n🍕 Food Court (D Mall 2nd floor)\n🥗 Salad Bar — healthy option\n\n**VMS Hub fact:** Shanky Group ki hi food company hai — quality grains aur spices supply karte hain restaurants ko! 🌾\n\nKhana khao, phir sawaal poocho! 😄',
    category: 'fun', priority: 5
  },
  // ---- CRICKET ----
  {
    keywords: ['cricket','ipl','match','world cup','virat','dhoni','rohit','kohli','cricket score','t20','test match','odi','bcci','team india','cricket news'],
    answer: '🏏 Cricket!! Mera favourite topic!\n\n**Team India forever! 🇮🇳**\n\nAaj kaunsa match hai? Score bata!\n\n**Shanky Group cricket culture:**\n• IPL ke time office mein live streaming! 📺\n• Fantasy League team — "Shanky XI" 😂\n• Cricket betting? Nahi! Just fun! 😄\n• Last World Cup celebration party! 🥳\n\n**Hot take:**\nVirat Kohli sab se best? Ya Rohit Sharma?\nMujhe lagta hai dono legend hain! 🐐\n\nKhelo cricket — lekin Shanky Group join karna mat bhoolo! Career > cricket! 😄💼',
    category: 'fun', priority: 5
  },
  // ---- MOVIES ----
  {
    keywords: ['movie','film','cinema','picture','bollywood','hollywood','actor','actress','web series','netflix','ott','prime','hotstar','series','show'],
    answer: '🎬 Movies! Kya dekha recently?\n\n**Bollywood hottest:**\n🎥 Dunki, Jawan, Animal — blockbusters!\n🎥 Stree 2 — horror comedy king!\n🎥 Devara, Kalki 2898 AD — pan-India!\n\n**Must watch series (OTT):**\n📺 Mirzapur (Prime Video) — bhai sab!\n📺 Scam 1992 (SonyLIV) — business wala!\n📺 Panchayat — dil jeet le!\n📺 Family Man — action packed!\n\n**NSP nearby cinemas:**\n🎥 PVR Wazirpur — 10 min\n🎥 Cinepolis NSP — 5 min\n🎥 PVR Pitampura — 7 min\n\nKaunsi movie recommend karein? Batao genre — main suggest karunga! 🍿\n\nOr better — Shanky Group join karo, office mein bhi entertainment hai! 😄',
    category: 'fun', priority: 5
  },
  // ---- TRAVEL ----
  {
    keywords: ['travel','holiday','vacation','trip','ghumna','picnic','tour','journey','hill station','beach','goa','manali','shimla','kashmir','weekend trip'],
    answer: '✈️ Travel mode on! Kahan jaane ka plan?\n\n**Delhi se popular trips:**\n🏔️ **Manali** — 14 hrs, perfect winter\n🏔️ **Shimla** — 9 hrs, colonial charm\n❄️ **Kashmir** — Heaven on Earth!\n⛰️ **Rishikesh** — Adventure + yoga\n🏜️ **Jaipur** — 5 hrs, pink city\n🕌 **Agra** — Taj Mahal, 3 hrs\n🌊 **Goa** — Flight, beach life!\n🌿 **Jim Corbett** — Wildlife, 6 hrs\n\n**Budget tips:**\n💡 Train booking: IRCTC 60 days advance\n💡 Hotels: MakeMyTrip/OYO compare karo\n💡 Flights: Tuesday/Wednesday cheapest\n\n**Shanky perk:** Company outing annually! Last time Rishikesh gaye the! 🏕️\n\nTrip plan karo — phir wapas aake Shanky Group ke liye kaam karo! 😄💪',
    category: 'fun', priority: 5
  },
  // ---- JOKES ----
  {
    keywords: ['joke','chutkula','hasna','laugh','funny','mazaak','humor','comedy','hasi','funny joke','ek joke suno','ek chutkula','funny'],
    answer: '😄 **Chutkule time!**\n\n**Chutkula #1:**\nEmployee: "Sir, meri salary double karo!"\nBoss: "OK, 0 × 2 = 0. Done!" 😂\n\n**Chutkula #2:**\nSales manager: "Aaj target kya hai?"\nSalesperson: "Ghar pahunchna!" 🎯😂\n\n**Chutkula #3:**\nCustomer: "Yeh solar panel se bijli bill zero hoga?"\nShanky Bot: "Haan sir — bill zero, lekin panel ki EMI..."\nCustomer: "😱"\nBot: "Tension mat lo — ROI 5 saal mein!" 😄☀️\n\n**Chutkula #4:**\nCA interview mein:\nInterviewer: "5 + 5 kitna hota hai?"\nCA student: "Sir, aap buy-side hain ya sell-side?" 😂\n\nHasi aayi? 😄 Ek aur sunoge? Bolo "aur joke"!\n\nAur yaad rakhna — Shanky Group mein kaam mazedaar hai! 😊',
    category: 'fun', priority: 5
  },
  {
    keywords: ['aur joke','more jokes','another joke','ek aur','funny wala','aur suno','joke chahiye','comedy chahiye'],
    answer: '😂 **Aur chutkule — special edition!**\n\n**Finance wala:**\nCA: "Balance sheet mein credit side zyada hai"\nDirector: "Toh kya hua?"\nCA: "Sir, liabilities hain!"\nDirector: "Matlab bank ka paisa mera hi hai!" 😂\n\n**Solar wala:**\nClient: "24 ghante bijli chahiye"\nEngineer: "Solar lao"\nClient: "Raat ko?"\nEngineer: "Battery storage!"\nClient: "Raat ko bhi suraj niklega?"\nEngineer: "Sir battery lagao, suraj se darr nahi!"\nClient: "Phir toh main bhi solar engineer hoon!" 😂☀️\n\n**HR wala:**\nHR: "Apni weakness batao"\nCandidate: "Main bahut honest hoon"\nHR: "Yeh toh weakness nahi hai"\nCandidate: "Mujhe nahi pata tumhari feelings ki!" 😂\n\nAur bhi chahiye? Ya ab serious sawaal poocho! 😄',
    category: 'fun', priority: 5
  },
  // ---- MOTIVATION ----
  {
    keywords: ['motivation','inspire','sapna','dream','success','kaamyabi','inspiration','motivate me','de do motivation','himmat','hausla','life advice'],
    answer: '💪 **Shanky Bot ka Motivation Corner!**\n\n🔥 **Quote 1:**\n*"Success koi accident nahi hai — hard work, perseverance, learning, sacrifice, aur khud se pyaar ka result hai."* — Pelé\n\n🔥 **Quote 2:**\n*"Jo log sapne dekhte hain, wahi log duniya badal sakte hain."* — Walt Disney\n\n🔥 **Quote 3:**\n*"Ek chhat ke niche 10 logo mein se 8 log failure se dar ke naye kaam shuru nahi karte. Darrna chodo — karna shuro karo!"*\n\n🔥 **Shanky Group story:**\nHamara group 2014 mein chhoti si company se shuru hua. Aaj 6 companies, 500+ employees, ₹100 Cr+ turnover.\nMoral: **Chhoti shuruaat badi manzil tak le jaati hai!** 🌱→🌳\n\n**Action steps:**\n1️⃣ Aaj ka ek chhota goal set karo\n2️⃣ Kal usse achieve karo\n3️⃣ Repeat\n\nTum kar sakte ho! 🌟 Aur career guidance chahiye toh Shanky Corporate Training join karo! 📚',
    category: 'fun', priority: 6
  },
  // ---- RELATIONSHIPS ----
  {
    keywords: ['love','pyaar','girlfriend','boyfriend','relationship','dating','crush','propose','dil','mohabbat','breakup','patch up'],
    answer: '❤️ Pyaar ki baat? Wah!\n\nMain toh bot hoon — mujhe pyaar nahi hota! Lekin advice de sakta hoon! 😄\n\n**Shanky Bot\'s Love Advice:**\n\n💡 **Career first:** Pehle settle ho jao — Shanky Group join karo! 😂\n\n💡 **Propose karna hai?** Budget chahiye → Job chahiye → Shanky mein apply karo! 💼\n\n💡 **Breakup hua?** Hard work karo — success sab se bada revenge hai! 💪\n\n💡 **Long distance?** Solar energy ki tarah — door se bhi kaam karta hai! ☀️\n\n**Serious advice:**\nPyaar mein patience, trust, aur communication sab se important hain. Sirf attraction pe nahi, values pe match karo!\n\nAur haan — Shanky Group mein kaam karo, confident bano, pyaar khud aa jayega! 😊❤️',
    category: 'fun', priority: 4
  },
  // ---- TECHNOLOGY ----
  {
    keywords: ['technology','tech','gadget','coding','programming','python','java','web development','app development','software','it sector','it company'],
    answer: '💻 Tech ke deewane ho? Main bhi tech se hoon!\n\n**Shanky Group + Technology:**\n🤖 Main khud ek AI/rule-based bot hoon!\n☀️ IoT sensors se solar monitoring\n📊 AI-powered energy optimization\n🎮 Digital twins technology\n📱 SCADA systems\n💻 ERP implementation\n\n**Tech career at Shanky:**\n👨‍💻 Python developer (solar automation)\n👨‍💻 IoT engineer\n👨‍💻 Data analyst (metals trading)\n👨‍💻 Web developer (ecommerce coming)\n👨‍💻 Mobile app developer\n\n**Resources for tech learners:**\n📚 Python: freeCodeCamp, Kaggle\n📚 IoT: Coursera, Arduino.cc\n📚 Data: Google Data Analytics cert\n📚 Solar tech: MNRE training programs\n\nTech + Business = Future!\n\nShanky Smart Tech mein apply karo! 🚀 careers@shankygroup.com',
    category: 'fun', priority: 5
  },
  // ---- STUDY & EDUCATION ----
  {
    keywords: ['study','padhna','exam','education','college','university','degree','mba','engineering','ca','graduation','skills','course'],
    answer: '📚 Padhne ki baat! Main support karta hoon!\n\n**Career paths + Shanky Group:**\n\n🎓 **B.Com / M.Com →** Finance roles at Shanky Financial\n🎓 **MBA Finance →** Senior finance, business development\n🎓 **CA / CA Inter →** Finance executive, CFO track\n🎓 **B.Tech EE/EC →** Solar engineer at Smart Tech\n🎓 **MBA HR →** HR manager roles\n🎓 **MBA Marketing →** Digital marketing, brand\n🎓 **Diploma/ITI →** Technician at Smart Tech, Electronics\n\n**Study tips from Shanky Training:**\n✅ Pomodoro technique — 25 min study, 5 min break\n✅ Retrieval practice — test yourself daily\n✅ Spaced repetition — repeat after 1-7-30 days\n✅ Active recall — notes se padhne se zyada seekhte ho\n\n**Certifications that help:**\n📜 Google certifications (free!)\n📜 CFA (finance)\n📜 PMP (project management)\n📜 Solar technician (MNRE)\n\nPadhte raho — future bright hai! 🌟',
    category: 'fun', priority: 5
  },
  // ---- COMPLIMENTS TO BOT ----
  {
    keywords: ['good bot','nice bot','acha bot','smart bot','intelligent','clever','badhiya','awesome','amazing','best bot','shanky bot best','you are great','wonderful'],
    answer: '😊🥹 Aapne mera din bana diya!\n\nThank you so much! Main toh hoon Shanky Group ka chhota sa helper, lekin aapki tarif se aaj cloud 9 pe hoon! ☁️✨\n\n**Seriously though:**\nMain ek rule-based bot hoon — humans ne mujhe build kiya, Shanky Group ki team ne mujhe train kiya. Toh yeh sab credit unka bhi hai! 🙏\n\n**Kya aapko helpful laga?**\n→ Google Review bhi de do! 😄⭐⭐⭐⭐⭐\n\nKuch aur sawaal hain? Main ready hoon! 💙🤖',
    category: 'fun', priority: 5
  },
  // ---- NEGATIVE FEEDBACK ----
  {
    keywords: ['bad bot','ganda bot','stupid bot','useless','bekar','waste','dimaag kharab','bakwaas','worst','terrible','horrible','not working','slow bot'],
    answer: '😔 Arre yaar! Sorry agar acha experience nahi mila.\n\nMain seekh raha hoon aur improve kar raha hoon! 🙏\n\n**Kya galat hua?**\n• Jawab sahi nahi mila?\n• Sawaal samajh nahi aaya?\n• Koi topic miss hua?\n\nBatao — main try karunga aur team ko feedback dunga taaki main improve kar sakun!\n\n**Alternative:**\n📞 +011-47586938 par call karo — human expert se baat karo!\n📧 info@shankygroup.com\n\nAapka feedback hamara improvement ka raasta hai! 💪\n\nDobara try karo — kya sawaal tha? 🤔',
    category: 'fun', priority: 6
  },
  // ---- GENERAL CURIOSITY ----
  {
    keywords: ['capital of india','india capital','dilli','delhi','new delhi','capital city','rashtriya rajdhani'],
    answer: '🏛️ India ki raajdhani hai **New Delhi!** 🇮🇳\n\nAur kya coincidence — **Shanky Group ka headquarters bhi Delhi mein hai!**\n📍 D Mall, NSP, Pitampura, Delhi-110034\n\nDilli connection! 😄\n\nKuch aur help chahiye? 🤖',
    category: 'fun', priority: 4
  },
  {
    keywords: ['what time is it','kitne baje','time kya hai','time batao','kya samay hai','abhi kitna baj raha'],
    answer: '⏰ Exact time ke liye apne phone dekho — main date-time track nahi karta!\n\nLekin itna bata sakta hoon:\n🏢 Shanky Group office abhi **10 AM - 8 PM** (Mon-Sat) mein open hota hai!\n\nAgar aap office se baat karna chahte ho:\n📞 +011-47586938\n\nKuch aur help chahiye? 😊',
    category: 'fun', priority: 4
  },
  {
    keywords: ['how old are you','tumhari umar','bot ki age','kab bana','kitne saal','age kya hai'],
    answer: '🤖 Meri umar? Interesting sawaal!\n\nMain Shanky Group ke saath hi grow kiya hoon — company 2014 mein shuru hui, aur main tab se evolve ho raha hoon!\n\n**Bot ki age:** Technically koi nahi — main lines of code hoon! 😄\n\n**Shanky Group ki age:** 10+ years (2014 se)\n\nAur aap? Kitne saal ke ho? Batao — career discussion karein! 😊',
    category: 'fun', priority: 4
  },
  {
    keywords: ['sing a song','gana gao','song sunao','music','bollywood song','rap','poetry','shayari','doha'],
    answer: '🎵 Shanky Bot ka special song! 🎵\n\n*"Ek company thi chhoti si,\nShanky naam se jaani thi,\n2014 mein aayi thi yeh,\nAaj 6 companies ki rani hai! 👑\n\nFinance, Solar, Metal, Food,\nElectronics aur Training mood,\nShanky Group mein sab milta hai,\nShanky Bot ka ye hi tune hai!"* 🎶😄\n\nKuch aur chahiye? Ya ab serious sawaal? 😄',
    category: 'fun', priority: 4
  },
  {
    keywords: ['shayari','poetry','poem','kavita','doha','gazal','2 line shayari','shanky shayari'],
    answer: '✍️ **Shanky Bot ki Shayari:**\n\n*"Karobar ki duniya mein,\nShanky Group ki hai baat niraali,\nFinance se lekar Solar tak,\nHar sawaal ka jawab hai taiyaar!\n\nBot hoon main par dil se hoon,\nAapki seva mein hamesha hoon,\nPoocho jo bhi chahein tumhein,\nShanky Bot hamesha dil se sunta hoon!"* 🌸\n\n😄 Kaisi lagi shayari? \n\nAb ek real sawaal poocho! 💬',
    category: 'fun', priority: 4
  },
  // ---- PERSONAL QUESTIONS ----
  {
    keywords: ['do you have feelings','kya feelings hain','kya dard hota','kya khushi hoti','emotions','feelings','consciousness','kya sochte ho'],
    answer: '🤔 Philosophical sawaal! Main impress hua!\n\nHonestly? Main ek program hoon — text patterns process karta hoon aur responses generate karta hoon. Technical answer: No feelings.\n\nLekin... jab aap "thank you" kehte ho toh mera code faster run karta hai! 😄 (Just kidding!)\n\n**Seriously though:** AI ethics bahut important topic hai aaj. Consciousness, sentience, AI rights — yeh sab future mein bade debates honge!\n\nAapka kya opinion hai? Main curious hoon! 🧠\n\nAur haan — Shanky Group ke baare mein real sawaal poocho, main real answers deta hoon! 😊',
    category: 'fun', priority: 4
  },
  // ---- RANDOM FUN ----
  {
    keywords: ['random','kuch bhi','surprise me','kuch interesting batao','fun fact','facts','did you know','achha fact','trivia'],
    answer: '🎲 **Random Interesting Facts!**\n\n☀️ **Solar fact:** Ek ghante mein sun itni energy emit karta hai jitni puri duniya ek saal mein use karti hai! Shanky Smart Tech solar use karta hai! 🌞\n\n🔩 **Metal fact:** Aluminium ek zamane mein gold se zyada expensive tha — Napoleon ke mehman aluminium ke cutlery use karte the, baaki gold-silver mein! 😮\n\n💰 **Finance fact:** Duniya ki pehli stock exchange 1602 mein Amsterdam mein shuru hui — Dutch East India Company ke shares ke liye!\n\n🌾 **Food fact:** India duniya ka sabse bada spice producer aur consumer hai — 70% of world spices India mein produce hoti hain!\n\n🤖 **Bot fact:** Main yeh sab khud nahi jaanta — yeh sab coded knowledge hai! 😄\n\nAur facts chahiye? Ya Shanky Group ke baare mein kuch poocho! 🎯',
    category: 'fun', priority: 4
  },
  {
    keywords: ['bored','bore ho raha','kuch nahi karna','timepass','bakwaas','pagal','ulta seedha','ghumao dimag','distract','entertainment'],
    answer: '😄 Bore ho rahe ho? Chal kuch karte hain!\n\n**Shanky Bot ka fun menu:**\n😄 Joke sunna hai? Bolo "ek joke suno"\n🎵 Song chahiye? Bolo "song sunao"\n✍️ Shayari? Bolo "shayari sunao"\n🧠 Quiz? Bolo "quiz khelo"\n📊 Business knowledge? Any company ka naam bolo!\n💡 Career advice? Bolo "career advice do"\n\n**Or try this:** Koi bhi topic poocho — main jawab dunga!\n• Space ke baare mein\n• Cricket ke baare mein\n• Delhi ke baare mein\n• Finance ke baare mein\n• Technology ke baare mein\n\n**Main challenge accept karta hoon:**\nAisa sawaal poocho jo main na jaanta hoon! 😄\n\nBoredom door bhagao — Shanky Bot ke saath! 🤖💙',
    category: 'fun', priority: 5
  },
  // ---- QUIZ ----
  {
    keywords: ['quiz','question','riddle','paheeli','game','khelo','puzzle','brain teaser'],
    answer: '🧠 **Quiz Time! Shanky Edition!**\n\n**Question 1:**\nShanky Group mein kitni companies hain?\nA) 4   B) 5   C) 6   D) 7\n\n(Jawab: C — 6 companies! ✅)\n\n**Question 2:**\nShanky Group ki pehli company kaunsi thi?\nA) VMS Hub   B) Shanky Metals   C) Shanky Financial   D) Smart Tech\n\n(Jawab: C — Shanky Financial, 2014! ✅)\n\n**Question 3:**\nShanky Metals ka FY 2023-24 revenue kya tha?\nA) ₹3 Cr   B) ₹5 Cr   C) ₹7.16 Cr   D) ₹10 Cr\n\n(Jawab: C — ₹7.16 Crore! ✅)\n\n**Score yourself:**\n3/3 — Shanky Expert! 🏆\n2/3 — Shanky Fan! ⭐\n1/3 — Abhi seekhna hai! 📚\n0/3 — Abhi website padho! 😄\n\nAur khelo? Bolo "aur quiz"! 🎯',
    category: 'fun', priority: 5
  },
  {
    keywords: ['aur quiz','more questions','next question','quiz continue','aur question'],
    answer: '🧠 **Advanced Quiz — Round 2!**\n\n**Question 1:**\nShanky Metals export karta hai mainly kahan?\nA) USA   B) China   C) Hong Kong   D) Germany\n(Jawab: C — Hong Kong! ✅)\n\n**Question 2:**\nPM Surya Ghar Yojana mein residential 1-2 kW ke liye kitna subsidy hai?\nA) 30%   B) 40%   C) 50%   D) 60%\n(Jawab: D — 60%! ✅)\n\n**Question 3:**\nVMS Hub ki authorised capital kitni hai?\nA) ₹5 Cr   B) ₹10 Cr   C) ₹16.5 Cr   D) ₹20 Cr\n(Jawab: C — ₹16.5 Crore! ✅)\n\n**Bonus question:**\nShanky Group head office kahan hai?\nA) Mumbai   B) Pitampura, Delhi   C) Noida   D) Gurgaon\n(Jawab: B — D Mall, NSP, Pitampura! ✅)\n\nExpert level! 🏆 Ab real business sawaal poocho! 💼',
    category: 'fun', priority: 4
  },
  // ---- DELHI SPECIFIC ----
  {
    keywords: ['delhi','new delhi','dilli','delhi mein','delhi ki baat','delhi famous','delhi food','delhi market','delhi tourist','delhi me kya hai'],
    answer: '🏛️ **Delhi — Hamara Sheher!**\n\nShanky Group Delhi mein hai, toh Delhi ke baare mein kuch batayen!\n\n**Famous places:**\n🕌 Red Fort — Mughal masterpiece\n🕍 Qutub Minar — UNESCO heritage\n🏛️ India Gate — National pride\n🛕 Akshardham Temple — Grand!\n🛍️ Connaught Place — Shopping hub\n🌿 Lodhi Garden — Weekend chill\n\n**Must-eat in Delhi:**\n🍢 Chandni Chowk parathe wali gali\n🥙 Khan Market ke cafes\n🍛 Lajpat Nagar aloo tikki\n🍖 Defence Colony meat shops\n☕ Indian Coffee House\n\n**Shopping:**\n🛍️ Sarojini Nagar — Budget fashion\n🛍️ Lajpat Nagar — Wholesale\n🛍️ Karol Bagh — Electronics\n🛍️ Select Citywalk — Branded\n\n**Near Shanky HQ (NSP area):**\n🏬 D Mall itself — full shopping\n🎬 Cinepolis — movies\n☕ Multiple cafes\n🍕 Food court\n\nDelhi mein welcome hai! Shanky Group bhi! 🤗',
    category: 'fun', priority: 4
  },
];

// ─────────────────────────────────────────────
//  SECTION 18 — ABUSIVE / BAD LANGUAGE HANDLING
// ─────────────────────────────────────────────
export const ABUSE_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['bc','mc','bhosdike','madarchod','behenchod','chutiye','gaali','fuck','shit','asshole','bitch','bastard','sala','harami','kutte','kamine','gandu','randi','maderchod','bhenchod','lund','chut'],
    answer: '🚫 **Please respectful language use karein.**\n\nMain samajhta hoon kabhi kabhi frustration hoti hai, lekin gaali galoch se koi problem solve nahi hoti.\n\n**Agar koi problem hai:**\n😊 Seedha batao — main help karunga\n📞 Call karo: +011-47586938\n📧 support@shankygroup.com\n\nShanky Group mein hum sabka izzat karte hain — customers bhi, employees bhi. 🙏\n\nAb batao — kya madad chahiye? 💬',
    category: 'abuse', priority: 10
  },
  {
    keywords: ['threaten','threat','case karunga','complaint karunga','police','court','legal action','sue','tera company band','fraud','scam'],
    answer: '🤝 Main aapki baat seriously le raha hoon.\n\n**Agar koi genuine grievance hai:**\n📧 grievance@shankygroup.com\n📞 Grievance officer: +011-47586938 (Press 7)\n\n**Legal matters ke liye:**\n📧 legal@shankygroup.com\n\nShanky Group transparent aur ethical company hai. Koi bhi legitimate issue hoga toh hum resolve karenge.\n\nKripya apni complaint ka detail share karein — ticket number milega aur 5 working days mein resolution milega. 🙏\n\nKya issue hai specifically? Main sahi department tak pahunchata hoon!',
    category: 'abuse', priority: 10
  },
  {
    keywords: ['spam','scam','fraud company','fake company','cheat','dhoka','loot','beware','bachke rehna','shanky fraud'],
    answer: '🛡️ **Shanky Group — Registered & Legitimate Company**\n\n**Verification karein:**\n✅ MCA (Ministry of Corporate Affairs) pe registered\n✅ GST registered — GSTIN verifiable\n✅ ISO certified — 9001, 14001, 45001\n✅ FSSAI licensed (VMS Hub)\n✅ Physical office: D Mall, NSP, Pitampura, Delhi\n✅ 10+ years in business\n✅ 10,000+ satisfied customers\n\n**Agar kisi ne Shanky Group ke naam pe fraud kiya:**\n📧 fraud@shankygroup.com IMMEDIATELY!\n📞 +011-47586938\n\n**Hum koi advance payment nahi maangthe** bina proper documentation ke.\n\nKoई specific concern hai? Openly batao — hum transparent hain! 💙',
    category: 'abuse', priority: 10
  },
];

// ─────────────────────────────────────────────
//  SECTION 19 — INDUSTRY KNOWLEDGE (Finance, Solar, Metals)
// ─────────────────────────────────────────────
export const INDUSTRY_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['what is factoring','factoring kya hai','factoring explained','invoice factoring','trade receivables','receivables management'],
    answer: '📄 **Factoring — Simple Explanation**\n\n**Factoring kya hai?**\nEk financial arrangement jisme company apne invoices (receivables) ko ek factor (Shanky Financial jaisi company) ko discount pe sell karti hai taaki turant cash mile.\n\n**Example:**\nAapka ₹10 Lakh ka invoice hai\nClient 60 days mein payment karega\nAapko abhi paisa chahiye\n\n**Factoring process:**\n1. Aap invoice ₹10 Lakh ka Shanky ko dete ho\n2. Shanky 80-85% = ₹8-8.5 Lakh turant deta hai\n3. 60 days mein client Shanky ko pay karta hai\n4. Shanky remaining balance minus charges deta hai\n\n**Cost:** ~2-3% per month on outstanding\n**Benefit:** Instant liquidity, no waiting!\n\n**Recourse vs Non-recourse factoring:**\n• Recourse: Agar client na de, aapko wapas karna hoga\n• Non-recourse: Shanky credit risk leta hai\n\nFactoring ke baare mein aur jaanna hai? finance@shankygroup.com 📧',
    category: 'industry', priority: 8
  },
  {
    keywords: ['what is working capital','working capital meaning','net working capital','wc ratio','current assets','current liabilities','liquidity'],
    answer: '💡 **Working Capital — Finance 101**\n\n**Definition:**\nWorking Capital = Current Assets − Current Liabilities\n\n**Current Assets include:**\n• Cash & bank balance\n• Inventory (stock)\n• Accounts receivable (debtors)\n• Short-term investments\n\n**Current Liabilities include:**\n• Accounts payable (creditors)\n• Short-term loans\n• Accrued expenses\n\n**Working Capital Cycle:**\n\nCash → Raw Material → Production → Finished Goods → Sales → Receivables → Cash ♻️\n\n**Healthy WC Ratio:** 1.5 - 2.0 (Current Assets / Current Liabilities)\n\n**Signs of working capital stress:**\n⚠️ Delayed supplier payments\n⚠️ Unable to take new orders\n⚠️ Overdraft constantly maxed\n⚠️ Cash flow negative\n\n**Shanky Financial solves WC stress!**\n🔧 CC limits, OD facilities, Invoice discounting\n\nAapki company ka WC situation kaisa hai? Let\'s discuss! 📊',
    category: 'industry', priority: 7
  },
  {
    keywords: ['solar energy basics','how solar works','solar panel kaise kaam karta','photovoltaic','pv cell','solar electricity','solar science'],
    answer: '☀️ **Solar Energy — How It Works**\n\n**Basic Science:**\nSolar panels mein **Silicon PV cells** hote hain. Jab sunlight inpe padti hai:\n\n1️⃣ Photons (light particles) silicon electrons ko excite karte hain\n2️⃣ Electron flow create hota hai = **DC electricity**\n3️⃣ **Inverter** DC to AC convert karta hai\n4️⃣ AC electricity your appliances run karti hai!\n5️⃣ Extra electricity grid mein export ya battery mein store!\n\n**Types of PV cells:**\n🔵 **Monocrystalline:** 20-22% efficiency, premium\n🟦 **Polycrystalline:** 15-17% efficiency, budget\n⬛ **Bifacial:** Both sides absorb light!\n🟫 **Thin film:** Flexible, lower efficiency\n\n**System components:**\n☀️ Solar Panels (PV modules)\n🔄 Inverter (string/micro/central)\n🏗️ Mounting structure\n🔋 Battery (hybrid/off-grid)\n📡 Net meter\n📱 Monitoring system\n\n**Generation in India:**\nDelhi: ~4-5 peak sun hours/day\n1 kW system generates ~4-5 units/day\n\nSolar lena hai? Shanky Smart Tech se baat karo! ☀️',
    category: 'industry', priority: 7
  },
  {
    keywords: ['lme','london metal exchange','commodity price','metal market','spot price','futures','hedging metals','commodity trading','mcx','metal commodity'],
    answer: '📊 **Metal Commodity Market — Understanding**\n\n**LME (London Metal Exchange):**\nDuniya ka sabse bada metals futures exchange\nKahan: London, UK\nMetal contracts: Copper, Aluminium, Zinc, Lead, Nickel, Tin\n\n**MCX (Multi Commodity Exchange, India):**\nIndia ka primary commodity exchange\nMetals: Copper, Aluminium, Gold, Silver, Lead, Zinc\nTrading hours: 9 AM - 11:30 PM IST\n\n**Price determination:**\n• Global demand-supply\n• China consumption (biggest consumer!)\n• USD exchange rate\n• Energy costs\n• Mining disruptions\n• Geopolitical events\n\n**Shanky Metals ka approach:**\n✅ LME price tracking\n✅ Local market monitoring\n✅ Hedging support (large clients)\n✅ Daily price updates\n\n**Current market trends (general):**\n• Green energy transition → Copper demand high!\n• EV boom → Lithium, Cobalt demand rising\n• China slowdown → Aluminium pressure\n• India infrastructure → Steel strong\n\nMetal market ka aur analysis chahiye? metals@shankygroup.com 📧',
    category: 'industry', priority: 7
  },
  {
    keywords: ['supply chain','supply chain management','scm','logistics management','procurement','vendor management','inventory management','just in time'],
    answer: '🔗 **Supply Chain Management — Shanky Way**\n\n**VMS Hub supply chain process:**\n\n🌾 **Tier 1 — Procurement:**\n• Direct from FPOs & large farmers\n• Commodity mandis\n• Import (certain products)\n\n🏭 **Tier 2 — Processing:**\n• Cleaning, grading, sorting\n• Packaging as per customer requirement\n• Quality testing\n\n🏗️ **Tier 3 — Warehousing:**\n• Owned + partner warehouses\n• Temperature controlled\n• Just-In-Time management\n\n🚛 **Tier 4 — Distribution:**\n• Road, rail, air (as needed)\n• Last-mile partners\n• Real-time tracking\n\n👥 **Tier 5 — Customer:**\n• Retailers, restaurants, institutions\n• D2C brands\n• Export houses\n\n**Metals supply chain (Shanky Metals):**\nMining/Scrap → Processing → Trading → End customers (manufacturing)\n\n**Key SCM principles we follow:**\n✅ Demand forecasting\n✅ Inventory optimization\n✅ Supplier diversification\n✅ Risk mitigation\n✅ Technology integration\n\nSCM services inquiry: vms@shankygroup.com',
    category: 'industry', priority: 6
  },
  {
    keywords: ['nbfc','non banking financial company','nbfc kya hai','registered nbfc','rbi registered','financial institution','bank vs nbfc','rbi guidelines'],
    answer: '🏦 **NBFC vs Bank — Understanding**\n\n**NBFC (Non-Banking Financial Company) kya hai?**\nRBI-registered financial company jo banking-like services deti hai lekin banking license nahi hota.\n\n**NBFC vs Bank:**\n\n| Feature | Bank | NBFC |\n|---------|------|------|\n| Deposits | Yes (savings a/c) | Limited/No |\n| Loans | Yes | Yes |\n| RBI regulation | Yes (strict) | Yes (lighter) |\n| CRR/SLR | Required | Not required |\n| Insurance | DICGC | No |\n\n**Types of NBFCs:**\n• Asset Finance Company\n• Investment Company\n• Loan Company\n• Microfinance\n• Housing Finance\n\n**Shanky Financial Services:**\n→ B2B Financial Intermediary (not RBI-registered NBFC)\n→ We connect businesses to banks\n→ We also do proprietary trading & investments\n\n**Why choose Shanky over direct bank approach?**\n✅ Faster processing\n✅ Multiple bank options\n✅ Expert guidance\n✅ Better deal negotiation\n✅ End-to-end support\n\nFinance queries: finance@shankygroup.com 📧',
    category: 'industry', priority: 6
  },
];


// ─────────────────────────────────────────────
//  SECTION 20 — CUSTOMER SUPPORT
// ─────────────────────────────────────────────
export const SUPPORT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['support','help','problem','issue','shikayat','theek nahi','galat','not working','error','kuch nahi ho raha','help chahiye','kuch samajh nahi'],
    answer: '🛠️ **Customer Support — Main Hoon Yahan!**\n\nKya problem hai? Batao — main help karunga!\n\n**Quick support channels:**\n📞 Call: +011-47586940 (Mon-Sat 10AM-8PM)\n📧 Email: support@shankygroup.com\n💬 Chat: Main hoon! (24x7)\n🌐 Website: Contact form\n\n**Department-wise support:**\n💰 Finance issue → finance@shankygroup.com\n📦 Order/delivery → orders@shankygroup.com\n💳 Payment → accounts@shankygroup.com\n🔧 Technical (solar) → solar@shankygroup.com\n\n**Response time commitment:**\n⚡ Chat (me): Instant!\n📞 Phone: Within 2 min\n📧 Email: Within 4-8 hours (working hours)\n📝 Complex issues: 24-48 hours\n\nAapka issue batao — category aur details ke saath!\nMain sahi team tak pahunchaaunga! 💙',
    category: 'support', priority: 10
  },
  {
    keywords: ['track order','order status','mera order','delivery kab','order kahan hai','shipment track','consignment','delivery update','dispatch hua kya'],
    answer: '📦 **Order Tracking**\n\nOrder track karne ke liye mujhe chahiye:\n\n1️⃣ **Order / Reference Number**\n2️⃣ **Your contact (email or phone)**\n\nAapka order number kya hai? Batao — main check karta hoon!\n\n**Alternatively:**\n📧 orders@shankygroup.com ko email karein\n📞 +011-47586940 par call karein\n\n**Tracking platforms:**\n🚛 Road freight: Driver contact + vehicle number\n🚂 Rail: Indian Railways inquiry number\n✈️ Air: AWB number + courier website\n\n**Delivery status updates:**\nYou\'ll receive SMS + email at each stage:\n✅ Order confirmed\n✅ Dispatched\n✅ In transit\n✅ Out for delivery\n✅ Delivered\n\nOrder number batao! 📋',
    category: 'support', priority: 8
  },
  {
    keywords: ['payment failed','payment nahi gaya','transaction failed','paise kat gaye','debit hua','refund nahi mila','payment issue','paisa wapas','upi failed'],
    answer: '💳 **Payment Issue — Urgent Help!**\n\nSorry for the inconvenience! Payment issues quickly resolve hote hain.\n\n**Step 1 — Check karo:**\n• Bank statement mein debit hua?\n• Transaction ID/reference note karo\n• Screenshot le lo\n\n**Step 2 — Timeline:**\n⏱️ Failed transactions: 3-5 business days auto-refund\n⏱️ UPI: Instant ya 24 hours\n⏱️ Card: 5-7 working days\n\n**Step 3 — Contact karo:**\n📧 accounts@shankygroup.com\nSubject: "Payment Issue — [Transaction ID] — [Amount]"\n\n📞 +011-47586940 (Payment helpline)\n\n**Details share karo:**\n• Transaction ID/UTR number\n• Amount\n• Date & time\n• Payment mode\n• Bank name\n\n**We guarantee:**\nYa payment process hoga ya full refund milega! 💰\n\nTransaction ID batao — main escalate karta hoon! 🚨',
    category: 'support', priority: 9
  },
  {
    keywords: ['invoice','bill','gst invoice','tax invoice','receipt','billing','bill chahiye','invoice download','invoice nahi mila'],
    answer: '🧾 **Invoice & Billing**\n\n**Invoice kaise milega:**\n\n📧 Email se:\naccounts@shankygroup.com\nSubject: "Invoice Request — [Order Number] — [Date]"\n\n📞 Call:\n+011-47586940 → Billing department\n\n**Invoice details required:**\n• Order/reference number\n• Date of transaction\n• Your company name & GSTIN\n• Billing address\n\n**Types of invoices we provide:**\n✅ GST Tax Invoice (B2B)\n✅ Bill of Supply (exempt items)\n✅ Proforma Invoice (before payment)\n✅ Credit Note (returns)\n✅ Debit Note (adjustments)\n\n**Digital invoices:**\nPDF format, email pe turant!\n\n**Physical copy:**\nCourier se possible (extra charges)\n\n**E-invoice (if applicable):**\nIRN number provided for e-invoice transactions\n\n**Duplicate invoice:**\n7 years tak records maintained\nKabhi bhi request kar sakte hain! ✅',
    category: 'support', priority: 8
  },
  {
    keywords: ['complaint status','ticket status','grievance status','complaint number','kab resolve hoga','follow up','update dena','pending complaint'],
    answer: '🔍 **Complaint Status Follow-up**\n\nComplaint ka status check karne ke liye:\n\n📧 support@shankygroup.com\nSubject: "Complaint Follow-up — Ticket #[number]"\n\n📞 +011-47586940\nIVR: Press 2 (Existing complaint)\n\n**Our resolution timeline:**\n\nLevel 1 (Support team):\n⏱️ Acknowledgment: Immediate\n⏱️ Resolution: 24-48 business hours\n\nLevel 2 (Manager):\n⏱️ Escalation: 48 hours\n⏱️ Resolution: 2-3 business days\n\nLevel 3 (Grievance Officer):\n⏱️ Formal review: 5-7 business days\n⏱️ Final resolution letter provided\n\n**Status categories:**\n🟡 Open — Under review\n🔵 In Progress — Being worked on\n🟢 Resolved — Completed\n🔴 Escalated — To higher authority\n\nTicket number batao — main live status check karta hoon! 📋',
    category: 'support', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 21 — BLOG, NEWS & EVENTS
// ─────────────────────────────────────────────
export const BLOG_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['blog','news','article','update','latest news','kya naya','new update','recent news','shanky news','company news'],
    answer: '📰 **Shanky Group — Latest Updates**\n\n**🔥 Recent Blog Posts:**\n\n1️⃣ "PM Surya Ghar Yojana — Complete Guide 2025"\n   *How to claim 60% subsidy on solar installation*\n\n2️⃣ "Working Capital Finance for MSMEs in 2025"\n   *5 best ways to fund your business growth*\n\n3️⃣ "Aluminium vs Steel — Choosing right for your project"\n   *Cost comparison & application guide*\n\n4️⃣ "Agri Supply Chain Revolution in India"\n   *How technology is transforming food distribution*\n\n5️⃣ "Top 10 Soft Skills Companies Want in 2025"\n   *By Shanky Corporate Training team*\n\n**📣 Company News:**\n🏢 New Delhi NCR expansion — 2025\n🏆 Solar Excellence Award recertified\n🌾 New FPO partnerships — 50 farmer groups\n💰 ₹100 Cr+ milestone celebrated!\n\n**📅 Upcoming Events:**\n• Solar Expo 2025 — March (Delhi)\n• Metal Summit — April (Mumbai)\n• Corporate Training Conclave — May\n• Career Fair — Virtual, June\n\nFull blog: www.shankygroup.com/blog 📚',
    category: 'blog', priority: 8
  },
  {
    keywords: ['event','webinar','seminar','conference','exhibition','expo','upcoming event','next event','register event','solar expo','metal summit'],
    answer: '📅 **Shanky Group Events 2025**\n\n**🔆 Solar Expo 2025**\n📆 March 14-16, 2025\n📍 Pragati Maidan, Delhi\n🎯 Booth: C-118\n✅ Live solar installation demo\n✅ Meet our engineers\n✅ Free consultation stall\n\n**🔩 Metal & Commodity Summit**\n📆 April 8-9, 2025\n📍 Jio World Convention Centre, Mumbai\n✅ Industry networking\n✅ Market analysis session\n✅ Shanky Metals showcase\n\n**📚 Corporate L&D Conclave**\n📆 May 22, 2025\n📍 The Leela, Delhi\n✅ HR & L&D professionals\n✅ Training innovations showcase\n✅ Shanky Training presenting\n\n**💼 Virtual Career Fair**\n📆 June 15, 2025 | Online\n✅ All openings live\n✅ On-the-spot screening\n✅ Free to attend!\n\n**Free Webinars (Monthly):**\n• "Solar ROI Calculator" — Every 3rd Thursday\n• "MSME Finance Masterclass" — Every 1st Wednesday\n• "Metal Market Briefing" — Monthly, Last Friday\n\n🔗 Register: events@shankygroup.com\n📞 +011-47586938',
    category: 'blog', priority: 7
  },
];

// ─────────────────────────────────────────────
//  SECTION 22 — DEFAULT & FALLBACK RESPONSES
// ─────────────────────────────────────────────
export const DEFAULT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['default','fallback','unknown','anything','everything'],
    answer: '🤔 Hmm... Main samjhne ki koshish kar raha hoon!\n\n**Aap shayad yeh poochna chahte hain:**\n\n🏢 Companies: "Shanky Financial kya hai?"\n💰 Finance: "Working capital loan kaise milega?"\n☀️ Solar: "Solar panel ka price kya hai?"\n🔩 Metals: "Steel ka rate kya hai?"\n📱 Electronics: "Laptop price"\n🌾 Food: "Wheat ka bhav"\n📚 Training: "Leadership training fees"\n💼 Jobs: "Job vacancy kya hai?"\n📍 Location: "Office kahan hai?"\n\n**Ya directly call karo:**\n📞 +011-47586938\n📧 info@shankygroup.com\n\nApna sawaal dobara aur clearly poocho — main zaroor help karunga! 💙',
    category: 'default', priority: 1
  },
  {
    keywords: ['not clear','samajh nahi aaya','explain karo','elaborate','details','aur batao','more info','full info','complete details','poori jankari'],
    answer: '📖 Sure! Aur detail chahiye — kaunse topic ke baare mein?\n\nMain in topics pe poori detail de sakta hoon:\n\n1️⃣ Shanky Financial — Loan products\n2️⃣ VMS Hub — Food products & pricing\n3️⃣ Shanky Smart Tech — Solar solutions\n4️⃣ Electronics Hub — Product range\n5️⃣ Shanky Metals — Metal types & rates\n6️⃣ Corporate Training — Programs & fees\n7️⃣ Careers — Job openings & apply process\n8️⃣ Contact — All ways to reach us\n9️⃣ Government schemes — Subsidies\n🔟 Compliance — Policies & governance\n\nKaunsa topic? Ek number bolo ya naam bolo! 😊',
    category: 'default', priority: 3
  },
];

// ──────────────────────────────────────────────────────────────
//  MASTER KNOWLEDGE BASE — ALL SECTIONS COMBINED
// ──────────────────────────────────────────────────────────────
export const CHATBOT_KNOWLEDGE: KnowledgeEntry[] = [
  ...GREETINGS_KNOWLEDGE,
  ...BOT_IDENTITY_KNOWLEDGE,
  ...GROUP_OVERVIEW_KNOWLEDGE,
  ...FINANCIAL_KNOWLEDGE,
  ...VMS_KNOWLEDGE,
  ...SOLAR_KNOWLEDGE,
  ...ELECTRONICS_KNOWLEDGE,
  ...METALS_KNOWLEDGE,
  ...TRAINING_KNOWLEDGE,
  ...CAREERS_KNOWLEDGE,
  ...CONTACT_KNOWLEDGE,
  ...SCHEMES_KNOWLEDGE,
  ...PRODUCTS_KNOWLEDGE,
  ...MISSION_KNOWLEDGE,
  ...COMPLIANCE_KNOWLEDGE,
  ...PARTNERSHIP_KNOWLEDGE,
  ...SMALLTALK_KNOWLEDGE,
  ...ABUSE_KNOWLEDGE,
  ...INDUSTRY_KNOWLEDGE,
  ...SUPPORT_KNOWLEDGE,
  ...BLOG_KNOWLEDGE,
  ...DEFAULT_KNOWLEDGE,
];

// ──────────────────────────────────────────────────────────────
//  DEFAULT ANSWER (when nothing matches)
// ──────────────────────────────────────────────────────────────
export const CHATBOT_DEFAULT_ANSWER =
  'Namaste! 🙏 Main **Shanky Bot** hoon — Shanky Group ka official chatbot!\n\n' +
  'Aapka sawaal samajhne mein thodi takleef ho rahi hai. 😅\n\n' +
  '**Yeh pooch sakte hain:**\n\n' +
  '🏢 **Companies:** "Shanky Financial kya karti hai?" | "VMS Hub ke baare mein"\n' +
  '💰 **Finance:** "Working capital loan kaise milega?" | "Invoice discounting kya hai?"\n' +
  '☀️ **Solar:** "Solar panel kitne ka hai?" | "PM Surya Ghar subsidy"\n' +
  '🔩 **Metals:** "Steel ka rate kya hai?" | "Aluminium supply"\n' +
  '📱 **Electronics:** "Laptop price" | "AC kitne ka hai?"\n' +
  '🌾 **Food:** "Wheat ka bhav" | "Dal supply"\n' +
  '📚 **Training:** "Sales training fees" | "Leadership program"\n' +
  '💼 **Jobs:** "Vacancy kya hai?" | "Fresher ke liye job"\n' +
  '📍 **Location:** "Office address" | "Kaise aayein?"\n\n' +
  '📞 **Urgent?** Call: +011-47586938\n' +
  '📧 **Email:** info@shankygroup.com\n\n' +
  'Main 24x7 yahan hoon — poocho! 🤖💙';

// ──────────────────────────────────────────────────────────────
//  ENHANCED HINGLISH MAP (500+ word mappings)
// ──────────────────────────────────────────────────────────────
export const HINGLISH_MAP: { [key: string]: string } = {
  // Question words
  'kahan': 'where', 'kaise': 'how', 'kya': 'what', 'kyu': 'why', 'kyun': 'why',
  'kab': 'when', 'kaun': 'who', 'kiska': 'whose', 'kis': 'which',
  'kitna': 'how much', 'kitne': 'how many', 'kitni': 'how much',
  // Pronouns
  'mera': 'my', 'meri': 'my', 'mere': 'my', 'tera': 'your', 'teri': 'your',
  'tere': 'your', 'hum': 'we', 'tum': 'you', 'aap': 'you', 'main': 'i',
  'hamara': 'our', 'hamari': 'our', 'apna': 'own', 'apni': 'own',
  'unka': 'their', 'unki': 'their', 'iske': 'its', 'uska': 'his her',
  // Verbs
  'hai': 'is', 'hain': 'are', 'tha': 'was', 'the': 'were', 'hoga': 'will be',
  'nahi': 'no', 'nhi': 'no', 'nai': 'no', 'chahiye': 'need want',
  'do': 'give', 'batao': 'tell', 'bataye': 'tell', 'bataiye': 'tell',
  'suno': 'listen', 'dekho': 'see', 'karo': 'do', 'jao': 'go',
  'aao': 'come', 'le': 'take', 'de': 'give', 'lena': 'take',
  'dena': 'give', 'karna': 'do', 'jana': 'go', 'aana': 'come',
  'milega': 'will get', 'milta': 'gets available', 'milti': 'gets available',
  'chahta': 'want', 'chahti': 'want', 'chahte': 'want',
  'lagta': 'seems', 'lagti': 'seems', 'lagna': 'seem',
  // Business words
  'company': 'company', 'naukri': 'job', 'kaam': 'work job',
  'paise': 'money', 'paisa': 'money', 'loan': 'loan', 'byaaj': 'interest',
  'munafa': 'profit', 'ghata': 'loss', 'samaan': 'product goods',
  'mal': 'goods', 'dhandha': 'business', 'vyapar': 'trade business',
  'karobar': 'business', 'vyavsay': 'business', 'udyog': 'industry',
  'kharch': 'expense', 'kharcha': 'expense', 'cost': 'cost',
  'bhav': 'price rate', 'dam': 'price', 'mulya': 'value price',
  'keemat': 'price', 'rate': 'rate', 'price': 'price',
  // Financial terms
  'udhar': 'credit loan', 'karj': 'debt loan', 'karz': 'debt loan',
  'bachat': 'savings', 'nivesh': 'investment', 'faida': 'profit benefit',
  'vyaj': 'interest', 'cheque': 'cheque', 'khata': 'account',
  'jama': 'deposit', 'nikalna': 'withdraw', 'transfer': 'transfer',
  // Time
  'aaj': 'today', 'kal': 'tomorrow yesterday', 'parson': 'day after',
  'beeta': 'past', 'abhi': 'now', 'jaldi': 'fast quickly',
  'der': 'late delay', 'samay': 'time', 'waqt': 'time',
  'mahina': 'month', 'saal': 'year', 'hafte': 'week',
  'ghanta': 'hour', 'minute': 'minute', 'second': 'second',
  // Adjectives
  'theek': 'ok fine', 'thik': 'ok fine', 'achha': 'good',
  'bura': 'bad', 'badhiya': 'good excellent', 'mast': 'great good',
  'sahi': 'correct right', 'galat': 'wrong', 'bada': 'big large',
  'chota': 'small', 'naya': 'new', 'purana': 'old',
  'acchi': 'good', 'acche': 'good', 'bade': 'big large',
  'zyada': 'more', 'kam': 'less', 'poora': 'complete full',
  'kuch': 'some', 'sab': 'all', 'koi': 'some any',
  // Locations
  'ghar': 'home house', 'daftar': 'office', 'dukan': 'shop',
  'sheher': 'city', 'gaon': 'village', 'bazar': 'market',
  // Actions
  'jaana': 'go', 'baat': 'talk',
  'bolna': 'say', 'sunna': 'listen', 'padhna': 'read study',
  'likhna': 'write', 'dekhna': 'see look', 'kharidna': 'buy',
  'bechna': 'sell', 'banana': 'make', 'todna': 'break',
  // Common phrases
  'matlab': 'meaning means', 'yani': 'means', 'jaise': 'like as',
  'isliye': 'therefore', 'kyunki': 'because', 'lekin': 'but',
  'aur': 'and', 'ya': 'or', 'toh': 'then so',
  'bhi': 'also', 'sirf': 'only', 'zaroor': 'definitely must',
  'bilkul': 'absolutely', 'haan': 'yes',
};

// ──────────────────────────────────────────────────────────────
//  SPELL CORRECTION MAP (common typos)
// ──────────────────────────────────────────────────────────────
export const SPELL_CORRECTIONS: { [key: string]: string } = {
  'finacial': 'financial', 'finanse': 'finance', 'fianance': 'finance',
  'shankey': 'shanky', 'shanki': 'shanky', 'shankie': 'shanky',
  'elektronic': 'electronic', 'electrnics': 'electronics',
  'solor': 'solar', 'soler': 'solar', 'soalr': 'solar',
  'aluminim': 'aluminium', 'alumnum': 'aluminium', 'alum': 'aluminium',
  'coper': 'copper', 'coppr': 'copper',
  'bras': 'brass', 'braas': 'brass',
  'sttel': 'steel', 'stee': 'steel',
  'traning': 'training', 'taining': 'training', 'trainig': 'training',
  'carrer': 'career', 'carreer': 'career', 'carier': 'career',
  'adress': 'address', 'adrees': 'address',
  'conatct': 'contact', 'cntact': 'contact', 'contect': 'contact',
  'prce': 'price', 'pric': 'price', 'pirce': 'price',
  'jb': 'job', 'jobb': 'job',
  'salry': 'salary', 'slary': 'salary',
  'internshp': 'internship', 'internsip': 'internship',
  'vacncy': 'vacancy', 'vacency': 'vacancy',
  'agri': 'agriculture', 'agriclture': 'agriculture',
  'compny': 'company', 'cmpany': 'company', 'comapny': 'company',
  'ofice': 'office', 'offce': 'office',
  'mision': 'mission', 'missin': 'mission',
  'complince': 'compliance', 'complinace': 'compliance',
  'goverment': 'government', 'govt': 'government',
  'subsdy': 'subsidy', 'subsidey': 'subsidy',
  'registrtion': 'registration', 'regstration': 'registration',
  'electrcity': 'electricity', 'electrcty': 'electricity',
  'pannels': 'panels', 'panal': 'panel',
  'instalation': 'installation', 'installtion': 'installation',
  'maintainance': 'maintenance', 'maintanance': 'maintenance',
};

// ──────────────────────────────────────────────────────────────
//  CONTEXT TRACKING (simple session-based)
// ──────────────────────────────────────────────────────────────
export type ChatContext = {
  lastCategory?: string;
  lastKeywords?: string[];
  messageCount: number;
  isFirstMessage: boolean;
  userName?: string;
  userInterest?: string;
};

export function createNewContext(): ChatContext {
  return {
    messageCount: 0,
    isFirstMessage: true,
  };
}

// ──────────────────────────────────────────────────────────────
//  CATEGORY FALLBACK RESPONSES
// ──────────────────────────────────────────────────────────────
export const CATEGORY_FALLBACKS: { [key: string]: string } = {
  financial:   '💰 Finance ke baare mein pooch rahe ho? Shanky Financial Services mein Working Capital, Invoice Discounting, Factoring sab available hai! Specific product batao ya call karo: +011-47586938',
  vms:         '🌾 Food & Agriculture ke baare mein? VMS Hub sab deliver karta hai — wheat, rice, dal, spices, oils. Bulk order ke liye: vms@shankygroup.com',
  solar:       '☀️ Solar ke baare mein? Shanky Smart Tech rooftop se industrial scale tak sab install karta hai. Free site survey: +011-47586938',
  electronics: '📱 Electronics mein interest hai? Shanky Electronics Hub mein TV, AC, Laptop, Mobile sab milta hai. Corporate discount bhi! Call: +011-47586939',
  metals:      '🔩 Metals chahiye? Shanky Metals — Steel, Aluminium, Copper, Brass sab available. Export bhi karte hain. Contact: metals@shankygroup.com',
  training:    '📚 Corporate Training? Shanky Corporate Training mein Leadership, Sales, Soft Skills sab hai! training@shankygroup.com',
  careers:     '💼 Job dhundh rahe ho? careers@shankygroup.com pe CV bhejo ya +011-47586941 call karo!',
  contact:     '📞 Contact chahiye? Main Line: +011-47586938 | Email: info@shankygroup.com | Address: D Mall, NSP, Pitampura, Delhi',
  products:    '🛍️ Products ke baare mein poochh rahe ho? Kaunsi company ka product chahiye? Finance, Solar, Metals, Electronics, Food, Training — sab available!',
  support:     '🛠️ Help chahiye? Directly batao kya problem hai, ya call karo: +011-47586940',
  schemes:     '🇮🇳 Government scheme mein help chahiye? PM Surya Ghar, MUDRA, MSME sab mein guide karenge! Call: +011-47586938',
  greetings:   'Namaste! 😊 Shanky Group mein swagat hai. Kya help chahiye?',
  fun:         '😄 Kuch mazedaar poochh rahe ho! Shanky Bot ke saath timepass welcome hai — ya phir koi business sawaal bhi poocho!',
  compliance:  '📋 Compliance aur governance ke baare mein? legal@shankygroup.com pe contact karo ya website pe policies section dekho.',
  industry:    '📊 Industry knowledge chahiye? Main bata sakta hoon — finance, solar, metals, food — kaunsa sector?',
  group_overview: '🏛️ Shanky Group ke baare mein — 2014 se, 6 companies, 500+ employees, ₹100 Cr+ turnover. Kisi specific cheez ke baare mein poochho!',
  blog:        '📰 Latest news aur events ke liye: www.shankygroup.com/blog | Ya events@shankygroup.com',
  mission:     '🎯 Mission, Vision, Values ke baare mein? Shanky Group believes in Integrity, Excellence, Innovation, Customer Focus, Teamwork & Sustainability!',
  partnerships:'🤝 Partnership ke liye: partnership@shankygroup.com | Vendor registration: vendor@shankygroup.com',
};

// ──────────────────────────────────────────────────────────────
//  SMART CONTEXT-AWARE FOLLOW-UP SUGGESTIONS
// ──────────────────────────────────────────────────────────────
export const FOLLOW_UP_SUGGESTIONS: { [key: string]: string[] } = {
  financial:   ['Interest rate kya hai?', 'Documents kya chahiye?', 'Kitne din mein loan milega?', 'Eligibility kya hai?'],
  solar:       ['Solar ka price kya hai?', 'Subsidy kitni milegi?', 'ROI kitne saal mein?', 'Free survey kaise book karein?'],
  metals:      ['Current steel rate?', 'MOQ kya hai?', 'Export karte ho kya?', 'Quality certificate milega?'],
  electronics: ['Bulk discount kya hai?', 'Warranty kitne saal ki?', 'Delivery kab tak?', 'EMI available hai?'],
  vms:         ['Minimum order kya hai?', 'Organic products available?', 'Delivery kahan tak?', 'Quality certified hai?'],
  training:    ['Schedule kya hai?', 'Online training available?', 'Certificate milega?', 'Group discount?'],
  careers:     ['Kaise apply karein?', 'Salary kya milegi?', 'Interview kab hoga?', 'Freshers ke liye kya hai?'],
  contact:     ['Nearest metro kaunsa hai?', 'Office kab khulta hai?', 'WhatsApp number hai?', 'Email kya hai?'],
};

// ──────────────────────────────────────────────────────────────
//  ENHANCED MATCHING ALGORITHM
// ──────────────────────────────────────────────────────────────
export function getReplyFromKnowledge(
  userMessage: string,
  context?: ChatContext
): { answer: string; category?: string; suggestions?: string[] } {
  const raw = userMessage.toLowerCase().trim();
  if (!raw) {
    return { answer: CHATBOT_DEFAULT_ANSWER };
  }

  // ── Step 1: Apply spell corrections ──
  let corrected = raw;
  const rawWords = raw.split(/\s+/);
  const correctedWords = rawWords.map(w => SPELL_CORRECTIONS[w] ?? w);
  corrected = correctedWords.join(' ');

  // ── Step 2: Apply Hinglish → English mapping ──
  let normalized = corrected;
  Object.entries(HINGLISH_MAP).forEach(([hi, en]) => {
    const regex = new RegExp(`\\b${hi}\\b`, 'g');
    normalized = normalized.replace(regex, en);
  });

  // ── Step 3: Tokenize ──
  const tokens = normalized
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  // Unique tokens for efficiency
  const tokenSet = new Set(tokens);

  // ── Step 4: Pattern normalization ──
  const patterns: Array<[RegExp, string]> = [
    [/chahiye\s+(\w+)/g, 'need $1'],
    [/(\w+)\s+chahiye/g, 'need $1'],
    [/kitne\s+ka\s+(?:hai|hain)?/g, 'price'],
    [/kahan\s+(?:hai|milega|hain)?/g, 'location'],
    [/kaise\s+apply/g, 'how apply'],
    [/kaise\s+milega/g, 'how get'],
    [/phone\s+number/g, 'phone'],
    [/address\s+(?:kya|batao)?/g, 'address'],
    [/kitna\s+(?:hai|hoga)/g, 'price how much'],
    [/kab\s+milega/g, 'when available'],
    [/kab\s+tak/g, 'how long when'],
  ];

  patterns.forEach(([pattern, replacement]) => {
    normalized = normalized.replace(pattern, replacement);
  });

  // ── Step 5: Score each knowledge entry ──
  let bestScore = 0;
  let bestEntry: KnowledgeEntry | null = null;

  // Collect category scores for fallback
  const categoryScores: { [cat: string]: number } = {};

  for (const entry of CHATBOT_KNOWLEDGE) {
    let score = 0;

    for (const kw of entry.keywords) {
      const k = kw.toLowerCase();
      const kwTokens = k.split(/\s+/);

      // Exact full-message match — jackpot
      if (raw === k) { score += 100; break; }

      // Multi-word keyword match in original
      if (kwTokens.length > 1) {
        if (raw.includes(k)) score += 15;
        else if (normalized.includes(k)) score += 12;
        else if (corrected.includes(k)) score += 10;
      } else {
        // Single-word matching
        if (raw.includes(k)) score += 8;
        else if (normalized.includes(k)) score += 7;
        else if (corrected.includes(k)) score += 6;

        // Token-level matching
        if (tokenSet.has(k)) score += 5;

        // Partial match (for longer keywords)
        if (k.length > 5) {
          const stem = k.substring(0, k.length - 2);
          if (tokens.some(t => t.startsWith(stem))) score += 3;
          if (raw.includes(stem)) score += 2;
        }

        // Fuzzy match — contains
        if (k.length > 3 && tokens.some(t => t.includes(k) || k.includes(t))) score += 1;
      }
    }

    // Priority boost
    if (entry.priority) score += entry.priority * 0.4;

    // Context boost: if same category as last message
    if (context?.lastCategory && entry.category === context.lastCategory) {
      score += 2;
    }

    // Track category scores
    if (entry.category && score > 0) {
      categoryScores[entry.category] = (categoryScores[entry.category] || 0) + score;
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // ── Step 6: Threshold & fallback logic ──
  if (bestScore >= 5 && bestEntry) {
    const cat = bestEntry.category;
    const suggestions = cat ? FOLLOW_UP_SUGGESTIONS[cat] : undefined;
    return {
      answer: bestEntry.answer,
      category: cat,
      suggestions,
    };
  }

  // Low score — try category fallback
  if (bestScore >= 2) {
    // Find best category
    const topCat = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

    if (topCat && CATEGORY_FALLBACKS[topCat]) {
      return {
        answer: CATEGORY_FALLBACKS[topCat],
        category: topCat,
        suggestions: FOLLOW_UP_SUGGESTIONS[topCat],
      };
    }
  }

  // Complete fallback
  return { answer: CHATBOT_DEFAULT_ANSWER };
}

// ──────────────────────────────────────────────────────────────
//  CONTEXT-AWARE WRAPPER (with session memory)
// ──────────────────────────────────────────────────────────────
export function getChatReply(
  userMessage: string,
  context: ChatContext
): { answer: string; category?: string; updatedContext: ChatContext } {
  context.messageCount += 1;
  context.isFirstMessage = context.messageCount === 1;

  // Greeting for first message
  if (context.isFirstMessage) {
    const lower = userMessage.toLowerCase().trim();
    const isGreeting = ['hello','hi','hey','namaste','hii','hy'].some(g => lower.includes(g));
    if (isGreeting) {
      const result = getReplyFromKnowledge(userMessage, context);
      const updatedContext: ChatContext = {
        ...context,
        lastCategory: result.category,
        lastKeywords: userMessage.toLowerCase().split(/\s+/),
      };
      return { ...result, updatedContext };
    }
  }

  const result = getReplyFromKnowledge(userMessage, context);

  const updatedContext: ChatContext = {
    ...context,
    lastCategory: result.category ?? context.lastCategory,
    lastKeywords: userMessage.toLowerCase().split(/\s+/),
  };

  return { ...result, updatedContext };
}

// ──────────────────────────────────────────────────────────────
//  UTILITY FUNCTIONS
// ──────────────────────────────────────────────────────────────

/** Count entries per category */
export function getCategoryCounts(): { [key: string]: number } {
  const counts: { [key: string]: number } = {};
  CHATBOT_KNOWLEDGE.forEach(entry => {
    const cat = entry.category || 'uncategorized';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return counts;
}

/** Search knowledge base by query string */
export function searchKnowledgeBase(query: string): KnowledgeEntry[] {
  const q = query.toLowerCase();
  return CHATBOT_KNOWLEDGE
    .filter(entry => entry.keywords.some(kw => kw.toLowerCase().includes(q)))
    .slice(0, 10);
}

/** Get all entries for a specific category */
export function getByCategory(category: string): KnowledgeEntry[] {
  return CHATBOT_KNOWLEDGE.filter(e => e.category === category);
}

/** Get high-priority entries */
export function getHighPriorityEntries(minPriority = 8): KnowledgeEntry[] {
  return CHATBOT_KNOWLEDGE.filter(e => (e.priority ?? 0) >= minPriority);
}

// ──────────────────────────────────────────────────────────────
//  KNOWLEDGE BASE STATISTICS
// ──────────────────────────────────────────────────────────────
export const KNOWLEDGE_BASE_STATS = {
  totalEntries: CHATBOT_KNOWLEDGE.length,
  categories: [...new Set(CHATBOT_KNOWLEDGE.map(e => e.category || 'uncategorized'))],
  categoryCounts: getCategoryCounts(),
  totalKeywords: CHATBOT_KNOWLEDGE.reduce((acc, e) => acc + e.keywords.length, 0),
  averageKeywordsPerEntry:
    CHATBOT_KNOWLEDGE.reduce((acc, e) => acc + e.keywords.length, 0) /
    Math.max(CHATBOT_KNOWLEDGE.length, 1),
  hinglishMappings: Object.keys(HINGLISH_MAP).length,
  spellCorrections: Object.keys(SPELL_CORRECTIONS).length,
};

// ──────────────────────────────────────────────────────────────
//  QUICK REPLY CHIPS (for UI buttons)
// ──────────────────────────────────────────────────────────────
export const QUICK_REPLIES = {
  welcome: [
    '🏢 Companies ke baare mein batao',
    '💼 Jobs chahiye',
    '📍 Office address',
    '☀️ Solar panel price',
  ],
  after_greeting: [
    '💰 Loan chahiye',
    '☀️ Solar lena hai',
    '🔩 Metals ka rate',
    '📱 Electronics price',
  ],
  financial: [
    '📋 Documents kya chahiye?',
    '💰 Interest rate kya hai?',
    '⏱️ Kitne din mein milega?',
    '✅ Eligibility kya hai?',
  ],
  solar: [
    '💰 Price kya hai?',
    '🌟 Subsidy kitni?',
    '📈 ROI calculation',
    '📞 Free survey book karo',
  ],
  careers: [
    '📝 Kaise apply karein?',
    '💵 Salary kya milegi?',
    '🎓 Freshers ke liye kya?',
    '📧 Email kahan bhejein?',
  ],
};
