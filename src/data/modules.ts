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
    lastReviewedAt: "2026-04-29",
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
    sourceNotes: [
      {
        title: "熱中症対策に関する用語",
        publisher: "気象庁",
        url: "https://www.jma.go.jp/jma/kishou/know/yougo_hp/nettyusho.html",
        note: "暑さ指数、熱中症警戒アラートなどの用語確認に使う。",
      },
      {
        title: "環境省熱中症予防情報サイトにおける暑さ指数等の情報提供について",
        publisher: "環境省",
        url: "https://www.env.go.jp/press/109512.html",
        note: "暑熱環境、気候変動、ヒートアイランドと熱中症予防情報の関係を確認する。",
      },
    ],
  },
  {
    id: "ai-school",
    category: "教育とテクノロジー",
    title: "学校で生成AIをどう使うか",
    summary:
      "生成AIを学習に使う動きが広がる一方、丸写し、評価、公平性への不安もあります。学校制度の目的から考え直します。",
    readingTime: "8分",
    difficulty: "Core",
    lastReviewedAt: "2026-04-29",
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
    sourceNotes: [
      {
        title: "リーディングDXスクール 生成AIパイロット校",
        publisher: "文部科学省",
        url: "https://leadingdxschool.mext.go.jp/ai_school/",
        note: "学校現場での生成AI活用とガイドラインの位置づけを確認する。",
      },
      {
        title: "初等中等教育段階における生成AIの利活用に関するガイドライン",
        publisher: "文部科学省",
        url: "https://www.mext.go.jp/content/20241126-mxt_jogai01-000038813_001.pdf",
        note: "生成AIの利活用に関する基本的な考え方と留意点を確認する。",
      },
    ],
  },
  {
    id: "population-local",
    category: "地域と政治",
    title: "人口減少時代のまちづくり",
    summary:
      "地方の人口減少は、交通、医療、学校、税収に影響します。個人の移住問題ではなく、公共サービスの設計として捉えます。",
    readingTime: "9分",
    difficulty: "Deep",
    lastReviewedAt: "2026-04-29",
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
    sourceNotes: [
      {
        title: "コンパクトなまちづくりについて",
        publisher: "国土交通省",
        url: "https://www.mlit.go.jp/toshi/toshi_tk1_000016.html",
        note: "人口減少、高齢化、生活機能、地域公共交通との関係を確認する。",
      },
      {
        title: "立地適正化計画とコンパクト・プラス・ネットワーク",
        publisher: "国土交通省",
        url: "https://www.mlit.go.jp/en/toshi/city_plan/compactcity_network.html",
        note: "都市機能誘導、公共交通、持続可能な都市構造の制度背景を確認する。",
      },
    ],
  },
  {
    id: "food-loss",
    category: "暮らしと経済",
    title: "食品ロスを減らす値引きと寄付のしくみ",
    summary:
      "まだ食べられる食品が捨てられる一方で、値引き販売や寄付の仕組みも広がっています。買い物の選択を、環境、福祉、流通の制度から考えます。",
    readingTime: "7分",
    difficulty: "Starter",
    lastReviewedAt: "2026-04-29",
    leadQuestion: "安く買う、寄付する、捨てないを両立するには、どんな仕組みが必要？",
    backgroundSections: [
      {
        kind: "history",
        title: "豊かさの裏側にある廃棄",
        body:
          "食品の流通が便利になるほど、店頭には十分な量と見た目のよい商品が求められてきました。その結果、売れ残りや期限に近い食品が、まだ食べられる段階で捨てられることがあります。",
      },
      {
        kind: "system",
        title: "期限表示と販売の判断",
        body:
          "食品には安全に食べられる期限や、おいしく食べられる目安があります。店は品質、売場の信用、値引きのタイミング、在庫管理を見ながら、売るか、寄付するか、廃棄するかを判断します。",
      },
      {
        kind: "stakeholders",
        title: "関わる人の多さ",
        body:
          "消費者、スーパー、飲食店、食品メーカー、自治体、福祉団体が関わります。安く買いたい人、食品を必要とする人、廃棄コストを減らしたい店など、それぞれの事情があります。",
      },
      {
        kind: "debate",
        title: "値引きと寄付のバランス",
        body:
          "値引きは買いやすさを高めますが、寄付に回る食品が減る場合もあります。寄付は支援につながる一方、保管、配送、安全確認の負担を誰が担うかが課題になります。",
      },
    ],
    timeline: [
      { year: "2000年代", event: "食品リサイクルや廃棄削減が企業や自治体の課題として広がる。" },
      { year: "2010年代", event: "食品ロスという言葉が家庭、学校、店頭でも使われるようになる。" },
      { year: "2019年", event: "食品ロス削減推進法が施行され、国民運動としての削減が進む。" },
      { year: "現在", event: "値引き販売、食べきり運動、食品寄付など複数の取組が組み合わされている。" },
    ],
    glossary: [
      {
        term: "食品ロス",
        description: "まだ食べられるのに捨てられる食品のこと。",
      },
      {
        term: "フードバンク",
        description: "余った食品などを集め、必要とする人や団体へ届ける活動。",
      },
      {
        term: "賞味期限",
        description: "おいしく食べられる目安の期限。安全性を示す消費期限とは意味が異なる。",
      },
    ],
    quizItems: [
      {
        id: "food-loss-q1",
        question: "食品ロスの説明として近いものはどれ？",
        choices: [
          "まだ食べられるのに捨てられる食品",
          "必ず危険で食べられない食品",
          "海外から来た食品だけ",
          "料理のレシピそのもの",
        ],
        answerIndex: 0,
        explanation:
          "食品ロスは、まだ食べられる状態なのに捨てられてしまう食品を指します。家庭だけでなく、店や流通の仕組みとも関係します。",
      },
      {
        id: "food-loss-q2",
        question: "値引き販売と食品寄付を考えるときの論点は？",
        choices: [
          "保管や配送、安全確認を誰が担うか",
          "食品の色をすべて同じにすること",
          "天気予報を禁止すること",
          "学校の校歌を変えること",
        ],
        answerIndex: 0,
        explanation:
          "寄付は支援につながりますが、食品を安全に保管し、必要な場所へ届ける手間と費用をどう支えるかが重要です。",
      },
    ],
    thoughtPrompts,
    sourceNotes: [
      {
        title: "食品ロスについて知る・学ぶ",
        publisher: "消費者庁",
        url: "https://www.caa.go.jp/policies/policy/consumer_policy/information/food_loss/education/",
        note: "食品ロスの基本的な定義と削減が必要な理由を確認する。",
      },
      {
        title: "食品ロスの削減の推進に関する法律等",
        publisher: "消費者庁",
        url: "https://www.caa.go.jp/policies/policy/consumer_policy/information/food_loss/promote/",
        note: "食品ロス削減推進法と国・自治体・事業者・消費者の取組の制度背景を確認する。",
      },
      {
        title: "食品ロスポータルサイト 消費者向け情報",
        publisher: "環境省",
        url: "https://www.env.go.jp/recycle/foodloss/general.html",
        note: "消費者が主体的に取り組む食品ロス削減の考え方を確認する。",
      },
    ],
  },
  {
    id: "adult-contracts",
    category: "暮らしと法律",
    title: "18歳成人と契約トラブルの境界線",
    summary:
      "成年年齢が18歳になり、スマホ、部屋、クレジット、サービス契約を自分で選べる範囲が広がりました。自由と責任を、消費者トラブルの制度から考えます。",
    readingTime: "8分",
    difficulty: "Core",
    lastReviewedAt: "2026-04-29",
    leadQuestion: "18歳から自分で契約できる社会では、どんな支えと学びが必要？",
    backgroundSections: [
      {
        kind: "history",
        title: "20歳から18歳への転換",
        body:
          "日本の成年年齢は長く20歳でしたが、2022年4月から18歳に引き下げられました。若者が進学、就職、住まい、お金の使い方を自分で選ぶ場面が、以前より早く訪れるようになりました。",
      },
      {
        kind: "system",
        title: "契約できることと取消し",
        body:
          "成年になると、親の同意なしに有効な契約を結べます。一方で、未成年であることを理由に契約を取り消す仕組みは使えなくなるため、内容、支払い、解約条件を自分で確認する力が重要になります。",
      },
      {
        kind: "stakeholders",
        title: "SNS時代の勧誘",
        body:
          "若者のトラブルは、SNS広告や知り合った相手からの誘いをきっかけに起きることがあります。副業、投資、美容、定期購入などは、身近な関心と契約のリスクが重なりやすい分野です。",
      },
      {
        kind: "debate",
        title: "自己責任だけでよいのか",
        body:
          "契約の自由は大切ですが、経験の少ない人を狙う悪質な勧誘もあります。学校での消費者教育、相談窓口、事業者の説明責任をどう組み合わせるかが論点になります。",
      },
    ],
    timeline: [
      { year: "1896年", event: "民法制定時から成年年齢は20歳とされる。" },
      { year: "2018年", event: "成年年齢を18歳に引き下げる民法改正が成立する。" },
      { year: "2022年", event: "改正法が施行され、18歳で成年になる制度が始まる。" },
      { year: "現在", event: "SNSやオンライン契約を含め、若者向けの消費者教育と相談体制が重視される。" },
    ],
    glossary: [
      {
        term: "成年年齢",
        description: "一人で有効な契約をすることができ、親権に服さなくなる年齢。",
      },
      {
        term: "未成年者取消権",
        description: "未成年者が親の同意なしにした契約を、原則として取り消せる仕組み。",
      },
      {
        term: "消費生活相談",
        description: "商品やサービスの契約、表示、勧誘などのトラブルについて相談できる窓口。",
      },
    ],
    quizItems: [
      {
        id: "adult-contracts-q1",
        question: "18歳で成年になると変わることとして近いものは？",
        choices: [
          "親の同意なしに契約できる場面が増える",
          "すべての契約が無料になる",
          "SNS広告が法律で消える",
          "借金の返済義務がなくなる",
        ],
        answerIndex: 0,
        explanation:
          "成年になると、スマホ、住まい、クレジットなどの契約を自分で結べる場面が増えます。その分、契約内容を確認する責任も大きくなります。",
      },
      {
        id: "adult-contracts-q2",
        question: "SNSをきっかけにした契約トラブルで注意したいものは？",
        choices: [
          "副業や投資などのもうけ話",
          "学校の時間割だけ",
          "天気予報だけ",
          "図書館の開館時間だけ",
        ],
        answerIndex: 0,
        explanation:
          "消費者庁は、SNS上の広告や誘いをきっかけに、もうけ話や美容、定期購入などの相談が発生していることを示しています。",
      },
    ],
    thoughtPrompts,
    sourceNotes: [
      {
        title: "民法の一部を改正する法律（成年年齢関係）について",
        publisher: "法務省",
        url: "https://www.moj.go.jp/MINJI/minji07_00218.html",
        note: "成年年齢引下げの施行時期、制度の意味、社会参加との関係を確認する。",
      },
      {
        title: "民法（成年年齢関係）改正 Q&A",
        publisher: "法務省",
        url: "https://www.moj.go.jp/MINJI/minji07_00238.html",
        note: "18歳でできる契約、親の同意、未成年者取消しとの関係を確認する。",
      },
      {
        title: "若者の消費者トラブル",
        publisher: "消費者庁",
        url: "https://www.caa.go.jp/policies/policy/consumer_research/white_paper/2022/white_paper_138.html",
        note: "SNS関連の相談や、もうけ話に関する若者の消費者トラブルの傾向を確認する。",
      },
    ],
  },
  {
    id: "youth-voting",
    category: "地域と政治",
    title: "18歳選挙権と一票の使い方",
    summary:
      "選挙権年齢が18歳になり、高校生や大学生も政治の選択に参加できるようになりました。投票の制度、住民票、主権者教育を手がかりに、一票の意味を考えます。",
    readingTime: "8分",
    difficulty: "Core",
    lastReviewedAt: "2026-04-29",
    leadQuestion: "若い世代の一票は、社会のどんな決め方を変えられる？",
    backgroundSections: [
      {
        kind: "history",
        title: "18歳選挙権への流れ",
        body:
          "公職選挙法の改正により、選挙権年齢は20歳以上から18歳以上へ引き下げられました。若い世代の声を政治に反映し、社会の担い手として考える機会を早める狙いがあります。",
      },
      {
        kind: "system",
        title: "投票できる条件",
        body:
          "国政選挙では、満18歳以上の日本国民が選挙権を持ちます。実際に投票するには、選挙人名簿に登録される必要があり、進学や就職で引っ越したときは住民票の移動も関係します。",
      },
      {
        kind: "stakeholders",
        title: "若者と地域の課題",
        body:
          "授業料、奨学金、交通、住宅、アルバイト、子育て支援、気候対策など、若い世代にも関係する政策は多くあります。投票は自分の生活と制度をつなぐ入口になります。",
      },
      {
        kind: "debate",
        title: "政治的中立と学び",
        body:
          "学校で政治を学ぶときは、特定の立場を押しつけるのではなく、複数の資料を比べ、自分の考えをつくる力が大切です。主権者教育は投票先を教えることではなく、判断の土台を育てる学びです。",
      },
    ],
    timeline: [
      { year: "2015年", event: "選挙権年齢を18歳以上へ引き下げる公職選挙法改正が成立する。" },
      { year: "2016年", event: "18歳以上が国政選挙で投票できる制度が始まる。" },
      { year: "2020年代", event: "学校や自治体で主権者教育、模擬選挙、出前授業などが続く。" },
      { year: "現在", event: "SNSで政治情報に触れやすい一方、情報の見極めも重要になっている。" },
    ],
    glossary: [
      {
        term: "選挙権",
        description: "選挙で投票できる権利。国政選挙では満18歳以上の日本国民が持つ。",
      },
      {
        term: "選挙人名簿",
        description: "選挙で投票する人を登録する名簿。住民票のある市区町村で作成される。",
      },
      {
        term: "主権者教育",
        description: "社会の課題を自分ごととして考え、判断し、参加する力を育てる学び。",
      },
    ],
    quizItems: [
      {
        id: "youth-voting-q1",
        question: "国政選挙の選挙権年齢について正しいものは？",
        choices: [
          "満18歳以上の日本国民が選挙権を持つ",
          "満25歳以上だけが投票できる",
          "高校生は必ず投票できない",
          "SNSを使う人だけが投票できる",
        ],
        answerIndex: 0,
        explanation:
          "公職選挙法改正により、国政選挙では満18歳以上の日本国民が選挙権を持つようになりました。",
      },
      {
        id: "youth-voting-q2",
        question: "主権者教育の説明として近いものは？",
        choices: [
          "社会の課題を考え、自分なりに判断する力を育てる学び",
          "投票先を一つだけ暗記する授業",
          "政治の話をすべて禁止する仕組み",
          "選挙の日だけスマホを使うこと",
        ],
        answerIndex: 0,
        explanation:
          "主権者教育は、特定の意見を押しつけることではなく、複数の情報から考え、社会に参加する力を育てることを目指します。",
      },
    ],
    thoughtPrompts,
    sourceNotes: [
      {
        title: "主権者教育の推進に関する検討チーム 中間まとめ",
        publisher: "文部科学省",
        url: "https://www.mext.go.jp/a_menu/sports/ikusei/1369157.htm",
        note: "18歳選挙権と、社会の課題を多面的に考える力の位置づけを確認する。",
      },
      {
        title: "選挙 Q&A（選挙権）",
        publisher: "東京都選挙管理委員会",
        url: "https://www.senkyo.metro.tokyo.lg.jp/qa/qa-senkyoken",
        note: "選挙権年齢、国政選挙と地方選挙の条件、被選挙権年齢を確認する。",
      },
      {
        title: "選挙権年齢の引下げ",
        publisher: "北海道選挙管理委員会",
        url: "https://www.pref.hokkaido.lg.jp/hs/18saisenkyoken.html",
        note: "18歳選挙権の施行時期、選挙人名簿、住民票移動との関係を確認する。",
      },
    ],
  },
  {
    id: "disaster-evacuation",
    category: "防災と情報",
    title: "防災情報と避難判断の読み解き方",
    summary:
      "大雨や洪水の情報は、警戒レベル、キキクル、ハザードマップなど複数の形で届きます。公的情報を事前に確認し、避難判断の材料を読み解く練習をします。",
    readingTime: "8分",
    difficulty: "Core",
    lastReviewedAt: "2026-04-30",
    leadQuestion: "避難の判断は、行政からの指示と自分の確認をどう組み合わせるべき？",
    backgroundSections: [
      {
        kind: "history",
        title: "経験だけに頼れない災害",
        body:
          "大雨や台風では、過去に被害がなかった場所でも地形、雨の降り方、川の水位によって危険が高まります。昔からの経験に加えて、今出ている情報を読み取る力が必要です。",
      },
      {
        kind: "system",
        title: "警戒レベルと避難情報",
        body:
          "自治体は高齢者等避難や避難指示などの避難情報を出します。気象庁などの防災気象情報は、それより前に危険の高まりを知らせることがあり、警戒レベルと合わせて判断材料になります。",
      },
      {
        kind: "stakeholders",
        title: "動きにくい人をどう支えるか",
        body:
          "高齢者、障害のある人、乳幼児のいる家庭、外国語が得意でない人、夜間に一人でいる人は、同じ情報を受け取っても避難の難しさが違います。地域の声かけや事前準備も重要です。",
      },
      {
        kind: "debate",
        title: "空振りと見逃しのバランス",
        body:
          "避難して結果的に大きな被害が出ないこともあります。しかし判断を遅らせると安全な移動が難しくなります。社会全体で、早めに動くことを失敗ではなく備えとして受け止められるかが問われます。",
      },
    ],
    timeline: [
      { year: "2007年", event: "国土交通省のハザードマップポータルサイトの運用が始まる。" },
      { year: "2019年", event: "避難情報と防災気象情報を5段階の警戒レベルで伝える運用が広がる。" },
      { year: "2021年", event: "避難勧告が廃止され、警戒レベル4は避難指示に一本化される。" },
      { year: "2022年", event: "キキクルの危険度表示に災害切迫を示す黒が加わる。" },
      { year: "現在", event: "自治体情報、気象情報、ハザードマップを組み合わせた事前確認が重視される。" },
    ],
    glossary: [
      {
        term: "警戒レベル",
        description: "避難行動を直感的に理解しやすくするため、防災情報を5段階で整理したもの。",
      },
      {
        term: "キキクル",
        description: "土砂災害、浸水害、洪水の危険度の高まりを地図上で確認できる気象庁の情報。",
      },
      {
        term: "ハザードマップ",
        description: "洪水、土砂災害、津波などの危険が想定される場所や避難先を確認するための地図。",
      },
    ],
    quizItems: [
      {
        id: "disaster-evacuation-q1",
        question: "防災気象情報と避難情報の関係として近いものは？",
        choices: [
          "防災気象情報は、避難指示より前に危険の高まりを知らせることがある",
          "防災気象情報は旅行の感想だけを伝える",
          "避難情報が出るまで地図や水位は見てはいけない",
          "警戒レベルは学校の成績を表す",
        ],
        answerIndex: 0,
        explanation:
          "大雨や洪水の危険は、自治体の避難情報だけでなく、防災気象情報、キキクル、河川水位などから早めに確認できます。",
      },
      {
        id: "disaster-evacuation-q2",
        question: "ハザードマップを使う目的として近いものは？",
        choices: [
          "自分のいる場所の災害リスクや避難先を事前に確認する",
          "天気を必ず晴れに変える",
          "避難を一切しなくてよい証明にする",
          "ニュース記事を自動で書く",
        ],
        answerIndex: 0,
        explanation:
          "ハザードマップは、洪水や土砂災害などのリスクが想定される場所、避難場所、避難経路を事前に考える材料になります。",
      },
    ],
    thoughtPrompts,
    sourceNotes: [
      {
        title: "避難情報の判断・伝達",
        publisher: "内閣府",
        url: "https://www.bousai.go.jp/oukyu/hinankankoku/index.html",
        note: "避難情報に関するガイドラインと、市町村が避難情報を判断・伝達する制度背景を確認する。",
      },
      {
        title: "防災気象情報と警戒レベルとの対応について",
        publisher: "気象庁",
        url: "https://www.jma.go.jp/jma/kishou/know/bosai/alertlevel.html",
        note: "警戒レベル、防災気象情報、避難判断の関係を確認する。",
      },
      {
        title: "キキクル（警報の危険度分布）",
        publisher: "気象庁",
        url: "https://www.jma.go.jp/jma/kishou/know/bosai/riskmap.html",
        note: "土砂災害、浸水害、洪水の危険度分布と色分けの考え方を確認する。",
      },
      {
        title: "ハザードマップポータルサイト",
        publisher: "国土交通省",
        url: "https://disaportal.gsi.go.jp/hazardmap/portal.html",
        note: "災害リスク情報を地図で確認する入口として参照する。",
      },
    ],
  },
  {
    id: "minimum-wage-part-time",
    category: "働くことと制度",
    title: "最低賃金とアルバイトのルール",
    summary:
      "アルバイトの時給、シフト、休憩、残業代は、個人の交渉だけでなく労働条件のルールとつながっています。働く前に確認したい制度を学びます。",
    readingTime: "8分",
    difficulty: "Starter",
    lastReviewedAt: "2026-05-01",
    leadQuestion: "働く人を守るルールは、自由な働き方とどう両立できる？",
    backgroundSections: [
      {
        kind: "history",
        title: "働くルールが必要になった理由",
        body:
          "働く人と雇う側では、情報や立場の強さに差が出やすいことがあります。賃金、労働時間、安全、退職などの基本ルールは、働く人が不利になりすぎないように整えられてきました。",
      },
      {
        kind: "system",
        title: "最低賃金と労働条件",
        body:
          "最低賃金制度では、地域や産業ごとに賃金の下限が決められます。アルバイトでも、働く期間、場所、時間、休日、時給、辞めるときのきまりなど、重要な条件を確認することが大切です。",
      },
      {
        kind: "stakeholders",
        title: "学生、店、地域経済",
        body:
          "学生や若者にとってアルバイトは収入と経験の場です。店や企業にとっては人手を支える仕組みでもあります。最低賃金の引上げは生活を支える一方、事業者の人件費や価格にも影響します。",
      },
      {
        kind: "debate",
        title: "守るルールと働きやすさ",
        body:
          "厳しすぎるルールは柔軟な働き方を難しくすることがありますが、ルールが弱いと未払い、長時間労働、急な解雇などのトラブルが起きやすくなります。どこで線を引くかが論点です。",
      },
    ],
    timeline: [
      { year: "1959年", event: "最低賃金法が制定され、賃金の下限を定める制度が整えられる。" },
      { year: "2000年代", event: "パートやアルバイトを含む多様な働き方が生活や地域経済を支えるようになる。" },
      { year: "2010年代", event: "若者向けに、アルバイトの労働条件を確認する啓発が強化される。" },
      { year: "現在", event: "物価、賃金、人手不足を背景に、最低賃金と働き方の議論が続いている。" },
    ],
    glossary: [
      {
        term: "最低賃金",
        description: "法律に基づいて定められる賃金の最低限度。使用者は原則としてその額以上を支払う必要がある。",
      },
      {
        term: "労働条件",
        description: "仕事の内容、場所、時間、休日、賃金、契約期間、辞めるときのきまりなど、働く前に確認する条件。",
      },
      {
        term: "割増賃金",
        description: "時間外労働や深夜労働など、一定の場合に通常の賃金に上乗せして支払われる賃金。",
      },
    ],
    quizItems: [
      {
        id: "minimum-wage-q1",
        question: "最低賃金制度の説明として近いものは？",
        choices: [
          "賃金の最低限度を定め、使用者にその額以上の支払いを求める制度",
          "すべての仕事の時給を全国で同じにする制度",
          "アルバイトだけを禁止する制度",
          "給料日を毎日変える制度",
        ],
        answerIndex: 0,
        explanation:
          "最低賃金制度は、法律に基づいて賃金の最低限度を定める仕組みです。地域別最低賃金は、都道府県内の多くの労働者に関係します。",
      },
      {
        id: "minimum-wage-q2",
        question: "アルバイトを始める前に確認したいものは？",
        choices: [
          "仕事内容、働く時間、休日、時給などの労働条件",
          "店の看板の色だけ",
          "友達の好きな音楽だけ",
          "天気予報の言い方だけ",
        ],
        answerIndex: 0,
        explanation:
          "後で聞いた話と違って困らないよう、仕事内容、働く場所、時間、休日、時給、辞めるときのきまりなどを確認することが重要です。",
      },
    ],
    thoughtPrompts,
    sourceNotes: [
      {
        title: "最低賃金制度の概要",
        publisher: "厚生労働省",
        url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/chingin/newpage_43875.html",
        note: "最低賃金制度の目的、種類、適用範囲を確認する。",
      },
      {
        title: "最低賃金制度とは",
        publisher: "厚生労働省",
        url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/chingin/newpage_43880.html",
        note: "最低賃金額未満の賃金を定めた場合の考え方と制度の基本を確認する。",
      },
      {
        title: "アルバイトをする前に知っておきたいポイント",
        publisher: "厚生労働省",
        url: "https://www.check-roudou.mhlw.go.jp/parttime/",
        note: "アルバイトの労働条件、賃金、残業、相談先などの基本ポイントを確認する。",
      },
      {
        title: "確かめようアルバイトの労働条件",
        publisher: "厚生労働省",
        url: "https://www.check-roudou.mhlw.go.jp/lp/arubaito/",
        note: "若者向けに、労働条件確認やトラブル時の相談先を確認する。",
      },
    ],
  },
];
