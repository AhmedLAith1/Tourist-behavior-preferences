/**
 * نظام تحليل تفضيلات السياح لآثار بابل - ملف JavaScript الرئيسي
 * 
 * هذا الملف يحتوي على كافة الوظائف والمنطق البرمجي للواجهة الأمامية للنظام،
 * بما في ذلك عرض الأسئلة، وتخزين الإجابات، والتواصل مع الخادم، وعرض النتائج.
 */

// متغيرات عامة
let currentQuestionIndex = 0;
let userAnswers = {};
let recommendations = [];
let allSites = [];

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة النظام
    initializeSystem();
    
    // إضافة مستمعي الأحداث للأزرار الرئيسية
    document.getElementById('start-survey-btn').addEventListener('click', startSurvey);
    document.getElementById('view-sites-btn').addEventListener('click', showSitesSection);
    document.getElementById('home-link').addEventListener('click', showWelcomeSection);
    document.getElementById('about-link').addEventListener('click', showAboutSection);
    document.getElementById('sites-link').addEventListener('click', showSitesSection);
    document.getElementById('next-question-btn').addEventListener('click', goToNextQuestion);
    document.getElementById('prev-question-btn').addEventListener('click', goToPrevQuestion);
    document.getElementById('restart-survey-btn').addEventListener('click', restartSurvey);
    document.getElementById('export-coordinates-btn').addEventListener('click', showExportCoordinatesModal);
    document.getElementById('export-itinerary-btn').addEventListener('click', exportItinerary);
    document.getElementById('days-select').addEventListener('change', updateItinerary);
    document.getElementById('search-btn').addEventListener('click', searchSites);
    document.getElementById('filter-select').addEventListener('change', filterSites);
    document.getElementById('copy-coordinates-btn').addEventListener('click', copyCoordinatesData);
    document.getElementById('download-coordinates-btn').addEventListener('click', downloadCoordinatesData);
    document.getElementById('coordinates-format').addEventListener('change', updateCoordinatesFormat);
    
    // تحميل بيانات المواقع من ملف البيانات
    allSites = babylonSites;
});

/**
 * تهيئة النظام
 */
function initializeSystem() {
    // عرض قسم الترحيب
    showWelcomeSection();
    
    // تهيئة قسم المواقع الأثرية
    populateSitesSection();
}

/**
 * عرض قسم الترحيب
 */
function showWelcomeSection() {
    hideAllSections();
    document.getElementById('welcome-section').classList.remove('d-none');
    document.getElementById('home-link').classList.add('active');
}

/**
 * عرض قسم حول النظام
 */
function showAboutSection() {
    hideAllSections();
    document.getElementById('about-section').classList.remove('d-none');
    document.getElementById('about-link').classList.add('active');
}

/**
 * عرض قسم المواقع الأثرية
 */
function showSitesSection() {
    hideAllSections();
    document.getElementById('sites-section').classList.remove('d-none');
    document.getElementById('sites-link').classList.add('active');
}

/**
 * إخفاء جميع الأقسام
 */
function hideAllSections() {
    document.getElementById('welcome-section').classList.add('d-none');
    document.getElementById('survey-section').classList.add('d-none');
    document.getElementById('results-section').classList.add('d-none');
    document.getElementById('sites-section').classList.add('d-none');
    document.getElementById('about-section').classList.add('d-none');
    
    // إزالة التنشيط من روابط التنقل
    document.getElementById('home-link').classList.remove('active');
    document.getElementById('about-link').classList.remove('active');
    document.getElementById('sites-link').classList.remove('active');
}

/**
 * بدء الاستبيان
 */
function startSurvey() {
    hideAllSections();
    document.getElementById('survey-section').classList.remove('d-none');
    
    // إعادة تعيين الإجابات والسؤال الحالي
    userAnswers = {};
    currentQuestionIndex = 0;
    
    // عرض السؤال الأول
    displayCurrentQuestion();
}

/**
 * عرض السؤال الحالي
 */
function displayCurrentQuestion() {
    const question = surveyQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const progressBar = document.getElementById('progress-bar');
    const prevButton = document.getElementById('prev-question-btn');
    const nextButton = document.getElementById('next-question-btn');
    
    // تعيين نص السؤال
    questionText.textContent = question.text;
    
    // تحديث عداد الأسئلة
    questionCounter.textContent = `السؤال ${currentQuestionIndex + 1} من ${surveyQuestions.length}`;
    
    // تحديث شريط التقدم
    const progressPercentage = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    
    // إنشاء خيارات الإجابة
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option-btn';
        optionButton.textContent = option;
        optionButton.dataset.index = index;
        
        // إذا كان المستخدم قد أجاب على هذا السؤال سابقاً، حدد الخيار المناسب
        if (userAnswers[question.id] === index) {
            optionButton.classList.add('selected');
        }
        
        // إضافة مستمع الحدث للخيار
        optionButton.addEventListener('click', function() {
            selectOption(question.id, index);
        });
        
        optionsContainer.appendChild(optionButton);
    });
    
    // تحديث حالة أزرار التنقل
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = userAnswers[question.id] === undefined;
    
    // إذا كان هذا هو السؤال الأخير، غير نص زر "التالي" إلى "عرض النتائج"
    if (currentQuestionIndex === surveyQuestions.length - 1) {
        nextButton.textContent = 'عرض النتائج';
        nextButton.innerHTML = 'عرض النتائج <i class="fas fa-chart-bar ms-2"></i>';
    } else {
        nextButton.textContent = 'السؤال التالي';
        nextButton.innerHTML = 'السؤال التالي <i class="fas fa-arrow-left ms-2"></i>';
    }
}

/**
 * اختيار خيار إجابة
 * @param {number} questionId - معرف السؤال
 * @param {number} optionIndex - فهرس الخيار المحدد
 */
function selectOption(questionId, optionIndex) {
    // تخزين إجابة المستخدم
    userAnswers[questionId] = optionIndex;
    
    // تحديث مظهر الخيارات
    const optionButtons = document.querySelectorAll('#options-container .option-btn');
    optionButtons.forEach(button => {
        if (parseInt(button.dataset.index) === optionIndex) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
    
    // تمكين زر "التالي"
    document.getElementById('next-question-btn').disabled = false;
}

/**
 * الانتقال إلى السؤال التالي
 */
function goToNextQuestion() {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
        // الانتقال إلى السؤال التالي
        currentQuestionIndex++;
        displayCurrentQuestion();
    } else {
        // عرض النتائج
        generateRecommendations();
    }
}

/**
 * الانتقال إلى السؤال السابق
 */
function goToPrevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

/**
 * توليد التوصيات بناءً على إجابات المستخدم
 */
function generateRecommendations() {
    // في هذه النسخة المستقلة، سنستخدم خوارزمية بسيطة لتوليد التوصيات
    // بدلاً من الاتصال بالخادم
    
    // حساب درجة التطابق لكل موقع
    const siteScores = allSites.map(site => {
        let score = 0;
        
        // نوع الموقع (السؤال 1)
        if (userAnswers[1] === 0 && site.type.includes("معبد")) { // المعابد
            score += 2;
        } else if (userAnswers[1] === 1 && site.type.includes("قصر")) { // القصور
            score += 2;
        } else if (userAnswers[1] === 2 && (site.type.includes("سور") || site.type.includes("بوابة"))) { // الأسوار والبوابات
            score += 2;
        } else if (userAnswers[1] === 3 && site.type.includes("متحف")) { // المتاحف
            score += 2;
        } else if (userAnswers[1] === 4) { // أخرى
            score += 1;
        }
        
        // الفترة التاريخية (السؤال 2)
        if (userAnswers[2] === 0 && site.period.includes("القديم") && !site.period.includes("الحديث")) { // العصر البابلي القديم
            score += 2;
        } else if (userAnswers[2] === 1 && site.period.includes("الحديث") && !site.period.includes("القديم")) { // العصر البابلي الحديث
            score += 2;
        } else if (userAnswers[2] === 2 && site.period.includes("القديم") && site.period.includes("الحديث")) { // كلاهما
            score += 2;
        } else if (userAnswers[2] === 3) { // لا يهم
            score += 1;
        }
        
        // مدة الزيارة (السؤال 3)
        if (userAnswers[3] === 0 && site.visit_duration < 30) { // قصيرة
            score += 2;
        } else if (userAnswers[3] === 1 && site.visit_duration >= 30 && site.visit_duration <= 60) { // متوسطة
            score += 2;
        } else if (userAnswers[3] === 2 && site.visit_duration > 60 && site.visit_duration <= 120) { // طويلة
            score += 2;
        } else if (userAnswers[3] === 3 && site.visit_duration > 120) { // طويلة جداً
            score += 2;
        }
        
        // الشهرة (السؤال 4)
        if (userAnswers[4] === 0 && site.popularity >= 9.0) { // الشهيرة جداً
            score += 2;
        } else if (userAnswers[4] === 1 && site.popularity >= 8.0 && site.popularity < 9.0) { // الشهيرة
            score += 2;
        } else if (userAnswers[4] === 2 && site.popularity >= 7.0 && site.popularity < 8.0) { // متوسطة الشهرة
            score += 2;
        } else if (userAnswers[4] === 3 && site.popularity < 7.0) { // الأقل شهرة
            score += 2;
        }
        
        // سهولة الوصول (السؤال 5)
        if (userAnswers[5] === 0 && site.accessibility >= 9.0) { // مهم جداً
            score += 2;
        } else if (userAnswers[5] === 1 && site.accessibility >= 8.0 && site.accessibility < 9.0) { // مهم
            score += 2;
        } else if (userAnswers[5] === 2 && site.accessibility >= 7.0 && site.accessibility < 8.0) { // متوسط الأهمية
            score += 2;
        } else if (userAnswers[5] === 3) { // غير مهم
            score += 1;
        }
        
        // رسوم الدخول (السؤال 6)
        if (userAnswers[6] === 0 && site.entrance_fee === 0) { // مجاني
            score += 2;
        } else if (userAnswers[6] === 1 && site.entrance_fee > 0 && site.entrance_fee <= 5) { // منخفضة
            score += 2;
        } else if (userAnswers[6] === 2 && site.entrance_fee > 5 && site.entrance_fee <= 10) { // متوسطة
            score += 2;
        } else if (userAnswers[6] === 3 && site.entrance_fee > 10) { // مرتفعة
            score += 2;
        }
        
        // الموسم المفضل (السؤال 7)
        if (userAnswers[7] !== undefined && userAnswers[7] < 4) {
            const seasons = ["الربيع", "الصيف", "الخريف", "الشتاء"];
            const preferredSeason = seasons[userAnswers[7]];
            if (site.best_time.includes(preferredSeason)) {
                score += 2;
            }
        } else if (userAnswers[7] === 4) { // لا يهم
            score += 1;
        }
        
        // المرافق (السؤال 8)
        if (userAnswers[8] === 0 && site.facilities.length >= 4) { // مهم جداً
            score += 2;
        } else if (userAnswers[8] === 1 && site.facilities.length >= 2) { // مفضل ولكن ليس ضرورياً
            score += 1;
        }
        
        // تطبيع الدرجة إلى نسبة مئوية
        const maxScore = 16; // أقصى درجة ممكنة
        const matchPercentage = (score / maxScore) * 100;
        
        return {
            site: site,
            matchScore: matchPercentage
        };
    });
    
    // ترتيب المواقع حسب درجة التطابق (تنازلياً)
    siteScores.sort((a, b) => b.matchScore - a.matchScore);
    
    // اختيار أفضل 5 مواقع
    recommendations = siteScores.slice(0, 5);
    
    // عرض النتائج
    displayResults();
}

/**
 * عرض نتائج التوصيات
 */
function displayResults() {
    hideAllSections();
    document.getElementById('results-section').classList.remove('d-none');
    
    // عرض المواقع الموصى بها
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.innerHTML = '';
    
    recommendations.forEach(recommendation => {
        const site = recommendation.site;
        const matchScore = recommendation.matchScore;
        
        const siteCard = document.createElement('div');
        siteCard.className = 'col-md-4 mb-4';
        siteCard.innerHTML = `
            <div class="card site-card h-100">
                <div class="position-relative">
                    <img src="${site.image}" class="card-img-top site-image" alt="${site.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(site.name)}'">
                    <div class="match-badge bg-success text-white">
                        ${Math.round(matchScore)}%
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${site.name}</h5>
                    <p class="card-text">${site.description.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-primary">${site.type}</span>
                        <span><i class="fas fa-clock me-1"></i> ${site.visit_duration} دقيقة</span>
                    </div>
                    <div class="coordinates-container mt-2">
                        <small>الإحداثيات: ${site.coordinates.latitude}, ${site.coordinates.longitude}</small>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-primary w-100 view-site-details" data-site-id="${site.id}">
                        <i class="fas fa-info-circle me-2"></i>
                        عرض التفاصيل
                    </button>
                </div>
            </div>
        `;
        
        recommendationsContainer.appendChild(siteCard);
    });
    
    // إضافة مستمعي الأحداث لأزرار عرض التفاصيل
    document.querySelectorAll('.view-site-details').forEach(button => {
        button.addEventListener('click', function() {
            const siteId = parseInt(this.dataset.siteId);
            showSiteDetails(siteId);
        });
    });
    
    // عرض المسار السياحي
    updateItinerary();
}

/**
 * تحديث المسار السياحي
 */
function updateItinerary() {
    const daysSelect = document.getElementById('days-select');
    const days = parseInt(daysSelect.value);
    const itineraryContainer = document.getElementById('itinerary-container');
    
    // إنشاء المسار السياحي
    const itinerary = generateItinerary(days);
    
    // عرض المسار السياحي
    itineraryContainer.innerHTML = '';
    
    itinerary.forEach((daySites, dayIndex) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'itinerary-day mb-4';
        
        let dayContent = `
            <div class="itinerary-day-header">
                <h4>اليوم ${dayIndex + 1}</h4>
            </div>
            <div class="itinerary-sites">
        `;
        
        daySites.forEach((site, siteIndex) => {
            dayContent += `
                <div class="itinerary-site">
                    <div class="itinerary-site-number">${siteIndex + 1}</div>
                    <div class="itinerary-site-info">
                        <h5>${site.name}</h5>
                        <div class="d-flex justify-content-between">
                            <span><i class="fas fa-clock me-1"></i> ${site.visit_duration} دقيقة</span>
                            <span class="coordinates-text">
                                <i class="fas fa-map-marker-alt me-1"></i>
                                ${site.coordinates.latitude}, ${site.coordinates.longitude}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        dayContent += `</div>`;
        dayElement.innerHTML = dayContent;
        itineraryContainer.appendChild(dayElement);
    });
}

/**
 * توليد المسار السياحي
 * @param {number} days - عدد أيام الزيارة
 * @returns {Array} - مصفوفة تحتوي على المواقع المقترحة لكل يوم
 */
function generateItinerary(days) {
    // الحصول على المواقع الموصى بها
    const recommendedSites = recommendations.map(rec => rec.site);
    
    // إضافة مواقع إضافية إذا كان عدد المواقع الموصى بها أقل من المطلوب
    let allRecommendedSites = [...recommendedSites];
    
    // إضافة مواقع أخرى من قائمة جميع المواقع إذا لزم الأمر
    const sitesNeeded = Math.min(days * 3, 15); // بحد أقصى 15 موقع
    
    if (allRecommendedSites.length < sitesNeeded) {
        // إضافة مواقع أخرى غير موجودة في التوصيات
        const otherSites = allSites.filter(site => !allRecommendedSites.some(recSite => recSite.id === site.id));
        
        // ترتيب المواقع الأخرى حسب الشعبية
        otherSites.sort((a, b) => b.popularity - a.popularity);
        
        // إضافة المواقع الأخرى حتى نصل إلى العدد المطلوب
        allRecommendedSites = [...allRecommendedSites, ...otherSites.slice(0, sitesNeeded - allRecommendedSites.length)];
    }
    
    // تقسيم المواقع على الأيام
    const itinerary = [];
    const sitesPerDay = Math.ceil(allRecommendedSites.length / days);
    
    for (let i = 0; i < days; i++) {
        const startIndex = i * sitesPerDay;
        const endIndex = Math.min(startIndex + sitesPerDay, allRecommendedSites.length);
        const daySites = allRecommendedSites.slice(startIndex, endIndex);
        
        // ترتيب مواقع اليوم حسب المسافة (لتقليل وقت التنقل)
        if (daySites.length > 1) {
            // نبدأ من الموقع الأول
            const sortedSites = [daySites[0]];
            const remainingSites = daySites.slice(1);
            
            // إضافة المواقع المتبقية حسب أقرب موقع
            while (remainingSites.length > 0) {
                const lastSite = sortedSites[sortedSites.length - 1];
                
                // حساب المسافة بين الموقع الأخير وجميع المواقع المتبقية
                let nearestSiteIndex = 0;
                let minDistance = calculateDistance(
                    lastSite.coordinates.latitude,
                    lastSite.coordinates.longitude,
                    remainingSites[0].coordinates.latitude,
                    remainingSites[0].coordinates.longitude
                );
                
                for (let j = 1; j < remainingSites.length; j++) {
                    const distance = calculateDistance(
                        lastSite.coordinates.latitude,
                        lastSite.coordinates.longitude,
                        remainingSites[j].coordinates.latitude,
                        remainingSites[j].coordinates.longitude
                    );
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestSiteIndex = j;
                    }
                }
                
                // إضافة أقرب موقع إلى القائمة المرتبة
                sortedSites.push(remainingSites[nearestSiteIndex]);
                remainingSites.splice(nearestSiteIndex, 1);
            }
            
            itinerary.push(sortedSites);
        } else {
            itinerary.push(daySites);
        }
    }
    
    return itinerary;
}

/**
 * حساب المسافة بين نقطتين باستخدام الإحداثيات
 * @param {number} lat1 - خط العرض للنقطة الأولى
 * @param {number} lon1 - خط الطول للنقطة الأولى
 * @param {number} lat2 - خط العرض للنقطة الثانية
 * @param {number} lon2 - خط الطول للنقطة الثانية
 * @returns {number} - المسافة بين النقطتين
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    // استخدام صيغة المسافة الإقليدية البسيطة (مناسبة للمسافات القصيرة)
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
}

/**
 * عرض تفاصيل موقع أثري
 * @param {number} siteId - معرف الموقع
 */
function showSiteDetails(siteId) {
    // البحث عن الموقع في قائمة المواقع
    const site = allSites.find(site => site.id === siteId);
    
    if (!site) {
        console.error(`الموقع ذو المعرف ${siteId} غير موجود`);
        return;
    }
    
    // تعبئة بيانات النافذة المنبثقة
    document.getElementById('modal-site-title').textContent = 'تفاصيل الموقع';
    document.getElementById('modal-site-name').textContent = site.name;
    document.getElementById('modal-site-description').textContent = site.description;
    document.getElementById('modal-site-type').textContent = site.type;
    document.getElementById('modal-site-period').textContent = site.period;
    document.getElementById('modal-site-duration').textContent = `${site.visit_duration} دقيقة`;
    document.getElementById('modal-site-fee').textContent = site.entrance_fee === 0 ? 'مجاني' : `${site.entrance_fee} دولار`;
    document.getElementById('modal-site-image').src = site.image;
    document.getElementById('modal-site-image').onerror = function() {
        this.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(site.name)}`;
    };
    
    // تعيين الإحداثيات
    const coordsInput = document.querySelector('#modal-site-coordinates input');
    coordsInput.value = `${site.coordinates.latitude}, ${site.coordinates.longitude}`;
    
    // إضافة مستمع الحدث لزر نسخ الإحداثيات
    const copyButton = document.querySelector('#modal-site-coordinates .copy-coords-btn');
    copyButton.onclick = function() {
        coordsInput.select();
        document.execCommand('copy');
        
        // إظهار رسالة تأكيد النسخ
        this.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    };
    
    // عرض النافذة المنبثقة
    const modal = new bootstrap.Modal(document.getElementById('site-details-modal'));
    modal.show();
}

/**
 * ملء قسم المواقع الأثرية
 */
function populateSitesSection() {
    const sitesContainer = document.getElementById('sites-container');
    sitesContainer.innerHTML = '';
    
    allSites.forEach(site => {
        const siteCard = document.createElement('div');
        siteCard.className = 'col-md-4 mb-4';
        siteCard.innerHTML = `
            <div class="card site-card h-100">
                <img src="${site.image}" class="card-img-top site-image" alt="${site.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(site.name)}'">
                <div class="card-body">
                    <h5 class="card-title">${site.name}</h5>
                    <p class="card-text">${site.description.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-primary">${site.type}</span>
                        <span><i class="fas fa-clock me-1"></i> ${site.visit_duration} دقيقة</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-primary w-100 view-site-details" data-site-id="${site.id}">
                        <i class="fas fa-info-circle me-2"></i>
                        عرض التفاصيل
                    </button>
                </div>
            </div>
        `;
        
        sitesContainer.appendChild(siteCard);
    });
    
    // إضافة مستمعي الأحداث لأزرار عرض التفاصيل
    document.querySelectorAll('.view-site-details').forEach(button => {
        button.addEventListener('click', function() {
            const siteId = parseInt(this.dataset.siteId);
            showSiteDetails(siteId);
        });
    });
}

/**
 * البحث عن المواقع الأثرية
 */
function searchSites() {
    const searchInput = document.getElementById('search-input');
    const keyword = searchInput.value.trim().toLowerCase();
    
    if (keyword === '') {
        // إذا كان حقل البحث فارغاً، عرض جميع المواقع
        populateSitesSection();
        return;
    }
    
    // البحث عن المواقع التي تطابق كلمة البحث
    const filteredSites = allSites.filter(site => {
        return site.name.toLowerCase().includes(keyword) ||
               site.description.toLowerCase().includes(keyword) ||
               site.type.toLowerCase().includes(keyword);
    });
    
    // عرض المواقع المطابقة
    const sitesContainer = document.getElementById('sites-container');
    sitesContainer.innerHTML = '';
    
    if (filteredSites.length === 0) {
        sitesContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    لم يتم العثور على نتائج مطابقة لـ "${keyword}"
                </div>
            </div>
        `;
        return;
    }
    
    filteredSites.forEach(site => {
        const siteCard = document.createElement('div');
        siteCard.className = 'col-md-4 mb-4';
        siteCard.innerHTML = `
            <div class="card site-card h-100">
                <img src="${site.image}" class="card-img-top site-image" alt="${site.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(site.name)}'">
                <div class="card-body">
                    <h5 class="card-title">${site.name}</h5>
                    <p class="card-text">${site.description.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-primary">${site.type}</span>
                        <span><i class="fas fa-clock me-1"></i> ${site.visit_duration} دقيقة</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-primary w-100 view-site-details" data-site-id="${site.id}">
                        <i class="fas fa-info-circle me-2"></i>
                        عرض التفاصيل
                    </button>
                </div>
            </div>
        `;
        
        sitesContainer.appendChild(siteCard);
    });
    
    // إضافة مستمعي الأحداث لأزرار عرض التفاصيل
    document.querySelectorAll('.view-site-details').forEach(button => {
        button.addEventListener('click', function() {
            const siteId = parseInt(this.dataset.siteId);
            showSiteDetails(siteId);
        });
    });
}

/**
 * تصفية المواقع الأثرية حسب النوع
 */
function filterSites() {
    const filterSelect = document.getElementById('filter-select');
    const filterValue = filterSelect.value;
    
    if (filterValue === 'all') {
        // إذا تم اختيار "جميع المواقع"، عرض جميع المواقع
        populateSitesSection();
        return;
    }
    
    // تصفية المواقع حسب النوع
    const filteredSites = allSites.filter(site => {
        return site.type.includes(filterValue);
    });
    
    // عرض المواقع المطابقة
    const sitesContainer = document.getElementById('sites-container');
    sitesContainer.innerHTML = '';
    
    if (filteredSites.length === 0) {
        sitesContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    لم يتم العثور على مواقع من نوع "${filterValue}"
                </div>
            </div>
        `;
        return;
    }
    
    filteredSites.forEach(site => {
        const siteCard = document.createElement('div');
        siteCard.className = 'col-md-4 mb-4';
        siteCard.innerHTML = `
            <div class="card site-card h-100">
                <img src="${site.image}" class="card-img-top site-image" alt="${site.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(site.name)}'">
                <div class="card-body">
                    <h5 class="card-title">${site.name}</h5>
                    <p class="card-text">${site.description.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-primary">${site.type}</span>
                        <span><i class="fas fa-clock me-1"></i> ${site.visit_duration} دقيقة</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-primary w-100 view-site-details" data-site-id="${site.id}">
                        <i class="fas fa-info-circle me-2"></i>
                        عرض التفاصيل
                    </button>
                </div>
            </div>
        `;
        
        sitesContainer.appendChild(siteCard);
    });
    
    // إضافة مستمعي الأحداث لأزرار عرض التفاصيل
    document.querySelectorAll('.view-site-details').forEach(button => {
        button.addEventListener('click', function() {
            const siteId = parseInt(this.dataset.siteId);
            showSiteDetails(siteId);
        });
    });
}

/**
 * إعادة تشغيل الاستبيان
 */
function restartSurvey() {
    // إعادة تعيين الإجابات والسؤال الحالي
    userAnswers = {};
    currentQuestionIndex = 0;
    recommendations = [];
    
    // بدء الاستبيان من جديد
    startSurvey();
}

/**
 * عرض نافذة تصدير الإحداثيات
 */
function showExportCoordinatesModal() {
    // التأكد من وجود توصيات
    if (recommendations.length === 0) {
        alert('يجب إكمال الاستبيان أولاً للحصول على توصيات');
        return;
    }
    
    // تحديث بيانات الإحداثيات
    updateCoordinatesFormat();
    
    // عرض النافذة المنبثقة
    const modal = new bootstrap.Modal(document.getElementById('export-coordinates-modal'));
    modal.show();
}

/**
 * تحديث تنسيق الإحداثيات
 */
function updateCoordinatesFormat() {
    const formatSelect = document.getElementById('coordinates-format');
    const format = formatSelect.value;
    const coordinatesData = document.getElementById('coordinates-data');
    
    // الحصول على بيانات الإحداثيات من التوصيات
    const sites = recommendations.map(rec => rec.site);
    
    // تنسيق البيانات حسب التنسيق المحدد
    let formattedData = '';
    
    if (format === 'json') {
        // تنسيق JSON
        const jsonData = sites.map(site => ({
            id: site.id,
            name: site.name,
            coordinates: {
                latitude: site.coordinates.latitude,
                longitude: site.coordinates.longitude
            }
        }));
        
        formattedData = JSON.stringify(jsonData, null, 2);
    } else if (format === 'csv') {
        // تنسيق CSV
        formattedData = 'id,name,latitude,longitude\n';
        sites.forEach(site => {
            formattedData += `${site.id},"${site.name}",${site.coordinates.latitude},${site.coordinates.longitude}\n`;
        });
    } else if (format === 'text') {
        // تنسيق نص عادي
        sites.forEach(site => {
            formattedData += `${site.name}: ${site.coordinates.latitude}, ${site.coordinates.longitude}\n`;
        });
    }
    
    // تعيين البيانات في حقل النص
    coordinatesData.value = formattedData;
}

/**
 * نسخ بيانات الإحداثيات
 */
function copyCoordinatesData() {
    const coordinatesData = document.getElementById('coordinates-data');
    coordinatesData.select();
    document.execCommand('copy');
    
    // إظهار رسالة تأكيد النسخ
    const copyButton = document.getElementById('copy-coordinates-btn');
    copyButton.innerHTML = '<i class="fas fa-check me-2"></i> تم النسخ';
    setTimeout(() => {
        copyButton.innerHTML = '<i class="fas fa-copy me-2"></i> نسخ البيانات';
    }, 2000);
}

/**
 * تنزيل بيانات الإحداثيات
 */
function downloadCoordinatesData() {
    const formatSelect = document.getElementById('coordinates-format');
    const format = formatSelect.value;
    const coordinatesData = document.getElementById('coordinates-data');
    
    // إنشاء اسم الملف
    let filename = 'babylon_coordinates';
    let mimeType = '';
    
    if (format === 'json') {
        filename += '.json';
        mimeType = 'application/json';
    } else if (format === 'csv') {
        filename += '.csv';
        mimeType = 'text/csv';
    } else if (format === 'text') {
        filename += '.txt';
        mimeType = 'text/plain';
    }
    
    // إنشاء رابط التنزيل
    const blob = new Blob([coordinatesData.value], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * تصدير المسار السياحي
 */
function exportItinerary() {
    const daysSelect = document.getElementById('days-select');
    const days = parseInt(daysSelect.value);
    
    // التأكد من وجود توصيات
    if (recommendations.length === 0) {
        alert('يجب إكمال الاستبيان أولاً للحصول على توصيات');
        return;
    }
    
    // إنشاء المسار السياحي
    const itinerary = generateItinerary(days);
    
    // تحويل المسار إلى تنسيق JSON
    const itineraryData = [];
    
    itinerary.forEach((daySites, dayIndex) => {
        const dayData = {
            day: dayIndex + 1,
            sites: daySites.map(site => ({
                id: site.id,
                name: site.name,
                coordinates: {
                    latitude: site.coordinates.latitude,
                    longitude: site.coordinates.longitude
                }
            }))
        };
        
        itineraryData.push(dayData);
    });
    
    // تنزيل المسار كملف JSON
    const jsonData = JSON.stringify(itineraryData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'babylon_itinerary.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
