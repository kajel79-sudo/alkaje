/*
  i18n.js
  ---------------------------------------------------------
  다국어(한국어/영어/일본어) 지원을 위한 번역 사전 파일입니다.
  data.js 다음, app.js 이전에 불러와야 합니다.

  이 파일은 두 가지 사전을 내보냅니다(전역 변수로 선언).

  1) uiStrings
     버튼 라벨, 모달 제목, 토스트 메시지 등 "화면에 고정으로 박혀있는
     문구"들의 번역입니다. app.js의 applyTranslations() 함수가
     HTML 요소의 data-i18n / data-i18n-aria 속성을 읽어서
     이 사전 값으로 자동으로 바꿔치기합니다.

  2) themeTagTranslations
     data.js의 quote.theme 값(예: "책임감")은 한국어로만 저장되어
     있습니다. 화면에 표시할 때 이 사전을 참고해서 영어/일본어로
     바꿔줍니다. (theme 값 자체를 언어별로 3개씩 들고 있지 않기
     위한 선택 - 데이터 중복을 줄이기 위함입니다.)
---------------------------------------------------------- */

const uiStrings = {
  ko: {
    shuffleLabel: "새 명언",
    shuffleAria: "새 명언 보기",
    themeLabel: "테마",
    themeAria: "테마 변경",
    shareLabel: "공유",
    shareAria: "명언 공유하기",
    langLabel: "언어",
    langAria: "언어 변경",
    themeModalTitle: "배경 테마 선택",
    langModalTitle: "언어 선택",
    themeSunset: "선셋 그라데이션",
    themeNight: "나이트 모드",
    themeOcean: "오션 블루",
    themeForest: "포레스트 그린",
    themeMono: "미니멀 모노",
    toastCopied: "클립보드에 복사했어요 ✅",
    toastCopyFailed: "복사에 실패했어요 😢",
  },
  en: {
    shuffleLabel: "New Quote",
    shuffleAria: "Show a new quote",
    themeLabel: "Theme",
    themeAria: "Change theme",
    shareLabel: "Share",
    shareAria: "Share this quote",
    langLabel: "Language",
    langAria: "Change language",
    themeModalTitle: "Choose Background Theme",
    langModalTitle: "Choose Language",
    themeSunset: "Sunset Gradient",
    themeNight: "Night Mode",
    themeOcean: "Ocean Blue",
    themeForest: "Forest Green",
    themeMono: "Minimal Mono",
    toastCopied: "Copied to clipboard ✅",
    toastCopyFailed: "Failed to copy 😢",
  },
  ja: {
    shuffleLabel: "新しい名言",
    shuffleAria: "新しい名言を表示",
    themeLabel: "テーマ",
    themeAria: "テーマを変更",
    shareLabel: "共有",
    shareAria: "この名言を共有",
    langLabel: "言語",
    langAria: "言語を変更",
    themeModalTitle: "背景テーマを選択",
    langModalTitle: "言語を選択",
    themeSunset: "サンセットグラデーション",
    themeNight: "ナイトモード",
    themeOcean: "オーシャンブルー",
    themeForest: "フォレストグリーン",
    themeMono: "ミニマルモノ",
    toastCopied: "クリップボードにコピーしました ✅",
    toastCopyFailed: "コピーに失敗しました 😢",
  },
};

const themeTagTranslations = {
  책임감: { en: "Responsibility", ja: "責任" },
  정체성: { en: "Identity", ja: "アイデンティティ" },
  도전: { en: "Courage", ja: "挑戦" },
  희망: { en: "Hope", ja: "希望" },
  선택: { en: "Choice", ja: "選択" },
  희생: { en: "Sacrifice", ja: "犠牲" },
  유머: { en: "Humor", ja: "ユーモア" },
  삶: { en: "Life", ja: "人生" },
  성장: { en: "Growth", ja: "成長" },
  헌신: { en: "Dedication", ja: "献身" },
  겸손: { en: "Humility", ja: "謙虚" },
  연대: { en: "Solidarity", ja: "連帯" },
  성찰: { en: "Reflection", ja: "内省" },
};
