import {
  LatinQuote,
  LatinWord,
  QuizQuestion,
  GrammarDeclension,
  Flashcard,
} from '@/types/latin';

export const LATIN_QUOTES: LatinQuote[] = [
  {
    id: 'carpe-diem',
    latin: 'Carpe diem, quam minimum credula postero.',
    translation: 'Aproveita o dia, confiando o mínimo possível no amanhã.',
    author: 'Horácio',
    source: 'Odes (Carmina), I, 11',
    era: 'Século I a.C. (Roma Antiga)',
    category: 'filosofia',
    historicalContext:
      'Escrito pelo poeta lírico Horácio em sua ode a Leucônoe. A palavra "carpe" evoca a imagem de colher um fruto maduro na árvore antes que caia ou estrague.',
    reflection:
      'Não se trata de imprudência ou hedonismo inconsequente, mas de profunda presença. Viva hoje com intensidade moral e consciência, pois o futuro jamais nos é garantido.',
    classicalPronunciation: 'kár-pe dí-em, kuám mí-ni-mum kré-du-la pos-té-ro',
    ecclesiasticalPronunciation: 'kár-pe dí-em, kuám mí-ni-mum kré-du-la pos-té-ro',
    tags: ['tempo', 'vida', 'presença', 'sabedoria'],
  },
  {
    id: 'memento-mori',
    latin: 'Memento mori.',
    translation: 'Lembra-te de que és mortal (has de morrer).',
    author: 'Tradição Clássica / Estoicismo',
    source: 'Prática de triunfo romano & Sêneca',
    era: 'Tradição Republicana e Imperial',
    category: 'filosofia',
    historicalContext:
      'Nos desfiles triunfais em Roma, um servo caminhava atrás do general vitorioso segurando uma coroa de louros e sussurrando esta frase para lembrá-lo de sua condição humana diante dos deuses.',
    reflection:
      'Lembrar da morte não é morbidez; é o maior filtro de clareza que existe. Quando você lembra que a vida é passageira, o orgulho desnecessário, a vaidade e os ressentimentos perdem toda a força.',
    classicalPronunciation: 'me-mên-to mó-ri',
    ecclesiasticalPronunciation: 'me-mên-to mó-ri',
    tags: ['morte', 'humildade', 'finitude', 'estoicismo'],
  },
  {
    id: 'amor-fati',
    latin: 'Amor fati.',
    translation: 'O amor ao destino.',
    author: 'Epicteto / Estoicismo',
    source: 'Encheirídion / Filosofia Helenística e Romana',
    era: 'Século I - II d.C.',
    category: 'filosofia',
    historicalContext:
      'Conceito originado nas lições estoicas de Epicteto e Marco Aurélio, posteriormente celebrado por filósofos modernos como Nietzsche. A ideia é aceitar não apenas o que é agradável, mas tudo o que a vida trouxer.',
    reflection:
      'Não deseje que as coisas aconteçam como você quer; queira que elas aconteçam exatamente como acontecem, e você terá paz em todas as circunstâncias.',
    classicalPronunciation: 'á-mor fá-ti',
    ecclesiasticalPronunciation: 'á-mor fá-tsi',
    tags: ['destino', 'aceitação', 'resiliência', 'paz'],
  },
  {
    id: 'per-aspera-ad-astra',
    latin: 'Per aspera ad astra.',
    translation: 'Pelos caminhos árduos até as estrelas.',
    author: 'Sêneca',
    source: 'Hercules Furens',
    era: 'Século I d.C.',
    category: 'sabedoria',
    historicalContext:
      'Na tragédia de Sêneca sobre os trabalhos de Hércules, reflete a superação de dores imensas para alcançar a glória e a sabedoria imortal.',
    reflection:
      'Grandes conquistas exigem resistência. Não reclame dos obstáculos no percurso: eles são a própria substância através da qual você desenvolve força, caráter e grandeza.',
    classicalPronunciation: 'per ás-pe-ra ad ás-tra',
    ecclesiasticalPronunciation: 'per ás-pe-ra ad ás-tra',
    tags: ['coragem', 'superação', 'esforço', 'glória'],
  },
  {
    id: 'veni-vidi-vici',
    latin: 'Veni, vidi, vici.',
    translation: 'Vim, vi e venci.',
    author: 'Júlio César',
    source: 'Mensagem ao Senado Romano após a Batalha de Zela',
    era: '47 a.C.',
    category: 'imperio',
    historicalContext:
      'Após derrotar Fárnaces II do Ponto em uma batalha relâmpago de poucas horas, César enviou esta concisa mensagem de três verbos em aliteração ao Senado Romano.',
    reflection:
      'A clareza de propósito, ação decisiva e foco imediato produzem resultados superiores a hesitações intermináveis.',
    classicalPronunciation: 'wé-ni, wí-di, wí-ki',
    ecclesiasticalPronunciation: 'vé-ni, ví-di, ví-tchi',
    tags: ['liderança', 'conquista', 'ação', 'história'],
  },
  {
    id: 'mens-sana-in-corpore-sano',
    latin: 'Orandum est ut sit mens sana in corpore sano.',
    translation: 'Deve-se pedir aos deuses que haja uma mente sã em um corpo são.',
    author: 'Juvenal',
    source: 'Sátiras, X, 356',
    era: 'Século I - II d.C.',
    category: 'sabedoria',
    historicalContext:
      'O poeta satírico romano Juvenal criticava as preces fúteis de seus contemporâneos por fama e riqueza, apontando que o verdadeiro bem é o equilíbrio psíquico e físico.',
    reflection:
      'Cultive tanto o intelecto e a alma quanto a saúde corporal. O equilíbrio holístico é a verdadeira riqueza dos seres humanos livres.',
    classicalPronunciation: 'o-rán-dum est ut sit mens sá-na in kór-po-re sá-no',
    ecclesiasticalPronunciation: 'o-rán-dum est ut sit mens sá-na in kór-po-re sá-no',
    tags: ['saúde', 'equilíbrio', 'mente', 'harmonia'],
  },
  {
    id: 'pacta-sunt-servanda',
    latin: 'Pacta sunt servanda.',
    translation: 'Os acordos devem ser cumpridos.',
    author: 'Direito Romano Canônico',
    source: 'Corpus Iuris Civilis / Decretales',
    era: 'Direito Clássico e Medieval',
    category: 'juridico',
    historicalContext:
      'Pilar universal do direito obrigacional e internacional. Estabelece que o consentimento livremente emitido gera vínculo moral e jurídico inquebrantável.',
    reflection:
      'A sua palavra é a sua honra. A confiança social e as relações humanas só prosperam quando homens e mulheres cumprem aquilo que prometeram.',
    classicalPronunciation: 'pák-ta sunt ser-wán-da',
    ecclesiasticalPronunciation: 'pák-ta sunt ser-ván-da',
    tags: ['direito', 'justiça', 'palavra', 'honra'],
  },
  {
    id: 'in-dubio-pro-reo',
    latin: 'In dubio pro reo.',
    translation: 'Na dúvida, decide-se a favor do acusado.',
    author: 'Jurisprudência Romana',
    source: 'Digesto de Justiniano',
    era: 'Direito Romano Clássico',
    category: 'juridico',
    historicalContext:
      'Princípio formulado pelos juristas romanos para prevenir que o peso do Estado ou suposições condenem um cidadão sem provas incontestáveis.',
    reflection:
      'Em nossos julgamentos cotidianos sobre os outros, devemos adotar a caridade da dúvida antes de presumir más intenções.',
    classicalPronunciation: 'in dú-bi-o pro ré-o',
    ecclesiasticalPronunciation: 'in dú-bi-o pro ré-o',
    tags: ['justiça', 'presunção', 'direito', 'prudência'],
  },
  {
    id: 'habeas-corpus',
    latin: 'Habeas corpus ad subiciendum.',
    translation: 'Que tenhas o corpo (para apresentar perante o tribunal).',
    author: 'Direito Consuetudinário e Romano',
    source: 'Carta Magna / Tradição Jurídica',
    era: 'Origem latina consolidada no séc. XIII',
    category: 'juridico',
    historicalContext:
      'A mais nobre garantia constitucional contra a prisão arbitrária e ilegal. Exigia que a autoridade trouxesse fisicamente o prisioneiro ao juiz para justificar sua detenção.',
    reflection:
      'A liberdade é o bem mais precioso de qualquer sociedade civilizada. Toda tirania começa com restrições arbitrárias ao movimento e à fala.',
    classicalPronunciation: 'há-be-as kór-pus ad sub-i-ki-ên-dum',
    ecclesiasticalPronunciation: 'á-be-as kór-pus ad sub-i-tchi-ên-dum',
    tags: ['liberdade', 'direito', 'constituição'],
  },
  {
    id: 'pater-noster',
    latin: 'Pater noster, qui es in caelis, sanctificetur nomen tuum.',
    translation: 'Pai nosso, que estás nos céus, santificado seja o vosso nome.',
    author: 'São Jerônimo (Vulgata)',
    source: 'Evangelho de São Mateus 6, 9',
    era: 'Século IV d.C.',
    category: 'liturgico',
    historicalContext:
      'A oração máxima da cristandade traduzida do grego koiné para o latim por São Jerônimo na monumental tradução da Vulgata Latina, rezada ininterruptamente por séculos.',
    reflection:
      'Um convite à humildade, reconhecimento da paternidade divina e comunhão fraternal entre todos os homens.',
    classicalPronunciation: 'pá-ter nós-ter, kwi es in kái-lis, sank-ti-fi-ké-tur nó-men tú-um',
    ecclesiasticalPronunciation: 'pá-ter nós-ter, kwi es in tché-lis, sank-ti-fi-tché-tur nó-men tú-um',
    tags: ['oração', 'oração dominical', 'fé', 'vulgata'],
  },
  {
    id: 'ave-maria',
    latin: 'Ave Maria, gratia plena, Dominus tecum.',
    translation: 'Ave Maria, cheia de graça, o Senhor é convosco.',
    author: 'São Jerônimo (Vulgata)',
    source: 'Evangelho de São Lucas 1, 28',
    era: 'Século IV d.C.',
    category: 'liturgico',
    historicalContext:
      'A saudação angélica do Arcanjo Gabriel à Virgem Maria em Nazaré. "Ave" era também a saudação nobre romana ao imperador e às pessoas de alta dignidade.',
    reflection:
      'Uma expressão de beleza sublime e recolhimento interior, transmitida na solenidade da língua litúrgica.',
    classicalPronunciation: 'á-we ma-rí-a, grá-ti-a plé-na, dó-mi-nus té-kum',
    ecclesiasticalPronunciation: 'á-ve ma-rí-a, grá-tsi-a plé-na, dó-mi-nus té-kum',
    tags: ['oração', 'virgem maria', 'liturgia'],
  },
  {
    id: 'si-vis-pacem-para-bellum',
    latin: 'Si vis pacem, para bellum.',
    translation: 'Se queres a paz, prepara-te para a guerra.',
    author: 'Vegetius',
    source: 'Epitoma Rei Militaris',
    era: 'Século IV d.C.',
    category: 'imperio',
    historicalContext:
      'O general e escritor romano Vegetius enfatizava que a paz não é mantida pela fraqueza ou passividade, mas pela capacidade inequívoca de autodefesa e dissuasão.',
    reflection:
      'Para preservar sua tranquilidade e seus valores mais caros, é necessário estar forte, preparado e vigilante.',
    classicalPronunciation: 'si wis pá-kem, pá-ra bél-lum',
    ecclesiasticalPronunciation: 'si vis pá-tchem, pá-ra bél-lum',
    tags: ['defesa', 'estratégia', 'paz', 'força'],
  },
  {
    id: 'non-ducor-duco',
    latin: 'Non ducor, duco.',
    translation: 'Não sou conduzido, conduzo.',
    author: 'Lema Tradicional Romano & Cidade de São Paulo',
    source: 'Brazão de São Paulo / Tradição Latina',
    era: 'Clássico / Retomada Renascentista',
    category: 'sabedoria',
    historicalContext:
      'Frase que reflete a autonomia do homem livre romano (*vir liber*), adotada posteriormente como lema da maior metrópole da América do Sul.',
    reflection:
      'Seja o capitão da sua própria mente. Não permita que as correntes da opinião alheia ou as modas passageiras ditem o seu rumo ético.',
    classicalPronunciation: 'non dú-kor, dú-ko',
    ecclesiasticalPronunciation: 'non dú-tchor, dú-ko',
    tags: ['autonomia', 'liderança', 'força interior'],
  },
  {
    id: 'alea-iacta-est',
    latin: 'Alea iacta est.',
    translation: 'A sorte está lançada (os dados foram jogados).',
    author: 'Júlio César',
    source: 'Suetônio, De Vita Caesarum',
    era: '49 a.C.',
    category: 'imperio',
    historicalContext:
      'Pronunciada por Júlio César ao cruzar o rio Rubicão com a 13ª Legião, violando as leis de Roma e iniciando a Guerra Civil que transformaria a República no Império.',
    reflection:
      'Há momentos cruciais na vida em que a decisão é irrevogável. Uma vez ultrapassado o seu Rubicão pessoal, comprometa-se inteiramente com a jornada.',
    classicalPronunciation: 'á-le-a iák-ta est',
    ecclesiasticalPronunciation: 'á-le-a iák-ta est',
    tags: ['decisão', 'coragem', 'história', 'rubicão'],
  },
  {
    id: 'veritas-liberabit-vos',
    latin: 'Veritas vos liberabit.',
    translation: 'A verdade vos libertará.',
    author: 'São Jerônimo (Vulgata)',
    source: 'Evangelho de São João 8, 32',
    era: 'Século IV d.C.',
    category: 'filosofia',
    historicalContext:
      'Palavras capitais do Novo Testamento latino, adotadas como lema por dezenas de universidades ao redor do mundo.',
    reflection:
      'A ilusão traz um conforto efêmero, mas a verdade — por mais desafiadora que seja — é o único fundamento duradouro para a liberdade real.',
    classicalPronunciation: 'wé-ri-tas wos li-be-rá-bit',
    ecclesiasticalPronunciation: 'vé-ri-tas vos li-be-rá-bit',
    tags: ['verdade', 'liberdade', 'sabedoria'],
  },
];

export const LATIN_WORDS: LatinWord[] = [
  {
    id: 'sapientia',
    word: 'Sapientia',
    genitiveAndGender: 'sapientiae, f. (1ª declinação)',
    partOfSpeech: 'Substantivo Feminino',
    meaning: 'Sabedoria, discernimento, bom senso, prudência moral.',
    etymology: 'Do verbo "sapere" (ter sabor, discernir, ter inteligência).',
    derivatives: ['sapiência', 'sapiente', 'homo sapiens', 'sabor', 'saber'],
    exampleSentence: 'Initium sapientiae timor Domini.',
    exampleTranslation: 'O princípio da sabedoria é o temor do Senhor.',
  },
  {
    id: 'virtus',
    word: 'Virtus',
    genitiveAndGender: 'virtutis, f. (3ª declinação)',
    partOfSpeech: 'Substantivo Feminino',
    meaning: 'Virtude, coragem, excelência moral, bravura viril.',
    etymology: 'De "vir" (homem nobre, valoroso) com o sufixo abstrato "-tus".',
    derivatives: ['virtude', 'virtual', 'virtuoso', 'desvirtuar'],
    exampleSentence: 'Virtus in medio consistit.',
    exampleTranslation: 'A virtude está no meio (no equilíbrio).',
  },
  {
    id: 'constantia',
    word: 'Constantia',
    genitiveAndGender: 'constantiae, f. (1ª declinação)',
    partOfSpeech: 'Substantivo Feminino',
    meaning: 'Constância, firmeza de ânimo, perseverança inabalável.',
    etymology: 'De "constare" (manter-se firme, permanecer em pé).',
    derivatives: ['constância', 'constante', 'inconstante'],
    exampleSentence: 'Constantia et patientia omnia vincunt.',
    exampleTranslation: 'A constância e a paciência vencem tudo.',
  },
  {
    id: 'gratia',
    word: 'Gratia',
    genitiveAndGender: 'gratiae, f. (1ª declinação)',
    partOfSpeech: 'Substantivo Feminino',
    meaning: 'Graça, favor, benevolência, gratidão (no plural: gratiae).',
    etymology: 'Da raiz indo-europeia ligada a louvor e favor.',
    derivatives: ['graça', 'gratuito', 'agradecer', 'grato', 'gratidão'],
    exampleSentence: 'Gratias tibi agimus.',
    exampleTranslation: 'Nós vos damos graças.',
  },
  {
    id: 'tempus',
    word: 'Tempus',
    genitiveAndGender: 'temporis, n. (3ª declinação neutra)',
    partOfSpeech: 'Substantivo Neutro',
    meaning: 'Tempo, época, ocasião oportuna, estação.',
    etymology: 'Ligado ao corte ou medida temporal.',
    derivatives: ['tempo', 'temporal', 'temporário', 'intempestivo'],
    exampleSentence: 'Tempus fugit, aetas ruit.',
    exampleTranslation: 'O tempo voa, a idade se esvai.',
  },
  {
    id: 'aequitas',
    word: 'Aequitas',
    genitiveAndGender: 'aequitatis, f. (3ª declinação)',
    partOfSpeech: 'Substantivo Feminino',
    meaning: 'Equidade, justiça serena, igualdade moderada pela moderação.',
    etymology: 'De "aequus" (plano, justo, equânime).',
    derivatives: ['equidade', 'equânime', 'equação', 'equitativo'],
    exampleSentence: 'Iustitia sine aequitate crudelitas est.',
    exampleTranslation: 'A justiça sem equidade é crueldade.',
  },
];

export const GRAMMAR_DECLENSIONS: GrammarDeclension[] = [
  {
    id: '1a-declinacao',
    title: '1ª Declinação (-A)',
    description: 'Compreende a grande maioria das palavras femininas terminadas em -a.',
    modelWord: 'Rosa, rosae (f.)',
    meaning: 'A rosa',
    cases: [
      { caseName: 'Nominativo (Sujeito)', functionPt: 'Quem pratica a ação', singular: 'rosa', plural: 'rosae' },
      { caseName: 'Vocativo (Chamamento)', functionPt: 'Interpelação / invocação', singular: 'rosa', plural: 'rosae' },
      { caseName: 'Acusativo (Objeto Direto)', functionPt: 'Quem recebe a ação diretamente', singular: 'rosam', plural: 'rosas' },
      { caseName: 'Genitivo (Posse / De quem)', functionPt: 'Indica posse ou origem ("da rosa")', singular: 'rosae', plural: 'rosarum' },
      { caseName: 'Dativo (Objeto Indireto)', functionPt: 'Para quem / A quem se destina', singular: 'rosae', plural: 'rosis' },
      { caseName: 'Ablativo (Adjunto Adverbial)', functionPt: 'Por meio de / Em / Com', singular: 'rosa', plural: 'rosis' },
    ],
  },
  {
    id: '2a-declinacao',
    title: '2ª Declinação (-US / -UM)',
    description: 'Palavras masculinas terminadas em -us/-er e neutras em -um.',
    modelWord: 'Dominus, domini (m.)',
    meaning: 'O senhor / mestre',
    cases: [
      { caseName: 'Nominativo (Sujeito)', functionPt: 'O senhor', singular: 'dominus', plural: 'domini' },
      { caseName: 'Vocativo (Chamamento)', functionPt: 'Ó senhor!', singular: 'domine', plural: 'domini' },
      { caseName: 'Acusativo (Objeto Direto)', functionPt: 'Ao senhor', singular: 'dominum', plural: 'dominos' },
      { caseName: 'Genitivo (Posse)', functionPt: 'Do senhor', singular: 'domini', plural: 'dominorum' },
      { caseName: 'Dativo (Objeto Indireto)', functionPt: 'Para o senhor', singular: 'domino', plural: 'dominis' },
      { caseName: 'Ablativo (Adjunto)', functionPt: 'Pelo senhor / Com o senhor', singular: 'domino', plural: 'dominis' },
    ],
  },
  {
    id: '3a-declinacao',
    title: '3ª Declinação (Mistas / Consoante)',
    description: 'A mais rica e variada declinação latina, com genitivo sempre em -is.',
    modelWord: 'Rex, regis (m.)',
    meaning: 'O rei',
    cases: [
      { caseName: 'Nominativo (Sujeito)', functionPt: 'O rei', singular: 'rex', plural: 'reges' },
      { caseName: 'Vocativo (Chamamento)', functionPt: 'Ó rei!', singular: 'rex', plural: 'reges' },
      { caseName: 'Acusativo (Objeto Direto)', functionPt: 'Ao rei', singular: 'regem', plural: 'reges' },
      { caseName: 'Genitivo (Posse)', functionPt: 'Do rei', singular: 'regis', plural: 'regum' },
      { caseName: 'Dativo (Objeto Indireto)', functionPt: 'Para o rei', singular: 'regi', plural: 'regibus' },
      { caseName: 'Ablativo (Adjunto)', functionPt: 'Com o rei / Pelo rei', singular: 'rege', plural: 'regibus' },
    ],
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    latin: 'Carpe diem',
    translation: 'Aproveita o dia presente.',
    category: 'filosofia',
    note: 'Horácio, Odes. "Carpe" = colher (como uma fruta fresca).',
  },
  {
    id: 'fc-2',
    latin: 'Memento mori',
    translation: 'Lembra-te de que morrerás.',
    category: 'filosofia',
    note: 'Lembrete estoico de humildade e foco no essencial.',
  },
  {
    id: 'fc-3',
    latin: 'Alea iacta est',
    translation: 'O dado foi lançado (a sorte está lançada).',
    category: 'imperio',
    note: 'Júlio César ao cruzar o Rubicão em 49 a.C.',
  },
  {
    id: 'fc-4',
    latin: 'Pacta sunt servanda',
    translation: 'Os acordos devem ser cumpridos.',
    category: 'juridico',
    note: 'Princípio basilar do direito dos contratos e relações.',
  },
  {
    id: 'fc-5',
    latin: 'Si vis pacem, para bellum',
    translation: 'Se queres a paz, prepara-te para a guerra.',
    category: 'imperio',
    note: 'Vegetius, Epitoma Rei Militaris.',
  },
  {
    id: 'fc-6',
    latin: 'In dubio pro reo',
    translation: 'Na dúvida, em favor do acusado.',
    category: 'juridico',
    note: 'Fundamento da presunção de inocência no direito ocidental.',
  },
  {
    id: 'fc-7',
    latin: 'Amor fati',
    translation: 'Amor ao destino / aos fatos da vida.',
    category: 'filosofia',
    note: 'Aceitação corajosa de tudo o que acontece.',
  },
  {
    id: 'fc-8',
    latin: 'Per aspera ad astra',
    translation: 'Pelos caminhos ásperos até as estrelas.',
    category: 'sabedoria',
    note: 'Sêneca. A superação de provações conduz à grandeza.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Qual é a tradução mais precisa da célebre máxima de Horácio "Carpe diem"?',
    options: [
      'Viva rápido e sem limites',
      'Aproveita o dia presente com consciência',
      'O dia de amanhã será melhor',
      'Trabalha duro durante o dia',
    ],
    correctIndex: 1,
    explanation:
      '"Carpe" evoca o gesto de colher um fruto maduro. Horácio convida à colheita sábia do momento presente sem depositar esperanças vãs no amanhã.',
    category: 'Filosofia',
  },
  {
    id: 'q2',
    question: 'Quem pronunciou a frase "Alea iacta est" ao cruzar o rio Rubicão?',
    options: ['Cícero', 'Marco Aurélio', 'Júlio César', 'Augusto'],
    correctIndex: 2,
    explanation:
      'Júlio César proferiu a frase em 49 a.C. ao atravessar o rio Rubicão com suas tropas, ato que selou o início da guerra civil contra Pompeu.',
    category: 'História',
  },
  {
    id: 'q3',
    question: 'No Direito Romano, o que significa o princípio "Pacta sunt servanda"?',
    options: [
      'Os contratos podem ser cancelados a qualquer momento',
      'Os pactos e acordos firmados devem ser rigorosamente cumpridos',
      'Apenas os juízes podem validar acordos',
      'As partes devem pagar metade de cada dívida',
    ],
    correctIndex: 1,
    explanation:
      'É o postulado fundamental do direito das obrigações: aquilo que foi acordado de boa-fé faz lei entre as partes.',
    category: 'Jurídico',
  },
  {
    id: 'q4',
    question: 'Na pronúncia clássica (Restituta), como soa a letra "C" em "Caesar"?',
    options: [
      'Sempre com som de /k/ (como "Kaisar")',
      'Com som de /tch/ (como "Tchêzar")',
      'Com som de /s/ (como no português "César")',
      'Com som mudo',
    ],
    correctIndex: 0,
    explanation:
      'No latim clássico da época de Cícero e César, a letra "C" tinha sempre som oclusivo velar surdo /k/, nunca /s/ ou /tch/.',
    category: 'Pronúncia',
  },
  {
    id: 'q5',
    question: 'Qual caso gramatical latino indica o Sujeito da oração?',
    options: ['Acusativo', 'Genitivo', 'Nominativo', 'Ablativo'],
    correctIndex: 2,
    explanation:
      'O caso Nominativo é reservado ao sujeito e ao predicativo do sujeito em latim (ex: "Dominus venit" = O senhor vem).',
    category: 'Gramática',
  },
];

export const PRONUNCIATION_RULES = [
  {
    letter: 'C',
    classical: 'Sempre som de /k/ (como em "casa"). Ex: Cicero = [Kíkero], Caesar = [Káesar].',
    ecclesiastical: 'Diante de E, I, AE, OE soa como /tch/ (como "tchau"). Ex: Cicero = [Tchítchero].',
  },
  {
    letter: 'V',
    classical: 'Soa como semivogal /w/ (como em "água"). Ex: Veni = [Wêni], Veritas = [Wéritas].',
    ecclesiastical: 'Soa como consoante fricativa /v/ (como no português). Ex: Veni = [Vêni].',
  },
  {
    letter: 'AE / OE',
    classical: 'Pronunciado como ditongo aberto /ae/ e /oe/. Ex: Caelum = [Káilum].',
    ecclesiastical: 'Monotongado, soa simplesmente como /e/. Ex: Caelum = [Tchélum].',
  },
  {
    letter: 'TI + Vogal',
    classical: 'Mantém o som puro de /ti/. Ex: Gratia = [Grátia], Ratio = [Rátio].',
    ecclesiastical: 'Assume som assibilado /tsi/. Ex: Gratia = [Grátsia], Ratio = [Rátsio].',
  },
  {
    letter: 'G',
    classical: 'Sempre som oclusivo sonoro /g/ (como em "gato"). Ex: Genus = [Gênus].',
    ecclesiastical: 'Diante de E e I soa como /dj/ (como em "gente" no italiano). Ex: Regina = [Redjína].',
  },
];

/**
 * Retorna a data no formato do calendário clássico romano
 */
export function getRomanDate(date: Date = new Date()): {
  latinDayOfWeek: string;
  latinFormatted: string;
  portugueseFormatted: string;
} {
  const daysOfWeek = [
    'Dies Solis',
    'Dies Lunae',
    'Dies Martis',
    'Dies Mercurii',
    'Dies Iovis',
    'Dies Veneris',
    'Dies Saturni',
  ];

  const monthsLatin = [
    'Ianuarii',
    'Februarii',
    'Martii',
    'Aprilis',
    'Maii',
    'Iunii',
    'Iulii',
    'Augusti',
    'Septembris',
    'Octobris',
    'Novembris',
    'Decembris',
  ];

  const romanNumerals = (num: number): string => {
    const lookup: [number, string][] = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ];
    let roman = '';
    for (const [val, char] of lookup) {
      while (num >= val) {
        roman += char;
        num -= val;
      }
    }
    return roman;
  };

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayNum = date.getDate();
  const monthName = monthsLatin[date.getMonth()];
  const yearNum = date.getFullYear();

  const latinFormatted = `${dayOfWeek}, ${romanNumerals(dayNum)} ${monthName} ${romanNumerals(yearNum)}`;

  const portugueseFormatted = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    latinDayOfWeek: dayOfWeek,
    latinFormatted,
    portugueseFormatted,
  };
}
