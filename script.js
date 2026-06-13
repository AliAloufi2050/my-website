// ========================================
// AMA'z ULTRA - المنصة الفائقة الاحترافية
// الإصدار 6.0 - الكود الكامل والمتكامل
// ========================================

// ========================================
// بيانات المستخدمين والرتب
// ========================================
let users = [
    {
        id: 1,
        username: "admin",
        password: "Admin@123",
        email: "admin@amaz.com",
        fullName: "مدير الموقع",
        role: "owner",
        avatar: "👑",
        status: "active",
        createdAt: new Date().toISOString(),
        lastLogin: null,
        permissions: []
    }
];

const roles = {
    owner: { name: "👑 المالك", level: 100, description: "الصلاحية الكاملة", permissions: ["*"], color: "#ffd700" },
    admin: { name: "⚙️ مدير عام", level: 80, description: "إدارة كل شيء عدا المالك", permissions: ["manage_users", "manage_content", "manage_settings", "manage_media", "view_logs", "manage_maintenance", "view_stats"], color: "#ff6b6b" },
    editor: { name: "✍️ محرر", level: 60, description: "إدارة المحتوى", permissions: ["edit_content", "add_content", "delete_content", "manage_blog", "manage_media"], color: "#4ecdc4" },
    moderator: { name: "🛡️ مشرف", level: 40, description: "إدارة التعليقات", permissions: ["manage_comments", "manage_inbox", "view_logs", "view_stats"], color: "#45b7d1" },
    member: { name: "👤 عضو", level: 20, description: "مشاهدة وإضافة تعليقات", permissions: ["view_content", "add_comments"], color: "#96ceb4" },
    viewer: { name: "👁️ زائر", level: 10, description: "مشاهدة فقط", permissions: ["view_content"], color: "#d4a5a5" }
};

// ========================================
// بيانات الموقع الرئيسية
// ========================================
let siteData = {
    stats: { totalVisits: 1247, todayVisits: 43, totalAchievements: 4, totalProjects: 3, totalBlogPosts: 2, lastUpdated: new Date().toISOString() },
    home: { title: "مرحباً بكم في موقع AMA'z", content: "أهلاً وسهلاً بكم في الموقع الرسمي. منصة متكاملة للإنجازات والمشاريع والأفكار." },
    achievements: { title: "🏆 الإنجازات", list: [
        { id: 1, text: "أنشأت أول موقع لي بنفسي", image: "", order: 1 },
        { id: 2, text: "تعلمت HTML و CSS و JavaScript", image: "", order: 2 },
        { id: 3, text: "أكملت 5 مشاريع تدريبية", image: "", order: 3 },
        { id: 4, text: "حصلت على شهادة في أساسيات البرمجة", image: "", order: 4 }
    ] },
    projects: { title: "📁 المشاريع", list: [
        { id: 1, name: "موقع شخصي", desc: "أول موقع أسويه بنفسي", year: "2024", image: "", order: 1 },
        { id: 2, name: "متجر صغير", desc: "موقع تجريبي لمنتجات بسيطة", year: "2024", image: "", order: 2 },
        { id: 3, name: "مدونة تقنية", desc: "أكتب فيها عن تجاربي", year: "2024", image: "", order: 3 }
    ] },
    blog: { title: "✍️ المدونة", posts: [
        { id: 1, title: "كيف بدأت تعلم البرمجة؟", date: "2024-01-15", content: "بدأت رحلتي في تعلم البرمجة عندما قررت أن أصنع شيئاً خاصاً بي.", image: "", comments: [], order: 1 },
        { id: 2, title: "نصيحة للمبتدئين", date: "2024-02-20", content: "لا تستعجل النتائج. أهم شيء الممارسة اليومية.", image: "", comments: [], order: 2 }
    ] },
    contact: { title: "📞 تواصل معي", email: "amaaz@example.com", twitter: "@AMAz", whatsapp: "05XXXXXXXX", message: "أهلاً بك! يسعدني تلقي رسائلك واستفساراتك." },
    media: { images: [] },
    incoming: { 
        messages: [
            { id: 1, userId: null, name: "أحمد", email: "ahmed@example.com", message: "موقع رائع!", subject: "إعجاب", date: new Date().toISOString(), status: "unread" }
        ] 
    },
    settings: { siteName: "AMA'z", siteDescription: "منصة إبداعية متكاملة", adminIdentity: { name: "مدير الموقع", email: "admin@amaz.com", phone: "05XXXXXXXX" }, socialLinks: { facebook: "", instagram: "", linkedin: "", github: "" }, maintenanceMode: false, maintenanceMessage: "الموقع تحت الصيانة، نعتذر عن الإزعاج", registrationEnabled: true, defaultUserRole: "member" },
    adminLogs: []
};

let currentPage = 'home';
let currentUser = null;
let activeAdminTab = 'dashboard';
let nextId = { achievements: 5, projects: 4, blog: 3, images: 1, messages: 2, logs: 1, users: 2 };
let currentLang = 'ar';

// ========================================
// تحميل وحفظ البيانات
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    updateAllTexts();
    loadPage('home');
    setupHamburger();
    addLanguageSelector();
    addThemeToggle();
    recordVisit();
    setupPremiumChatbot();
    initParticles();
    setupMusicPlayer();
    setupSearch();
    setupShare();
    setupNewsletter();
    setupDarkModeFloat();
    initAOS();
    hidePreloader();
    setupCustomCursor();
    setupNotifications();
});

function loadAllData() {
    const savedUsers = localStorage.getItem('amaz_users');
    const savedSiteData = localStorage.getItem('amaz_siteData');
    const savedCurrentUser = localStorage.getItem('amaz_currentUser');
    if (savedUsers) users = JSON.parse(savedUsers);
    if (savedSiteData) siteData = JSON.parse(savedSiteData);
    if (savedCurrentUser) currentUser = JSON.parse(savedCurrentUser);
    if (localStorage.getItem('amaz_nextId')) nextId = JSON.parse(localStorage.getItem('amaz_nextId'));
    if (localStorage.getItem('amaz_language')) currentLang = localStorage.getItem('amaz_language');
    const savedTheme = localStorage.getItem('amaz_theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');
}

function saveAllData() {
    localStorage.setItem('amaz_users', JSON.stringify(users));
    localStorage.setItem('amaz_siteData', JSON.stringify(siteData));
    localStorage.setItem('amaz_currentUser', JSON.stringify(currentUser));
    localStorage.setItem('amaz_nextId', JSON.stringify(nextId));
    updateStats();
}

function updateStats() {
    siteData.stats.totalAchievements = siteData.achievements.list.length;
    siteData.stats.totalProjects = siteData.projects.list.length;
    siteData.stats.totalBlogPosts = siteData.blog.posts.length;
    siteData.stats.lastUpdated = new Date().toISOString();
}

function recordVisit() {
    siteData.stats.totalVisits++;
    siteData.stats.todayVisits++;
    saveAllData();
}

function addLogEntry(action, userId = null) {
    const logUser = userId ? users.find(u => u.id === userId) : currentUser;
    const newId = nextId.logs++;
    siteData.adminLogs.unshift({
        id: newId, action: action, userName: logUser?.username || "unknown",
        userRole: logUser?.role || "unknown", date: new Date().toISOString(), ip: "جهاز محلي"
    });
    saveAllData();
}

// ========================================
// وظائف مساعدة
// ========================================
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        return m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;';
    });
}

function refreshPage() {
    window.location.reload();
}

function resetAllStats() {
    if (confirm('⚠️ تحذير: هذا الإجراء سيعيد تعيين جميع الإحصائيات. هل أنت متأكد؟')) {
        siteData.stats = {
            totalVisits: 0, todayVisits: 0,
            totalAchievements: siteData.achievements.list.length,
            totalProjects: siteData.projects.list.length,
            totalBlogPosts: siteData.blog.posts.length,
            lastUpdated: new Date().toISOString()
        };
        saveAllData();
        addLogEntry('تم إعادة تعيين الإحصائيات');
        alert('✅ تم إعادة تعيين الإحصائيات');
        loadPage('admin');
        switchAdminTab('stats');
    }
}

function hasPermission(permission) {
    if (!currentUser) return false;
    const userRole = roles[currentUser.role];
    if (!userRole) return false;
    if (userRole.permissions.includes('*')) return true;
    return userRole.permissions.includes(permission);
}

// ========================================
// رفع الصور
// ========================================
function uploadImageForItem(type, id) {
    const input = document.getElementById(`image_${type}_${id}`);
    if (input && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (type === 'achievement') {
                const item = siteData.achievements.list.find(a => a.id === id);
                if (item) item.image = e.target.result;
            } else if (type === 'project') {
                const item = siteData.projects.list.find(p => p.id === id);
                if (item) item.image = e.target.result;
            } else if (type === 'blog') {
                const item = siteData.blog.posts.find(b => b.id === id);
                if (item) item.image = e.target.result;
            }
            saveAllData();
            addLogEntry(`رفع صورة لـ ${type}`);
            alert('✅ تم رفع الصورة بنجاح');
            loadPage('admin');
            switchAdminTab('content');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// ========================================
// عرض الصفحات الرئيسية
// ========================================
function loadPage(page) {
    if (siteData.settings.maintenanceMode && (!currentUser || currentUser.role === 'viewer')) {
        document.getElementById('content-container').innerHTML = `<div style="text-align:center; padding:50px;"><h1>🔧 ${siteData.settings.siteName}</h1><p>${siteData.settings.maintenanceMessage}</p></div>`;
        return;
    }
    
    currentPage = page;
    const container = document.getElementById('content-container');
    if (!container) return;
    let html = '';
    
    if (page === 'home') {
        html = `<h1>${siteData.home.title}</h1><p>${siteData.home.content}</p>`;
    } else if (page === 'achievements') {
        html = `<h1>${siteData.achievements.title}</h1><ul>`;
        for (let item of siteData.achievements.list.sort((a,b)=>a.order-b.order)) {
            html += `<li>${item.image ? `<img src="${item.image}">` : '🏆'} ${escapeHtml(item.text)}</li>`;
        }
        html += `</ul>`;
    } else if (page === 'projects') {
        html = `<h1>${siteData.projects.title}</h1>`;
        for (let proj of siteData.projects.list.sort((a,b)=>a.order-b.order)) {
            html += `<div class="project-card"><h3>${escapeHtml(proj.name)}</h3>${proj.image ? `<img src="${proj.image}">` : ''}<p>${escapeHtml(proj.desc)}</p><small>السنة: ${proj.year}</small></div>`;
        }
    } else if (page === 'blog') {
        html = `<h1>${siteData.blog.title}</h1>`;
        for (let post of siteData.blog.posts.sort((a,b)=>a.order-b.order)) {
            html += `<div class="blog-card">${post.image ? `<img src="${post.image}">` : ''}<h3>${escapeHtml(post.title)}</h3><small>📅 ${post.date}</small><p>${escapeHtml(post.content)}</p></div>`;
        }
    } else if (page === 'contact') {
        html = `
            <div class="contact-page">
                <h1>📞 ${siteData.contact.title}</h1>
                <p>${siteData.contact.message}</p>
                
                <div class="contact-grid">
                    <!-- نموذج الاتصال -->
                    <div class="contact-form">
                        <h3>✉️ أرسل رسالة</h3>
                        <form id="contactForm">
                            <input type="text" id="contactName" placeholder="الاسم الكامل" required>
                            <input type="email" id="contactEmail" placeholder="البريد الإلكتروني" required>
                            <input type="text" id="contactSubject" placeholder="الموضوع" required>
                            <textarea id="contactMessage" rows="5" placeholder="نص الرسالة..." required></textarea>
                            <button type="submit">📤 إرسال الرسالة</button>
                            <div id="formStatus" class="form-status"></div>
                        </form>
                    </div>
                    
                    <!-- معلومات التواصل -->
                    <div class="contact-info">
                        <h3>📌 معلومات سريعة</h3>
                        <ul>
                            <li><i class="fas fa-envelope"></i> <strong>البريد الإلكتروني:</strong> <a href="mailto:${siteData.contact.email}">${siteData.contact.email}</a></li>
                            <li><i class="fab fa-twitter"></i> <strong>تويتر:</strong> <a href="https://twitter.com/${siteData.contact.twitter.replace('@', '')}" target="_blank">${siteData.contact.twitter}</a></li>
                            <li><i class="fab fa-whatsapp"></i> <strong>واتساب:</strong> <a href="https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}" target="_blank">${siteData.contact.whatsapp}</a></li>
                        </ul>
                        <p class="response-time"><i class="fas fa-clock"></i> ساعات الرد: خلال 24 ساعة</p>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة حدث إرسال النموذج بعد تحميل الصفحة
        setTimeout(() => {
            const form = document.getElementById('contactForm');
            if (form) {
                form.onsubmit = function(e) {
                    e.preventDefault();
                    const name = document.getElementById('contactName').value;
                    const email = document.getElementById('contactEmail').value;
                    const subject = document.getElementById('contactSubject').value;
                    const message = document.getElementById('contactMessage').value;
                    const statusDiv = document.getElementById('formStatus');
                    
                    if (!name || !email || !subject || !message) {
                        statusDiv.innerHTML = '❌ الرجاء ملء جميع الحقول';
                        statusDiv.className = 'form-status error';
                        return;
                    }
                    
                    statusDiv.innerHTML = 'جاري الإرسال...';
                    statusDiv.className = 'form-status';
                    
                    // حفظ الرسالة في localStorage
                    const newMessage = {
                        id: Date.now(),
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        date: new Date().toISOString(),
                        status: 'unread'
                    };
                    
                    siteData.incoming.messages.push(newMessage);
                    saveAllData();
                    addLogEntry(`رسالة جديدة من ${name}`);
                    
                    statusDiv.innerHTML = '✅ تم إرسال رسالتك بنجاح! سأرد عليك قريباً.';
                    statusDiv.className = 'form-status success';
                    form.reset();
                    
                    // مسح رسالة النجاح بعد 5 ثواني
                    setTimeout(() => {
                        if (statusDiv) {
                            statusDiv.innerHTML = '';
                            statusDiv.className = 'form-status';
                        }
                    }, 5000);
                };
            }
        }, 100);
    } else if (page === 'admin') {
        html = currentUser ? showAdminDashboard() : showLoginForm();
    }
    
    container.innerHTML = html;
    closeMenu();
}

// ========================================
// نظام تسجيل الدخول
// ========================================
function showLoginForm() {
    return `
        <div style="max-width:400px; margin:0 auto;">
            <h1 style="text-align:center;">🔐 دخول لوحة القيادة</h1>
            <div style="background:white; padding:30px; border-radius:20px; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
                <div style="display:flex; flex-direction:column; gap:15px;">
                    <input type="text" id="loginUsername" placeholder="اسم المستخدم" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    <input type="password" id="loginPassword" placeholder="كلمة المرور" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    <button onclick="doLogin()" style="padding:12px; background:linear-gradient(135deg,#667eea,#764ba2); color:white; border:none; border-radius:10px; cursor:pointer;">دخول</button>
                    <hr>
                    <button onclick="showRegisterPage()" style="padding:12px; background:#28a745; color:white; border:none; border-radius:10px; cursor:pointer;">📝 إنشاء حساب جديد</button>
                </div>
                <div id="loginErrorMsg" style="margin-top:20px; text-align:center; color:red;"></div>
            </div>
        </div>
    `;
}

function showRegisterForm() {
    return `
        <div style="max-width:500px; margin:0 auto;">
            <h1 style="text-align:center;">📝 إنشاء حساب جديد</h1>
            <div style="background:white; padding:30px; border-radius:20px; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
                <div style="display:flex; flex-direction:column; gap:15px;">
                    <input type="text" id="regFullName" placeholder="الاسم الكامل" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    <input type="text" id="regUsername" placeholder="اسم المستخدم" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    <input type="email" id="regEmail" placeholder="البريد الإلكتروني" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    <input type="password" id="regPassword" placeholder="كلمة المرور" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    <button onclick="doRegister()" style="padding:12px; background:linear-gradient(135deg,#28a745,#20c997); color:white; border:none; border-radius:10px; cursor:pointer;">إنشاء حساب</button>
                    <button onclick="loadPage('admin')" style="padding:12px; background:#6c757d; color:white; border:none; border-radius:10px; cursor:pointer;">عودة للتسجيل</button>
                </div>
                <div id="regErrorMsg" style="margin-top:20px; text-align:center; color:red;"></div>
                <div id="regSuccessMsg" style="margin-top:20px; text-align:center; color:green;"></div>
            </div>
        </div>
    `;
}

function showRegisterPage() {
    document.getElementById('content-container').innerHTML = showRegisterForm();
}

function doLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user && user.status === 'active') {
        currentUser = user;
        currentUser.lastLogin = new Date().toISOString();
        saveAllData();
        addLogEntry(`تسجيل دخول [${roles[user.role]?.name}]`, user.id);
        loadPage('admin');
    } else if (user && user.status !== 'active') {
        document.getElementById('loginErrorMsg').innerHTML = '❌ الحساب معطل، تواصل مع المدير';
    } else {
        document.getElementById('loginErrorMsg').innerHTML = '❌ اسم المستخدم أو كلمة المرور غير صحيحة';
    }
}

function doRegister() {
    const errorDiv = document.getElementById('regErrorMsg');
    const successDiv = document.getElementById('regSuccessMsg');
    if (errorDiv) errorDiv.innerHTML = '';
    if (successDiv) successDiv.innerHTML = '';
    
    const fullName = document.getElementById('regFullName')?.value.trim();
    const username = document.getElementById('regUsername')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    
    if (!fullName) { if (errorDiv) errorDiv.innerHTML = '❌ الرجاء إدخال الاسم الكامل'; return; }
    if (!username) { if (errorDiv) errorDiv.innerHTML = '❌ الرجاء إدخال اسم المستخدم'; return; }
    if (username.length < 3) { if (errorDiv) errorDiv.innerHTML = '❌ اسم المستخدم يجب أن يكون 3 أحرف على الأقل'; return; }
    if (!email) { if (errorDiv) errorDiv.innerHTML = '❌ الرجاء إدخال البريد الإلكتروني'; return; }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { if (errorDiv) errorDiv.innerHTML = '❌ البريد الإلكتروني غير صحيح'; return; }
    if (!password) { if (errorDiv) errorDiv.innerHTML = '❌ الرجاء إدخال كلمة المرور'; return; }
    if (password.length < 6) { if (errorDiv) errorDiv.innerHTML = '❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل'; return; }
    if (users.find(u => u.username === username)) { if (errorDiv) errorDiv.innerHTML = '❌ اسم المستخدم موجود مسبقاً'; return; }
    if (users.find(u => u.email === email)) { if (errorDiv) errorDiv.innerHTML = '❌ البريد الإلكتروني مستخدم مسبقاً'; return; }
    
    const avatars = ['👤', '👨‍💻', '👩‍💻', '🧑‍🚀', '🦸', '🧙', '🐱', '🦊', '🐼'];
    users.push({
        id: nextId.users++, username, password, email, fullName, role: "member",
        avatar: avatars[Math.floor(Math.random() * avatars.length)], status: "active",
        createdAt: new Date().toISOString(), lastLogin: null, permissions: []
    });
    saveAllData();
    addLogEntry(`حساب جديد: ${username} [عضو]`);
    if (successDiv) successDiv.innerHTML = '✅ تم إنشاء الحساب بنجاح! سيتم تحويلك لتسجيل الدخول...';
    setTimeout(() => { document.getElementById('content-container').innerHTML = showLoginForm(); }, 2000);
}

function logout() {
    if (currentUser) addLogEntry(`تسجيل خروج`, currentUser.id);
    currentUser = null;
    localStorage.removeItem('amaz_currentUser');
    loadPage('home');
}

// ========================================
// لوحة القيادة
// ========================================
function showAdminDashboard() {
    if (!currentUser) return showLoginForm();
    const userRole = roles[currentUser.role];
    const isOwner = currentUser.role === 'owner';
    
    let navButtons = '';
    const sections = [
        { id: 'dashboard', name: '📊 الرئيسية', permission: null },
        { id: 'stats', name: '📈 الإحصائيات', permission: 'view_stats' },
        { id: 'users', name: '👥 المستخدمين', permission: 'manage_users' },
        { id: 'content', name: '📝 المحتوى', permission: 'manage_content' },
        { id: 'comments', name: '💬 الوارد', permission: 'manage_inbox' },
        { id: 'settings', name: '⚙️ الإعدادات', permission: 'manage_settings' },
        { id: 'logs', name: '📜 السجلات', permission: 'view_logs' },
        { id: 'maintenance', name: '🔧 الصيانة', permission: 'manage_maintenance' }
    ];
    for (let s of sections) {
        if (!s.permission || hasPermission(s.permission) || isOwner) {
            navButtons += `<button onclick="switchAdminTab('${s.id}')" style="padding:10px 20px; background:${activeAdminTab === s.id ? '#ffd966' : '#2e5a8e'}; color:${activeAdminTab === s.id ? '#1e3c72' : 'white'}; border:none; border-radius:8px; cursor:pointer;">${s.name}</button>`;
        }
    }
    
    let contentHtml = '';
    switch(activeAdminTab) {
        case 'dashboard': contentHtml = showDashboardHome(); break;
        case 'stats': contentHtml = showStatsSection(); break;
        case 'users': contentHtml = showUsersManagement(); break;
        case 'content': contentHtml = showContentManagement(); break;
        case 'comments': contentHtml = showCommentsAndIncoming(); break;
        case 'settings': contentHtml = showSettingsSection(); break;
        case 'logs': contentHtml = showLogsSection(); break;
        case 'maintenance': contentHtml = showMaintenanceSection(); break;
        default: contentHtml = showDashboardHome();
    }
    
    return `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:20px;">
            <div><h1 style="margin:0;">👑 لوحة القيادة</h1><p style="color:${userRole.color}">${userRole.name} | ${userRole.description}</p></div>
            <div style="display:flex; gap:15px; align-items:center;">
                <div style="text-align:center;"><div style="font-size:30px;">${currentUser.avatar || '👤'}</div><div style="font-weight:bold;">${currentUser.fullName}</div><small>@${currentUser.username}</small></div>
                <button onclick="logout()" style="padding:10px 20px; background:#dc3545; color:white; border:none; border-radius:8px; cursor:pointer;">🚪 خروج</button>
            </div>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:30px; background:#1e3c72; padding:15px; border-radius:10px;">${navButtons}</div>
        <div id="adminSectionContent">${contentHtml}</div>
    `;
}

function showDashboardHome() {
    const unreadCount = siteData.incoming.messages.filter(m => m.status === 'unread').length;
    return `
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:20px; margin-bottom:30px;">
            <div style="background:linear-gradient(135deg,#667eea,#764ba2); color:white; padding:20px; border-radius:15px; text-align:center;"><h2 style="font-size:32px;">${siteData.stats.totalVisits}</h2><p>إجمالي الزيارات</p></div>
            <div style="background:linear-gradient(135deg,#f093fb,#f5576c); color:white; padding:20px; border-radius:15px; text-align:center;"><h2 style="font-size:32px;">${users.length}</h2><p>المستخدمين</p></div>
            <div style="background:linear-gradient(135deg,#4facfe,#00f2fe); color:white; padding:20px; border-radius:15px; text-align:center;"><h2 style="font-size:32px;">${unreadCount}</h2><p>رسائل غير مقروءة</p></div>
            <div style="background:linear-gradient(135deg,#43e97b,#38f9d7); color:#333; padding:20px; border-radius:15px; text-align:center;"><h2 style="font-size:32px;">${siteData.achievements.list.length}</h2><p>الإنجازات</p></div>
        </div>
        <div style="background:var(--light); padding:20px; border-radius:15px;"><h3>📋 آخر النشاطات</h3><ul>${siteData.adminLogs.slice(0,5).map(l=>`<li style="padding:10px; border-bottom:1px solid var(--border);">📌 ${l.action} - ${l.userName} - ${new Date(l.date).toLocaleString('ar-SA')}</li>`).join('')||'<li>لا توجد سجلات</li>'}</ul></div>
    `;
}

function showStatsSection() {
    if (!hasPermission('view_stats') && currentUser?.role !== 'owner') return `<div style="text-align:center; padding:50px; color:red;">⛔ غير مصرح لك</div>`;
    return `
        <div style="padding:20px;">
            <h2>📈 الإحصائيات</h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:15px; margin-bottom:20px;">
                <div style="background:var(--light); padding:15px; border-radius:10px; text-align:center;"><h3>${siteData.stats.totalVisits}</h3><p>زيارات</p></div>
                <div style="background:var(--light); padding:15px; border-radius:10px; text-align:center;"><h3>${siteData.stats.todayVisits}</h3><p>زيارات اليوم</p></div>
                <div style="background:var(--light); padding:15px; border-radius:10px; text-align:center;"><h3>${siteData.achievements.list.length}</h3><p>إنجازات</p></div>
                <div style="background:var(--light); padding:15px; border-radius:10px; text-align:center;"><h3>${siteData.projects.list.length}</h3><p>مشاريع</p></div>
                <div style="background:var(--light); padding:15px; border-radius:10px; text-align:center;"><h3>${siteData.blog.posts.length}</h3><p>تدوينات</p></div>
            </div>
            <button onclick="resetAllStats()" style="padding:12px 20px; background:#dc3545; color:white; border:none; border-radius:10px; cursor:pointer;">🔄 إعادة تعيين الإحصائيات</button>
        </div>
    `;
}

function showUsersManagement() {
    if (!hasPermission('manage_users') && currentUser?.role !== 'owner') return `<div style="text-align:center; padding:50px; color:red;">⛔ غير مصرح لك</div>`;
    let usersHtml = '';
    for (let user of users) {
        const canEdit = currentUser.role === 'owner' || (currentUser.role === 'admin' && user.role !== 'owner');
        usersHtml += `<div style="border:1px solid var(--border); padding:15px; margin:10px 0; border-radius:10px;"><div style="display:flex; justify-content:space-between; flex-wrap:wrap;"><div><div style="display:flex; align-items:center; gap:10px;"><span style="font-size:30px;">${user.avatar||'👤'}</span><div><strong>${user.fullName}</strong><div style="font-size:12px;">@${user.username}</div></div></div><div style="margin-top:10px;"><span style="background:${roles[user.role]?.color}; color:white; padding:3px 10px; border-radius:20px; font-size:12px;">${roles[user.role]?.name}</span><span style="color:${user.status==='active'?'green':'red'}; font-size:12px;"> ${user.status==='active'?'● نشط':'● معطل'}</span></div></div>${canEdit && currentUser.id !== user.id ? `<div style="display:flex; gap:10px;"><select id="role_${user.id}">${Object.entries(roles).map(([k,r])=>`<option value="${k}" ${user.role===k?'selected':''}>${r.name}</option>`).join('')}</select><select id="status_${user.id}"><option value="active" ${user.status==='active'?'selected':''}>نشط</option><option value="inactive" ${user.status==='inactive'?'selected':''}>معطل</option></select><button onclick="updateUser(${user.id})" style="padding:5px 10px; background:#007bff; color:white; border:none; border-radius:5px;">حفظ</button><button onclick="deleteUser(${user.id})" style="padding:5px 10px; background:#dc3545; color:white; border:none; border-radius:5px;">حذف</button></div>` : ''}</div></div>`;
    }
    return `
        <div style="padding:20px;"><h2>👥 إدارة المستخدمين</h2><p>${users.length} مستخدم</p>
        <div style="background:var(--light); padding:20px; border-radius:10px; margin-bottom:20px;"><h3>➕ إضافة مستخدم</h3><div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px;"><input type="text" id="newFullName" placeholder="الاسم"><input type="text" id="newUsername" placeholder="اسم المستخدم"><input type="email" id="newEmail" placeholder="البريد"><input type="password" id="newPassword" placeholder="كلمة المرور"><select id="newRole">${Object.entries(roles).filter(([k])=>k!=='owner').map(([k,r])=>`<option value="${k}">${r.name}</option>`).join('')}</select><button onclick="addUser()" style="background:#28a745; color:white; border:none; border-radius:5px; padding:10px;">إضافة</button></div></div>
        <h3>📋 المستخدمين</h3>${usersHtml}</div>
    `;
}

function addUser() {
    const fullName = document.getElementById('newFullName').value;
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('newRole').value;
    if (!fullName || !username || !email || !password) { alert('❌ ملء جميع الحقول'); return; }
    if (users.find(u => u.username === username)) { alert('❌ اسم مستخدم موجود'); return; }
    users.push({ id: nextId.users++, username, password, email, fullName, role, avatar: '👤', status: 'active', createdAt: new Date().toISOString(), lastLogin: null, permissions: [] });
    saveAllData();
    addLogEntry(`إضافة مستخدم: ${username}`);
    alert('✅ تم الإضافة');
    loadPage('admin');
    switchAdminTab('users');
}

function updateUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.role = document.getElementById(`role_${userId}`).value;
        user.status = document.getElementById(`status_${userId}`).value;
        saveAllData();
        addLogEntry(`تحديث مستخدم: ${user.username}`);
        alert('✅ تم التحديث');
        loadPage('admin');
        switchAdminTab('users');
    }
}

function deleteUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    if (user.role === 'owner') { alert('❌ لا يمكن حذف المالك'); return; }
    if (confirm(`حذف ${user.username}؟`)) {
        users = users.filter(u => u.id !== userId);
        saveAllData();
        addLogEntry(`حذف مستخدم: ${user.username}`);
        alert('✅ تم الحذف');
        loadPage('admin');
        switchAdminTab('users');
    }
}

function showContentManagement() {
    if (!hasPermission('manage_content') && !hasPermission('edit_content') && currentUser?.role !== 'owner') {
        return `<div style="text-align:center; padding:50px; color:red;">⛔ غير مصرح لك</div>`;
    }
    
    let achievementsHtml = '';
    for (let item of siteData.achievements.list) {
        achievementsHtml += `
            <div style="background:var(--light); padding:15px; margin:10px 0; border-radius:10px;">
                <div style="display:flex; gap:15px; flex-wrap:wrap; align-items:center;">
                    ${item.image ? `<img src="${item.image}" style="width:60px; height:60px; border-radius:10px;">` : '<div style="width:60px; height:60px; background:#e2e8f0; border-radius:10px; display:flex; align-items:center; justify-content:center;">🏆</div>'}
                    <input type="text" id="ach_${item.id}" value="${escapeHtml(item.text)}" style="flex:1; padding:10px; border-radius:8px; border:1px solid var(--border);">
                    <input type="file" id="image_achievement_${item.id}" accept="image/*" style="display:none;">
                    <button onclick="document.getElementById('image_achievement_${item.id}').click()" style="padding:8px 15px; background:#667eea; color:white; border:none; border-radius:8px;">📷 رفع</button>
                    <button onclick="uploadImageForItem('achievement', ${item.id})" style="padding:8px 15px; background:#28a745; color:white; border:none; border-radius:8px;">💾 حفظ</button>
                    <button onclick="deleteAchievement(${item.id})" style="padding:8px 15px; background:#dc3545; color:white; border:none; border-radius:8px;">🗑️</button>
                </div>
            </div>
        `;
    }
    
    let projectsHtml = '';
    for (let proj of siteData.projects.list) {
        projectsHtml += `
            <div style="background:var(--light); padding:15px; margin:10px 0; border-radius:10px;">
                ${proj.image ? `<img src="${proj.image}" style="width:100%; max-height:150px; border-radius:10px; margin-bottom:10px;">` : ''}
                <input type="text" id="proj_name_${proj.id}" value="${escapeHtml(proj.name)}" style="width:100%; padding:8px; margin:5px 0; border-radius:8px;">
                <textarea id="proj_desc_${proj.id}" rows="2" style="width:100%; padding:8px; margin:5px 0; border-radius:8px;">${escapeHtml(proj.desc)}</textarea>
                <input type="text" id="proj_year_${proj.id}" value="${proj.year}" style="width:100%; padding:8px; margin:5px 0; border-radius:8px;">
                <input type="file" id="image_project_${proj.id}" accept="image/*" style="display:none;">
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button onclick="document.getElementById('image_project_${proj.id}').click()" style="padding:8px 15px; background:#667eea; color:white; border:none; border-radius:8px;">📷 رفع صورة</button>
                    <button onclick="updateProject(${proj.id})" style="padding:8px 15px; background:#28a745; color:white; border:none; border-radius:8px;">💾 حفظ</button>
                    <button onclick="deleteProject(${proj.id})" style="padding:8px 15px; background:#dc3545; color:white; border:none; border-radius:8px;">🗑️</button>
                </div>
            </div>
        `;
    }
    
    let blogHtml = '';
    for (let post of siteData.blog.posts) {
        blogHtml += `
            <div style="background:var(--light); padding:15px; margin:10px 0; border-radius:10px;">
                ${post.image ? `<img src="${post.image}" style="width:100%; max-height:150px; border-radius:10px; margin-bottom:10px;">` : ''}
                <input type="text" id="post_title_${post.id}" value="${escapeHtml(post.title)}" style="width:100%; padding:8px; margin:5px 0; border-radius:8px;">
                <textarea id="post_content_${post.id}" rows="3" style="width:100%; padding:8px; margin:5px 0; border-radius:8px;">${escapeHtml(post.content)}</textarea>
                <input type="file" id="image_blog_${post.id}" accept="image/*" style="display:none;">
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button onclick="document.getElementById('image_blog_${post.id}').click()" style="padding:8px 15px; background:#667eea; color:white; border:none; border-radius:8px;">📷 رفع صورة</button>
                    <button onclick="updateBlogPost(${post.id})" style="padding:8px 15px; background:#28a745; color:white; border:none; border-radius:8px;">💾 حفظ</button>
                    <button onclick="deleteBlogPost(${post.id})" style="padding:8px 15px; background:#dc3545; color:white; border:none; border-radius:8px;">🗑️</button>
                </div>
            </div>
        `;
    }
    
    return `
        <div style="padding:20px;">
            <h2>📝 إدارة المحتوى</h2>
            <div style="margin-bottom:30px;"><h3>🏆 الإنجازات</h3>${achievementsHtml}<div style="display:flex; gap:10px; margin-top:15px;"><input type="text" id="newAchievement" placeholder="إنجاز جديد" style="flex:1; padding:10px; border-radius:8px;"><button onclick="addAchievement()" style="padding:10px 20px; background:#28a745; color:white; border:none; border-radius:8px;">➕ إضافة</button></div></div>
            <div style="margin-bottom:30px;"><h3>📁 المشاريع</h3>${projectsHtml}<div style="margin-top:15px;"><input type="text" id="newProjectName" placeholder="اسم المشروع" style="width:100%; padding:8px; margin:5px 0;"><textarea id="newProjectDesc" rows="2" placeholder="الوصف" style="width:100%; padding:8px; margin:5px 0;"></textarea><input type="text" id="newProjectYear" placeholder="السنة" style="width:100%; padding:8px; margin:5px 0;"><button onclick="addProject()" style="margin-top:10px; padding:10px 20px; background:#28a745; color:white; border:none; border-radius:8px;">➕ إضافة مشروع</button></div></div>
            <div><h3>✍️ المدونة</h3>${blogHtml}<div style="margin-top:15px;"><input type="text" id="newPostTitle" placeholder="عنوان التدوينة" style="width:100%; padding:8px; margin:5px 0;"><textarea id="newPostContent" rows="3" placeholder="المحتوى" style="width:100%; padding:8px; margin:5px 0;"></textarea><button onclick="addBlogPost()" style="margin-top:10px; padding:10px 20px; background:#28a745; color:white; border:none; border-radius:8px;">➕ إضافة تدوينة</button></div></div>
        </div>
    `;
}

function addAchievement() {
    const text = document.getElementById('newAchievement').value;
    if (text) {
        siteData.achievements.list.push({ id: nextId.achievements++, text: text, image: "", order: siteData.achievements.list.length + 1 });
        saveAllData();
        addLogEntry(`إضافة إنجاز`);
        loadPage('admin');
        switchAdminTab('content');
    } else alert('❌ أدخل النص');
}

function deleteAchievement(id) {
    if (confirm('حذف؟')) {
        siteData.achievements.list = siteData.achievements.list.filter(i => i.id !== id);
        siteData.achievements.list.forEach((item, idx) => item.order = idx + 1);
        saveAllData();
        addLogEntry(`حذف إنجاز`);
        loadPage('admin');
        switchAdminTab('content');
    }
}

function addProject() {
    const name = document.getElementById('newProjectName').value;
    const desc = document.getElementById('newProjectDesc').value;
    const year = document.getElementById('newProjectYear').value;
    if (name && desc && year) {
        siteData.projects.list.push({ id: nextId.projects++, name, desc, year, image: "", order: siteData.projects.list.length + 1 });
        saveAllData();
        addLogEntry(`إضافة مشروع: ${name}`);
        loadPage('admin');
        switchAdminTab('content');
    } else alert('❌ ملء جميع الحقول');
}

function updateProject(id) {
    const project = siteData.projects.list.find(p => p.id === id);
    if (project) {
        project.name = document.getElementById(`proj_name_${id}`).value;
        project.desc = document.getElementById(`proj_desc_${id}`).value;
        project.year = document.getElementById(`proj_year_${id}`).value;
        const fileInput = document.getElementById(`image_project_${id}`);
        if (fileInput && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) { project.image = e.target.result; saveAllData(); alert('✅ تم التحديث مع الصورة'); loadPage('admin'); switchAdminTab('content'); };
            reader.readAsDataURL(fileInput.files[0]);
        } else { saveAllData(); alert('✅ تم التحديث'); loadPage('admin'); switchAdminTab('content'); }
    }
}

function deleteProject(id) {
    if (confirm('حذف المشروع؟')) {
        siteData.projects.list = siteData.projects.list.filter(p => p.id !== id);
        siteData.projects.list.forEach((item, idx) => item.order = idx + 1);
        saveAllData();
        addLogEntry(`حذف مشروع`);
        loadPage('admin');
        switchAdminTab('content');
    }
}

function addBlogPost() {
    const title = document.getElementById('newPostTitle').value;
    const content = document.getElementById('newPostContent').value;
    if (title && content) {
        siteData.blog.posts.push({ id: nextId.blog++, title, content, date: new Date().toISOString().split('T')[0], image: "", comments: [], order: siteData.blog.posts.length + 1 });
        saveAllData();
        addLogEntry(`إضافة تدوينة: ${title}`);
        loadPage('admin');
        switchAdminTab('content');
    } else alert('❌ أدخل عنوان ومحتوى');
}

function updateBlogPost(id) {
    const post = siteData.blog.posts.find(p => p.id === id);
    if (post) {
        post.title = document.getElementById(`post_title_${id}`).value;
        post.content = document.getElementById(`post_content_${id}`).value;
        const fileInput = document.getElementById(`image_blog_${id}`);
        if (fileInput && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) { post.image = e.target.result; saveAllData(); alert('✅ تم التحديث مع الصورة'); loadPage('admin'); switchAdminTab('content'); };
            reader.readAsDataURL(fileInput.files[0]);
        } else { saveAllData(); alert('✅ تم التحديث'); loadPage('admin'); switchAdminTab('content'); }
    }
}

function deleteBlogPost(id) {
    if (confirm('حذف التدوينة؟')) {
        siteData.blog.posts = siteData.blog.posts.filter(p => p.id !== id);
        siteData.blog.posts.forEach((item, idx) => item.order = idx + 1);
        saveAllData();
        addLogEntry(`حذف تدوينة`);
        loadPage('admin');
        switchAdminTab('content');
    }
}

function showCommentsAndIncoming() {
    if (!hasPermission('manage_inbox') && currentUser?.role !== 'owner') return `<div style="text-align:center; padding:50px; color:red;">⛔ غير مصرح لك</div>`;
    
    let userMessages = siteData.incoming.messages;
    if (currentUser?.role !== 'owner') {
        userMessages = siteData.incoming.messages.filter(m => m.userId === currentUser?.id || !m.userId);
    }
    
    let msgs = '';
    for (let msg of userMessages) {
        msgs += `<div style="border:1px solid var(--border); padding:15px; margin:10px 0; border-radius:10px; background:${msg.status==='unread'?'#fff3cd':'var(--light)'}">
            <strong>${escapeHtml(msg.name)}</strong> <small>${new Date(msg.date).toLocaleString('ar-SA')}</small>
            <div>📧 ${escapeHtml(msg.email)}</div>
            <div><strong>الموضوع:</strong> ${escapeHtml(msg.subject || 'بدون موضوع')}</div>
            <p>${escapeHtml(msg.message)}</p>
            <div style="display:flex; gap:10px;">
                ${msg.status==='unread'?`<button onclick="markAsRead(${msg.id})" style="padding:5px 10px; background:#007bff; color:white; border:none; border-radius:5px;">📖 تعليم مقروء</button>`:''}
                <button onclick="deleteMessage(${msg.id})" style="padding:5px 10px; background:#dc3545; color:white; border:none; border-radius:5px;">🗑️ حذف</button>
            </div>
        </div>`;
    }
    
    const unreadCount = userMessages.filter(m => m.status === 'unread').length;
    return `<div style="padding:20px;"><h2>💬 الوارد</h2><p>📬 لديك ${unreadCount} رسائل غير مقروءة</p>${msgs||'<p>لا توجد رسائل</p>'}</div>`;
}

function markAsRead(id) {
    const msg = siteData.incoming.messages.find(m => m.id === id);
    if (msg) { msg.status = 'read'; saveAllData(); loadPage('admin'); switchAdminTab('comments'); }
}

function deleteMessage(id) {
    if (confirm('حذف؟')) { siteData.incoming.messages = siteData.incoming.messages.filter(m => m.id !== id); saveAllData(); loadPage('admin'); switchAdminTab('comments'); }
}

function showSettingsSection() {
    if (!hasPermission('manage_settings') && currentUser?.role !== 'owner') return `<div style="text-align:center; padding:50px; color:red;">⛔ غير مصرح لك</div>`;
    return `<div style="padding:20px;"><h2>⚙️ الإعدادات</h2><div style="background:var(--light); padding:20px; border-radius:10px;"><label>اسم الموقع:</label><input type="text" id="siteName" value="${escapeHtml(siteData.settings.siteName)}" style="width:100%; padding:8px; margin:10px 0; border-radius:8px;"><label>الوصف:</label><textarea id="siteDescription" rows="3" style="width:100%; padding:8px; margin:10px 0; border-radius:8px;">${escapeHtml(siteData.settings.siteDescription)}</textarea><button onclick="saveGeneralSettings()" style="padding:10px 20px; background:#28a745; color:white; border:none; border-radius:8px;">💾 حفظ</button></div></div>`;
}

function saveGeneralSettings() {
    siteData.settings.siteName = document.getElementById('siteName').value;
    siteData.settings.siteDescription = document.getElementById('siteDescription').value;
    saveAllData();
    addLogEntry(`تحديث إعدادات الموقع`);
    alert('✅ تم الحفظ');
}

function showLogsSection() {
    if (!hasPermission('view_logs') && currentUser?.role !== 'owner') return `<div style="text-align:center; padding:50px; color:red;">⛔ غير مصرح لك</div>`;
    let logs = '';
    for (let log of siteData.adminLogs.slice(0,50)) {
        logs += `<tr><td style="padding:8px;">${new Date(log.date).toLocaleString('ar-SA')}</td><td>${log.action}</td><td>${log.userName}</td><td>${log.userRole}</td></tr>`;
    }
    return `<div style="padding:20px; overflow-x:auto;"><h2>📜 السجلات</h2><table style="width:100%; border-collapse:collapse; background:var(--card-bg);"><thead style="background:#1e3c72; color:white;"><th style="padding:10px;">التاريخ</th><th>الإجراء</th><th>المستخدم</th><th>الرتبة</th></thead><tbody>${logs||'<tr><td colspan="4" style="text-align:center;">لا توجد سجلات</td></tr>'}</tbody></table></div>`;
}

function showMaintenanceSection() {
    if (!hasPermission('manage_maintenance') && currentUser?.role !== 'owner') return `<div style="text-align:center; padding:50px; color:red;">⛔ غير مصرح لك</div>`;
    return `<div style="padding:20px;"><h2>🔧 الصيانة</h2><div style="background:var(--light); padding:20px; border-radius:10px;"><div style="display:flex; align-items:center; gap:15px;"><span>الحالة:</span><button onclick="toggleMaintenanceMode()" style="padding:10px 20px; background:${siteData.settings.maintenanceMode?'#dc3545':'#28a745'}; color:white; border:none; border-radius:8px;">${siteData.settings.maintenanceMode?'🔴 مفعل - إيقاف':'🟢 معطل - تفعيل'}</button></div><div style="margin-top:20px;"><label>الرسالة:</label><textarea id="maintenanceMsg" rows="3" style="width:100%; padding:8px; margin-top:10px; border-radius:8px;">${escapeHtml(siteData.settings.maintenanceMessage)}</textarea><button onclick="saveMaintenanceMessage()" style="margin-top:10px; padding:10px 20px; background:#007bff; color:white; border:none; border-radius:8px;">💾 حفظ</button></div></div></div>`;
}

function toggleMaintenanceMode() {
    siteData.settings.maintenanceMode = !siteData.settings.maintenanceMode;
    saveAllData();
    addLogEntry(`${siteData.settings.maintenanceMode?'تفعيل':'إيقاف'} الصيانة`);
    loadPage('admin');
    switchAdminTab('maintenance');
}

function saveMaintenanceMessage() {
    siteData.settings.maintenanceMessage = document.getElementById('maintenanceMsg').value;
    saveAllData();
    alert('✅ تم الحفظ');
}

function switchAdminTab(tabId) { activeAdminTab = tabId; loadPage('admin'); }

// ========================================
// شات بوت متقدم
// ========================================
function setupPremiumChatbot() {
    const trigger = document.getElementById('chatbotTrigger');
    const window = document.getElementById('chatbotWindowUltra');
    const closeBtn = document.getElementById('closeChatUltra');
    const minimizeBtn = document.getElementById('minimizeChat');
    const input = document.getElementById('chatbotInputUltra');
    const sendBtn = document.getElementById('chatbotSendUltra');
    const messagesDiv = document.getElementById('chatbotMessagesUltra');
    const typingDiv = document.getElementById('chatbotTypingUltra');
    
    if (!trigger) return;
    
    trigger.onclick = () => {
        window.classList.toggle('active');
        if (window.classList.contains('active')) input.focus();
    };
    if (closeBtn) closeBtn.onclick = () => window.classList.remove('active');
    if (minimizeBtn) minimizeBtn.onclick = () => window.classList.remove('active');
    
    const knowledge = {
        greetings: ['مرحب', 'هلا', 'سلام', 'اهلا', 'hello', 'hi', 'مرحبا'],
        about: ['من انت', 'وش اسمك', 'who are you', 'bot', 'روبوت'],
        programming: ['برمجة', 'لغة برمجة', 'بايثون', 'جافا', 'javascript', 'html', 'css', 'كود'],
        web: ['موقع', 'تصميم موقع', 'كيف اسوي موقع', 'استضافة', 'تطوير ويب'],
        ai: ['ذكاء اصطناعي', 'ai', 'chatgpt', 'gemini'],
        stats: ['احصائيات', 'زيارات', 'stats', 'إحصائيات', 'أرقام'],
        theme: ['داكن', 'فاتح', 'ثيم', 'مظهر', 'لون', 'dark', 'light'],
        contact: ['تواصل', 'اتصال', 'بريد', 'email', 'واتساب']
    };
    
    const responses = {
        greetings: ["✨ أهلاً وسهلاً! كيف أقدر أساعدك؟", "🤖 مرحباً بك! اسألني أي شيء.", "💫 يا هلا! تفضل اسأل وأنا أجاوبك."],
        about: ["🤖 أنا AMAz Bot، مساعد ذكي متطور! اسألني أي شيء عن الموقع."],
        programming: ["💻 أفضل لغة للمبتدئين هي Python. تريد شرحاً مفصلاً؟"],
        web: ["🌐 لتصميم موقع: HTML، CSS، JavaScript. ترفعه مجاناً على Netlify."],
        ai: ["🧠 الذكاء الاصطناعي يحاكي العقل البشري. أشهر النماذج: ChatGPT و Gemini."],
        stats: [`📊 إجمالي الزيارات: ${siteData?.stats?.totalVisits || 0} | اليوم: ${siteData?.stats?.todayVisits || 0}`],
        theme: ["🎨 اضغط على زر 🌙/☀️ في الأعلى. الوضع الحالي: " + (document.body.classList.contains('dark-mode') ? 'داكن' : 'فاتح')],
        contact: [`📞 البريد: ${siteData?.contact?.email} | واتساب: ${siteData?.contact?.whatsapp}`]
    };
    
    function getResponse(msg) {
        const input = msg.toLowerCase();
        for (let cat in knowledge) {
            for (let word of knowledge[cat]) {
                if (input.includes(word)) {
                    const res = responses[cat];
                    if (res) return res[Math.floor(Math.random() * res.length)];
                }
            }
        }
        return "🤔 سؤال عميق! هل تقصد في مجال البرمجة والتقنية؟ أنا متخصص في هذا المجال.";
    }
    
    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = `message-${isUser ? 'user' : 'bot'}`;
        const time = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute:'2-digit' });
        div.innerHTML = `<div class="message-avatar"><i class="fas fa-${isUser ? 'user' : 'robot'}"></i></div><div class="message-content"><div class="message-bubble">${text}</div><div class="message-time">${time}</div></div>`;
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    function sendMessage() {
        const msg = input.value.trim();
        if (!msg) return;
        addMessage(msg, true);
        input.value = '';
        typingDiv.classList.add('active');
        setTimeout(() => {
            typingDiv.classList.remove('active');
            addMessage(getResponse(msg), false);
        }, 700);
    }
    
    if (sendBtn) sendBtn.onclick = sendMessage;
    if (input) input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    
    document.querySelectorAll('.suggestion-ultra').forEach(btn => {
        btn.onclick = () => { input.value = btn.textContent; sendMessage(); };
    });
}

// ========================================
// مشغل موسيقى YouTube
// ========================================
let ytPlayer = null;
let currentVideoIndex = 0;
let isMusicPlaying = false;

const playlist = [
    { id: '5qap5aO4i9A', title: 'Lofi Hip Hop', artist: 'Chillhop' },
    { id: 'jfKfPfyJRdk', title: 'Calm Piano', artist: 'Relax Daily' },
    { id: 'DWcJFNfaw9c', title: 'Study Beats', artist: 'Lofi Girl' }
];

function loadYouTubeAPI() {
    if (typeof YT === 'undefined') {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    }
}

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtubePlayer', {
        height: '0', width: '0',
        videoId: playlist[currentVideoIndex].id,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1 },
        events: { onStateChange: onPlayerStateChange }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) playNextTrack();
}

function playTrack(index) {
    if (!ytPlayer) return;
    currentVideoIndex = index;
    ytPlayer.loadVideoById(playlist[currentVideoIndex].id);
    ytPlayer.playVideo();
    isMusicPlaying = true;
    updateMusicInfo();
    const playPauseBtn = document.getElementById('playPause');
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function playNextTrack() {
    currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
    playTrack(currentVideoIndex);
}

function playPrevTrack() {
    currentVideoIndex = (currentVideoIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentVideoIndex);
}

function togglePlayPause() {
    if (!ytPlayer) return;
    if (isMusicPlaying) {
        ytPlayer.pauseVideo();
        isMusicPlaying = false;
        document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
    } else {
        ytPlayer.playVideo();
        isMusicPlaying = true;
        document.getElementById('playPause').innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function stopMusic() {
    if (!ytPlayer) return;
    ytPlayer.stopVideo();
    isMusicPlaying = false;
    document.getElementById('playPause').innerHTML = '<i class="fas fa-play"></i>';
}

function updateMusicInfo() {
    const titleEl = document.querySelector('.music-title');
    const artistEl = document.querySelector('.music-artist');
    if (titleEl) titleEl.textContent = playlist[currentVideoIndex].title;
    if (artistEl) artistEl.textContent = playlist[currentVideoIndex].artist;
}

function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const musicControls = document.querySelector('.music-controls');
    const playPauseBtn = document.getElementById('playPause');
    const prevBtn = document.getElementById('prevTrack');
    const nextBtn = document.getElementById('nextTrack');
    const stopBtn = document.getElementById('stopMusic');
    
    loadYouTubeAPI();
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    
    if (musicToggle && musicControls) {
        musicToggle.onclick = () => musicControls.classList.toggle('active');
    }
    if (playPauseBtn) playPauseBtn.onclick = togglePlayPause;
    if (prevBtn) prevBtn.onclick = playPrevTrack;
    if (nextBtn) nextBtn.onclick = playNextTrack;
    if (stopBtn) stopBtn.onclick = stopMusic;
}

// ========================================
// إعدادات إضافية
// ========================================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true }
            },
            retina_detect: true
        });
    }
}

function setupSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (searchToggle && searchOverlay) {
        searchToggle.onclick = () => { searchOverlay.classList.add('active'); setTimeout(() => searchInput.focus(), 100); };
        closeSearch.onclick = () => { searchOverlay.classList.remove('active'); searchInput.value = ''; searchResults.innerHTML = ''; };
        searchOverlay.onclick = (e) => { if (e.target === searchOverlay) searchOverlay.classList.remove('active'); };
        searchInput.oninput = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query.length < 2) { searchResults.innerHTML = ''; return; }
            let results = [];
            siteData.achievements.list.forEach(item => { if (item.text.toLowerCase().includes(query)) results.push({ type: '🏆 إنجاز', title: item.text, page: 'achievements' }); });
            siteData.projects.list.forEach(item => { if (item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)) results.push({ type: '📁 مشروع', title: item.name, page: 'projects' }); });
            siteData.blog.posts.forEach(item => { if (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query)) results.push({ type: '✍️ تدوينة', title: item.title, page: 'blog' }); });
            if (results.length > 0) {
                searchResults.innerHTML = results.map(r => `<div class="search-result-item" onclick="loadPage('${r.page}')"><span class="search-result-type">${r.type}</span><span class="search-result-title">${escapeHtml(r.title)}</span></div>`).join('');
            } else {
                searchResults.innerHTML = '<div class="search-result-empty">لا توجد نتائج</div>';
            }
        };
    }
}

function setupShare() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.onclick = () => {
            if (navigator.share) {
                navigator.share({ title: 'AMA\'z', text: 'منصة إبداعية للإنجازات', url: window.location.href });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('✅ تم نسخ رابط الموقع!');
            }
        };
    }
}

function setupNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter-form button');
    const newsletterInput = document.querySelector('.newsletter-form input');
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.onclick = () => {
            const email = newsletterInput.value.trim();
            if (email && email.includes('@')) { alert('✅ تم الاشتراك!'); newsletterInput.value = ''; }
            else alert('❌ بريد صحيح');
        };
    }
}

function setupDarkModeFloat() {
    const darkModeFloat = document.getElementById('darkModeFloat');
    if (darkModeFloat) darkModeFloat.onclick = () => toggleTheme();
}

function initAOS() {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-in-out' });
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) setTimeout(() => preloader.classList.add('hide'), 1000);
}

function setupCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline) return;
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
    const hoverElements = document.querySelectorAll('a, button, .nav-link, .suggestion-ultra, .floating-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => { cursorDot.classList.add('hover'); cursorOutline.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { cursorDot.classList.remove('hover'); cursorOutline.classList.remove('hover'); });
    });
}

function setupNotifications() {
    const notificationBell = document.getElementById('notificationBell');
    if (notificationBell) {
        notificationBell.onclick = () => {
            const unreadCount = siteData.incoming.messages.filter(m => m.status === 'unread').length;
            alert(`📬 لديك ${unreadCount} رسائل غير مقروءة`);
        };
    }
}

// ========================================
// وظائف الواجهة
// ========================================
function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.onclick = () => { navMenu.classList.toggle('active'); hamburger.classList.toggle('active'); };
    }
}

function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && hamburger) { navMenu.classList.remove('active'); hamburger.classList.remove('active'); }
}

function addLanguageSelector() {
    const navbar = document.querySelector('.navbar');
    if (navbar && !document.getElementById('languageSelect')) {
        const langDiv = document.createElement('div');
        langDiv.className = 'language-selector';
        langDiv.innerHTML = `<select id="languageSelect" onchange="changeLanguage(this.value)"><option value="ar" ${currentLang==='ar'?'selected':''}>🇸🇦 العربية</option><option value="en" ${currentLang==='en'?'selected':''}>🇬🇧 English</option><option value="fr" ${currentLang==='fr'?'selected':''}>🇫🇷 Français</option><option value="es" ${currentLang==='es'?'selected':''}>🇪🇸 Español</option></select>`;
        navbar.appendChild(langDiv);
    }
}

function addThemeToggle() {
    const navbar = document.querySelector('.navbar');
    if (navbar && !document.getElementById('themeToggle')) {
        const themeDiv = document.createElement('div');
        themeDiv.className = 'theme-toggle-container';
        themeDiv.innerHTML = `<button id="themeToggle" onclick="toggleTheme()"><i class="fas fa-moon"></i></button>`;
        navbar.appendChild(themeDiv);
    }
}

function changeLanguage(lang) { currentLang = lang; localStorage.setItem('amaz_language', lang); loadPage(currentPage); }
function toggleTheme() { document.body.classList.toggle('dark-mode'); localStorage.setItem('amaz_theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light'); }
function updateAllTexts() {}

// ========================================
// ربط الدوال العامة
// ========================================
window.loadPage = loadPage;
window.doLogin = doLogin;
window.doRegister = doRegister;
window.showRegisterPage = showRegisterPage;
window.logout = logout;
window.switchAdminTab = switchAdminTab;
window.addUser = addUser;
window.updateUser = updateUser;
window.deleteUser = deleteUser;
window.addAchievement = addAchievement;
window.deleteAchievement = deleteAchievement;
window.addProject = addProject;
window.updateProject = updateProject;
window.deleteProject = deleteProject;
window.addBlogPost = addBlogPost;
window.updateBlogPost = updateBlogPost;
window.deleteBlogPost = deleteBlogPost;
window.markAsRead = markAsRead;
window.deleteMessage = deleteMessage;
window.saveGeneralSettings = saveGeneralSettings;
window.toggleMaintenanceMode = toggleMaintenanceMode;
window.saveMaintenanceMessage = saveMaintenanceMessage;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
window.refreshPage = refreshPage;
window.resetAllStats = resetAllStats;
window.uploadImageForItem = uploadImageForItem;