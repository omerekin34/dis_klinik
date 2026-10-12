import type { Locale, Localized } from "@/lib/content";
import type { TreatmentId } from "@/lib/treatments";

export type BlogCategory = "implant" | "orthodontics" | "aesthetics" | "kids" | "oral-care" | "travel";

export type BlogSection = {
  heading: Localized;
  body: Localized;
};

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  date: string;
  image: string;
  imageAlt: Localized;
  authorId?: string;
  treatmentId?: TreatmentId;
  title: Localized;
  excerpt: Localized;
  intro: Localized;
  sections: BlogSection[];
  takeaway: Localized;
};

const L = (tr: string, en: string): Localized => ({ tr, en });

export const blogCategories: Record<BlogCategory, Localized> = {
  implant: L("İmplant", "Implants"),
  orthodontics: L("Ortodonti", "Orthodontics"),
  aesthetics: L("Estetik", "Aesthetics"),
  kids: L("Çocuk Diş Sağlığı", "Children’s dental health"),
  "oral-care": L("Ağız Bakımı", "Oral care"),
  travel: L("Sağlık Turizmi", "Health tourism"),
};

const posts: BlogPost[] = [
  {
    slug: "implant-tedavisi-adim-adim",
    category: "implant",
    date: "2026-10-02",
    image: "/treatments/implant-model.jpg",
    imageAlt: L("Klinikte incelenen implant modeli", "An implant model examined in the clinic"),
    authorId: "kerem-yilmaz",
    treatmentId: "dental-implant",
    title: L(
      "İmplant Tedavisi Adım Adım: Plandan Kalıcı Dişe",
      "Dental Implants, Step by Step: From the Plan to the Final Tooth",
    ),
    excerpt: L(
      "Tomografiden kalıcı kronun takılmasına kadar implant sürecinde neler olur, ne kadar sürer ve nelere dikkat etmek gerekir?",
      "From the first scan to the final crown: what happens during implant treatment, how long it takes and what to watch for.",
    ),
    intro: L(
      "Eksik bir diş, yalnızca gülüşte bir boşluk değildir. Zamanla komşu dişler boşluğa doğru eğilir, karşı çenedeki diş uzar ve o bölgedeki kemik incelir. İmplant, bu zincirin ilk halkasını yerine koyar.\n\nSüreç dışarıdan uzun görünebilir; oysa her aşamanın bir nedeni vardır. Aşağıda, kliniğimizde bir implantın nasıl planlandığını ve hangi adımlardan geçtiğini sade bir dille anlattık.",
      "A missing tooth is more than a gap in the smile. Over time the neighbouring teeth tilt into the space, the opposing tooth over-erupts and the bone in that area thins. An implant puts back the first link of that chain.\n\nThe process can look long from the outside, yet every stage has a reason. Below, we explain in plain language how an implant is planned in our clinic and the steps it passes through.",
    ),
    sections: [
      {
        heading: L("Önce plan: tomografi ve dijital tasarım", "The plan comes first: scan and digital design"),
        body: L(
          "İmplantın başarısı, cerrahiden çok önce belirlenir. 3D tomografi; kemiğin yüksekliğini, genişliğini, sinüs ve sinir kanalıyla ilişkisini milimetrik olarak gösterir. Bu verilerle implantın boyu, çapı ve açısı dijital ortamda seçilir.\n\nGerekirse bu plandan bir cerrahi rehber üretilir. Rehber, ekranda belirlenen konumu ağız içine aynı açıyla taşır; işlem daha kısa, iyileşme daha konforlu olur.",
          "An implant’s success is decided long before surgery. A 3D scan shows the height and width of the bone, and its relationship to the sinus and the nerve canal, to the millimetre. With that data, the implant’s length, diameter and angle are chosen digitally.\n\nWhen needed, a surgical guide is produced from the plan. The guide carries the position chosen on screen into the mouth at the same angle, so the procedure is shorter and healing more comfortable.",
        ),
      },
      {
        heading: L("Yerleştirme günü: düşündüğünüzden sakin", "Placement day: calmer than you think"),
        body: L(
          "Tek bir implant çoğu zaman lokal anestezi altında, yaklaşık 30–60 dakikada yerleştirilir. İşlem sırasında ağrı değil, yalnızca basınç hissedilir. Kaygılı hastalar ya da uzun cerrahiler için sedasyon seçeneği ayrıca konuşulur.\n\nİlk iki üç gün hafif şişlik ve hassasiyet normaldir. Soğuk uygulama, yumuşak gıdalar ve hekimin önerdiği ilaçlarla bu dönem genellikle rahat geçer.",
          "A single implant is usually placed under local anaesthetic in about 30–60 minutes. You feel pressure during the procedure, not pain. For anxious patients or longer surgery, sedation is discussed as a separate option.\n\nMild swelling and tenderness for the first two or three days are normal. Cold compresses, soft food and the medication your clinician recommends usually make this period comfortable.",
        ),
      },
      {
        heading: L("Bekleme dönemi: kemikle kaynaşma", "The waiting period: bonding with the bone"),
        body: L(
          "İmplantın kemikle bütünleşmesine osseointegrasyon denir; çoğu vakada alt çenede yaklaşık 2–3, üst çenede 3–4 ay sürer. Estetik bölgedeyseniz bu sürede geçici bir dişle günlük hayatınıza devam edersiniz.\n\nKemik yetersizse greft ya da sinüs kaldırma gibi ek işlemler gerekebilir. Bu durumda süre uzar; ancak bu bilgi en baştan, planlama aşamasında paylaşılır.",
          "The implant bonding with the bone is called osseointegration. In most cases it takes about 2–3 months in the lower jaw and 3–4 months in the upper jaw. If the implant is in a visible area, you carry on with daily life wearing a temporary tooth.\n\nIf there is not enough bone, a graft or a sinus lift may be needed. That lengthens the timeline, but you hear about it at the very start, during planning.",
        ),
      },
      {
        heading: L("Kalıcı diş ve uzun ömür", "The final tooth and a long life"),
        body: L(
          "Kaynaşma tamamlanınca ağız içi taramayla ölçü alınır; zirkonyum ya da porselen kron, komşu dişlerin rengine göre hazırlanır. Kron takıldığında implant, doğal bir diş gibi çiğneme yükünü taşımaya başlar.\n\nİmplantın ömrü büyük ölçüde bakıma bağlıdır. Düzenli fırçalama, arayüz fırçası, yılda bir iki kez kontrol ve sigaradan uzak durmak, implantın yıllarca sorunsuz kalmasının en önemli koşullarıdır.",
          "Once bonding is complete, an intraoral scan records the impression and a zirconia or porcelain crown is made to match the neighbouring teeth. When the crown is fitted, the implant begins carrying chewing forces like a natural tooth.\n\nAn implant’s lifespan depends largely on care. Regular brushing, interdental brushes, one or two check-ups a year and staying away from smoking are the most important conditions for years of trouble-free use.",
        ),
      },
    ],
    takeaway: L(
      "İmplantta en kısa yol, en iyi planlanan yoldur. Süreyi takvim değil, kemiğin kendisi belirler.",
      "With implants, the shortest path is the best-planned one. The bone sets the timeline, not the calendar.",
    ),
  },
  {
    slug: "seffaf-plak-mi-tel-mi",
    category: "orthodontics",
    date: "2026-09-21",
    image: "/treatments/aligner.jpg",
    imageAlt: L("Şeffaf ortodontik plak", "A clear orthodontic aligner"),
    authorId: "deniz-kaya",
    treatmentId: "telsiz-ortodonti",
    title: L(
      "Şeffaf Plak mı, Tel mi? Size Uygun Ortodonti Seçimi",
      "Clear Aligners or Braces? Choosing the Right Orthodontics for You",
    ),
    excerpt: L(
      "İki yöntem de dişleri hizalar; ama her vakaya aynı şekilde uymaz. Karar verirken nelere bakmalı?",
      "Both methods straighten teeth, but they don’t suit every case equally. What should guide the decision?",
    ),
    intro: L(
      "Ortodonti denince akla artık yalnızca metal teller gelmiyor. Şeffaf plaklar, neredeyse görünmeden dişleri hizalayabildiği için özellikle yetişkinler arasında çok tercih ediliyor. Peki her ağız için uygun mu?\n\nDoğru yöntem; çapraşıklığın derecesine, kapanış sorununa ve günlük alışkanlıklarınıza göre belirlenir. İşte iki seçeneği karşılaştırırken dikkate aldığımız başlıca noktalar.",
      "Orthodontics no longer means metal braces alone. Clear aligners straighten teeth almost invisibly, which makes them popular, especially with adults. But are they right for every mouth?\n\nThe right method depends on how crowded the teeth are, the bite problem and your daily habits. Here are the main points we weigh when comparing the two options.",
    ),
    sections: [
      {
        heading: L("Şeffaf plak nasıl çalışır?", "How do clear aligners work?"),
        body: L(
          "Şeffaf plaklar, dijital tarama üzerinden planlanan ve her biri dişleri milimetrenin onda biri kadar hareket ettiren bir seri halinde üretilir. Her set genellikle 1–2 hafta kullanılır, ardından bir sonrakine geçilir.\n\nEn büyük avantajı çıkarılabilir olmasıdır: yemek yerken ve fırçalarken çıkarılır, böylece ağız hijyeni kolaylaşır. Ancak etkili olması için günde 20–22 saat takılması gerekir; bu disiplin tamamen hastaya aittir.",
          "Clear aligners are planned from a digital scan and produced as a series, each set moving the teeth by fractions of a millimetre. Each set is usually worn for 1–2 weeks before moving on to the next.\n\nTheir biggest advantage is that they are removable: you take them out to eat and brush, which makes hygiene easier. To work, though, they must be worn 20–22 hours a day, and that discipline belongs entirely to the patient.",
        ),
      },
      {
        heading: L("Tel ne zaman daha doğru seçim?", "When are braces the better choice?"),
        body: L(
          "Sabit teller; ileri derecede çapraşıklık, dişlerin kendi ekseninde dönmesi veya karmaşık kapanış bozukluklarında daha öngörülebilir sonuç verir. Hasta uyumuna bağlı olmadıkları için tedavi kendi temposunda ilerler.\n\nSeramik braketler, metal braketlere göre çok daha az dikkat çeker. Görünüm kaygısı olan ancak plak için uygun olmayan vakalarda iyi bir ara çözümdür.",
          "Fixed braces give more predictable results with severe crowding, rotated teeth or complex bite problems. Because they don’t depend on patient compliance, treatment moves at its own steady pace.\n\nCeramic brackets draw far less attention than metal ones. They are a good middle ground for patients who care about appearance but are not suited to aligners.",
        ),
      },
      {
        heading: L("Konfor, süre ve bakım", "Comfort, duration and care"),
        body: L(
          "Her iki yöntemde de ilk günlerde hafif bir baskı hissedilir. Plakta yeni sete geçişlerde, telde ise kontrol sonrasında bu his birkaç gün sürer. Tedavi süresi vakaya göre genellikle 6 ile 24 ay arasında değişir.\n\nTel taşıyanlar sert ve yapışkan gıdalara dikkat etmeli, arayüz fırçası kullanmalıdır. Plak kullananlar ise plakları takmadan önce dişlerini fırçalamalı ve plakları sıcak sudan uzak tutmalıdır.",
          "Both methods bring light pressure in the first days. With aligners it returns when you switch sets, with braces after each adjustment, and it fades within a few days. Treatment usually lasts between 6 and 24 months, depending on the case.\n\nWith braces, avoid hard and sticky food and use interdental brushes. With aligners, brush before putting them back in and keep them away from hot water.",
        ),
      },
      {
        heading: L("Tedavi bitince: pekiştirme", "After treatment: retention"),
        body: L(
          "Hangi yöntem seçilirse seçilsin, tedavinin en çok ihmal edilen kısmı pekiştirmedir. Dişler yeni konumlarına zamanla alışır; bu süreçte sabit bir tel ya da gece plağı kullanılmazsa eski yerlerine dönme eğilimi gösterirler.\n\nBu nedenle ortodontik tedavinin bitişi, aslında bakım döneminin başlangıcıdır.",
          "Whichever method you choose, retention is the most neglected part of treatment. Teeth need time to settle into their new positions; without a fixed retainer or a night-time retainer, they tend to drift back.\n\nThat is why the end of orthodontic treatment is really the start of the maintenance phase.",
        ),
      },
    ],
    takeaway: L(
      "Doğru yöntem, en görünmez olan değil; sizin vakanızda hedefe en güvenli ulaşan yöntemdir.",
      "The right method isn’t the most invisible one; it’s the one that reaches the goal most reliably in your case.",
    ),
  },
  {
    slug: "lamina-mi-zirkonyum-mu",
    category: "aesthetics",
    date: "2026-09-08",
    image: "/treatments/extra-smile.jpg",
    imageAlt: L("Doğal görünümlü estetik bir gülüş", "A natural-looking aesthetic smile"),
    authorId: "selin-acar",
    treatmentId: "estetik-dis-hekimligi",
    title: L(
      "Lamina mı, Zirkonyum mu? Gülüş Tasarımında Doğru Malzeme",
      "Veneers or Zirconia? Choosing the Right Material for Your Smile",
    ),
    excerpt: L(
      "İkisi de estetik sonuç verir; fark, dişten ne kadar doku alındığında ve dişin neye ihtiyaç duyduğunda saklıdır.",
      "Both give an aesthetic result. The difference lies in how much tooth is removed and what the tooth actually needs.",
    ),
    intro: L(
      "Gülüş tasarımı için gelen misafirlerimizin en sık sorduğu soru budur. İki malzeme de doğal görünür, ikisi de uzun ömürlüdür; ancak farklı sorunları çözmek için tasarlanmışlardır.\n\nSeçimi belirleyen şey moda değil, dişin mevcut durumudur. Bu yazıda iki seçeneğin farkını ve hangisinin kime uygun olduğunu anlatıyoruz.",
      "This is the question our smile-design guests ask most. Both materials look natural and both last a long time, but they are designed to solve different problems.\n\nThe choice is driven by the condition of the tooth, not by fashion. In this article we explain the difference and who each option suits.",
    ),
    sections: [
      {
        heading: L("Lamina: ince ve koruyucu", "Veneers: thin and conservative"),
        body: L(
          "Lamina (porselen veneer), yaklaşık 0,3–0,7 mm kalınlığında, dişin yalnızca ön yüzüne yapıştırılan ince bir porselen yapraktır. Dişten çok az doku alınır; bazı vakalarda hiç aşındırma gerekmez.\n\nRenk bozukluğu, küçük kırıklar, diş aralıkları ve hafif şekil bozuklukları için idealdir. Işığı doğal mine gibi geçirdiği için özellikle ön dişlerde çok gerçekçi bir sonuç verir.",
          "A veneer is a thin porcelain shell, roughly 0.3–0.7 mm thick, bonded only to the front surface of the tooth. Very little tooth is removed, and in some cases none at all.\n\nIt is ideal for discolouration, small chips, gaps and mild shape problems. Because it passes light like natural enamel, it gives a very lifelike result, especially on the front teeth.",
        ),
      },
      {
        heading: L("Zirkonyum: güçlü ve kapsayıcı", "Zirconia: strong and comprehensive"),
        body: L(
          "Zirkonyum kron, dişin tamamını saran, metal içermeyen ve son derece dayanıklı bir kaplamadır. Dişin her yüzeyinden belirli miktarda aşındırma gerektirir.\n\nGeniş dolgulu, kanal tedavili, ciddi kırık veya aşınma olan dişlerde ve çiğneme yükünün yüksek olduğu arka bölgelerde tercih edilir. İmplant üstü kronlarda da en sık kullanılan malzemedir.",
          "A zirconia crown covers the whole tooth. It is metal-free and extremely strong, and it requires some reduction on every surface of the tooth.\n\nIt is the choice for teeth with large fillings, root canal treatment, serious fractures or wear, and for back teeth that carry heavy chewing loads. It is also the most common material for crowns on implants.",
        ),
      },
      {
        heading: L("Karar nasıl verilir?", "How is the decision made?"),
        body: L(
          "Kliniğimizde önce dijital gülüş analizi yapılır; yüz oranları, dudak çizgisi ve diş eti seviyesi değerlendirilir. Ardından her dişin sağlık durumu ayrı ayrı incelenir. Sağlam bir dişe gereksiz yere kron yapılmaz.\n\nÇoğu gülüş tasarımında iki malzeme birlikte kullanılır: sağlam ön dişlere lamina, yıpranmış veya kanal tedavili dişlere zirkonyum. Önemli olan, hepsinin aynı tonda ve uyum içinde görünmesidir.",
          "In our clinic we start with a digital smile analysis, looking at facial proportions, the lip line and the gum level. Then the health of each tooth is assessed individually. A healthy tooth is never crowned without reason.\n\nMost smile designs combine the two: veneers on healthy front teeth, zirconia on worn or root-treated teeth. What matters is that they all share the same shade and look in harmony.",
        ),
      },
      {
        heading: L("Ömür ve bakım", "Lifespan and care"),
        body: L(
          "İyi planlanmış ve doğru yapıştırılmış lamina ve zirkonyum kaplamalar, düzenli bakımla uzun yıllar kullanılabilir. Gece diş sıkma alışkanlığı olan hastalara koruyucu bir gece plağı önerilir.\n\nKaplamalar çürümez; ancak altındaki diş ve diş eti hâlâ canlıdır. Bu yüzden fırçalama, diş ipi ve altı ayda bir kontrol vazgeçilmezdir.",
          "Well-planned and properly bonded veneers and zirconia crowns can last many years with regular care. Patients who clench at night are advised to wear a protective night guard.\n\nThe restorations themselves don’t decay, but the tooth and gum beneath them are still alive. Brushing, flossing and a check-up every six months remain essential.",
        ),
      },
    ],
    takeaway: L(
      "En iyi estetik, dişten en az şey alınarak elde edilendir. Malzemeyi biz değil, diş seçer.",
      "The best aesthetic is the one that takes the least from the tooth. The tooth chooses the material, not us.",
    ),
  },
  {
    slug: "dis-beyazlatma-dogru-bilinen-yanlislar",
    category: "aesthetics",
    date: "2026-08-27",
    image: "/treatments/whitening.jpg",
    imageAlt: L("Diş beyazlatma sonrası parlak bir gülüş", "A bright smile after teeth whitening"),
    authorId: "selin-acar",
    treatmentId: "dis-beyazlatma",
    title: L("Diş Beyazlatma Hakkında Doğru Bilinen 5 Yanlış", "Five Common Myths About Teeth Whitening"),
    excerpt: L(
      "Mineye zarar verir mi, kalıcı mıdır, dolgular da beyazlar mı? En sık duyduğumuz soruları yanıtladık.",
      "Does it damage enamel, is it permanent, will fillings whiten too? We answer the questions we hear most.",
    ),
    intro: L(
      "Diş beyazlatma, estetik diş hekimliğinin en hızlı sonuç veren işlemlerinden biri. Ancak internette dolaşan bilgilerin bir kısmı, insanları ya gereksiz yere korkutuyor ya da gerçekçi olmayan beklentilere sokuyor.\n\nHekim kontrolünde yapılan beyazlatma hakkında en sık karşılaştığımız beş yanlışı tek tek ele aldık.",
      "Teeth whitening is one of the quickest results in aesthetic dentistry. Yet some of the information online either frightens people needlessly or sets unrealistic expectations.\n\nWe take apart, one by one, the five myths we hear most about professionally supervised whitening.",
    ),
    sections: [
      {
        heading: L("“Beyazlatma mineyi aşındırır.”", "“Whitening wears down enamel.”"),
        body: L(
          "Hekim kontrolünde uygulanan beyazlatma jelleri mineyi aşındırmaz; dişin yapısındaki renk pigmentlerini oksidasyon yoluyla açar. Mine yüzeyinden doku kaldırılmaz.\n\nAsıl risk, kontrolsüz ve yüksek konsantrasyonlu ürünlerin bilinçsizce kullanılmasıdır. Bu nedenle beyazlatmadan önce muayene ve doğru konsantrasyonun seçilmesi önemlidir.",
          "Whitening gels applied under professional supervision don’t wear enamel away; they lighten the pigments inside the tooth through oxidation. No tissue is removed from the enamel surface.\n\nThe real risk lies in using uncontrolled, high-concentration products without guidance. That is why an examination and the right concentration matter before whitening.",
        ),
      },
      {
        heading: L("“Sonuç ömür boyu kalıcıdır.”", "“The result lasts forever.”"),
        body: L(
          "Beyazlatmanın etkisi kişiden kişiye değişmekle birlikte genellikle 1–3 yıl korunur. Çay, kahve, kırmızı şarap ve sigara bu süreyi kısaltır.\n\nKişiye özel ev plaklarıyla yılda bir iki kez yapılan kısa destek uygulamaları, sonucu uzun süre taze tutar.",
          "The effect varies from person to person but usually holds for 1–3 years. Tea, coffee, red wine and smoking shorten that time.\n\nShort top-up sessions once or twice a year, using custom trays at home, keep the result fresh for much longer.",
        ),
      },
      {
        heading: L("“Dolgu ve kaplamalar da beyazlar.”", "“Fillings and crowns whiten too.”"),
        body: L(
          "Beyazlatma yalnızca doğal diş dokusunda etkilidir. Kompozit dolguların, laminaların ve kronların rengi değişmez.\n\nÖn dişlerde dolgu veya kaplama varsa önce beyazlatma yapılır, ardından bu restorasyonlar yeni diş rengine uygun olarak yenilenir. Sıralama doğru kurulmazsa renk farkı oluşabilir.",
          "Whitening only works on natural tooth tissue. Composite fillings, veneers and crowns keep their colour.\n\nIf there are fillings or crowns on the front teeth, whitening comes first and those restorations are then renewed to match the new shade. Get the order wrong and a colour mismatch can appear.",
        ),
      },
      {
        heading: L(
          "“Hassasiyet kaçınılmazdır” ve “Herkese aynı beyaz”",
          "“Sensitivity is unavoidable” and “One white suits all”",
        ),
        body: L(
          "Bazı hastalarda işlem sonrası 24–48 saat süren geçici bir hassasiyet olabilir; uygun jel ve hassasiyet giderici uygulamalarla bu belirgin ölçüde azaltılır.\n\nHedef ton ise herkes için aynı değildir. Ten rengi, göz akı ve yüz yapısıyla uyumlu bir beyaz, abartılı bir beyazdan her zaman daha doğal görünür. Amaç “en beyaz” değil, size ait en parlak tondur.",
          "Some patients feel temporary sensitivity for 24–48 hours afterwards; the right gel and desensitising treatment reduce it considerably.\n\nThe target shade isn’t the same for everyone either. A white that suits your skin tone, the whites of your eyes and your face always looks more natural than an exaggerated one. The goal isn’t “the whitest” but the brightest shade that is still yours.",
        ),
      },
    ],
    takeaway: L(
      "Doğru beyazlatma, fotoğrafta hâlâ kendiniz gibi göründüğünüz beyazlatmadır.",
      "Good whitening is the kind where you still look like yourself in photographs.",
    ),
  },
  {
    slug: "cocugunuzun-ilk-dis-hekimi-ziyareti",
    category: "kids",
    date: "2026-08-12",
    image: "/treatments/child-dental.jpg",
    imageAlt: L("Diş hekimi kontrolündeki gülümseyen bir çocuk", "A smiling child at a dental check-up"),
    authorId: "ayse-nur-koc",
    treatmentId: "pedodonti",
    title: L(
      "Çocuğunuzun İlk Diş Hekimi Ziyareti Ne Zaman Olmalı?",
      "When Should Your Child First Visit the Dentist?",
    ),
    excerpt: L(
      "İlk dişle başlayan küçük alışkanlıklar, çocuğunuzun ömür boyu diş sağlığını şekillendirir.",
      "Small habits that begin with the first tooth shape your child’s dental health for life.",
    ),
    intro: L(
      "Birçok aile, süt dişlerinin nasılsa değişeceğini düşünerek ilk diş hekimi ziyaretini ağrı başlayana kadar erteler. Oysa süt dişleri; konuşma, beslenme ve kalıcı dişlerin doğru yerden sürmesi için birer yer tutucudur.\n\nİlk ziyaretin zamanı, nasıl hazırlanılacağı ve evde neler yapılabileceği hakkında bilmeniz gerekenleri derledik.",
      "Many families put off the first dental visit until there is pain, assuming baby teeth will be replaced anyway. Yet baby teeth hold the space for speech, eating and for permanent teeth to come through in the right place.\n\nWe have gathered what you need to know about when to go, how to prepare and what you can do at home.",
    ),
    sections: [
      {
        heading: L("İlk diş, ilk randevu", "First tooth, first visit"),
        body: L(
          "Genel öneri, ilk dişin sürmesinden sonraki altı ay içinde ya da en geç bir yaş civarında ilk kontrolün yapılmasıdır. Bu ziyaret bir tedaviden çok tanışma ve bilgilendirme amaçlıdır.\n\nHekim, dişlerin sürme düzenini, diş etlerini ve beslenme alışkanlıklarını değerlendirir; aileye fırçalama ve florür kullanımı konusunda yol gösterir.",
          "The general advice is a first check-up within six months of the first tooth appearing, or around the first birthday at the latest. The visit is more about getting acquainted and guidance than treatment.\n\nThe dentist looks at how the teeth are erupting, the gums and feeding habits, and guides the family on brushing and fluoride.",
        ),
      },
      {
        heading: L("Ziyarete nasıl hazırlanmalı?", "How to prepare for the visit"),
        body: L(
          "Çocuğunuza diş hekimini korkutucu kelimelerle anlatmamaya özen gösterin. “Acımayacak” gibi ifadeler bile, farkında olmadan acı ihtimalini akla getirebilir. Bunun yerine “dişlerini sayacağız” gibi sade ve olumlu bir dil kullanın.\n\nRandevuyu çocuğun dinlenmiş ve tok olduğu bir saate almak, ilk deneyimin keyifli geçmesine büyük katkı sağlar.",
          "Avoid describing the dentist in frightening words. Even “it won’t hurt” can quietly plant the idea of pain. Use simple, positive language instead, such as “we’re going to count your teeth.”\n\nBooking a time when your child is rested and fed goes a long way towards a pleasant first experience.",
        ),
      },
      {
        heading: L("Evde günlük bakım", "Daily care at home"),
        body: L(
          "İlk dişten itibaren yumuşak bir çocuk fırçası ve pirinç tanesi kadar florürlü diş macunuyla günde iki kez fırçalama önerilir. Üç yaşından sonra bu miktar bezelye tanesi kadar olabilir.\n\nGece biberonla süt veya meyve suyu vermek, “biberon çürüğü” denen hızlı ilerleyen çürüklere yol açabilir. Şekerli atıştırmalıkları ana öğünlerle sınırlamak da önemli bir koruyucudur.",
          "From the first tooth, brush twice a day with a soft children’s brush and a rice-grain smear of fluoride toothpaste. After age three, a pea-sized amount is fine.\n\nGiving milk or juice in a bottle at night can cause fast-spreading “bottle caries.” Limiting sugary snacks to mealtimes is another important protection.",
        ),
      },
      {
        heading: L("Koruyucu uygulamalar", "Preventive treatments"),
        body: L(
          "Florür vernik uygulaması, mineyi güçlendirerek çürük riskini azaltan, hızlı ve ağrısız bir işlemdir. Kalıcı azı dişleri sürdüğünde ise çiğneme yüzeylerindeki derin oluklar fissür örtücülerle kapatılabilir.\n\nAltı ayda bir yapılan düzenli kontroller, olası sorunları küçükken yakalamayı ve çocuğun diş hekimiyle güven ilişkisi kurmasını sağlar.",
          "Fluoride varnish is a quick, painless treatment that strengthens enamel and lowers the risk of decay. When the permanent molars come through, the deep grooves on their chewing surfaces can be sealed with fissure sealants.\n\nRegular check-ups every six months catch problems while they are small and help your child build trust with the dentist.",
        ),
      },
    ],
    takeaway: L(
      "Çocuklukta kurulan güven, yetişkinlikteki diş hekimi korkusunun en iyi ilacıdır.",
      "Trust built in childhood is the best remedy for adult fear of the dentist.",
    ),
  },
  {
    slug: "dis-eti-kanamasi",
    category: "oral-care",
    date: "2026-07-30",
    image: "/treatments/perio.jpg",
    imageAlt: L("Diş eti muayenesi yapılan bir hasta", "A patient having a gum examination"),
    authorId: "mert-aslan",
    treatmentId: "periodontoloji",
    title: L(
      "Diş Eti Kanaması: Ne Zaman Ciddiye Almalısınız?",
      "Bleeding Gums: When Should You Take Them Seriously?",
    ),
    excerpt: L(
      "Fırçalarken görülen birkaç damla kan sıradan değildir. Diş eti hastalığının ilk sinyallerini tanıyın.",
      "A few drops of blood while brushing aren’t normal. Learn the early signs of gum disease.",
    ),
    intro: L(
      "Diş fırçalarken lavaboda pembe bir iz görmek, pek çok kişi için alışılmış bir durumdur. Oysa sağlıklı diş eti, normal fırçalamayla kanamaz. Kanama çoğu zaman diş etinin iltihaplandığını gösteren ilk ve en erken işarettir.\n\nErken fark edildiğinde tamamen geri döndürülebilen bu tablo, ihmal edildiğinde dişi taşıyan kemiği etkileyebilir.",
      "Seeing a pink trace in the sink while brushing feels routine to many people. Yet healthy gums don’t bleed with normal brushing. Bleeding is usually the first and earliest sign that the gums are inflamed.\n\nCaught early, it is fully reversible. Left alone, it can affect the bone that holds the teeth.",
    ),
    sections: [
      {
        heading: L("En sık neden: plak ve diş taşı", "The most common cause: plaque and calculus"),
        body: L(
          "Diş yüzeyinde biriken bakteri plağı, düzenli temizlenmediğinde diş eti kenarında iltihaba yol açar. Bu tabloya gingivitis denir. Plak zamanla sertleşerek diş taşına dönüşür ve artık fırçayla uzaklaştırılamaz.\n\nSigara, hamilelikteki hormonal değişiklikler, diyabet ve bazı ilaçlar da diş etini kanamaya daha yatkın hale getirebilir.",
          "Bacterial plaque that builds up on the teeth and isn’t cleaned away inflames the gum margin. This is called gingivitis. Over time plaque hardens into calculus, which a toothbrush can no longer remove.\n\nSmoking, hormonal changes in pregnancy, diabetes and some medications can also make gums more prone to bleeding.",
        ),
      },
      {
        heading: L("Gingivitisten periodontitise", "From gingivitis to periodontitis"),
        body: L(
          "Gingivitis tedavi edilmezse iltihap, diş etinin altındaki kemiğe ilerleyebilir. Periodontitis adı verilen bu aşamada diş eti çekilir, dişler arasında boşluklar oluşur ve ileri vakalarda dişlerde sallanma başlar.\n\nBu süreç genellikle ağrısız ilerler. Bu yüzden “ağrımıyorsa sorun yoktur” düşüncesi, diş eti hastalıklarında yanıltıcıdır.",
          "Untreated, gingivitis can spread to the bone beneath the gum. At this stage, called periodontitis, the gums recede, gaps open between the teeth and, in advanced cases, teeth begin to loosen.\n\nThe process is usually painless. That is why “if it doesn’t hurt, it’s fine” is misleading when it comes to gum disease.",
        ),
      },
      {
        heading: L("Hangi belirtilerde hekime gitmeli?", "Which signs need a visit?"),
        body: L(
          "Birkaç günden uzun süren kanama, diş etinde kızarıklık ve şişlik, geçmeyen ağız kokusu, dişlerin uzamış gibi görünmesi veya dişler arasında yeni boşluklar oluşması muayene gerektirir.\n\nMuayenede diş eti cepleri özel bir sondayla ölçülür ve gerekirse röntgenle kemik seviyesi değerlendirilir. Tedavi planı bu ölçümlere göre yapılır.",
          "Bleeding that lasts more than a few days, red or swollen gums, persistent bad breath, teeth that look longer or new gaps between teeth all call for an examination.\n\nDuring the visit, the gum pockets are measured with a fine probe and, if needed, the bone level is checked on a radiograph. The treatment plan is built on those measurements.",
        ),
      },
      {
        heading: L("Tedavi ve korunma", "Treatment and prevention"),
        body: L(
          "Erken dönemde profesyonel diş taşı temizliği ve doğru ev bakımı çoğu zaman yeterlidir. İleri vakalarda diş eti altı temizliği (kök yüzeyi düzleştirme) ve düzenli periodontal bakım seansları uygulanır.\n\nGünde iki kez doğru teknikle fırçalama, diş ipi veya arayüz fırçası kullanımı ve altı ayda bir kontrol, diş eti sağlığının temelidir.",
          "In the early stage, a professional scale and polish and good home care are often enough. Advanced cases need deep cleaning below the gum (root planing) and regular periodontal maintenance visits.\n\nBrushing twice a day with the right technique, flossing or using interdental brushes, and a check-up every six months are the foundation of healthy gums.",
        ),
      },
    ],
    takeaway: L(
      "Kanayan diş eti, fırçalamayı bırakmanızı değil; daha doğru fırçalamanızı ve bir kontrolü işaret eder.",
      "Bleeding gums aren’t a sign to stop brushing, but to brush better, and to book a check-up.",
    ),
  },
  {
    slug: "istanbulda-bir-haftada-dis-tedavisi",
    category: "travel",
    date: "2026-07-15",
    image: "/clinic/lounge.jpg",
    imageAlt: L("Aureum kliniğinin gün ışığı alan misafir salonu", "The daylit guest lounge at the Aureum clinic"),
    title: L(
      "İstanbul’da Bir Haftada Diş Tedavisi: Planlama Rehberi",
      "Dental Treatment in Istanbul in a Week: A Planning Guide",
    ),
    excerpt: L(
      "Uçuş, konaklama ve seanslar tek takvimde. Sağlık turizmi için gelmeden önce bilmeniz gerekenler.",
      "Flights, stay and appointments in a single calendar. What to know before you travel for treatment.",
    ),
    intro: L(
      "Her yıl binlerce kişi diş tedavisi için İstanbul’u tercih ediyor. Ancak sınırlı bir sürede başarılı bir tedavi, iyi bir planlamayla başlar. Hangi tedavinin kaç gün süreceği, kaç seyahat gerektireceği ve dönüşten sonra nasıl takip edileceği önceden net olmalıdır.\n\nBu rehberde, yurt dışından gelen misafirlerimizle birlikte kurduğumuz planlama sürecini adım adım paylaşıyoruz.",
      "Every year thousands of people choose Istanbul for dental treatment. But successful treatment in a limited time starts with good planning. How many days each treatment takes, how many trips it needs and how follow-up works after you go home should all be clear in advance.\n\nIn this guide we share, step by step, the planning process we build with our guests from abroad.",
    ),
    sections: [
      {
        heading: L("Yola çıkmadan önce: online ön değerlendirme", "Before you travel: an online assessment"),
        body: L(
          "Güncel bir panoramik röntgen ve birkaç net gülüş fotoğrafı, ön değerlendirme için çoğu zaman yeterlidir. Bu bilgilerle hekimimiz olası tedavi seçeneklerini, tahmini süreyi ve seyahat sayısını önceden paylaşır.\n\nKesin plan muayeneden sonra netleşir; ancak bu ön çalışma, uçuş tarihlerinizi gerçekçi bir takvime göre seçmenizi sağlar.",
          "A recent panoramic X-ray and a few clear photographs of your smile are usually enough for a preliminary assessment. With them, our clinician shares the likely options, an estimated length of stay and the number of trips.\n\nThe final plan is confirmed after the examination, but this groundwork lets you choose your flight dates against a realistic calendar.",
        ),
      },
      {
        heading: L("Hangi tedavi kaç gün sürer?", "How many days does each treatment take?"),
        body: L(
          "Beyazlatma ve diş taşı temizliği tek seansta tamamlanır. Lamina ve zirkonyum kaplamalar, laboratuvar süreciyle birlikte genellikle 5–7 iş günü gerektirir.\n\nİmplant tedavisi ise iki aşamalıdır: ilk seyahatte implant yerleştirilir, kemikle kaynaşma için birkaç ay beklenir ve ikinci seyahatte kalıcı dişler takılır. Bu yüzden implant planlarında genellikle iki ayrı ziyaret öngörülür.",
          "Whitening and a scale and polish are done in a single session. Veneers and zirconia crowns usually need 5–7 working days, including laboratory time.\n\nImplant treatment comes in two stages: the implant is placed on the first trip, the bone is given a few months to bond, and the final teeth are fitted on a second trip. Implant plans therefore usually include two separate visits.",
        ),
      },
      {
        heading: L("İstanbul’dayken: sakin bir program", "While in Istanbul: a calm schedule"),
        body: L(
          "Seanslar arasında dinlenme günleri bırakmak hem konforunuz hem de tedavinin kalitesi için önemlidir. Havalimanı transferi ve kliniğe yakın konaklama seçenekleri önceden ayarlanabilir.\n\nTedavi günlerinde yoğun turistik programlardan, alkolden ve çok sıcak ya da sert yiyeceklerden kaçınmak iyileşmeyi hızlandırır.",
          "Leaving rest days between sessions matters for both your comfort and the quality of the work. Airport transfers and accommodation near the clinic can be arranged in advance.\n\nOn treatment days, avoiding packed sightseeing, alcohol and very hot or hard food helps you heal faster.",
        ),
      },
      {
        heading: L("Dönüşten sonra: takip devam eder", "After you fly home: follow-up continues"),
        body: L(
          "Tedavi, uçağa bindiğiniz anda bitmez. Dönüş sonrası kontroller fotoğraf ve görüntülü görüşmelerle uzaktan sürdürülür; tüm kayıtlarınız dosyanızda saklanır.\n\nYıllık kontrolünüzü kendi ülkenizdeki bir diş hekimiyle de planlayabilirsiniz; ihtiyaç halinde tedavi raporunuzu sizinle paylaşırız.",
          "Treatment doesn’t end when you board the plane. Follow-up continues remotely through photographs and video calls, and all your records stay in your file.\n\nYou can also plan your annual check-up with a dentist in your own country; we share your treatment report whenever you need it.",
        ),
      },
    ],
    takeaway: L(
      "İyi bir sağlık turizmi deneyiminde sürprizler tatilde kalır, tedavide değil.",
      "In good health tourism, the surprises belong to the holiday, never to the treatment.",
    ),
  },
];

export const blogPosts: BlogPost[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function readingMinutes(post: BlogPost, locale: Locale) {
  const text = [post.intro, ...post.sections.flatMap((section) => [section.heading, section.body]), post.takeaway]
    .map((value) => value[locale])
    .join(" ");
  return Math.max(3, Math.ceil(text.split(/\s+/).length / 130));
}

export function formatPostDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function relatedPosts(post: BlogPost, count = 3) {
  const others = blogPosts.filter((item) => item.slug !== post.slug);
  const sameCategory = others.filter((item) => item.category === post.category);
  const rest = others.filter((item) => item.category !== post.category);
  return [...sameCategory, ...rest].slice(0, count);
}
