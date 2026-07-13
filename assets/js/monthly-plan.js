const monthlyPlanData = {
  plans: [
    {
      name: "Light",
      label: "月1〜2本の小規模動画向け",
      price: "60,000円 / 月",
      featured: false,
      specs: [
        ["月間文字数", "1,200文字まで"],
        ["月間本数", "2本まで"],
        ["1本上限", "700文字まで"],
        ["無料修正", "各本1回"],
        ["基本納期", "4営業日目安"],
        ["超過料金", "1文字60円 / 追加1本5,000円"]
      ],
      note: "短い商品紹介、社内動画、YouTubeの小規模運用に。"
    },
    {
      name: "Standard",
      label: "最もおすすめ",
      price: "120,000円 / 月",
      featured: true,
      specs: [
        ["月間文字数", "3,000文字まで"],
        ["月間本数", "4本まで"],
        ["1本上限", "1,000文字まで"],
        ["無料修正", "各本1回"],
        ["基本納期", "3営業日目安"],
        ["超過料金", "1文字55円 / 追加1本5,000円"]
      ],
      note: "毎週の動画、eラーニング、サービス紹介の継続制作に。"
    },
    {
      name: "Partner",
      label: "制作会社・複数案件向け",
      price: "220,000円 / 月",
      featured: false,
      specs: [
        ["月間文字数", "6,000文字まで"],
        ["月間本数", "8本まで"],
        ["1本上限", "1,200文字まで"],
        ["無料修正", "各本2回"],
        ["基本納期", "3営業日目安 / 優先枠"],
        ["超過料金", "1文字50円 / 追加1本5,000円"]
      ],
      note: "教材制作会社、動画制作会社、複数案件を継続する法人に。"
    }
  ],
  included: [
    "ナレーション収録",
    "ノイズ除去・音量調整",
    "WAV / MP3納品",
    "MON側の読み間違い修正",
    "事前指示との明確な相違の修正",
    "軽微な発音・自然さの確認",
    "月間収録枠の確保"
  ],
  excluded: [
    "翻訳・全面リライト",
    "動画編集・BGM制作・SE追加",
    "台本未完成状態からの企画制作",
    "納品後の原稿変更",
    "演出やトーンの変更",
    "後から追加された指示",
    "全編の再収録",
    "発注者都合の差し替え",
    "無制限修正・無制限収録",
    "事前連絡なしの即日納品要求"
  ],
  terms: [
    ["最低契約期間", "初回3カ月。その後は1カ月単位で更新。"],
    ["繰越", "未使用分の翌月繰越なし。月ごとの収録枠として管理します。"],
    ["急ぎ対応", "24時間納品は月額内該当分の30%増、同日納品は50%増。最低追加料金は15,000円。"],
    ["文字数計算", "日本語本文、記号、数字、英字、読み仮名を含めてカウントします。"],
    ["商用利用", "企業サイト、SNS、YouTube、社内研修、営業資料動画での利用を想定。広告・放送・長期大型利用は別途相談。"],
    ["ココナラ利用", "専用サービスページから見積もり相談後、1カ月または3カ月分をココナラ内で決済します。"]
  ],
  faq: [
    {
      question: "月内に使い切れなかった文字数は翌月へ繰り越せますか？",
      answer: "原則として繰越はありません。毎月の制作量を安定して確保するための収録枠として設計しています。"
    },
    {
      question: "原稿変更による再収録は無料修正に含まれますか？",
      answer: "含まれません。無料修正はMON側の読み間違い、または事前指示との明確な相違に限ります。納品後の原稿変更、演出やトーンの変更、後から追加された指示、全編の再収録、発注者都合の差し替えは有料です。"
    },
    {
      question: "短い原稿を大量に分けて依頼できますか？",
      answer: "文字数以内でも月間本数の上限があります。大量のファイル分割や細かな差し替えが必要な場合は、追加費用またはPartnerプランをご案内します。"
    },
    {
      question: "ココナラで月額契約はできますか？",
      answer: "専用サービスページから見積もり相談後、1カ月または3カ月分をココナラ内で決済します。"
    }
  ]
};

function renderMonthlyPlan() {
  const cards = document.getElementById("monthly-plan-cards");
  const included = document.getElementById("monthly-included");
  const excluded = document.getElementById("monthly-excluded");
  const terms = document.getElementById("monthly-terms");
  const faq = document.getElementById("monthly-faq");
  if (!cards || !included || !excluded || !terms || !faq) return;

  cards.innerHTML = monthlyPlanData.plans.map((plan) => `
    <article class="plan-card${plan.featured ? " is-featured" : ""}">
      <p class="plan-label">${plan.label}</p>
      <h3>${plan.name}</h3>
      <p class="plan-price">${plan.price}</p>
      <dl>
        ${plan.specs.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join("")}
      </dl>
      <p class="plan-note">${plan.note}</p>
    </article>
  `).join("");

  included.innerHTML = monthlyPlanData.included.map((item) => `<li>${item}</li>`).join("");
  excluded.innerHTML = monthlyPlanData.excluded.map((item) => `<li>${item}</li>`).join("");
  terms.innerHTML = monthlyPlanData.terms.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join("");
  faq.innerHTML = monthlyPlanData.faq.map((item) => `
    <article>
      <h3>${item.question}</h3>
      <p>${item.answer}</p>
    </article>
  `).join("");
}

renderMonthlyPlan();
