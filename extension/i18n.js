/* Safety AI — runtime i18n layer
 *
 * Loaded via <script> in every extension page (popup, options, onboarding, blocked).
 * Uses localStorage as a synchronous cache for the language so the minified
 * bundles can call __i18n.t() at load time; chrome.storage.local keeps the
 * value in sync for the content script.
 */
(function () {
  "use strict";

  var dict = {
    /* ---- common ---- */
    min:            { en: "min",                    zh: "分钟" },
    minutes:        { en: "minutes",                zh: "分钟" },
    allowed:        { en: "Allowed",                zh: "已放行" },
    blocked:        { en: "Blocked",                zh: "已屏蔽" },
    block:          { en: "Block",                  zh: "屏蔽" },
    allow:          { en: "Allow",                  zh: "放行" },
    add:            { en: "Add",                    zh: "添加" },
    continue:       { en: "Continue",               zh: "继续" },
    password:       { en: "Password",               zh: "密码" },
    cancel:         { en: "Cancel",                 zh: "取消" },
    unlock:         { en: "Unlock",                 zh: "解锁" },
    remove:         { en: "Remove",                 zh: "删除" },
    save:           { en: "Save",                   zh: "保存" },
    clear:          { en: "Clear",                  zh: "清除" },
    reset:          { en: "Reset",                  zh: "重置" },
    confirm:        { en: "Confirm",                zh: "确认" },
    wrong_pwd:      { en: "Wrong password. Try again.",  zh: "密码错误，请重试。" },
    child_layer:    { en: "Child protection layer", zh: "儿童保护层" },

    /* ---- popup ---- */
    safe_on:        { en: "SAFE MODE ON",           zh: "安全模式已开启" },
    safe_off:       { en: "SAFE MODE OFF",          zh: "安全模式已关闭" },
    protected:      { en: "Your browsing is protected",  zh: "您的浏览受到保护" },
    prot_disabled:  { en: "Protection is disabled", zh: "保护已关闭" },
    today_time:     { en: "Today's Screen Time",    zh: "今日屏幕使用时间" },
    safety_rems:    { en: "Safety Reminders",       zh: "安全提醒" },
    rem_secrets:    { en: "<strong>Keep secrets safe.</strong> Never share your name, address, school, or passwords with AI.", zh: "<strong>保护隐私。</strong>不要向 AI 透露您的姓名、地址、学校或密码。" },
    rem_check:      { en: "<strong>Check it twice.</strong> AI can be wrong — always verify important answers.", zh: "<strong>再三确认。</strong>AI 可能出错——请务必核实重要答案。" },
    rem_adult:      { en: "<strong>Ask a trusted adult</strong> if something feels confusing or upsetting.", zh: "<strong>遇到困惑或不安时，</strong>请向信任的成年人寻求帮助。" },
    parent_access:  { en: "Parent Access",          zh: "家长访问" },
    enter_pwd_msg:  { en: "Enter the parent password to access settings.", zh: "输入家长密码以访问设置。" },
    limit_reached:  { en: "Limit reached",          zh: "已达上限" },
    min_limit:      { en: "min limit",              zh: "分钟限制" },
    remaining:      { en: "remaining",              zh: "剩余" },
    parent_lock:    { en: "Parent settings",        zh: "家长设置" },

    /* ---- options ---- */
    options_title:  { en: "Safety AI — Parent Settings", zh: "Safety AI — 家长设置" },
    parent_settings: { en: "Parent Settings",       zh: "家长设置" },
    management:     { en: "Safety AI management",   zh: "Safety AI 管理" },
    auth_msg:       { en: "Enter your parent password to access safety settings.", zh: "输入家长密码以访问安全设置。" },
    safe_mode:      { en: "Safe Mode",              zh: "安全模式" },
    safe_mode_desc: { en: "Protects your child while using AI sites", zh: "保护您的孩子在使用 AI 网站时的安全" },
    screen_time:    { en: "Screen Time",            zh: "屏幕使用时间" },
    on_ai_sites:    { en: "on AI sites today",      zh: "今日在 AI 网站上的使用" },
    daily_limit:    { en: "Daily limit:",           zh: "每日限制：" },
    usage_history:  { en: "Usage History",          zh: "使用记录" },
    todays_report:  { en: "Today's Report",         zh: "今日报告" },
    minutes_used:   { en: "Minutes used",           zh: "使用分钟数" },
    keywords_blocked: { en: "Keywords blocked",     zh: "拦截的关键词" },
    export_report:  { en: "Export report as HTML",  zh: "导出 HTML 报告" },
    ai_site_access: { en: "AI Site Access",         zh: "AI 网站访问" },
    sites_desc:     { en: "Allowed sites have keyword filtering active. Blocked sites redirect to a safety page.", zh: "已放行网站启用关键词过滤；已屏蔽网站会重定向到安全提示页面。" },
    add_domain_ph:  { en: "Add a domain (e.g. example.com)", zh: "添加域名（例如 example.com）" },
    blocked_keywords: { en: "Blocked Keywords",     zh: "屏蔽关键词" },
    kw_desc:        { en: "When an AI response contains any keyword below, the page will be blocked until a parent unlocks it.", zh: "当 AI 的回复包含以下任一关键词时，页面将被屏蔽，直到家长解锁。" },
    type_kw_ph:     { en: "Type a keyword...",      zh: "输入关键词..." },
    change_password: { en: "Change Password",       zh: "修改密码" },
    current_pwd_ph: { en: "Current password",       zh: "当前密码" },
    new_pwd_ph:     { en: "New password",           zh: "新密码" },
    confirm_new_pwd_ph: { en: "Confirm new password", zh: "确认新密码" },
    pwd_changed:    { en: "Password changed successfully.", zh: "密码修改成功。" },
    change_pwd_btn: { en: "Change password",        zh: "修改密码" },
    footer_text:    { en: "Safety AI grew from a classroom hackathon project into a<br>production extension — built by students, refined for families.", zh: "Safety AI 从一个课堂黑客松项目成长为<br>正式扩展——由学生开发，为家庭精心打磨。" },
    fill_all:       { en: "Please fill in all fields.", zh: "请填写所有字段。" },
    pwd_incorrect:  { en: "Current password is incorrect.", zh: "当前密码不正确。" },
    pwd_short:      { en: "New password must be at least 4 characters.", zh: "新密码至少需要 4 个字符。" },
    pwd_mismatch:   { en: "New passwords do not match.", zh: "两次输入的新密码不一致。" },
    avg_active_hr:  { en: "Avg/active hr",          zh: "平均/活跃小时" },
    daily_avg_7d:   { en: "Daily avg (7d)",         zh: "日均（7 天）" },
    weekly_avg:     { en: "Weekly avg",             zh: "周均" },
    monthly_avg:    { en: "Monthly avg",            zh: "月均" },
    no_keywords:    { en: "No blocked keywords configured.", zh: "尚未配置屏蔽关键词。" },
    report_title:   { en: "Safety AI Daily Report", zh: "Safety AI 每日报告" },
    allowed_sites:  { en: "Allowed sites",          zh: "已放行网站" },
    blocked_sites:  { en: "Blocked sites",          zh: "已屏蔽网站" },
    on_off:         { en: "ON",                     zh: "开" },
    on_off_off:     { en: "OFF",                    zh: "关" },
    language:       { en: "Language",               zh: "语言" },
    language_desc:  { en: "Choose your preferred language", zh: "选择您偏好的语言" },

    /* ---- onboarding ---- */
    welcome_title:  { en: "Welcome — Safety AI",    zh: "欢迎使用 — Safety AI" },
    step_1:         { en: "Step 1 of 4",            zh: "第 1 步，共 4 步" },
    create_pwd:     { en: "Create a parent password", zh: "创建家长密码" },
    step1_hint:     { en: "This password protects your settings. You'll need it to disable Safe Mode, unlock blocked content, and change time limits.", zh: "此密码保护您的设置。关闭安全模式、解锁被屏蔽的内容和修改时间限制时都需要它。" },
    choose_pwd_ph:  { en: "Choose a password",      zh: "设置密码" },
    confirm_pwd:    { en: "Confirm password",       zh: "确认密码" },
    confirm_pwd_ph: { en: "Confirm your password",  zh: "再次输入密码" },
    step_2:         { en: "Step 2 of 4",            zh: "第 2 步，共 4 步" },
    child_info:     { en: "Tell us about your child", zh: "请告诉我们您孩子的情况" },
    child_age:      { en: "How old is your child?", zh: "您的孩子多大了？" },
    age_ph:         { en: "Age",                    zh: "年龄" },
    ai_use:         { en: "What will they use AI for?", zh: "他们打算用 AI 做什么？" },
    use_research:   { en: "Recreational research",  zh: "休闲研究" },
    use_creativity: { en: "Enhance creativity",     zh: "激发创造力" },
    use_homework:   { en: "Assistance with assignments", zh: "辅助完成作业" },
    use_coding:     { en: "Learning how to code",   zh: "学习编程" },
    use_literature: { en: "Searching for literature", zh: "查找文献资料" },
    step_3:         { en: "Step 3 of 4",            zh: "第 3 步，共 4 步" },
    review_settings: { en: "Review safety settings", zh: "查看安全设置" },
    step3_hint:     { en: "We've suggested settings based on your child's age. You can change these anytime in the extension popup.", zh: "我们已根据您孩子的年龄推荐了设置。您可以随时在扩展弹窗中修改。" },
    ai_sites:       { en: "AI Sites",               zh: "AI 网站" },
    daily_time_limit: { en: "Daily Time Limit",     zh: "每日时间限制" },
    minutes_ph:     { en: "Minutes (e.g. 30)",      zh: "分钟（例如 30）" },
    add_kw_ph:      { en: "Add a keyword...",       zh: "添加关键词..." },
    setup_done:     { en: "Setup complete",         zh: "设置完成" },
    all_set:        { en: "You're all set!",        zh: "一切就绪！" },
    step4_hint:     { en: "Safe Mode is now active. Your child can browse approved AI sites with keyword filtering and screen time tracking enabled.<br><br>You can change any setting by clicking the Safety AI icon in your browser toolbar.", zh: "安全模式现已启用。您的孩子可以浏览获准的 AI 网站，并开启关键词过滤和屏幕使用时间统计。<br><br>您可以通过点击浏览器工具栏中的 Safety AI 图标来修改任何设置。" },
    close_setup:    { en: "Close setup",            zh: "关闭设置" },
    pwd_4chars:     { en: "Password must be at least 4 characters.", zh: "密码至少需要 4 个字符。" },
    pwd_match:      { en: "Passwords do not match.", zh: "两次输入的密码不一致。" },
    setting_up:     { en: "Setting up...",          zh: "正在设置..." },
    valid_age:      { en: "Please enter a valid age (4-17).", zh: "请输入有效年龄（4-17 岁）。" },

    /* ---- blocked page ---- */
    blocked_title:  { en: "Site Blocked — Safety AI", zh: "网站已被屏蔽 — Safety AI" },
    access_restricted: { en: "Access Restricted",   zh: "访问受限" },
    cant_access:    { en: "Sorry, you can't access this website.", zh: "抱歉，您无法访问此网站。" },
    not_approved:   { en: "This AI tool isn't approved for use. Ask a trusted adult if you think you should have access.", zh: "此 AI 工具未获批准使用。如果您认为自己应当获得访问权限，请咨询信任的成年人。" },

    /* ---- content script widget ---- */
    cs_screen_time: { en: "Screen Time",            zh: "屏幕使用时间" },
    cs_safe:        { en: "Safe",                   zh: "安全" },
    cs_0_min:       { en: "0 min",                  zh: "0 分钟" },
    cs_dont_share:  { en: "Don't share personal info", zh: "不要分享个人信息" },
    cs_verify:      { en: "Verify answers &middot; Ask an adult", zh: "核实答案 &middot; 咨询成年人" },
    cs_time_check:  { en: "Screen Time Check",      zh: "屏幕使用时间提醒" },
    cs_online_for:  { en: "You've been online for", zh: "您已在线" },
    cs_break:       { en: "Time for a short break! Stand up, stretch, or grab a drink of water before continuing.", zh: "该休息一下了！站起来伸展一下，或喝口水再继续。" },
    cs_got_it:      { en: "Got it, thanks",         zh: "好的，谢谢" },
    cs_time_limit:  { en: "Time Limit Reached",     zh: "已达到时间限制" },
    cs_time_up:     { en: "Your screen time is up for today.", zh: "您今天的屏幕使用时间已用完。" },
    cs_ask_adult:   { en: "Ask a trusted adult if you need more time. Come back tomorrow!", zh: "如需更多时间，请咨询信任的成年人。明天再来吧！" },
    cs_flagged:     { en: "Flagged Content Detected", zh: "检测到敏感内容" },
    cs_hold_on:     { en: "Hold on — don't keep reading just yet.", zh: "请稍等——先不要继续阅读。" },
    cs_flagged_msg1: { en: "The AI's response contains a flagged topic", zh: "AI 的回复包含敏感话题" },
    cs_flagged_msg2: { en: "Please ask a trusted adult to check whether this content is safe and appropriate before you continue.", zh: "请咨询信任的成年人，确认此内容是否安全、合适后再继续。" },
    cs_parent_unlock: { en: "Parent Unlock",        zh: "家长解锁" },
    cs_parent_pwd:  { en: "Parent password",        zh: "家长密码" },
    cs_wrong_pwd:   { en: "Wrong password.",        zh: "密码错误。" }
  };

  var LANG_KEY = "uiLanguage";
  var lang = "en";
  try { lang = localStorage.getItem(LANG_KEY) === "zh" ? "zh" : "en"; } catch (e) {}

  function t(key) {
    var entry = dict[key];
    if (!entry) return key;
    return entry[lang] !== undefined ? entry[lang] : entry.en;
  }

  function apply(root) {
    /* Keep <html lang> in sync so screen readers pick up the current language. */
    try { document.documentElement.lang = lang; } catch (e) {}
    var scope = root && root.querySelectorAll ? root : document;
    var list = (root && root.querySelectorAll ? root : document).querySelectorAll("[data-i18n]");
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var val = t(el.dataset.i18n);
      if (el.dataset.i18nHtml !== undefined) el.innerHTML = val;
      else el.textContent = val;
    }
    var phs = scope.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < phs.length; j++) phs[j].placeholder = t(phs[j].dataset.i18nPh);
    var titles = scope.querySelectorAll("[data-i18n-title]");
    for (var k = 0; k < titles.length; k++) titles[k].title = t(titles[k].dataset.i18nTitle);
  }

  function setLang(next, done) {
    lang = next === "zh" ? "zh" : "en";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      try {
        var fired = false;
        function finish() {
          if (fired) return;
          fired = true;
          if (done) done();
        }
        chrome.storage.local.set({ uiLanguage: lang }, finish);
        /* Fallback: if the storage callback is never invoked (e.g. extension
           context invalidated), force the reload after 2 s so the bundle can
           re-render dynamic text in the new language. */
        if (done) setTimeout(finish, 2000);
        apply();
        return lang;
      } catch (e) {}
    }
    apply();
    if (done) done();
    return lang;
  }

  function getLang() { return lang; }

  window.__i18n = { t: t, apply: apply, setLang: setLang, getLang: getLang };

  /* ---- synchronous apply (localStorage is the source of truth) ----
     Runs immediately based on localStorage so that `<script defer>` /
     `type="module"` bundles see translated text from their first paint,
     without waiting for the async chrome.storage.local.get round-trip. */
  function scheduleApply() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { apply(); });
    } else {
      apply();
    }
  }
  scheduleApply();

  /* ---- MutationObserver: auto-translate dynamically inserted nodes ----
     When a bundle injects new DOM that contains [data-i18n] elements (e.g.
     site lists, keyword tags, chart labels), the observer re-applies
     translations so those nodes are never left in English. */
  if (typeof MutationObserver !== "undefined") {
    var _moDisconnected = false;
    var _mo = new MutationObserver(function () {
      if (_moDisconnected) return;
      _mo.disconnect();
      _moDisconnected = true;
      apply();
      _moDisconnected = false;
      if (document.documentElement) {
        _mo.observe(document.documentElement, { childList: true, subtree: true });
      }
    });
    if (document.documentElement) {
      _mo.observe(document.documentElement, { childList: true, subtree: true });
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        if (document.documentElement) {
          _mo.observe(document.documentElement, { childList: true, subtree: true });
        }
      });
    }
  }

  /* Sync from chrome.storage (e.g. when changed in another page) and apply.
     localStorage is the synchronous source of truth: it is written before any
     reload and always reflects the latest choice. chrome.storage is only a
     cross-page sync channel, so it must never override localStorage — a stale
     storage value (e.g. when an async write was interrupted by a reload) would
     otherwise overwrite the newer language and get persisted back to
     localStorage. When localStorage has a value we trust it and repair
     storage; storage is only consulted when localStorage is empty (e.g. the
     first page that sets the language). */
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.get([LANG_KEY], function (res) {
      var stored = res && res[LANG_KEY];
      var local = null;
      try { local = localStorage.getItem(LANG_KEY); } catch (e) {}
      if (local === "zh" || local === "en") {
        lang = local;
        if (stored !== local) {
          try { chrome.storage.local.set({ uiLanguage: local }); } catch (e) {}
        }
      } else if (stored === "zh" || stored === "en") {
        lang = stored;
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      }
      /* apply() already ran synchronously via scheduleApply(); re-apply
         here only if the reconciled lang differs from the initial guess
         (first-run case where localStorage was empty). */
      if (lang !== (local === "zh" || local === "en" ? local : "en")) {
        apply();
      }
    });

    /* Live cross-tab sync: when another extension page changes the language,
       update the DOM immediately without a reload. The content script widget
       rebuilds itself via its own onChanged listener. */
    if (chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(function (changes, areaName) {
        if (areaName !== "local" || !changes[LANG_KEY]) return;
        var newVal = changes[LANG_KEY].newValue;
        if (newVal !== lang && (newVal === "zh" || newVal === "en")) {
          lang = newVal;
          try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
          apply();
        }
      });
    }
  }
})();
