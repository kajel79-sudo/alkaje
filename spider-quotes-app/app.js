/*
  app.js
  ---------------------------------------------------------
  화면에 실제로 명언을 그려주고, 버튼 클릭에 반응하는 코드입니다.
  data.js 에서 만든 quotesData 배열과, i18n.js 에서 만든 번역
  사전(uiStrings, themeTagTranslations)을 사용합니다.

  이 파일은 위에서 아래로 읽으면 흐름이 이해되도록
  "1. 화면 요소 찾기 → 2. 상태값 → 3. 기능 함수 → 4. 이벤트 연결 →
   5. 앱 시작" 순서로 구성했습니다.
---------------------------------------------------------- */

/* -----------------------------------------
   1. 자주 사용할 화면 요소(DOM)를 미리 찾아둡니다.
------------------------------------------ */
const quoteContainer = document.getElementById("quote-container");
const quoteEnEl = document.getElementById("quote-en");
const quoteSubEl = document.getElementById("quote-sub");
const quoteSpeakerEl = document.getElementById("quote-speaker");
const quoteMovieEl = document.getElementById("quote-movie");
const quoteThemeBadgeEl = document.getElementById("quote-theme");

const btnShuffle = document.getElementById("btn-shuffle");
const btnTheme = document.getElementById("btn-theme");
const btnLang = document.getElementById("btn-lang");
const btnShare = document.getElementById("btn-share");

const themeModal = document.getElementById("theme-modal");
const themeBackdrop = document.getElementById("theme-backdrop");
const themeOptions = document.querySelectorAll(".theme-option");

const langModal = document.getElementById("lang-modal");
const langBackdrop = document.getElementById("lang-backdrop");
const langOptions = document.querySelectorAll(".lang-option");

const toastEl = document.getElementById("toast");

/* -----------------------------------------
   2. 앱이 기억해야 하는 상태값
------------------------------------------ */
// 화면에 지금 표시 중인 명언의 id (같은 명언이 연속으로 나오지 않게 하는 용도)
let currentQuoteId = null;

// 현재 UI 언어. "ko" | "en" | "ja" 중 하나이며, localStorage에 저장되어
// 새로고침해도 유지됩니다.
let currentLang = "ko";

const THEME_STORAGE_KEY = "spider-quotes-theme";
const LANG_STORAGE_KEY = "spider-quotes-lang";
const SUPPORTED_LANGS = ["ko", "en", "ja"];

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
 * 현재 언어(currentLang)에 맞는 번역문을 반환합니다.
 * 영어를 선택했을 때는 quote-en과 내용이 겹치므로 빈 문자열을 돌려주고,
 * 화면에서는 CSS(:empty)로 알아서 숨겨집니다.
 */
function getSubtitleText(quote) {
  if (currentLang === "ko") return quote.quote_ko;
  if (currentLang === "ja") return quote.quote_ja;
  return "";
}

/**
 * quote.theme(한국어 태그)를 현재 언어에 맞게 번역합니다.
 * 번역이 없으면(사전에 없는 값) 원래 한국어 값을 그대로 보여줍니다.
 */
function getThemeTagText(themeKo) {
  if (currentLang === "ko") return themeKo;
  const translated = themeTagTranslations[themeKo];
  return translated ? translated[currentLang] : themeKo;
}

/**
 * 전달받은 quote 객체 내용을 화면 요소에 채워 넣습니다.
 */
function renderQuote(quote) {
  quoteEnEl.textContent = quote.quote_en;
  quoteSubEl.textContent = getSubtitleText(quote);
  quoteSpeakerEl.textContent = `— ${quote.speaker}`;
  quoteMovieEl.textContent = quote.movie;
  quoteThemeBadgeEl.textContent = `#${getThemeTagText(quote.theme)}`;

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
 * 바텀시트(모달) 하나를 엽니다. 테마 시트와 언어 시트가 이 함수를
 * 공통으로 사용합니다.
 */
function openSheet(modalEl) {
  modalEl.hidden = false;
}

/**
 * 바텀시트(모달) 하나를 닫습니다.
 */
function closeSheet(modalEl) {
  modalEl.hidden = true;
}

/**
 * 현재 열려 있는 바텀시트가 있으면 닫습니다. (Esc 키 처리용)
 */
function closeAnyOpenSheet() {
  if (!themeModal.hidden) closeSheet(themeModal);
  if (!langModal.hidden) closeSheet(langModal);
}

/**
 * 선택된 테마를 실제로 적용합니다. (F-02)
 * body의 data-theme 속성만 바꾸면, style.css의 [data-theme="..."]
 * 규칙이 알아서 배경/글자색/카드색(CSS 변수)을 바꿔줍니다.
 */
function applyTheme(themeValue) {
  document.body.dataset.theme = themeValue;
  localStorage.setItem(THEME_STORAGE_KEY, themeValue);
  markActiveOption(themeOptions, "themeValue", themeValue);
}

/**
 * 선택된 언어를 실제로 적용합니다.
 * - html lang 속성 갱신 (접근성/SEO)
 * - data-i18n / data-i18n-aria 속성이 붙은 모든 요소의 문구 갱신
 * - 지금 보이고 있는 명언을 새 언어로 다시 렌더링
 * - 선택값을 localStorage에 저장해서 다음 방문 때도 유지
 */
function applyLanguage(langValue) {
  currentLang = langValue;
  document.documentElement.lang = langValue;
  localStorage.setItem(LANG_STORAGE_KEY, langValue);
  markActiveOption(langOptions, "langValue", langValue);
  applyTranslations();

  // 언어가 바뀌면 번역문/주제 태그도 바뀌어야 하므로 같은 명언을 다시 그립니다.
  const quote = quotesData.find((q) => q.id === currentQuoteId);
  if (quote) renderQuote(quote);
}

/**
 * data-i18n="키" 가 붙은 요소는 textContent를,
 * data-i18n-aria="키" 가 붙은 요소는 aria-label을 현재 언어 값으로 바꿉니다.
 */
function applyTranslations() {
  const dict = uiStrings[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (dict[key]) el.setAttribute("aria-label", dict[key]);
  });
}

/**
 * 옵션 버튼 목록(themeOptions 또는 langOptions) 중에서, dataset의
 * datasetKey 값이 activeValue와 같은 버튼에만 is-active 클래스를 붙입니다.
 */
function markActiveOption(optionEls, datasetKey, activeValue) {
  optionEls.forEach((option) => {
    const isActive = option.dataset[datasetKey] === activeValue;
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
  markActiveOption(themeOptions, "themeValue", document.body.dataset.theme);
}

/**
 * 페이지를 처음 열었을 때, 저장되어 있던 언어가 있으면 불러옵니다.
 * 없으면 브라우저 설정 언어를 참고하고, 지원하지 않는 언어면 한국어로 시작합니다.
 */
function restoreSavedLanguage() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) {
    currentLang = saved;
  } else {
    const browserLang = (navigator.language || "ko").slice(0, 2);
    currentLang = SUPPORTED_LANGS.includes(browserLang) ? browserLang : "ko";
  }

  document.documentElement.lang = currentLang;
  markActiveOption(langOptions, "langValue", currentLang);
  applyTranslations();
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

  const subtitle = getSubtitleText(quote);
  const lines = [`"${quote.quote_en}"`];
  if (subtitle) lines.push(`"${subtitle}"`);
  lines.push(`— ${quote.speaker}, ${quote.movie}`);

  return lines.join("\n");
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
    showToast(uiStrings[currentLang].toastCopied);
  } catch (error) {
    console.error("복사에 실패했어요:", error);
    showToast(uiStrings[currentLang].toastCopyFailed);
  }
}

/* -----------------------------------------
   4. 버튼/이벤트 연결
------------------------------------------ */
btnShuffle.addEventListener("click", showNewQuote);
btnTheme.addEventListener("click", () => openSheet(themeModal));
btnLang.addEventListener("click", () => openSheet(langModal));
btnShare.addEventListener("click", handleShare);

// 바텀시트 바깥(어두운 배경) 클릭 시 해당 모달 닫기
themeBackdrop.addEventListener("click", () => closeSheet(themeModal));
langBackdrop.addEventListener("click", () => closeSheet(langModal));

// 각 테마 스와치 버튼 클릭 시 테마 적용
themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyTheme(option.dataset.themeValue);
  });
});

// 각 언어 버튼 클릭 시 언어 적용
langOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyLanguage(option.dataset.langValue);
  });
});

// 키보드 Esc 로도 열려있는 바텀시트를 닫을 수 있게 합니다.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAnyOpenSheet();
  }
});

/* -----------------------------------------
   5. 앱 시작: 저장된 테마/언어 복원 + 첫 명언 렌더링
------------------------------------------ */
restoreSavedTheme();
restoreSavedLanguage();
renderQuote(pickRandomQuote());
