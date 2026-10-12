type Localized = {
  tr: string;
  en: string;
};

export type ServiceIcon =
  | "bone"
  | "crown"
  | "sun"
  | "layers"
  | "scan"
  | "sparkles"
  | "baby"
  | "activity"
  | "droplet"
  | "microscope"
  | "shield"
  | "moon";

export type TreatmentId =
  | "ortodonti"
  | "telsiz-ortodonti"
  | "invisalign-first"
  | "pedodonti"
  | "agiz-dis-cene-cerrahisi"
  | "dental-implant"
  | "estetik-dis-hekimligi"
  | "endodonti"
  | "periodontoloji"
  | "konservatif-dis-tedavisi"
  | "dis-beyazlatma"
  | "dis-tasi-temizligi"
  | "cene-eklem-tedavisi"
  | "sedasyon";

export type ServiceId = TreatmentId;

export type Service = {
  id: ServiceId;
  icon: ServiceIcon;
  duration: Localized;
  name: Localized;
  summary: Localized;
  detail: Localized;
  featured?: boolean;
};

export type Treatment = {
  id: TreatmentId;
  icon: ServiceIcon;
  featured?: boolean;
  image: string;
  imageAlt: Localized;
  aside: string;
  asideAlt: Localized;
  duration: Localized;
  visits: Localized;
  comfort: Localized;
  name: Localized;
  summary: Localized;
  lede: Localized;
  note: Localized;
  causes: Localized;
  goals: Localized;
  methods: Localized;
  application: Localized;
  teeth: Localized;
  aftercare: Localized;
  doctorIds: string[];
};

const L = (tr: string, en: string): Localized => ({ tr, en });

export const treatments: Treatment[] = [
  {
    id: "ortodonti",
    icon: "scan",
    featured: true,
    image: "/treatments/braces.jpg",
    imageAlt: L("Dişlerinde tel olan gülümseyen bir genç", "A young person smiling with braces"),
    aside: "/treatments/ortodonti.jpg",
    asideAlt: L("Ortodonti planı konuşulan bir klinik görüşmesi", "An orthodontic planning visit in the clinic"),
    duration: L("12–24 ay", "12–24 months"),
    visits: L("4–8 haftada bir", "Every 4–8 weeks"),
    comfort: L("Kontrolde hafif basınç", "Light pressure at reviews"),
    name: L("Ortodonti", "Orthodontics"),
    summary: L(
      "Dişlerin ve kapanışın, tel ya da plakla, acele etmeden hizalandığı tedavi.",
      "A treatment that aligns the teeth and the bite with braces or aligners, without rushing.",
    ),
    lede: L(
      "Ortodonti, dişleri ve bazen çenelerin birbirine ilişkisini düzenler. Amaç yalnızca düzgün bir fotoğraf değil; çiğnerken, konuşurken ve fırçalarken rahat eden bir kapanıştır.\n\nSüre vakanın kendisine bağlıdır. Hafif bir çapraşıklık bir yıl civarında toparlanabilir. İskeletsel bir uyumsuzluk varsa plan uzar, bazen çene cerrahisiyle birlikte düşünülür. İlk randevuda fotoğraf, tarama ve film alınır. Ne kadar süreceği, başlamadan yazılır.",
      "Orthodontics arranges the teeth and, when needed, the way the jaws meet. The aim is not only a tidy photograph. It is a bite that is comfortable when you chew, speak and brush.\n\nThe length belongs to the case. Mild crowding may settle in about a year. A skeletal mismatch takes longer, and is sometimes planned with jaw surgery. Photographs, a scan and radiographs are taken at the first visit. The timeline is written before anything starts.",
    ),
    note: L(
      "Tel, dişleri çeker. Çenelerin büyüme yönünü ancak büyüme çağında, doğru apareyle etkiler.",
      "Braces move teeth. They influence jaw growth only during growth, and only with the right appliance.",
    ),
    causes: L(
      "Çapraşıklığın tek bir sebebi yoktur. Çene kemiği dişlere göre dar kalabilir. Süt dişi erken kaybedilirse komşu diş boşluğa kayar. Parmak emme ya da uzun süren emzik alışkanlığı ön dişleri öne iter.\n\nAğız solunumu, genetik yatkınlık ve bazı kas alışkanlıkları da kapanışı değiştirir. Dişler kötü olduğu için değil, yer ve zaman uyuşmadığı için eğrilir. Tedavi, bu ayrımı gördükten sonra kurulur.",
      "Crowding has no single cause. The jaw may be narrow for the teeth. If a baby tooth is lost early, a neighbour drifts into the space. Thumb sucking, or a dummy kept too long, pushes the front teeth forward.\n\nMouth breathing, family pattern and some muscle habits also change the bite. Teeth crowd because space and timing do not match, not because the teeth are poor. Treatment is built after that distinction is clear.",
    ),
    goals: L(
      "Dişleri hizalamak, üst ve alt dişlerin doğru temas etmesini sağlamak, çiğnemeyi rahatlatmak ve fırçanın ulaşamadığı köşeleri azaltmak. Estetik sonuç bunların yanındadır, yerine geçmez.\n\nBazı vakalarda amaç çene eklemini rahatlatmak ya da ileride bir protez veya implant için düzgün yer açmaktır. Hedef, ilk kayıtta birlikte seçilir.",
      "To align the teeth, let the upper and lower teeth meet properly, make chewing easier and reduce the corners a brush cannot reach. The look of the smile sits beside these aims. It does not replace them.\n\nIn some cases the aim is to ease the jaw joint, or to hold a clean space for a later bridge or implant. The goal is chosen with you at the records visit.",
    ),
    methods: L(
      "Sabit tel en klasik yoldur. Metal braket dayanıklıdır. Seramik braket gülüşte daha az görünür. Braket dişin ön yüzüne yapıştırılır, ark teli dişleri planlanan yöne çeker.\n\nDişin iç yüzüne yapışan lingual tel dışarıdan görünmez; dile ve konuşmaya alışma süresi ister. Şeffaf plak çıkarılabilir ve uygun vakada telin yerini alır. Hangi yöntemin size uyduğu, iskeletsel bir sorun olup olmadığına bağlıdır. Her ağza plak yazılmaz.",
      "Fixed braces are the classic route. Metal brackets are tough. Ceramic brackets show less in the smile. A bracket is bonded to the front of the tooth and an archwire draws the tooth along the plan.\n\nLingual braces sit on the inside of the teeth and stay hidden, but the tongue and speech need time to adapt. Clear aligners are removable and can replace braces in a suitable case. The choice depends on whether the jaws themselves are part of the problem. Aligners are not written for every mouth.",
    ),
    application: L(
      "İlk seansta ağız içi tarama, fotoğraflar ve panoramik film alınır. Gerekirse tomografi eklenir. Dijital modelde dişlerin hareketi sıra sıra gösterilir. Onayınız olmadan braket yapıştırılmaz.\n\nYapıştırma genellikle tek randevudur. Sonra tel, dört ila sekiz haftada bir güncellenir. Plak tedavisinde yeni seri evde takılır; kontrolde oturma ve takip bakılır. Bitişte pekiştirme apareyi, dişlerin eski yerine dönmemesi için devreye girer. Bu son adım süs değil, tedavinin parçasıdır.",
      "The first visit takes an intraoral scan, photographs and a panoramic radiograph. A scan of the bone is added when the case needs it. Tooth movement is shown, step by step, on a digital model. Brackets are not bonded before you agree.\n\nBonding is usually one appointment. The wire is then updated every four to eight weeks. With aligners, the next set is worn at home and the review checks fit and tracking. At the end a retainer keeps the teeth from drifting back. That last step is part of treatment, not an extra.",
    ),
    teeth: L(
      "Ortodonti tek bir dişi değil, kapanışı tedavi eder. Üst ve alt çenedeki sürekli dişlerin tamamı plana girer. Süt dişleriyle sürekli dişlerin bir arada olduğu yaşlarda bazen yalnızca yer açmak için sınırlı bir birinci faz yapılır.\n\nGömük bir kanin varsa o dişin yeri ayrıca planlanır. Bazen üzeri cerrahiyle açılıp tele bağlanır. Eksik dişin boşluğu kapatılabilir ya da ileride implant için korunabilir. Karar filmde görülür.",
      "Orthodontics treats the bite, not a single tooth. The permanent teeth of both jaws enter the plan. In the mixed dentition, a limited first phase is sometimes used only to make space.\n\nAn impacted canine is planned on its own. The gum may be opened surgically so the tooth can be drawn in. A missing-tooth space can be closed, or kept for a later implant. The radiograph decides.",
    ),
    aftercare: L(
      "Tel varken sert ve yapışkan yiyecekler braketi düşürür. Fırça, arayüz fırçası ve florürlü macun bu dönemde daha düzenli kullanılır. Plaklar günde yaklaşık yirmi iki saat ağızda kalır. Yemek ve sıcak içecek dışında çıkarılır.\n\nİlk günlerdeki his baskıdır, genellikle birkaç günde diner. Tedavi bitince pekiştirme apareyi aksarsa dişler geri oynar. Başarının en sık bozulduğu yer burasıdır. Kontrol, bitişten sonra da sürer.",
      "Hard and sticky food knocks brackets off. A brush, an interdental brush and a fluoride toothpaste matter more while braces are on. Aligners stay in for about twenty-two hours a day. They come out for meals and hot drinks.\n\nThe first days feel like pressure, and that usually settles within a few days. If the retainer is skipped after treatment, teeth drift. That is the most common way a good result is lost. Reviews continue after the finish.",
    ),
    doctorIds: ["deniz-kaya"],
  },
  {
    id: "telsiz-ortodonti",
    icon: "layers",
    image: "/treatments/aligner.jpg",
    imageAlt: L("Şeffaf plak ve diş modeli", "A clear aligner and a dental model"),
    aside: "/treatments/consult.jpg",
    asideAlt: L("Plak planı model üzerinde anlatılıyor", "An aligner plan explained on a model"),
    duration: L("6–18 ay", "6–18 months"),
    visits: L("6–10 haftada bir", "Every 6–10 weeks"),
    comfort: L("Çıkarılabilir plak", "Removable aligners"),
    name: L("Telsiz Ortodonti", "Aligner orthodontics"),
    summary: L(
      "Braketsiz, şeffaf plaklarla ilerleyen hizalama. Uygun vakada telin görüntüsü olmadan.",
      "Alignment with clear aligners and no brackets, when the case truly suits them.",
    ),
    lede: L(
      "Telsiz ortodonti, dişleri şeffaf ve çıkarılabilir plaklarla hareket ettirir. Toplantıda, sahnede ya da fotoğrafta braket görünmesin diye seçilir. Asıl fark ise başka yerdedir: plağı siz takar, siz çıkarırsınız. Disiplin tedavinin kendisidir.\n\nHer çapraşıklık plağa uymaz. İskeletsel bir kayma, ciddi dönmüş bir diş ya da büyük bir kapanış bozukluğu bazen sabit tel ister. Bunu ilk kayıtta söylemek, yarıda yöntem değiştirmekten daha dürüsttür.",
      "Aligner orthodontics moves teeth with clear, removable trays. People choose it so a bracket does not show in a meeting, on stage or in a photograph. The real difference sits elsewhere: you put the tray in, and you take it out. Discipline is the treatment.\n\nNot every crowd of teeth suits a tray. A skeletal shift, a badly rotated tooth or a large bite problem may still need fixed braces. Saying so at the records visit is more honest than changing method halfway.",
    ),
    note: L(
      "Plak günde yaklaşık 22 saat durmazsa, ekrandaki plan ağızda gerçekleşmez.",
      "If the tray is not worn for about 22 hours a day, the plan on the screen does not happen in the mouth.",
    ),
    causes: L(
      "Telsiz tedavinin baktığı sorunlar, klasik ortodontiyle aynıdır. Yer darlığı, dişler arası boşluk, hafif ve orta çapraşıklık, bazı öne itilmiş ön dişler ve sınırlı kapanış farkları.\n\nSebep çoğu zaman çene ile diş boyutu arasındaki uyumsuzluk, erken süt dişi kaybı ya da dil itimi gibi bir alışkanlıktır. Alışkanlık sürerken yalnızca plak yapmak, bitişten sonra geri dönüşü davet eder.",
      "Aligners look at the same problems as classic orthodontics. Lack of space, gaps, mild and moderate crowding, some flared front teeth and limited bite differences.\n\nThe cause is often a mismatch between jaw and tooth size, an early loss of a baby tooth, or a habit such as tongue thrust. Making trays while the habit continues invites relapse after the finish.",
    ),
    goals: L(
      "Dişleri planlanan konuma getirmek, kapanışı iyileştirmek ve bunu braket, tel ve lastik görünmeden yapmak. Konuşma ve sosyal hayat mümkün olduğunca bölünmesin diye plak tercih edilir.\n\nİkinci amaç temizliktir. Plak yemekte çıktığı için dişler fırçalanır, sonra geri takılır. Diş eti sağlığı tel tedavisine göre daha kolay korunur. Yine de plak kirliyse diş eti şişer.",
      "To bring the teeth to the planned position, improve the bite, and do it without brackets, wires and elastics showing. Trays are chosen so speech and social life are interrupted as little as possible.\n\nThe second aim is cleaning. The tray comes out for a meal, the teeth are brushed, and it goes back in. Gum health is easier to protect than with braces. A dirty tray still inflames the gum.",
    ),
    methods: L(
      "Plaklar, tarama üzerinden üretilen bir seri şeffaf apareydir. Her plak dişleri küçük bir adım oynatır. Invisalign bunun bilinen bir sistemidir. Klinikte başka şeffaf plak sistemleri de aynı mantıkla çalışır. Marka, vakanın zorluğuna ve kontrol sıklığına göre seçilir.\n\nBazı dişlere ataşman denilen minik kompozit çıkıntılar yapıştırılır. Plak bu çıkıntıdan tutunarak dişi döndürür. Dar yerlerde dişler arasından çok ince bir mine aşındırması, yani stripping, yer açabilir. Bu, her vakada yapılmaz.",
      "Aligners are a series of clear trays made from a scan. Each tray moves the teeth a small step. Invisalign is a well-known system. Other clear-aligner systems in the clinic work on the same idea. The brand is chosen for the difficulty of the case and how often it needs review.\n\nTiny composite bumps, called attachments, are bonded to some teeth. The tray grips them to rotate a tooth. Where space is tight, a very thin polish between teeth, stripping, can make room. It is not done in every case.",
    ),
    application: L(
      "Kayıt günü tarama, fotoğraf ve film alınır. Dijital kurulumda her haftanın diş konumu gösterilir. Siz bu sırayı görmeden üretime geçilmez. İlk plaklar geldiğinde ataşmanlar yapıştırılır, takıp çıkarma öğretilir.\n\nÇoğu kişide plak yedi ila on dört günde bir değişir. Kontrol, altı ila on haftada bir yeter. Ara plak oturmuyorsa seri durdurulur, gerekirse yeni tarama alınır. Bitişte şeffaf bir pekiştirme plağı ya da ince bir sabit retainer gece düzenini korur.",
      "On records day a scan, photographs and radiographs are taken. The digital setup shows where the teeth should be each week. Production does not start until you have seen that sequence. When the first trays arrive, attachments are bonded and you are taught how to seat and remove them.\n\nMost people change trays every seven to fourteen days. A review every six to ten weeks is enough. If a tray stops fitting, the series pauses and a new scan is taken if needed. At the end a clear retainer, or a thin fixed wire, keeps the night-time result.",
    ),
    teeth: L(
      "Plak, gülüşteki ön dişlerden çok kapanışın tamamına bakar. Üst ve alt çenedeki sürekli dişler birlikte hareket eder. Tek bir dişi öne almak, komşu dişleri hesaba katmadan yapılmaz.\n\nSüt dişlerinin sürdüğü karışık dişlenme çağı bu sayfanın konusu değildir. O dönem Invisalign First ile planlanır. Erişkinde eksik bir azı dişi varsa plak boşluğu kapatabilir ya da implant için koruyabilir. Hangisi olduğu, kemik ve kapanışla birlikte konuşulur.",
      "A tray looks at the whole bite, not only the front teeth in a photograph. The permanent teeth of both jaws move together. One tooth is not brought forward without accounting for its neighbours.\n\nThe mixed dentition, while baby teeth are still present, belongs to Invisalign First. In an adult, a missing molar space can be closed or kept for an implant. Which one is right is discussed with the bone and the bite.",
    ),
    aftercare: L(
      "Plak çıkarılınca kılıfında durur, peçeteye sarılıp unutulmaz. Sıcak su plağı çarpıtır. İçeceklerde şeker varsa plak dişin üstünde asit tutar. Bu yüzden su dışında bir şey içerken çıkarmak daha güvenlidir.\n\nDiş eti kenarında kızarıklık, plağın yeterince temizlenmediğini gösterir. İlk günler konuşmada hafif bir pelteklik olur, çoğu kişide hızla geçer. Tedavi bitince gece plağı bırakılırsa dişler yavaşça eski yerine yürür.",
      "When a tray comes out it lives in its case, not wrapped in a napkin. Hot water warps it. A sugary drink under a tray holds acid against the tooth, so anything but water is safer with the tray out.\n\nRedness at the gum line means the tray is not being cleaned. Speech is slightly soft for the first days, and for most people that passes quickly. If the night retainer is dropped after treatment, the teeth walk slowly back.",
    ),
    doctorIds: ["deniz-kaya"],
  },
  {
    id: "invisalign-first",
    icon: "baby",
    image: "/treatments/child-xray.jpg",
    imageAlt: L("Diş kaydı alınan gülümseyen bir çocuk", "A smiling child during dental records"),
    aside: "/treatments/aligner.jpg",
    asideAlt: L("Çocuk planında kullanılan şeffaf plak", "A clear aligner used in a child’s plan"),
    duration: L("6–18 ay", "6–18 months"),
    visits: L("6–8 haftada bir", "Every 6–8 weeks"),
    comfort: L("Çocuğa göre plak", "Trays sized for a child"),
    name: L("Invisalign First", "Invisalign First"),
    summary: L(
      "Karışık dişlenme çağında, yaklaşık 6–10 yaş için tasarlanmış erken şeffaf plak tedavisi.",
      "Early clear-aligner treatment for the mixed dentition, usually around ages 6 to 10.",
    ),
    lede: L(
      "Invisalign First, sürekli dişlerin hepsi sürmeden önce başlayan bir erken ortodontidir. Çocuğun ağzında hem süt dişi hem sürekli diş vardır. Plak, dar bir çeneyi genişletmeye, yer açmaya ve sürecek dişe yol vermeye çalışır.\n\nBu bir bitiş tedavisi değildir. Birinci fazdır. Ergenlikte, tüm sürekli dişler geldikten sonra kısa bir ikinci faz gerekebilir. Bunu baştan söylemek, aileyi sürpriz bir tel vaadiyle yormaz.",
      "Invisalign First is early orthodontics, begun before every permanent tooth has arrived. The child still has both baby teeth and permanent teeth. The trays try to widen a narrow jaw, make space and clear a path for teeth that are still to come.\n\nIt is not a finishing treatment. It is phase one. A shorter second phase may be needed in the teens, once the permanent teeth are in. Saying that at the start spares the family a surprise promise of braces.",
    ),
    note: L(
      "Erken plak, her çocuğa yazılmaz. Çene darlığı ya da yer kaybı varsa anlamlıdır.",
      "Early aligners are not written for every child. They make sense when the jaw is narrow or space has already been lost.",
    ),
    causes: L(
      "Bu yaştaki sorun çoğu zaman büyümeden gelir. Üst çene dar kalır, çapraz kapanış oluşur. Süt azı dişi erken çürüyüp çekilirse arkadaki diş öne kayar ve sürekli dişe yer kalmaz.\n\nParmak emme, uzun emzik, ağız solunumu ve dilin yutkunurken dişleri itmesi de ön bölgeyi açar. Sebep alışkanlıksa, plak tek başına yetmez. Alışkanlığın bırakılması planın parçasıdır.",
      "At this age the problem usually comes from growth. The upper jaw stays narrow and a crossbite appears. If a baby molar is lost early to decay, the tooth behind it drifts forward and the permanent tooth has nowhere to go.\n\nThumb sucking, a long-kept dummy, mouth breathing and a tongue that pushes on the teeth in swallowing also open the front. If the cause is a habit, trays alone are not enough. Leaving the habit is part of the plan.",
    ),
    goals: L(
      "Çeneye yer açmak, ters kapanışı büyüme çağında düzeltmek, sürekli dişin süreceği koridoru korumak ve ciddi bir çapraşıklığı ergenliğe daha küçük bir problem olarak bırakmak.\n\nAmaç çocuğun bütün dişlerini bu yaşta bitirmek değildir. Amaç, ileride daha kısa ve daha az diş çekimli bir tedavi ihtimalini artırmaktır. Bazı çocuklarda erken faz, ilerideki tedaviyi tamamen ortadan kaldırmaz.",
      "To make room in the jaws, correct a crossbite while the child is still growing, keep a corridor for permanent teeth, and leave the teenage years a smaller problem.\n\nThe aim is not to finish every tooth at this age. It is to raise the chance of a shorter later treatment, with fewer extractions. In some children an early phase does not remove the need for treatment later.",
    ),
    methods: L(
      "Invisalign First, karışık dişlenmeye göre üretilen şeffaf plaklardır. Süt dişlerinin kökleri eridiği için plak, sürekli diş plağı gibi tasarlanmaz. Genişletme, yer tutma ve bazı dişlerin yönü aynı seride birleşebilir.\n\nKlasik genişletme apareyi ya da yer tutucu, bazı ağızlarda plaktan daha doğru seçimdir. Hangisinin seçileceği çenenin darlığına ve çocuğun plağı takma alışkanlığına bağlıdır. Takılmayan bir plak, genişletmeyen bir apareydir.",
      "Invisalign First trays are made for the mixed dentition. Because baby-tooth roots are resorbing, the tray is not designed like an adult one. Widening, space holding and the direction of a few teeth can sit in the same series.\n\nA classic expander or a space maintainer is the better choice in some mouths. The decision follows how narrow the jaw is, and whether the child will actually wear the trays. A tray that stays in a pocket does not widen anything.",
    ),
    application: L(
      "İlk randevu sakin tutulur. Çocuk üniteyi tanır, film ve tarama oyun gibi değil, kısa ve anlatılarak alınır. Aile, plağın günde yaklaşık yirmi iki saat kalacağını bu gün duyar.\n\nPlaklar numaralıdır. Çocuk, ebeveynle birlikte değiştirir. Kontrolde oturma, diş eti ve yeni süren dişlere bakılır. Süt dişi kendiliğinden sallanıyorsa plak o dişe göre yenilenir. Faz bitince pekiştirme ve bir bekleme dönemi başlar. Ergenlikte kayıt taze çekilir.",
      "The first visit is kept calm. The child meets the chair. Radiographs and the scan are taken briefly, and explained, not turned into a performance. The family hears that day that the trays stay in for about twenty-two hours.\n\nThe trays are numbered. A parent changes them with the child. Reviews look at fit, the gum and newly erupted teeth. If a baby tooth loosens on its own, the tray is renewed around it. When the phase ends, retention and a waiting period begin. Records are taken again in the teens.",
    ),
    teeth: L(
      "Tedavi, sürmüş sürekli keserleri, birinci azı dişlerini ve hâlâ duran süt dişlerini birlikte okur. Henüz sürmemiş dişler filmde yerlerine göre plana girer, ağızda görünmeseler de.\n\nTek bir süt dişinin çürüğü bu tedavinin konusu değildir. O, pedodontinin işidir. Invisalign First, yer ve kapanış içindir. Çürük varsa önce o kapatılır, plak sonra başlar.",
      "The plan reads the erupted permanent incisors, the first molars and the baby teeth that are still there. Teeth that have not erupted yet still enter the plan, according to where they sit on the radiograph.\n\nDecay in a single baby tooth is not this treatment. That belongs to paediatric dentistry. Invisalign First is for space and bite. Decay is closed first. The trays start after.",
    ),
    aftercare: L(
      "Plak kaybolursa seri bozulur. Bu yüzden kutu, okul çantasında sabit bir cepte durur. Yemeklerden sonra dişler çalkalanır, mümkünse fırçalanır, plak geri takılır.\n\nÇocuk ağrıdan çok baskı hisseder ve bu his birkaç günde azalır. Takmama, en sık başarısızlık sebebidir. Aile bunu kontrol eder. Faz bitince gece apareyi, yeni süren dişler yüzünden eskir. Eskiyen aparey yenilenir, zorlanmaz.",
      "If a tray is lost, the series breaks. The case therefore lives in one pocket of the school bag. After meals the teeth are rinsed, brushed when possible, and the tray goes back in.\n\nA child feels pressure more than pain, and that eases in a few days. Not wearing the trays is the most common reason a case fails. A parent watches that. After the phase, a night appliance wears out as new teeth arrive. A worn appliance is replaced, not forced.",
    ),
    doctorIds: ["deniz-kaya", "ayse-nur-koc"],
  },
  {
    id: "pedodonti",
    icon: "baby",
    image: "/treatments/child-dental.jpg",
    imageAlt: L("Diş ünitesinde hekimiyle bekleyen bir çocuk", "A child in the dental chair with the dentist"),
    aside: "/treatments/child-xray.jpg",
    asideAlt: L("Çocuğun diş kaydı", "A child’s dental record"),
    duration: L("Tek ziyaret ya da kısa seri", "One visit, or a short series"),
    visits: L("6 ayda bir kontrol", "A review every 6 months"),
    comfort: L("Anlatarak, gerekirse sedasyon", "Explained first, sedation if needed"),
    name: L("Pedodonti", "Paediatric dentistry"),
    summary: L(
      "İlk dişten ergenliğe, süt dişini ve yeni süren sürekli dişi koruyan çocuk diş hekimliği.",
      "Children’s dentistry from the first tooth to the teens, protecting baby teeth and new permanent ones.",
    ),
    lede: L(
      "Pedodonti, çocuğun dişini büyüyen bir ağızın parçası olarak tedavi eder. Süt dişi “nasıl olsa düşecek” diye bırakılmaz. O diş yer tutar, çiğnemeyi öğretir ve alttan gelecek sürekli dişe rehberlik eder.\n\nİlk tanışma mümkünse ağrı gününe bırakılmaz. Çocuk üniteyi, ışığı ve fırçayı sakin bir günde öğrenirse, sonraki dolgu kısa sürer. Aureum’da çocuk, kapıdan girer girmez yetişkin protokolüne alınmaz. Süre, yaşına göre bölünür.",
      "Paediatric dentistry treats a child’s tooth as part of a mouth that is still growing. A baby tooth is not left because it will fall out anyway. It holds space, teaches chewing and guides the permanent tooth underneath.\n\nThe first meeting is better not saved for a day of pain. If a child learns the chair, the light and the brush on a calm day, the next filling is short. At Aureum a child is not put straight onto an adult protocol. The time is divided for their age.",
    ),
    note: L(
      "Süt dişi erken çekilirse, boşluk kapanır ve sürekli dişe yer kalmayabilir.",
      "If a baby tooth is extracted early, the space can close and the permanent tooth may have nowhere to go.",
    ),
    causes: L(
      "Çocukta çürüğün başlıca sebebi, sık şekerli ara öğün ve uyku sırasında biberon ya da emzikte bal, pekmez, süt bırakmaktır. Tükürük gece azaldığı için asit uzun kalır.\n\nMine bazı çocuklarda genetik olarak daha zayıftır. Erken çocukluk çürüğü, üst ön süt dişlerinde hızla ilerler. Bir de travma vardır: düşme, ön dişi kırar ya da gömer. Sebep hangisiyse tedavi değişir.",
      "The main cause of decay in children is frequent sugary snacks, and a bottle or dummy left at night with honey, molasses or milk. Saliva falls at night, so the acid stays.\n\nEnamel is genetically weaker in some children. Early childhood decay runs quickly through the upper front baby teeth. Trauma is the other cause: a fall breaks or intrudes a front tooth. The treatment changes with the cause.",
    ),
    goals: L(
      "Ağrıyı kesmek, çürüğü durdurmak, süt dişini düşeceği yaşa kadar ağızda tutmak ve sürekli dişin süreceği yeri korumak. Çocuğun diş hekiminden korkmaması da klinik bir hedeftir, nazik bir cümle değil.\n\nKoruma, tedaviden önce gelir. Flor verniği, fissür örtücü ve aileye anlatılan bir fırçalama düzeni, dolgudan daha çok diş kurtarır.",
      "To stop pain, halt decay, keep a baby tooth until it is ready to fall, and protect the space for the permanent tooth. A child who is not afraid of the dentist is a clinical goal, not a soft sentence.\n\nPrevention comes before treatment. Fluoride varnish, fissure sealants and a brushing routine the family understands save more teeth than fillings do.",
    ),
    methods: L(
      "Yüzeysel çürükte flor verniği ve düzenli kontrol yeter. Mineyi geçmiş çürükte renk uyumlu dolgu yapılır. Büyük harabiyette süt azı dişine paslanmaz çelik kron konur. Bu kron, diş düşünce kendiliğinden gelir.\n\nSinire ulaşmış süt dişinde, sürekli dişteki kanal tedavisinden farklı bir tedavi uygulanır: amputasyon ya da kanal. Çekim son seçenektir. Çekim olursa yer tutucu, komşu dişin kaymasını engeller. Korku tedaviyi imkânsız kılıyorsa sedasyon, ayrı bir sayfada anlatıldığı gibi planlanır.",
      "Fluoride varnish and a review are enough for early decay. Once decay has passed the enamel, a tooth-coloured filling is placed. A badly broken baby molar receives a stainless steel crown. The crown comes away when the tooth falls.\n\nIf the nerve of a baby tooth is involved, the treatment is not the same as an adult root canal. It is a pulpotomy or a pulpectomy. Extraction is the last choice. If a tooth is removed, a space maintainer stops the neighbour drifting. When fear makes treatment impossible, sedation is planned as its own page describes.",
    ),
    application: L(
      "Çocuk önce anlatılır, sonra yapılır. Ayna, fırça ve tükürük emici sırayla gösterilir. İşlem bölünür. Bir seansta bütün ağız bitirilmeye çalışılmaz.\n\nDolgu ve kron lokal anesteziyle yapılır. Uyuşma, çocuğun yanağını ısırmaması için aileye özellikle anlatılır. Travma aynı gün değerlendirilir. Kırık parça süt içinde geldiyse yapıştırma şansı artar. Kontrol, risk yüksekse üç ayda, değilse altı ayda bir sürer.",
      "The child is told first, then treated. The mirror, the brush and the suction are shown in order. Work is divided. One visit does not try to finish the whole mouth.\n\nFillings and crowns are done with local anaesthetic. Families are told clearly that a numb cheek should not be bitten. Trauma is assessed the same day. If the broken piece arrives in milk, the chance of bonding it back is higher. Reviews are every three months when risk is high, otherwise every six.",
    ),
    teeth: L(
      "Pedodonti süt dişlerinin tamamına ve yeni süren sürekli dişlere bakar. Üst ön süt dişleri biberon çürüğünde, azı dişleri çiğneme çukurlarında, altı yaş dişi sürdüğü anda fissür örtücü için önceliklidir.\n\nAltı yaş dişi süt dişi sanılıp erken kaybedilirse, yerine bir diş daha gelmez. Bu yüzden o diş, ilk sürdüğü yılda ayrıca işaretlenir. Erişkin kanal tedavisi ve implant bu sayfanın işi değildir.",
      "Paediatric dentistry looks after every baby tooth and the new permanent teeth. The upper front baby teeth are the ones bottle decay finds. Molars decay in the chewing grooves. The six-year molar is a priority for sealant the moment it erupts.\n\nThe six-year molar is not replaced if it is mistaken for a baby tooth and lost. It is marked separately in the year it arrives. Adult root canal treatment and implants are not this page.",
    ),
    aftercare: L(
      "Uyuşukluk geçene kadar çocuk yanak ve dudağını ısırabilir. Yumuşak gıda ve gözetim yeter. Çelik kronun çevresindeki diş eti bir iki günde alışır.\n\nGece biberonu bırakmak, ara öğünü seyreltmek ve ebeveynin yatmadan önce fırçalaması, dolgunun ömründen daha belirleyicidir. Yedi sekiz yaşına kadar fırçayı çocuk tek başına bitirmemelidir. Florlu macun, pirinç tanesi kadar, yutulmadan kullanılır.",
      "Until the numbness fades, a child may bite the cheek and lip. Soft food and supervision are enough. The gum around a steel crown settles in a day or two.\n\nStopping the night bottle, spacing snacks and a parent brushing at bedtime decide more than the life of a filling. Until about seven or eight, a child should not finish brushing alone. A rice-grain of fluoride toothpaste is used, and not swallowed.",
    ),
    doctorIds: ["ayse-nur-koc"],
  },
  {
    id: "agiz-dis-cene-cerrahisi",
    icon: "activity",
    image: "/treatments/cene.jpg",
    imageAlt: L("Ağız cerrahisi sırasında klinik bir işlem", "A clinical procedure during oral surgery"),
    aside: "/treatments/implant.jpg",
    asideAlt: L("Cerrahi için hazırlanan diş ünitesi", "A surgery prepared for an oral procedure"),
    duration: L("30–90 dakika", "30–90 minutes"),
    visits: L("İşlem ve 7. gün kontrol", "The procedure and a day-7 review"),
    comfort: L("Lokal anestezi, gerekirse sedasyon", "Local anaesthetic, sedation if needed"),
    name: L("Ağız, Diş ve Çene Cerrahisi", "Oral and maxillofacial surgery"),
    summary: L(
      "Gömük diş, kist, kemik ve ağız içi yumuşak doku için planlı cerrahi.",
      "Planned surgery for impacted teeth, cysts, bone and the soft tissues of the mouth.",
    ),
    lede: L(
      "Ağız, diş ve çene cerrahisi, diş çekiminden ibaret değildir. Gömük yirmi yaş dişi, süremeyen kanin, küçük kistler, kök ucu ameliyatı, kemik düzenlemesi ve bazı yumuşak doku işlemleri bu başlığın içindedir.\n\nHer çekim cerrahi sayılmaz. Diş görünür ve kökü düzse işlem kısadır. Diş kemik içinde yatıyorsa, sinire yakınsa ya da enfeksiyon çevreyi şişirdiyse plan değişir. Tomografi bu ayrımı işlemden önce yapar.",
      "Oral surgery is not only extraction. Impacted wisdom teeth, canines that never erupt, small cysts, root-end surgery, bone shaping and some soft-tissue procedures sit under this heading.\n\nNot every extraction is surgery. If the tooth is visible and the root is straight, the visit is short. If the tooth lies in the bone, sits near a nerve, or infection has swollen the area, the plan changes. A scan makes that distinction before the procedure.",
    ),
    note: L(
      "Şişlik, zor bir çekimden sonra beklenen bir yanıttır. Nefes darlığı ya da hızla büyüyen şişlik beklenen değildir.",
      "Swelling is an expected response after a difficult extraction. Breathlessness, or swelling that grows quickly, is not.",
    ),
    causes: L(
      "Yirmi yaş dişleri çoğu ağızda sürecek yer bulamaz. Diş etinin altında yarım kalır, çevresindeki diş etini tekrar tekrar şişirir. Buna perikoronit denir.\n\nGömük kanin, süt dişi erken kaybı ya da yer darlığı yüzünden yanlış yöne dönebilir. Kistler, süremeyen bir dişin çevresindeki keseden büyüyebilir. Kök ucundaki iltihap, kanal tedavisinden sonra da sürdüğü için cerrahiye kalabilir. Sebep filmde ayırt edilir, tahminle değil.",
      "Wisdom teeth often have nowhere to erupt. They stay half under the gum and the tissue around them swells again and again. That is pericoronitis.\n\nAn impacted canine can turn the wrong way because a baby tooth was lost early or space ran out. Cysts can grow from the follicle around a tooth that never erupts. Infection at a root tip can persist after root canal treatment and then need surgery. The cause is read on the radiograph, not guessed.",
    ),
    goals: L(
      "Ağrı ve tekrarlayan enfeksiyonu durdurmak, komşu dişi ve siniri korumak, kisti temizleyip dokuyu rahatlatmak. Estetik bir iz bırakmamak, ağız içinde zaten doğal olan bir sonuçtur.\n\nOrtodonti için gömük dişi ortaya çıkarmak da bir amaçtır. O zaman cerrahi, dişi çekmek için değil tele bağlamak için yapılır. Amaç işlemden önce cümleyle yazılır.",
      "To stop pain and repeated infection, protect the neighbouring tooth and the nerve, and clear a cyst so the tissue can settle. Leaving no visible scar is already the natural result inside the mouth.\n\nUncovering an impacted tooth for orthodontics is another aim. Surgery then exposes the tooth so it can be bonded to a wire, rather than removing it. The aim is written in a sentence before the procedure.",
    ),
    methods: L(
      "Basit çekim, dişi kökünden elevate edip çıkarmaktır. Cerrahi çekimde diş eti açılır, gerekirse ince bir kemik penceresi kaldırılır, diş parçalara ayrılarak alınır. Parçalama, komşu köke ve sinire yük bindirmemek içindir.\n\nKök ucu ameliyatı, kanal tedavisinin ulaşamadığı kök ucunu kısaltır ve kapatır. Küçük kistler bütünüyle çıkarılıp patolojiye gönderilir. Yumuşak dokuda frenilum ya da irritasyon fibromu gibi oluşumlar ayrı, daha kısa işlemlerdir.",
      "A simple extraction lifts the tooth out by the root. In a surgical extraction the gum is opened, a thin window of bone is removed if needed, and the tooth is sectioned and taken out. Sectioning is how the neighbouring root and the nerve are spared a heavy load.\n\nRoot-end surgery shortens and seals a tip that root canal treatment could not reach. Small cysts are removed whole and sent for pathology. Soft-tissue procedures, such as a frenum or an irritation fibroma, are separate and shorter.",
    ),
    application: L(
      "İşlem günü aç karnına gelmeniz gerekmez. Bu, lokal anestezi içindir. Sedasyon planlandıysa açlık ve refakat kuralı ayrıca yazılır. Kan sulandırıcı ilaç varsa kendi hekiminizle konuşulmadan kesilmez.\n\nAğız uyuşturulur, bölge örtülür. Süre, gömülü bir yirmi yaş dişinde çoğu zaman yarım saat ile doksan dakika arasındadır. Dikiş eriyen türdense alınmaz. Değilse yedi gün sonra alınır. Aynı gün soğuk, baş yukarda dinlenme ve verilen ilaç düzeni anlatılır.",
      "You do not need to arrive fasted for local anaesthetic. If sedation is planned, fasting and an escort are written separately. A blood thinner is not stopped without your own physician.\n\nThe mouth is numbed and the area is isolated. An impacted wisdom tooth often takes between thirty and ninety minutes. Dissolving stitches are not removed. The others come out at seven days. Cold, rest with the head up, and the medicine schedule are explained the same day.",
    ),
    teeth: L(
      "En sık üçüncü azı dişleri, yani yirmi yaş dişleri cerrahiye gelir. Üsttekiler sinüse, alttakiler çene sinirine yakın olabilir. Bu yakınlık tomografide ölçülür.\n\nGömük kanin, küçük azı ve art dişler de aynı başlıktadır. Kök ucu ameliyatı daha çok ön dişlerde ve küçük azılarda, kanal tedavisinin tekrarlanamadığı durumda yapılır. Sağlam, sürmüş, ağrısız bir diş bu tedavinin adayı değildir.",
      "Third molars, the wisdom teeth, are the most common reason for surgery. Upper ones can sit near the sinus, lower ones near the nerve of the jaw. That distance is measured on a scan.\n\nImpacted canines, premolars and extra teeth belong here too. Root-end surgery is more often done on front teeth and premolars, when a root canal cannot be repeated. A sound, erupted, painless tooth is not a candidate.",
    ),
    aftercare: L(
      "İlk yirmi dört saat tükürmek, pipet kullanmak ve sıcak içmek pıhtıyı bozar. Pıhtı dağılırsa boşlukta ağrılı bir osteit gelişebilir. Bu, kuru soket denilen durumdur ve kontrol ister.\n\nŞişlik ikinci ya da üçüncü günde en fazladır, sonra iner. Morarma yanakta görülebilir. Alt dudağında geçmeyen uyuşukluk olursa, sinir yakınlığı açısından aynı hafta haber verilir. Yara, tuzlu suyla sertçe çalkalanmaz. Nazik bir yıkama yeter.",
      "For the first day, spitting, straws and hot drinks disturb the clot. If the clot is lost, the socket can become a painful osteitis, the dry socket, and that needs a review.\n\nSwelling peaks on the second or third day, then falls. Bruising can show on the cheek. Numbness of the lower lip that does not fade should be reported the same week, because of the nerve. The wound is not rinsed hard with salt water. A gentle rinse is enough.",
    ),
    doctorIds: ["kerem-yilmaz"],
  },
  {
    id: "dental-implant",
    icon: "bone",
    featured: true,
    image: "/treatments/implant-model.jpg",
    imageAlt: L("Çene kemiğine yerleşen bir diş implantı modeli", "A model of a dental implant seated in jaw bone"),
    aside: "/treatments/implant.jpg",
    asideAlt: L("İmplant planının konuşulduğu klinik ünitesi", "The surgery where an implant plan is discussed"),
    duration: L("3–7 ay", "3–7 months"),
    visits: L("Cerrahi, kontrol, protez", "Surgery, review, then the tooth"),
    comfort: L("Lokal anestezi", "Local anaesthetic"),
    name: L("Dental İmplant", "Dental implants"),
    summary: L(
      "Eksik dişin yerine, çene kemiğiyle bütünleşen titanyum bir kök ve onun üstüne oturan diş.",
      "A titanium root that bonds with the jaw, and a tooth seated on it, where a tooth is missing.",
    ),
    lede: L(
      "Dental implant, eksik dişin kökünün yerini alan titanyum bir vidadır. Kemikle kaynaştıktan sonra üstüne dayanak ve kron, yani görünen diş konur. Köprü gibi komşu sağlam dişleri küçültmez.\n\nHerkes aynı gün dişle çıkmaz. Kemik yeterliyse ve diş sıkma alışkanlığı yoksa bazı vakalarda geçici diş hemen takılabilir. Kemik inceyse önce greft, yani kemik tozu ya da blok, gerekir. Bu bekleyiş aceleye kurban edilmez. Süre baştan söylenir.",
      "A dental implant is a titanium screw that takes the place of a missing root. Once it has bonded with the bone, an abutment and a crown, the visible tooth, are seated on it. Unlike a bridge, it does not reduce the healthy teeth beside the gap.\n\nNot everyone leaves with a tooth the same day. A temporary can be fitted at once in some cases, when the bone is enough and there is no grinding habit. Thin bone needs a graft first, a powder or a block. That wait is not sacrificed to hurry. The length is said at the start.",
    ),
    note: L(
      "İmplant dişi değil, kökü yerine koyar. Üstteki diş, kemik hazır olduktan sonra gelir.",
      "An implant replaces the root, not the tooth. The tooth on top comes after the bone is ready.",
    ),
    causes: L(
      "Diş, tedavi edilemeyen çürük, kırık, ileri diş eti hastalığı ya da bir travma yüzünden kaybedilir. Bazen diş hiç sürmemiştir. Boşluk bırakılırsa komşu diş eğilir, karşıt diş uzar, çiğneme tek tarafa kayar.\n\nKemik, diş çekildikten sonra erimeye başlar. Bu, implantın gecikmesinin asıl bedelidir. Erken kayıpta hacim daha kolay korunur. Geç kalınmışsa sinüs yükseltilmesi ya da kemik grefti plana girer.",
      "A tooth is lost to decay that cannot be restored, a fracture, advanced gum disease or trauma. Sometimes it never erupted. Leave the space, and the neighbour tips, the opposing tooth overgrows, and chewing shifts to one side.\n\nBone begins to shrink after an extraction. That is the real cost of delaying an implant. Volume is easier to keep when the loss is recent. If time has passed, a sinus lift or a bone graft enters the plan.",
    ),
    goals: L(
      "Eksik dişin çiğneme görevini geri vermek, komşu dişleri kesmeden boşluğu kapatmak ve kemiğin daha fazla erimesini yavaşlatmak. Görünen dişin rengi, komşu dişten alınır.\n\nTek diş, birkaç diş ya da tamamen dişsiz bir çene farklı hedeflerdir. Tam dişsizlikte daha az implant üzerine sabit bir protez planlanabilir. Bu, her kemiğe uymaz. Hedef, film ve çiğneme kuvvetiyle birlikte seçilir.",
      "To give back the chewing work of the missing tooth, close the space without cutting the neighbours, and slow further loss of bone. The colour of the visible tooth is taken from the tooth beside it.\n\nA single tooth, several teeth, or a jaw with no teeth are different goals. A fixed bridge on fewer implants can be planned when the jaw is edentulous. It does not suit every bone. The goal is chosen with the scan and with how hard you bite.",
    ),
    methods: L(
      "En sık kullanılan malzeme titanyumdur. Yüzeyi kemiğin tutunması için pürüzlendirilmiştir. Az sayıda vakada seramik implant tercih edilir. Seçim alerji, diş eti kalınlığı ve estetik bölgeye göre yapılır.\n\nÜst yapı zirkonyum ya da seramik bir krondur. Arka bölgede dayanım, ön bölgede ışık geçirgenliği öne çıkar. Kemik yetmezse greft, üst arka bölgede sinüs tabanı yükseltmesi eklenir. Cerrahi rehber, vidanın açısını dijital plandan ağza taşır.",
      "Titanium is the material used most often. Its surface is textured so bone can attach. A ceramic implant is chosen in a small number of cases. The choice follows allergy, gum thickness and whether the site is in the smile.\n\nThe tooth on top is a zirconia or ceramic crown. Strength matters at the back. Light transmission matters at the front. If bone is short, a graft is added, and in the upper back a sinus lift. A surgical guide carries the angle of the screw from the digital plan into the mouth.",
    ),
    application: L(
      "Plan, tomografi olmadan yazılmaz. Kemik yüksekliği, sinüs, sinir ve komşu kökler ölçülür. İşlem lokal anesteziyle yapılır. Vida kemiğe yerleştirilir, diş eti kapatılır ya da iyileşme başlığı açık bırakılır.\n\nKemikle bütünleşme alt çenede çoğu zaman üç ay, üst çenede dört ila altı ay sürer. Greft varsa bu süre uzar. Sonra ölçü ya da tarama alınır, kron provayla bakılır ve yapıştırılır ya da vidalanır. Vidalanan kron, ileride sökülebildiği için tercih edilebilir.",
      "A plan is not written without a scan. Bone height, the sinus, the nerve and neighbouring roots are measured. The procedure is done under local anaesthetic. The screw is placed, and the gum is either closed or left with a healing cap.\n\nBonding with bone usually takes three months in the lower jaw and four to six in the upper. A graft lengthens that. A scan or impression is then taken, the crown is tried in, and it is cemented or screwed. A screw-retained crown can be the better choice because it can be removed later.",
    ),
    teeth: L(
      "İmplant, çekilmiş ya da hiç olmamış herhangi bir dişin yerine planlanabilir. Ön bölgede diş eti çizgisi ve papil, yani dişler arasındaki üçgen diş eti, sonucu belirler. Arka bölgede çiğneme kuvveti ve kemik hacmi belirler.\n\nTüm dişler kayıpsa çeneye dağıtılmış birkaç implant, sabit bir köprüyü taşır. Süt dişine implant yapılmaz. Büyüme bitmeden, genç yaşta implant konulmaz. Kemik hâlâ büyürken vida yerinde kalmaz.",
      "An implant can be planned for any tooth that was extracted or never formed. In the front, the gum line and the papilla, the triangle of gum between teeth, decide the result. At the back, biting force and bone volume decide.\n\nIf every tooth is gone, a few implants spread through the jaw carry a fixed bridge. An implant is not placed in a baby tooth. It is not placed in a young person before growth has finished. A screw does not stay put while the bone is still growing.",
    ),
    aftercare: L(
      "İlk günler şişlik ve hafif sızı beklenir. İmplantın üstüne, hekim izin verene kadar çiğnenmez. Sigara, kemikle kaynaşmayı bozan en net etkendir. Bırakılamıyorsa süre ve risk baştan konuşulur.\n\nDiş oturduktan sonra implantın çevresi, doğal diş gibi fırçalanır ve arayüz temizlenir. İltihap, vidası değil diş etinin altındaki birikinti yüzünden başlar. Altı ayda bir kontrol, vidasının gevşemesini ve diş eti çekilmesini erken yakalar.",
      "Swelling and a dull ache are expected for the first days. The implant is not chewed on until you are told it can be. Smoking is the clearest thing that disturbs bonding with bone. If it cannot be stopped, the length and the risk are discussed first.\n\nOnce the tooth is seated, the implant is brushed and cleaned between the teeth like a natural one. Inflammation starts from debris under the gum, not from the screw itself. A review every six months catches a loose screw and gum recession early.",
    ),
    doctorIds: ["kerem-yilmaz"],
  },
  {
    id: "estetik-dis-hekimligi",
    icon: "sparkles",
    featured: true,
    image: "/treatments/extra-smile.jpg",
    imageAlt: L("Doğal görünen, bakımlı bir gülüş yakından", "A close view of a natural, cared-for smile"),
    aside: "/treatments/cerrahi.jpg",
    asideAlt: L("Gülüş planı öncesi klinik görüşme", "A clinic visit before smile planning"),
    duration: L("5–10 gün", "5–10 days"),
    visits: L("Tasarım, prova, bitiş", "Design, try-in, finish"),
    comfort: L("Çoğu adım lokal anestezi", "Local anaesthetic for most steps"),
    name: L("Estetik Diş Hekimliği", "Aesthetic dentistry"),
    summary: L(
      "Dişin rengi, formu ve diş eti çizgisini aynı yüzde buluşturan gülüş planı.",
      "A smile plan that brings colour, form and the gum line together on the same face.",
    ),
    lede: L(
      "Estetik diş hekimliği, tek bir kaplama türü değildir. Lamina, bonding, zirkonyum kron, diş eti düzenlemesi ve beyazlatma aynı hedefe göre seçilir. Hedef, yüze oturan bir gülüştür. Bağırmayan, konuşurken dişleri öne fırlatmayan bir sonuç.\n\nBaşlamadan önce fotoğraf ve mock-up ile bitiş görülür. Mock-up, geçici bir malzemeyle dişin üstünde duran provadır. Beğenmediğiniz bir formu kalıcı porselene taşımayız. Süre, kaç dişin planda olduğuna ve diş etinin iyileşmesine bağlıdır.",
      "Aesthetic dentistry is not one kind of veneer. Porcelain veneers, bonding, zirconia crowns, gum contouring and whitening are chosen for a single aim. The aim is a smile that belongs to the face. A result that does not shout, and does not push the teeth forward when you speak.\n\nYou see the finish in photographs and a mock-up before treatment starts. A mock-up is a try-in, in a temporary material, sitting on the teeth. A form you do not like is not carried into permanent porcelain. The length depends on how many teeth are in the plan, and on how the gum heals.",
    ),
    note: L(
      "Güzel olan, komşu dişten daha beyaz olan değil. Işıkta hâlâ diş gibi durandır.",
      "What is beautiful is not the tooth that is whiter than its neighbour. It is the one that still looks like a tooth in the light.",
    ),
    causes: L(
      "İnsanlar kliniğe çoğu zaman renk, eski bir dolgunun kenarı, aralık, aşınma ya da diş eti gülümserken fazla göründüğü için gelir. Bunların bir kısmı mineye işlemiş lekedir, bir kısmı yanlış bir ısırma alışkanlığının aşındırmasıdır.\n\nDiş eti çekilmesiyse sebep estetik değil, periodontal olabilir. O zaman önce diş eti tedavisi gelir. Çapraşıklık varsa kaplama, telin yerine konmaz. Hafif bir hizasızlık plağa daha uygunsa estetik, ortodontiden sonra başlar.",
      "People come most often for colour, the edge of an old filling, a gap, wear, or gum that shows too much in a smile. Some of that is stain worked into the enamel. Some is wear from a biting habit.\n\nIf the gum has receded, the cause may be periodontal rather than aesthetic. Gum treatment comes first. Crowns are not a substitute for braces. If a mild irregularity suits aligners better, aesthetic work starts after orthodontics.",
    ),
    goals: L(
      "Dişlerin boyunu, genişliğini ve birbirine oranını yüze göre kurmak. Diş eti çizgisini simetrik ve sakin tutmak. Rengi, gözün beyazından değil, kendi dişinizden seçmek.\n\nİkinci amaç az aşındırmaktır. Bonding ve ince lamina, sağlam mineyi koruyabildiği vakada kronun önüne geçer. Diş zaten büyük bir dolguyla zayıfsa kron daha dürüst bir seçimdir. Amaç, herkese aynı gülüşü vermek değildir.",
      "To set the length, width and proportion of the teeth to the face. To keep the gum line symmetrical and quiet. To choose colour from your own tooth, not from the white of the eye.\n\nThe second aim is to remove as little as possible. Bonding and a thin veneer come before a crown when sound enamel can be kept. If the tooth is already weak from a large filling, a crown is the more honest choice. The aim is not to give everyone the same smile.",
    ),
    methods: L(
      "Bonding, kompozit reçinenin mineye yapıştırılmasıdır. Tek seansta biter, cilası yıllar içinde yenilenir. Lamina, dişin ön yüzüne yapışan ince porselendir. Işığı geçirir, leke tutması kompozitten azdır.\n\nZirkonyum kron, dişi çepeçevre sarar. Koyu bir diş, büyük bir kırık ya da kanal tedavili bir diş için daha doğrudur. Diş eti fazlaysa küçük bir gingivektomi ya da flep, kronlardan önce iyileşmeye bırakılır. Beyazlatma, lamina renginden önce yapılır. Porselen sonradan beyazlamaz.",
      "Bonding is composite resin attached to enamel. It finishes in one visit, and the polish is renewed over the years. A veneer is thin porcelain bonded to the front of the tooth. It passes light, and it stains less than composite.\n\nA zirconia crown wraps the tooth. It is the righter choice for a dark tooth, a large fracture, or a tooth that has had a root canal. If the gum is excessive, a small gingivectomy or flap is left to heal before the crowns. Whitening is done before the veneer shade is chosen. Porcelain does not whiten afterwards.",
    ),
    application: L(
      "İlk gün fotoğraf, tarama ve yüz oranları alınır. Mock-up ağızda prova edilir. Konuşarak, gülerek bakarsınız. Onaydan sonra diş, planın gerektirdiği kadar hazırlanır. Sağlam bir laminada bu hazırlık bazen yalnızca mineyle sınırlı, çok incedir.\n\nGeçici dişler aynı gün takılır. Laboratuvar porseleni günler içinde gelir. Provada kenar, renk ve kapanış kontrol edilir. Yapıştırma lastik örtü altında, kuru alanda yapılır. Nem, yapışmanın en sık bozulduğu yerdir.",
      "Photographs, a scan and facial proportions are taken on the first day. The mock-up is tried in the mouth. You look at it speaking and smiling. After you agree, the tooth is prepared only as far as the plan needs. On a sound veneer that preparation is sometimes a very thin layer of enamel.\n\nTemporary teeth are fitted the same day. The laboratory porcelain arrives within days. The try-in checks the edge, the colour and the bite. Bonding is done under a rubber dam, in a dry field. Moisture is the most common reason a bond fails.",
    ),
    teeth: L(
      "Estetik plan çoğu zaman üst çenenin gülüşte görünen dişlerine bakar. Bu, genellikle kaninden kanine altı diş, bazen küçük azıları da alan sekiz ya da on diştir. Alt dişler planda değilse üsttekiler onlarla çarpışacak kadar uzun yapılmaz.\n\nArka dişlerin büyük çürükleri estetik kronla değil, konservatif ya da protetik bir planla kapanır. Diş eti çekilmiş, kökü açık bir diş yalnızca lamina ile düzelmez. Önce diş eti, sonra porselen konuşulur.",
      "An aesthetic plan usually looks at the upper teeth that show in the smile. That is often six teeth, canine to canine, and sometimes eight or ten when the premolars join in. If the lower teeth are not in the plan, the upper ones are not made so long that they collide with them.\n\nLarge decay in back teeth is closed by a restorative or prosthetic plan, not by an aesthetic crown. A tooth with a receded gum and an exposed root is not corrected by a veneer alone. The gum is discussed first, then the porcelain.",
    ),
    aftercare: L(
      "İlk günler sıcak ve soğuk hassasiyeti olağandır, özellikle hazırlık mineyi geçtiyse. Gece plağı, diş sıkan kişide porseleni korur. Plağı kullanmamak, ince laminanın en sık kırılma sebebidir.\n\nSert kabuk, buz ve kalem ısırma porseleni çentir. Renk, kompozitte yıllar içinde solar. Porselen daha sabit kalır. Altı ayda bir cila ve kapanış kontrolü, kenarların diş etiyle ilişkisini korur.",
      "Sensitivity to hot and cold is ordinary for the first days, especially if preparation passed the enamel. A night guard protects the porcelain in someone who grinds. Not wearing it is the most common reason a thin veneer chips.\n\nHard crusts, ice and biting a pen nick porcelain. Composite colour fades over the years. Porcelain stays more stable. A polish and a bite check every six months keep the edges in a quiet relationship with the gum.",
    ),
    doctorIds: ["selin-acar", "elif-demir"],
  },
  {
    id: "endodonti",
    icon: "microscope",
    image: "/treatments/model.jpg",
    imageAlt: L("Kök kanallarını gösteren bir diş kesiti", "A tooth model showing the root canals"),
    aside: "/treatments/ortodonti.jpg",
    asideAlt: L("Mikroskobun bulunduğu tedavi ünitesi", "A treatment room with a dental microscope"),
    duration: L("1–2 seans", "1–2 visits"),
    visits: L("Kanal, sonra kron", "The canal, then often a crown"),
    comfort: L("Lokal anestezi", "Local anaesthetic"),
    name: L("Endodonti", "Endodontics"),
    summary: L(
      "İltihaplı ya da canlılığını yitirmiş dişin, kök kanalları temizlenerek ağızda tutulması.",
      "Keeping a tooth in the mouth by cleaning root canals that are inflamed or no longer alive.",
    ),
    lede: L(
      "Endodonti, dişin içindeki damar ve sinir dokusunun, yani pulpanın hastalandığı durumda yapılan kanal tedavisidir. Diş çekilmeden, köklerin içi temizlenir, şekillendirilir ve doldurulur.\n\nAğrı her kanal tedavisinin şartı değildir. Bazı dişler gece uyandıran bir ağrıyla gelir. Bazıları yalnızca filmde, kök ucunda sessiz bir iltihap olarak durur. İkisi de aynı başlığın işidir. Fark, seans sayısında ve ilacın kanalda kalıp kalmayacağındadır.",
      "Endodontics is root canal treatment, done when the pulp, the vessel and nerve tissue inside the tooth, is diseased. The tooth is not extracted. The inside of the roots is cleaned, shaped and filled.\n\nPain is not a requirement. Some teeth arrive with pain that wakes you at night. Others are quiet, and show only as inflammation at the root tip on a radiograph. Both belong here. The difference is how many visits, and whether a dressing stays in the canal.",
    ),
    note: L(
      "Kanal tedavisi dişin canlılığını geri getirmez. Dişi ağızda, ağrısız ve işlevli tutar.",
      "Root canal treatment does not bring a tooth back to life. It keeps it in the mouth, comfortable and useful.",
    ),
    causes: L(
      "En sık sebep, mine ve dentini geçip pulpaya ulaşmış çürüktür. Derin bir dolgu, dişi canlılığını yavaş yavaş yitirtebilir. Travma, ön dişte kırık olmasa bile damarı koparabilir. Diş yıllar sonra kararır.\n\nTekrarlayan tedaviler, çatlak ve diş sıkma da pulpayı yorar. Sıcakla uzayan ağrı, gece kendiliğinden başlayan ağrı ve ısırınca yükselen bir hassasiyet, iltihabın sık görülen işaretleridir. Soğukla kısa süren hassasiyet ise çoğu zaman kanal değil, dentin hassasiyetidir.",
      "The most common cause is decay that has passed enamel and dentine and reached the pulp. A deep filling can let a tooth lose vitality slowly. Trauma can sever the vessel of a front tooth even when the crown is not broken. The tooth darkens years later.\n\nRepeated treatment, a crack and grinding also tire the pulp. Pain that lingers with heat, pain that starts on its own at night, and tenderness that rises on biting are frequent signs of inflammation. A short wince with cold is more often dentine sensitivity than a canal.",
    ),
    goals: L(
      "Ağrıyı ve enfeksiyonu durdurmak, dişi çekmeden çiğneme zincirinde tutmak, kök ucundaki kemiğin yeniden dolmasını sağlamak. Kanal dolgusu, bakterinin yeniden içeri girmesini engelleyecek kadar sıkı olmalıdır.\n\nDişin üst restorasyonu da hedefin parçasıdır. Arka dişte kanal bitip üzeri açık kalırsa tükürük sızar ve tedavi boşa gider. Bu yüzden kron ya da onley, kanalın peşinden planlanır.",
      "To stop pain and infection, keep the tooth in the chewing chain without extracting it, and let the bone at the root tip fill in again. The root filling has to be dense enough to stop bacteria entering once more.\n\nThe restoration on top is part of the goal. If a back tooth is left open after the canal, saliva leaks and the work is lost. A crown or an onlay is therefore planned to follow.",
    ),
    methods: L(
      "Kanal, lastik örtü altında çalışılır. Örtü, tükürüğün içeri, dezenfektanın boğaza kaçmasını engeller. Kök kanalları eğelerle temizlenir, ilaçlanır ve güta-perka denilen bir malzemeyle doldurulur.\n\nMikroskop, dar ve eğri kanalları, kırık bir aleti ya da atlanmış ince bir kanalı büyütür. Her dişte şart değildir. Azı dişlerinde, tekrarlayan tedavilerde ve kanal ağızlarının kapandığı vakalarda fark yaratır. Cerrahi kök ucu işlemi, kanalın kron tarafından açılamadığı durumda ayrı bir yoldur.",
      "The canal is worked under a rubber dam. The dam stops saliva getting in and disinfectant getting to the throat. The canals are cleaned with files, medicated, and filled with a material called gutta-percha.\n\nA microscope enlarges a narrow, curved canal, a separated instrument, or a fine canal that was missed. It is not required for every tooth. It changes the result in molars, in retreatments, and when the canal openings have calcified. Root-end surgery is a separate path, used when the canal cannot be opened from the crown.",
    ),
    application: L(
      "Film ya da tomografi ile kanal sayısı ve kök eğriliği okunur. Diş uyuşturulur. Canlı ve çok ağrılı dişlerde uyuşma daha yavaş oturabilir. Bu, işlem aceleye gelmeden beklenerek çözülür.\n\nTek seansta biten dişler vardır. İltihaplı, şişlik yapmış dişlerde kanala ilaç konur ve ikinci seans birkaç gün sonraya bırakılır. İşlem sırasında basınç hissedilebilir, keskin bir ağrı olmamalıdır. Olursa haber verilir, anestezi tazelenir. Seans sonunda diş geçici dolguyla kapatılır.",
      "A radiograph or a scan reads the number of canals and the curve of the roots. The tooth is numbed. In a tooth that is still alive and very painful, numbness can settle more slowly. That is solved by waiting, not by rushing.\n\nSome teeth finish in one visit. If the tooth is infected and swollen, a dressing is placed and the second visit waits a few days. Pressure during treatment can be felt. Sharp pain should not. If it is, you say so and the anaesthetic is renewed. The tooth is closed with a temporary filling at the end.",
    ),
    teeth: L(
      "Kanal tedavisi, pulpası hastalanmış her dişte yapılabilir. Ön dişlerde genellikle tek kanal vardır. Küçük azılarda bir ya da iki, büyük azılarda üç ya da dört kanal olağandır. Azı dişinin dördüncü kanalı atlanırsa ağrı sürer.\n\nÇatlak kökün boydan boya ilerlediği dişte kanal tedavisi diş tutmaz. Çekim daha dürüst olur. Süt dişlerinin sinir tedavisi pedodontiye aittir. Erişkin kanal protokolü çocuk dişine uygulanmaz.",
      "Root canal treatment can be done on any tooth whose pulp is diseased. Front teeth usually have one canal. Premolars have one or two. Molars commonly have three or four. If a fourth molar canal is missed, the pain continues.\n\nA tooth with a crack running the length of the root will not be saved by a canal. Extraction is the more honest choice. Nerve treatment of baby teeth belongs to paediatric dentistry. The adult protocol is not used on a child’s tooth.",
    ),
    aftercare: L(
      "Uyuşukluk geçene kadar çiğnenmez. Bir iki gün ısırınca hassasiyet kalabilir. Bu, kök ucundaki dokunun iyileşme yanıtıdır. Şiddetlenen şişlik ve ateş ise kontrol sebebidir.\n\nÜst dolgu ya da kron gecikirse diş, çiğneme sırasında boydan boya kırılabilir. Kanal yapılmış arka diş bu yüzden mümkünse birkaç hafta içinde restore edilir. İyileşme filmi, aylar sonra kök ucundaki kemiğin dolduğunu göstermek için çekilir.",
      "Do not chew until the numbness has gone. Tenderness on biting can remain for a day or two. That is the tissue at the root tip responding as it heals. Swelling that increases, and fever, are reasons to be seen.\n\nIf the filling or crown is delayed, the tooth can split under chewing. A back tooth that has had a root canal is therefore restored within a few weeks when possible. A healing radiograph is taken months later, to show the bone at the root tip filling in.",
    ),
    doctorIds: ["leyla-sen"],
  },
  {
    id: "periodontoloji",
    icon: "droplet",
    image: "/treatments/perio.jpg",
    imageAlt: L("Diş eti muayenesi yapılan bir klinik seansı", "A clinic visit examining the gums"),
    aside: "/treatments/extra-clinic.jpg",
    asideAlt: L("Diş eti kenarının yakından temizliği", "A close cleaning along the gum line"),
    duration: L("2–4 seans, sonra bakım", "2–4 visits, then maintenance"),
    visits: L("3–6 ayda bir bakım", "Maintenance every 3–6 months"),
    comfort: L("Gerekirse lokal anestezi", "Local anaesthetic when needed"),
    name: L("Periodontoloji", "Periodontology"),
    summary: L(
      "Diş etinin ve dişi tutan kemiğin iltihabını durduran, bakımı takvime bağlayan tedavi.",
      "Treatment that stops inflammation of the gum and the bone that holds the tooth, then puts maintenance on a calendar.",
    ),
    lede: L(
      "Periodontoloji, dişin kendisinden çok dişi yerinde tutan dokularla ilgilenir. Diş eti, periodontal ligament ve çene kemiği. İltihap önce dişte kanamayla başlar. İlerlerse diş eti dişten ayrılır, cep oluşur, kemik erir.\n\nKanama “sert fırçalıyorum” diye geçiştirilmez. Sağlıklı diş eti fırçayla kanamaz. Erken dönemde hastalık geri dönebilir. Kemik eridikten sonra amaç, kaybı durdurmak ve dişi mümkün olduğunca uzun tutmaktır. Yeniden büyüyen kemik, ancak seçilmiş vakalarda ve cerrahiyle umulur.",
      "Periodontology is concerned less with the tooth than with the tissues that hold it. The gum, the periodontal ligament and the jaw bone. Inflammation begins as bleeding. If it advances, the gum separates from the tooth, a pocket forms, and bone is lost.\n\nBleeding is not explained away as brushing too hard. Healthy gum does not bleed on the brush. Early disease can be turned back. Once bone is lost, the aim is to stop the loss and keep the tooth as long as possible. Bone that grows back is hoped for only in selected cases, and with surgery.",
    ),
    note: L(
      "Diş taşı temizliği ile periodontal tedavi aynı şey değildir. Cep ve kemik kaybı varsa ikincisi gerekir.",
      "A scale and polish is not periodontal treatment. Pockets and bone loss need the second.",
    ),
    causes: L(
      "Başlangıç, diş ve diş eti birleşkesinde biriken plaktır. Plak mineralleşirse diş taşı olur ve fırçayla çıkmaz. Bakteriler cep içinde, oksijensiz ortamda iltihabı sürdürür.\n\nSigara, diyabet, bazı ilaçlar, stres ve genetik yatkınlık hastalığın hızını değiştirir. Sigara hem kanamayı gizler hem iyileşmeyi bozar. Ağız kuruluğu ve düzensiz fırçalama da plağın kalmasına yardım eder. Sebep tek bir fırça eksikliği değildir.",
      "It begins with plaque where the tooth and the gum meet. When plaque mineralises it becomes calculus, and a brush will not remove it. Bacteria keep the inflammation going inside the pocket, where there is little oxygen.\n\nSmoking, diabetes, some medicines, stress and a family tendency change the speed of the disease. Smoking both hides bleeding and disturbs healing. A dry mouth and irregular brushing also help plaque stay. The cause is not a single missed brushing.",
    ),
    goals: L(
      "Kanamayı, cep derinliğini ve dişteki sallanmayı kontrol altına almak. İltihabı durdurup dişi çekim sınırından uzak tutmak. Diş eti çekilmesini, olabildiğince, bugünkü çizgisinde bırakmak.\n\nEstetik bir diş eti gülüşü ancak iltihap sustuktan sonra konuşulur. İltihaplı bir diş etine pembe estetik yapılmaz. Önce ölçüm, sonra gerekirse cerrahi, en son görünüm.",
      "To bring bleeding, pocket depth and looseness under control. To stop the inflammation and keep the tooth away from extraction. To leave recession, as far as possible, at the line it has today.\n\nA cosmetic gum smile is discussed only after inflammation is quiet. Pink aesthetics are not done on an inflamed gum. Measurement first, surgery if it is needed, appearance last.",
    ),
    methods: L(
      "İlk basamak, diş taşı temizliği ve kök yüzeyi düzleştirmesidir. Cep içindeki taş ve iltihaplı sement temizlenir. Bu işlem bölge bölge, genellikle lokal anesteziyle yapılır.\n\nCep derin kalırsa flep operasyonuyla diş eti kaldırılarak kök görülür. Kemik crateleri düzeltilir. Bazı defektlerde kemik grefti ya da membran, kaybı doldurmayı dener. Diş eti çekilmesinde, uygun vakada damaktan alınan bir greft kökü örter. Her çekilme greftle kapanmaz.",
      "The first step is scaling and root surface debridement. Calculus and inflamed cementum inside the pocket are cleaned. This is done area by area, usually with local anaesthetic.\n\nIf the pocket stays deep, a flap lifts the gum so the root can be seen. Bone craters are reshaped. In some defects a bone graft or a membrane tries to fill the loss. For recession, a graft from the palate can cover the root in a suitable case. Not every recession closes with a graft.",
    ),
    application: L(
      "İlk seansta cep derinlikleri milimetre milimetre yazılır. Kanama, sallanma ve filmdeki kemik seviyesi aynı haritaya işlenir. Bu harita olmadan “diş eti tedaviniz var” denmez.\n\nTemizlik iki ila dört seansta, çene çeyreklerine bölünerek biter. Altı ila sekiz hafta sonra ölçüm tekrarlanır. Geride derin cep kaldıysa cerrahi konuşulur. Cerrahi lokal anesteziyledir. Dikişler bir hafta sonra alınır. Bakım fazı, asıl tedavinin bittiği yer değil, başladığı yerdir.",
      "At the first visit pocket depths are written down millimetre by millimetre. Bleeding, looseness and the bone level on the radiograph go on the same map. Without that map, no one is told they have gum disease.\n\nCleaning finishes in two to four visits, divided by quarters of the mouth. Measurement is repeated six to eight weeks later. If a deep pocket remains, surgery is discussed. Surgery is under local anaesthetic. Stitches come out after a week. The maintenance phase is where treatment begins, not where it ends.",
    ),
    teeth: L(
      "Hastalık tek bir dişte başlayabilir, çoğu zaman birden fazla dişi tutar. Alt ön dişlerin dil tarafı ve üst azıların yanak tarafı taşın ilk biriktiği yerlerdir. Kökleri ayrılan azı dişlerinde, furkasyon denilen bölgeye fırça zor ulaşır.\n\nSallanması ileri, kemiği kökün ucuna kadar erimiş bir diş tutulamaz. O diş çekilir ki komşuları korunsun. Sağlam dişe periodontal cerrahi yapılmaz. Çekim kararı, tek bir seanstaki sallanmayla değil, ölçüm ve filmle verilir.",
      "Disease can start on one tooth, and it usually involves more than one. The tongue side of the lower front teeth and the cheek side of the upper molars are where calculus gathers first. Where molar roots divide, the furcation is hard for a brush to reach.\n\nA tooth that is very loose, with bone lost to the tip of the root, cannot be kept. It is removed so its neighbours are protected. Periodontal surgery is not done on a healthy tooth. Extraction is decided from measurements and radiographs, not from looseness on a single day.",
    ),
    aftercare: L(
      "İlk günlerde diş eti sızlayabilir ve sıcak tuzlu suyla nazikçe çalkalanır. Cerrahi olduysa o bölgeye fırça bir süre değmez, size söylenen günden sonra yumuşak bir fırçayla dönülür.\n\nSigara içilen bir ağızda cerrahi sonuç zayıflar. Bunu gizlemek iyileştirmeyi geciktirir. Bakım seansları üç ayda bir başlar, ölçüm düzelince altı aya çıkar. Arayüz fırçası, bu hastalığın evdeki asıl ilacıdır. İp, diş eti kanayana kadar bastırılmaz.",
      "The gum can ache for the first days, and a gentle warm salt rinse is enough. After surgery the brush stays off that area until the day you are given, then returns with a soft brush.\n\nA surgical result is weaker in a mouth that smokes. Hiding that only delays healing. Maintenance starts every three months, and moves to six when the measurements improve. An interdental brush is the real medicine at home. Floss is not forced until the gum bleeds.",
    ),
    doctorIds: ["mert-aslan"],
  },
  {
    id: "konservatif-dis-tedavisi",
    icon: "shield",
    image: "/treatments/estetik.jpg",
    imageAlt: L("Dişin yakından restore edildiği bir seans", "A visit restoring a tooth at close range"),
    aside: "/treatments/konservatif.jpg",
    asideAlt: L("Dolgu öncesi ağız muayenesi", "An examination before a filling"),
    duration: L("30–90 dakika", "30–90 minutes"),
    visits: L("Çoğu diş tek seansta", "Most teeth in one visit"),
    comfort: L("Lokal anestezi", "Local anaesthetic"),
    name: L("Konservatif Diş Tedavisi", "Conservative dentistry"),
    summary: L(
      "Çürük ve kırığı, dişi kesmeden, kendi dokusuna en yakın malzemeyle onarmak.",
      "Repairing decay and fracture without cutting the tooth down, in a material close to its own tissue.",
    ),
    lede: L(
      "Konservatif diş tedavisi, dişi mümkün olduğunca diş olarak bırakır. Çürük temizlenir, kırık tamamlanır, eski ve sızdıran dolgu yenilenir. Eksik dişin yerine implant ya da köprü koymak bu başlığın işi değildir.\n\nMalzeme çoğu zaman kompozittir. Dişe yapışır, rengini komşudan alır. Çürük büyükse ve tüberküller zayıfsa dolgu yerine inley ya da onley, yani laboratuvarda hazırlanan bir parça daha doğru olur. Seçim, kalan sağlam dokuya göre yapılır.",
      "Conservative dentistry leaves the tooth a tooth, as far as it can. Decay is cleaned, a fracture is rebuilt, an old leaking filling is replaced. Replacing a missing tooth with an implant or a bridge is not this heading.\n\nThe material is usually composite. It bonds to the tooth and takes its colour from the neighbour. If decay is large and the cusps are weak, an inlay or an onlay, a piece made in the laboratory, is the better choice. The choice follows the sound tissue that remains.",
    ),
    note: L(
      "Küçük bir çürük, erken kapanırsa kanal tedavisine hiç dönüşmez.",
      "A small cavity, closed early, never has to become a root canal.",
    ),
    causes: L(
      "Çürük, plağın şeker ve nişastayı aside çevirmesiyle başlar. Asit mineyi çözer. Sık atıştırma, asidin tükürükle nötralize olmasını beklemez. Diş, gün boyu asitte kalır.\n\nEski dolgunun kenar sızıntısı, çürüğün alttan yeniden başlamasına yol açar. Diş sıkma, özellikle eski büyük dolgularda dişi çatlatır. Asitli içecekler ve reflü ise çürüğü değil, erozyonu yapar. Erozyonda oyuk yoktur, mine incelir. Tedavi bu ayrımı görerek seçilir.",
      "Decay starts when plaque turns sugar and starch into acid. The acid dissolves enamel. Frequent snacking does not wait for saliva to neutralise the acid. The tooth stays in acid through the day.\n\nA leaking edge on an old filling lets decay start again underneath. Grinding cracks teeth, especially those with large old fillings. Acidic drinks and reflux cause erosion, not decay. Erosion has no cavity. The enamel thins. Treatment is chosen once that difference is seen.",
    ),
    goals: L(
      "Çürüğü temizlemek, ağrıyı kesmek, dişin formunu ve kontak noktasını geri vermek. Kontak, iki dişin birbirine değdiği yerdir. Doğru kurulmazsa yemek sıkışır, diş eti şişer.\n\nİkinci amaç kanal tedavisini geciktirmektir. Pulpaya yaklaşmış bir çürükte, doku koruyucu bir örtüleme dişi canlı tutabilir. Her derin çürük kanal değildir. Karar, belirtiler ve filmle verilir.",
      "To clean the decay, stop the pain, and give back the form of the tooth and its contact. The contact is where two teeth touch. If it is wrong, food packs and the gum swells.\n\nThe second aim is to postpone a root canal. When decay is close to the pulp, a protective lining can keep the tooth alive. Not every deep cavity is a canal. The decision comes from the symptoms and the radiograph.",
    ),
    methods: L(
      "Kompozit dolgu, mine ve dentine yapışan bir reçinedir. Katman katman yerleştirilir, mavi ışıkla sertleşir. Ön dişlerde renk katmanları ayrı ayrı konur ki dolgu tek bir beyaz leke gibi durmasın.\n\nİnley ve onley, çürüğün büyük olduğu arka dişte kalan duvarları korur. Seramik ya da kompozit bloktan üretilir. Cam iyonomer, tükürük kontrolünün zor olduğu yerde ve süt dişi sınırında flor saldığı için seçilebilir. Amalgam, estetiğin öncelik olmadığı eski restorasyonların yenilenmesinde hâlâ tartışılır. Yeni planda kompozit ve seramik öndedir.",
      "A composite filling is a resin that bonds to enamel and dentine. It is placed in layers and set with a blue light. On front teeth the shades are layered separately, so the filling does not sit as one white patch.\n\nAn inlay or onlay protects the remaining walls of a back tooth when decay is large. It is made from ceramic or a composite block. Glass ionomer can be chosen where saliva is hard to control, and at the edge of baby-tooth care, because it releases fluoride. Amalgam is still discussed when an old restoration is replaced and appearance is not the priority. In a new plan, composite and ceramic come first.",
    ),
    application: L(
      "Çürük filmde ve ağızda işaretlenir. Diş uyuşturulur. Lastik örtü takılır. Örtü olmadan yapılan bir yapışma, nem yüzünden kenardan sızar. Çürük boyayla ya da sertlik hissiyle temizlenir, sağlam dentin kazınmaz.\n\nDolgu şekillendirilir, kapanış artikülasyon kağıdıyla kontrol edilir. Yüksek kalan bir dolgu, dişi günlerce hassas kılar. İnley iki seans sürebilir: hazırlık ve yapıştırma. Aynı günün sonunda diş, yemeğe uyuşukluk geçince döner.",
      "Decay is marked on the radiograph and in the mouth. The tooth is numbed. A rubber dam is placed. A bond made without it leaks at the edge because of moisture. Decay is cleaned by dye or by the feel of hardness. Sound dentine is not scraped away.\n\nThe filling is shaped and the bite is checked with articulating paper. A filling left high keeps the tooth sensitive for days. An inlay can take two visits: preparation and bonding. At the end of the day the tooth returns to eating once the numbness has gone.",
    ),
    teeth: L(
      "Çürük olan her diş konservatif tedavinin konusudur. Azı dişlerinin çiğneme çukurları, dişlerin birbirine bakan ara yüzleri ve eski dolgu kenarları en sık yerlerdir.\n\nKökü kırık, kuronu diş eti altında kalmış ya da kemik kaybı ileri bir diş dolguyla tutulmaz. O diş için cerrahi ya da implant konuşulur. Süt dişinin dolgusu pedodontiye aittir. Buradaki protokol, sürekli diş içindir.",
      "Any tooth with decay belongs to conservative treatment. The chewing grooves of molars, the surfaces where teeth touch, and the edges of old fillings are the most common sites.\n\nA tooth with a fractured root, a crown broken below the gum, or advanced bone loss is not kept with a filling. Surgery or an implant is discussed. Fillings in baby teeth belong to paediatric dentistry. The protocol here is for permanent teeth.",
    ),
    aftercare: L(
      "Kompozit yapıştırıldığı anda serttir. Yine de uyuşukluk geçmeden çiğnemek yanağı ısırır. İlk gün yüksek gelirse, bu bir alışma süresi değil, bir kontrol sebebidir.\n\nRenkli çay, kahve ve sigara kenarda leke yapar. Cila seansı bunu geciktirir. Diş sıkıyorsanız gece plağı, yeni dolgunun çatlamasını önler. Altı ayda bir kontrol, sızıntıyı ağrıdan önce yakalar.",
      "Composite is hard the moment it is bonded. Chewing before the numbness fades still bites the cheek. If the bite feels high on the first day, that is a reason for a review, not a period of getting used to it.\n\nTea, coffee and smoking stain the edge. A polish visit delays that. If you grind, a night guard keeps a new filling from cracking. A review every six months catches a leak before it becomes pain.",
    ),
    doctorIds: ["elif-demir"],
  },
  {
    id: "dis-beyazlatma",
    icon: "sun",
    image: "/treatments/whitening.jpg",
    imageAlt: L("Klinikte uygulanan diş beyazlatma", "In-clinic tooth whitening"),
    aside: "/treatments/extra-smile.jpg",
    asideAlt: L("Beyazlatma sonrası doğal bir gülüş", "A natural smile after whitening"),
    duration: L("1 klinik seansı", "1 clinic visit"),
    visits: L("Gerekirse ev plağı", "Home trays if needed"),
    comfort: L("Anestezi gerekmez", "No anaesthetic needed"),
    name: L("Diş Beyazlatma", "Tooth whitening"),
    summary: L(
      "Doğal dişin rengini, mineye işleyen kontrollü bir ajanla birkaç ton açmak.",
      "Lifting the colour of a natural tooth by a few shades with a controlled agent in the enamel.",
    ),
    lede: L(
      "Diş beyazlatma, sağlıklı minenin rengini açar. Kaplama, dolgu ve kron beyazlamaz. Bu yüzden önce hangi lekenin doğal dişe, hangisinin eski bir restorasyona ait olduğu ayırılır.\n\nKlinik seansı tek ziyarettir. Ajan dişe uygulanır, ışık bazı sistemlerde etkinliği destekler. Ev tipi plak daha yavaştır ve rengi daha kalıcı oturtabilir. İkisi birlikte de planlanır. Amaç kâğıt beyazı değil, cildinize göre inandırıcı bir açılmadır.",
      "Whitening lifts the colour of healthy enamel. Veneers, fillings and crowns do not whiten. The first task is to separate a stain that belongs to a natural tooth from one that belongs to an old restoration.\n\nThe clinic session is a single visit. The agent is applied to the teeth, and in some systems a light supports it. Home trays are slower, and can settle the colour more lastingly. The two are also planned together. The aim is not paper white. It is a lift that is believable against your skin.",
    ),
    note: L(
      "Porselen beyazlamaz. Lamina planlanıyorsa beyazlatma önce yapılır, renk sonra seçilir.",
      "Porcelain does not whiten. If veneers are planned, whitening comes first and the shade is chosen after.",
    ),
    causes: L(
      "Dış lekeler çay, kahve, kırmızı şarap, sigara ve bazı gıdalardan gelir. Bunlar minenin yüzeyindedir, bazen polisajla açılır, beyazlatmaya hiç gerek kalmaz.\n\nİç renk dentinden gelir. Yaşla dentin kalınlaşır, diş warmer ve koyu görünür. Tetrasiklin, fazla flor ve kanal sonrası bir dişin iç kanaması rengi içeriden değiştirir. İç renk, yüzey temizliğinden açılmaz. Beyazlatma ya da daha koyu bir dişte kaplama konuşulur.",
      "External stains come from tea, coffee, red wine, smoking and some foods. They sit on the enamel, and a polish sometimes lifts them, with no need to whiten at all.\n\nInternal colour comes from dentine. Dentine thickens with age, and the tooth looks warmer and darker. Tetracycline, excess fluoride and bleeding inside a tooth after a root canal change the colour from within. Internal colour does not lift with a surface clean. Whitening is discussed, or a veneer on a darker tooth.",
    ),
    goals: L(
      "Doğal dişlerin rengini, birbirine yakın ve abartısız bir tonda açmak. Dolgunun rengiyle dişin rengi ayrışıyorsa, beyazlatmadan sonra dolguyu yenilemek ayrı bir adımdır.\n\nHassasiyeti yönetmek de hedeftir. Mine inceyse, diş eti çekilmişse ya da çürük varsa önce onlar ele alınır. Beyazlatma, çürüğün üstüne yapılmaz.",
      "To lift the natural teeth to a shade that is even and not exaggerated. If a filling no longer matches, replacing it after whitening is a separate step.\n\nManaging sensitivity is also a goal. Thin enamel, receded gum or decay are dealt with first. Whitening is not done over decay.",
    ),
    methods: L(
      "Klinik tipi, yüksek konsantrasyonlu bir peroksit ajan kullanır. Diş eti koruyucu bir bariyerle örtülür. Seans yaklaşık kırk beş ile doksan dakika sürer.\n\nEv tipi, size özel bir plak ve daha düşük dozlu bir jeldir. Gece ya da gün içinde, size yazılan süre kadar takılır. İçten beyazlatma, kanal tedavili ve kararmış tek bir dişin içine ajan konmasıdır. O dişin komşuları dıştan açılmaz, yoksa tek diş daha da ayrışır.",
      "In-clinic whitening uses a higher-strength peroxide. The gum is covered with a protective barrier. A session lasts about forty-five to ninety minutes.\n\nHome whitening is a custom tray and a lower-dose gel, worn at night or in the day for the time you are given. Internal whitening places an agent inside a single root-treated tooth that has darkened. The neighbours are not whitened from the outside, or the single tooth stands out even more.",
    ),
    application: L(
      "Önce çürük, diş taşı ve sızdıran dolgu taranır. Renk, bir skala ile fotoğraflanır. Bu fotoğraf, “oldu mu” tartışmasını hatıraya bırakmaz.\n\nKlinik seansta dudak ve diş eti korunur, ajan sürülür, gerekirse tazelenir. Ev plağında jel taşırılmaz. Taşan jel diş etini beyazlatır gibi yakar, bu geçicidir ve doz fazla demektir. Gebelik ve emzirmede beyazlatma ertelenir. On altı yaş altında, mine olgunlaşmadan uygulanmaz.",
      "Decay, calculus and leaking fillings are checked first. The shade is photographed against a guide. That photograph keeps the question of whether it worked from becoming a memory.\n\nIn the clinic the lips and gum are protected, the agent is applied, and refreshed if needed. In a home tray the gel is not overfilled. Gel that spills burns the gum into a white patch. It is temporary, and it means the dose was too much. Whitening is postponed in pregnancy and while breastfeeding. It is not used under sixteen, before the enamel has matured.",
    ),
    teeth: L(
      "Beyazlatma, ağızda görünen doğal dişlerin tamamına bakacak şekilde planlanır. Yalnız üst ön iki dişi açmak, komşuları koyu bırakır. Alt ve üst birlikte düşünülür.\n\nKaplama, kron ve büyük kompozit dolgu kendi renginde kalır. Kanal tedavili kararmış bir diş, diğerleri açıldıktan sonra içten beyazlatılır ya da lamina ile kapatılır. Süt dişleri beyazlatılmaz.",
      "Whitening is planned across the natural teeth that show. Lifting only the two upper front teeth leaves the neighbours dark. Upper and lower are considered together.\n\nVeneers, crowns and large composite fillings stay their own colour. A darkened root-treated tooth is whitened from the inside after the others, or covered with a veneer. Baby teeth are not whitened.",
    ),
    aftercare: L(
      "Bir iki gün soğuk hassasiyeti sık görülür. Hassasiyet macunu bu süreyi kısaltır. İlk kırk sekiz saat çay, kahve, kırmızı şarap, sos ve sigara rengin geri oturmasına yardım eder. Bu pencere, minenin yeniden su dengesini kurduğu zamandır.\n\nRenk yıllar içinde yavaşça geri döner. Ev plağı, kısa bir hatırlatma kürüyle taze tutulur. Haftada bir, haber vermeden jel kullanmak mineyi yormaz diye bir kural yoktur. Doz, size yazıldığı kadar kalır.",
      "Cold sensitivity is common for a day or two. A sensitivity toothpaste shortens it. For the first forty-eight hours, tea, coffee, red wine, sauces and smoking help the colour settle back. That window is when the enamel is restoring its water balance.\n\nColour returns slowly over the years. Home trays keep it fresh with a short reminder course. There is no rule that a gel used once a week, unasked, will not tire the enamel. The dose stays at what you were given.",
    ),
    doctorIds: ["selin-acar"],
  },
  {
    id: "dis-tasi-temizligi",
    icon: "droplet",
    image: "/treatments/extra-clinic.jpg",
    imageAlt: L("Diş yüzeyi ve diş eti kenarının temizliği", "Cleaning the tooth surface and the gum line"),
    aside: "/treatments/perio.jpg",
    asideAlt: L("Temizlik öncesi diş eti kontrolü", "A gum check before the cleaning"),
    duration: L("30–60 dakika", "30–60 minutes"),
    visits: L("6–12 ayda bir", "Every 6–12 months"),
    comfort: L("Çoğu kişide anestezisiz", "No anaesthetic for most people"),
    name: L("Diş Taşı Temizliği", "Scale and polish"),
    summary: L(
      "Fırçanın çözemediği taş ve lekeyi, diş etini travmatize etmeden kaldırmak.",
      "Removing the calculus and stain a brush cannot lift, without traumatising the gum.",
    ),
    lede: L(
      "Diş taşı, plağın tükürük mineralleriyle sertleşmiş halidir. Dişin yüzeyine yapışır, diş eti kenarında birikir ve fırçayla çıkmaz. Temizlik, bu taşı ultrasonik bir uç ve el aletleriyle kaldırır, sonra yüzeyi parlatır.\n\nBu işlem diş eti tedavisinin tamamı değildir. Cep derinliği ve kemik kaybı varsa periodontoloji devreye girer. Taş temizliği, o kapının önündeki düzenli bakımdır. Kanayan bir diş etini “alışırım” diye bırakmak, kemiğin sessizce erimesine izin vermektir.",
      "Calculus is plaque hardened by the minerals in saliva. It sticks to the tooth, gathers at the gum line, and a brush will not remove it. A cleaning lifts it with an ultrasonic tip and hand instruments, then polishes the surface.\n\nThis is not the whole of gum treatment. If there are deep pockets and bone loss, periodontology takes over. A scale and polish is the regular maintenance in front of that door. Leaving a bleeding gum because you will get used to it lets bone resorb in silence.",
    ),
    note: L(
      "Temizlik dişi inceltmez. Diş, taşın altında zaten duran kendi rengine döner.",
      "A cleaning does not thin the tooth. The tooth returns to the colour it already had under the calculus.",
    ),
    causes: L(
      "Plak yirmi dört ile yetmiş iki saat içinde mineralleşmeye başlar. Tükürüğü mineralden zengin kişilerde taş daha hızlı oluşur. Alt ön dişlerin dil tarafı, tükürük bezi kanalının açıldığı yer olduğu için ilk taş burada görülür.\n\nDüzensiz fırça, arayüzün hiç temizlenmemesi, sigara ve ağız kuruluğu taşı hızlandırır. Tek başına “sert su” bir sebep değildir. Sebep, temizlenmeden kalan plaktır.",
      "Plaque begins to mineralise within twenty-four to seventy-two hours. People whose saliva is rich in minerals form calculus faster. The tongue side of the lower front teeth is where it appears first, because a salivary duct opens there.\n\nIrregular brushing, never cleaning between the teeth, smoking and a dry mouth speed it up. Hard water alone is not a cause. The cause is plaque left uncleaned.",
    ),
    goals: L(
      "Taşı ve yüzeye işlemiş lekeleri kaldırmak, diş etinin kanamasını azaltmak, nefesin taş altındaki bakterilerden kokmasını kesmek. Pürüzsüz yüzey, yeni plağın tutunmasını geciktirir.\n\nAmaç dişi beyazlatmak değildir. Taşın altından çıkan diş, komşusundan koyu görünebilir. Renk ayrı bir işlemdir. Temizliğin başarısı, bir hafta sonra diş etinin fırçayla kanamamasıdır.",
      "To remove calculus and surface stain, reduce gum bleeding, and stop breath smelling of the bacteria under the calculus. A smooth surface delays new plaque from attaching.\n\nThe aim is not to whiten the tooth. A tooth uncovered from calculus can look darker than its neighbour. Colour is a separate procedure. The cleaning has worked if, a week later, the gum does not bleed on the brush.",
    ),
    methods: L(
      "Ultrasonik uç, taşı titreşim ve su spreyiyle kırar. El aletleri, uçun ulaşamadığı ince kenarı sıyırır. Airflow ya da polisaj pastası, çay ve kahve lekesini yüzeyden alır.\n\nDiş eti altında taş varsa aynı seansta, gerekirse uyuşturularak kök yüzeyine inilir. Bu, basit bir parlatmadan uzun sürer. Cep haritası derin çıkarsa işlem periodontal tedaviye döner, aceleyle “temizlendi” denmez.",
      "An ultrasonic tip breaks calculus with vibration and a water spray. Hand instruments skim the fine edge the tip cannot reach. An airflow or a polishing paste lifts tea and coffee stain from the surface.\n\nIf calculus sits under the gum, the same visit goes down to the root, with anaesthetic if needed. That takes longer than a simple polish. If a pocket chart reads deep, the visit becomes periodontal treatment. It is not hurried into a sentence that says it was cleaned.",
    ),
    application: L(
      "Kısa bir muayene ile taşın yeri ve diş etinin kanayıp kanamadığı bakılır. Çoğu kişide anestezi gerekmez. Diş eti çok hassassa bir bölge uyuşturulur.\n\nSu spreyi ve titreşim hissedilir. Bu, dişi kesmek değildir. İşlem otuz ile altmış dakika sürer. Bitince yüzey cilalanır, fırça ve arayüz fırçasının ölçüsü gösterilir. Eve, soyut bir “daha iyi fırçalayın” cümlesiyle değil, hangi boşluğa hangi fırçayla girileceği gösterilerek yollanır.",
      "A short examination looks at where the calculus is, and whether the gum bleeds. Most people do not need anaesthetic. If the gum is very tender, one area is numbed.\n\nYou feel the water spray and the vibration. That is not the tooth being cut. The visit takes thirty to sixty minutes. The surface is polished at the end, and the size of brush and interdental brush is shown. You leave having seen which brush enters which space, not with an abstract instruction to brush better.",
    ),
    teeth: L(
      "Temizlik, ağızdaki bütün dişlere ve varsa implantların görünen yüzeyine bakılır. Taş en çok alt keserlerin arkasında, üst azıların yanak tarafında ve eski köprülerin altında birikir.\n\nİmplantın çevresindeki temizlik, doğal dişten daha nazik uçlarla yapılır. Kaplamanın kenarı çizilmez. Süt dişlerinde de taş olur ama çocuk protokolü pedodontidedir. Burada erişkin ve ergen ağız söz konusudur.",
      "The cleaning looks at every tooth in the mouth, and at the visible surface of an implant if there is one. Calculus gathers most behind the lower incisors, on the cheek side of the upper molars, and under old bridges.\n\nCleaning around an implant uses gentler tips than a natural tooth. The edge of a crown is not scratched. Baby teeth can form calculus too, but the child’s protocol sits with paediatric dentistry. This page is the adult and teenage mouth.",
    ),
    aftercare: L(
      "Diş eti aynı gün hafif kanayabilir ve üşüyebilir. Bu, taşın altında sıkışmış etiğin rahatlamasıdır. Bir iki günde diner. O gün çok sıcak, acı ve boyalı gıdalar yüzeyi rahatsız edebilir.\n\nFırça akşam bırakılmaz. Yumuşak bir fırçayla aynı gece dönülür. Aralık, tükürük yapınıza göre altı ile on iki ayda bir yenilenir. Sigara içen ve hızlı taş tutan ağızda altı ay daha güvenlidir. Kanama iki haftada geçmezse periodontal ölçüm istenir.",
      "The gum can bleed lightly and feel cold the same day. That is tissue, compressed under calculus, settling. It fades in a day or two. Very hot, spicy and heavily coloured food can bother the surface that day.\n\nThe brush is not skipped in the evening. You return the same night with a soft brush. The interval is renewed every six to twelve months, according to your saliva. Six months is the safer gap if you smoke or form calculus quickly. If bleeding has not gone in two weeks, a periodontal measurement is the next step.",
    ),
    doctorIds: ["mert-aslan"],
  },
  {
    id: "cene-eklem-tedavisi",
    icon: "activity",
    image: "/treatments/consult.jpg",
    imageAlt: L("Çene ve kapanışın model üzerinde anlatıldığı görüşme", "A visit explaining the jaw and the bite on a model"),
    aside: "/treatments/calm-chair.jpg",
    asideAlt: L("Sakin bir çene eklemi muayenesi", "A calm jaw-joint examination"),
    duration: L("Splint ile birkaç ay", "A few months with a splint"),
    visits: L("2–6 haftada bir", "Every 2–6 weeks"),
    comfort: L("Çoğu adım cerrahisiz", "Most steps without surgery"),
    name: L("Çene Eklem Tedavisi", "Jaw joint care"),
    summary: L(
      "Çene eklemi, çiğneme kasları ve kapanışın birlikte ele alındığı ağrı ve klik tedavisi.",
      "Care for pain and clicking that looks at the jaw joint, the chewing muscles and the bite together.",
    ),
    lede: L(
      "Çene eklemi tedavisi, kulak önündeki eklemin, çiğneme kaslarının ve dişlerin kapanışının birlikte okunmasıdır. Ağrı, klik, ağız açarken kilitlenme ya da sabah çenede yorgunluk bu başlığın sık belirtileridir.\n\nHer klik hastalık değildir. Ağrısız, açılmayı engellemeyen bir ses çoğu zaman izlenir, hemen diş kesilmez. Asıl tedavi, kası rahatlatmak, gece sıkmayı plağa almak ve gün içindeki alışkanlığı fark ettirmektir. Cerrahi, kapanmayan kilitlenmeler ve yapısal bir bozulma için son basamaktır.",
      "Jaw joint care reads the joint in front of the ear, the chewing muscles and the way the teeth meet, together. Pain, a click, locking on opening, or a tired jaw in the morning are the frequent signs.\n\nNot every click is disease. A sound that does not hurt and does not block opening is usually watched. Teeth are not cut straight away. The real treatment relaxes the muscle, carries night grinding onto a splint, and makes the daytime habit visible. Surgery is the last step, for locking that will not release and for structural damage.",
    ),
    note: L(
      "Dişleri küçülterek kapanışı “düzeltmek”, eklem ağrısının birinci tedavisi değildir.",
      "Reducing teeth to “correct” the bite is not the first treatment for joint pain.",
    ),
    causes: L(
      "En sık yük, gece diş sıkma ve gıcırdatmadır. Stres bunu artırır ama tek sebep değildir. Tek taraflı çiğneme, eksik diş, yüksek bir dolgu ve uzun süren ağız açıklığı da kası yorar.\n\nTravma, eklem içi disk dediğimiz yastıkçığı yerinden oynatabilir. Klik, çoğu zaman bu diskin öne kayıp yerine otururken çıkardığı sestir. İltihaplı eklem hastalıkları ve bazı sistemik tablolar da ağrı yapar. Sebep ayırt edilmeden splint yazılmaz.",
      "The most common load is clenching and grinding at night. Stress increases it, but it is not the only cause. Chewing on one side, a missing tooth, a high filling and a long time with the mouth open also tire the muscle.\n\nTrauma can displace the small cushion in the joint, the disc. A click is often the sound of that disc slipping forward and seating again. Inflammatory joint disease and some systemic conditions also cause pain. A splint is not written before the cause is distinguished.",
    ),
    goals: L(
      "Ağrıyı azaltmak, ağız açıklığını günlük işe yetecek kadar geri vermek ve kasın gece yükünü düşürmek. Eklem sesini her vakada yok etmek bir hedef değildir. Ses kalıp ağrı geçerse tedavi amacına ulaşmış sayılır.\n\nDişleri yeniden şekillendirmek ancak ağrı sustuktan, kapanışın gerçekten bir dişte engellendiği görüldükten sonra konuşulur. O da çoğu zaman çok küçük bir aşındırmadır, bir gülüş tasarımı değil.",
      "To reduce pain, to give back enough opening for ordinary life, and to lower the load on the muscle at night. Silencing the joint in every case is not a goal. If the sound remains and the pain goes, treatment has done what it came to do.\n\nReshaping teeth is discussed only after the pain is quiet, and only if the bite is truly blocked on one tooth. Even then it is usually a very small adjustment, not a smile design.",
    ),
    methods: L(
      "Stabilizasyon splinti, üst ya da alt dişe oturan sert bir plaktır. Dişleri hareket ettirmez. Kasın kısılmasını ve eklemin yükünü azaltır. Yumuşak, marketten alınan plaklar aynı işi görmez, bazen sıkmayı artırır.\n\nFizik tedavi, çene egzersizi, sıcak uygulama ve kısa süreli kas gevşetici ya da iltihap giderici ilaç plana girebilir. İlaç, splintin yerine değil yanına yazılır. Çok seçilmiş vakada eklem içi yıkama ya da cerrahi, ağız cerrahisiyle birlikte düşünülür.",
      "A stabilisation splint is a hard plate seated on the upper or lower teeth. It does not move teeth. It reduces muscle bracing and the load on the joint. Soft plates from a shop do not do the same work, and sometimes increase clenching.\n\nPhysiotherapy, jaw exercise, warmth, and a short course of a muscle relaxant or an anti-inflammatory can enter the plan. Medicine is written beside the splint, not instead of it. In a very selected case, a joint wash or surgery is considered with oral surgery.",
    ),
    application: L(
      "Muayenede ağız açıklığı milimetreyle ölçülür, klik ve ağrı haritalanır, çiğneme kasları elle yoklanır. Gerekirse eklem filmi ya da MR istenir. Panoramik film tek başına diski göstermez.\n\nSplint ölçü ya da taramayla hazırlanır, ağızda kapanışa göre ayarlanır. İlk haftalarda iki ila altı haftada bir kontrol edilir, sürtünen yeri inceltilir. Gece takılır. Gündüz fark edilen sıkma için ayrı bir hatırlatma, bazen küçük bir gündüz plağı eklenir. Egzersiz, evde, size gösterilen sayıda yapılır.",
      "The examination measures opening in millimetres, maps the click and the pain, and palpates the chewing muscles. A joint radiograph or an MRI is requested when needed. A panoramic film alone does not show the disc.\n\nThe splint is made from an impression or a scan, and adjusted in the mouth to the bite. For the first weeks it is reviewed every two to six weeks, and any rubbing spot is eased. It is worn at night. A separate reminder, sometimes a small daytime splint, is added for clenching you notice in the day. Exercise is done at home, the number of times you were shown.",
    ),
    teeth: L(
      "Bu tedavi tek bir dişi onarmaz. Splint, bir çenedeki dişlerin tamamına ya da belirlenen gruba oturur. Yüksek bir dolgu ya da yeni bir kron ağrıyı başlattıysa o restorasyon ayrıca düzeltilir.\n\nEksik arka diş, eklemin yükünü artırıyorsa protez ya da implant ikinci adım olur. Önce kas susturulur, sonra eksik diş tamamlanır. Aksi halde yeni diş, aynı sıkma kuvvetinin altına girer ve kırılır.",
      "This treatment does not repair a single tooth. The splint seats on all the teeth of one jaw, or on a chosen group. If a high filling or a new crown started the pain, that restoration is adjusted separately.\n\nIf missing back teeth are increasing the load on the joint, a bridge or an implant becomes the second step. The muscle is quieted first, then the missing tooth is replaced. Otherwise the new tooth enters the same clenching force and breaks.",
    ),
    aftercare: L(
      "İlk günler plakta tükürük artışı ve hafif bir yabancılık hissi olur. Çene ağrısı hemen sıfırlanmayabilir. Birkaç hafta, kasın yeni yüksekliğe alışma süresidir.\n\nSert ekmek, sakız ve uzun süren esneme bu dönemde yük bindirir. Splint sert suda kaynatılmaz, bükülür. Diş gıcırdatma sürdükçe plağın yüzeyi parlar. Parlak yüzey, plağın işe yaradığının işaretidir ve kontrolde yenilenir. Ağrı kulağa, şakağa ve boyuna vuruyorsa bunu kontrolde söylemek, planı değiştirir.",
      "The first days bring more saliva and a mild sense of something foreign on the splint. Jaw pain may not fall to zero at once. A few weeks is the time the muscle takes to accept the new height.\n\nHard bread, gum and long yawning load the joint in this period. The splint is not boiled and it bends in hot water. As grinding continues, the surface of the plate shines. A shiny surface is a sign the plate is working, and it is renewed at review. If pain refers to the ear, the temple or the neck, saying so at the review changes the plan.",
    ),
    doctorIds: ["caner-usta"],
  },
  {
    id: "sedasyon",
    icon: "moon",
    image: "/treatments/calm-chair.jpg",
    imageAlt: L("Sedasyon öncesi sakin bir klinik görüşmesi", "A calm clinic conversation before sedation"),
    aside: "/treatments/child-dental.jpg",
    asideAlt: L("Azot protoksit düzeneğinin bulunduğu çocuk ünitesi", "A children’s surgery with nitrous oxide equipment"),
    duration: L("İşlemle aynı seans", "The same visit as the procedure"),
    visits: L("Ön değerlendirme şart", "A pre-assessment is required"),
    comfort: L("Bilinç açık, rahat", "Conscious, and at ease"),
    name: L("Sedasyon", "Sedation"),
    summary: L(
      "Korku, öğürme ya da uzun cerrahi için, bilinci kapatmadan rahatlatan destek.",
      "Support that eases fear, gagging or a long surgery, without putting consciousness out.",
    ),
    lede: L(
      "Sedasyon bir diş tedavisi değil, tedavinin yapılabilmesi için kurulan bir rahatlıktır. Korku yüzünden yıllardır koltuğa oturamayan kişi, öğürme refleksi güçlü olan kişi ve uzun bir cerrahi geçirecek kişi için planlanır.\n\nKlinikte yapılan, bilinçli sedasyondur. Uyku hapıyla kendinizden geçmezsiniz. Konuşulunca cevap verirsiniz, nefesiniz sizdedir. Genel anestezi, hastane koşullarında ve ayrı bir ekiptedir. İkisini aynı cümlede vaat etmeyiz.",
      "Sedation is not a dental treatment. It is the ease that lets a treatment be done. It is planned for someone who has not been able to sit in the chair for years because of fear, for a strong gag reflex, and for a person facing a long surgery.\n\nWhat the clinic provides is conscious sedation. You are not put beyond yourself with a sleeping pill. You answer when spoken to, and your breathing stays your own. General anaesthesia belongs in a hospital, with a separate team. We do not promise the two in the same sentence.",
    ),
    note: L(
      "Sedasyon cesareti değiştirmez, eşiği düşürür. Tedavinin kendisi yine anlatılarak yapılır.",
      "Sedation does not change courage. It lowers the threshold. The treatment itself is still explained as it is done.",
    ),
    causes: L(
      "Sedasyonun “sebebi” bir çürük değildir. Çoğu zaman eski, aceleye gelmiş ve anlatılmamış bir diş deneyimidir. Beden, üniteyi tehlike olarak kodlamıştır. Bulantı ve öğürme de ayrı bir sebeptir. Ağız içi ayna boğaza değince tedavi bölünür.\n\nUzun implant ya da gömük diş cerrahisi, korku olmasa da sedasyonla daha sakin ilerler. Çocukta ise sebep, yaşı gereği kooperasyonun yetmemesidir. O karar pedodontist ile birlikte verilir, aileyi ikna etmek için değil.",
      "The “cause” of sedation is not a cavity. It is often an old dental experience that was rushed and not explained. The body has coded the chair as danger. Nausea and gagging are a separate cause. Treatment breaks when a mirror touches the throat.\n\nA long implant or impacted-tooth surgery proceeds more calmly with sedation even when there is no fear. In a child, the reason is that cooperation is not there yet for their age. That decision is made with the paediatric dentist, not to persuade a family.",
    ),
    goals: L(
      "Kişinin işlemi yarıda bırakmadan tamamlayabilmesi, ağrının değil korkunun yönetilmesi ve hayati reflekslerin yerinde kalması. Sedasyonun başarısı, hiçbir şey hatırlamamak değildir. Başarısı, güvenli ve bölünmeden biten bir seanstır.\n\nÇocukta amaç, bir daha gelmemecesine korkutmamaktır. Tek bir uzun seans, bazen birçok travmatik yarım seanstan daha iyidir. Bazen de tam tersi. Bu, dosyada yazılır.",
      "That a person can finish the procedure without stopping halfway, that fear is managed rather than pain, and that the vital reflexes stay in place. Success is not remembering nothing. Success is a visit that ends safely and without being broken up.\n\nIn a child, the aim is not to frighten them out of coming back. One longer visit is sometimes kinder than many traumatic half-visits. Sometimes the opposite is true. That is written in the notes.",
    ),
    methods: L(
      "Azot protoksit, burun maskesiyle solunan bir gazdır. İşlem bitince oksijenle etkisi hızla dağılır. Erişkinde hafif kaygı ve öğürme için, çocukta seçilmiş vakada kullanılır.\n\nBilinci yerinde tutan damar yolu sedasyonu daha derindir. İlaç doz doz verilir, solunum ve nabız izlenir. Ağızdan alınan sakinleştirici, daha hafif bir basamaktır ve etki süresi kişiden kişiye değişir. Hangisinin seçileceği kaygı düzeyi, işlemin uzunluğu ve sağlık özgeçmişine bağlıdır.",
      "Nitrous oxide is a gas breathed through a nasal mask. When the procedure ends, oxygen clears the effect quickly. It is used for mild anxiety and gagging in adults, and in selected cases for children.\n\nIntravenous sedation that keeps you conscious is deeper. The medicine is given in doses, and breathing and pulse are monitored. An oral sedative is a lighter step, and how long it lasts varies from person to person. The choice depends on the level of anxiety, the length of the procedure and the medical history.",
    ),
    application: L(
      "Sedasyon günü bir sürpriz değildir. Önce sağlık formu doldurulur. Kalp, akciğer, ilaçlar, alerji ve gebelik sorulur. Gerekirse kendi hekiminizden görüş istenir. Damar yolu ya da ağızdan ilaç planlandıysa açlık süresi ve bir refakatçi şartı yazılı verilir.\n\nİşlem boyunca oksijen, nabız ve tansiyon izlenir. Siz konuşulunca cevap verecek kadar buradasınızdır. Azot protoksidin maskesi burnunuzda kalır, ağızdan diş tedavisi sürer. Seans bitince derlenme alanı vardır. Araba kullanmak, o gün, damar yolu sedasyonunda yasaktır.",
      "Sedation day is not a surprise. A medical form is completed first. Heart, lungs, medicines, allergy and pregnancy are asked. Your own physician is consulted when needed. If intravenous medicine or an oral sedative is planned, a fasting time and an escort are given in writing.\n\nOxygen, pulse and blood pressure are monitored throughout. You are here enough to answer when spoken to. The nitrous mask stays on the nose while dental treatment continues through the mouth. There is a recovery area when the visit ends. Driving that day is not allowed after intravenous sedation.",
    ),
    teeth: L(
      "Sedasyon belirli bir dişi tedavi etmez. O gün yapılacak diş işi, sedasyonun yanında ayrıca planlanır. Bu bir dolgu, gömük diş, implant ya da çocukta birkaç süt dişi olabilir.\n\nTek seansta bütün ağzı bitirmek her zaman doğru değildir. İlaç dozu ve yorgunluk sınırı, diş sayısından önce gelir. Hangi dişlerin o gün biteceği, ön görüşmede liste halinde yazılır. Liste dışı bir diş, sedasyonun içinde aceleyle eklenmez.",
      "Sedation does not treat a particular tooth. The dental work of that day is planned beside it. It may be a filling, an impacted tooth, an implant, or several baby teeth in a child.\n\nFinishing the whole mouth in one visit is not always right. The dose of medicine and the limit of fatigue come before the number of teeth. Which teeth will be finished that day is written as a list at the preview. A tooth that is not on the list is not added in a hurry under sedation.",
    ),
    aftercare: L(
      "Azot protoksitten sonra çoğu kişi kısa bir oksijen solumasının ardından günlük işine döner. Damar yolu sedasyonunda günün geri kalanı dinlenmeye aittir. Refakatçi sizi bırakmaz. Alkol, o gece eklenmez.\n\nAğızda yapılan işlemin bakımı, o işlemin kendi sayfasındaki gibidir. Sedasyon, şişliği ya da dikişi değiştirmez. Baş dönmesi, bulantı ya da beklenenden uzun bir uyku hali olursa klinikle aynı gün konuşulur. Bir sonraki randevu, bu deneyim sakinken kurulur.",
      "After nitrous oxide, most people return to the day following a short breath of oxygen. After intravenous sedation, the rest of the day belongs to rest. Your escort does not leave you. Alcohol is not added that night.\n\nCare of the work done in the mouth follows that treatment’s own page. Sedation does not change swelling or stitches. Dizziness, nausea, or sleepiness that lasts longer than expected is discussed with the clinic the same day. The next appointment is set while this experience is still calm.",
    ),
    doctorIds: ["kerem-yilmaz", "ayse-nur-koc"],
  },
];

export const services: Service[] = treatments.map((treatment) => ({
  id: treatment.id,
  icon: treatment.icon,
  featured: treatment.featured,
  duration: treatment.duration,
  name: treatment.name,
  summary: treatment.summary,
  detail: treatment.lede,
}));

export function isServiceId(value: string | null): value is ServiceId {
  return treatments.some((treatment) => treatment.id === value);
}

export function getService(id: ServiceId) {
  return services.find((service) => service.id === id) ?? services[0];
}

export function getTreatment(id: string) {
  return treatments.find((treatment) => treatment.id === id);
}
