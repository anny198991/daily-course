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

// 8 条日课
const COURSES = [
  { id: 'c1', glyph: '息', title: '调心守静', note: '每日修心功课，完成直接打卡' },
  { id: 'c2', glyph: '静', title: '澄怀观己', note: '静坐内观，觉察情绪，安定心神' },
  { id: 'c3', glyph: '阅', title: '知新固本', note: '读书日课，一书未完不轻易更换' },
  { id: 'c4', glyph: '书', title: '笔墨日修', note: '隶书练习；浏览练字课程、对标爆款账号' },
  { id: 'c5', glyph: '学', title: '研思精进', note: '课程研习，三选一：一堂创业课、wiki-IP课、影视剧风影音课' },
  { id: 'c6', glyph: '作', title: '一事闭环', note: '每日完成一件核心输出工作，做完自行复盘' },
  { id: 'c7', glyph: '动', title: '舒体养身', note: '运动锻炼，乒乓球40-60分钟' },
  { id: 'c8', glyph: '展', title: '舒筋活络', note: '拉伸放松，早起或睡前10-15分钟' },
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

  list.innerHTML = COURSES.map(c => {
    const slotId = today[c.id + '_slot'];
    return `
    <div class="check-row ${today[c.id] ? 'done' : ''}" data-id="${c.id}">
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
