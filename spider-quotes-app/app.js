/*
  app.js
  ---------------------------------------------------------
  화면에 실제로 명언을 그려주고, 버튼 클릭에 반응하는 코드입니다.
  data.js 에서 만든 quotesData 배열을 사용합니다.

  이 파일은 위에서 아래로 읽으면 흐름이 이해되도록
  "1. 화면 요소 찾기 → 2. 상태값 → 3. 기능 함수 → 4. 이벤트 연결 →
   5. 앱 시작" 순서로 구성했습니다.
---------------------------------------------------------- */

/* -----------------------------------------
   1. 자주 사용할 화면 요소(DOM)를 미리 찾아둡니다.
------------------------------------------ */
const quoteContainer = document.getElementById("quote-container");
const quoteEnEl = document.getElementById("quote-en");
const quoteKoEl = document.getElementById("quote-ko");
const quoteSpeakerEl = document.getElementById("quote-speaker");
const quoteMovieEl = document.getElementById("quote-movie");
const quoteThemeBadgeEl = document.getElementById("quote-theme");

const btnShuffle = document.getElementById("btn-shuffle");
const btnTheme = document.getElementById("btn-theme");
const btnShare = document.getElementById("btn-share");

const themeModal = document.getElementById("theme-modal");
const themeBackdrop = document.getElementById("theme-backdrop");
const themeOptions = document.querySelectorAll(".theme-option");

const toastEl = document.getElementById("toast");

/* -----------------------------------------
   2. 앱이 기억해야 하는 상태값
------------------------------------------ */
// 화면에 지금 표시 중인 명언의 id (같은 명언이 연속으로 나오지 않게 하는 용도)
let currentQuoteId = null;

// 테마는 localStorage에 저장해서, 새로고침해도 마지막에 고른 테마가 유지되게 합니다.
const THEME_STORAGE_KEY = "spider-quotes-theme";

/* -----------------------------------------
   3. 기능 함수들
------------------------------------------ */

/**
 * quotesData 중에서 하나를 무작위로 고릅니다.
 * excludeId 와 같은 id는 (가능하면) 피해서, 같은 명언이 연속으로
 * 나오는 것을 줄여줍니다.
 */
function pickRandomQuote(excludeId) {
  if (quotesData.length === 1) return quotesData[0];

  let next = quotesData[Math.floor(Math.random() * quotesData.length)];

  // 방금 본 명언과 같으면 한 번만 다시 뽑아봅니다.
  if (next.id === excludeId) {
    next = quotesData[Math.floor(Math.random() * quotesData.length)];
  }
  return next;
}

/**
 * 전달받은 quote 객체 내용을 화면 요소에 채워 넣습니다.
 */
function renderQuote(quote) {
  quoteEnEl.textContent = quote.quote_en;
  quoteKoEl.textContent = quote.quote_ko;
  quoteSpeakerEl.textContent = `— ${quote.speaker}`;
  quoteMovieEl.textContent = quote.movie;
  quoteThemeBadgeEl.textContent = `#${quote.theme}`;

  currentQuoteId = quote.id;
}

/**
 * 부드러운 페이드 애니메이션과 함께 새 명언으로 교체합니다. (F-01)
 * 흐름: 카드를 살짝 투명하게(is-fading) → 내용 교체 → 다시 선명하게
 */
function showNewQuote() {
  quoteContainer.classList.add("is-fading");

  // CSS transition 시간(0.35s)과 맞춰 내용을 바꿔줍니다.
  setTimeout(() => {
    const nextQuote = pickRandomQuote(currentQuoteId);
    renderQuote(nextQuote);
    quoteContainer.classList.remove("is-fading");
  }, 350);
}

/**
 * 테마 선택 바텀시트를 엽니다. (F-02)
 */
function openThemeModal() {
  themeModal.hidden = false;
  markActiveThemeOption(document.body.dataset.theme);
}

/**
 * 테마 선택 바텀시트를 닫습니다.
 */
function closeThemeModal() {
  themeModal.hidden = true;
}

/**
 * 선택된 테마를 실제로 적용합니다.
 * body의 data-theme 속성만 바꾸면, style.css의 [data-theme="..."]
 * 규칙이 알아서 배경/글자색/카드색(CSS 변수)을 바꿔줍니다.
 */
function applyTheme(themeValue) {
  document.body.dataset.theme = themeValue;
  localStorage.setItem(THEME_STORAGE_KEY, themeValue);
  markActiveThemeOption(themeValue);
}

/**
 * 바텀시트 안에서 현재 선택된 테마 버튼에 is-active 표시를 해줍니다.
 */
function markActiveThemeOption(themeValue) {
  themeOptions.forEach((option) => {
    const isActive = option.dataset.themeValue === themeValue;
    option.classList.toggle("is-active", isActive);
  });
}

/**
 * 페이지를 처음 열었을 때, 저장되어 있던 테마가 있으면 불러옵니다.
 * 없으면 index.html에 기본으로 적혀 있는 "sunset" 테마를 그대로 씁니다.
 */
function restoreSavedTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved) {
    document.body.dataset.theme = saved;
  }
  markActiveThemeOption(document.body.dataset.theme);
}

/**
 * 화면 하단에 짧은 안내 메시지를 잠깐 보여줍니다.
 */
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 1800);
}

/**
 * 현재 보이는 명언을 텍스트로 만들어 반환합니다. (복사/공유 공통으로 사용)
 */
function getCurrentQuoteText() {
  const quote = quotesData.find((q) => q.id === currentQuoteId);
  if (!quote) return "";

  return `"${quote.quote_en}"\n"${quote.quote_ko}"\n— ${quote.speaker}, ${quote.movie}`;
}

/**
 * 공유 버튼 클릭 처리. (F-03)
 * 모바일 등에서 Web Share API(navigator.share)를 지원하면 공유 시트를 띄우고,
 * 지원하지 않는 브라우저(대부분의 데스크톱)에서는 클립보드 복사로 대체합니다.
 */
async function handleShare() {
  const text = getCurrentQuoteText();
  if (!text) return;

  if (navigator.share) {
    try {
      await navigator.share({ text, title: "Spider-Quotes" });
    } catch (error) {
      // 사용자가 공유를 취소한 경우(AbortError)는 조용히 무시합니다.
      if (error.name !== "AbortError") {
        console.error("공유에 실패했어요:", error);
      }
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("클립보드에 복사했어요 ✅");
  } catch (error) {
    console.error("복사에 실패했어요:", error);
    showToast("복사에 실패했어요 😢");
  }
}

/* -----------------------------------------
   4. 버튼/이벤트 연결
------------------------------------------ */
btnShuffle.addEventListener("click", showNewQuote);
btnTheme.addEventListener("click", openThemeModal);
btnShare.addEventListener("click", handleShare);

// 바텀시트 바깥(어두운 배경) 클릭 시 모달 닫기
themeBackdrop.addEventListener("click", closeThemeModal);

// 각 테마 스와치 버튼 클릭 시 테마 적용
themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyTheme(option.dataset.themeValue);
  });
});

// 키보드 Esc 로도 바텀시트를 닫을 수 있게 합니다.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !themeModal.hidden) {
    closeThemeModal();
  }
});

/* -----------------------------------------
   5. 앱 시작: 저장된 테마 복원 + 첫 명언 렌더링
------------------------------------------ */
restoreSavedTheme();
renderQuote(pickRandomQuote());
