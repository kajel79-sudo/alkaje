/*
  data.js
  ---------------------------------------------------------
  스파이더맨(Spider-Man) 명언 데이터 모음입니다.
  app.js 에서 이 배열(quotesData)을 그대로 가져다 쓰기 때문에,
  <script> 태그 순서상 반드시 app.js 보다 "먼저" 불러와야 합니다.
  (index.html 에서 data.js → i18n.js → app.js 순서로 되어 있는 이유)

  각 명언 객체는 아래 6개의 값을 가집니다.
  - id       : 명언을 구분하는 고유 번호
  - quote_en : 영어 원문 대사 (항상 카드 상단 메인 문장으로 표시)
  - quote_ko : 한글 번역 (언어가 한국어일 때 부제로 표시)
  - quote_ja : 일본어 번역 (언어가 일본어일 때 부제로 표시)
  - speaker  : 대사를 말한 캐릭터
  - movie    : 대사가 나온 작품
  - theme    : 대사가 담고 있는 주제(태그) - 화면 배경 테마와는 다른 개념!
               한국어 키로 저장되며, i18n.js의 themeTagTranslations를
               통해 영어/일본어로 변환되어 표시됩니다.
---------------------------------------------------------- */

const quotesData = [
  {
    id: 1,
    quote_en: "With great power comes great responsibility.",
    quote_ko: "큰 힘에는 큰 책임이 따른다.",
    quote_ja: "大いなる力には、大いなる責任が伴う。",
    speaker: "Uncle Ben",
    movie: "Spider-Man (2002)",
    theme: "책임감",
  },
  {
    id: 2,
    quote_en: "I'm just your friendly neighborhood Spider-Man.",
    quote_ko: "난 그냥 이웃의 친절한 스파이더맨일 뿐이야.",
    quote_ja: "僕はただの、気さくな近所のスパイダーマンさ。",
    speaker: "Peter Parker",
    movie: "Spider-Man (2002)",
    theme: "정체성",
  },
  {
    id: 3,
    quote_en: "It's a leap of faith. That's all it is, Peter.",
    quote_ko: "그건 믿음의 도약이야. 그게 전부야, 피터.",
    quote_ja: "それは信頼の飛躍よ。それだけのことなの、ピーター。",
    speaker: "Aunt May",
    movie: "Spider-Man: Homecoming (2017)",
    theme: "도전",
  },
  {
    id: 4,
    quote_en: "Anyone can wear the mask.",
    quote_ko: "누구나 그 가면을 쓸 수 있어.",
    quote_ja: "誰だってあのマスクをかぶれる。",
    speaker: "Miles Morales",
    movie: "Spider-Man: Into the Spider-Verse (2018)",
    theme: "희망",
  },
  {
    id: 5,
    quote_en: "You could be a hero, a real hero. You just have to make that choice.",
    quote_ko: "넌 진짜 영웅이 될 수 있어. 그저 그 선택을 하기만 하면 돼.",
    quote_ja: "お前は本物のヒーローになれる。あとはその選択をするだけだ。",
    speaker: "Aaron Davis",
    movie: "Spider-Man: Into the Spider-Verse (2018)",
    theme: "선택",
  },
  {
    id: 6,
    quote_en: "That's what heroes do.",
    quote_ko: "영웅은 그런 일을 하는 거야.",
    quote_ja: "それがヒーローのすることだ。",
    speaker: "Peter Parker",
    movie: "Spider-Man 2 (2004)",
    theme: "희생",
  },
  {
    id: 7,
    quote_en:
      "Whatever life holds in store for me, I will never forget these words: 'With great power comes great responsibility.'",
    quote_ko:
      "삶이 내게 무엇을 가져다주든, 나는 이 말을 절대 잊지 않을 거야. '큰 힘에는 큰 책임이 따른다.'",
    quote_ja:
      "これからの人生に何が待ち受けていようと、この言葉だけは決して忘れない。「大いなる力には、大いなる責任が伴う」と。",
    speaker: "Peter Parker",
    movie: "Spider-Man (2002)",
    theme: "책임감",
  },
  {
    id: 8,
    quote_en: "I web-shot my way outta there. It was awesome.",
    quote_ko: "거미줄 쏘고 탈출했지. 완전 멋졌어.",
    quote_ja: "糸を撃ってそこから抜け出したんだ。最高だったよ。",
    speaker: "Miles Morales",
    movie: "Spider-Man: Into the Spider-Verse (2018)",
    theme: "유머",
  },
  {
    id: 9,
    quote_en:
      "Being Spider-Man is a great responsibility, but... it's also a great life.",
    quote_ko: "스파이더맨이 되는 건 큰 책임이지만... 동시에 멋진 삶이기도 해.",
    quote_ja: "スパイダーマンでいることは大きな責任だ。でも……素晴らしい人生でもある。",
    speaker: "Peter Parker",
    movie: "The Amazing Spider-Man 2 (2014)",
    theme: "삶",
  },
  {
    id: 10,
    quote_en: "That's why you deserve it.",
    quote_ko: "그래서 네가 자격이 있는 거야.",
    quote_ja: "だからこそ、君にはその資格があるんだ。",
    speaker: "Tony Stark",
    movie: "Spider-Man: Homecoming (2017)",
    theme: "성장",
  },
  {
    id: 11,
    quote_en:
      "Everybody fails at who they're supposed to be. The choice is to define who you are.",
    quote_ko:
      "누구나 되어야 할 사람이 되는 데 실패해. 선택은 네가 누구인지 스스로 정의하는 거야.",
    quote_ja:
      "誰もが「あるべき自分」になることに失敗する。大事なのは、自分が何者かを自分で決めることだ。",
    speaker: "Jefferson Davis",
    movie: "Spider-Man: Into the Spider-Verse (2018)",
    theme: "정체성",
  },
  {
    id: 12,
    quote_en: "You can't stop, ever. That's the point. That's the promise I made.",
    quote_ko: "절대 멈출 수 없어. 그게 핵심이야. 그게 내가 한 약속이야.",
    quote_ja: "絶対に止まってはいけない。それが肝心なんだ。それが僕が交わした約束だから。",
    speaker: "Peter Parker",
    movie: "Spider-Man 2 (2004)",
    theme: "헌신",
  },
  {
    id: 13,
    quote_en:
      "Sometimes to do what's right, we have to be steady, and give up the things we want the most.",
    quote_ko:
      "때로는 옳은 일을 하기 위해, 우리는 침착해야 하고 가장 원하는 것을 포기해야 해.",
    quote_ja:
      "時には正しいことをするために、心を強く持ち、一番望むものを諦めなければならない。",
    speaker: "Peter Parker",
    movie: "Spider-Man 3 (2007)",
    theme: "희생",
  },
  {
    id: 14,
    quote_en:
      "I believe there's a hero in all of us, that keeps us honest, gives us strength.",
    quote_ko: "나는 우리 모두 안에 영웅이 있다고 믿어. 그게 우릴 정직하게, 강하게 만들어.",
    quote_ja: "誰の中にもヒーローがいると信じているわ。それが私たちを正直にし、力を与えてくれる。",
    speaker: "Aunt May",
    movie: "Spider-Man 2 (2004)",
    theme: "희망",
  },
  {
    id: 15,
    quote_en: "Spider-Man's not perfect. He's late sometimes. He could listen better.",
    quote_ko: "스파이더맨은 완벽하지 않아. 가끔 늦기도 하고, 더 잘 들을 수도 있었지.",
    quote_ja: "スパイダーマンは完璧じゃない。時々遅刻するし、もっと人の話を聞くべきだ。",
    speaker: "Miles Morales",
    movie: "Spider-Man: Into the Spider-Verse (2018)",
    theme: "겸손",
  },
  {
    id: 16,
    quote_en:
      "When you can do the things that I can, but you don't, and then the bad things happen, they happen because of you.",
    quote_ko:
      "네가 할 수 있는 일을 하지 않아서 나쁜 일이 생긴다면, 그건 너 때문에 벌어진 거야.",
    quote_ja:
      "自分にできることをしないでいると、悪いことが起きたとき、それは君のせいで起きたことになる。",
    speaker: "Uncle Ben",
    movie: "The Amazing Spider-Man (2012)",
    theme: "책임감",
  },
  {
    id: 17,
    quote_en: "I'm gonna miss it. But I'm ready.",
    quote_ko: "그리울 거야. 하지만 난 준비됐어.",
    quote_ja: "寂しくなるだろうな。でも、僕はもう準備できてる。",
    speaker: "Peter Parker",
    movie: "Spider-Man: No Way Home (2021)",
    theme: "성장",
  },
  {
    id: 18,
    quote_en: "You're not the only one that got bit, kid.",
    quote_ko: "물린 게 너 하나만이 아니야, 꼬마야.",
    quote_ja: "噛まれたのはお前だけじゃないんだぜ、坊主。",
    speaker: "Miguel O'Hara",
    movie: "Spider-Man: Across the Spider-Verse (2023)",
    theme: "연대",
  },
  {
    id: 19,
    quote_en:
      "This is why I never had a normal life. Because a piece of it was always missing.",
    quote_ko: "이게 내가 평범한 삶을 살 수 없었던 이유야. 항상 뭔가 빠져 있었거든.",
    quote_ja: "だから僕は普通の人生を送れなかったんだ。いつも何かが欠けていたから。",
    speaker: "Peter Parker",
    movie: "Spider-Man 3 (2007)",
    theme: "성찰",
  },
  {
    id: 20,
    quote_en: "Great power, great responsibility. That's all I got, that's all I need.",
    quote_ko: "큰 힘엔 큰 책임. 그게 내가 가진 전부고, 필요한 전부야.",
    quote_ja: "大いなる力、大いなる責任。それが僕の持ってるすべてで、必要なすべてだ。",
    speaker: "Miles Morales",
    movie: "Spider-Man: Into the Spider-Verse (2018)",
    theme: "책임감",
  },
];
