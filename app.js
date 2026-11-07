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
    appTitle:    'JLPT Timer',
    levelLabel:  'Cấp độ JLPT',
    modeLabel:   'Chế độ luyện thi',
    // Mode selector buttons
    mFull:        'Thi thử trọn bộ',
    mSec1:        'Cả Phần 1',
    mVocabOnly:   'Chỉ Từ vựng',
    mReadingOnly: 'Chỉ Đọc hiểu',
    mVocab:       'Từ vựng',
    mGrammar:     'Ngữ pháp & Đọc',
    mListening:   'Nghe hiểu',
    // Section names
    secLangKnowledgeReading:        'Kiến thức ngôn ngữ (Từ vựng・Ngữ pháp) & Đọc hiểu',
    secLangKnowledgeVocab:          'Kiến thức ngôn ngữ (Chữ Hán・Từ vựng)',
    secLangKnowledgeGrammarReading: 'Kiến thức ngôn ngữ (Ngữ pháp) & Đọc hiểu',
    secListening:                   'Nghe hiểu',
    // Section sub-labels
    subVocabGrammarReading: 'Chữ Hán · Từ vựng · Ngữ pháp · Đọc hiểu',
    sub2of2: 'Phần thi 2/2',
    sub1of3: 'Phần thi 1/3',
    sub2of3: 'Phần thi 2/3',
    sub3of3: 'Phần thi 3/3',
    // Individual mode sub-labels
    indN1VocabOnly:    'N1 — Chỉ luyện Từ vựng & Ngữ pháp (~40 phút)',
    indN1ReadingOnly:  'N1 — Chỉ luyện Đọc hiểu (~70 phút)',
    indN2VocabOnly:    'N2 — Chỉ luyện Từ vựng & Ngữ pháp (~40 phút)',
    indN2ReadingOnly:  'N2 — Chỉ luyện Đọc hiểu (~65 phút)',
    indN1VocabApprox:  'N1 — Phân chia thời gian: 40 phút đầu',
    indN1ReadingApprox:'N1 — Phân chia thời gian: 70 phút sau',
    indN2VocabApprox:  'N2 — Phân chia thời gian: 40 phút đầu',
    indN2ReadingApprox:'N2 — Phân chia thời gian: 65 phút sau',
    indSec1: 'Phần thi 1',
    indSec2: 'Phần thi 2',
    indSec3: 'Phần thi 3',
    // Break phases (Quy trình giám thị phòng thi JEES)
    bkCollection:    'Thu bài thi & Kiểm đếm',
    bkCollectionSub: 'Thí sinh ngồi yên tại chỗ — Giám thị đang thu và kiểm đếm đủ bài thi',
    bkIntermission:    'Nghỉ giải lao',
    bkIntermissionSub: 'Thí sinh được phép ra ngoài hành lang, đi vệ sinh, uống nước và thư giãn',
    bkReturn:      'Ổn định chỗ ngồi & Chuẩn bị',
    bkReturn20Sub: 'Về đúng vị trí ngồi — Giám thị đối chiếu thẻ dự thi và phát đề thi tiếp theo',
    bkReturn30Sub: 'Về đúng vị trí ngồi — Giám thị đối chiếu thẻ dự thi, phát đề và thử âm thanh nghe',
    // Break step indicator panel
    bkStep1Label: 'Thu bài & Đếm',
    bkStep1Sub:   'Ngồi yên tại chỗ',
    bkStep2Label: 'Nghỉ giải lao',
    bkStep2Sub:   'Ra ngoài / Vệ sinh',
    bkStep3Label: 'Vào phòng chuẩn bị',
    bkStep3Sub:   'Kiểm tra & Phát đề',
    // Controls & Actions
    startBtn:    'Bắt đầu làm bài',
    restartBtn:  'Thi lại từ đầu',
    holdReset:   'Nhấn giữ để đặt lại',
    skipBreak:   'Bỏ qua giải lao — Vào thi phần tiếp theo \u2192',
    skipPhase:   'Bỏ qua giai đoạn này',
    examComplete: 'Chúc mừng bạn đã hoàn thành bài thi!',
    // Timeline preview labels
    tlVocab:       'Từ vựng',
    tlGrammar:     'Ngữ pháp & Đọc',
    tlLangReading: 'KT Ngôn ngữ & Đọc',
    tlListening:   'Nghe hiểu',
    tlBreak:       mins => `Giải lao \u00b7 ${mins}p`,
    // Formatted strings
    breakPhaseLabel: (num, lbl) => `Giải lao \u00b7 Giai đoạn ${num}/3 \u00b7 ${lbl}`,
    breakTitleFrag:  lbl        => `Giải lao (${lbl})`,
    titleDone:       lvl        => `Hoàn thành bài thi \u2014 JLPT ${lvl}`,
    titleIdle:       'JLPT Exam Timer — Luyện thi',
    titleRunning:    (time, phase, lvl) => `[${time}] ${phase} \u2014 JLPT ${lvl}`,
  },

  // ── English (Official JLPT.jp Standards) ─────────────────────
  en: {
    appTitle:    'JLPT Timer',
    levelLabel:  'JLPT Level',
    modeLabel:   'Exam Mode',
    // Mode selector buttons
    mFull:        'Full Mock Exam',
    mSec1:        'Section 1 (Full)',
    mVocabOnly:   'Vocab Only',
    mReadingOnly: 'Reading Only',
    mVocab:       'Vocabulary',
    mGrammar:     'Grammar & Reading',
    mListening:   'Listening',
    // Section names
    secLangKnowledgeReading:        'Language Knowledge (Vocab./Grammar) & Reading',
    secLangKnowledgeVocab:          'Language Knowledge (Vocabulary)',
    secLangKnowledgeGrammarReading: 'Language Knowledge (Grammar) & Reading',
    secListening:                   'Listening',
    // Section sub-labels
    subVocabGrammarReading: 'Characters · Vocabulary · Grammar · Reading',
    sub2of2: 'Section 2 of 2',
    sub1of3: 'Section 1 of 3',
    sub2of3: 'Section 2 of 3',
    sub3of3: 'Section 3 of 3',
    // Individual mode sub-labels
    indN1VocabOnly:    'N1 — Vocabulary & Grammar section only (~40 min)',
    indN1ReadingOnly:  'N1 — Reading section only (~70 min)',
    indN2VocabOnly:    'N2 — Vocabulary & Grammar section only (~40 min)',
    indN2ReadingOnly:  'N2 — Reading section only (~65 min)',
    indN1VocabApprox:  'N1 — Recommended split: First 40 min',
    indN1ReadingApprox:'N1 — Recommended split: Last 70 min',
    indN2VocabApprox:  'N2 — Recommended split: First 40 min',
    indN2ReadingApprox:'N2 — Recommended split: Last 65 min',
    indSec1: 'Section 1',
    indSec2: 'Section 2',
    indSec3: 'Section 3',
    // Break phases
    bkCollection:    'Answer Sheet Collection',
    bkCollectionSub: 'Please remain seated — Proctors are collecting and counting answer sheets',
    bkIntermission:    'Intermission',
    bkIntermissionSub: 'Examinees may leave the room for restrooms, water, and stretching',
    bkReturn:      'Return to Seat & Verification',
    bkReturn20Sub: 'Please be seated — ID verification and next test booklet distribution',
    bkReturn30Sub: 'Please be seated — ID verification, booklet distribution & audio equipment check',
    // Break step indicator panel
    bkStep1Label: 'Sheet Collection',
    bkStep1Sub:   'Remain seated',
    bkStep2Label: 'Intermission',
    bkStep2Sub:   'Restroom / Stretch',
    bkStep3Label: 'Seated Check-in',
    bkStep3Sub:   'ID & booklet check',
    // Controls & Actions
    startBtn:    'Start Exam',
    restartBtn:  'Restart Exam',
    holdReset:   'Hold to Reset',
    skipBreak:   'Skip Break — Start Next Section \u2192',
    skipPhase:   'Skip This Break Phase',
    examComplete: 'Exam Complete — Well Done!',
    // Timeline preview labels
    tlVocab:       'Vocabulary',
    tlGrammar:     'Grammar & Reading',
    tlLangReading: 'Lang. Knowledge & Reading',
    tlListening:   'Listening',
    tlBreak:       mins => `Break \u00b7 ${mins}m`,
    // Formatted strings
    breakPhaseLabel: (num, lbl) => `Break \u00b7 Phase ${num}/3 \u00b7 ${lbl}`,
    breakTitleFrag:  lbl        => `Break (${lbl})`,
    titleDone:       lvl        => `Exam Complete \u2014 JLPT ${lvl}`,
    titleIdle:       'JLPT Exam Timer Simulation',
    titleRunning:    (time, phase, lvl) => `[${time}] ${phase} \u2014 JLPT ${lvl}`,
  },

  // ── 日本語 (JLPT公式サイト jlpt.jp およびJEES実施要項の正式名称) ──
  ja: {
    appTitle:    'JLPT タイマー',
    levelLabel:  '受験レベル',
    modeLabel:   '試験モード',
    // Mode selector buttons
    mFull:        '本番模擬（全科目）',
    mSec1:        '第1科目（通し）',
    mVocabOnly:   '語彙のみ',
    mReadingOnly: '読解のみ',
    mVocab:       '文字・語彙',
    mGrammar:     '文法・読解',
    mListening:   '聴解',
    // 科目名（公式表記）
    secLangKnowledgeReading:        '言語知識（文字・語彙・文法）・読解',
    secLangKnowledgeVocab:          '言語知識（文字・語彙）',
    secLangKnowledgeGrammarReading: '言語知識（文法）・読解',
    secListening:                   '聴解',
    // 科目詳細
    subVocabGrammarReading: '文字・語彙・文法・読解（通し実施）',
    sub2of2: '第2科目（全2科目）',
    sub1of3: '第1科目（全3科目）',
    sub2of3: '第2科目（全3科目）',
    sub3of3: '第3科目（全3科目）',
    // 個別練習モード
    indN1VocabOnly:    'N1 — 語彙・文法パートのみ（約40分目安）',
    indN1ReadingOnly:  'N1 — 読解パートのみ（約70分目安）',
    indN2VocabOnly:    'N2 — 語彙・文法パートのみ（約40分目安）',
    indN2ReadingOnly:  'N2 — 読解パートのみ（約65分目安）',
    indN1VocabApprox:  'N1時間配分目安：前半40分',
    indN1ReadingApprox:'N1時間配分目安：後半70分',
    indN2VocabApprox:  'N2時間配分目安：前半40分',
    indN2ReadingApprox:'N2時間配分目安：後半65分',
    indSec1: '第1科目',
    indSec2: '第2科目',
    indSec3: '第3科目',
    // 休憩フェーズ（JEES試験室アナウンスに準拠）
    bkCollection:    '答案用紙回収・確認',
    bkCollectionSub: '着席のまま静かにお待ちください — 試験官が答案用紙を回収し枚数を確認中',
    bkIntermission:    '休憩時間',
    bkIntermissionSub: '教室の外へ退出できます。トイレ・水分補給・ストレッチ等をお済ませください',
    bkReturn:      '再着席・本人確認・配布',
    bkReturn20Sub: '指定の席に着席してください — 受験票の本人確認および次の問題冊子を配布します',
    bkReturn30Sub: '指定の席に着席してください — 受験票の本人確認、問題冊子配布および音響機器テストを行います',
    // 休憩ステップ表示
    bkStep1Label: '用紙回収・確認',
    bkStep1Sub:   '着席のまま待機',
    bkStep2Label: '休憩時間',
    bkStep2Sub:   'トイレ・水分補給',
    bkStep3Label: '再着席・配布確認',
    bkStep3Sub:   '本人確認・冊子配布',
    // コントロール
    startBtn:    '試験開始',
    restartBtn:  '最初からやり直す',
    holdReset:   '長押しでリセット',
    skipBreak:   '休憩をスキップして次の科目へ \u2192',
    skipPhase:   'このフェーズをスキップ',
    examComplete: 'お疲れ様でした！試験終了です',
    // タイムライン表記
    tlVocab:       '文字・語彙',
    tlGrammar:     '文法・読解',
    tlLangReading: '言語知識・読解',
    tlListening:   '聴解',
    tlBreak:       mins => `休憩 \u00b7 ${mins}分`,
    // フォーマット文字列
    breakPhaseLabel: (num, lbl) => `休憩 \u00b7 フェーズ ${num}/3 \u00b7 ${lbl}`,
    breakTitleFrag:  lbl        => `休憩（${lbl}）`,
    titleDone:       lvl        => `試験終了 \u2014 JLPT ${lvl}`,
    titleIdle:       'JLPT 模擬タイマー',
    titleRunning:    (time, phase, lvl) => `[${time}] ${phase} \u2014 JLPT ${lvl}`,
  },
};

// ================================================================
// 2. OFFICIAL JEES JLPT TIMING DATA (seconds)
// ================================================================

const M = m => m * 60;

// Standard 20-minute break between Section 1 and Section 2 (N3, N4, N5)
const BREAK_20 = [
  { type: 'break-phase', phaseNum: 1, labelKey: 'bkCollection',   subLabelKey: 'bkCollectionSub', duration: M(5)  },
  { type: 'break-phase', phaseNum: 2, labelKey: 'bkIntermission', subLabelKey: 'bkIntermissionSub', duration: M(10) },
  { type: 'break-phase', phaseNum: 3, labelKey: 'bkReturn',       subLabelKey: 'bkReturn20Sub',   duration: M(5)  },
];

// Standard 30-minute break before Listening (all levels N1-N5)
const BREAK_30 = [
  { type: 'break-phase', phaseNum: 1, labelKey: 'bkCollection',   subLabelKey: 'bkCollectionSub', duration: M(5)  },
  { type: 'break-phase', phaseNum: 2, labelKey: 'bkIntermission', subLabelKey: 'bkIntermissionSub', duration: M(15) },
  { type: 'break-phase', phaseNum: 3, labelKey: 'bkReturn',       subLabelKey: 'bkReturn30Sub',   duration: M(10) },
];

const LEVELS = {
  N1: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeReading', tlKey: 'tlLangReading', subLabelKey: 'subVocabGrammarReading', duration: M(110) },
      ...BREAK_30,
      { type: 'exam', labelKey: 'secListening',            tlKey: 'tlListening',   subLabelKey: 'sub2of2',                 duration: M(55)  },
    ],
    individual: {
      sec1:         { labelKey: 'secLangKnowledgeReading',        subLabelKey: 'subVocabGrammarReading', duration: M(110) },
      vocab_only:   { labelKey: 'secLangKnowledgeVocab',          subLabelKey: 'indN1VocabOnly',         duration: M(40) },
      reading_only: { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indN1ReadingOnly',       duration: M(70) },
      listening:    { labelKey: 'secListening',                   subLabelKey: 'indSec2',                duration: M(55) },
    },
  },
  N2: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeReading', tlKey: 'tlLangReading', subLabelKey: 'subVocabGrammarReading', duration: M(105) },
      ...BREAK_30,
      { type: 'exam', labelKey: 'secListening',            tlKey: 'tlListening',   subLabelKey: 'sub2of2',                 duration: M(50)  },
    ],
    individual: {
      sec1:         { labelKey: 'secLangKnowledgeReading',        subLabelKey: 'subVocabGrammarReading', duration: M(105) },
      vocab_only:   { labelKey: 'secLangKnowledgeVocab',          subLabelKey: 'indN2VocabOnly',         duration: M(40) },
      reading_only: { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indN2ReadingOnly',       duration: M(65) },
      listening:    { labelKey: 'secListening',                   subLabelKey: 'indSec2',                duration: M(50) },
    },
  },
  N3: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeVocab',          tlKey: 'tlVocab',     subLabelKey: 'sub1of3', duration: M(30) },
      ...BREAK_20,
      { type: 'exam', labelKey: 'secLangKnowledgeGrammarReading', tlKey: 'tlGrammar',   subLabelKey: 'sub2of3', duration: M(70) },
      ...BREAK_30,
      { type: 'exam', labelKey: 'secListening',                   tlKey: 'tlListening', subLabelKey: 'sub3of3', duration: M(40) },
    ],
    individual: {
      vocab:        { labelKey: 'secLangKnowledgeVocab',          subLabelKey: 'indSec1', duration: M(30) },
      grammar:      { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indSec2', duration: M(70) },
      listening:    { labelKey: 'secListening',                   subLabelKey: 'indSec3', duration: M(40) },
      vocab_only:   null,
      reading_only: null,
    },
  },
  N4: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeVocab',          tlKey: 'tlVocab',     subLabelKey: 'sub1of3', duration: M(25) },
      ...BREAK_20,
      { type: 'exam', labelKey: 'secLangKnowledgeGrammarReading', tlKey: 'tlGrammar',   subLabelKey: 'sub2of3', duration: M(55) },
      ...BREAK_30,
      { type: 'exam', labelKey: 'secListening',                   tlKey: 'tlListening', subLabelKey: 'sub3of3', duration: M(35) },
    ],
    individual: {
      vocab:        { labelKey: 'secLangKnowledgeVocab',          subLabelKey: 'indSec1', duration: M(25) },
      grammar:      { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indSec2', duration: M(55) },
      listening:    { labelKey: 'secListening',                   subLabelKey: 'indSec3', duration: M(35) },
      vocab_only:   null,
      reading_only: null,
    },
  },
  N5: {
    sections: [
      { type: 'exam', labelKey: 'secLangKnowledgeVocab',          tlKey: 'tlVocab',     subLabelKey: 'sub1of3', duration: M(20) },
      ...BREAK_20,
      { type: 'exam', labelKey: 'secLangKnowledgeGrammarReading', tlKey: 'tlGrammar',   subLabelKey: 'sub2of3', duration: M(40) },
      ...BREAK_30,
      { type: 'exam', labelKey: 'secListening',                   tlKey: 'tlListening', subLabelKey: 'sub3of3', duration: M(30) },
    ],
    individual: {
      vocab:        { labelKey: 'secLangKnowledgeVocab',          subLabelKey: 'indSec1', duration: M(20) },
      grammar:      { labelKey: 'secLangKnowledgeGrammarReading', subLabelKey: 'indSec2', duration: M(40) },
      listening:    { labelKey: 'secListening',                   subLabelKey: 'indSec3', duration: M(30) },
      vocab_only:   null,
      reading_only: null,
    },
  },
};

// ================================================================
// 3. APP STATE
// ================================================================

const State = {
  lang:       'vi',     // Default to Vietnamese
  level:      'N1',
  mode:       'full',
  status:     'idle',   // 'idle' | 'running' | 'break' | 'done'
  phases:     [],
  phaseIndex: 0,
  endTime:    null,
  phaseStart: null,
  rafId:      null,
  holdTimer:  null,
  holdStart:  null,
  warnFired:  false,
  _collapsed: [],
};

// ================================================================
// 4. i18n HELPER
// ================================================================

function t(key, ...args) {
  const dict = I18N[State.lang] || I18N.vi;
  const val  = dict[key] !== undefined ? dict[key] : (I18N.vi[key] ?? key);
  return typeof val === 'function' ? val(...args) : val;
}

// ================================================================
// 5. DOM REFS
// ================================================================

const $ = id => document.getElementById(id);

const dom = {
  progressFill:    $('progress-bar-fill'),
  appTitle:        $('app-title'),
  brandBadge:      $('brand-badge'),
  langSeg:         $('lang-seg'),
  langPill:        $('lang-pill'),
  darkToggle:      $('dark-toggle'),
  labelLevel:      $('label-level'),
  labelMode:       $('label-mode'),
  levelSeg:        $('level-seg'),
  modeSeg:         $('mode-seg'),
  levelPill:       $('level-pill'),
  modePill:        $('mode-pill'),
  levelSection:    $('level-section'),
  modeSection:     $('mode-section'),
  timelineSection: $('timeline-section'),
  timelinePreview: $('timeline-preview'),
  phaseLabel:      $('phase-label'),
  countdown:       $('countdown'),
  subphaseLabel:   $('subphase-label'),
  breakSection:    $('break-phase-section'),
  bsteps:          [null, $('bstep-1'), $('bstep-2'), $('bstep-3')],
  bstepText:       [null, $('bstep-1-text'), $('bstep-2-text'), $('bstep-3-text')],
  startBtn:        $('start-btn'),
  skipBreakBtn:    $('skip-break-btn'),
  skipPhaseBtn:    $('skip-phase-btn'),
  resetBtn:        $('reset-btn'),
  holdText:        $('hold-text'),
  holdFill:        document.querySelector('.hold-fill'),
  warningFlash:    $('warning-flash'),
  btnSec1:         $('btn-sec1'),
  btnVocab:        $('btn-vocab'),
  btnGrammar:      $('btn-grammar'),
  btnVocabOnly:    $('btn-vocab-only'),
  btnReadingOnly:  $('btn-reading-only'),
  btnListening:    $('btn-listening'),
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
  tone(880, t0,        0.6, 'sine', 0.28);
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
  tone(1047, t0,        0.08, 'square', 0.12);
  tone(1047, t0 + 0.14, 0.08, 'square', 0.12);
}

function chimeBreakPhase() {
  ensureAudio();
  const t0 = audioCtx.currentTime;
  tone(392, t0,       1.2, 'sine', 0.22);
  tone(523, t0 + 0.1, 0.9, 'sine', 0.14);
}

function chimeDone() {
  ensureAudio();
  const t0 = audioCtx.currentTime;
  tone(1047, t0,       0.4, 'sine', 0.22);
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
    pillEl.style.left  = (btnRect.left - segRect.left + 2) + 'px';
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
  dom.labelMode.textContent  = t('modeLabel');

  // Mode button texts
  const modeMap = {
    full:         'mFull',
    sec1:         'mSec1',
    vocab_only:   'mVocabOnly',
    reading_only: 'mReadingOnly',
    vocab:        'mVocab',
    grammar:      'mGrammar',
    listening:    'mListening',
  };
  dom.modeSeg.querySelectorAll('.seg-btn').forEach(btn => {
    const key = modeMap[btn.dataset.value];
    if (key) btn.textContent = t(key);
  });

  // Break step indicator labels
  [[1, 'bkStep1Label', 'bkStep1Sub'],
   [2, 'bkStep2Label', 'bkStep2Sub'],
   [3, 'bkStep3Label', 'bkStep3Sub']].forEach(([i, lk, sk]) => {
    dom.bstepText[i].innerHTML = `${t(lk)}<small>${t(sk)}</small>`;
  });

  // Action buttons
  dom.skipBreakBtn.textContent = t('skipBreak');
  dom.skipPhaseBtn.textContent = t('skipPhase');
  dom.holdText.textContent     = t('holdReset');

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
    if (modeCtrl)  modeCtrl.reposition();
    if (langCtrl)  langCtrl.reposition();
  });

  // Save preference
  try { localStorage.setItem('jlpt_lang', State.lang); } catch (_) {}
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

  // Collapse consecutive break phases into single blocks
  const collapsed = [];
  let i = 0;
  while (i < phases.length) {
    if (phases[i].type === 'exam') {
      collapsed.push({ type: 'exam', phase: phases[i] });
      i++;
    } else {
      let total = 0;
      while (i < phases.length && phases[i].type === 'break-phase') {
        total += phases[i].duration;
        i++;
      }
      collapsed.push({ type: 'break', total });
    }
  }

  State._collapsed = collapsed;

  collapsed.forEach((entry, idx) => {
    if (idx > 0) {
      const arrow = document.createElement('span');
      arrow.className   = 'tl-arrow';
      arrow.textContent = '\u2192';
      preview.appendChild(arrow);
    }

    const item = document.createElement('div');
    item.className = 'tl-item';

    const block = document.createElement('div');
    block.dataset.entryIdx = idx;

    if (entry.type === 'exam') {
      const mins  = Math.round(entry.phase.duration / 60);
      const label = t(entry.phase.tlKey || entry.phase.labelKey);
      const unit  = State.lang === 'ja' ? '分' : State.lang === 'vi' ? 'p' : 'm';
      block.className   = 'tl-block exam';
      block.textContent = `${label} \u00b7 ${mins}${unit}`;
    } else {
      const mins = Math.round(entry.total / 60);
      block.className   = 'tl-block brk';
      block.textContent = t('tlBreak', mins);
    }

    item.appendChild(block);
    preview.appendChild(item);
  });

  updateTimelineActive();
}

function updateTimelineActive() {
  if (State.mode !== 'full' || !State._collapsed) return;
  const blocks = dom.timelinePreview.querySelectorAll('.tl-block');

  let flatIdx = 0;
  let activeCollIdx = 0;
  State._collapsed.forEach((entry, ci) => {
    const count = entry.type === 'exam' ? 1 : 3;
    for (let j = 0; j < count; j++) {
      if (flatIdx === State.phaseIndex) activeCollIdx = ci;
      flatIdx++;
    }
  });

  blocks.forEach((b, i) => b.classList.toggle('tl-active', i === activeCollIdx));
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
  State.phases      = resolvePhases();
  State.phaseIndex  = 0;
  State.warnFired   = false;
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
  State.endTime    = Date.now() + State.phases[idx].duration * 1000;
  State.warnFired  = false;
  State.status     = State.phases[idx].type === 'break-phase' ? 'break' : 'running';
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
      : t('breakTitleFrag', t(phase.labelKey));
    document.title = t('titleRunning', formatTime(remainingSec), phaseText, State.level);

    // 5-minute warning notification
    if (!State.warnFired && remainingSec <= M(5) && remainingSec > 0 && phase.type === 'exam') {
      State.warnFired = true;
      chimeWarning();
      flashScreen();
      dom.countdown.classList.add('warning');
    }
    if (remainingSec > M(5)) {
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
  const phase   = State.phases[State.phaseIndex];
  const nextIdx = State.phaseIndex + 1;

  if (phase.type === 'exam') {
    chimePencilsDown();
  } else if (phase.type === 'break-phase') {
    chimeBreakPhase();
  }

  if (nextIdx >= State.phases.length) {
    finishExam();
    return;
  }
  startPhase(nextIdx);
}

function finishExam() {
  State.status  = 'done';
  State.endTime = null;
  dom.phaseLabel.textContent    = t('examComplete');
  dom.countdown.textContent     = '00:00';
  dom.subphaseLabel.textContent = '';
  dom.progressFill.style.width  = '100%';
  document.title = t('titleDone', State.level);
  chimeDone();
  unlockSelectors();
  showDoneState();
}

// ================================================================
// 11. SKIP BREAK LOGIC
// ================================================================

function skipEntireBreak() {
  cancelAnimationFrame(State.rafId);
  let idx = State.phaseIndex;
  while (idx < State.phases.length && State.phases[idx].type === 'break-phase') {
    idx++;
  }
  if (idx >= State.phases.length) {
    finishExam();
    return;
  }
  startPhase(idx);
  chimeStart();
}

function skipCurrentBreakPhase() {
  cancelAnimationFrame(State.rafId);
  const nextIdx = State.phaseIndex + 1;
  if (nextIdx >= State.phases.length) {
    finishExam();
    return;
  }
  const next = State.phases[nextIdx];
  if (next.type === 'break-phase') {
    chimeBreakPhase();
  } else {
    chimeStart();
  }
  startPhase(nextIdx);
}

// ================================================================
// 12. HOLD-TO-RESET (Accidental tap prevention)
// ================================================================

const HOLD_MS = 1500;

function resetAll() {
  cancelAnimationFrame(State.rafId);
  State.status     = 'idle';
  State.endTime    = null;
  State.phases     = [];
  State.phaseIndex = 0;
  dom.countdown.classList.remove('warning');
  dom.progressFill.style.width = '0%';
  document.title = t('titleIdle');
  unlockSelectors();
  updateUI();
  buildTimeline();
}

function setupHoldReset() {
  const btn  = dom.resetBtn;
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

  btn.addEventListener('mousedown',   startHold);
  btn.addEventListener('touchstart',  startHold, { passive: true });
  btn.addEventListener('mouseup',     endHold);
  btn.addEventListener('mouseleave',  endHold);
  btn.addEventListener('touchend',    endHold);
  btn.addEventListener('touchcancel', endHold);
}

// ================================================================
// 13. UI STATE MANAGEMENT
// ================================================================

function updateUI() {
  const isBreak = State.status === 'break';
  const isIdle  = State.status === 'idle';
  const isDone  = State.status === 'done';

  if (isIdle) {
    const upcoming = resolvePhases();
    const firstPhase = upcoming.length > 0 ? upcoming[0] : null;
    if (firstPhase) {
      dom.phaseLabel.textContent    = t(firstPhase.labelKey);
      dom.subphaseLabel.textContent = t(firstPhase.subLabelKey);
      dom.countdown.textContent     = formatTime(firstPhase.duration);
    } else {
      dom.phaseLabel.textContent    = '';
      dom.subphaseLabel.textContent = '';
      dom.countdown.textContent     = '00:00';
    }
    dom.countdown.classList.remove('warning');
    dom.progressFill.style.width = '0%';
  } else if (isDone) {
    dom.phaseLabel.textContent    = t('examComplete');
    dom.countdown.textContent     = '00:00';
    dom.subphaseLabel.textContent = '';
  } else {
    const phase = State.phases[State.phaseIndex];
    if (phase) {
      dom.phaseLabel.textContent = isBreak
        ? t('breakPhaseLabel', phase.phaseNum, t(phase.labelKey))
        : t(phase.labelKey);
      dom.subphaseLabel.textContent = t(phase.subLabelKey);
    } else {
      dom.phaseLabel.textContent    = '';
      dom.subphaseLabel.textContent = '';
    }
  }

  // Break phase 3-step indicator
  if (isBreak) {
    dom.breakSection.classList.remove('hidden');
    const pn = phase.phaseNum;
    for (let i = 1; i <= 3; i++) {
      dom.bsteps[i].classList.remove('active-phase', 'done-phase');
      if (i === pn)    dom.bsteps[i].classList.add('active-phase');
      else if (i < pn) dom.bsteps[i].classList.add('done-phase');
    }
  } else {
    dom.breakSection.classList.add('hidden');
  }

  // Button visibility
  dom.startBtn.classList.toggle('hidden',     !isIdle && !isDone);
  dom.resetBtn.classList.toggle('hidden',     isIdle || isDone);
  dom.skipBreakBtn.classList.toggle('hidden', !isBreak);
  dom.skipPhaseBtn.classList.toggle('hidden', !isBreak);

  dom.startBtn.textContent = isDone ? t('restartBtn') : t('startBtn');
  dom.holdText.textContent = t('holdReset');

  updateTimelineActive();
}

function showDoneState() {
  dom.startBtn.classList.remove('hidden');
  dom.startBtn.textContent = t('restartBtn');
  dom.resetBtn.classList.add('hidden');
  dom.skipBreakBtn.classList.add('hidden');
  dom.skipPhaseBtn.classList.add('hidden');
  dom.breakSection.classList.add('hidden');
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
  if (dom.btnSec1) dom.btnSec1.style.display               = isN12 ? '' : 'none';
  if (dom.btnVocabOnly) dom.btnVocabOnly.style.display     = isN12 ? '' : 'none';
  if (dom.btnReadingOnly) dom.btnReadingOnly.style.display = isN12 ? '' : 'none';
  if (dom.btnVocab) dom.btnVocab.style.display             = isN12 ? 'none' : '';
  if (dom.btnGrammar) dom.btnGrammar.style.display         = isN12 ? 'none' : '';
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

  // Skip break actions
  dom.skipBreakBtn.addEventListener('click', skipEntireBreak);
  dom.skipPhaseBtn.addEventListener('click', skipCurrentBreakPhase);

  // Hold to reset
  setupHoldReset();

  // ResizeObserver to keep all sliding pills positioned accurately on resize
  const ro = new ResizeObserver(() => {
    if (levelCtrl) levelCtrl.reposition();
    if (modeCtrl)  modeCtrl.reposition();
    if (langCtrl)  langCtrl.reposition();
  });
  ro.observe(document.body);

  document.title = t('titleIdle');
}

document.addEventListener('DOMContentLoaded', boot);
