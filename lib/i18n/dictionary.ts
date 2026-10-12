export type ClinicStat = {
  to: number;
  label: string;
  suffix?: string;
  mark?: string;
  grouped?: boolean;
};

export type Dictionary = {
  nav: {
    home: string;
    corporate: string;
    about: string;
    team: string;
    clinic: string;
    services: string;
    blog: string;
    contact: string;
    book: string;
    openMenu: string;
    closeMenu: string;
  };
  lang: { label: string; tr: string; en: string };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lede: string;
    cta: string;
    secondary: string;
    scroll: string;
  };
  anatomy: { eyebrow: string; title: string; body: string; hint: string };
  orbit: {
    items: { label: string; detail: string }[];
  };
  statsTitle: string;
  stats: ClinicStat[];
  intro: { eyebrow: string; title: string; body: string; link: string };
  servicesHome: {
    eyebrow: string;
    title: string;
    lede: string;
    explore: string;
    viewAll: string;
    prev: string;
    next: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  teamHome: {
    eyebrow: string;
    title: string;
    link: string;
    cardEyebrow: string;
    cardTitle: string;
    cardBody: string;
    prev: string;
    next: string;
  };
  reviews: { eyebrow: string; title: string; score: string; scoreLabel: string };
  closing: { eyebrow: string; title: string; body: string; cta: string };
  about: {
    eyebrow: string;
    title: string;
    lede: string;
    storyEyebrow: string;
    storyTitle: string;
    story: [string, string, string];
    statsEyebrow: string;
    principlesEyebrow: string;
    principlesTitle: string;
    principles: { title: string; body: string }[];
    quote: string;
    quoteBy: string;
    pathsEyebrow: string;
    teamCardTitle: string;
    teamCardBody: string;
    clinicCardTitle: string;
    clinicCardBody: string;
    read: string;
  };
  team: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    portrait: string;
    crewLabel: string;
    statDoctors: string;
    statBranches: string;
    statFile: string;
    noteEyebrow: string;
    noteTitle: string;
    noteAccent: string;
    noteBody: string;
    steps: { title: string; body: string }[];
    cta: string;
    contact: string;
    moreEyebrow: string;
    aboutCardBody: string;
  };
  clinic: {
    galleryEyebrow: string;
    galleryTitle: string;
    galleryLede: string;
    gallery: {
      filterLabel: string;
      all: string;
      open: string;
      related: string;
      welcome: string;
      close: string;
      prev: string;
      next: string;
      book: string;
    };
    eyebrow: string;
    title: string;
    lede: string;
    stats: { spaces: string; floors: string; tech: string };
    spacesEyebrow: string;
    spacesTitle: string;
    spaces: { title: string; body: string }[];
    techEyebrow: string;
    techTitle: string;
    techLede: string;
    visitEyebrow: string;
    visitTitle: string;
    visitBody: string;
    contact: string;
    book: string;
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    lede: string;
    durationLabel: string;
    book: string;
    read: string;
  };
  treatmentPage: {
    back: string;
    causes: string;
    goals: string;
    methods: string;
    application: string;
    teeth: string;
    aftercare: string;
    duration: string;
    visits: string;
    comfort: string;
    doctorsEyebrow: string;
    doctorsTitle: string;
    relatedEyebrow: string;
    related: string;
    relatedLede: string;
    relatedAll: string;
    relatedRead: string;
    note: string;
    disclaimer: string;
    barKicker: string;
    barBody: string;
  };
  blogPage: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    filterLabel: string;
    all: string;
    featured: string;
    readMore: string;
    minRead: string;
    posts: string;
    categoryCount: string;
    recent: string;
    categories: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  blogPost: {
    back: string;
    writtenBy: string;
    editorial: string;
    editorialRole: string;
    published: string;
    readTime: string;
    takeaway: string;
    onThisPage: string;
    treatmentEyebrow: string;
    treatmentCta: string;
    bookCta: string;
    disclaimer: string;
    relatedEyebrow: string;
    related: string;
    allPosts: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    addressLabel: string;
    hoursLabel: string;
    phoneLabel: string;
    emailLabel: string;
    mapLabel: string;
    formTitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    namePh: string;
    emailPh: string;
    phonePh: string;
    messagePh: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    error: string;
    privacy: string;
    formLede: string;
    subject: string;
    subjectPh: string;
    emailNote: string;
    whatsappLabel: string;
    whatsappBody: string;
    directions: string;
    openMap: string;
    openNow: string;
    closedNow: string;
    openUntil: string;
    closedNote: string;
    localTime: string;
    today: string;
    stats: { reply: string; replyValue: string; week: string; weekValue: string; languages: string; languagesValue: string };
    recommended: string;
    actions: { call: string; write: string; mail: string };
    formHeading: string;
    topics: string[];
    newMessage: string;
    visitEyebrow: string;
    travelEyebrow: string;
    travelTitle: string;
    travelLede: string;
    travel: { title: string; body: string }[];
    book: string;
  };
  appointment: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: [string, string, string];
    stepTitles: [string, string, string];
    stepCount: string;
    back: string;
    next: string;
    submit: string;
    submitting: string;
    searchPh: string;
    filterAll: string;
    noResults: string;
    notSure: string;
    firstAvailable: string;
    firstAvailableCta: string;
    days: string;
    times: string;
    morning: string;
    afternoon: string;
    openCount: string;
    dayFull: string;
    pickDate: string;
    scheduleNote: string;
    full: string;
    past: string;
    summary: string;
    edit: string;
    channelLabel: string;
    channels: { phone: string; whatsapp: string; email: string };
    visitorLabel: string;
    visitors: { local: string; abroad: string };
    abroadHint: string;
    consent: string;
    note: string;
    notePh: string;
    asideTitle: string;
    asideEmpty: string;
    asideTreatment: string;
    asideDoctor: string;
    asideDuration: string;
    asideDate: string;
    asideTime: string;
    asideContact: string;
    afterTitle: string;
    afterSteps: [string, string, string];
    helpTitle: string;
    helpBody: string;
    call: string;
    whatsapp: string;
    whatsappMessage: string;
    successTitle: string;
    successBody: string;
    reference: string;
    addCalendar: string;
    calendarTitle: string;
    calendarNote: string;
    whatsappConfirm: string;
    again: string;
    home: string;
    privacy: string;
    demoNote: string;
    error: string;
  };
  errors: {
    service: string;
    date: string;
    time: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    consent: string;
  };
  footer: {
    blurb: string;
    explore: string;
    care: string;
    visit: string;
    rights: string;
    call: string;
    whatsapp: string;
    whatsappValue: string;
    mail: string;
    hours: string;
    backToTop: string;
  };
  hours: { days: string; time: string }[];
  address: [string, string, string];
  floating: {
    title: string;
    close: string;
    body: string;
    whatsapp: string;
    whatsappMessage: string;
    email: string;
    contact: string;
  };
  notFound: { eyebrow: string; title: string; body: string; home: string };
  preloader: { skip: string };
  quiet: { label: string };
};

export const tr: Dictionary = {
  nav: {
    home: "Ana Sayfa",
    corporate: "Kurumsal",
    about: "Hakkımızda",
    team: "Ekibimiz",
    clinic: "Kliniğimiz",
    services: "Tedavilerimiz",
    blog: "Blog",
    contact: "İletişim",
    book: "Online Randevu",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  lang: { label: "Dil", tr: "Türkçe", en: "English" },
  hero: {
    eyebrow: "İstanbul · Sağlık turizmi",
    titleLead: "Gülüşünüz,",
    titleEmphasis: "imzanızdır.",
    lede: "Nişantaşı’nda, dijital plan ve usta ellerle şekillenen ölçülü bir estetik. İmplanttan gülüş tasarımına, sakin ve tarihi belli bir süreç.",
    cta: "Gülüşünüzü Keşfedin",
    secondary: "Kliniği tanıyın",
    scroll: "Kaydır",
  },
  anatomy: {
    eyebrow: "Canlı anatomi",
    title: "Diş, katman katman.",
    body: "Cam minenin üzerinde dolaşın. Her nokta, tedavinin nereden başladığını gösterir.",
    hint: "Cam mine, altın yörünge",
  },
  orbit: {
    items: [
      {
        label: "Mine Tabakası (Enamel)",
        detail: "Işığı geçiren en dış katman. Parlaklık ve rengin ilk tonu burada başlar.",
      },
      {
        label: "Dentin",
        detail: "Minenin altındaki canlı doku. Dişin sıcak, doğal rengini buradan alır.",
      },
      {
        label: "Kök Yapısı",
        detail: "Çene kemiğine yerleşen sessiz temel. Kalıcı bir estetiğin başlangıcı.",
      },
      {
        label: "İmplant Teknolojisi",
        detail: "Dijital rehberle planlanan titanyum. Eksik dişin yerini kemikle bütünleşerek alır.",
      },
      {
        label: "Zirkonyum Yüzey",
        detail: "Metalsiz, ışığı geçiren kaplama. Ton, komşu dişten ölçülür.",
      },
    ],
  },
  statsTitle: "İstatistikler",
  stats: [
    { to: 18, suffix: "+", label: "Yıllık Uzmanlık" },
    { to: 15000, suffix: "+", label: "Başarılı Gülüş Tasarımı", grouped: true },
    { to: 50, suffix: "+", label: "Farklı Ülkeden Hasta" },
    { to: 4, suffix: ".9", mark: "/5", label: "Trustpilot Memnuniyeti" },
  ],
  intro: {
    eyebrow: "Klinik",
    title: "Aceleye gelmeyen bir estetik.",
    body: "Aureum’da her gülüş, yüzünüzün oranlarına, ışığına ve karakterine göre tasarlanır. Dijital planlamayla sonucu tedaviye başlamadan görür, deneyimli hekimlerimizin ince işçiliğiyle size ait, doğal bir estetiğe kavuşursunuz. Nişantaşı’ndaki kliniğimizde konfor, hijyen ve özen her ayrıntıda sizi karşılar.",
    link: "Kliniği tanıyın",
  },
  servicesHome: {
    eyebrow: "Tedaviler",
    title: "Tedavilerimiz",
    lede: "Uzman hekim kadromuzla tam donanımlı kliniğimizde sunduğumuz diş tedavi hizmetlerimizi inceleyin.",
    explore: "Tüm tedaviler",
    viewAll: "Tümünü incele",
    prev: "Önceki tedaviler",
    next: "Sonraki tedaviler",
  },
  journey: {
    eyebrow: "Süreç",
    title: "İlk görüşmeden kalıcı sonuca, her adımda yanınızdayız.",
    steps: [
      {
        title: "Muayene & Danışmanlık",
        body: "Ağız ve diş sağlığınız detaylı şekilde değerlendirilir; beklentileriniz dinlenerek size en uygun tedavi seçenekleri açıkça paylaşılır.",
      },
      {
        title: "Dijital Planlama",
        body: "3D tarama, dijital röntgen ve gülüş analiziyle tedaviniz kişiye özel planlanır. Sonucu, tedaviye başlamadan önce birlikte görürüz.",
      },
      {
        title: "Uzman Tedavi",
        body: "Alanında uzman hekimlerimiz, güncel teknoloji ve yüksek hijyen standartlarıyla tedavinizi konforlu ve titiz bir şekilde uygular.",
      },
      {
        title: "Kontrol & Bakım",
        body: "Tedavi sonrası düzenli kontrollerle sonucun kalıcılığını takip eder, ağız sağlığınızı uzun vadede korumanız için yanınızda oluruz.",
      },
    ],
  },
  teamHome: {
    eyebrow: "Ekibimiz",
    title: "Uzman Kadromuz",
    link: "Ekibimizi tanıyın",
    cardEyebrow: "Tüm ekip",
    cardTitle: "Ekibi gör",
    cardBody: "Her branşın hekimini, odağını ve hikâyesini tek sayfada tanıyın.",
    prev: "Önceki hekimler",
    next: "Sonraki hekimler",
  },
  reviews: {
    eyebrow: "Misafir notları",
    title: "Gülüşüyle dönenler anlatıyor.",
    score: "4.9",
    scoreLabel: "seçilmiş misafir notu",
  },
  closing: {
    eyebrow: "Randevu",
    title: "Bir hafta İstanbul. Yıllarca taşıyacağınız bir gülüş.",
    body: "Tarihinizi seçin. Ekibimiz aynı gün içinde, tedavi süresini netleştirerek döner.",
    cta: "Online Randevu",
  },
  about: {
    eyebrow: "Hakkımızda",
    title: "Sabırla işlenen, size ait bir estetik.",
    lede: "Aureum, Nişantaşı’nın kalbinde her tedaviyi o alanın uzmanına emanet eden bir diş kliniğidir. Sağlık turizmini dağınık bir program olmaktan çıkarır; uçuşunuz, konaklamanız ve randevularınız tek ve sakin bir takvimde buluşur.",
    storyEyebrow: "Hikâyemiz",
    storyTitle: "Her gülüş, yüzün kendi ritmiyle yazılır.",
    story: [
      "İstanbul’a tedavi için gelen misafirlerimizin çoğu, yanında yalnızca bir haftalık bir zaman getirir. O haftayı randevularla doldurmak kolaydır; asıl ustalık, her günü gerektiği kadar planlamaktır. Aureum’da takviminiz ilk görüşmede netleşir ve yolculuğunuz boyunca beklenmedik bir seansla bölünmez.",
      "Ortodonti, çocuk diş hekimliği, cerrahi, kanal ve diş eti tedavileri, her biri kendi uzmanının elinde ayrı ayrı planlanır. Estetik ise bu sağlam temelin üzerine kurulur: lamina, zirkonyum ya da beyazlatma, ancak altındaki sağlık tamamlandığında gündeme gelir.",
      "Teşvikiye’deki kliniğimiz bir vitrin olarak değil, bir atölye olarak tasarlandı. Dijital planlama, ilk günden son kontrole kadar değişmeyen bir ekip ve kayıt altında tutulan bir takip süreci… Evinize döndüğünüzde bile kontrol protokolünüz uzaktan, aynı özenle devam eder.",
    ],
    statsEyebrow: "Rakamlarla Aureum",
    principlesEyebrow: "İlkelerimiz",
    principlesTitle: "Baştan söz verdiğimiz dört şey.",
    principles: [
      {
        title: "Her branş, kendi uzmanında",
        body: "Tedavinizi yapan hekimin adı en baştan bellidir. Her uzmanlık alanı, yalnızca o alanın hekimine emanettir.",
      },
      {
        title: "Plan, yolculuktan önce hazır",
        body: "Fotoğraflarınızı ve beklentilerinizi online olarak alırız. Tedavi süresi ve sıralaması, siz yola çıkmadan netleşir.",
      },
      {
        title: "Sürpriz yok, şeffaflık var",
        body: "Takviminiz baştan yazılır. Yeni bir seans ya da ek bir işlem, yalnızca sizin onayınızla programa girer.",
      },
      {
        title: "Takip, dönüşte bitmez",
        body: "Ülkenize döndükten sonra da kontrol protokolünüz uzaktan ve kayıt altında sürer; her sorunuz bir yanıt bulur.",
      },
    ],
    quote: "Gerçek güzellik bağırmaz; yüze ait olan gülüşte sessizce görünür.",
    quoteBy: "Aureum klinik felsefesi",
    pathsEyebrow: "Bizi daha yakından tanıyın",
    teamCardTitle: "Ekibimiz",
    teamCardBody: "Her branşın uzmanını, odak alanını ve tedaviye yaklaşımını tanıyın.",
    clinicCardTitle: "Kliniğimiz",
    clinicCardBody: "Nişantaşı’nda, teknolojiyi vitrine değil konforunuza adayan bir atölye.",
    read: "Sayfayı keşfet",
  },
  team: {
    eyebrow: "Ekibimiz",
    title: "Tedaviyi yapan isim,",
    titleAccent: "sayfada da durur.",
    lede: "Aureum’da her branş kendi hekimindedir. Ortodonti, çocuk, cerrahi, kanal, diş eti ve estetik aynı masada karışmaz. Planı yazan kişi, tedaviyi de yapar.",
    portrait: "Portre alanı",
    crewLabel: "Sizi karşılayacak ekip",
    statDoctors: "Uzman hekim",
    statBranches: "Ayrı branş",
    statFile: "Planı yazan, tedaviyi yapar",
    noteEyebrow: "Baştan sona aynı hekim",
    noteTitle: "Aynı hekim,",
    noteAccent: "ilk muayeneden son kontrole.",
    noteBody: "Sizi ilk muayenede dinleyen hekim, tedavinizi de bizzat yapar ve kontrollerinizi takip eder. Süreç boyunca muhatabınız değişmez.",
    steps: [
      { title: "İlk muayene", body: "Durumunuz değerlendirilir, planınız birlikte netleşir." },
      { title: "Tedavi", body: "Planı hazırlayan hekim, tedaviyi de kendisi yapar." },
      { title: "Düzenli kontrol", body: "Takipleriniz de aynı hekimle devam eder." },
    ],
    cta: "Bu ekiple randevu",
    contact: "Ekiple konuşun",
    moreEyebrow: "Bizi daha yakından tanıyın",
    aboutCardBody: "Hikâyemizi, ilkelerimizi ve gülüşe bakışımızı yakından tanıyın.",
  },
  clinic: {
    galleryEyebrow: "Mekân turu",
    galleryTitle: "Kliniğimizi inceleyin",
    galleryLede: "Karşılamadan laboratuvara, Nişantaşı’ndaki kliniğimizin her odasını yakından görün.",
    gallery: {
      filterLabel: "Kata göre filtrele",
      all: "Tümü",
      open: "Yakından gör",
      related: "Bu odada",
      welcome: "Her ziyarette ortak alan",
      close: "Kapat",
      prev: "Önceki oda",
      next: "Sonraki oda",
      book: "Randevu al",
    },
    eyebrow: "Kliniğimiz",
    title: "Görünmeyen teknoloji, görünen sakinlik.",
    lede: "Teşvikiye Caddesi’nde, sağlık turizmine göre kurulmuş bir klinik. Cihazlar vitrin için değil; süreyi kısaltmak ve kenarı netleştirmek için durur.",
    stats: { spaces: "Mekân", floors: "Kat", tech: "Teknoloji" },
    spacesEyebrow: "Mekân",
    spacesTitle: "Üç oda. Aynı tempo.",
    spaces: [
      {
        title: "Karşılama",
        body: "İlk saat dijital kayıt, tarama ve yüz analizi içindir. Bekleme, programın parçası değildir.",
      },
      {
        title: "Tedavi",
        body: "Cerrahi, estetik ve restorasyon ayrı ünitelerde ilerler. Aynı gün iki iş varsa, sıra baştan yazılmıştır.",
      },
      {
        title: "Plan",
        body: "Gülüş, fotoğraf ve tarama üzerinden tedaviye başlamadan konuşulur. Bitiş, ağızda sürpriz olmaz.",
      },
    ],
    techEyebrow: "Atölye",
    techTitle: "Sahada duran cihaz.",
    techLede: "Her biri tek bir işi kısaltır. Listelenmelerinin nedeni budur.",
    visitEyebrow: "Ziyaret",
    visitTitle: "Nişantaşı’ndayız.",
    visitBody: "Sağlık turizmi için uçuş tarihinizi yazmanız yeterli. Ekip, süreyi aynı gün içinde netleştirerek döner.",
    contact: "İletişime geç",
    book: "Online randevu",
  },
  servicesPage: {
    eyebrow: "Tedavilerimiz",
    title: "Gülüşünüz için on dört özenli tedavi.",
    lede: "Her tedavinin kendine ait bir hikâyesi var. Bir fotoğrafa dokunun; yöntemi, uygulama adımlarını ve sizinle ilgilenecek hekimi tek sayfada keşfedin.",
    durationLabel: "Tipik süre",
    book: "Bu tedavi için randevu",
    read: "Tedaviyi oku",
  },
  treatmentPage: {
    back: "Tüm tedaviler",
    causes: "Problemin sebebi nedir?",
    goals: "Tedavinin amaçları",
    methods: "Tedavi yöntemleri nelerdir?",
    application: "Tedavi nasıl uygulanır?",
    teeth: "Hangi dişler tedavi edilir?",
    aftercare: "İyileşme ve sonrasında ne olur?",
    duration: "Süre",
    visits: "Kontrol",
    comfort: "Konfor",
    doctorsEyebrow: "Bu tedaviyi yapan hekimler",
    doctorsTitle: "İsim, branşın yanında.",
    relatedEyebrow: "Keşfetmeye devam edin",
    related: "Diğer tedaviler",
    relatedLede: "Gülüşünüzün hikâyesi tek bir tedaviyle sınırlı kalmayabilir. Size yakın olabilecek diğer başlıklara göz atın.",
    relatedAll: "Tüm tedaviler",
    relatedRead: "İncele",
    note: "Klinik notu",
    disclaimer: "Bu sayfa genel bilgidir. Plan, muayene ve filmlerden sonra size göre yazılır.",
    barKicker: "Yanınızdayız",
    barBody: "Sorunuz varsa randevuyla netleştirelim.",
  },
  blogPage: {
    eyebrow: "Blog",
    title: "Gülüşünüz hakkında,",
    titleAccent: "bilmeniz gerekenler.",
    lede: "Hekimlerimizin kaleminden; tedaviler, bakım ve sağlık turizmi üzerine sade, güvenilir ve güncel yazılar.",
    filterLabel: "Kategoriye göre filtrele",
    all: "Tümü",
    featured: "Öne çıkan",
    readMore: "Devamını oku",
    minRead: "dk okuma",
    posts: "yazı",
    categoryCount: "kategori",
    recent: "Güncel Makaleler",
    categories: "Kategoriler",
    ctaEyebrow: "Sorunuz mu var?",
    ctaTitle: "Yazının ötesini hekiminizle konuşun.",
    ctaBody: "Her ağız farklıdır. Size özel planı, muayeneden sonra birlikte netleştirelim.",
    ctaButton: "Online Randevu",
  },
  blogPost: {
    back: "Tüm yazılar",
    writtenBy: "Yazan",
    editorial: "Aureum Klinik Ekibi",
    editorialRole: "Hasta deneyimi ve planlama",
    published: "Yayın tarihi",
    readTime: "Okuma süresi",
    takeaway: "Akılda kalsın",
    onThisPage: "Bu yazıda",
    treatmentEyebrow: "İlgili tedavi",
    treatmentCta: "Tedaviyi incele",
    bookCta: "Randevu al",
    disclaimer: "Bu yazı genel bilgilendirme amaçlıdır ve muayenenin yerini tutmaz. Size uygun tedavi, hekim değerlendirmesinden sonra belirlenir.",
    relatedEyebrow: "Okumaya devam edin",
    related: "Benzer yazılar",
    allPosts: "Tüm yazılar",
  },
  contact: {
    eyebrow: "İletişim",
    title: "Nişantaşı’ndayız.",
    lede: "Stüdyoya uğrayın ya da bir not bırakın. Sağlık turizmi için uçuş tarihinizi yazmanız yeterli.",
    addressLabel: "Adres",
    hoursLabel: "Saatler",
    phoneLabel: "Telefon",
    emailLabel: "E-posta",
    mapLabel: "Harita",
    formTitle: "Mesaj bırakın",
    name: "Ad soyad",
    email: "E-posta",
    phone: "Telefon",
    message: "Mesaj",
    namePh: "Adınız",
    emailPh: "ornek@mail.com",
    phonePh: "+90 …",
    messagePh: "Uçuş tarihiniz ve merak ettiğiniz tedavi",
    send: "Mesajı gönder",
    sending: "Gönderiliyor",
    successTitle: "Notunuz ulaştı.",
    successBody: "Demo kaydı oluşturuldu. Canlı sistemde ekip aynı gün içinde döner.",
    error: "Mesaj şu an kaydedilemedi. Lütfen yeniden deneyin.",
    privacy: "Bilgileriniz yalnızca size dönüş yapmak için kullanılır.",
    formLede: "Tedavi, randevu veya sağlık turizmi hakkında yazın. Ekibimiz aynı gün içinde döner.",
    subject: "Konu",
    subjectPh: "Tedavi, randevu, sağlık turizmi…",
    emailNote: "Sorularınız için buradayız.",
    whatsappLabel: "WhatsApp",
    whatsappBody: "Önerilen kanal. Dönüş burada daha hızlı.",
    directions: "Yol tarifi al",
    openMap: "Haritada aç",
    openNow: "Şu an açığız",
    closedNow: "Şu an kapalıyız",
    openUntil: "Bugün 19:00’a kadar buradayız.",
    closedNote: "Bir not bırakın; açılışta ilk size döneriz.",
    localTime: "İstanbul’da saat",
    today: "Bugün",
    stats: {
      reply: "Dönüş",
      replyValue: "Aynı gün",
      week: "Haftada",
      weekValue: "6 gün",
      languages: "Dil",
      languagesValue: "TR · EN",
    },
    recommended: "Önerilen",
    actions: { call: "Hemen ara", write: "Mesaj yaz", mail: "E-posta gönder" },
    formHeading: "Size aynı gün dönelim.",
    topics: ["Tedavi", "Randevu", "Sağlık turizmi", "Fiyat bilgisi"],
    newMessage: "Yeni mesaj yaz",
    visitEyebrow: "Ziyaret",
    travelEyebrow: "Nasıl gelinir",
    travelTitle: "Kapıya kadar planlı.",
    travelLede: "İstanbul dışından geliyorsanız uçuş tarihlerinizi yazmanız yeterli. Gerisini birlikte planlarız.",
    travel: [
      { title: "Metro", body: "M2 hattı, Osmanbey durağı. Kliniğe yaklaşık 8 dakika yürüme." },
      { title: "Havalimanı", body: "İstanbul Havalimanı’ndan yaklaşık 45 dakika. Transferinizi biz ayarlarız." },
      { title: "Konaklama", body: "Nişantaşı otelleri yürüme mesafesinde. Seans sırasına göre öneri yaparız." },
    ],
    book: "Online randevu",
  },
  appointment: {
    eyebrow: "Randevu",
    title: "Üç adım. Başka bir şey yok.",
    lede: "Tedavi, zaman ve size ulaşacağımız bilgiler. Onaydan sonra ekip aynı gün içinde döner.",
    steps: ["Tedavi", "Zaman", "Bilgiler"],
    stepTitles: [
      "Hangi tedavi için geliyorsunuz?",
      "Size uyan günü ve saati seçin.",
      "Size nasıl ulaşalım?",
    ],
    stepCount: "Adım",
    back: "Geri",
    next: "Devam",
    submit: "Randevuyu onayla",
    submitting: "Kaydediliyor",
    searchPh: "Tedavi ara: implant, beyazlatma, kanal…",
    filterAll: "Tümü",
    noResults: "Bu aramayla eşleşen bir tedavi yok. Farklı bir kelime deneyin.",
    notSure: "Emin değil misiniz? Size en yakın görüneni seçin; hekiminiz ilk muayenede planı birlikte netleştirir.",
    firstAvailable: "İlk uygun saat",
    firstAvailableCta: "Bu saati seç",
    days: "Gün",
    times: "Saat",
    morning: "Sabah",
    afternoon: "Öğleden sonra",
    openCount: "boş",
    dayFull: "Dolu",
    pickDate: "Önce bir gün seçin. Saatler ardından açılır.",
    scheduleNote: "Pazar kapalıyız. Öğle arası 13:00–14:00.",
    full: "Dolu",
    past: "Geçti",
    summary: "Seçiminiz",
    edit: "Değiştir",
    channelLabel: "Size nereden dönelim?",
    channels: { phone: "Telefon", whatsapp: "WhatsApp", email: "E-posta" },
    visitorLabel: "Nereden geliyorsunuz?",
    visitors: { local: "İstanbul’dayım", abroad: "Şehir ya da ülke dışından" },
    abroadHint: "Uçuş tarihlerinizi nota yazın; transfer, konaklama ve seans sırasını birlikte planlayalım.",
    consent: "Kişisel verilerimin randevu talebim için işlenmesini ve benimle iletişime geçilmesini onaylıyorum (KVKK).",
    note: "Not",
    notePh: "Uçuş saati, otel veya merak ettiğiniz bir ayrıntı (isteğe bağlı)",
    asideTitle: "Randevu özeti",
    asideEmpty: "Henüz seçilmedi",
    asideTreatment: "Tedavi",
    asideDoctor: "Hekim",
    asideDuration: "Tipik süre",
    asideDate: "Tarih",
    asideTime: "Saat",
    asideContact: "Dönüş kanalı",
    afterTitle: "Sonra ne olur?",
    afterSteps: [
      "Talebiniz anında ekibimize ulaşır.",
      "Aynı gün içinde seçtiğiniz kanaldan dönüp saati teyit ederiz.",
      "Randevu gününüzde sizi Nişantaşı’nda karşılarız.",
    ],
    helpTitle: "Yardım mı lazım?",
    helpBody: "Telefon ya da WhatsApp ile birkaç dakikada birlikte randevu oluşturalım.",
    call: "Ara",
    whatsapp: "WhatsApp",
    whatsappMessage: "Merhaba, randevu almak istiyorum.",
    successTitle: "Talebiniz alındı.",
    successBody: "Ekip, seçtiğiniz saati teyit etmek için aynı gün içinde sizinle iletişime geçer.",
    reference: "Referans",
    addCalendar: "Takvime ekle",
    calendarTitle: "Aureum randevusu",
    calendarNote: "Randevu talebi. Klinik teyidi sonrası kesinleşir.",
    whatsappConfirm: "WhatsApp’tan teyit et",
    again: "Yeni randevu",
    home: "Ana sayfa",
    privacy: "Bu bilgiler randevu kaydı için tutulur.",
    demoNote: "Şimdilik tarayıcınızda demo kayıt olarak durur. Supabase bağlandığında aynı yapı kliniğe iletilir.",
    error: "Kayıt tamamlanamadı. Lütfen yeniden deneyin.",
  },
  errors: {
    service: "Lütfen bir hizmet seçin.",
    date: "Lütfen bir gün seçin.",
    time: "Lütfen uygun bir saat seçin.",
    name: "Ad soyad en az 2 karakter olmalı.",
    phone: "Geçerli bir telefon numarası girin.",
    email: "Geçerli bir e-posta girin.",
    message: "Mesajınız en az 10 karakter olmalı.",
    consent: "Devam etmek için onay kutusunu işaretleyin.",
  },
  footer: {
    blurb: "Nişantaşı’nda, sağlık turizmine göre kurulmuş estetik diş kliniği.",
    explore: "Keşfet",
    care: "Tedaviler",
    visit: "Ziyaret",
    rights: "Tüm hakları saklıdır.",
    call: "Bizi arayın",
    whatsapp: "WhatsApp",
    whatsappValue: "Hemen yazın",
    mail: "E-posta",
    hours: "Çalışma saatleri",
    backToTop: "Yukarı dön",
  },
  hours: [
    { days: "Pazartesi – Cumartesi", time: "09:00 – 19:00" },
    { days: "Pazar", time: "Kapalı" },
  ],
  address: ["Teşvikiye Caddesi No: 18", "Nişantaşı, Şişli", "İstanbul"],
  floating: {
    title: "Canlı Destek",
    close: "Kapat",
    body: "Hemen yardım almak için e-posta gönderebilir veya iletişim formunu kullanabilirsiniz.",
    whatsapp: "WhatsApp ile yaz",
    whatsappMessage: "Bilgi almak istiyorum",
    email: "E-posta ile ulaş",
    contact: "İletişim sayfasına git",
  },
  notFound: {
    eyebrow: "404",
    title: "Bu sayfa klinikte yok.",
    body: "Aradığınız adres taşınmış ya da hiç açılmamış olabilir.",
    home: "Ana sayfaya dön",
  },
  preloader: { skip: "Geç" },
  quiet: { label: "Randevu hattı" },
};

export const en: Dictionary = {
  nav: {
    home: "Home",
    corporate: "Practice",
    about: "About",
    team: "Our team",
    clinic: "The clinic",
    services: "Treatments",
    blog: "Blog",
    contact: "Contact",
    book: "Online booking",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  lang: { label: "Language", tr: "Türkçe", en: "English" },
  hero: {
    eyebrow: "Istanbul · Health tourism",
    titleLead: "Your smile,",
    titleEmphasis: "your signature.",
    lede: "A measured aesthetic in Nişantaşı, shaped by digital planning and practised hands. From implants to smile design, a calm process with dates attached.",
    cta: "Discover your smile",
    secondary: "Meet the clinic",
    scroll: "Scroll",
  },
  anatomy: {
    eyebrow: "Live anatomy",
    title: "The tooth, layer by layer.",
    body: "Move across the glass enamel. Each point shows where a treatment begins.",
    hint: "Glass enamel, gold orbit",
  },
  orbit: {
    items: [
      {
        label: "Enamel",
        detail: "The translucent outer layer. Brilliance, and the first note of colour, begin here.",
      },
      {
        label: "Dentin",
        detail: "The living tissue beneath the enamel. The tooth takes its warm shade from here.",
      },
      {
        label: "Root structure",
        detail: "The quiet foundation seated in the jaw. A lasting result starts here.",
      },
      {
        label: "Implant technology",
        detail: "Titanium, planned with a digital guide, bonding with the bone.",
      },
      {
        label: "Zirconia surface",
        detail: "A metal-free ceramic that passes light. The shade is read from the neighbouring tooth.",
      },
    ],
  },
  statsTitle: "Figures",
  stats: [
    { to: 18, suffix: "+", label: "Years of expertise" },
    { to: 15000, suffix: "+", label: "Successful smile designs", grouped: true },
    { to: 50, suffix: "+", label: "Patients from different countries" },
    { to: 4, suffix: ".9", mark: "/5", label: "Trustpilot satisfaction" },
  ],
  intro: {
    eyebrow: "The clinic",
    title: "An aesthetic that refuses to be rushed.",
    body: "At Aureum, every smile is designed around the proportions, light and character of your face. Digital planning lets you see the result before treatment begins, and the fine hand of our experienced clinicians gives you a natural aesthetic that is entirely your own. In our Nişantaşı clinic, comfort, hygiene and care meet you in every detail.",
    link: "Meet the clinic",
  },
  servicesHome: {
    eyebrow: "Treatments",
    title: "Our treatments",
    lede: "Look through the dental care we offer in a fully equipped clinic, with a specialist for each field.",
    explore: "All treatments",
    viewAll: "View all",
    prev: "Previous treatments",
    next: "Next treatments",
  },
  journey: {
    eyebrow: "Process",
    title: "From your first visit to a lasting result, we are with you at every step.",
    steps: [
      {
        title: "Examination & Consultation",
        body: "Your oral health is assessed in detail. We listen to your expectations and clearly explain the treatment options best suited to you.",
      },
      {
        title: "Digital Planning",
        body: "With 3D scanning, digital X-rays and smile analysis, your treatment is planned individually. We review the outcome together before treatment begins.",
      },
      {
        title: "Expert Treatment",
        body: "Our specialist dentists carry out your treatment with care and precision, using current technology and the highest hygiene standards.",
      },
      {
        title: "Follow-up & Care",
        body: "Regular check-ups after treatment help keep your results lasting, and we stay by your side to protect your oral health in the long term.",
      },
    ],
  },
  teamHome: {
    eyebrow: "Our team",
    title: "Our specialists",
    link: "Meet the team",
    cardEyebrow: "The full team",
    cardTitle: "See the team",
    cardBody: "Meet each discipline’s clinician, their focus and their story on one page.",
    prev: "Previous clinicians",
    next: "Next clinicians",
  },
  reviews: {
    eyebrow: "Guest notes",
    title: "Sentences from people who flew in.",
    score: "4.9",
    scoreLabel: "selected guest notes",
  },
  closing: {
    eyebrow: "Appointment",
    title: "A week in Istanbul. A smile you will carry for years.",
    body: "Choose a date. The team replies the same day, with the treatment length made clear.",
    cta: "Online booking",
  },
  about: {
    eyebrow: "About",
    title: "An aesthetic crafted with patience, and made for you.",
    lede: "In the heart of Nişantaşı, Aureum is a dental clinic that entrusts every treatment to the specialist of that field. We turn health tourism from a scattered itinerary into one calm calendar, where your flight, your stay and your appointments meet.",
    storyEyebrow: "Our story",
    storyTitle: "Every smile is written to the face’s own rhythm.",
    story: [
      "Most guests who travel to Istanbul for treatment arrive with only a week to spare. Filling that week with appointments is easy; the real craft lies in planning each day only as much as it needs. At Aureum, your calendar is settled at the first consultation and is never interrupted by an unexpected visit.",
      "Orthodontics, children’s dentistry, surgery, root canals and gum care are each planned separately, in the hands of their own specialist. Aesthetics is then built on that solid foundation: veneers, zirconia or whitening are discussed only once the health beneath them is complete.",
      "Our clinic on Teşvikiye was designed as a studio, not a showroom. A digital plan, a team that stays the same from the first day to the final review, and a follow-up kept on record… Even after you fly home, your review protocol continues remotely, with the same care.",
    ],
    statsEyebrow: "Aureum in figures",
    principlesEyebrow: "Our principles",
    principlesTitle: "Four promises we make from the start.",
    principles: [
      {
        title: "Each discipline, its own specialist",
        body: "The name of the clinician treating you is clear from the very beginning. Every field stays with the clinician who practises it.",
      },
      {
        title: "The plan is ready before you travel",
        body: "We receive your photographs and wishes online. The length and order of treatment are settled before you set off.",
      },
      {
        title: "No surprises, only clarity",
        body: "Your calendar is written first. A new visit or an added procedure enters the programme only with your approval.",
      },
      {
        title: "Care does not end at departure",
        body: "Once you are home, your review protocol continues remotely and on record; every question finds an answer.",
      },
    ],
    quote: "True beauty never shouts; it quietly shows in a smile that belongs to the face.",
    quoteBy: "The Aureum philosophy",
    pathsEyebrow: "Get to know us better",
    teamCardTitle: "Our team",
    teamCardBody: "Meet the specialist of each discipline, their focus and their approach to care.",
    clinicCardTitle: "The clinic",
    clinicCardBody: "A studio in Nişantaşı that devotes its technology to your comfort, not to display.",
    read: "Explore the page",
  },
  team: {
    eyebrow: "Our team",
    title: "The name on the treatment",
    titleAccent: "is the name on the page.",
    lede: "At Aureum, each discipline stays with its own clinician. Orthodontics, children, surgery, root canals, gums and aesthetics do not share one chair. The person who writes the plan also carries it out.",
    portrait: "Portrait slot",
    crewLabel: "The team who will welcome you",
    statDoctors: "Specialist clinicians",
    statBranches: "Separate disciplines",
    statFile: "The planner is the practitioner",
    noteEyebrow: "One clinician, start to finish",
    noteTitle: "The same clinician,",
    noteAccent: "from first exam to final check-up.",
    noteBody: "The clinician who listens to you at your first exam also performs your treatment and follows your check-ups. Your point of contact never changes.",
    steps: [
      { title: "First examination", body: "Your needs are assessed and your plan is shaped together." },
      { title: "Treatment", body: "The clinician who wrote the plan carries it out." },
      { title: "Regular check-ups", body: "Your follow-ups continue with the same clinician." },
    ],
    cta: "Book with this team",
    contact: "Talk to the team",
    moreEyebrow: "Get to know us better",
    aboutCardBody: "Discover our story, our principles and the way we look at a smile.",
  },
  clinic: {
    galleryEyebrow: "A tour",
    galleryTitle: "Step inside the clinic",
    galleryLede: "From reception to the laboratory, see every room of our Nişantaşı clinic up close.",
    gallery: {
      filterLabel: "Filter by floor",
      all: "All",
      open: "View up close",
      related: "In this room",
      welcome: "Shared by every visit",
      close: "Close",
      prev: "Previous room",
      next: "Next room",
      book: "Book a visit",
    },
    eyebrow: "The clinic",
    title: "Quiet technology. Visible calm.",
    lede: "A clinic on Teşvikiye Avenue, arranged for health tourism. The equipment is not here for display. It shortens the timeline and sharpens the margin.",
    stats: { spaces: "Spaces", floors: "Floors", tech: "Technologies" },
    spacesEyebrow: "The rooms",
    spacesTitle: "Three rooms. One tempo.",
    spaces: [
      {
        title: "Arrival",
        body: "The first hour is for digital records, a scan and facial analysis. Waiting is not part of the programme.",
      },
      {
        title: "Treatment",
        body: "Surgery, aesthetics and restoration move in separate units. If two things share a day, the order was written first.",
      },
      {
        title: "The plan",
        body: "The smile is discussed from photographs and a scan before treatment begins. The finish is not a surprise in the mouth.",
      },
    ],
    techEyebrow: "The studio",
    techTitle: "Equipment that stays on the floor.",
    techLede: "Each piece shortens one job. That is why it is listed.",
    visitEyebrow: "Visit",
    visitTitle: "We are in Nişantaşı.",
    visitBody: "For health tourism, your flight dates are enough to begin. The team replies the same day, with the length made clear.",
    contact: "Get in touch",
    book: "Online booking",
  },
  servicesPage: {
    eyebrow: "Treatments",
    title: "Fourteen treatments, crafted for your smile.",
    lede: "Every treatment has its own story. Tap a photograph to discover the method, each step of the visit and the clinician who will care for you, all on one page.",
    durationLabel: "Typical length",
    book: "Book this treatment",
    read: "Read the treatment",
  },
  treatmentPage: {
    back: "All treatments",
    causes: "What causes the problem?",
    goals: "What the treatment is for",
    methods: "What are the methods?",
    application: "How is it carried out?",
    teeth: "Which teeth are treated?",
    aftercare: "What happens afterwards?",
    duration: "Length",
    visits: "Reviews",
    comfort: "Comfort",
    doctorsEyebrow: "The clinicians who do this",
    doctorsTitle: "The name sits beside the discipline.",
    relatedEyebrow: "Keep exploring",
    related: "Other treatments",
    relatedLede: "A smile’s story rarely ends with a single treatment. Take a look at the others that may be close to yours.",
    relatedAll: "All treatments",
    relatedRead: "Explore",
    note: "A clinic note",
    disclaimer: "This page is general information. Your plan is written after an examination and radiographs.",
    barKicker: "We are with you",
    barBody: "If you have a question, an appointment will make it clear.",
  },
  blogPage: {
    eyebrow: "Blog",
    title: "About your smile,",
    titleAccent: "what is worth knowing.",
    lede: "Written by our clinicians: clear, reliable and current articles on treatments, everyday care and health tourism.",
    filterLabel: "Filter by category",
    all: "All",
    featured: "Featured",
    readMore: "Read more",
    minRead: "min read",
    posts: "articles",
    categoryCount: "categories",
    recent: "Recent articles",
    categories: "Categories",
    ctaEyebrow: "Have a question?",
    ctaTitle: "Take the article further with your clinician.",
    ctaBody: "Every mouth is different. We settle your own plan together, after an examination.",
    ctaButton: "Online booking",
  },
  blogPost: {
    back: "All articles",
    writtenBy: "Written by",
    editorial: "Aureum Clinical Team",
    editorialRole: "Patient experience & planning",
    published: "Published",
    readTime: "Reading time",
    takeaway: "Worth remembering",
    onThisPage: "In this article",
    treatmentEyebrow: "Related treatment",
    treatmentCta: "Explore the treatment",
    bookCta: "Book a visit",
    disclaimer: "This article is general information and does not replace an examination. The right treatment for you is decided after your clinician’s assessment.",
    relatedEyebrow: "Keep reading",
    related: "Related articles",
    allPosts: "All articles",
  },
  contact: {
    eyebrow: "Contact",
    title: "We are in Nişantaşı.",
    lede: "Visit the studio, or leave a note. For health tourism, your flight dates are enough to begin.",
    addressLabel: "Address",
    hoursLabel: "Hours",
    phoneLabel: "Phone",
    emailLabel: "Email",
    mapLabel: "Map",
    formTitle: "Leave a note",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    namePh: "Your name",
    emailPh: "name@email.com",
    phonePh: "+44 …",
    messagePh: "Your flight dates and the treatment you are considering",
    send: "Send message",
    sending: "Sending",
    successTitle: "Your note arrived.",
    successBody: "A demo record was saved. On the live system the team replies the same day.",
    error: "The message could not be saved. Please try again.",
    privacy: "Your details are used only to reply to you.",
    formLede: "Write to us about a treatment, an appointment, or health tourism. The team replies the same day.",
    subject: "Subject",
    subjectPh: "Treatment, appointment, health tourism…",
    emailNote: "We are here for your questions.",
    whatsappLabel: "WhatsApp",
    whatsappBody: "Recommended channel. Replies are faster here.",
    directions: "Get directions",
    openMap: "Open in Maps",
    openNow: "Open now",
    closedNow: "Closed now",
    openUntil: "We are here until 19:00 today.",
    closedNote: "Leave a note; you will be the first we reply to when we open.",
    localTime: "Time in Istanbul",
    today: "Today",
    stats: {
      reply: "Reply",
      replyValue: "Same day",
      week: "Per week",
      weekValue: "6 days",
      languages: "Languages",
      languagesValue: "TR · EN",
    },
    recommended: "Recommended",
    actions: { call: "Call now", write: "Send a message", mail: "Send an email" },
    formHeading: "We reply the same day.",
    topics: ["Treatment", "Appointment", "Health tourism", "Pricing"],
    newMessage: "Write another note",
    visitEyebrow: "Visit",
    travelEyebrow: "Getting here",
    travelTitle: "Planned to the door.",
    travelLede: "Coming from outside Istanbul? Your flight dates are enough. We plan the rest with you.",
    travel: [
      { title: "Metro", body: "M2 line, Osmanbey station. About an 8-minute walk to the clinic." },
      { title: "Airport", body: "About 45 minutes from Istanbul Airport. We arrange your transfer." },
      { title: "Stay", body: "Nişantaşı hotels are within walking distance. We suggest one around your visit plan." },
    ],
    book: "Online booking",
  },
  appointment: {
    eyebrow: "Appointment",
    title: "Three steps. Nothing else.",
    lede: "Treatment, time, and how we reach you. After you confirm, the team replies the same day.",
    steps: ["Treatment", "Time", "Details"],
    stepTitles: [
      "Which treatment are you coming for?",
      "Choose the day and time that suit you.",
      "How should we reach you?",
    ],
    stepCount: "Step",
    back: "Back",
    next: "Continue",
    submit: "Confirm request",
    submitting: "Saving",
    searchPh: "Search: implant, whitening, root canal…",
    filterAll: "All",
    noResults: "No treatment matches this search. Try another word.",
    notSure: "Not sure? Choose the closest one; your clinician settles the plan with you at the first visit.",
    firstAvailable: "First available",
    firstAvailableCta: "Take this time",
    days: "Day",
    times: "Time",
    morning: "Morning",
    afternoon: "Afternoon",
    openCount: "open",
    dayFull: "Full",
    pickDate: "Choose a day first. Times open after that.",
    scheduleNote: "Closed on Sundays. Lunch break 13:00–14:00.",
    full: "Full",
    past: "Passed",
    summary: "Your selection",
    edit: "Change",
    channelLabel: "Where should we reply?",
    channels: { phone: "Phone", whatsapp: "WhatsApp", email: "Email" },
    visitorLabel: "Where are you coming from?",
    visitors: { local: "I am in Istanbul", abroad: "Travelling in" },
    abroadHint: "Add your flight dates to the note; we will plan the transfer, stay and visit order with you.",
    consent: "I agree that my personal data is processed for this request and that the clinic may contact me.",
    note: "Note",
    notePh: "Flight time, hotel, or a detail you want us to know (optional)",
    asideTitle: "Your appointment",
    asideEmpty: "Not chosen yet",
    asideTreatment: "Treatment",
    asideDoctor: "Clinician",
    asideDuration: "Typical length",
    asideDate: "Date",
    asideTime: "Time",
    asideContact: "Reply via",
    afterTitle: "What happens next?",
    afterSteps: [
      "Your request reaches the team instantly.",
      "We reply the same day on your chosen channel to confirm the time.",
      "On the day, we welcome you in Nişantaşı.",
    ],
    helpTitle: "Need a hand?",
    helpBody: "Call or message us and we will book it together in a few minutes.",
    call: "Call",
    whatsapp: "WhatsApp",
    whatsappMessage: "Hello, I would like to book an appointment.",
    successTitle: "Your request is in.",
    successBody: "The team will contact you the same day to confirm the time you chose.",
    reference: "Reference",
    addCalendar: "Add to calendar",
    calendarTitle: "Aureum appointment",
    calendarNote: "Appointment request. Final once the clinic confirms.",
    whatsappConfirm: "Confirm on WhatsApp",
    again: "New request",
    home: "Home",
    privacy: "These details are kept for the appointment record.",
    demoNote: "For now this stays as a demo record in your browser. The same shape is sent to the clinic once Supabase is connected.",
    error: "The request could not be saved. Please try again.",
  },
  errors: {
    service: "Please choose a treatment.",
    date: "Please choose a day.",
    time: "Please choose an open time.",
    name: "Please enter at least 2 characters.",
    phone: "Enter a valid phone number.",
    email: "Enter a valid email.",
    message: "Your message should be at least 10 characters.",
    consent: "Please tick the consent box to continue.",
  },
  footer: {
    blurb: "An aesthetic dental clinic in Nişantaşı, arranged for health tourism.",
    explore: "Explore",
    care: "Treatments",
    visit: "Visit",
    rights: "All rights reserved.",
    call: "Call us",
    whatsapp: "WhatsApp",
    whatsappValue: "Message us now",
    mail: "Email",
    hours: "Opening hours",
    backToTop: "Back to top",
  },
  hours: [
    { days: "Monday – Saturday", time: "09:00 – 19:00" },
    { days: "Sunday", time: "Closed" },
  ],
  address: ["Teşvikiye Avenue No: 18", "Nişantaşı, Şişli", "Istanbul"],
  floating: {
    title: "Live support",
    close: "Close",
    body: "Send an email or use the contact form if you would like help right away.",
    whatsapp: "Message on WhatsApp",
    whatsappMessage: "I would like to get information",
    email: "Email us",
    contact: "Go to the contact page",
  },
  notFound: {
    eyebrow: "404",
    title: "This page is not in the clinic.",
    body: "The address may have moved, or it was never opened.",
    home: "Back home",
  },
  preloader: { skip: "Skip" },
  quiet: { label: "Appointment line" },
};
