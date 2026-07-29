// ==================== 数据 ====================
const STORE = 'qing-an-rikei-v2';

// 时段定义（6:00 - 00:00）
const SLOTS = [
  { id: 's1',  epoch: '卯初', start: '06', end: '07' },
  { id: 's2',  epoch: '卯正', start: '07', end: '09' },
  { id: 's3',  epoch: '巳时', start: '09', end: '11' },
  { id: 's4',  epoch: '午时', start: '11', end: '13' },
  { id: 's5',  epoch: '未时', start: '13', end: '15' },
  { id: 's6',  epoch: '申时', start: '15', end: '17' },
  { id: 's7',  epoch: '酉时', start: '17', end: '19' },
  { id: 's8',  epoch: '戌时', start: '19', end: '21' },
  { id: 's9',  epoch: '亥时', start: '21', end: '23' },
  { id: 's10', epoch: '子时', start: '23', end: '00' },
];

// 8 条日课（note 支持富文本，纯文本无链接）
const COURSES = [
  {
    id: 'c1', glyph: '息', title: '调心守静',
    note: `<div class="tp-note">每日修心功课，完成直接打卡</div>`
  },
  {
    id: 'c2', glyph: '静', title: '澄怀观己',
    note: `<div class="tp-note">静坐内观，觉察情绪，安定心神</div>
<div class="tp-section">
  <div class="tp-label">B站冥想跟练</div>
  <div class="tp-item">① 李冉14天冥想计划，重建内心秩序<br><span class="tp-hint">适合gap焦虑情绪修复</span></div>
  <div class="tp-item">② 10分钟零基础正念冥想<br><span class="tp-hint">放下焦虑，0基础直接跟练</span></div>
  <div class="tp-item">③ 6分钟三步呼吸空间<br><span class="tp-hint">快速平复烦躁情绪</span></div>
  <div class="tp-rule">每日任选其一跟练，完成后勾选</div>
</div>`
  },
  {
    id: 'c3', glyph: '阅', title: '知新固本',
    note: `<div class="tp-note">读书日课，一书未完不轻易更换</div>
<div class="tp-section">
  <div class="tp-label">阅读方法论 Skill · 三条固定</div>
  <div class="tp-item">① 一书不终，不启他书<br><span class="tp-hint">曾国藩读书不二，不碎片化跳读</span></div>
  <div class="tp-item">② 问题导向阅读<br><span class="tp-hint">读前写下1个希望解决的问题，围绕问题抓取答案</span></div>
  <div class="tp-item">③ 每日读完输出3条简短笔记<br><span class="tp-hint">摘抄金句或个人感悟，存入素材库</span></div>
</div>
<div class="tp-section">
  <div class="tp-label">推荐书单 · 三类循环选读</div>
  <div class="tp-item">▷ 内心修复 / Gap成长类<br><span class="tp-hint">《认知觉醒》《被讨厌的勇气》《高效能人士七个习惯》</span></div>
  <div class="tp-item">▷ IP内容营销类<br><span class="tp-hint">《1000个铁粉》《打造个人IP》《秒赞》<br>适配 Gap日记账号创作</span></div>
  <div class="tp-item">▷ 国学修身类<br><span class="tp-hint">张宏杰《曾国藩家书》，贴合整套日课底层思想</span></div>
</div>`
  },
  {
    id: 'c4', glyph: '书', title: '笔墨日修',
    note: `<div class="tp-note">隶书练习；浏览练字课程、对标爆款账号</div>
<div class="tp-section">
  <div class="tp-label">练字课程</div>
  <div class="tp-item">陈建忠老师B站隶书课程<br><span class="tp-hint">系统临帖教学，适合隶书入门到进阶</span></div>
  <div class="tp-item">对标账号清单、爆款案例浏览<br><span class="tp-hint">每日练字半小时，浏览对标账号作为拓展</span></div>
</div>`
  },
  {
    id: 'c5', glyph: '学', title: '研思精进',
    note: `<div class="tp-note">课程研习，三选一</div>
<div class="tp-section">
  <div class="tp-item">① 一堂创业课</div>
  <div class="tp-item">② Vikki 超级IP课</div>
  <div class="tp-item">③ 影视飓风系列课</div>
  <div class="tp-rule">每日三选一学习，不求一次性看完，碎片化学完即可打卡</div>
</div>`
  },
  {
    id: 'c6', glyph: '作', title: '一事闭环',
    note: `<div class="tp-note">每日完成一件核心输出工作，做完自行复盘</div>
<div class="tp-section">
  <div class="tp-label">复盘 Skill · 自问三问</div>
  <div class="tp-item">① 今天这件事完成结果是什么</div>
  <div class="tp-item">② 哪里做得好</div>
  <div class="tp-item">③ 下一次如何优化</div>
  <div class="tp-rule">自己笔记记录即可，无需工作台表单</div>
</div>`
  },
  {
    id: 'c7', glyph: '动', title: '舒体养身',
    note: `<div class="tp-note">运动锻炼，乒乓球40-60分钟</div>
<div class="tp-section">
  <div class="tp-rule">身体疲惫允许减量，优先保证微微出汗即可，不必强求时长</div>
</div>`
  },
  {
    id: 'c8', glyph: '展', title: '舒筋活络',
    note: `<div class="tp-note">拉伸放松，早起或睡前10-15分钟</div>`
  },
];

// 状态：按日期存 { c1: true, c2: false, ... }
let state = {};

function load() {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) state = JSON.parse(raw);
  } catch(e) { console.error(e); }
}

function save() {
  localStorage.setItem(STORE, JSON.stringify(state));
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getTodayState() {
  const key = todayKey();
  if (!state[key]) state[key] = {};
  return state[key];
}

// ==================== 渲染 ====================
let currentEditingCourse = null; // 当前正在选时间的课程

function getSlotById(slotId) {
  return SLOTS.find(s => s.id === slotId);
}

function slotLabel(slotId) {
  if (!slotId) return '时段';
  const s = getSlotById(slotId);
  return `<span class="tag-epoch">${s.epoch}</span><span class="tag-time">${s.start}-${s.end}</span>`;
}

function render() {
  const today = getTodayState();
  const list = document.getElementById('checkList');

  list.innerHTML = COURSES.map((c, idx) => {
    const slotId = today[c.id + '_slot'];
    const num = String(idx + 1).padStart(2, '0');
    return `
    <div class="check-row ${today[c.id] ? 'done' : ''}" data-id="${c.id}">
      <span class="row-num">${num}</span>
      <span class="glyph">${c.glyph}</span>
      <span class="glyph-divider"></span>
      <span class="title">${c.title}</span>
      <span class="time-tag ${slotId ? 'has-time' : ''}" data-course="${c.id}">
        ${slotLabel(slotId)}
      </span>
      <span class="checkbox">✓</span>
      <div class="tooltip">${c.note}</div>
    </div>
  `}).join('');

  // 绑定：单击切换勾选，长按显示备注
  let longPressTimer = null;

  list.querySelectorAll('.check-row').forEach(row => {
    const clear = () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; } };

    // 时间标签点击 → 弹底部选择器
    row.querySelector('.time-tag').addEventListener('click', (e) => {
      e.stopPropagation();
      openTimeSheet(row.dataset.id);
    });

    row.addEventListener('click', (e) => {
      if (row.classList.contains('show-tooltip')) {
        row.classList.remove('show-tooltip');
        return;
      }
      // 点的是时间标签就不切换勾选
      if (e.target.closest('.time-tag')) return;
      toggle(row.dataset.id);
    });

    // 触屏长按
    row.addEventListener('touchstart', () => {
      clear();
      longPressTimer = setTimeout(() => {
        document.querySelectorAll('.check-row.show-tooltip').forEach(r => r.classList.remove('show-tooltip'));
        row.classList.add('show-tooltip');
      }, 500);
    }, { passive: true });
    row.addEventListener('touchend', clear);
    row.addEventListener('touchmove', clear);
    row.addEventListener('touchcancel', clear);
  });

  // 点击其他位置关闭所有 tooltip
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.check-row')) {
      document.querySelectorAll('.check-row.show-tooltip').forEach(r => r.classList.remove('show-tooltip'));
    }
  });

  // 日期
  const d = new Date();
  const weekDays = ['日','一','二','三','四','五','六'];
  document.getElementById('dateText').textContent =
    `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 · 星期${weekDays[d.getDay()]}`;

  // 计数
  const done = COURSES.filter(c => today[c.id]).length;
  document.getElementById('countText').textContent = `${done} / ${COURSES.length}`;
}

// ==================== 底部时间选择器 ====================
function openTimeSheet(courseId) {
  currentEditingCourse = courseId;
  const today = getTodayState();
  const currentSlot = today[courseId + '_slot'];

  const course = COURSES.find(c => c.id === courseId);
  document.getElementById('sheetTitle').textContent = course ? `${course.glyph} · ${course.title}` : '选择时段';

  const optionsHtml = SLOTS.map(s => `
    <div class="time-option ${s.id === currentSlot ? 'selected' : ''}" data-slot="${s.id}">
      <span class="opt-epoch">${s.epoch}</span>
      <span class="opt-range">${s.start}:00 - ${s.end}:00</span>
      <span class="opt-check">✓</span>
    </div>
  `).join('');

  document.getElementById('timeOptions').innerHTML = optionsHtml;

  // 绑定选项点击
  document.querySelectorAll('.time-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const slotId = opt.dataset.slot;
      today[currentEditingCourse + '_slot'] = slotId;
      save();
      closeTimeSheet();
      render();
    });
  });

  document.getElementById('sheetBackdrop').classList.add('show');
  document.getElementById('timeSheet').classList.add('show');
}

function closeTimeSheet() {
  document.getElementById('sheetBackdrop').classList.remove('show');
  document.getElementById('timeSheet').classList.remove('show');
  currentEditingCourse = null;
}

// 背景点击关闭
document.getElementById('sheetBackdrop').addEventListener('click', closeTimeSheet);

// 清除时间
document.getElementById('sheetClear').addEventListener('click', () => {
  if (!currentEditingCourse) return;
  const today = getTodayState();
  delete today[currentEditingCourse + '_slot'];
  save();
  closeTimeSheet();
  render();
});

function toggle(id) {
  const today = getTodayState();
  today[id] = !today[id];
  save();
  render();
}

// ==================== 初始化 ====================
load();
render();
