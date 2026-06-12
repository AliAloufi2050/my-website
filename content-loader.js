// ========================================
// ملف إدارة المحتوى - يقرأ من JSON ويعرض في الصفحات
// ========================================

// متغير عام يخزن محتوى الموقع
let siteContent = {};

// تحميل محتوى JSON عند بدء الصفحة
fetch('content.json')
    .then(response => response.json())
    .then(data => {
        siteContent = data;
        displayContent();
    })
    .catch(error => {
        console.error('خطأ في تحميل المحتوى:', error);
        document.body.innerHTML += '<p style="color:red;text-align:center">خطأ: لم يتم تحميل محتوى الموقع</p>';
    });

// دالة عرض المحتوى حسب اسم الصفحة
function displayContent() {
    // نعرف اسم الصفحة الحالية من اسم الملف
    const pageName = getCurrentPageName();
    
    // نعرض المحتوى حسب الصفحة
    switch(pageName) {
        case 'index':
            displayHomePage();
            break;
        case 'achievements':
            displayAchievementsPage();
            break;
        case 'projects':
            displayProjectsPage();
            break;
        case 'blog':
            displayBlogPage();
            break;
        case 'contact':
            displayContactPage();
            break;
        default:
            displayHomePage();
    }
    
    // تحديث عنوان المتصفح
    updateBrowserTitle();
}

// جلب اسم الصفحة من عنوان الملف
function getCurrentPageName() {
    const path = window.location.pathname;
    if (path.includes('achievements')) return 'achievements';
    if (path.includes('projects')) return 'projects';
    if (path.includes('blog')) return 'blog';
    if (path.includes('contact')) return 'contact';
    return 'index';
}

// عرض الصفحة الرئيسية
function displayHomePage() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    container.innerHTML = `
        <h1>${siteContent.home.title || 'الرئيسية'}</h1>
        <p>${siteContent.home.welcomeMessage || ''}</p>
        <p>${siteContent.home.intro || ''}</p>
    `;
}

// عرض صفحة الإنجازات
function displayAchievementsPage() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    let achievementsHtml = `<h1>${siteContent.achievements.title || 'الإنجازات'}</h1><ul>`;
    if (siteContent.achievements.list) {
        siteContent.achievements.list.forEach(item => {
            achievementsHtml += `<li>${item}</li>`;
        });
    }
    achievementsHtml += `</ul>`;
    container.innerHTML = achievementsHtml;
}

// عرض صفحة المشاريع
function displayProjectsPage() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    let projectsHtml = `<h1>${siteContent.projects.title || 'المشاريع'}</h1>`;
    if (siteContent.projects.list) {
        siteContent.projects.list.forEach(project => {
            projectsHtml += `
                <div style="border:1px solid #ddd; padding:15px; margin:15px 0; border-radius:10px">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <small>السنة: ${project.year}</small>
                </div>
            `;
        });
    }
    container.innerHTML = projectsHtml;
}

// عرض صفحة المدونة
function displayBlogPage() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    let blogHtml = `<h1>${siteContent.blog.title || 'المدونة'}</h1>`;
    if (siteContent.blog.posts) {
        siteContent.blog.posts.forEach(post => {
            blogHtml += `
                <article style="border-bottom:1px solid #ddd; padding:15px 0">
                    <h3>${post.title}</h3>
                    <small>📅 ${post.date}</small>
                    <p>${post.content}</p>
                </article>
            `;
        });
    }
    container.innerHTML = blogHtml;
}

// عرض صفحة تواصل معي
function displayContactPage() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    container.innerHTML = `
        <h1>${siteContent.contact.title || 'تواصل معي'}</h1>
        <p>${siteContent.contact.message || ''}</p>
        <ul>
            <li>📧 البريد الإلكتروني: ${siteContent.contact.email || ''}</li>
            <li>🐦 تويتر: ${siteContent.contact.twitter || ''}</li>
            <li>📱 واتساب: ${siteContent.contact.whatsapp || ''}</li>
        </ul>
    `;
}

// تحديث عنوان الصفحة في المتصفح
function updateBrowserTitle() {
    const pageName = getCurrentPageName();
    const titles = {
        'index': siteContent.home.title || 'الرئيسية',
        'achievements': siteContent.achievements.title || 'الإنجازات',
        'projects': siteContent.projects.title || 'المشاريع',
        'blog': siteContent.blog.title || 'المدونة',
        'contact': siteContent.contact.title || 'تواصل معي'
    };
    document.title = `${titles[pageName]} | ${siteContent.siteTitle || 'موقعي'}`;
}