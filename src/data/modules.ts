import type { NewsModule } from "../types";

const thoughtPrompts = [
  {
    id: "claim",
    label: "claim",
    title: "いまの自分の立場",
    prompt: "このニュースについて、現時点で自分はどう考える？",
  },
  {
    id: "reasons",
    label: "reasons",
    title: "そう考える理由",
    prompt: "その立場を支える理由を、生活・社会・未来の視点で書いてみよう。",
  },
  {
    id: "evidence",
    label: "evidence",
    title: "根拠になりそうな情報",
    prompt: "記事、統計、制度、歴史の中で、根拠として確認したいことは？",
  },
  {
    id: "counterpoint",
    label: "counterpoint",
    title: "反対側からの見方",
    prompt: "自分と違う立場の人は、どんな不安や価値観を持っていそう？",
  },
  {
    id: "nextQuestion",
    label: "nextQuestion",
    title: "次に調べる問い",
    prompt: "意見を強くするために、次に調べるべき問いを一つ選ぼう。",
  },
] satisfies NewsModule["thoughtPrompts"];

export const newsModules: NewsModule[] = [
  {
    id: "climate-cities",
    category: "環境と都市",
    title: "猛暑対策で変わる都市のルール",
    summary:
      "各地で猛暑日が増えるなか、自治体は学校、街路、公共施設の設計を見直し始めています。気候変動を自分の暮らしの制度として考えます。",
    readingTime: "7分",
    difficulty: "Starter",
    leadQuestion: "都市は暑さに合わせて、どこまで生活のルールを変えるべき？",
    backgroundSections: [
      {
        kind: "history",
        title: "都市化とヒートアイランド",
        body:
          "道路や建物が熱をためる都市では、郊外より気温が高くなりやすい。戦後の都市開発は効率と交通を重視してきたため、木陰や水辺の余白が少ない地域もあります。",
      },
      {
        kind: "system",
        title: "誰が対策を決めるのか",
        body:
          "国は気候変動への適応方針を示し、自治体は学校の運用、避難場所、公園整備、道路計画などに落とし込みます。企業や住民の協力も必要です。",
      },
      {
        kind: "stakeholders",
        title: "影響を受けやすい人",
        body:
          "高齢者、子ども、屋外労働者、エアコンを使いにくい家庭はリスクが高くなります。暑さ対策は環境問題であると同時に、福祉や労働の問題でもあります。",
      },
      {
        kind: "debate",
        title: "費用と自由のバランス",
        body:
          "街路樹や断熱改修には予算が必要です。屋外活動の制限は安全を守る一方で、部活動や地域行事の自由にも影響します。",
      },
    ],
    timeline: [
      { year: "1960年代", event: "都市への人口集中が進み、道路や住宅地が広がる。" },
      { year: "1990年代", event: "地球温暖化と都市の暑さが政策課題として注目される。" },
      { year: "2018年", event: "猛暑が災害級と表現され、熱中症対策が広く議論される。" },
      { year: "現在", event: "学校運営、公共空間、住宅性能の見直しが進む。" },
    ],
    glossary: [
      {
        term: "適応策",
        description: "すでに起きている気候変化に合わせて、被害を減らすための対策。",
      },
      {
        term: "ヒートアイランド",
        description: "都市部の気温が周辺地域より高くなる現象。",
      },
      {
        term: "暑さ指数",
        description: "気温、湿度、日射などから熱中症の危険度を示す指標。",
      },
    ],
    quizItems: [
      {
        id: "climate-q1",
        question: "都市の暑さ対策を考えるとき、環境以外に関係が深い分野はどれ？",
        choices: ["福祉や労働", "海外旅行", "宇宙開発", "芸能ニュース"],
        answerIndex: 0,
        explanation:
          "暑さの影響は高齢者、子ども、屋外労働者などに偏りやすく、福祉や労働の制度ともつながります。",
      },
      {
        id: "climate-q2",
        question: "ヒートアイランド現象の説明として近いものは？",
        choices: [
          "都市が周辺より暑くなりやすい現象",
          "海面が急に凍る現象",
          "山間部で雪が増える現象",
          "台風の進路が消える現象",
        ],
        answerIndex: 0,
        explanation:
          "道路や建物が熱をため、都市部の気温が周辺より高くなることがあります。",
      },
    ],
    thoughtPrompts,
  },
  {
    id: "ai-school",
    category: "教育とテクノロジー",
    title: "学校で生成AIをどう使うか",
    summary:
      "生成AIを学習に使う動きが広がる一方、丸写し、評価、公平性への不安もあります。学校制度の目的から考え直します。",
    readingTime: "8分",
    difficulty: "Core",
    leadQuestion: "AIを禁止するより、使い方を学ぶほうがよいのだろうか？",
    backgroundSections: [
      {
        kind: "history",
        title: "新しい道具と教育",
        body:
          "電卓、インターネット、スマートフォンが登場するたび、学校は使い方と禁止の線引きを考えてきました。AIも同じく、学ぶ力を弱める道具にも、伸ばす道具にもなります。",
      },
      {
        kind: "system",
        title: "評価の仕組み",
        body:
          "学校の評価は、知識の理解、考え方、表現、協働などを測ります。AIが文章を整えられる時代には、過程や対話をどう評価するかが重要になります。",
      },
      {
        kind: "stakeholders",
        title: "アクセス格差",
        body:
          "家庭の端末、通信環境、有料ツールの利用可否によって、AIを使える生徒と使えない生徒が生まれます。公平性の設計が欠かせません。",
      },
      {
        kind: "debate",
        title: "禁止かリテラシーか",
        body:
          "禁止は不正利用を抑えやすい反面、社会で使われる道具を学ぶ機会を失います。リテラシー教育は時間と教員支援が必要です。",
      },
    ],
    timeline: [
      { year: "1970年代", event: "電卓の普及で計算教育のあり方が議論される。" },
      { year: "2000年代", event: "学校でインターネット検索と情報モラル教育が広がる。" },
      { year: "2020年代", event: "生成AIが文章、画像、コード作成を身近にする。" },
      { year: "現在", event: "学校ごとにAI利用のルールづくりが進む。" },
    ],
    glossary: [
      {
        term: "生成AI",
        description: "文章、画像、音声、コードなどを新しく作るAI。",
      },
      {
        term: "情報リテラシー",
        description: "情報を探し、判断し、安全に使い、発信する力。",
      },
      {
        term: "形成的評価",
        description: "学習の途中で理解や課題を確かめ、次の学びに生かす評価。",
      },
    ],
    quizItems: [
      {
        id: "ai-q1",
        question: "生成AI時代の学校評価で重要になりやすいものは？",
        choices: ["学習の過程や説明", "鉛筆の長さ", "机の色", "登校時の天気"],
        answerIndex: 0,
        explanation:
          "AIが完成文を作れるため、どう考え、どう修正したかという過程の評価が重要になります。",
      },
      {
        id: "ai-q2",
        question: "AI利用の公平性で考えるべき点はどれ？",
        choices: [
          "端末や通信環境の差",
          "校庭の広さだけ",
          "制服の色だけ",
          "給食の献立だけ",
        ],
        answerIndex: 0,
        explanation:
          "AIを使える環境に差があると、学習機会にも差が生まれる可能性があります。",
      },
    ],
    thoughtPrompts,
  },
  {
    id: "population-local",
    category: "地域と政治",
    title: "人口減少時代のまちづくり",
    summary:
      "地方の人口減少は、交通、医療、学校、税収に影響します。個人の移住問題ではなく、公共サービスの設計として捉えます。",
    readingTime: "9分",
    difficulty: "Deep",
    leadQuestion: "人口が減る地域で、守るサービスと変えるサービスをどう選ぶ？",
    backgroundSections: [
      {
        kind: "history",
        title: "高度成長と地域構造",
        body:
          "高度成長期には都市へ人が集まり、地方でも道路、学校、公共施設が整備されました。人口が増える前提の仕組みは、減少局面で維持が難しくなります。",
      },
      {
        kind: "system",
        title: "自治体財政",
        body:
          "自治体は税収、国からの交付金、借入などで公共サービスを支えます。人口が減ると一人あたりの維持費が上がり、施設統合や広域連携が選択肢になります。",
      },
      {
        kind: "stakeholders",
        title: "生活の足とケア",
        body:
          "車を運転できない人、通院が必要な人、子育て世帯にとって、交通や医療の縮小は生活の質に直結します。",
      },
      {
        kind: "debate",
        title: "集中と分散",
        body:
          "サービスを中心部に集めると効率は上がりますが、周辺地域の不便は増えます。どこに住んでも同じサービスを受けられるべきかが問われます。",
      },
    ],
    timeline: [
      { year: "1950-70年代", event: "高度成長で都市化が進み、公共施設も増える。" },
      { year: "1990年代", event: "少子高齢化が長期的な政策課題になる。" },
      { year: "2010年代", event: "地方創生やコンパクトシティが議論される。" },
      { year: "現在", event: "交通、学校、医療の維持方法が地域ごとの課題になる。" },
    ],
    glossary: [
      {
        term: "コンパクトシティ",
        description: "住居や公共サービスを一定の範囲に集め、効率よく都市を運営する考え方。",
      },
      {
        term: "広域連携",
        description: "複数の自治体が協力してサービスや施設を運営すること。",
      },
      {
        term: "社会保障",
        description: "医療、介護、年金、福祉など生活を支える制度の総称。",
      },
    ],
    quizItems: [
      {
        id: "population-q1",
        question: "人口減少が自治体サービスに影響する理由として近いものは？",
        choices: [
          "税収や利用者が減り、維持費の負担が重くなる",
          "全員が同じ服を着るから",
          "天気予報が不要になるから",
          "道路の名前が変わるから",
        ],
        answerIndex: 0,
        explanation:
          "人口が減ると税収や利用者が減る一方、施設やサービスの維持費は急には減りません。",
      },
      {
        id: "population-q2",
        question: "サービスを中心部に集める政策の課題は？",
        choices: [
          "周辺地域の不便が増える可能性",
          "公共交通が必ず無料になること",
          "医療が不要になること",
          "学校が宇宙に移ること",
        ],
        answerIndex: 0,
        explanation:
          "効率は上がっても、中心部から遠い人の移動負担や孤立リスクが増えることがあります。",
      },
    ],
    thoughtPrompts,
  },
];
