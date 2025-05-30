/**
 * بيانات نظام تحليل تفضيلات السياح لآثار بابل
 *
 * هذا الملف يحتوي على بيانات المواقع الأثرية في بابل والأسئلة المستخدمة في الاستبيان.
 * يتم استخدام هذه البيانات في الواجهة الأمامية لعرض المعلومات وتوليد الأسئلة.
 */

// بيانات المواقع الأثرية في بابل
const babylonSites = [
  {
    id: 1,
    name: "حدائق بابل المعلقة",
    description:
      "واحدة من عجائب الدنيا السبع في العالم القديم، وهي سلسلة من الحدائق المدرجة التي بناها الملك نبوخذ نصر الثاني لزوجته أميتيس التي كانت تشتاق لجبال بلادها.",
    type: "حدائق أثرية",
    period: "العصر البابلي الحديث",
    visit_duration: 90,
    popularity: 9.8,
    accessibility: 8.5,
    entrance_fee: 10,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين", "استراحات", "متاجر هدايا", "مطاعم"],
    coordinates: {
      latitude: 32.5422,
      longitude: 44.4275,
    },
    image: "static/images/sites/site_1.jpg",
  },
  {
    id: 2,
    name: "بوابة عشتار",
    description:
      "بوابة مزخرفة بالقرميد الأزرق المزجج ومزينة بصور للتنين والثور، بناها الملك نبوخذ نصر الثاني وكانت المدخل الشمالي لمدينة بابل.",
    type: "بوابة أثرية",
    period: "العصر البابلي الحديث",
    visit_duration: 60,
    popularity: 9.5,
    accessibility: 9.0,
    entrance_fee: 8,
    best_time: ["الربيع", "الخريف", "الشتاء"],
    facilities: ["مرشدين سياحيين", "متاجر هدايا"],
    coordinates: {
      latitude: 32.5429,
      longitude: 44.4212,
    },
    image: "/static/images/sites/site_2.webp",
  },
  {
    id: 3,
    name: "برج بابل",
    description:
      "برج ضخم متعدد الطبقات (زقورة) كان يستخدم كمعبد ومرصد فلكي، ويعتقد أنه الأساس الحقيقي لقصة برج بابل المذكورة في النصوص الدينية.",
    type: "برج/زقورة",
    period: "العصر البابلي القديم والحديث",
    visit_duration: 75,
    popularity: 9.2,
    accessibility: 7.5,
    entrance_fee: 12,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين", "استراحات"],
    coordinates: {
      latitude: 32.5362,
      longitude: 44.4208,
    },
    image: "static/images/sites/site_3.jpg",
  },
  {
    id: 4,
    name: "معبد مردوخ (إيساجيلا)",
    description: "معبد مخصص للإله مردوخ، كبير آلهة بابل، وكان أهم معبد في المدينة ومركزاً دينياً مهماً.",
    type: "معبد",
    period: "العصر البابلي القديم والحديث",
    visit_duration: 60,
    popularity: 8.7,
    accessibility: 8.0,
    entrance_fee: 8,
    best_time: ["الربيع", "الخريف", "الشتاء"],
    facilities: ["مرشدين سياحيين", "استراحات"],
    coordinates: {
      latitude: 32.5385,
      longitude: 44.4203,
    },
    image: "/static/images/sites/site_4.png",
  },
  {
    id: 5,
    name: "قصر نبوخذ نصر",
    description: "القصر الملكي للملك نبوخذ نصر الثاني، وكان مقر الحكم ومركز الإدارة في الإمبراطورية البابلية الحديثة.",
    type: "قصر",
    period: "العصر البابلي الحديث",
    visit_duration: 120,
    popularity: 9.0,
    accessibility: 8.5,
    entrance_fee: 15,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين", "استراحات", "متاجر هدايا", "مطاعم"],
    coordinates: {
      latitude: 32.5408,
      longitude: 44.4231,
    },
    image: "static/images/sites/site_5.jpg",
  },
  {
    id: 6,
    name: "الشارع الموكبي",
    description: "شارع مرصوف بالحجارة كان يستخدم للمواكب الدينية والاحتفالات، ويربط بين بوابة عشتار ومعبد مردوخ.",
    type: "شارع أثري",
    period: "العصر البابلي الحديث",
    visit_duration: 45,
    popularity: 8.5,
    accessibility: 9.5,
    entrance_fee: 5,
    best_time: ["الربيع", "الخريف", "الشتاء"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.5415,
      longitude: 44.422,
    },
    image: "static/images/sites/site_6.jpg",
  },
  {
    id: 7,
    name: "سور بابل",
    description: "سور ضخم كان يحيط بمدينة بابل القديمة، وكان من أقوى التحصينات الدفاعية في العالم القديم.",
    type: "سور دفاعي",
    period: "العصر البابلي الحديث",
    visit_duration: 90,
    popularity: 8.3,
    accessibility: 7.8,
    entrance_fee: 7,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين", "استراحات"],
    coordinates: {
      latitude: 32.544,
      longitude: 44.418,
    },
    image: "static/images/sites/site_7.jpg",
  },
  {
    id: 8,
    name: "متحف بابل",
    description: "متحف حديث يعرض القطع الأثرية والمعلومات التاريخية عن حضارة بابل وتاريخها.",
    type: "متحف",
    period: "حديث",
    visit_duration: 120,
    popularity: 8.8,
    accessibility: 9.8,
    entrance_fee: 10,
    best_time: ["الربيع", "الصيف", "الخريف", "الشتاء"],
    facilities: ["مرشدين سياحيين", "استراحات", "متاجر هدايا", "مطاعم", "دورات مياه", "موقف سيارات"],
    coordinates: {
      latitude: 32.5395,
      longitude: 44.429,
    },
    image: "static/images/sites/site_8.jpg",
  },
  {
    id: 9,
    name: "معبد نابو",
    description: "معبد مخصص للإله نابو، إله الحكمة والكتابة في الديانة البابلية.",
    type: "معبد",
    period: "العصر البابلي الحديث",
    visit_duration: 45,
    popularity: 7.9,
    accessibility: 7.5,
    entrance_fee: 6,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.5372,
      longitude: 44.4195,
    },
    image: "static/images/sites/site_9.jpg",
  },
  {
    id: 10,
    name: "مركز الزوار في بابل",
    description: "مركز حديث يقدم معلومات شاملة عن مدينة بابل وتاريخها وآثارها، مع عروض تفاعلية ونماذج مصغرة.",
    type: "مركز زوار",
    period: "حديث",
    visit_duration: 60,
    popularity: 8.5,
    accessibility: 9.9,
    entrance_fee: 5,
    best_time: ["الربيع", "الصيف", "الخريف", "الشتاء"],
    facilities: [
      "مرشدين سياحيين",
      "استراحات",
      "متاجر هدايا",
      "مطاعم",
      "دورات مياه",
      "موقف سيارات",
      "خدمات ذوي الاحتياجات الخاصة",
    ],
    coordinates: {
      latitude: 32.54,
      longitude: 44.43,
    },
    image: "/static/images/sites/site_10.webp",
  },
  {
    id: 11,
    name: "معبد عشتار",
    description: "معبد مخصص للإلهة عشتار، إلهة الحب والحرب في الديانة البابلية.",
    type: "معبد",
    period: "العصر البابلي القديم",
    visit_duration: 50,
    popularity: 8.0,
    accessibility: 7.2,
    entrance_fee: 7,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين", "استراحات"],
    coordinates: {
      latitude: 32.5365,
      longitude: 44.4225,
    },
    image: "static/images/sites/site_11.jpg",
  },
  {
    id: 12,
    name: "المسرح البابلي",
    description: "مسرح قديم كان يستخدم للعروض والاحتفالات في مدينة بابل القديمة.",
    type: "مسرح",
    period: "العصر البابلي الحديث",
    visit_duration: 40,
    popularity: 7.5,
    accessibility: 8.0,
    entrance_fee: 5,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.538,
      longitude: 44.424,
    },
    image: "static/images/sites/site_12.jpg",
  },
  {
    id: 13,
    name: "بيت الكتابات المسمارية",
    description:
      "موقع أثري يضم مجموعة من الألواح الطينية المكتوبة بالخط المسماري، وكان بمثابة مكتبة ومدرسة في العصر البابلي.",
    type: "موقع أثري",
    period: "العصر البابلي القديم والحديث",
    visit_duration: 60,
    popularity: 8.2,
    accessibility: 7.8,
    entrance_fee: 8,
    best_time: ["الربيع", "الخريف", "الشتاء"],
    facilities: ["مرشدين سياحيين", "متاجر هدايا"],
    coordinates: {
      latitude: 32.5375,
      longitude: 44.4215,
    },
    image: "static/images/sites/site_13.jpg",
  },
  {
    id: 14,
    name: "قناة المياه البابلية",
    description: "نظام قنوات مائية متطور كان يستخدم لري الحدائق المعلقة وتوفير المياه لمدينة بابل.",
    type: "نظام مائي",
    period: "العصر البابلي الحديث",
    visit_duration: 30,
    popularity: 7.0,
    accessibility: 6.5,
    entrance_fee: 4,
    best_time: ["الربيع"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.542,
      longitude: 44.426,
    },
    image: "static/images/sites/site_14.jpg",
  },
  {
    id: 15,
    name: "مقبرة النبلاء البابليين",
    description: "مقبرة تضم قبور النبلاء والشخصيات المهمة في المجتمع البابلي القديم.",
    type: "مقبرة",
    period: "العصر البابلي القديم والحديث",
    visit_duration: 45,
    popularity: 7.2,
    accessibility: 6.8,
    entrance_fee: 6,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.535,
      longitude: 44.419,
    },
    image: "static/images/sites/site_15.jpg",
  },
  {
    id: 16,
    name: "معبد شمش",
    description: "معبد مخصص للإله شمش، إله الشمس والعدالة في الديانة البابلية.",
    type: "معبد",
    period: "العصر البابلي القديم",
    visit_duration: 40,
    popularity: 7.8,
    accessibility: 7.0,
    entrance_fee: 6,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.536,
      longitude: 44.423,
    },
    image: "static/images/sites/site_16.jpg",
  },
  {
    id: 17,
    name: "سوق بابل القديم",
    description: "موقع السوق القديم في مدينة بابل، حيث كانت تتم التجارة وتبادل السلع.",
    type: "سوق أثري",
    period: "العصر البابلي الحديث",
    visit_duration: 50,
    popularity: 8.0,
    accessibility: 8.5,
    entrance_fee: 5,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين", "متاجر هدايا"],
    coordinates: {
      latitude: 32.539,
      longitude: 44.421,
    },
    image: "static/images/sites/site_17.jpg",
  },
  {
    id: 18,
    name: "بيت حمورابي",
    description: "موقع يعتقد أنه كان منزل الملك حمورابي، صاحب أول مدونة قانونية مكتوبة في التاريخ.",
    type: "موقع أثري",
    period: "العصر البابلي القديم",
    visit_duration: 35,
    popularity: 8.3,
    accessibility: 7.5,
    entrance_fee: 7,
    best_time: ["الربيع", "الخريف"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.537,
      longitude: 44.42,
    },
    image: "static/images/sites/site_18.jpg",
  },
  {
    id: 19,
    name: "مرصد بابل الفلكي",
    description: "موقع كان يستخدم لمراقبة النجوم والأجرام السماوية، حيث برع البابليون في علم الفلك.",
    type: "مرصد",
    period: "العصر البابلي الحديث",
    visit_duration: 40,
    popularity: 7.7,
    accessibility: 7.0,
    entrance_fee: 8,
    best_time: ["الربيع", "الخريف", "الشتاء"],
    facilities: ["مرشدين سياحيين"],
    coordinates: {
      latitude: 32.5355,
      longitude: 44.4235,
    },
    image: "static/images/sites/site_19.jpg",
  },
  {
    id: 20,
    name: "حديقة التماثيل البابلية",
    description: "حديقة حديثة تضم نسخاً من التماثيل والمنحوتات البابلية القديمة.",
    type: "حديقة",
    period: "حديث",
    visit_duration: 60,
    popularity: 8.0,
    accessibility: 9.5,
    entrance_fee: 3,
    best_time: ["الربيع", "الخريف"],
    facilities: ["استراحات", "متاجر هدايا", "مطاعم", "دورات مياه", "موقف سيارات"],
    coordinates: {
      latitude: 32.5405,
      longitude: 44.4295,
    },
    image: "static/images/sites/site_20.jpg",
  },
];

// أسئلة الاستبيان
const surveyQuestions = [
  {
    id: 1,
    text: "ما هو نوع الآثار المفضل لديك؟",
    options: ["المعابد", "القصور", "الأسوار والبوابات", "المتاحف", "أخرى"],
  },
  {
    id: 2,
    text: "ما هي الفترة التاريخية المفضلة لديك؟",
    options: ["العصر البابلي القديم", "العصر البابلي الحديث", "كلاهما", "لا يهم"],
  },
  {
    id: 3,
    text: "ما هي مدة الزيارة المفضلة لديك؟",
    options: ["قصيرة (أقل من 30 دقيقة)", "متوسطة (30-60 دقيقة)", "طويلة (1-2 ساعة)", "طويلة جداً (أكثر من ساعتين)"],
  },
  {
    id: 4,
    text: "هل تفضل المواقع الأثرية الشهيرة أم الأقل شهرة؟",
    options: ["الشهيرة جداً", "الشهيرة", "متوسطة الشهرة", "الأقل شهرة"],
  },
  {
    id: 5,
    text: "ما مدى أهمية سهولة الوصول إلى الموقع بالنسبة لك؟",
    options: ["مهم جداً", "مهم", "متوسط الأهمية", "غير مهم"],
  },
  {
    id: 6,
    text: "ما هي رسوم الدخول المفضلة لديك؟",
    options: ["مجاني", "منخفضة (1-5 دولار)", "متوسطة (6-10 دولار)", "مرتفعة (أكثر من 10 دولار)"],
  },
  {
    id: 7,
    text: "ما هو الموسم المفضل لديك للزيارة؟",
    options: ["الربيع", "الصيف", "الخريف", "الشتاء", "لا يهم"],
  },
  {
    id: 8,
    text: "هل تفضل المواقع التي توفر مرافق إضافية (مثل المقاهي والمتاجر)؟",
    options: ["نعم، مهم جداً", "مفضل ولكن ليس ضرورياً", "لا يهم"],
  },
  {
    id: 9,
    text: "هل تهتم بالتصوير الفوتوغرافي أثناء زيارتك؟",
    options: ["نعم، بشكل كبير", "نعم، بشكل متوسط", "لا أهتم كثيراً"],
  },
  {
    id: 10,
    text: "كم عدد المواقع التي ترغب في زيارتها خلال رحلتك؟",
    options: ["1-3 مواقع", "4-6 مواقع", "7-10 مواقع", "أكثر من 10 مواقع"],
  },
  {
    id: 11,
    text: "هل تفضل المواقع القريبة من بعضها البعض؟",
    options: ["نعم، أفضل المواقع المتقاربة", "لا يهم، يمكنني التنقل بين المواقع البعيدة"],
  },
  {
    id: 12,
    text: "ما هي مدة إقامتك في بابل؟",
    options: ["يوم واحد", "2-3 أيام", "4-7 أيام", "أكثر من أسبوع"],
  },
];
