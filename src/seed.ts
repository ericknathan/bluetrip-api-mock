import { fakerPT_BR as faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

interface GenerateEventData {
  name: string;
  description: string;
  imageUrl: string;
}

export function generateEvent(
  data: GenerateEventData
): Omit<Prisma.EventCreateManyInput, "touristicSpotId"> {
  const startDate = dayjs(faker.date.future({ years: 1 }));

  return {
    ...data,
    price: faker.number.float({ min: 0, max: 500 }),
    startDate: startDate.toString(),
    endDate: startDate.add(2, "hour").toString(),
  };
}

export async function generateTouristicSpot({
  events,
  ...data
}: {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  events: GenerateEventData[];
}) {
  return prisma.address.create({
    data: {
      city: faker.location.city(),
      number: faker.location.buildingNumber(),
      state: faker.location.state({ abbreviated: true }),
      street: faker.location.street(),
      zipCode: faker.location.zipCode(),
      neighborhood: faker.location.city(),
      touristicSpot: {
        create: {
          ...data,
          averageRate: faker.number.float({ min: 4, max: 5 }),
          price: faker.number.float({ min: 0, max: 500 }),
          phone: faker.phone.number(),
          events: {
            createMany: {
              data: events.map((event) => generateEvent(event)),
            },
          },
        },
      },
    },
  });
}

async function main() {
  await prisma.event.deleteMany();
  await prisma.touristicSpot.deleteMany();
  await prisma.address.deleteMany();

  await Promise.all([
    generateTouristicSpot({
      name: "Rio Baía Bonita",
      category: "Rio",
      description:
        "Bonito é um verdadeiro paraíso localizado no Mato Grosso do Sul. São inúmeras atividades e roteiros diferenciados perfeitos para quem gosta de ecoturismo. O Rio Baía Bonita funciona como aquário natural, portanto é possível ver diversas espécies de peixes e a rica flora subaquática em seus 800 metros de comprimento. Para praticar a atividade, não é preciso experiência, apenas o uso de snorkell. O local oferece ainda trilhas para caminhada, tirolesa, bar, restaurante, piscina para treinamento de mergulho e museu de história natural.",
      imageUrl:
        "https://www.bonitoway.com.br/public/posts/img_6219_e.jpg?1621123690",
      events: [
        {
          name: "Abismo Anhumas - Mergulho",
          description:
            "O passeio inicia com uma descida de 72 metros por um rapel elétrico com magníficas formações e um lago de águas cristalinas. Cones de até 17 metros de altura com visibilidade de até 60 metros são avistados no mergulho. Discovery desce até 8 metros, e o credenciado até 18 metros. Para a realização do passeio é obrigatório um check-point com um dia de antecedência, assim como a apresentação da credencial de mergulho.",
          imageUrl:
            "https://www.portalbonito.com.br/_arquivos/imagens/2147455517664dff2ec1f938.82634159.webp",
        },
        {
          name: "Bonito Scuba - Mergulho",
          description:
            "O passeio ocorre em meio a cardumes de peixes no impressionante cenário do Rio Formoso, que se caracterizam pelos troncos submersos e formações calcárias. O percurso de aproximadamente 300 metros acompanhado por instrutor. Profundidade de 4 a 6 metros.",
          imageUrl:
            "https://www.portalbonito.com.br/_arquivos/imagens/1480973045664f479bc54578.13579655.webp",
        },
        {
          name: "Gruta do Lago Azul",
          description:
            "O passeio inicia com uma trilha de 200 metros até chegar ao encontro da caverna, desce uma escadaria de aproximadamente 300 degraus, conhecendo diversos espeleotemas, pode-se visualizar o famoso Lago Azul, com mais de 80 metros de profundidade. Por sua beleza e fragilidade, a área da gruta foi transformada em unidade de conservação e é o cartão postal de Bonito.",
          imageUrl:
            "https://www.portalbonito.com.br/_arquivos/imagens/830016207664d1f720e7954.08837708.webp",
        },
        {
          name: "Projeto Salobra",
          description:
            "Como boas vindas no passeio um delicioso café fresco e chipa paraguaia assim iniciando o passeio de carreta puxada por trator até o porto, passeio de barco “Passeio Encontro das Águas”. Retorno ao receptivo podem relaxe no receptivo até o horário do almoço. Logo após, retorna ao porto para iniciar a atividade a tarde na Trilha da Prainha, por mata ciliar por aproximadamente 1km, banho de rio e passeio de barco “Passeio Baía das Arraias”.",
          imageUrl:
            "https://www.portalbonito.com.br/_arquivos/imagens/2010870983664e7697156d79.48916723.webp",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Praia de Copacabana",
      category: "Oceano",
      description:
        "Localizada no Rio de Janeiro, a Praia de Copacabana é famosa por sua extensa faixa de areia e águas cristalinas. Diversas espécies de peixes e crustáceos podem ser encontrados na região, assim como corais e outros organismos marinhos. A praia é um local de preservação ambiental, onde medidas são tomadas para garantir a conservação da vida marinha.",
      imageUrl:
        "https://fortedecopacabana.com.br/wp-content/uploads/2022/09/praia-de-copacabana-copacabana-rio-de-janeiro-rj.png",
      events: [
        {
          name: "Festival de Verão",
          description:
            "Evento anual com shows de música, atividades esportivas e educativas focadas na preservação ambiental. É uma ótima oportunidade para conhecer mais sobre a vida marinha local e participar de atividades de conscientização.",
          imageUrl:
            "https://s2-oglobo.glbimg.com/gsza-NJms0RUg2Qa3-Qbvhu8p8k=/0x0:5184x3456/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/U/R/O9WTPoSJAHFnShRP5Ttg/105622229-20-01-2024-verao-rio-o-globo-projeto-verao-rio-na-praia-de-ipanema.-foto-fabiano-rocha.jpg",
        },
        {
          name: "Campeonato de Surf",
          description:
            "Competição de surf que atrai surfistas de todo o mundo. Além das competições, o evento oferece workshops sobre conservação marinha e exposições sobre a biodiversidade dos oceanos.",
          imageUrl:
            "https://s2.glbimg.com/d9QkqpkgWmCmD61FdZxoc92f5CI=/645x388/i.glbimg.com/og/ig/infoglobo1/f/original/2017/05/25/shorebreakchallenge_henriquepinguim-1342.jpg",
        },
        {
          name: "Maratona Aquática",
          description:
            "Prova de natação em mar aberto, que percorre uma rota de 5 km ao longo da costa de Copacabana. Participantes têm a chance de observar diversas espécies marinhas durante a prova.",
          imageUrl:
            "https://www.competition.com.br/wp-content/uploads/2022/05/iniciar-maratona-aquatica-pexels-sergio-souza.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Baía de Todos os Santos",
      category: "Oceano",
      description:
        "A Baía de Todos os Santos, localizada em Salvador, Bahia, é a maior baía do Brasil e um ecossistema rico em biodiversidade. A região é lar de várias espécies de peixes, moluscos e corais. É um ponto de interesse tanto para turismo quanto para a conservação ambiental.",
      imageUrl:
        "https://grou.com.br/wp-content/uploads/2021/02/bahia-de-todos-os-santos-grou-turismio.jpg",
      events: [
        {
          name: "Regata Salvador",
          description:
            "Competição de vela que acontece anualmente, atraindo competidores de todo o mundo. Além da regata, o evento inclui atividades de conscientização ambiental e exposições sobre a fauna marinha local.",
          imageUrl:
            "https://brasilturis.com.br/storage/2024/04/Com-apoio-da-Setur-BA-Regata-Salvador-Muta-retorna-ao-calendario-do-turismo-nautico-baiano-Foto-Vitor-Maciel-1280x640.png",
        },
        {
          name: "Festival da Mariscada",
          description:
            "Festival gastronômico focado em frutos do mar, com pratos preparados por chefs renomados. Além da degustação, o evento promove palestras sobre a preservação das espécies marinhas da região.",
          imageUrl:
            "https://s2-g1.glbimg.com/oi0ivWERKlxdsLUJ2kUcS3xsRdM=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/A/S/lEoBCBRsqf8Oa8fN9g5A/festival-mariscada-28.mov-snapshot-00.03.876.jpg",
        },
        {
          name: "Passeio de Escuna",
          description:
            "Passeios de barco pela baía, com paradas para mergulho e snorkel em áreas ricas em vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de preservação ambiental em prática.",
          imageUrl:
            "https://angradosreisturismo.com.br/cdn/shop/products/escuna-04_1600x.jpg?v=1661882608",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Fernando de Noronha",
      category: "Oceano",
      description:
        "Fernando de Noronha é um arquipélago vulcânico localizado no Oceano Atlântico. Conhecido por suas praias paradisíacas e rica vida marinha, é um destino de ecoturismo onde é possível observar golfinhos, tartarugas marinhas e uma grande diversidade de peixes e corais.",
      imageUrl:
        "https://i0.wp.com/visitbrasil.com/wp-content/uploads/2021/06/GettyImages-1143798907-2.jpg?fit=2000%2C1333&ssl=1",
      events: [
        {
          name: "Festival Noronha",
          description:
            "Evento que combina música, arte e conscientização ambiental. As atividades incluem palestras sobre a conservação da vida marinha e a importância do ecossistema de Fernando de Noronha.",
          imageUrl:
            "https://gay.blog.br/wp-content/uploads/2022/08/lovenoronha_232475997_577026240328781_2541775947664868393_n.jpg",
        },
        {
          name: "Noronha Dive",
          description:
            "Encontro anual de mergulhadores, com atividades de mergulho livre e autônomo. Os participantes podem explorar a rica vida marinha dos recifes de coral e aprender sobre as práticas de mergulho sustentável.",
          imageUrl:
            "https://www.aventuraspelonossomundo.com.br/wp-content/uploads/2020/06/Mergulho-com-tubarao-em-Fernando-de-Noronha.jpg",
        },
        {
          name: "Semana dos Golfinhos",
          description:
            "Evento focado na observação de golfinhos, com passeios de barco e palestras sobre a biologia e comportamento destes animais. Os participantes também aprendem sobre as medidas de proteção em vigor na região.",
          imageUrl:
            "https://s2-g1.glbimg.com/doY6faZSVCyVrE4q0hrPlhO8RVc=/0x0:1078x619/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/S/3/Bgb5HPTS6cats9a0Cg8w/golfinho-rotador-reproducao.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Praia do Forte",
      category: "Oceano",
      description:
        "Localizada na Bahia, a Praia do Forte é conhecida por seu projeto de conservação de tartarugas marinhas. Além das belas praias, a região oferece uma rica biodiversidade marinha, com recifes de coral e uma grande variedade de peixes.",
      imageUrl:
        "https://pousadacasadoforte.beeweb.net.br/wp-content/uploads/sites/29/2023/02/piscina-natural-01.webp",
      events: [
        {
          name: "Projeto Tamar",
          description:
            "Visitas guiadas ao centro de conservação de tartarugas marinhas, com atividades educativas sobre a importância da preservação destas espécies. Os visitantes podem ver de perto as tartarugas e aprender sobre os esforços de conservação.",
          imageUrl:
            "https://anfitrioesdealuguel.com.br/wp-content/uploads/2019/08/original-457e3ee0c6ba199adc1a192fa31dd85e.jpg",
        },
        {
          name: "Festival do Peixe",
          description:
            "Evento gastronômico com foco em pratos de peixe e frutos do mar. Além da degustação, o festival promove oficinas de culinária e palestras sobre a pesca sustentável e a conservação das espécies marinhas.",
          imageUrl:
            "https://static.escolakids.uol.com.br/2020/11/peixe-palhaco.jpgp",
        },
        {
          name: "Passeio de Catamarã",
          description:
            "Passeios de catamarã ao longo da costa, com paradas para mergulho e snorkel em áreas ricas em corais e vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de conservação em prática.",
          imageUrl:
            "https://blog.parrachos.com.br/wp-content/uploads/2020/11/passeio-de-catamar%C3%A3.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Ilhabela",
      category: "Oceano",
      description:
        "Localizada no litoral norte de São Paulo, Ilhabela é um destino turístico conhecido por suas praias paradisíacas e rica vida marinha. A região é um ponto de interesse para mergulho, onde é possível observar uma grande diversidade de peixes, corais e outros organismos marinhos.",
      imageUrl:
        "https://www.ilhabela.com.br/wp-content/uploads/2020/09/praia-da-pacuiba-ilhabela-home.jpg",
      events: [
        {
          name: "Semana de Vela de Ilhabela",
          description:
            "Competição de vela que atrai velejadores de todo o mundo. Além das regatas, o evento inclui palestras sobre a preservação marinha e exposições sobre a biodiversidade dos oceanos.",
          imageUrl:
            "https://www.ilhabela.com.br/wp-content/uploads/2021/06/48-semana-internacional-de-vela-de-ilhabela-2021-confirmada.jpg",
        },
        {
          name: "Festival do Camarão",
          description:
            "Festival gastronômico focado em pratos preparados com camarão. Além da degustação, o evento promove oficinas de culinária e palestras sobre a pesca sustentável e a conservação das espécies marinhas.",
          imageUrl:
            "https://amigosdepelotas.com.br/wp-content/uploads/2024/01/curiosidades-camarao-tricurioso-1.jpg",
        },
        {
          name: "Mergulho Noturno",
          description:
            "Atividade de mergulho noturno, onde os participantes têm a chance de observar a vida marinha de Ilhabela sob uma nova perspectiva. Guias especializados fornecem informações sobre as espécies avistadas e as práticas de mergulho sustentável.",
          imageUrl:
            "https://orientesub.com.br/wp-content/uploads/2023/03/noturno.webp",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Praia do Rosa",
      category: "Oceano",
      description:
        "Localizada em Santa Catarina, a Praia do Rosa é conhecida por suas belezas naturais e rica biodiversidade marinha. A região é um importante ponto de observação de baleias e oferece diversas atividades relacionadas ao ecoturismo e à preservação ambiental.",
      imageUrl:
        "https://cdn.bitrix24.com.br/b17966311/landing/35d/35d777ee823616ba08d725c27f88ef15/Praia-da-Ferrugem-03-1205x800_2x.jpg",
      events: [
        {
          name: "Festival Baleia Franca",
          description:
            "Evento anual que celebra a presença das baleias francas na região. O festival inclui passeios de barco para observação de baleias, palestras sobre a biologia e conservação destes mamíferos marinhos, e atividades educativas para todas as idades.",
          imageUrl:
            "https://images.ecycle.com.br/wp-content/uploads/2023/07/27160658/todd-cravens-lwACYK8ScmA-unsplash-scaled.jpg.webp",
        },
        {
          name: "Rosa Surf Pro",
          description:
            "Competição de surf que atrai surfistas profissionais de todo o mundo. Além das competições, o evento oferece workshops sobre conservação marinha e exposições sobre a biodiversidade dos oceanos.",
          imageUrl: "https://www.waves.com.br/waves_images.php?foto=169733.jpg",
        },
        {
          name: "Trilha Ecológica",
          description:
            "Atividade de trilha guiada pela região, com foco na observação da flora e fauna locais. Os participantes aprendem sobre as espécies nativas e as medidas de preservação ambiental em prática na Praia do Rosa.",
          imageUrl:
            "https://i.ytimg.com/vi/DW5iko5VedI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGBEgZShiMA8=&rs=AOn4CLDzrNhgq6B45cXSWXDjGqjJHff8sQ",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Arraial do Cabo",
      category: "Oceano",
      description:
        "Arraial do Cabo, localizado no Rio de Janeiro, é conhecido por suas praias de águas cristalinas e rica vida marinha. A região é popular para mergulho, onde é possível observar uma grande diversidade de peixes, corais e outros organismos marinhos.",
      imageUrl:
        "https://www.viajenaviagem.com/wp-content/uploads/2014/09/arraial-do-cabo-pontal-atalaia-homem-intro-thumb-1920x1080-1-960x540.jpg",
      events: [
        {
          name: "Arraial Dive",
          description:
            "Encontro anual de mergulhadores, com atividades de mergulho livre e autônomo. Os participantes podem explorar a rica vida marinha dos recifes de coral e aprender sobre as práticas de mergulho sustentável.",
          imageUrl: "https://www.masterdive.com.br/mergulho-arraial2.jpg",
        },
        {
          name: "Festival do Mar",
          description:
            "Evento que celebra a biodiversidade marinha de Arraial do Cabo, com palestras, exposições e atividades educativas sobre a conservação dos oceanos. O festival também inclui passeios de barco e atividades de snorkel.",
          imageUrl:
            "https://lunetas.com.br/wp-content/uploads/2023/02/festa-iemanja-portal-lunetas.jpg",
        },
        {
          name: "Passeio de Barco",
          description:
            "Passeios de barco pelas praias de Arraial do Cabo, com paradas para mergulho e snorkel em áreas ricas em vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de preservação em prática.",
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/02/ba/be.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Ilha Grande",
      category: "Oceano",
      description:
        "Ilha Grande, localizada no Rio de Janeiro, é um paraíso ecológico com praias intocadas e rica vida marinha. A região é um destino popular para ecoturismo, onde é possível observar uma grande diversidade de peixes, corais e outros organismos marinhos.",
      imageUrl:
        "https://jujunatrip.com/wp-content/uploads/2021/08/dji_0982.jpg",
      events: [
        {
          name: "Festival de Ecoturismo",
          description:
            "Evento que promove atividades de ecoturismo e conservação ambiental. O festival inclui trilhas, passeios de barco, e palestras sobre a importância da preservação da biodiversidade marinha.",
          imageUrl:
            "https://labdicasjornalismo.com/images/noticias/9158/14102021160958_WhatsApp_I.jpeg",
        },
        {
          name: "Mergulho em Naufrágios",
          description:
            "Atividade de mergulho em naufrágios na costa de Ilha Grande. Os participantes têm a chance de explorar os navios afundados e observar a vida marinha que se desenvolveu ao redor deles.",
          imageUrl:
            "https://i0.wp.com/profundonomundo.com/wp-content/uploads/2022/11/Mergulho-em-Recife-Saveiros-Profundo-no-Mundo-4.jpg?resize=800%2C533&ssl=1",
        },
        {
          name: "Caminhada Ecológica",
          description:
            "Trilha guiada pela Mata Atlântica de Ilha Grande, com foco na observação da flora e fauna locais. Os participantes aprendem sobre as espécies nativas e as medidas de preservação ambiental em prática na região.",
          imageUrl:
            "https://www.marinha.mil.br/com3dn/sites/www.marinha.mil.br.com3dn/files/styles/galleryformatter_slide/public/upload/Crian%C3%A7as%20do%20projeto%20For%C3%A7as%20no%20Esporte%20durante%20a%20coleta.jpg?itok=zHln8F2t",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Porto de Galinhas",
      category: "Oceano",
      description:
        "Porto de Galinhas, localizado em Pernambuco, é conhecido por suas piscinas naturais e rica vida marinha. A região oferece diversas atividades de ecoturismo, como mergulho e passeios de jangada, onde é possível observar uma grande diversidade de peixes e corais.",
      imageUrl:
        "https://www.viajenaviagem.com/wp-content/uploads/2015/12/piscinas-naturais-porto-de-galinhas.jpg",
      events: [
        {
          name: "Festival de Jangadas",
          description:
            "Evento tradicional que celebra a cultura local e a importância das jangadas. O festival inclui passeios de jangada, atividades culturais e palestras sobre a preservação da vida marinha.",
          imageUrl:
            "https://www.dicasportodegalinhas.com.br/wp-content/uploads/2020/07/@quelmarchiori__1-1980x1484.jpg",
        },
        {
          name: "Mergulho nas Piscinas Naturais",
          description:
            "Atividade de mergulho nas piscinas naturais de Porto de Galinhas, onde os participantes podem observar a vida marinha de perto. Guias especializados fornecem informações sobre as espécies avistadas e as práticas de mergulho sustentável.",
          imageUrl:
            "https://partiupelomundo.com/wp-content/uploads/2020/09/como-ir-as-piscinas-naturais-de-porto-de-galinhas.jpg",
        },
        {
          name: "Passeio de Buggy",
          description:
            "Passeio de buggy pelas praias de Porto de Galinhas, com paradas para mergulho e snorkel em áreas ricas em vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de preservação em prática.",
          imageUrl:
            "https://pgsocial-media.s3.sa-east-1.amazonaws.com/wp-content/uploads/2020/10/27114458/buggy-hor2-5dfdaf2e-641b-4415-b2e8-fdf297a55ef2.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Praia da Pipa",
      category: "Oceano",
      description:
        "Localizada no Rio Grande do Norte, a Praia da Pipa é conhecida por suas falésias, praias de águas cristalinas e rica vida marinha. A região é um destino popular para ecoturismo, onde é possível observar golfinhos e tartarugas marinhas.",
      imageUrl: "https://imgmd.net/image/upload/v1/guia/1918103.jpg",
      events: [
        {
          name: "Festival de Música de Pipa",
          description:
            "Evento anual que reúne músicos de diversos gêneros para shows ao ar livre. Além da música, o festival promove atividades de conscientização ambiental e exposições sobre a biodiversidade marinha.",
          imageUrl:
            "https://preservepipa.com/wp-content/uploads/2023/06/fest-bossa-e-jazz-2023-na-praia-da-pipa-scaled.jpeg",
        },
        {
          name: "Passeio Ecológico de Barco",
          description:
            "Passeios de barco pela costa de Pipa, com foco na observação de golfinhos e tartarugas marinhas. Guias especializados fornecem informações sobre as espécies avistadas e as medidas de conservação em prática.",
          imageUrl:
            "https://preservepipa.com/wp-content/uploads/2023/02/entremarescatamara.jpg",
        },
        {
          name: "Trilha das Falésias",
          description:
            "Trilha guiada pelas falésias da Praia da Pipa, com foco na observação da flora e fauna locais. Os participantes aprendem sobre as espécies nativas e as medidas de preservação ambiental em prática na região.",
          imageUrl:
            "https://viajenaweb.com/wp-content/uploads/2017/02/Trilhas-das-falesias-de-Etretat-na-Franca.jpg.webp",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Great Barrier Reef",
      category: "Oceano",
      description:
        "A Grande Barreira de Corais, localizada na Austrália, é o maior sistema de recifes de coral do mundo. É lar de milhares de espécies marinhas, incluindo peixes, corais, tubarões, raias e tartarugas marinhas. A área é conhecida por sua beleza natural e biodiversidade incrível.",
      imageUrl:
        "https://cdn.britannica.com/64/155864-050-34FBD7A2/view-Great-Barrier-Reef-Australia-coast.jpg",
      events: [
        {
          name: "Reef Fest",
          description:
            "Festival anual que celebra a Grande Barreira de Corais com atividades educativas, workshops e excursões de snorkel e mergulho. O evento promove a conscientização sobre a conservação dos recifes e a biodiversidade marinha.",
          imageUrl:
            "https://www.greatbarrierreeffestival.com.au/wp-content/uploads/2019/07/P1-Fireworks-on-the-Foreshore.jpg",
        },
        {
          name: "Coral Spawning Season",
          description:
            "Evento natural onde os corais liberam seus gametas para reprodução. Guias especializados conduzem mergulhos noturnos para observar este fenômeno incrível, proporcionando uma experiência única para os participantes.",
          imageUrl:
            "https://blog.csiro.au/wp-content/uploads/2019/08/coral-spawn-Gary_DSC0725.jpg",
        },
        {
          name: "Marine Biologist for a Day",
          description:
            "Programa educativo onde os participantes podem acompanhar biólogos marinhos em suas atividades diárias, aprendendo sobre as pesquisas em andamento e as estratégias de conservação do recife.",
          imageUrl:
            "https://www2.gbrmpa.gov.au/sites/default/files/2022-06/Copyright-Commonwealth-of-Australia-Reef-Authority-BAMFAD-2%20%281%20of%201%29.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Galápagos Islands",
      category: "Oceano",
      description:
        "As Ilhas Galápagos, localizadas no Oceano Pacífico, são conhecidas por sua biodiversidade única e ecossistemas marinhos. Lar de espécies como as tartarugas gigantes, leões marinhos, iguanas marinhas e uma variedade de aves marinhas, as ilhas são um destino de ecoturismo e pesquisa científica.",
      imageUrl:
        "https://www.travelandleisure.com/thmb/WzL019sDotA4SIo4bacRrE4j_N0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/galapagos-islands-ecuador-GALAPA1104-d013219debf14369ab5039a4eafb496e.jpg",
      events: [
        {
          name: "Galápagos Wildlife Festival",
          description:
            "Festival anual que celebra a fauna única das Galápagos, com atividades educativas, tours guiados e palestras de cientistas sobre a importância da preservação dos ecossistemas locais.",
          imageUrl:
            "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2022/4/1/GettyImages-690066377.jpg.rend.hgtvcom.616.411.suffix/1648839351194.jpeg",
        },
        {
          name: "Marine Reserve Snorkeling Tour",
          description:
            "Passeios de snorkel pela Reserva Marinha das Galápagos, onde os participantes podem observar diversas espécies marinhas em seu habitat natural, incluindo tartarugas marinhas, peixes coloridos e tubarões.",
          imageUrl:
            "https://snorkeladw.com/wp-content/uploads/2019/08/cropped-hol_chan_marine.jpg",
        },
        {
          name: "Charles Darwin Research Station Visit",
          description:
            "Visita à Estação de Pesquisa Charles Darwin, onde os visitantes podem aprender sobre os programas de conservação e as pesquisas em andamento para proteger as espécies nativas das ilhas.",
          imageUrl:
            "https://www.darwinfoundation.org/media/images/ExterioresECCD_JuanManuelGarcia-FCD-1-bann.max-1000x1000.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Maui",
      category: "Oceano",
      description:
        "Maui, uma das ilhas do Havaí, é conhecida por suas praias de areia dourada, águas cristalinas e rica vida marinha. A ilha é um destino popular para atividades como mergulho, snorkel e observação de baleias, oferecendo uma grande diversidade de espécies marinhas para explorar.",
      imageUrl:
        "https://afar.brightspotcdn.com/dims4/default/1b0a008/2147483647/strip/true/crop/3000x1592+0+164/resize/1440x764!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2F76%2F04%2Fae335e0b47aabd529fbb6914da24%2Ftravelguides-maui-danitadelimont-shutterstock.jpg",
      events: [
        {
          name: "Maui Whale Festival",
          description:
            "Festival anual que celebra a migração das baleias jubarte, com atividades de observação de baleias, workshops e palestras sobre a conservação destes mamíferos marinhos.",
          imageUrl:
            "https://d6qyz3em3b312.cloudfront.net/upload/images/media/2020/01/10/73375624_2671278932893839_2603196913809358848_o.2048x1024.jpg",
        },
        {
          name: "Maui Ocean Center Night Dive",
          description:
            "Mergulho noturno no Maui Ocean Center, onde os participantes podem observar a vida marinha sob uma nova perspectiva, incluindo tubarões, raias e outras espécies noturnas.",
          imageUrl:
            "https://mauioceancenter.com/wp-content/uploads/2018/02/Shark-Dive-Maui-11-web-1-1024x683.jpg",
        },
        {
          name: "Hanauma Bay Snorkeling Tour",
          description:
            "Passeio de snorkel na Baía de Hanauma, famosa por seus recifes de coral e abundante vida marinha. Guias especializados fornecem informações sobre as espécies avistadas e as práticas de conservação em prática.",
          imageUrl:
            "https://hanaumabaysnorkel.com/wp-content/uploads/2017/10/snorkelingO.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Palau",
      category: "Oceano",
      description:
        "Palau, localizada na Micronésia, é conhecida por suas lagoas azul-turquesa e rica biodiversidade marinha. É um destino popular para mergulho, onde os visitantes podem explorar recifes de coral, naufrágios e uma grande variedade de espécies marinhas.",
      imageUrl:
        "https://mediaim.expedia.com/destination/1/49c7626f0867bde13cc633eab57f5b84.jpg",
      events: [
        {
          name: "Palau Shark Week",
          description:
            "Evento anual que celebra os tubarões e promove a conservação destes predadores marinhos. Inclui mergulhos guiados, palestras de especialistas e atividades educativas para todas as idades.",
          imageUrl: "https://fishnfins.com/images/shark%20week/sw6.jpg",
        },
        {
          name: "Rock Islands Kayaking",
          description:
            "Passeio de caiaque pelas Rock Islands, onde os participantes podem explorar as águas cristalinas e observar a vida marinha, incluindo peixes coloridos, raias e tubarões.",
          imageUrl:
            "https://media.worldnomads.com/explore/palau/kayaking-palau-social.jpg",
        },
        {
          name: "Jellyfish Lake Snorkeling",
          description:
            "Snorkeling no Lago das Águas-vivas, uma experiência única onde os participantes podem nadar entre milhares de águas-vivas não urticantes, aprendendo sobre este ecossistema único.",
          imageUrl: "https://media.nomadicmatt.com/2021/jellyfishlakenew.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Maldives",
      category: "Oceano",
      description:
        "As Maldivas, localizadas no Oceano Índico, são conhecidas por suas ilhas paradisíacas, águas cristalinas e recifes de coral. A região é um destino popular para mergulho e snorkel, oferecendo uma rica diversidade de vida marinha, incluindo peixes tropicais, tubarões e raias.",
      imageUrl:
        "https://ilhasmaldivas.com.br/wp-content/uploads/2021/10/ilhas-maldivas-galeria-vakkaru-resort-02.jpg",
      events: [
        {
          name: "Maldives Underwater Festival",
          description:
            "Festival subaquático que celebra a rica biodiversidade marinha das Maldivas. Inclui mergulhos guiados, exposições de fotografia subaquática e palestras sobre a conservação dos recifes de coral.",
          imageUrl:
            "https://www.scubadivermag.com/wp-content/uploads/2018/07/iBubble.jpg",
        },
        {
          name: "Manta Ray Migration",
          description:
            "Evento sazonal onde os participantes podem observar a migração das raias manta. Passeios de snorkel e mergulho são organizados para permitir uma observação de perto desses majestosos animais.",
          imageUrl:
            "https://i0.wp.com/www.divecabo.com/wp-content/uploads/2023/04/Mobula-2-Adobe-copy-Edit.jpg?w=980&ssl=1",
        },
        {
          name: "Coral Planting Workshop",
          description:
            "Oficina prática onde os participantes podem aprender sobre a importância dos corais e participar de atividades de plantio de corais, ajudando na restauração dos recifes das Maldivas.",
          imageUrl:
            "https://reefresilience.org/wp-content/uploads/tnc_69045916_preview_cropped-1024x684.jpg",
        },
      ],
    }),
  ]);

  await prisma.localBusiness.createMany({
    data: [
      {
        tradeName: "Ocean's Delight Seafood Restaurant",
        description:
          "Restaurante especializado em frutos do mar frescos, localizado próximo à praia, oferecendo uma variedade de pratos regionais.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.oceansdelight.com",
        openHour: "10:00",
        closeHour: "22:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Restaurante",
      },
      {
        tradeName: "Dive Deep Scuba Center",
        description:
          "Centro de mergulho que oferece cursos de certificação e excursões guiadas para explorar os recifes locais.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.divedeep.com",
        openHour: "08:00",
        closeHour: "18:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Centro de Mergulho",
      },
      {
        tradeName: "Blue Wave Surf Shop",
        description:
          "Loja especializada em equipamentos de surfe, incluindo pranchas, roupas de neoprene e acessórios.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.bluewavesurf.com",
        openHour: "09:00",
        closeHour: "20:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Loja de Esportes",
      },
      {
        tradeName: "Seaside Souvenirs",
        description:
          "Loja de souvenirs que oferece uma variedade de lembranças temáticas de praia e oceanos.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.seasidesouvenirs.com",
        openHour: "10:00",
        closeHour: "22:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Loja de Souvenirs",
      },
      {
        tradeName: "Coral Reef Spa",
        description:
          "Spa luxuoso que oferece tratamentos relaxantes com vistas para o oceano, utilizando produtos naturais.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.coralreefspa.com",
        openHour: "09:00",
        closeHour: "21:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Spa",
      },
      {
        tradeName: "Marine Life Aquarium",
        description:
          "Aquário que exibe uma vasta gama de espécies marinhas e oferece programas educativos para todas as idades.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.marinelifeaquarium.com",
        openHour: "10:00",
        closeHour: "18:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Aquário",
      },
      {
        tradeName: "Sunset Cruises",
        description:
          "Empresa que oferece cruzeiros ao pôr do sol, proporcionando vistas deslumbrantes e jantares românticos a bordo.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.sunsetcruises.com",
        openHour: "17:00",
        closeHour: "21:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Cruzeiros",
      },
      {
        tradeName: "Ocean Explorers Kayak Rentals",
        description:
          "Empresa de aluguel de caiaques que oferece equipamentos e excursões guiadas para explorar as águas locais.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.oceanexplorers.com",
        openHour: "07:00",
        closeHour: "19:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Aluguel de Equipamentos",
      },
      {
        tradeName: "Underwater Photography",
        description:
          "Serviço especializado em fotografia subaquática, oferecendo sessões de fotos personalizadas e workshops.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.underwaterphotography.com",
        openHour: "09:00",
        closeHour: "18:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Fotografia",
      },
      {
        tradeName: "Lagoon Lodge",
        description:
          "Hotel boutique localizado à beira de um lago, oferecendo acomodações luxuosas e atividades aquáticas.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.lagoonlodge.com",
        openHour: "24 horas",
        closeHour: "24 horas",
        phoneNumber: faker.phone.number(),
        businessCategory: "Hotel",
      },
      {
        tradeName: "Tropical Watersports",
        description:
          "Empresa de esportes aquáticos que oferece uma variedade de atividades, como jet ski, parasailing e wakeboard.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.tropicalwatersports.com",
        openHour: "08:00",
        closeHour: "18:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Esportes Aquáticos",
      },
      {
        tradeName: "Reef Conservation Society",
        description:
          "ONG dedicada à conservação dos recifes de coral, oferecendo programas de voluntariado e educação ambiental.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.reefconservation.org",
        openHour: "09:00",
        closeHour: "17:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "ONG",
      },
      {
        tradeName: "Bay View Café",
        description:
          "Café com vistas panorâmicas da baía, oferecendo uma variedade de bebidas e pratos leves.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.bayviewcafe.com",
        openHour: "07:00",
        closeHour: "19:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Café",
      },
      {
        tradeName: "Fisherman's Wharf",
        description:
          "Mercado de peixe local onde os visitantes podem comprar frutos do mar frescos diretamente dos pescadores.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.fishermanswharf.com",
        openHour: "06:00",
        closeHour: "14:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Mercado",
      },
      {
        tradeName: "Oceania Boat Rentals",
        description:
          "Empresa de aluguel de barcos que oferece uma variedade de embarcações para explorar a costa.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.oceaniaboatrentals.com",
        openHour: "08:00",
        closeHour: "18:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Aluguel de Equipamentos",
      },
      {
        tradeName: "Tide Pools Café",
        description:
          "Café temático focado em culinária local e frutos do mar, com uma decoração inspirada nas piscinas naturais.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.tidepoolscafe.com",
        openHour: "07:00",
        closeHour: "21:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Café",
      },
      {
        tradeName: "Seascape Jewelry",
        description:
          "Joalheria especializada em peças inspiradas no oceano, usando materiais naturais como conchas e pérolas.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.seascapejewelry.com",
        openHour: "10:00",
        closeHour: "20:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Joalheria",
      },
      {
        tradeName: "Ocean Breeze Yoga",
        description:
          "Estúdio de yoga à beira-mar, oferecendo aulas com vista para o oceano e sessões de meditação ao pôr do sol.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.oceanbreezeyoga.com",
        openHour: "06:00",
        closeHour: "20:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Yoga",
      },
      {
        tradeName: "Dolphin Tours",
        description:
          "Empresa que oferece passeios de barco para observação de golfinhos em seu habitat natural.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.dolphintours.com",
        openHour: "08:00",
        closeHour: "17:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Passeios Turísticos",
      },
      {
        tradeName: "Coastal Fitness Center",
        description:
          "Academia localizada próxima à praia, oferecendo aulas de fitness ao ar livre e programas de treinamento personalizados.",
        averageRating: faker.number.float({ min: 4, max: 5 }),
        websiteUrl: "https://www.coastalfitness.com",
        openHour: "05:00",
        closeHour: "22:00",
        phoneNumber: faker.phone.number(),
        businessCategory: "Academia",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
