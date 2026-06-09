const translations = {
  ja: {
    navVoice: "VOICE SAMPLE",
    navAchievements: "ACHIEVEMENTS",
    navAbout: "ABOUT",
    navContact: "CONTACT",
    heroRole: "Narrator / Voice Over Artist",
    heroLead: "聴きやすく、伝わるナレーションを。",
    heroText: "企業VP、eラーニング、Web動画、オーディオブックなど幅広く対応。",
    heroCta: "ボイスサンプルを聴く",
    heroProofSalesLabel: "企業・個人案件",
    heroProofSalesValue: "多数対応",
    heroProofRatingLabel: "ココナラ評価",
    heroProofClientsLabel: "対応領域",
    heroProofClientsValue: "企業VP / eラーニング / WebCM / オーディオブック",
    voiceEyebrow: "VOICE SAMPLE",
    voiceTitle: "すぐに聴けるボイスサンプル",
    voiceIntro: "用途別のナレーションを掲載しています。制作内容に近いサンプルからお聴きください。",
    sampleVpType: "企業VP",
    sampleVpTitle: "信頼感のあるナレーション",
    sampleVpDesc: "企業紹介やサービス紹介向けの、信頼感のあるナレーションです。",
    sampleCmType: "WebCM",
    sampleCmTitle: "短時間で印象を届けるナレーション",
    sampleCmDesc: "商品やサービスの魅力を短時間で伝えるナレーションです。",
    sampleLearningType: "eラーニング",
    sampleLearningTitle: "聞き取りやすい教材向けナレーション",
    sampleLearningDesc: "研修動画や教育コンテンツ向けの聞き取りやすいナレーションです。",
    sampleYoutubeType: "YouTube解説",
    sampleYoutubeTitle: "自然で伝わる解説ナレーション",
    sampleYoutubeDesc: "解説動画や情報コンテンツ向けの自然なナレーションです。",
    sampleBookType: "オーディオブック",
    sampleBookTitle: "落ち着いた朗読ナレーション",
    sampleBookDesc: "物語や書籍コンテンツ向けの落ち着いたナレーションです。",
    achievementsEyebrow: "ACHIEVEMENTS",
    achievementsTitle: "実績",
    salesCount: "159件以上",
    salesLabel: "ココナラ販売実績",
    salesNote: "※ココナラでの販売実績です",
    ratingLabel: "ココナラ評価",
    ndaNote: "守秘義務契約の都合上、企業名および案件名の公開は控えております。",
    workInfra: "大手インフラ関連企業案件",
    workHr: "大手人材サービス関連企業案件",
    workPublic: "公共機関関連案件",
    workEstate: "大手不動産関連企業案件",
    workBook: "オーディオブック案件",
    workCm: "WebCM案件",
    aboutEyebrow: "ABOUT",
    aboutTitle: "MON（もん）",
    aboutText: "企業VP、研修動画、eラーニング、Webコンテンツ、オーディオブック、WebCMなどを中心に活動するナレーターです。聞きやすく、伝わるナレーションを心がけています。",
    contactEyebrow: "CONTACT",
    contactTitle: "ご依頼・お問い合わせ",
    contactIntro: "制作内容、用途、希望納期を添えてご連絡ください。",
    coconalaCta: "ココナラから依頼する"
  },
  en: {
    navVoice: "VOICE SAMPLE",
    navAchievements: "ACHIEVEMENTS",
    navAbout: "ABOUT",
    navContact: "CONTACT",
    heroRole: "Narrator / Voice Over Artist",
    heroLead: "Clear, easy-to-listen-to narration that communicates.",
    heroText: "Available for corporate videos, e-learning, web videos, audiobooks, and more.",
    heroCta: "Listen to voice samples",
    heroProofSalesLabel: "Corporate / individual work",
    heroProofSalesValue: "Many projects handled",
    heroProofRatingLabel: "Coconala rating",
    heroProofClientsLabel: "Voice-over fields",
    heroProofClientsValue: "Corporate VP / e-learning / WebCM / audiobooks",
    voiceEyebrow: "VOICE SAMPLE",
    voiceTitle: "Voice samples ready to play",
    voiceIntro: "Listen to narration samples by use case and choose the tone closest to your project.",
    sampleVpType: "Corporate Video",
    sampleVpTitle: "Trustworthy corporate narration",
    sampleVpDesc: "A reliable narration style for company introductions and service videos.",
    sampleCmType: "Web Commercial",
    sampleCmTitle: "Concise narration with impact",
    sampleCmDesc: "Narration that communicates the appeal of products and services in a short time.",
    sampleLearningType: "e-Learning",
    sampleLearningTitle: "Clear narration for learning content",
    sampleLearningDesc: "Easy-to-follow narration for training videos and educational content.",
    sampleYoutubeType: "YouTube Explainer",
    sampleYoutubeTitle: "Natural explanatory narration",
    sampleYoutubeDesc: "A natural narration style for explainer videos and information-based content.",
    sampleBookType: "Audiobook",
    sampleBookTitle: "Calm audiobook narration",
    sampleBookDesc: "A relaxed narration style for stories, books, and long-form content.",
    achievementsEyebrow: "ACHIEVEMENTS",
    achievementsTitle: "Achievements",
    salesCount: "159+ projects",
    salesLabel: "Coconala sales record",
    salesNote: "Coconala sales record only",
    ratingLabel: "Coconala rating",
    ndaNote: "Due to confidentiality agreements, company names and project titles are not publicly disclosed.",
    workInfra: "Major infrastructure company projects",
    workHr: "Major staffing service company projects",
    workPublic: "Public-sector related projects",
    workEstate: "Major real estate company projects",
    workBook: "Audiobook projects",
    workCm: "Web commercial projects",
    aboutEyebrow: "ABOUT",
    aboutTitle: "MON",
    aboutText: "MON is a narrator focused on corporate videos, training videos, e-learning, web content, audiobooks, and web commercials. The goal is always narration that is easy to listen to and clearly communicates the message.",
    contactEyebrow: "CONTACT",
    contactTitle: "Contact",
    contactIntro: "Please include your project details, intended use, and preferred deadline when getting in touch.",
    coconalaCta: "Request via Coconala"
  }
};

const buttons = document.querySelectorAll(".lang-button");
const translatable = document.querySelectorAll("[data-i18n]");
const audios = document.querySelectorAll("audio");

function setLanguage(lang) {
  document.documentElement.lang = lang;
  translatable.forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[lang][key]) {
      node.textContent = translations[lang][key];
    }
  });
  buttons.forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  localStorage.setItem("mon-site-lang", lang);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

audios.forEach((audio) => {
  audio.addEventListener("play", () => {
    audios.forEach((other) => {
      if (other !== audio) other.pause();
    });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(localStorage.getItem("mon-site-lang") || "ja");
