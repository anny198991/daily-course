// ==================== 数据 ====================
const STORE = 'qing-an-rikei-v2';

// 7 条日课
const COURSES = [
  { id: 'c1', glyph: '息', title: '调心守静', note: '每日修心功课，完成直接打卡' },
  { id: 'c2', glyph: '静', title: '澄怀观己', note: '静坐内观，觉察情绪，安定心神' },
  { id: 'c3', glyph: '阅', title: '知新固本', note: '读书日课，一书未完不轻易更换' },
  { id: 'c4', glyph: '书', title: '笔墨日修', note: '隶书练习；浏览练字课程、对标爆款账号' },
  { id: 'c5', glyph: '学', title: '研思精进', note: '课程研习，三选一：一堂创业课、wiki-IP课、影视剧风影音课' },
  { id: 'c6', glyph: '作', title: '一事闭环', note: '每日完成一件核心输出工作，做完自行复盘' },
  { id: 'c7', glyph: '动', title: '舒体养身', note: '运动锻炼，乒乓球40-60分钟' },
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
function render() {
  const today = getTodayState();
  const list = document.getElementById('checkList');

  list.innerHTML = COURSES.map(c => `
    <div class="check-row ${today[c.id] ? 'done' : ''}" data-id="${c.id}">
      <span class="glyph">${c.glyph}</span>
      <span class="glyph-divider"></span>
      <span class="title">${c.title}</span>
      <span class="checkbox">✓</span>
      <div class="tooltip">${c.note}</div>
    </div>
  `).join('');

  // 绑定：单击切换勾选，长按显示备注
  let longPressTimer = null;
  let longPressed = false;

  list.querySelectorAll('.check-row').forEach(row => {
    const clear = () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; } };

    row.addEventListener('click', (e) => {
      // 如果正在显示 tooltip，关掉它但不要改勾选
      if (row.classList.contains('show-tooltip')) {
        row.classList.remove('show-tooltip');
        return;
      }
      toggle(row.dataset.id);
    });

    // 触屏长按
    row.addEventListener('touchstart', () => {
      clear();
      longPressTimer = setTimeout(() => {
        // 关闭其他行的 tooltip
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

function toggle(id) {
  const today = getTodayState();
  today[id] = !today[id];
  save();
  render();
}

// ==================== 初始化 ====================
load();
render();
