/* =====================================================================
   Widows Sons MRA — Chapter Hellas
   WSDocs — the register of the documents the Chapter issues.

   Each document is a function returning its specification; WSDoc draws
   it, so every one of them carries the same letterhead, the same seal
   and the same signatures.

   The founding documents are set in three languages — English first,
   then Greek and Bulgarian. Words proper to the brotherhood are left as
   they stand: Widows Sons, Chapter, MRA, patch, and the names of the
   offices where they are used as titles.
   ===================================================================== */
var WSDocs = (function(){

  var PLACE = 'Athens, Greece';
  var DATE  = '1 September 2026';

  /* How the Chapter executes its documents.
     FOUNDING — the founding documents are signed by the Founding
     President, already a Widows Son at the foundation.
     EXECUTED — every document of the Secretariat bears, at its foot, the
     seal in the centre, the Secretary on the left, the President on the
     right. */
  var FOUNDING = {
    title:'The Founding President', name:'Dimitrios Skiadopoulos', road:'Build Smith',
    role:'Ιδρυτικός Πρόεδρος & Οικιστής · Chapter Hellas'
  };
  var EXECUTED = {
    left:  { title:'The Secretary', name:'Nikolaos Markopoulos',
             role:'Γραμματέας · Chapter Hellas' },
    right: { title:'The President', name:'Dimitrios Skiadopoulos', road:'Build Smith',
             role:'Πρόεδρος · Chapter Hellas' }
  };

  /* --- cells in the house style --- */
  function office(en, el, bg){
    var under = [el, bg].filter(Boolean).join('\n');
    return { content:en, _gr:under, styles:{ font:'WSCinzel', fontStyle:'bold', fontSize:8.8 } };
  }
  /* A cell whose text is repeated beneath in another language. */
  function second(en, other, size){
    return { content:en, _gr:other, styles:{ fontSize: size || 8.8 } };
  }
  function person(n){
    return n ? { content:n, styles:{ fontStyle:'bold' } }
             : { content:'To be appointed', styles:{ fontStyle:'italic', textColor:[139,143,150] } };
  }
  function road(r){
    return r ? { content:String(r).toUpperCase(), styles:{ textColor:[158,27,31], fontSize:8.2 } }
             : { content:'to be advised', styles:{ fontStyle:'italic', textColor:[139,143,150] } };
  }
  function term(t){ return { content:t, styles:{ fontSize:7.9, textColor:[60,64,70] } }; }
  function blank(){ return { content:'……………………………………', styles:{ textColor:[139,143,150] } }; }

  function base(no, subject, sections, opts){
    opts = opts || {};
    return {
      subject: subject,
      ref: 'Ref. CH-FD-' + (no < 10 ? '0' + no : no) + '/2026',
      place: PLACE, date: DATE,
      lead: opts.lead || [],
      sections: sections,
      closing: opts.closing || [],
      signature: FOUNDING,
      seal: true
    };
  }

  /* =================================================================
     1 — The Official Emblem
     ================================================================= */
  function emblem(){
    return base(1, {en:'The Official Emblem', el:'Το Επίσημο Έμβλημα', bg:'Официалната емблема'}, [
      { title:{en:'I. The Emblem Adopted', el:'Το υιοθετούμενο έμβλημα', bg:'Приетата емблема'},
        image:'emblem', width:96, caption:'The official emblem of Widows Sons MRA — Chapter Hellas',
        paragraphs:[
          {en:'The emblem set out above is adopted as the one and only official emblem of Chapter Hellas, and is the emblem worn upon the colours of the Chapter and borne upon its documents.',
           el:'Το ανωτέρω έμβλημα υιοθετείται ως το ένα και μοναδικό επίσημο έμβλημα του Chapter Hellas· είναι το έμβλημα που φέρεται επί των χρωμάτων του Chapter και επί των εγγράφων του.',
           bg:'Емблемата, представена по-горе, се приема като единствената официална емблема на Chapter Hellas и се носи върху цветовете на Chapter-а и върху неговите документи.'}
        ] },
      { title:{en:'II. Composition', el:'Σύνθεση', bg:'Състав'},
        paragraphs:[
          {en:'The emblem is composed of three parts. The top rocker bears the words WIDOWS SONS MRA. The central oval bears the name Widows Sons in red script above the winged square and compasses, within which stands the all-seeing eye, and beneath them the motto: Meet on the Level & Part upon the Square. The bottom rocker bears the words CHAPTER HELLAS.',
           el:'Το έμβλημα συντίθεται από τρία μέρη. Το άνω τόξο φέρει τις λέξεις WIDOWS SONS MRA. Το κεντρικό οβάλ φέρει το όνομα Widows Sons με κόκκινη γραφή, άνωθεν του φτερωτού γνώμονα και διαβήτη, εντός των οποίων ίσταται ο πανεπόπτης οφθαλμός, και κάτωθεν αυτών το ρητό: Meet on the Level & Part upon the Square. Το κάτω τόξο φέρει τις λέξεις CHAPTER HELLAS.',
           bg:'Емблемата се състои от три части. Горната дъга носи думите WIDOWS SONS MRA. Централният овал носи името Widows Sons с червен шрифт над крилатия наугалник и пергел, в които стои всевиждащото око, а под тях девиза: Meet on the Level & Part upon the Square. Долната дъга носи думите CHAPTER HELLAS.'},
          {en:'No element of the emblem may be altered, omitted or added to, nor may its colours be changed.',
           el:'Ουδέν στοιχείο του εμβλήματος επιτρέπεται να μεταβληθεί, να παραλειφθεί ή να προστεθεί, ούτε να αλλοιωθούν τα χρώματά του.',
           bg:'Никой елемент от емблемата не може да бъде променян, пропускан или добавян, нито цветовете ѝ да бъдат изменяни.'}
        ] },
      { title:{en:'III. Ownership, Use and Custody', el:'Κυριότητα, χρήση και φύλαξη', bg:'Собственост, употреба и съхранение'},
        paragraphs:[
          {en:'The emblem, the name and the insignia of Widows Sons belong exclusively to Widows Sons MRA. The Chapter and its members hold them only for so long as they remain in good standing, and every patch is returned to the Chapter upon a brother’s departure.',
           el:'Το έμβλημα, το όνομα και τα διακριτικά των Widows Sons ανήκουν αποκλειστικά στη Widows Sons MRA. Το Chapter και τα μέλη του τα κατέχουν μόνο για όσο διατηρούν την καλή τους κατάσταση, και κάθε patch επιστρέφεται στο Chapter κατά την αποχώρηση του αδελφού.',
           bg:'Емблемата, името и отличителните знаци на Widows Sons принадлежат изключително на Widows Sons MRA. Chapter-ът и неговите членове ги държат само докато остават в добро състояние, и всеки patch се връща на Chapter-а при напускане на брата.'},
          {en:'The emblem is worn only by members in good standing and only upon the approved vest. It may not be reproduced, published or given to any third party save by leave of the President. The Quartermaster keeps the record of every patch issued and returned.',
           el:'Το έμβλημα φέρεται μόνον από μέλη σε καλή κατάσταση και μόνον επί του εγκεκριμένου γιλέκου. Δεν αναπαράγεται, δεν δημοσιεύεται και δεν παραχωρείται σε τρίτους παρά μόνο με άδεια του Προέδρου. Ο Επιμελητής τηρεί το αρχείο κάθε patch που χορηγείται και επιστρέφεται.',
           bg:'Емблемата се носи само от членове в добро състояние и само върху одобрената жилетка. Тя не може да бъде възпроизвеждана, публикувана или предоставяна на трети лица освен с разрешение на Президента. Quartermaster-ът води отчет за всеки издаден и върнат patch.'}
        ] }
    ], {
      lead:[{en:'By this founding act the Chapter establishes the emblem under which it rides and by which it is known, and declares the manner in which it shall be worn, kept and protected.',
             el:'Με την παρούσα ιδρυτική πράξη το Chapter καθιερώνει το έμβλημα υπό το οποίο ιππεύει και διά του οποίου αναγνωρίζεται, και ορίζει τον τρόπο με τον οποίο φέρεται, φυλάσσεται και προστατεύεται.',
             bg:'С този учредителен акт Chapter-ът установява емблемата, под която язди и по която е разпознаван, и определя начина, по който тя се носи, съхранява и закриля.'}],
      closing:[{en:'Adopted at the foundation of the Chapter and entered in its records.',
                el:'Υιοθετήθηκε κατά την ίδρυση του Chapter και καταχωρήθηκε στα αρχεία του.',
                bg:'Прието при учредяването на Chapter-а и вписано в неговите регистри.'}]
    });
  }

  /* =================================================================
     2 — The Official Seal
     ================================================================= */
  function seal(){
    return base(2, {en:'The Official Seal', el:'Η Επίσημη Σφραγίδα', bg:'Официалният печат'}, [
      { title:{en:'I. The Seal Adopted', el:'Η υιοθετούμενη σφραγίδα', bg:'Приетият печат'},
        image:'seal', width:62, caption:'The official seal of Chapter Hellas',
        paragraphs:[
          {en:'The seal set out above is adopted as the official seal of Chapter Hellas. It is the only seal by which the Chapter authenticates its acts.',
           el:'Η ανωτέρω σφραγίδα υιοθετείται ως η επίσημη σφραγίδα του Chapter Hellas. Είναι η μόνη σφραγίδα διά της οποίας το Chapter πιστοποιεί τις πράξεις του.',
           bg:'Печатът, представен по-горе, се приема като официален печат на Chapter Hellas. Той е единственият печат, с който Chapter-ът удостоверява своите актове.'}
        ] },
      { title:{en:'II. Composition', el:'Σύνθεση', bg:'Състав'},
        paragraphs:[
          {en:'The seal is circular. About its upper edge stand the words WIDOWS SONS and about its lower edge the words MASONIC RIDERS ASSOCIATION. Across its face stand the words CHAPTER HELLAS. At its centre is set a Corinthian helmet, flanked by two wheels, and above the helmet the year of foundation, EST. 2026.',
           el:'Η σφραγίδα είναι κυκλική. Περί την άνω περιφέρειά της φέρονται οι λέξεις WIDOWS SONS και περί την κάτω οι λέξεις MASONIC RIDERS ASSOCIATION. Επί της όψεώς της φέρονται οι λέξεις CHAPTER HELLAS. Στο κέντρο τίθεται κορινθιακό κράνος, εκατέρωθεν του οποίου δύο τροχοί, και άνωθεν του κράνους το έτος ιδρύσεως, EST. 2026.',
           bg:'Печатът е кръгъл. По горния му ръб стоят думите WIDOWS SONS, а по долния — MASONIC RIDERS ASSOCIATION. Върху лицето му стоят думите CHAPTER HELLAS. В центъра е поставен коринтски шлем, ограден от две колела, а над шлема — годината на учредяване, EST. 2026.'}
        ] },
      { title:{en:'III. Custody and Manner of Use', el:'Φύλαξη και τρόπος χρήσης', bg:'Съхранение и начин на употреба'},
        paragraphs:[
          {en:'The Secretary is custodian of the seal and answers for it to the Chapter. It is kept in the custody of no other officer, and is never given out of his hands.',
           el:'Ο Γραμματέας είναι ο θεματοφύλακας της σφραγίδας και λογοδοτεί γι’ αυτήν στο Chapter. Δεν φυλάσσεται από άλλον αξιωματικό και ουδέποτε παραδίδεται εκτός των χειρών του.',
           bg:'Секретарят е пазител на печата и отговаря за него пред Chapter-а. Печатът не се съхранява от друго длъжностно лице и никога не се предава извън неговите ръце.'},
          {en:'The seal is affixed at the centre of the foot of every official document of the Chapter. Upon the founding documents it stands above the signature of the Founding President. Upon every document issued thereafter it stands between the signature of the Secretary on the left and the signature of the President on the right.',
           el:'Η σφραγίδα τίθεται στο κέντρο του τέλους κάθε επίσημου εγγράφου του Chapter. Επί των ιδρυτικών εγγράφων ίσταται μετά της υπογραφής του Ιδρυτικού Προέδρου. Επί κάθε εγγράφου που εκδίδεται εφεξής ίσταται μεταξύ της υπογραφής του Γραμματέως αριστερά και της υπογραφής του Προέδρου δεξιά.',
           bg:'Печатът се поставя в центъра на края на всеки официален документ на Chapter-а. Върху учредителните документи той стои заедно с подписа на Учредителния президент. Върху всеки документ, издаден след това, той стои между подписа на Секретаря вляво и подписа на Президента вдясно.'}
        ] }
    ], {
      lead:[{en:'By this founding act the Chapter establishes the seal by which its documents are authenticated, and appoints its custodian and the manner of its use.',
             el:'Με την παρούσα ιδρυτική πράξη το Chapter καθιερώνει τη σφραγίδα διά της οποίας πιστοποιούνται τα έγγραφά του και ορίζει τον θεματοφύλακα και τον τρόπο χρήσεώς της.',
             bg:'С този учредителен акт Chapter-ът установява печата, с който се удостоверяват неговите документи, и определя неговия пазител и начина на употребата му.'}],
      closing:[{en:'Adopted at the foundation of the Chapter and entered in its records.',
                el:'Υιοθετήθηκε κατά την ίδρυση του Chapter και καταχωρήθηκε στα αρχεία του.',
                bg:'Прието при учредяването на Chapter-а и вписано в неговите регистри.'}]
    });
  }

  /* =================================================================
     3 — Charter
     ================================================================= */
  function charter(){
    return base(3, {en:'Charter', el:'Καταστατικός Χάρτης', bg:'Учредителна харта'}, [
      { title:{en:'Article I — Name and Seat', el:'Άρθρο Α΄ — Επωνυμία και έδρα', bg:'Член I — Наименование и седалище'},
        paragraphs:[
          {en:'The Chapter is named Widows Sons Masonic Riders Association — Chapter Hellas. Its seat is at Athens, Greece, and its field is the whole of the Hellenic territory.',
           el:'Το Chapter φέρει την επωνυμία Widows Sons Masonic Riders Association — Chapter Hellas. Έδρα του είναι η Αθήνα, Ελλάδα, και πεδίο δράσεώς του το σύνολο της Ελληνικής επικράτειας.',
           bg:'Chapter-ът носи наименованието Widows Sons Masonic Riders Association — Chapter Hellas. Седалището му е в Атина, Гърция, а полето му на действие е цялата гръцка територия.'}
        ] },
      { title:{en:'Article II — Nature and Purpose', el:'Άρθρο Β΄ — Φύση και σκοπός', bg:'Член II — Същност и цел'},
        paragraphs:[
          {en:'The Chapter is a brotherhood of Master Masons who ride. It is not a Lodge and holds no masonic labour; it meets upon the level as brethren and rides as a club.',
           el:'Το Chapter είναι αδελφότητα Διδασκάλων Τεκτόνων που ιππεύουν. Δεν είναι Στοά και δεν τελεί τεκτονική εργασία· συνέρχεται επί του αλφαδίου ως αδελφοί και ιππεύει ως club.',
           bg:'Chapter-ът е братство на Майстори Масони, които яздят. Той не е Ложа и не извършва масонска работа; събира се на нивелир като братя и язди като клуб.'},
          {en:'Its purposes are the relief of the widow and the orphan, the support of brethren in need, the practice of charity, and the fellowship of the road under the discipline of the Craft.',
           el:'Σκοποί του είναι η αρωγή της χήρας και του ορφανού, η υποστήριξη αδελφών εν ανάγκη, η άσκηση της αγαθοεργίας και η συντροφικότητα του δρόμου υπό την πειθαρχία της Τεκτονικής.',
           bg:'Неговите цели са подпомагане на вдовицата и сирака, подкрепа на братята в нужда, упражняване на благотворителност и другарство на пътя под дисциплината на Занаята.'}
        ] },
      { title:{en:'Article III — Membership', el:'Άρθρο Γ΄ — Μέλη', bg:'Член III — Членство'},
        paragraphs:[
          {en:'Membership is open to Master Masons in good standing of a regular Lodge, who own and ride a motorcycle, and who are received according to the Internal Regulations.',
           el:'Μέλος δύναται να γίνει Διδάσκαλος Τέκτων εν καλή καταστάσει κανονικής Στοάς, ο οποίος κατέχει και οδηγεί μοτοσικλέτα και γίνεται δεκτός κατά τον Εσωτερικό Κανονισμό.',
           bg:'Членството е открито за Майстори Масони в добро състояние от редовна Ложа, които притежават и управляват мотоциклет и са приети съгласно Вътрешния правилник.'},
          {en:'Every candidate passes through the trial appointed by the Chapter and is presented by the Preparing Brother before he is received.',
           el:'Κάθε υποψήφιος διέρχεται τη δοκιμασία που ορίζει το Chapter και παρουσιάζεται από τον Δοκιμαστή πριν γίνει δεκτός.',
           bg:'Всеки кандидат преминава изпитанието, определено от Chapter-а, и се представя от Preparing Brother, преди да бъде приет.'}
        ] },
      { title:{en:'Article IV — Government', el:'Άρθρο Δ΄ — Διοίκηση', bg:'Член IV — Управление'},
        paragraphs:[
          {en:'The Chapter is administered by fifteen officers, the first six of whom are the Principal Officers. The President, the Treasurer and the Road Captain serve five-year terms; the remaining offices are filled by appointment of the President.',
           el:'Το Chapter διοικείται από δεκαπέντε αξιωματικούς, εκ των οποίων οι πρώτοι έξι είναι οι Κύριοι Αξιωματικοί. Ο Πρόεδρος, ο Ταμίας και ο Αρχηγός Αποστολής υπηρετούν πενταετή θητεία· τα λοιπά αξιώματα πληρούνται με διορισμό του Προέδρου.',
           bg:'Chapter-ът се управлява от петнадесет длъжностни лица, първите шест от които са Главните длъжностни лица. Президентът, Ковчежникът и Road Captain служат петгодишен мандат; останалите длъжности се заемат по назначение от Президента.'}
        ] },
      { title:{en:'Article V — Insignia and Documents', el:'Άρθρο Ε΄ — Διακριτικά και έγγραφα', bg:'Член V — Отличителни знаци и документи'},
        paragraphs:[
          {en:'The emblem and the seal of the Chapter are those established by the founding documents. Every official document bears the seal at the centre of its foot, the signature of the Secretary on the left and that of the President on the right; the founding documents are signed by the Founding President.',
           el:'Το έμβλημα και η σφραγίδα του Chapter είναι τα καθιερωθέντα διά των ιδρυτικών εγγράφων. Κάθε επίσημο έγγραφο φέρει τη σφραγίδα στο κέντρο του τέλους του, την υπογραφή του Γραμματέως αριστερά και του Προέδρου δεξιά· τα ιδρυτικά έγγραφα υπογράφονται από τον Ιδρυτικό Πρόεδρο.',
           bg:'Емблемата и печатът на Chapter-а са установените с учредителните документи. Всеки официален документ носи печата в центъра на края си, подписа на Секретаря вляво и на Президента вдясно; учредителните документи се подписват от Учредителния президент.'}
        ] },
      { title:{en:'Article VI — Duration and Amendment', el:'Άρθρο ΣΤ΄ — Διάρκεια και τροποποίηση', bg:'Член VI — Срок и изменение'},
        paragraphs:[
          {en:'The Chapter is founded for an unlimited duration. This Charter may be amended only in general assembly, upon the proposal of the President, and no amendment may touch the rights of Widows Sons MRA in its name, emblem and insignia.',
           el:'Το Chapter ιδρύεται για αόριστη διάρκεια. Ο παρών Καταστατικός Χάρτης τροποποιείται μόνον εν γενική συνελεύσει, κατόπιν προτάσεως του Προέδρου, και ουδεμία τροποποίηση δύναται να θίξει τα δικαιώματα της Widows Sons MRA επί του ονόματος, του εμβλήματος και των διακριτικών της.',
           bg:'Chapter-ът се учредява за неограничен срок. Тази Харта може да бъде изменяна само на общо събрание, по предложение на Президента, и никое изменение не може да засегне правата на Widows Sons MRA върху нейното име, емблема и отличителни знаци.'}
        ] }
    ], {
      lead:[{en:'This Charter is the founding instrument of Chapter Hellas. It declares the name, the nature, the purposes, the membership and the government of the Chapter, and stands above every other rule it may adopt.',
             el:'Ο παρών Καταστατικός Χάρτης είναι το ιδρυτικό κείμενο του Chapter Hellas. Δηλώνει την επωνυμία, τη φύση, τους σκοπούς, τα μέλη και τη διοίκηση του Chapter και υπέρκειται κάθε άλλου κανόνα που ήθελε υιοθετήσει.',
             bg:'Тази Харта е учредителният акт на Chapter Hellas. Тя обявява наименованието, същността, целите, членството и управлението на Chapter-а и стои над всяко друго правило, което той приеме.'}],
      closing:[{en:'Granted and adopted at the foundation of the Chapter, at Athens, and entered in its records.',
                el:'Χορηγήθηκε και υιοθετήθηκε κατά την ίδρυση του Chapter, εν Αθήναις, και καταχωρήθηκε στα αρχεία του.',
                bg:'Дадена и приета при учредяването на Chapter-а, в Атина, и вписана в неговите регистри.'}]
    });
  }

  /* =================================================================
     4 — Internal Regulations
     ================================================================= */
  function regulations(){
    return base(4, {en:'Internal Regulations', el:'Εσωτερικός Κανονισμός', bg:'Вътрешен правилник'}, [
      { title:{en:'I. Assemblies', el:'Συνελεύσεις', bg:'Събрания'},
        paragraphs:[
          {en:'The Chapter meets in ordinary assembly once each month and in extraordinary assembly whenever the President calls it. The Secretary gives notice, keeps the minutes and enters them in the archive.',
           el:'Το Chapter συνέρχεται σε τακτική συνέλευση άπαξ του μηνός και σε έκτακτη οσάκις την συγκαλεί ο Πρόεδρος. Ο Γραμματέας ειδοποιεί, τηρεί τα πρακτικά και τα καταχωρεί στο αρχείο.',
           bg:'Chapter-ът се събира на редовно събрание веднъж месечно и на извънредно събрание, когато Президентът го свика. Секретарят уведомява, води протоколите и ги вписва в архива.'},
          {en:'The Guard keeps the door and admits none but those entitled to enter. Matters are decided by the voice of the brethren present, and the President holds the casting voice.',
           el:'Ο Φύλακας τηρεί τη θύρα και δεν δέχεται παρά μόνον τους δικαιουμένους να εισέλθουν. Τα θέματα κρίνονται διά της φωνής των παρόντων αδελφών, ο δε Πρόεδρος έχει την αποφασιστική ψήφο.',
           bg:'Пазачът пази вратата и допуска само тези, които имат право да влязат. Въпросите се решават с гласа на присъстващите братя, а Президентът има решаващия глас.'}
        ] },
      { title:{en:'II. Conduct and Discipline', el:'Συμπεριφορά και πειθαρχία', bg:'Поведение и дисциплина'},
        paragraphs:[
          {en:'Every brother conducts himself so as to honour the Craft, the Chapter and the colours he wears. The Sergeant-at-Arms answers for order, addresses breaches, and reports to the President what he cannot settle.',
           el:'Έκαστος αδελφός φέρεται κατά τρόπον που τιμά την Τεκτονική, το Chapter και τα χρώματα που φέρει. Ο Υπεύθυνος Τάξης ευθύνεται για την τάξη, αντιμετωπίζει τις παραβάσεις και αναφέρει στον Πρόεδρο ό,τι δεν δύναται να διευθετήσει.',
           bg:'Всеки брат се държи така, че да прави чест на Занаята, на Chapter-а и на цветовете, които носи. Sergeant-at-Arms отговаря за реда, разглежда нарушенията и докладва на Президента онова, което не може да уреди.'},
          {en:'A brother who brings the Chapter into disrepute may be admonished, suspended or expelled by decision of the assembly upon the report of the President, and returns his patches upon expulsion.',
           el:'Αδελφός που εκθέτει το Chapter δύναται να επιπληχθεί, να τεθεί σε αναστολή ή να διαγραφεί με απόφαση της συνελεύσεως κατόπιν αναφοράς του Προέδρου, και επιστρέφει τα patches του κατά τη διαγραφή.',
           bg:'Брат, който уронва доброто име на Chapter-а, може да бъде смъмрен, временно отстранен или изключен с решение на събранието по доклад на Президента, и връща своите patches при изключване.'}
        ] },
      { title:{en:'III. The Road', el:'Ο δρόμος', bg:'Пътят'},
        paragraphs:[
          {en:'Upon every organised ride the Road Captain commands. He appoints the route and the formation, and the Road Sergeant keeps the column. No brother leaves the formation without the leave of the Road Captain.',
           el:'Σε κάθε οργανωμένη διαδρομή διοικεί ο Αρχηγός Αποστολής. Ορίζει τη διαδρομή και τον σχηματισμό, ο δε Ομαδάρχης διατηρεί τη στήλη. Ουδείς αδελφός εγκαταλείπει τον σχηματισμό άνευ αδείας του Αρχηγού Αποστολής.',
           bg:'При всяко организирано пътуване командва Road Captain. Той определя маршрута и строя, а Road Sergeant поддържа колоната. Нито един брат не напуска строя без разрешение на Road Captain.'},
          {en:'The law of the road is kept before all else. No brother rides who is unfit to ride, and the Chapter suffers no man to ride under drink.',
           el:'Ο νόμος του δρόμου τηρείται προ παντός άλλου. Ουδείς αδελφός ιππεύει εφόσον δεν είναι ικανός, και το Chapter δεν ανέχεται ουδένα να ιππεύει υπό την επήρεια οινοπνεύματος.',
           bg:'Законът на пътя се спазва преди всичко друго. Нито един брат не язди, ако не е годен, и Chapter-ът не търпи никой да язди под въздействие на алкохол.'}
        ] },
      { title:{en:'IV. Dues and Finances', el:'Συνδρομές και οικονομικά', bg:'Вноски и финанси'},
        paragraphs:[
          {en:'The dues are fixed in general assembly. The Treasurer receives all monies, keeps the books and reports the position of the Chapter at each ordinary assembly. No payment is made but upon the order of the President.',
           el:'Οι συνδρομές ορίζονται εν γενική συνελεύσει. Ο Ταμίας εισπράττει πάντα τα χρήματα, τηρεί τα βιβλία και αναφέρει την κατάσταση του Chapter σε κάθε τακτική συνέλευση. Ουδεμία πληρωμή γίνεται παρά μόνον κατ’ εντολήν του Προέδρου.',
           bg:'Вноските се определят на общо събрание. Ковчежникът получава всички средства, води книгите и докладва състоянието на Chapter-а на всяко редовно събрание. Никое плащане не се извършва освен по нареждане на Президента.'}
        ] },
      { title:{en:'V. The Vest and the Insignia', el:'Το γιλέκο και τα διακριτικά', bg:'Жилетката и отличителните знаци'},
        paragraphs:[
          {en:'The colours are worn upon the approved black leather vest and in the appointed places. The Warden oversees their proper wearing and the Quartermaster their issue, record and return.',
           el:'Τα χρώματα φέρονται επί του εγκεκριμένου μαύρου δερμάτινου γιλέκου και στις οριζόμενες θέσεις. Ο Έφορος Μελών επιβλέπει την ορθή τους χρήση και ο Επιμελητής τη χορήγηση, καταγραφή και επιστροφή τους.',
           bg:'Цветовете се носят върху одобрената черна кожена жилетка и на определените места. Warden-ът следи за правилното им носене, а Quartermaster-ът — за издаването, отчитането и връщането им.'}
        ] },
      { title:{en:'VI. Admission', el:'Εισδοχή', bg:'Приемане'},
        paragraphs:[
          {en:'A candidate is proposed by a member, examined as to his masonic standing and his riding, prepared by the Preparing Brother, and received by vote of the assembly. He rides as a prospect for such time as the Chapter appoints before he is given his colours.',
           el:'Ο υποψήφιος προτείνεται από μέλος, εξετάζεται ως προς την τεκτονική του ιδιότητα και την οδήγησή του, προετοιμάζεται από τον Δοκιμαστή και γίνεται δεκτός με ψήφο της συνελεύσεως. Ιππεύει ως prospect για όσο χρόνο ορίζει το Chapter πριν λάβει τα χρώματά του.',
           bg:'Кандидатът се предлага от член, изпитва се относно масонското си състояние и ездата си, подготвя се от Preparing Brother и се приема с гласуване на събранието. Той язди като prospect за времето, определено от Chapter-а, преди да получи своите цветове.'}
        ] }
    ], {
      lead:[{en:'These Regulations govern the Chapter day by day. They are made under the Charter, and where they and the Charter differ, the Charter prevails.',
             el:'Ο παρών Κανονισμός διέπει το Chapter καθ’ ημέραν. Θεσπίζεται δυνάμει του Καταστατικού Χάρτη, και όπου διαφέρουν, υπερισχύει ο Χάρτης.',
             bg:'Този правилник урежда ежедневието на Chapter-а. Той се издава въз основа на Хартата, и когато двата се различават, Хартата има предимство.'}],
      closing:[{en:'Adopted at the foundation of the Chapter and entered in its records. Every member is held to know them.',
                el:'Υιοθετήθηκε κατά την ίδρυση του Chapter και καταχωρήθηκε στα αρχεία του. Έκαστο μέλος τεκμαίρεται ότι τον γνωρίζει.',
                bg:'Приет при учредяването на Chapter-а и вписан в неговите регистри. Всеки член се смята за запознат с него.'}]
    });
  }

  /* =================================================================
     5 — Application for Foundation
     ================================================================= */
  function application(){
    return base(5, {en:'Application for Foundation', el:'Αίτηση Ιδρύσεως', bg:'Молба за учредяване'}, [
      { title:{en:'I. The Petition', el:'Η αίτηση', bg:'Молбата'},
        paragraphs:[
          {en:'The undersigned brethren, Master Masons in good standing of regular Lodges and riders of motorcycles, respectfully pray Widows Sons MRA to grant them a charter for the establishment of a Chapter in Greece, to be named Chapter Hellas, with its seat at Athens.',
           el:'Οι υπογράφοντες αδελφοί, Διδάσκαλοι Τέκτονες εν καλή καταστάσει κανονικών Στοών και αναβάτες μοτοσικλέτας, παρακαλούν ευσεβάστως τη Widows Sons MRA όπως τους χορηγήσει χάρτη προς ίδρυση Chapter εν Ελλάδι, υπό την επωνυμία Chapter Hellas, με έδρα την Αθήνα.',
           bg:'Долуподписаните братя, Майстори Масони в добро състояние от редовни Ложи и мотоциклетисти, почтително молят Widows Sons MRA да им предостави харта за учредяване на Chapter в Гърция, с наименование Chapter Hellas и седалище в Атина.'}
        ] },
      { title:{en:'II. The Founding Brethren', el:'Οι ιδρυτές αδελφοί', bg:'Учредителите братя'},
        table:{ head:['Brother','Road Name','Lodge','Signature'], widths:[30,20,26,24],
                rows:[ [person('Dimitrios Skiadopoulos'), road('Build Smith'), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()] ],
                note:'The roll of founding brethren is completed and signed at the assembly of foundation.' } },
      { title:{en:'III. Undertakings', el:'Δεσμεύσεις', bg:'Задължения'},
        paragraphs:[
          {en:'The petitioners undertake to observe the constitution, the rules and the customs of Widows Sons MRA; to hold its name, emblem and insignia as its property and to return them upon demand; to keep the Chapter in charity, in good order and in good repute; and to render such account of themselves as the Association may require.',
           el:'Οι αιτούντες αναλαμβάνουν να τηρούν το καταστατικό, τους κανόνες και τα έθιμα της Widows Sons MRA· να κατέχουν το όνομα, το έμβλημα και τα διακριτικά της ως περιουσία της και να τα επιστρέψουν εφόσον ζητηθούν· να διατηρούν το Chapter εν αγαθοεργία, ευταξία και καλή υπολήψει· και να λογοδοτούν όπως η Ένωση ήθελε απαιτήσει.',
           bg:'Молителите се задължават да спазват устава, правилата и обичаите на Widows Sons MRA; да държат нейното име, емблема и отличителни знаци като нейна собственост и да ги върнат при поискване; да поддържат Chapter-а в благотворителност, добър ред и добро име; и да дават отчет, какъвто Асоциацията би поискала.'}
        ] },
      { title:{en:'IV. Prayer', el:'Παράκληση', bg:'Молба'},
        paragraphs:[
          {en:'Wherefore the petitioners pray that this application be received, that the charter be granted, and that Chapter Hellas be numbered among the Chapters of Widows Sons MRA.',
           el:'Όθεν οι αιτούντες παρακαλούν όπως γίνει δεκτή η παρούσα αίτηση, χορηγηθεί ο χάρτης και το Chapter Hellas συναριθμηθεί μεταξύ των Chapters της Widows Sons MRA.',
           bg:'Поради това молителите се молят настоящата молба да бъде приета, хартата да бъде предоставена и Chapter Hellas да бъде причислен към Chapter-ите на Widows Sons MRA.'}
        ] }
    ], {
      lead:[{en:'This application is addressed to Widows Sons Masonic Riders Association for the foundation of a Chapter in Greece.',
             el:'Η παρούσα αίτηση απευθύνεται προς τη Widows Sons Masonic Riders Association για την ίδρυση Chapter εν Ελλάδι.',
             bg:'Настоящата молба е отправена до Widows Sons Masonic Riders Association за учредяване на Chapter в Гърция.'}],
      closing:[{en:'Submitted in the name of the founding brethren.',
                el:'Υποβάλλεται εξ ονόματος των ιδρυτών αδελφών.',
                bg:'Подадена от името на учредителите братя.'}]
    });
  }

  /* =================================================================
     6 — Appointment of Officers
     ================================================================= */
  /* The fifteen offices, as Section 02 carries them. Each office is given
     in English, Greek and Bulgarian, and so are its duties, the manner in
     which it is filled and its term, so that the document may be read
     throughout by the Bulgarian brethren as well. */
  var OFFICERS = [
    { en:'President', el:'Πρόεδρος', bg:'Президент',
      name:'Dimitrios Skiadopoulos', road:'BuildSmith',
      rank:{en:'Principal Officer', bg:'Главно длъжностно лице'},
      term:{en:'Five years · Elected', bg:'Пет години · Избиран'},
      duties:{en:'Leads the Chapter as a whole and holds the highest responsibility for its operation and its direction. Presides over the assemblies, organises and directs the activities, represents the Chapter officially, and ensures the faithful application of the Charter, the Internal Regulations and the decisions of the Chapter.',
              bg:'Ръководи Chapter-а като цяло и носи най-високата отговорност за неговата дейност и посока. Председателства събранията, организира и насочва дейностите, представлява Chapter-а официално и следи за вярното прилагане на Хартата, Вътрешния правилник и решенията на Chapter-а.'} },
    { en:'Vice President', el:'Αντιπρόεδρος', bg:'Вицепрезидент',
      name:'Dimitrios Panagakos', road:'Developer',
      rank:{en:'Principal Officer', bg:'Главно длъжностно лице'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Second in the hierarchy and the immediate associate of the President. Supports the President in the exercise of his duties and stands fully in his place in any absence or impediment. Accompanies the President at official events and assists in coordinating the administration of the Chapter.',
              bg:'Втори по йерархия и пряк сътрудник на Президента. Подпомага Президента в изпълнението на неговите задължения и го замества напълно при всяко отсъствие или възпрепятстване. Придружава Президента на официалните събития и подпомага координацията на управлението на Chapter-а.'} },
    { en:'Secretary', el:'Γραμματέας', bg:'Секретар',
      name:'Nikolaos Markopoulos', road:'',
      rank:{en:'Principal Officer', bg:'Главно длъжностно лице'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Responsible for the administrative operation of the Chapter. Keeps the minutes, the roll of members, the administrative archive, the official correspondence and the prescribed reports. Custodian of the seal: every official document of the Chapter bears, at its foot, the seal in the centre, the signature of the Secretary on the left and the signature of the President on the right. The founding documents are signed by the Founding President. The Secretary alone signs the membership cards of the Chapter.',
              bg:'Отговаря за административната дейност на Chapter-а. Води протоколите, регистъра на членовете, административния архив, официалната кореспонденция и предвидените доклади. Пазител на печата: всеки официален документ на Chapter-а носи в края си печата в центъра, подписа на Секретаря вляво и подписа на Президента вдясно. Учредителните документи се подписват от Учредителния президент. Само Секретарят подписва членските карти на Chapter-а.'} },
    { en:'Treasurer', el:'Ταμίας', bg:'Ковчежник',
      name:'Panagiotis Vlahos', road:'',
      rank:{en:'Principal Officer', bg:'Главно длъжностно лице'},
      term:{en:'Five years · Elected', bg:'Пет години · Избиран'},
      duties:{en:'Holds responsibility for the financial management of the Chapter. Administers the bank accounts, the subscriptions, the receipts and the payments, keeps the financial books and the supporting records, and presents the prescribed financial statements and reports to the administration.',
              bg:'Носи отговорност за финансовото управление на Chapter-а. Управлява банковите сметки, вноските, постъпленията и плащанията, води финансовите книги и разходооправдателните документи и представя предвидените финансови отчети и доклади пред управлението.'} },
    { en:'Sergeant-at-Arms', el:'Υπεύθυνος Τάξης', bg:'Отговорник по реда',
      name:'Marinos Andreas', road:'',
      rank:{en:'Principal Officer', bg:'Главно длъжностно лице'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Responsible for internal order, for discipline and for the observance of the Regulations and the decisions of the Chapter. Oversees the proper conduct of the members, addresses breaches or questions of discipline and, where required, reports and escalates them to the President.',
              bg:'Отговаря за вътрешния ред, дисциплината и спазването на правилниците и решенията на Chapter-а. Следи за доброто поведение на членовете, разглежда нарушенията или въпросите на дисциплината и когато е необходимо, ги докладва и отнася до Президента.'} },
    { en:'Road Captain', el:'Αρχηγός Αποστολής', bg:'Ръководител на пътуването',
      name:'Panagiotis Floris', road:'',
      rank:{en:'Principal Officer', bg:'Главно длъжностно лице'},
      term:{en:'Five years · Elected', bg:'Пет години · Избиран'},
      duties:{en:'Holds the principal responsibility for every organised ride and mission. Plans the route, the stopping points and the progress of the column, organises and controls the formation, and answers for the discipline, the safety and the orderly movement of the group on the road.',
              bg:'Носи основната отговорност за всяко организирано пътуване и мисия. Планира маршрута, местата за спиране и хода на колоната, организира и контролира строя и отговаря за дисциплината, безопасността и правилното движение на групата по пътя.'} },
    { en:'Road Sergeant', el:'Ομαδάρχης', bg:'Групов ръководител',
      name:'', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Directly supports the Road Captain on organised rides and missions. Oversees the section, group or formation assigned to him, maintains communication with the Road Captain, and attends to spacing, discipline, cohesion and the safety of the riders on the road.',
              bg:'Подпомага пряко Road Captain при организираните пътувания и мисии. Наблюдава поверения му участък, група или строй, поддържа връзка с Road Captain и следи за дистанциите, дисциплината, сплотеността и безопасността на ездачите по пътя.'} },
    { en:'Warden', el:'Έφορος Μελών & Συμμόρφωσης', bg:'Отговорник по членството и съответствието',
      name:'George Dryllis', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Follows the matters concerning the members, their standing and their compliance with the Charter, the Internal Regulations and the decisions of the Chapter. Oversees the proper wearing of the vest, the emblems and the insignia, and contributes to the protection of the property and the identity of the Chapter.',
              bg:'Следи въпросите, отнасящи се до членовете, тяхното състояние и съответствието им с Хартата, Вътрешния правилник и решенията на Chapter-а. Наблюдава правилното носене на жилетката, емблемите и отличителните знаци и допринася за опазването на имуществото и идентичността на Chapter-а.'} },
    { en:'Orator', el:'Σύμβουλος', bg:'Съветник',
      name:'Andreas Tsounakos', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Serves as counsellor to the President and to the Chapter. Assists in the forming of positions and official presentations, in communication, at events and in public representation, seeing that the word and the presence of the Chapter answer to its principles and to its standing.',
              bg:'Служи като съветник на Президента и на Chapter-а. Подпомага изготвянето на позиции и официални изказвания, комуникацията, събитията и публичното представяне, като следи словото и присъствието на Chapter-а да отговарят на неговите принципи и достойнство.'} },
    { en:'Ambassador', el:'Εκπρόσωπος προς άλλα Motorcycle Clubs', bg:'Представител пред други Motorcycle Clubs',
      name:'Pantelis Lathiotakis', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Represents the Chapter in its relations with other Motorcycle Clubs, Widows Sons Chapters and kindred organisations. Develops and maintains communication, cooperation and fraternal ties, and informs the administration of contacts, invitations and matters of external relations.',
              bg:'Представлява Chapter-а в отношенията му с други Motorcycle Clubs, Widows Sons Chapters и сродни организации. Развива и поддържа комуникация, сътрудничество и братски връзки и уведомява управлението за контакти, покани и въпроси на външните отношения.'} },
    { en:'Almoner', el:'Ελεονόμος Αγαθοεργίας', bg:'Отговорник по благотворителността',
      name:'Pavlos Sarof', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Responsible for the charitable work, the social care and the benevolent action of the Chapter. Follows the cases of brethren, families or other persons in need of help, proposes the means of support, and coordinates the charitable and benevolent works of the Chapter.',
              bg:'Отговаря за благотворителната дейност, социалната грижа и милосърдието на Chapter-а. Следи случаите на братя, семейства или други лица, нуждаещи се от помощ, предлага начини за подкрепа и координира благотворителните действия на Chapter-а.'} },
    { en:'Quartermaster', el:'Επιμελητής', bg:'Домакин',
      name:'', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Administers the property, the equipment and the stores of the Chapter. Holds responsibility for the emblems, the patches, the insignia and every object belonging to or used by the Chapter, and attends to their recording, safe keeping, issue, delivery and return.',
              bg:'Управлява имуществото, оборудването и материалите на Chapter-а. Носи отговорност за емблемите, patches, отличителните знаци и всеки предмет, принадлежащ на или използван от Chapter-а, и се грижи за тяхното отчитане, съхранение, издаване, предаване и връщане.'} },
    { en:'Master of Ceremonies', el:'Τελετάρχης', bg:'Церемониалмайстор',
      name:'Alexandros Epifanis', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Responsible for the ceremonial, the protocol and the formal order of the ceremonies and events of the Chapter. Prepares the flow of the programme, guides the participants through the prescribed procedures, and coordinates the smooth and dignified conduct of every official ceremony.',
              bg:'Отговаря за церемониала, протокола и официалния ред на тържествата и събитията на Chapter-а. Подготвя хода на програмата, напътства участниците в предвидените процедури и координира гладкото и достойно провеждане на всяка официална церемония.'} },
    { en:'Preparing Brother', el:'Δοκιμαστής', bg:'Изпитващ брат',
      name:'Konstantinos Karmalis', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'A fundamental office for the admission and the initiation of a new member. Comes to know and prepares the candidate, guides him before his admission, organises and oversees the trial he must pass before he is judged fit to become a Widows Son, and reports to the President and the administration for the completion of his admission.',
              bg:'Основна длъжност за приемането и посвещаването на нов член. Опознава и подготвя кандидата, напътства го преди приемането, организира и наблюдава изпитанието, което трябва да премине, преди да бъде признат за годен да стане Widows Son, и докладва на Президента и управлението за завършването на приемането му.'} },
    { en:'Event Manager', el:'Υπεύθυνος Εκδηλώσεων', bg:'Отговорник по събитията',
      name:'', road:'',
      rank:{en:'Chapter Officer', bg:'Длъжностно лице на Chapter-а'},
      term:{en:'By appointment', bg:'По назначение'},
      duties:{en:'Responsible for the practical preparation, organisation and support of the events of the Chapter. Coordinates the requirements of place, time, hospitality and operation, and assists in whatever is required before, during and after an event for its smooth conduct.',
              bg:'Отговаря за практическата подготовка, организация и осигуряване на събитията на Chapter-а. Координира нуждите от място, време, гостоприемство и провеждане и подпомага всичко необходимо преди, по време и след събитието за неговото гладко протичане.'} }
  ];

  function officers(){
    return base(6, {en:'Appointment of Officers', el:'Διορισμός Αξιωματικών', bg:'Назначаване на длъжностните лица'}, [
      { title:{en:'I. Offices, Duties and Terms', el:'Αξιώματα, καθήκοντα και θητεία', bg:'Длъжности, задължения и мандат'},
        table:{ head:['Office','Duties and Responsibilities','Term'], widths:[24,58,18],
                rows: OFFICERS.map(function(o){
                  return [ office(o.en, o.el, o.bg), second(o.duties.en, o.duties.bg),
                           second(o.term.en, o.term.bg, 7.9) ];
                }),
                note:'The President, the Treasurer and the Road Captain serve five-year terms and are elected by the Chapter. The remaining offices are filled by appointment of the President, in accordance with the rules of the Chapter. — Президентът, Ковчежникът и Road Captain служат петгодишен мандат и се избират от Chapter-а; останалите длъжности се заемат по назначение от Президента.' } },
      { title:{en:'II. The Officers Appointed', el:'Οι διοριζόμενοι αξιωματικοί', bg:'Назначените длъжностни лица'},
        table:{ head:['Office','Brother','Road Name','Rank'], widths:[30,24,20,26],
                rows: OFFICERS.map(function(o){
                  return [ office(o.en, o.el, o.bg), person(o.name), road(o.road),
                           second(o.rank.en, o.rank.bg, 7.9) ];
                }),
                note:'The first six offices constitute the Principal Officers — Κύριοι Αξιωματικοί · Главни длъжностни лица — of the Chapter. Road names not yet entered above are to be advised to the Secretary and will be carried in the next issue of this document.' } },
      { title:{en:'III. Founding Distinction', el:'Ιδρυτική διάκριση', bg:'Учредително отличие'},
        table:{ head:['Distinction','Brother','Nature of the Distinction'], widths:[26,22,52],
                rows:[[ office('Founding President','Ιδρυτικός Πρόεδρος & Οικιστής','Учредителен президент'),
                        person('Dimitrios Skiadopoulos'),
                        second('A special and permanent founding distinction of the Chapter, held in recognition of its foundation. It does not constitute a sixteenth office and carries no duties beyond those of the office held by the brother who bears it.',
                               'Особено и постоянно учредително отличие на Chapter-а, носено в признание за неговото основаване. То не представлява шестнадесета длъжност и не носи задължения извън тези на длъжността, заемана от брата, който го носи.') ]] } }
    ], {
      lead:[{en:'By this founding act the Chapter constitutes its administration and appoints to each of its fifteen offices the brother who shall hold it, the first six of these offices being the Principal Officers of the Chapter.',
             el:'Με την παρούσα ιδρυτική πράξη το Chapter συγκροτεί τη διοίκησή του και διορίζει σε έκαστο των δεκαπέντε αξιωμάτων τον αδελφό που θα το κατέχει, των πρώτων έξι εξ αυτών όντων των Κυρίων Αξιωματικών του Chapter.',
             bg:'С този учредителен акт Chapter-ът съставя своето управление и назначава за всяка от петнадесетте си длъжности брата, който ще я заема, като първите шест от тези длъжности са Главните длъжностни лица на Chapter-а.'}],
      closing:[{en:'Appointed at the foundation of the Chapter and entered in its records. All emblems, patches and insignia of office remain the property of Widows Sons MRA and are returned to the Chapter upon a brother’s departure from office or from the Chapter.',
                el:'Διορίσθηκαν κατά την ίδρυση του Chapter και καταχωρήθηκαν στα αρχεία του. Όλα τα εμβλήματα, τα patches και τα διακριτικά του αξιώματος παραμένουν ιδιοκτησία της Widows Sons MRA και επιστρέφονται στο Chapter κατά την αποχώρηση του αδελφού από το αξίωμα ή από το Chapter.',
                bg:'Назначени при учредяването на Chapter-а и вписани в неговите регистри. Всички емблеми, patches и отличителни знаци на длъжността остават собственост на Widows Sons MRA и се връщат на Chapter-а при напускане на длъжността или на Chapter-а.'}]
    });
  }

  /* =================================================================
     7 — Appointment of Honorary Members
     ================================================================= */
  function honorary(){
    return base(7, {en:'Appointment of Honorary Members', el:'Διορισμός Επίτιμων Μελών', bg:'Назначаване на почетни членове'}, [
      { title:{en:'I. The Distinction', el:'Η διάκριση', bg:'Отличието'},
        paragraphs:[
          {en:'Honorary membership is the highest distinction the Chapter confers. It is granted to a brother who has served the Craft, the Association or this Chapter in a manner the Chapter wishes to hold in remembrance.',
           el:'Η επίτιμη ιδιότητα του μέλους είναι η ανώτατη διάκριση που απονέμει το Chapter. Χορηγείται σε αδελφό που υπηρέτησε την Τεκτονική, την Ένωση ή το παρόν Chapter κατά τρόπον που το Chapter επιθυμεί να διατηρήσει εις μνήμην.',
           bg:'Почетното членство е най-високото отличие, което Chapter-ът присъжда. То се дава на брат, който е служил на Занаята, на Асоциацията или на този Chapter по начин, който Chapter-ът желае да запази в памет.'}
        ] },
      { title:{en:'II. Rights and Limits', el:'Δικαιώματα και όρια', bg:'Права и ограничения'},
        paragraphs:[
          {en:'An honorary member is received at every assembly and at every ride of the Chapter, and is seated with honour. He pays no dues. He holds no office, and he does not vote in the assembly unless he is also a full member of the Chapter.',
           el:'Το επίτιμο μέλος γίνεται δεκτό σε κάθε συνέλευση και σε κάθε διαδρομή του Chapter και ενθρονίζεται μετά τιμής. Δεν καταβάλλει συνδρομή. Δεν κατέχει αξίωμα και δεν ψηφίζει στη συνέλευση, εκτός εάν είναι και πλήρες μέλος του Chapter.',
           bg:'Почетният член се приема на всяко събрание и на всяко пътуване на Chapter-а и се посреща с почит. Той не плаща вноски. Не заема длъжност и не гласува на събранието, освен ако не е и пълноправен член на Chapter-а.'},
          {en:'The distinction is conferred by decision of the assembly upon the proposal of the President, and is entered by the Secretary upon the roll below.',
           el:'Η διάκριση απονέμεται με απόφαση της συνελεύσεως κατόπιν προτάσεως του Προέδρου και καταχωρείται από τον Γραμματέα στον κάτωθι κατάλογο.',
           bg:'Отличието се присъжда с решение на събранието по предложение на Президента и се вписва от Секретаря в списъка по-долу.'}
        ] },
      { title:{en:'III. The Roll of Honorary Members', el:'Ο κατάλογος των επίτιμων μελών', bg:'Списък на почетните членове'},
        table:{ head:['Brother','Road Name','Conferred for','Date'], widths:[28,18,36,18],
                rows:[ [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()],
                       [person(''), road(''), blank(), blank()] ],
                note:'The roll is kept by the Secretary and each entry is made upon the decision of the assembly conferring the distinction.' } }
    ], {
      lead:[{en:'By this founding act the Chapter institutes the distinction of honorary membership, declares the rights that attend it, and opens the roll upon which every such member is entered.',
             el:'Με την παρούσα ιδρυτική πράξη το Chapter θεσπίζει τη διάκριση του επίτιμου μέλους, δηλώνει τα δικαιώματα που τη συνοδεύουν και ανοίγει τον κατάλογο στον οποίο καταχωρείται κάθε τοιούτο μέλος.',
             bg:'С този учредителен акт Chapter-ът учредява отличието почетно членство, обявява правата, които го съпътстват, и открива списъка, в който се вписва всеки такъв член.'}],
      closing:[{en:'Instituted at the foundation of the Chapter and entered in its records.',
                el:'Θεσπίσθηκε κατά την ίδρυση του Chapter και καταχωρήθηκε στα αρχεία του.',
                bg:'Учредено при създаването на Chapter-а и вписано в неговите регистри.'}]
    });
  }

  /* =================================================================
     The documents of the Secretariat — signed by the Secretary and the
     President, with the seal between them. These are working documents:
     the blanks are filled in Word before they are issued.
     ================================================================= */
  function secretariat(no, subject, sections, opts){
    opts = opts || {};
    return {
      subject: subject,
      ref: 'Ref. CH-SEC-' + (no < 10 ? '0' + no : no) + '/2026',
      place: PLACE, date: DATE,
      lead: opts.lead || [],
      sections: sections,
      closing: opts.closing || [],
      signatures: EXECUTED,
      seal: true
    };
  }

  function certificate(){
    return secretariat(1, {en:'Certificate of Membership', el:'Βεβαίωση Μέλους'}, [
      { title:{en:'I. Certificate', el:'Βεβαίωση'},
        paragraphs:[
          'The Secretary of Widows Sons Masonic Riders Association — Chapter Hellas certifies that the brother named below is a member of this Chapter, received according to its Charter and Internal Regulations, and is at the date of this certificate in good standing.',
          {el:'Ο Γραμματέας της Widows Sons Masonic Riders Association — Chapter Hellas βεβαιώνει ότι ο κατωτέρω αναφερόμενος αδελφός είναι μέλος του παρόντος Chapter, γενόμενος δεκτός κατά τον Καταστατικό Χάρτη και τον Εσωτερικό Κανονισμό του, και κατά την ημερομηνία της παρούσης τελεί εν καλή καταστάσει.'}
        ] },
      { title:{en:'II. The Member', el:'Το μέλος'},
        table:{ head:['Brother','Road Name','Office held','Member since'], widths:[30,20,28,22],
                rows:[[ person(''), road(''), blank(), blank() ]] } },
      { title:{en:'III. Validity', el:'Ισχύς'},
        paragraphs:[
          'This certificate is issued for whatever lawful use the brother may have of it, remains valid for so long as he continues in good standing, and is returned to the Chapter should he cease to be a member.',
          {el:'Η παρούσα βεβαίωση εκδίδεται για κάθε νόμιμη χρήση του αδελφού, ισχύει για όσο διατηρεί την καλή του κατάσταση και επιστρέφεται στο Chapter εφόσον παύσει να είναι μέλος.'}
        ] }
    ]);
  }

  function introduction(){
    return secretariat(2, {en:'Letter of Introduction', el:'Συστατική Επιστολή'}, [
      { title:{en:'I. To Whom It May Concern', el:'Προς πάντα ενδιαφερόμενον'},
        paragraphs:[
          'To the Officers and Brethren of every Chapter of Widows Sons MRA, and to all kindred Motorcycle Clubs and organisations: greeting.',
          {el:'Προς τους Αξιωματικούς και τους Αδελφούς παντός Chapter της Widows Sons MRA, και προς πάντα συγγενή Motorcycle Club και οργάνωση: χαίρετε.'}
        ] },
      { title:{en:'II. The Bearer', el:'Ο κομιστής'},
        table:{ head:['Brother','Road Name','Office held'], widths:[36,26,38],
                rows:[[ person(''), road(''), blank() ]] },
        paragraphs:[
          'The brother named above is commended to you as a member of Chapter Hellas in good standing. We ask for him the welcome, the assistance and the fellowship which our brethren everywhere extend to one another upon the road.',
          {el:'Ο ανωτέρω αδελφός συνιστάται προς υμάς ως μέλος του Chapter Hellas εν καλή καταστάσει. Ζητούμε δι’ αυτόν την υποδοχή, τη συνδρομή και τη συντροφικότητα που οι αδελφοί μας απανταχού επιδεικνύουν αλλήλοις επί του δρόμου.'}
        ] },
      { title:{en:'III. Assurance', el:'Διαβεβαίωση'},
        paragraphs:[
          'Chapter Hellas holds itself ready to render the same office to any brother of your Chapter who may come among us.',
          {el:'Το Chapter Hellas δηλώνει έτοιμο να προσφέρει την ίδια υπηρεσία σε κάθε αδελφό του Chapter σας που θα βρεθεί μεταξύ μας.'}
        ] }
    ]);
  }

  function minutes(){
    return secretariat(3, {en:'Minutes of the Assembly', el:'Πρακτικό Συνεδρίασης'}, [
      { title:{en:'I. The Assembly', el:'Η συνέλευση'},
        table:{ head:['Kind of assembly','Place','Date','Hour'], widths:[28,26,24,22],
                rows:[[ blank(), blank(), blank(), blank() ]] } },
      { title:{en:'II. Present', el:'Παρόντες'},
        table:{ head:['Office','Brother','Present / Absent'], widths:[34,40,26],
                rows:[ [office('President','Πρόεδρος'), person('Dimitrios Skiadopoulos'), blank()],
                       [office('Vice President','Αντιπρόεδρος'), person('Dimitrios Panagakos'), blank()],
                       [office('Secretary','Γραμματέας'), person('Nikolaos Markopoulos'), blank()],
                       [office('Treasurer','Ταμίας'), person('Panagiotis Vlahos'), blank()],
                       [office('Sergeant-at-Arms','Υπεύθυνος Τάξης'), person('Marinos Andreas'), blank()],
                       [office('Road Captain','Αρχηγός Αποστολής'), person('Panagiotis Floris'), blank()] ],
                note:'The remaining officers and the members present are entered by the Secretary upon the roll kept with these minutes.' } },
      { title:{en:'III. Business', el:'Θέματα'},
        table:{ head:['No.','Matter laid before the assembly','Decision'], widths:[10,52,38],
                rows:[ ['1', blank(), blank()], ['2', blank(), blank()],
                       ['3', blank(), blank()], ['4', blank(), blank()] ] } },
      { title:{en:'IV. Close', el:'Λήξη'},
        paragraphs:[
          'There being no further business, the President closed the assembly, and these minutes were entered in the archive of the Chapter by the Secretary.',
          {el:'Μη υπάρχοντος ετέρου θέματος, ο Πρόεδρος έλυσε τη συνέλευση, το δε παρόν πρακτικό καταχωρήθηκε στο αρχείο του Chapter από τον Γραμματέα.'}
        ] }
    ]);
  }

  /* =================================================================
     The catalogue, as the Secretary's page shows it.
     ================================================================= */
  var CATALOGUE = [
    { no:1, category:'founding', build:emblem,
      title:{en:'The Official Emblem', el:'Το Επίσημο Έμβλημα', bg:'Официалната емблема'},
      note:'Establishes the emblem, its composition, and how it is worn and kept.' },
    { no:2, category:'founding', build:seal,
      title:{en:'The Official Seal', el:'Η Επίσημη Σφραγίδα', bg:'Официалният печат'},
      note:'Establishes the seal, its custodian and the manner of its use.' },
    { no:3, category:'founding', build:charter,
      title:{en:'Charter', el:'Καταστατικός Χάρτης', bg:'Учредителна харта'},
      note:'The founding instrument: name, purpose, membership and government.' },
    { no:4, category:'founding', build:regulations,
      title:{en:'Internal Regulations', el:'Εσωτερικός Κανονισμός', bg:'Вътрешен правилник'},
      note:'Assemblies, discipline, the road, dues, insignia and admission.' },
    { no:5, category:'founding', build:application,
      title:{en:'Application for Foundation', el:'Αίτηση Ιδρύσεως', bg:'Молба за учредяване'},
      note:'The petition to Widows Sons MRA for the charter of the Chapter.' },
    { no:6, category:'founding', build:officers,
      title:{en:'Appointment of Officers', el:'Διορισμός Αξιωματικών', bg:'Назначаване на длъжностните лица'},
      note:'The fifteen offices, their duties and terms, and the brethren appointed.' },
    { no:7, category:'founding', build:honorary,
      title:{en:'Appointment of Honorary Members', el:'Διορισμός Επίτιμων Μελών', bg:'Назначаване на почетни членове'},
      note:'Institutes the distinction and opens the roll of honorary members.' },

    { no:1, category:'secretariat', build:certificate,
      title:{en:'Certificate of Membership', el:'Βεβαίωση Μέλους'},
      note:'Certifies that a brother is a member of the Chapter in good standing.' },
    { no:2, category:'secretariat', build:introduction,
      title:{en:'Letter of Introduction', el:'Συστατική Επιστολή'},
      note:'Commends a brother to other Chapters and kindred clubs.' },
    { no:3, category:'secretariat', build:minutes,
      title:{en:'Minutes of the Assembly', el:'Πρακτικό Συνεδρίασης'},
      note:'The record of an assembly, its attendance and its decisions.' }
  ];

  function list(category){
    return CATALOGUE.filter(function(d){ return d.category === category; })
                    .sort(function(a,b){ return a.no - b.no; });
  }

  return {
    catalogue: CATALOGUE, list: list,
    officers: officers,            /* the Officers document, called for by name */
    FOUNDING: FOUNDING, EXECUTED: EXECUTED
  };
})();
