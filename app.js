/* ============================================================
   JLPT Exam Timer — app.js
   Pure ES6+, zero frameworks, zero external dependencies
   Official JEES Timetable & Standard Multi-language Terminology
   ============================================================ */

'use strict';

// ================================================================
// 1. I18N TRANSLATIONS (Official JLPT / JEES Standards)
// ================================================================

const I18N = {
  // ── Tiếng Việt (Thuật ngữ chuẩn theo các kỳ thi JLPT tại Việt Nam) ──
  vi: {
    appTitle: 'JLPT Timer',
    levelLabel: 'Cấp độ JLPT',
    modeLabel: 'Chế độ luyện thi',
    // Mode selector buttons
    mFull: 'Thi thử trọn bộ',
    mSec1: 'Cả Phần 1',
    mVocabOnly: 'Chỉ Từ vựng',
    mReadingOnly: 'Chỉ Đọc hiểu',
    mVocab: 'Từ vựng',
    mGrammar: 'Ngữ pháp & Đọc',
    mListening: 'Nghe hiểu',
    // Section names
    secLangKnowledgeReading: 'Kiến thức ngôn ngữ (Từ vựng・Ngữ pháp) & Đọc hiểu',
    secLangKnowledgeVocab: 'Kiến thức ngôn ngữ (Chữ Hán・Từ vựng)',
    secLangKnowledgeGrammarReading: 'Kiến thức ngôn ngữ (Ngữ pháp) & Đọc hiểu',
    secListening: 'Nghe hiểu',
    // Section sub-labels
    subVocabGrammarReading: 'Chữ Hán · Từ vựng · Ngữ pháp · Đọc hiểu',
    sub2of2: 'Phần thi 2/2',
    sub1of3: 'Phần thi 1/3',
    sub2of3: 'Phần thi 2/3',
    sub3of3: 'Phần thi 3/3',
    // Individual mode sub-labels
    indN1VocabOnly: 'N1 — Chỉ luyện Từ vựng & Ngữ pháp (~40 phút)',
    indN1ReadingOnly: 'N1 — Chỉ luyện Đọc hiểu (~70 phút)',
    indN2VocabOnly: 'N2 — Chỉ luyện Từ vựng & Ngữ pháp (~40 phút)',
    indN2ReadingOnly: 'N2 — Chỉ luyện Đọc hiểu (~65 phút)',
    indN1VocabApprox: 'N1 — Phân chia thời gian: 40 phút đầu',
    indN1ReadingApprox: 'N1 — Phân chia thời gian: 70 phút sau',
    indN2VocabApprox: 'N2 — Phân chia thời gian: 40 phút đầu',
    indN2ReadingApprox: 'N2 — Phân chia thời gian: 65 phút sau',
    indSec1: 'Phần thi 1',
    indSec2: 'Phần thi 2',
    indSec3: 'Phần thi 3',
    // Break
    bkBreak: 'Nghỉ giải lao',
    bkBreakSub: 'Thời gian nghỉ ngơi thư giãn · Nhấn "Bỏ qua giải lao" để làm tiếp phần tiếp theo ngay',
    // Controls & Actions
    startBtn: 'Bắt đầu làm bài',
    restartBtn: 'Thi lại từ đầu',
    pauseBtn: 'Tạm dừng',
    resumeBtn: 'Tiếp tục làm bài',
    pausedNotice: 'Đang tạm dừng · Bấm "Tiếp tục làm bài" hoặc phím Cách (Space) để tiếp tục tính giờ',
    holdReset: 'Nhấn giữ để đặt lại',
    skipBreak: 'Bỏ qua giải lao — Vào thi phần tiếp theo \u2192',
    examComplete: 'Chúc mừng bạn đã hoàn thành bài thi!',
    // Timeline preview labels
    tlVocab: 'Từ vựng',
    tlGrammar: 'Ngữ pháp & Đọc',
    tlLangReading: 'KT Ngôn ngữ & Đọc',
    tlListening: 'Nghe hiểu',
    tlBreak: mins => `Giải lao \u00b7 ${mins}p`,
    // Formatted strings
    titleDone: lvl => `Hoàn thành bài thi \u2014 JLPT ${lvl}`,
    titleIdle: 'Đồng hồ thi JLPT — Mô phỏng chuẩn JEES (N1-N5)',
    titleRunning: (time, phase, lvl) => `[${time}] ${phase} \u2014 JLPT ${lvl}`,
    titlePaused: (time, phase, lvl) => `[Tạm dừng] [${time}] ${phase} \u2014 JLPT ${lvl}`,
  },

  // ── English (Official JLPT.jp Standards) ─────────────────────
  en: {
    appTitle: 'JLPT Timer',
    levelLabel: 'JLPT Level',
    modeLabel: 'Exam Mode',
    // Mode selector buttons
    mFull: 'Full Mock Exam',
    mSec1: 'Section 1 (Full)',
    mVocabOnly: 'Vocab Only',
    mReadingOnly: 'Reading Only',
    mVocab: 'Vocabulary',
    mGrammar: 'Grammar & Reading',
    mListening: 'Listening',
    // Section names
    secLangKnowledgeReading: 'Language Knowledge (Vocab./Grammar) & Reading',
    secLangKnowledgeVocab: 'Language Knowledge (Vocabulary)',
    secLangKnowledgeGrammarReading: 'Language Knowledge (Grammar) & Reading',
    secListening: 'Listening',
    // Section sub-labels
    subVocabGrammarReading: 'Characters · Vocabulary · Grammar · Reading',
    sub2of2: 'Section 2 of 2',
    sub1of3: 'Section 1 of 3',
    sub2of3: 'Section 2 of 3',
    sub3of3: 'Section 3 of 3',
    // Individual mode sub-labels
    indN1VocabOnly: 'N1 — Vocabulary & Grammar section only (~40 min)',
    indN1ReadingOnly: 'N1 — Reading section only (~70 min)',
    indN2VocabOnly: 'N2 — Vocabulary & Grammar section only (~40 min)',
    indN2ReadingOnly: 'N2 — Reading section only (~65 min)',
    indN1VocabApprox: 'N1 — Recommended split: First 40 min',
    indN1ReadingApprox: 'N1 — Recommended split: Last 70 min',
    indN2VocabApprox: 'N2 — Recommended split: First 40 min',
    indN2ReadingApprox: 'N2 — Recommended split: Last 65 min',
    indSec1: 'Section 1',
    indSec2: 'Section 2',
    indSec3: 'Section 3',
    // Break
    bkBreak: 'Break / Intermission',
    bkBreakSub: 'Rest between sections · Click "Skip Break" to proceed to the next section immediately',
    // Controls & Actions
    startBtn: 'Start Exam',
    restartBtn: 'Restart Exam',
    pauseBtn: 'Pause',
    resumeBtn: 'Resume Exam',
    pausedNotice: 'Timer paused · Click "Resume Exam" or press Space to continue',
    holdReset: 'Hold to Reset',
    skipBreak: 'Skip Break — Start Next Section \u2192',
    examComplete: 'Exam Complete — Well Done!',
    // Timeline preview labels
    tlVocab: 'Vocabulary',
    tlGrammar: 'Grammar & Reading',
    tlLangReading: 'Lang. Knowledge & Reading',
    tlListening: 'Listening',
    tlBreak: mins => `Break \u00b7 ${mins}m`,
    // Formatted strings
    titleDone: lvl => `Exam Complete \u2014 JLPT ${lvl}`,
    titleIdle: 'JLPT Exam Timer — Official JEES Timing Simulation (N1-N5)',
    titleRunning: (time, phase, lvl) => `[${time}] ${phase} \u2014 JLPT ${lvl}`,
    titlePaused: (time, phase, lvl) => `[PAUSED] [${time}] ${phase} \u2014 JLPT ${lvl}`,
  },

  // ── 日本語 (JLPT公式サイト jlpt.jp およびJEES実施要項の正式名称) ──
  ja: {
    appTitle: 'JLPT タイマー',
    levelLabel: '受験レベル',
    modeLabel: '試験モード',
    // Mode selector buttons
    mFull: '本番模擬（全科目）',
    mSec1: '第1科目（通し）',
    mVocabOnly: '語彙のみ',
    mReadingOnly: '読解のみ',
    mVocab: '文字・語彙',
    mGrammar: '文法・読解',
    mListening: '聴解',
    // 科目名（公式表記）
    secLangKnowledgeReading: '言語知識（文字・語彙・文法）・読解',
    secLangKnowledgeVocab: '言語知識（文字・語彙）',
    secLangKnowledgeGrammarReading: '言語知識（文法）・読解',
    secListening: '聴解',
    // 科目詳細
    subVocabGrammarReading: '文字・語彙・文法・読解（通し実施）',
    sub2of2: '第2科目（全2科目）',
    sub1of3: '第1科目（全3科目）',
    sub2of3: '第2科目（全3科目）',
    sub3of3: '第3科目（全3科目）',
    // 個別練習モード
    indN1VocabOnly: 'N1 — 語彙・文法パートのみ（約40分目安）',
    indN1ReadingOnly: 'N1 — 読解パートのみ（約70分目安）',
    indN2VocabOnly: 'N2 — 語彙・文法パートのみ（約40分目安）',
    indN2ReadingOnly: 'N2 — 読解パートのみ（約65分目安）',
    indN1VocabApprox: 'N1時間配分目安：前半40分',
    indN1ReadingApprox: 'N1時間配分目安：後半70分',
    indN2VocabApprox: 'N2時間配分目安：前半40分',
    indN2ReadingApprox: 'N2時間配分目安：後半65分',
    indSec1: '第1科目',
    indSec2: '第2科目',
    indSec3: '第3科目',
    // Break
    bkBreak: '休憩時間',
    bkBreakSub: '科目間の休憩時間です · 次の科目を開始する場合は「休憩をスキップ」を押してください',
    // コントロール
    startBtn: '試験開始',
    restartBtn: '最初からやり直す',
    pauseBtn: '一時停止',
    resumeBtn: '試験を再開する',
    pausedNotice: '一時停止中 · 「再開」ボタンまたはスペースキーで計測を再開します',
    holdReset: '長押しでリセット',
    skipBreak: '休憩をスキップして次の科目へ \u2192',
    examComplete: 'お疲れ様でした！試験終了です',
    // タイムライン表記
    tlVocab: '文字・語彙',
    tlGrammar: '文法・読解',
    tlLangReading: '言語知識・読解',
    tlListening: '聴解',
    tlBreak: mins => `休憩 \u00b7 ${mins}分`,
    // フォーマット文字列
    titleDone: lvl => `試験終了 \u2014 JLPT ${lvl}`,
    titleIdle: 'JLPT 模擬タイマー — JEES 公式本試験仕様 (N1-N5)',
    titleRunning: (time, phase, lvl) => `[${time}] ${phase} \u2014 JLPT ${lvl}`,
    titlePaused: (time, phase, lvl) => `[一時停止] [${time}] ${phase} \u2014 JLPT ${lvl}`,
  },
};

// ================================================================
// 2. OFFICIAL JEES JLPT TIMING DATA (seconds)
// ================================================================

const M = m => m * 60;

// Standard breaks (20 min between Sec1 & Sec2 for N3-N5; 30 min before Listening for all)
const BREAK_20 = { type: 'break', duration: M(20) };
const BREAK_30 = { type: 'break', duration: M(30) };

const LEVELS = {
  N1: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeReading', tlKey: 'tlLangReading', subLabelKey: 'subVocabGrammarReading', duration: M(110) },
      BREAK_30,
      { type: 'exam', labelKey: 'secListening', tlKey: 'tlListening', subLabelKey: 'sub2of2', duration: M(55) },
    ],
    individual: {
      sec1: { labelKey: 'secLangKnowledgeReading', subLabelKey: 'subVocabGrammarReading', duration: M(110) },
      vocab_only: { labelKey: 'secLangKnowledgeVocab', subLabelKey: 'indN1VocabOnly', duration: M(40) },
      reading_only: { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indN1ReadingOnly', duration: M(70) },
      listening: { labelKey: 'secListening', subLabelKey: 'indSec2', duration: M(55) },
    },
  },
  N2: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeReading', tlKey: 'tlLangReading', subLabelKey: 'subVocabGrammarReading', duration: M(105) },
      BREAK_30,
      { type: 'exam', labelKey: 'secListening', tlKey: 'tlListening', subLabelKey: 'sub2of2', duration: M(50) },
    ],
    individual: {
      sec1: { labelKey: 'secLangKnowledgeReading', subLabelKey: 'subVocabGrammarReading', duration: M(105) },
      vocab_only: { labelKey: 'secLangKnowledgeVocab', subLabelKey: 'indN2VocabOnly', duration: M(40) },
      reading_only: { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indN2ReadingOnly', duration: M(65) },
      listening: { labelKey: 'secListening', subLabelKey: 'indSec2', duration: M(50) },
    },
  },
  N3: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeVocab', tlKey: 'tlVocab', subLabelKey: 'sub1of3', duration: M(30) },
      BREAK_20,
      { type: 'exam', labelKey: 'secLangKnowledgeGrammarReading', tlKey: 'tlGrammar', subLabelKey: 'sub2of3', duration: M(70) },
      BREAK_30,
      { type: 'exam', labelKey: 'secListening', tlKey: 'tlListening', subLabelKey: 'sub3of3', duration: M(40) },
    ],
    individual: {
      vocab: { labelKey: 'secLangKnowledgeVocab', subLabelKey: 'indSec1', duration: M(30) },
      grammar: { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indSec2', duration: M(70) },
      listening: { labelKey: 'secListening', subLabelKey: 'indSec3', duration: M(40) },
      vocab_only: null,
      reading_only: null,
    },
  },
  N4: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeVocab', tlKey: 'tlVocab', subLabelKey: 'sub1of3', duration: M(25) },
      BREAK_20,
      { type: 'exam', labelKey: 'secLangKnowledgeGrammarReading', tlKey: 'tlGrammar', subLabelKey: 'sub2of3', duration: M(55) },
      BREAK_30,
      { type: 'exam', labelKey: 'secListening', tlKey: 'tlListening', subLabelKey: 'sub3of3', duration: M(35) },
    ],
    individual: {
      vocab: { labelKey: 'secLangKnowledgeVocab', subLabelKey: 'indSec1', duration: M(25) },
      grammar: { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indSec2', duration: M(55) },
      listening: { labelKey: 'secListening', subLabelKey: 'indSec3', duration: M(35) },
      vocab_only: null,
      reading_only: null,
    },
  },
  N5: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeVocab', tlKey: 'tlVocab', subLabelKey: 'sub1of3', duration: M(20) },
      BREAK_20,
      { type: 'exam', labelKey: 'secLangKnowledgeGrammarReading', tlKey: 'tlGrammar', subLabelKey: 'sub2of3', duration: M(40) },
      BREAK_30,
      { type: 'exam', labelKey: 'secListening', tlKey: 'tlListening', subLabelKey: 'sub3of3', duration: M(30) },
    ],
    individual: {
      vocab: { labelKey: 'secLangKnowledgeVocab', subLabelKey: 'indSec1', duration: M(20) },
      grammar: { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indSec2', duration: M(40) },
      listening: { labelKey: 'secListening', subLabelKey: 'indSec3', duration: M(30) },
      vocab_only: null,
      reading_only: null,
    },
  },
};

// ================================================================
// 3. APP STATE
// ================================================================

const State = {
  lang: 'vi',       // Default to Vietnamese
  level: 'N1',
  mode: 'full',
  status: 'idle',   // 'idle' | 'running' | 'break' | 'paused' | 'done'
  pausedFrom: null, // 'running' | 'break'
  remainingOnPause: 0,
  phases: [],
  phaseIndex: 0,
  endTime: null,
  phaseStart: null,
  rafId: null,
  holdTimer: null,
  holdStart: null,
  warnFired: false,
};

// ================================================================
// 4. i18n HELPER
// ================================================================

function t(key, ...args) {
  const dict = I18N[State.lang] || I18N.vi;
  const val = dict[key] !== undefined ? dict[key] : (I18N.vi[key] ?? key);
  return typeof val === 'function' ? val(...args) : val;
}

// ================================================================
// 5. DOM REFS
// ================================================================

const $ = id => document.getElementById(id);

const dom = {
  progressFill: $('progress-bar-fill'),
  appTitle: $('app-title'),
  brandBadge: $('brand-badge'),
  langSeg: $('lang-seg'),
  langPill: $('lang-pill'),
  darkToggle: $('dark-toggle'),
  labelLevel: $('label-level'),
  labelMode: $('label-mode'),
  levelSeg: $('level-seg'),
  modeSeg: $('mode-seg'),
  levelPill: $('level-pill'),
  modePill: $('mode-pill'),
  levelSection: $('level-section'),
  modeSection: $('mode-section'),
  timelineSection: $('timeline-section'),
  timelinePreview: $('timeline-preview'),
  phaseLabel: $('phase-label'),
  countdown: $('countdown'),
  subphaseLabel: $('subphase-label'),
  startBtn: $('start-btn'),
  skipBreakBtn: $('skip-break-btn'),
  pauseBtn: $('pause-btn'),
  resetBtn: $('reset-btn'),
  holdText: $('hold-text'),
  holdFill: document.querySelector('.hold-fill'),
  warningFlash: $('warning-flash'),
  btnSec1: $('btn-sec1'),
  btnVocab: $('btn-vocab'),
  btnGrammar: $('btn-grammar'),
  btnVocabOnly: $('btn-vocab-only'),
  btnReadingOnly: $('btn-reading-only'),
  btnListening: $('btn-listening'),
};

// ================================================================
// 6. SYNTHESIZED WEB AUDIO ENGINE (Zero external files)
// ================================================================

let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function tone(freq, startTime, duration, type = 'sine', gain = 0.3) {
  const osc = audioCtx.createOscillator();
  const env = audioCtx.createGain();
  osc.connect(env);
  env.connect(audioCtx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  env.gain.setValueAtTime(0, startTime);
  env.gain.linearRampToValueAtTime(gain, startTime + 0.01);
  env.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

function chimeStart() {
  ensureAudio();
  const t0 = audioCtx.currentTime;
  tone(880, t0, 0.6, 'sine', 0.28);
  tone(1108, t0 + 0.1, 0.5, 'sine', 0.18);
  tone(1320, t0 + 0.2, 0.7, 'sine', 0.22);
}

function chimePencilsDown() {
  ensureAudio();
  const t0 = audioCtx.currentTime;
  [659, 831, 988, 1319].forEach((f, i) => tone(f, t0 + i * 0.35, 0.6, 'sine', 0.25));
}

function chimeWarning() {
  ensureAudio();
  const t0 = audioCtx.currentTime;
  tone(1047, t0, 0.08, 'square', 0.12);
  tone(1047, t0 + 0.14, 0.08, 'square', 0.12);
}

function chimeBreakPhase() {
  ensureAudio();
  const t0 = audioCtx.currentTime;
  tone(392, t0, 1.2, 'sine', 0.22);
  tone(523, t0 + 0.1, 0.9, 'sine', 0.14);
}

function chimeDone() {
  ensureAudio();
  const t0 = audioCtx.currentTime;
  tone(1047, t0, 0.4, 'sine', 0.22);
  tone(1319, t0 + 0.2, 0.4, 'sine', 0.22);
  tone(1047, t0 + 0.5, 0.7, 'sine', 0.18);
}

// ================================================================
// 7. SEGMENTED CONTROL COMPONENT
// ================================================================

function initSegmented(segEl, pillEl, onChange) {
  const btns = Array.from(segEl.querySelectorAll('.seg-btn'));

  function movePill(btn) {
    if (!btn || !btn.offsetParent) return;
    const segRect = segEl.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    pillEl.style.left = (btnRect.left - segRect.left + 2) + 'px';
    pillEl.style.width = (btnRect.width - 4) + 'px';
  }

  function select(btn, triggerChange = true) {
    if (!btn) return;
    btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-checked', 'true');
    movePill(btn);
    if (triggerChange) onChange(btn.dataset.value);
  }

  btns.forEach(btn => btn.addEventListener('click', () => select(btn, true)));

  requestAnimationFrame(() => {
    const active = btns.find(b => b.classList.contains('active')) || btns[0];
    movePill(active);
  });

  return {
    select: (value, triggerChange = true) => {
      const btn = btns.find(b => b.dataset.value === value);
      if (btn) select(btn, triggerChange);
    },
    reposition: () => {
      const btn = btns.find(b => b.classList.contains('active'));
      if (btn) movePill(btn);
    },
    getActive: () => btns.find(b => b.classList.contains('active'))?.dataset.value,
  };
}

// ================================================================
// 8. LANGUAGE SELECTION & APPLICATION
// ================================================================

function setLang(lang) {
  if (!I18N[lang]) return;
  State.lang = lang;
  applyLang();
  if (State.status !== 'idle' && State.status !== 'done') updateUI();
}

function loadLangPref() {
  try {
    const saved = localStorage.getItem('jlpt_lang');
    if (saved && I18N[saved]) {
      State.lang = saved;
    } else {
      State.lang = 'vi';
    }
  } catch (_) {
    State.lang = 'vi';
  }
}

function applyLang() {
  // Set html lang attribute for Japanese font switching & language styling
  document.documentElement.lang = State.lang;

  // Header title (restored to original spot)
  if (dom.appTitle) {
    dom.appTitle.textContent = t('appTitle');
  }
  if (dom.brandBadge) {
    dom.brandBadge.title = t('appTitle');
  }

  // Selector labels
  dom.labelLevel.textContent = t('levelLabel');
  dom.labelMode.textContent = t('modeLabel');

  // Mode button texts
  const modeMap = {
    full: 'mFull',
    sec1: 'mSec1',
    vocab_only: 'mVocabOnly',
    reading_only: 'mReadingOnly',
    vocab: 'mVocab',
    grammar: 'mGrammar',
    listening: 'mListening',
  };
  dom.modeSeg.querySelectorAll('.seg-btn').forEach(btn => {
    const key = modeMap[btn.dataset.value];
    if (key) btn.textContent = t(key);
  });

  // Action buttons
  dom.skipBreakBtn.textContent = t('skipBreak');
  dom.pauseBtn.textContent = State.status === 'paused' ? `▶ ${t('resumeBtn')}` : `⏸ ${t('pauseBtn')}`;
  dom.holdText.textContent = t('holdReset');

  // Start button based on status
  dom.startBtn.textContent = State.status === 'done' ? t('restartBtn') : t('startBtn');

  // Exam complete title
  if (State.status === 'done') {
    dom.phaseLabel.textContent = t('examComplete');
    document.title = t('titleDone', State.level);
  } else if (State.status === 'idle') {
    document.title = t('titleIdle');
  }

  // Rebuild timeline preview with the active language
  buildTimeline();
  updateUI();

  // Adjust sliding pill bounds
  requestAnimationFrame(() => {
    if (levelCtrl) levelCtrl.reposition();
    if (modeCtrl) modeCtrl.reposition();
    if (langCtrl) langCtrl.reposition();
  });

  // Save preference
  try { localStorage.setItem('jlpt_lang', State.lang); } catch (_) { }
}

// ================================================================
// 9. TIMELINE PREVIEW
// ================================================================

function buildTimeline() {
  const preview = dom.timelinePreview;
  preview.innerHTML = '';

  if (State.mode !== 'full') {
    dom.timelineSection.style.display = 'none';
    return;
  }
  dom.timelineSection.style.display = '';

  const phases = LEVELS[State.level].sections;

  phases.forEach((entry, idx) => {
    if (idx > 0) {
      const arrow = document.createElement('span');
      arrow.className = 'tl-arrow';
      arrow.textContent = '\u2192';
      preview.appendChild(arrow);
    }

    const item = document.createElement('div');
    item.className = 'tl-item';

    const block = document.createElement('div');
    block.dataset.entryIdx = idx;

    if (entry.type === 'exam') {
      const mins = Math.round(entry.duration / 60);
      const label = t(entry.tlKey || entry.labelKey);
      const unit = State.lang === 'ja' ? '分' : State.lang === 'vi' ? 'p' : 'm';
      block.className = 'tl-block exam';
      block.textContent = `${label} \u00b7 ${mins}${unit}`;
    } else {
      const mins = Math.round(entry.duration / 60);
      block.className = 'tl-block brk';
      block.textContent = t('tlBreak', mins);
    }

    item.appendChild(block);
    preview.appendChild(item);
  });

  updateTimelineActive();
}

function updateTimelineActive() {
  if (State.mode !== 'full') return;
  const blocks = dom.timelinePreview.querySelectorAll('.tl-block');
  blocks.forEach((b, i) => b.classList.toggle('tl-active', i === State.phaseIndex));
}

// ================================================================
// 10. DRIFT-FREE TIMING ENGINE
// ================================================================

function resolvePhases() {
  if (State.mode === 'full') {
    return [...LEVELS[State.level].sections];
  }
  const ind = LEVELS[State.level].individual[State.mode];
  if (!ind) return [];
  return [{ type: 'exam', labelKey: ind.labelKey, subLabelKey: ind.subLabelKey, duration: ind.duration }];
}

function startExam() {
  ensureAudio();
  State.phases = resolvePhases();
  State.phaseIndex = 0;
  State.warnFired = false;
  if (!State.phases.length) return;
  startPhase(0);
  lockSelectors();
  chimeStart();
}

let lastRemainingSec = -1;

function startPhase(idx) {
  lastRemainingSec = -1;
  State.phaseIndex = idx;
  State.phaseStart = Date.now();
  State.endTime = Date.now() + State.phases[idx].duration * 1000;
  State.warnFired = false;
  State.status = State.phases[idx].type === 'break' ? 'break' : 'running';
  updateUI();
  cancelAnimationFrame(State.rafId);
  State.rafId = requestAnimationFrame(tick);
}

function tick() {
  const now = Date.now();
  const remainingMs = Math.max(0, State.endTime - now);
  const remainingSec = Math.ceil(remainingMs / 1000);
  const phase = State.phases[State.phaseIndex];

  // ONLY perform DOM updates when the second counter changes (saves 98.5% CPU/GPU overhead)
  if (remainingSec !== lastRemainingSec) {
    lastRemainingSec = remainingSec;

    dom.countdown.textContent = formatTime(remainingSec);

    // Top Progress Bar Fill
    const elapsed = phase.duration * 1000 - remainingMs;
    dom.progressFill.style.width = Math.min(100, elapsed / (phase.duration * 1000) * 100) + '%';

    // Live Browser Tab Title
    const phaseText = phase.type === 'exam'
      ? t(phase.labelKey)
      : t('bkBreak');
    document.title = t('titleRunning', formatTime(remainingSec), phaseText, State.level);

    // 5-minute warning notification (only for exam phase)
    if (!State.warnFired && remainingSec <= M(5) && remainingSec > 0 && phase.type === 'exam') {
      State.warnFired = true;
      chimeWarning();
      flashScreen();
      dom.countdown.classList.add('warning');
    }
    if (remainingSec > M(5) || phase.type === 'break') {
      dom.countdown.classList.remove('warning');
    }
  }

  if (remainingMs <= 0) {
    onPhaseEnd();
    return;
  }
  State.rafId = requestAnimationFrame(tick);
}

function onPhaseEnd() {
  dom.countdown.classList.remove('warning');
  const phase = State.phases[State.phaseIndex];
  const nextIdx = State.phaseIndex + 1;

  if (phase.type === 'exam') {
    chimePencilsDown();
  } else if (phase.type === 'break') {
    chimeStart();
  }

  if (nextIdx >= State.phases.length) {
    finishExam();
    return;
  }
  startPhase(nextIdx);
}

function finishExam() {
  State.status = 'done';
  State.endTime = null;
  dom.phaseLabel.textContent = t('examComplete');
  dom.countdown.textContent = '00:00';
  dom.subphaseLabel.textContent = '';
  dom.progressFill.style.width = '100%';
  document.title = t('titleDone', State.level);
  chimeDone();
  unlockSelectors();
  showDoneState();
}

// ================================================================
// 11. SKIP BREAK & PAUSE / RESUME LOGIC
// ================================================================

function skipEntireBreak() {
  cancelAnimationFrame(State.rafId);
  State.pausedFrom = null;
  State.remainingOnPause = 0;
  const nextIdx = State.phaseIndex + 1;
  if (nextIdx >= State.phases.length) {
    finishExam();
    return;
  }
  startPhase(nextIdx);
  chimeStart();
}

function pauseExam() {
  if (State.status !== 'running' && State.status !== 'break') return;
  cancelAnimationFrame(State.rafId);
  const remainingMs = Math.max(0, State.endTime - Date.now());
  State.remainingOnPause = remainingMs;
  State.pausedFrom = State.status;
  State.status = 'paused';
  updateUI();
}

function resumeExam() {
  if (State.status !== 'paused') return;
  State.endTime = Date.now() + State.remainingOnPause;
  State.status = State.pausedFrom || 'running';
  State.pausedFrom = null;
  State.remainingOnPause = 0;
  lastRemainingSec = -1;
  updateUI();
  cancelAnimationFrame(State.rafId);
  State.rafId = requestAnimationFrame(tick);
}

function togglePause() {
  if (State.status === 'running' || State.status === 'break') {
    pauseExam();
  } else if (State.status === 'paused') {
    resumeExam();
  }
}

// ================================================================
// 12. HOLD-TO-RESET (Accidental tap prevention)
// ================================================================

const HOLD_MS = 1500;

function resetAll() {
  cancelAnimationFrame(State.rafId);
  State.status = 'idle';
  State.pausedFrom = null;
  State.remainingOnPause = 0;
  State.endTime = null;
  State.phases = [];
  State.phaseIndex = 0;
  dom.countdown.classList.remove('warning', 'paused');
  dom.progressFill.style.width = '0%';
  document.title = t('titleIdle');
  unlockSelectors();
  updateUI();
  buildTimeline();
}

function setupHoldReset() {
  const btn = dom.resetBtn;
  const fill = dom.holdFill;

  function startHold() {
    if (State.status === 'idle') return;
    State.holdStart = Date.now();
    btn.classList.add('holding');
    State.holdTimer = setInterval(() => {
      const pct = Math.min(100, (Date.now() - State.holdStart) / HOLD_MS * 100);
      fill.style.width = pct + '%';
      if (pct >= 100) {
        clearInterval(State.holdTimer);
        btn.classList.remove('holding');
        fill.style.width = '0%';
        resetAll();
      }
    }, 16);
  }

  function endHold() {
    if (State.holdTimer) {
      clearInterval(State.holdTimer);
      State.holdTimer = null;
    }
    btn.classList.remove('holding');
    fill.style.width = '0%';
  }

  btn.addEventListener('mousedown', startHold);
  btn.addEventListener('touchstart', startHold, { passive: true });
  btn.addEventListener('mouseup', endHold);
  btn.addEventListener('mouseleave', endHold);
  btn.addEventListener('touchend', endHold);
  btn.addEventListener('touchcancel', endHold);
}

// ================================================================
// 13. UI STATE MANAGEMENT
// ================================================================

function updateUI() {
  const isPaused = State.status === 'paused';
  const isBreak = State.status === 'break' || (isPaused && State.pausedFrom === 'break');
  const isIdle = State.status === 'idle';
  const isDone = State.status === 'done';

  if (isIdle) {
    const upcoming = resolvePhases();
    const firstPhase = upcoming.length > 0 ? upcoming[0] : null;
    if (firstPhase) {
      dom.phaseLabel.textContent = t(firstPhase.labelKey);
      dom.subphaseLabel.textContent = t(firstPhase.subLabelKey);
      dom.countdown.textContent = formatTime(firstPhase.duration);
    } else {
      dom.phaseLabel.textContent = '';
      dom.subphaseLabel.textContent = '';
      dom.countdown.textContent = '00:00';
    }
    dom.countdown.classList.remove('warning', 'paused');
    dom.progressFill.style.width = '0%';
  } else if (isDone) {
    dom.phaseLabel.textContent = t('examComplete');
    dom.countdown.textContent = '00:00';
    dom.subphaseLabel.textContent = '';
    dom.countdown.classList.remove('warning', 'paused');
  } else {
    const phase = State.phases[State.phaseIndex];
    if (phase) {
      if (isBreak) {
        const mins = Math.round(phase.duration / 60);
        const unit = State.lang === 'ja' ? '分' : State.lang === 'vi' ? ' phút' : ' min';
        dom.phaseLabel.textContent = `${t('bkBreak')} (${mins}${unit})`;
      } else {
        dom.phaseLabel.textContent = t(phase.labelKey);
      }

      if (isPaused) {
        dom.subphaseLabel.textContent = t('pausedNotice');
      } else {
        dom.subphaseLabel.textContent = isBreak ? t('bkBreakSub') : t(phase.subLabelKey);
      }
    } else {
      dom.phaseLabel.textContent = '';
      dom.subphaseLabel.textContent = '';
    }

    dom.countdown.classList.toggle('paused', isPaused);

    if (isPaused) {
      const phaseText = phase && phase.type === 'exam' ? t(phase.labelKey) : t('bkBreak');
      const remSec = Math.ceil(State.remainingOnPause / 1000);
      document.title = t('titlePaused', formatTime(remSec), phaseText, State.level);
    }
  }

  // Button visibility
  dom.startBtn.classList.toggle('hidden', !isIdle && !isDone);
  dom.resetBtn.classList.toggle('hidden', isIdle || isDone);
  dom.skipBreakBtn.classList.toggle('hidden', !isBreak);
  dom.pauseBtn.classList.toggle('hidden', isIdle || isDone);

  // Pause button state & styling
  if (isPaused) {
    dom.pauseBtn.textContent = `▶ ${t('resumeBtn')}`;
    dom.pauseBtn.classList.add('resuming');
  } else {
    dom.pauseBtn.textContent = `⏸ ${t('pauseBtn')}`;
    dom.pauseBtn.classList.remove('resuming');
  }

  dom.startBtn.textContent = isDone ? t('restartBtn') : t('startBtn');
  dom.holdText.textContent = t('holdReset');

  updateTimelineActive();
}

function showDoneState() {
  dom.startBtn.classList.remove('hidden');
  dom.startBtn.textContent = t('restartBtn');
  dom.resetBtn.classList.add('hidden');
  dom.skipBreakBtn.classList.add('hidden');
  dom.pauseBtn.classList.add('hidden');
}

function lockSelectors() {
  dom.levelSection.classList.add('locked');
  dom.modeSection.classList.add('locked');
}

function unlockSelectors() {
  dom.levelSection.classList.remove('locked');
  dom.modeSection.classList.remove('locked');
}

// ================================================================
// 14. MODE VISIBILITY (Vocab Only / Reading Only for N1/N2)
// ================================================================

function updateModeOptions() {
  const isN12 = State.level === 'N1' || State.level === 'N2';
  if (dom.btnSec1) dom.btnSec1.style.display = isN12 ? '' : 'none';
  if (dom.btnVocabOnly) dom.btnVocabOnly.style.display = isN12 ? '' : 'none';
  if (dom.btnReadingOnly) dom.btnReadingOnly.style.display = isN12 ? '' : 'none';
  if (dom.btnVocab) dom.btnVocab.style.display = isN12 ? 'none' : '';
  if (dom.btnGrammar) dom.btnGrammar.style.display = isN12 ? 'none' : '';
}

// ================================================================
// 15. TIME FORMATTING (Strict mm:ss Japanese Exam Standard)
// Under 100m: 2 digits (e.g. 70:00, 25:00, 05:00)
// Over 100m: 3 digits naturally (e.g. 105:00, 110:00)
// ================================================================

function formatTime(totalSecs) {
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  const mStr = m < 10 ? `0${m}` : `${m}`;
  const sStr = String(s).padStart(2, '0');
  return `${mStr}:${sStr}`;
}

// ================================================================
// 16. WARNING FLASH
// ================================================================

function flashScreen() {
  dom.warningFlash.classList.add('flash');
  setTimeout(() => dom.warningFlash.classList.remove('flash'), 250);
}

// ================================================================
// 17. STATIC BACKGROUND (1.jpg)
// Slideshow removed to maximize 60-144fps rendering performance
// ================================================================

// ================================================================
// 18. OVERLAY INTENSITY TOGGLE (◑ button)
// ================================================================

const OVERLAY_LEVELS = [
  'linear-gradient(160deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.55) 100%)',  // Default balanced
  'linear-gradient(160deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.54) 50%, rgba(0,0,0,0.76) 100%)',  // Extra dark for high contrast
  'linear-gradient(160deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.30) 100%)',  // Lighter
];
let overlayLevel = 0;

function cycleOverlay() {
  overlayLevel = (overlayLevel + 1) % OVERLAY_LEVELS.length;
  document.getElementById('bg-overlay').style.background = OVERLAY_LEVELS[overlayLevel];
  const icons = ['◑', '●', '○'];
  dom.darkToggle.textContent = icons[overlayLevel];
}

// ================================================================
// 19. APPLICATION BOOTSTRAP
// ================================================================

let levelCtrl, modeCtrl, langCtrl;

function boot() {
  loadLangPref();

  // Initialize horizontal language selector
  langCtrl = initSegmented(dom.langSeg, dom.langPill, (val) => {
    setLang(val);
  });
  // Sync initial pill position with loaded language
  langCtrl.select(State.lang, false);

  // Initialize JLPT level selector (N1-N5)
  // Switching level automatically resets mode back to Full Exam
  levelCtrl = initSegmented(dom.levelSeg, dom.levelPill, (val) => {
    State.level = val;
    if (State.status === 'done') State.status = 'idle';
    updateModeOptions();
    modeCtrl.select('full');
    buildTimeline();
    updateUI();
    requestAnimationFrame(() => {
      modeCtrl.reposition();
    });
  });

  // Initialize Mode selector
  modeCtrl = initSegmented(dom.modeSeg, dom.modePill, (val) => {
    State.mode = val;
    if (State.status === 'done') State.status = 'idle';
    buildTimeline();
    updateModeOptions();
    updateUI();
  });

  // Apply localized strings
  applyLang();
  updateModeOptions();
  updateUI();

  // Header controls
  dom.darkToggle.addEventListener('click', cycleOverlay);

  // Start / Restart exam
  dom.startBtn.addEventListener('click', () => {
    if (State.status === 'idle' || State.status === 'done') startExam();
  });

  // Skip break action
  dom.skipBreakBtn.addEventListener('click', skipEntireBreak);

  // Pause / Resume action
  dom.pauseBtn.addEventListener('click', togglePause);

  // Keyboard shortcut: Spacebar to toggle Pause / Resume
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && (State.status === 'running' || State.status === 'break' || State.status === 'paused')) {
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
        togglePause();
      }
    }
  });

  // Hold to reset
  setupHoldReset();

  // ResizeObserver to keep all sliding pills positioned accurately on resize
  const ro = new ResizeObserver(() => {
    if (levelCtrl) levelCtrl.reposition();
    if (modeCtrl) modeCtrl.reposition();
    if (langCtrl) langCtrl.reposition();
  });
  ro.observe(document.body);

  document.title = t('titleIdle');
}

document.addEventListener('DOMContentLoaded', boot);
