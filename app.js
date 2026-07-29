// ==================== 数据层 ====================
const STORE = 'qing-an-rikei-v1';

const DEFAULT = {
  courses: [
    { id: 'c1', text: '静坐一刻', done: false, ink: '静' },
    { id: 'c2', text: '整理一事', done: false, ink: '整' },
    { id: 'c3', text: '完成一件', done: false, ink: '成' },
  ],
  todos: [],
  ideas: [],
  materials: [
    { id: 'm1', name: '书法临帖', desc: '曹全碑 / 凯旋碑', icon: '✎', url: '' },
    { id: 'm2', name: '隶书字库', desc: '常用字结构参考', icon: '竹', url: '' },
    { id: 'm3', name: '文案灵感', desc: '标题 / 钩子库', icon: '❀', url: '' },
    { id: 'm4', name: '图片素材', desc: '生活 / 猫 / 文房', icon: '▣', url: '' },
    { id: 'm5', name: '口播脚本', desc: '问答 / 对话框架', icon: '☯', url: '' },
    { id: 'm6', name: '对标账号', desc: '15个爆款参考', icon: '◈', url: '' },
  ],
  // 对标账号表
  accounts: [
    // 职场转型方向（抖音）
    { id: 'a1', name: '姜Dora', platform: 'douyin', fans: '200万+', url: 'https://www.douyin.com/user/MS4wLjABAAAAH8aGv7GCqh3hk4fPxz72nM_kRXSTLS19kKWX_Gx3SONIKDrcYTjTSAOXJEG5TQeu', topic: '职场转型+个人IP', learnPoint: '二本进大厂→离职做百万网红的故事线，强叙事感', hotCase: '《95后河南女孩》系列，单条破百万赞', frequency: '周更3-4条', status: 'todo', inspire: '学她用"反差人设+真实故事"做钩子，不灌鸡汤', addedAt: '2026-07-28' },
    { id: 'a2', name: '西南Irene', platform: 'xiaohongshu', fans: '6000+', url: '', topic: '大厂8年产品→裸辞gap', learnPoint: '产品经理视角拆解gap期，理性克制不煽情', hotCase: '裸辞第30天系列', frequency: '日更', status: 'todo', inspire: '产品视角写gap，比纯情绪博主更有差异化', addedAt: '2026-07-28' },
    { id: 'a3', name: '阿颖啦', platform: 'xiaohongshu', fans: '1万+', url: '', topic: '100个赞就离职→真离职', learnPoint: '用"对赌式"钩子制造参与感', hotCase: '"100个赞就离职"原帖引爆', frequency: '日更', status: 'todo', inspire: '把决策权交给粉丝，强互动钩子', addedAt: '2026-07-28' },
    // 隶书书法方向（抖音）
    { id: 'a4', name: '小墨爱书法', platform: 'douyin', fans: '113万', url: 'https://www.douyin.com/user/MS4wLjABAAAAH8aGv7GCqh3hk4fPxz72nM_kRXSTLS19kKWX_Gx3SONIKDrcYTjTSAOXJEG5TQeu', topic: '自学书法+国画', learnPoint: '29岁自学起步，画面干净，文房种草自然', hotCase: '获赞1700万，近7天直播54场', frequency: '日更+高频直播', status: 'todo', inspire: '自学人设+高频直播带货文房，路径可参考', addedAt: '2026-07-28' },
    { id: 'a5', name: '钟开勇书法教学', platform: 'douyin', fans: '10万', url: 'https://www.douyin.com/user/MS4wLjABAAAAibUXY7BHgjTP1wVob9KIEvcHQP687qdjsKkef0HVV9w', topic: '篆隶系统教学', learnPoint: '高清慢动作演示+《六种藏锋起笔》系列，教学结构化', hotCase: '《秦篆线条练习法》系列', frequency: '周更', status: 'todo', inspire: '慢动作+结构化拆解，做隶书课可参考', addedAt: '2026-07-28' },
    { id: 'a6', name: '洛羲书法', platform: 'douyin', fans: '5万+', url: '', topic: '隶书入门教程', learnPoint: '《隶书入门基本笔画教程完整篇》合集化', hotCase: '第1集隶书入门系列', frequency: '周更', status: 'todo', inspire: '合集化教学，适合零基础粉丝留存', addedAt: '2026-07-28' },
    // 隶书方向（小红书）
    { id: 'a7', name: '悠然书法', platform: 'xiaohongshu', fans: '5万+', url: '', topic: '曹全碑春联+集字', learnPoint: '节气内容绑定（春联/福字），节点流量抓得准', hotCase: '马年曹全碑春联系列', frequency: '节气更', status: 'todo', inspire: '隶书+节气=天然内容日历，可借鉴', addedAt: '2026-07-28' },
    { id: 'a8', name: '艾薇临帖', platform: 'xiaohongshu', fans: '2万+', url: '', topic: '曹全碑集字+新手教程', learnPoint: '提供A4打印版+米字格版，工具化引流', hotCase: '2025蛇年曹全碑集字春联', frequency: '周更', status: 'todo', inspire: '送模板引流是低成本涨粉手段', addedAt: '2026-07-28' },
    // 职场转型（小红书）
    { id: 'a9', name: '陈曦（化名）', platform: 'xiaohongshu', fans: '3万+', url: '', topic: '裸辞3个月试水自媒体', learnPoint: '失败案例：流量没起来→回去上班，反面教材', hotCase: '《裸辞100天》系列停更', frequency: '已停更', status: 'todo', inspire: '警示：没有差异化定位+没有内容SOP，裸辞做号会失败', addedAt: '2026-07-28' },
  ],
  focus: { today: 0, sessions: 0, log: [] }, // log: {date, minutes}
  review: { note: '' },
};

let S = structuredClone(DEFAULT);

function load() {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) {
      const d = JSON.parse(raw);
      S = { ...structuredClone(DEFAULT), ...d };
      S.courses = d.courses || DEFAULT.courses;
      S.todos = d.todos || [];
      S.ideas = d.ideas || [];
      S.materials = d.materials || DEFAULT.materials;
      S.accounts = d.accounts || DEFAULT.accounts;
      S.focus = d.focus || DEFAULT.focus;
      S.review = d.review || DEFAULT.review;
    }
  } catch(e) { console.error(e); }
}
function save() { localStorage.setItem(STORE, JSON.stringify(S)); }

// ==================== 工具 ====================
const $ = s => document.querySelector(s);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const nowTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
};

// ==================== 渲染 ====================
function renderCourses() {
  const el = $('#dailyCourses');
  el.innerHTML = S.courses.map(c => `
    <div class="course-item ${c.done ? 'done' : ''}" onclick="toggleCourse('${c.id}')">
      <div class="course-check ${c.done ? 'done' : ''}">✓</div>
      <div class="course-text">${c.text}</div>
      <div class="course-ink serif">${c.ink}</div>
    </div>`).join('');
  $('#rvCourse').textContent = `${S.courses.filter(c=>c.done).length}/${S.courses.length}`;
}

function renderTodos() {
  const el = $('#todoList');
  if (S.todos.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">✓</div><div class="empty-text">暂无待办，慢慢添</div></div>`;
  } else {
    el.innerHTML = S.todos.map(t => `
      <div class="todo-item ${t.done ? 'done' : ''}">
        <div class="todo-box ${t.done ? 'done' : ''}" onclick="toggleTodo('${t.id}')">✓</div>
        <div class="todo-body" onclick="toggleTodo('${t.id}')">
          <div class="todo-text">${escapeHtml(t.text)}</div>
          ${t.time ? `<div class="todo-meta">${t.time}</div>` : ''}
        </div>
        <button class="todo-del" onclick="delTodo('${t.id}')">✕</button>
      </div>`).join('');
  }
  const left = S.todos.filter(t => !t.done).length;
  $('#todoCount').textContent = left > 0 ? `待办 ${left}` : '已清空';
  $('#rvTodo').textContent = S.todos.filter(t=>t.done).length;
}

function renderIdeas() {
  const el = $('#ideaGrid');
  if (S.ideas.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">✿</div><div class="empty-text">灵感稍纵即逝，记下它</div></div>`;
  } else {
    el.innerHTML = S.ideas.map(i => `
      <div class="idea-card">
        <div class="idea-text">${escapeHtml(i.text)}</div>
        <div class="idea-foot">
          <span class="idea-time">${i.time}</span>
          <button class="idea-del" onclick="delIdea('${i.id}')">✕</button>
        </div>
      </div>`).join('');
  }
  $('#rvIdea').textContent = S.ideas.length;
}

function renderMaterials() {
  const el = $('#materialGrid');
  el.innerHTML = S.materials.map(m => `
    <div class="material-item" onclick="openMaterial('${m.id}')">
      <div class="material-icon serif">${m.icon}</div>
      <div class="material-name">${m.name}</div>
      <div class="material-desc">${m.desc}</div>
    </div>`).join('');
}

function renderFocus() {
  const t = S.focus.today || 0;
  $('#statToday').textContent = t;
  $('#statSessions').textContent = S.focus.sessions || 0;
  // 本周
  const wk = weekMinutes();
  $('#statWeek').textContent = wk;
  $('#rvFocus').textContent = wk + '分';
}

function weekMinutes() {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const start = monday.toDateString();
  return (S.focus.log || []).filter(l => new Date(l.date).toDateString() >= start)
    .reduce((s, l) => s + l.minutes, 0);
}

function renderReview() {
  // 本周范围
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  $('#weekRange').textContent = `${monday.getMonth()+1}/${monday.getDate()} - ${sunday.getMonth()+1}/${sunday.getDate()}`;
  $('#reviewNote').value = S.review.note || '';
}

function escapeHtml(s) {
  return (s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ==================== 交互 ====================
function toggleCourse(id) {
  const c = S.courses.find(c => c.id === id);
  if (c) { c.done = !c.done; save(); renderCourses(); }
}
function toggleTodo(id) {
  const t = S.todos.find(t => t.id === id);
  if (t) { t.done = !t.done; save(); renderTodos(); }
}
function delTodo(id) {
  S.todos = S.todos.filter(t => t.id !== id);
  save(); renderTodos();
}
function delIdea(id) {
  S.ideas = S.ideas.filter(i => i.id !== id);
  save(); renderIdeas();
}

// ==================== 弹窗 ====================
function openSheet(title, html) {
  $('#sheetTitle').textContent = title;
  $('#sheetBody').innerHTML = html;
  $('#overlay').classList.add('show');
  $('#sheet').classList.add('show');
}
function closeSheet() {
  $('#overlay').classList.remove('show');
  $('#sheet').classList.remove('show');
}

function switchTab(tab) {
  document.querySelectorAll('.nav-tab').forEach(n => n.classList.remove('active'));
  const targetIdx = ['home','todo','idea','material','focus'].indexOf(tab);
  if (targetIdx >= 0) {
    document.querySelectorAll('.nav-tab')[targetIdx].classList.add('active');
  }
  const fab = $('#fab');
  const content = $('#content');

  // 对标账号是独立页面
  if (tab === 'accounts') {
    // 隐藏普通卡片视图，显示对标账号视图
    document.querySelectorAll('.content > .card').forEach(c => c.style.display = 'none');
    document.getElementById('accountsView').style.display = 'block';
    content.scrollTop = 0;
    fab.classList.remove('hidden');
    fab.dataset.tab = 'accounts';
    renderAccounts();
    return;
  }

  // 恢复普通卡片视图
  document.querySelectorAll('.content > .card').forEach(c => c.style.display = '');
  const av = document.getElementById('accountsView');
  if (av) av.style.display = 'none';

  // 滚动到对应模块
  const map = { home:0, todo:1, idea:2, material:3, focus:4 };
  const cards = document.querySelectorAll('.content > .card');
  if (cards[map[tab]]) {
    cards[map[tab]].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // FAB 仅在 待办/灵感/对标 显示
  if (tab === 'todo' || tab === 'idea') {
    fab.classList.remove('hidden');
    fab.dataset.tab = tab;
  } else {
    fab.classList.add('hidden');
  }
}

function onFab() {
  const tab = $('#fab').dataset.tab;
  if (tab === 'todo') openTodoSheet();
  if (tab === 'idea') openIdeaSheet();
  if (tab === 'accounts') openAccountSheet();
}

// 待办弹窗
function openTodoSheet() {
  openSheet('添一笔待办', `
    <div class="field">
      <div class="field-label">待办内容</div>
      <textarea class="field-area" id="todoInput" placeholder="今天想完成什么？"></textarea>
    </div>
    <div class="field">
      <div class="field-label">时间（可选）</div>
      <input class="field-input" id="todoTime" placeholder="如 14:00 / 晚饭后">
    </div>
    <button class="btn-primary" onclick="saveTodo()">记下</button>
  `);
  setTimeout(() => $('#todoInput').focus(), 300);
}
function saveTodo() {
  const text = $('#todoInput').value.trim();
  if (!text) { $('#todoInput').focus(); return; }
  S.todos.unshift({ id: uid(), text, time: $('#todoTime').value.trim(), done: false });
  save(); renderTodos(); closeSheet();
}

// 灵感弹窗
function openIdeaSheet() {
  openSheet('记一瞬灵感', `
    <div class="field">
      <div class="field-label">灵感内容</div>
      <textarea class="field-area" id="ideaInput" placeholder="一个想法、一句文案、一个画面..."></textarea>
    </div>
    <button class="btn-primary" onclick="saveIdea()">收下</button>
  `);
  setTimeout(() => $('#ideaInput').focus(), 300);
}
function saveIdea() {
  const text = $('#ideaInput').value.trim();
  if (!text) { $('#ideaInput').focus(); return; }
  S.ideas.unshift({ id: uid(), text, time: nowTime() });
  save(); renderIdeas(); closeSheet();
}

// 素材入口
function openMaterial(id) {
  const m = S.materials.find(m => m.id === id);
  if (!m) return;
  // 对标账号特殊处理
  if (id === 'm6') { openAccountsView(); return; }
  if (m.url) { window.open(m.url, '_blank'); return; }
  openSheet(m.name, `
    <div style="text-align:center;padding:20px 0">
      <div class="material-icon serif" style="font-size:48px;margin-bottom:12px">${m.icon}</div>
      <div class="serif" style="font-size:18px;color:var(--text-strong);margin-bottom:8px">${m.name}</div>
      <div class="text-soft" style="font-size:14px">${m.desc}</div>
      <div class="text-faint" style="font-size:12px;margin-top:16px;line-height:1.6">
        此入口为占位，可填入你的素材链接或文件<br>在 app.js 的 materials 里配置 url 即可跳转
      </div>
    </div>
    <button class="btn-primary" style="margin-top:16px" onclick="closeSheet()">知道了</button>
  `);
}

// ==================== 对标账号表 ====================
let accountFilter = 'all'; // all / douyin / xiaohongshu

function openAccountsView() {
  // 直接跳转到对标账号专属页面（在主内容区渲染）
  switchTab('accounts');
}

function renderAccounts() {
  const el = document.getElementById('accountsView');
  if (!el) return;
  const filtered = accountFilter === 'all'
    ? S.accounts
    : S.accounts.filter(a => a.platform === accountFilter);

  const platformLabel = { douyin: '抖音', xiaohongshu: '小红书' };
  const statusLabel = { todo: '待拆解', doing: '拆解中', done: '已内化' };
  const statusClass = { todo: 'tag-todo', doing: 'tag-doing', done: 'tag-done' };

  let html = `
    <div class="account-filter-row">
      <div class="filter-chip ${accountFilter==='all'?'active':''}" onclick="setAccountFilter('all')">全部 ${S.accounts.length}</div>
      <div class="filter-chip ${accountFilter==='douyin'?'active':''}" onclick="setAccountFilter('douyin')">抖音 ${S.accounts.filter(a=>a.platform==='douyin').length}</div>
      <div class="filter-chip ${accountFilter==='xiaohongshu'?'active':''}" onclick="setAccountFilter('xiaohongshu')">小红书 ${S.accounts.filter(a=>a.platform==='xiaohongshu').length}</div>
    </div>
  `;

  if (filtered.length === 0) {
    html += `<div class="empty-state"><div class="empty-icon">◈</div><div class="empty-text">暂无账号，点右下角 + 添加</div></div>`;
  } else {
    html += filtered.map(a => `
      <div class="account-card" onclick="openAccountDetail('${a.id}')">
        <div class="account-card-head">
          <div class="account-name serif">${escapeHtml(a.name)}</div>
          <span class="tag-platform ${a.platform==='douyin'?'tag-douyin':'tag-xhs'}">${platformLabel[a.platform]}</span>
        </div>
        <div class="account-row">
          <span class="account-key">粉丝</span>
          <span class="account-val">${escapeHtml(a.fans||'—')}</span>
        </div>
        <div class="account-row">
          <span class="account-key">选题</span>
          <span class="account-val">${escapeHtml(a.topic||'—')}</span>
        </div>
        <div class="account-row">
          <span class="account-key">更新</span>
          <span class="account-val">${escapeHtml(a.frequency||'—')}</span>
        </div>
        <div class="account-card-foot">
          <span class="tag-status ${statusClass[a.status]||'tag-todo'}">${statusLabel[a.status]||'待拆解'}</span>
          <span class="account-arrow">›</span>
        </div>
      </div>
    `).join('');
  }
  el.innerHTML = html;
}

function setAccountFilter(f) {
  accountFilter = f;
  renderAccounts();
}

function openAccountDetail(id) {
  const a = S.accounts.find(x => x.id === id);
  if (!a) return;
  const platformLabel = { douyin: '抖音', xiaohongshu: '小红书' };
  const statusLabel = { todo: '待拆解', doing: '拆解中', done: '已内化' };

  const html = `
    <div class="account-detail">
      <div class="detail-head">
        <div class="detail-name serif">${escapeHtml(a.name)}</div>
        <span class="tag-platform ${a.platform==='douyin'?'tag-douyin':'tag-xhs'}">${platformLabel[a.platform]}</span>
      </div>

      <div class="detail-section">
        <div class="detail-label">粉丝量</div>
        <div class="detail-text">${escapeHtml(a.fans||'—')}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">核心选题</div>
        <div class="detail-text">${escapeHtml(a.topic||'—')}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">可学点</div>
        <div class="detail-text">${escapeHtml(a.learnPoint||'—')}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">爆款拆解</div>
        <div class="detail-text">${escapeHtml(a.hotCase||'—')}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">更新频率</div>
        <div class="detail-text">${escapeHtml(a.frequency||'—')}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">我的启发</div>
        <div class="detail-text">${escapeHtml(a.inspire||'—')}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">状态</div>
        <div class="radio-group" id="acc-status-group">
          <div class="radio-chip ${a.status==='todo'?'active':''}" data-val="todo">待拆解</div>
          <div class="radio-chip ${a.status==='doing'?'active':''}" data-val="doing">拆解中</div>
          <div class="radio-chip ${a.status==='done'?'active':''}" data-val="done">已内化</div>
        </div>
      </div>
      ${a.url ? `<button class="btn-primary" style="margin-top:8px" onclick="window.open('${a.url}','_blank')">打开主页 ↗</button>` : ''}

      <div class="btn-row" style="margin-top:16px">
        <button class="btn-timer ghost" onclick="editAccount('${a.id}')">编辑</button>
        <button class="btn-timer ghost" style="color:var(--ochre)" onclick="delAccount('${a.id}')">删除</button>
      </div>
    </div>
  `;
  openSheet(a.name + ' · 对标账号', html);
  bindRadioGroup('acc-status-group');
  // 状态变更即时保存
  document.querySelectorAll('#acc-status-group .radio-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      a.status = chip.dataset.val;
      save();
      renderAccounts();
    });
  });
}

function bindRadioGroup(id) {
  const group = document.getElementById(id);
  if (!group) return;
  group.querySelectorAll('.radio-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.radio-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

function getRadioVal(id) {
  const group = document.getElementById(id);
  if (!group) return '';
  const active = group.querySelector('.radio-chip.active');
  return active ? active.dataset.val : '';
}

function openAccountSheet(id) {
  const a = id ? S.accounts.find(x => x.id === id) : null;
  const isEdit = !!a;

  const html = `
    <div class="field">
      <div class="field-label">账号名</div>
      <input class="field-input" id="acc-name" value="${a ? escapeHtml(a.name) : ''}" placeholder="如 姜Dora">
    </div>
    <div class="field">
      <div class="field-label">平台</div>
      <div class="radio-group" id="acc-platform-group">
        <div class="radio-chip ${!a || a.platform==='douyin'?'active':''}" data-val="douyin">抖音</div>
        <div class="radio-chip ${a && a.platform==='xiaohongshu'?'active':''}" data-val="xiaohongshu">小红书</div>
      </div>
    </div>
    <div class="field">
      <div class="field-label">粉丝量</div>
      <input class="field-input" id="acc-fans" value="${a ? escapeHtml(a.fans) : ''}" placeholder="如 113万 / 6000+">
    </div>
    <div class="field">
      <div class="field-label">主页链接（可选）</div>
      <input class="field-input" id="acc-url" value="${a ? escapeHtml(a.url||'') : ''}" placeholder="https://...">
    </div>
    <div class="field">
      <div class="field-label">核心选题</div>
      <input class="field-input" id="acc-topic" value="${a ? escapeHtml(a.topic||'') : ''}" placeholder="一句话概括，如 职场转型+个人IP">
    </div>
    <div class="field">
      <div class="field-label">可学点</div>
      <textarea class="field-area" id="acc-learn" placeholder="拆解出的具体手法">${a ? escapeHtml(a.learnPoint||'') : ''}</textarea>
    </div>
    <div class="field">
      <div class="field-label">爆款拆解</div>
      <textarea class="field-area" id="acc-hot" placeholder="哪条最爆？标题？前3秒？">${a ? escapeHtml(a.hotCase||'') : ''}</textarea>
    </div>
    <div class="field">
      <div class="field-label">更新频率</div>
      <input class="field-input" id="acc-freq" value="${a ? escapeHtml(a.frequency||'') : ''}" placeholder="如 日更 / 周更3条">
    </div>
    <div class="field">
      <div class="field-label">我的启发</div>
      <textarea class="field-area" id="acc-inspire" placeholder="这个账号给你什么灵感？">${a ? escapeHtml(a.inspire||'') : ''}</textarea>
    </div>
    <button class="btn-primary" onclick="saveAccount('${id||''}')">${isEdit ? '更新' : '保存'}</button>
  `;
  openSheet(isEdit ? '编辑对标账号' : '新增对标账号', html);
  bindRadioGroup('acc-platform-group');
}

function editAccount(id) { openAccountSheet(id); }

function saveAccount(id) {
  const name = document.getElementById('acc-name').value.trim();
  if (!name) { document.getElementById('acc-name').focus(); return; }
  const data = {
    name,
    platform: getRadioVal('acc-platform-group') || 'douyin',
    fans: document.getElementById('acc-fans').value.trim(),
    url: document.getElementById('acc-url').value.trim(),
    topic: document.getElementById('acc-topic').value.trim(),
    learnPoint: document.getElementById('acc-learn').value.trim(),
    hotCase: document.getElementById('acc-hot').value.trim(),
    frequency: document.getElementById('acc-freq').value.trim(),
    inspire: document.getElementById('acc-inspire').value.trim(),
    status: 'todo',
  };
  if (id) {
    const a = S.accounts.find(x => x.id === id);
    if (a) Object.assign(a, data);
  } else {
    data.id = uid();
    data.addedAt = todayStr();
    S.accounts.unshift(data);
  }
  save();
  closeSheet();
  renderAccounts();
}

function delAccount(id) {
  if (!confirm('确定删除这个对标账号？')) return;
  S.accounts = S.accounts.filter(a => a.id !== id);
  save();
  closeSheet();
  renderAccounts();
}

// ==================== 专注计时 ====================
let timer = { running: false, remain: 25*60, total: 25*60, interval: null };
const ARC_LEN = 364.4; // 2*pi*58

function fmtMMSS(s) {
  const m = Math.floor(s/60), ss = s%60;
  return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
}
function updateArc() {
  const ratio = timer.total > 0 ? (timer.total - timer.remain) / timer.total : 0;
  $('#focusArc').style.strokeDashoffset = ARC_LEN * (1 - ratio);
  $('#focusTime').textContent = fmtMMSS(timer.remain);
}
function toggleTimer() {
  if (timer.running) {
    clearInterval(timer.interval);
    timer.running = false;
    $('#timerToggle').textContent = '继续';
  } else {
    timer.running = true;
    $('#timerToggle').textContent = '暂停';
    timer.interval = setInterval(() => {
      timer.remain--;
      updateArc();
      if (timer.remain <= 0) {
        clearInterval(timer.interval);
        timer.running = false;
        completeFocus(timer.total / 60);
        $('#timerToggle').textContent = '开始';
        timer.remain = timer.total;
        setTimeout(updateArc, 400);
      }
    }, 1000);
  }
}
function resetTimer() {
  clearInterval(timer.interval);
  timer.running = false;
  timer.remain = timer.total;
  $('#timerToggle').textContent = '开始';
  updateArc();
}
function completeFocus(minutes) {
  const m = Math.round(minutes);
  S.focus.today = (S.focus.today || 0) + m;
  S.focus.sessions = (S.focus.sessions || 0) + 1;
  S.focus.log = S.focus.log || [];
  S.focus.log.push({ date: todayStr(), minutes: m });
  save(); renderFocus();
  // 轻提示
  if (navigator.vibrate) navigator.vibrate(200);
}

// ==================== 复盘笔记即时保存 ====================
document.addEventListener('input', e => {
  if (e.target && e.target.id === 'reviewNote') {
    S.review.note = e.target.value;
    save();
  }
});

// ==================== 初始化 ====================
load();
renderCourses();
renderTodos();
renderIdeas();
renderMaterials();
renderAccounts();
renderFocus();
renderReview();
updateArc();
