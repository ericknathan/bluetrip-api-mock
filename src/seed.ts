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
  const startDate = faker.date.future({ years: 1 });

  return {
    ...data,
    price: faker.number.float({ min: 0, max: 500 }),
    startDate: startDate.toString(),
    endDate: dayjs(startDate).add(2, "hour").toString(),
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
          averageRate: faker.number.float({ min: 3, max: 5 }),
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
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/copacabana.jpg",
      events: [
        {
          name: "Festival de Verão",
          description:
            "Evento anual com shows de música, atividades esportivas e educativas focadas na preservação ambiental. É uma ótima oportunidade para conhecer mais sobre a vida marinha local e participar de atividades de conscientização.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-verao.jpg",
        },
        {
          name: "Campeonato de Surf",
          description:
            "Competição de surf que atrai surfistas de todo o mundo. Além das competições, o evento oferece workshops sobre conservação marinha e exposições sobre a biodiversidade dos oceanos.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/campeonato-surf.jpg",
        },
        {
          name: "Maratona Aquática",
          description:
            "Prova de natação em mar aberto, que percorre uma rota de 5 km ao longo da costa de Copacabana. Participantes têm a chance de observar diversas espécies marinhas durante a prova.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/maratona-aquatica.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Baía de Todos os Santos",
      category: "Oceano",
      description:
        "A Baía de Todos os Santos, localizada em Salvador, Bahia, é a maior baía do Brasil e um ecossistema rico em biodiversidade. A região é lar de várias espécies de peixes, moluscos e corais. É um ponto de interesse tanto para turismo quanto para a conservação ambiental.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/baia-todos-santos.jpg",
      events: [
        {
          name: "Regata Salvador",
          description:
            "Competição de vela que acontece anualmente, atraindo competidores de todo o mundo. Além da regata, o evento inclui atividades de conscientização ambiental e exposições sobre a fauna marinha local.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/regata-salvador.jpg",
        },
        {
          name: "Festival da Mariscada",
          description:
            "Festival gastronômico focado em frutos do mar, com pratos preparados por chefs renomados. Além da degustação, o evento promove palestras sobre a preservação das espécies marinhas da região.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-mariscada.jpg",
        },
        {
          name: "Passeio de Escuna",
          description:
            "Passeios de barco pela baía, com paradas para mergulho e snorkel em áreas ricas em vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de preservação ambiental em prática.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/passeio-escuna.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Fernando de Noronha",
      category: "Oceano",
      description:
        "Fernando de Noronha é um arquipélago vulcânico localizado no Oceano Atlântico. Conhecido por suas praias paradisíacas e rica vida marinha, é um destino de ecoturismo onde é possível observar golfinhos, tartarugas marinhas e uma grande diversidade de peixes e corais.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/fernando-noronha.jpg",
      events: [
        {
          name: "Festival Noronha",
          description:
            "Evento que combina música, arte e conscientização ambiental. As atividades incluem palestras sobre a conservação da vida marinha e a importância do ecossistema de Fernando de Noronha.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-noronha.jpg",
        },
        {
          name: "Noronha Dive",
          description:
            "Encontro anual de mergulhadores, com atividades de mergulho livre e autônomo. Os participantes podem explorar a rica vida marinha dos recifes de coral e aprender sobre as práticas de mergulho sustentável.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/noronha-dive.jpg",
        },
        {
          name: "Semana dos Golfinhos",
          description:
            "Evento focado na observação de golfinhos, com passeios de barco e palestras sobre a biologia e comportamento destes animais. Os participantes também aprendem sobre as medidas de proteção em vigor na região.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/semana-golfinhos.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Praia do Forte",
      category: "Oceano",
      description:
        "Localizada na Bahia, a Praia do Forte é conhecida por seu projeto de conservação de tartarugas marinhas. Além das belas praias, a região oferece uma rica biodiversidade marinha, com recifes de coral e uma grande variedade de peixes.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/praia-do-forte.jpg",
      events: [
        {
          name: "Projeto Tamar",
          description:
            "Visitas guiadas ao centro de conservação de tartarugas marinhas, com atividades educativas sobre a importância da preservação destas espécies. Os visitantes podem ver de perto as tartarugas e aprender sobre os esforços de conservação.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/projeto-tamar.jpg",
        },
        {
          name: "Festival do Peixe",
          description:
            "Evento gastronômico com foco em pratos de peixe e frutos do mar. Além da degustação, o festival promove oficinas de culinária e palestras sobre a pesca sustentável e a conservação das espécies marinhas.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-peixe.jpg",
        },
        {
          name: "Passeio de Catamarã",
          description:
            "Passeios de catamarã ao longo da costa, com paradas para mergulho e snorkel em áreas ricas em corais e vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de conservação em prática.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/passeio-catamara.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Ilhabela",
      category: "Oceano",
      description:
        "Localizada no litoral norte de São Paulo, Ilhabela é um destino turístico conhecido por suas praias paradisíacas e rica vida marinha. A região é um ponto de interesse para mergulho, onde é possível observar uma grande diversidade de peixes, corais e outros organismos marinhos.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/ilhabela.jpg",
      events: [
        {
          name: "Semana de Vela de Ilhabela",
          description:
            "Competição de vela que atrai velejadores de todo o mundo. Além das regatas, o evento inclui palestras sobre a preservação marinha e exposições sobre a biodiversidade dos oceanos.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/semana-vela.jpg",
        },
        {
          name: "Festival do Camarão",
          description:
            "Festival gastronômico focado em pratos preparados com camarão. Além da degustação, o evento promove oficinas de culinária e palestras sobre a pesca sustentável e a conservação das espécies marinhas.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-camarao.jpg",
        },
        {
          name: "Mergulho Noturno",
          description:
            "Atividade de mergulho noturno, onde os participantes têm a chance de observar a vida marinha de Ilhabela sob uma nova perspectiva. Guias especializados fornecem informações sobre as espécies avistadas e as práticas de mergulho sustentável.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/mergulho-noturno.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Praia do Rosa",
      category: "Oceano",
      description:
        "Localizada em Santa Catarina, a Praia do Rosa é conhecida por suas belezas naturais e rica biodiversidade marinha. A região é um importante ponto de observação de baleias e oferece diversas atividades relacionadas ao ecoturismo e à preservação ambiental.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/praia-rosa.jpg",
      events: [
        {
          name: "Festival Baleia Franca",
          description:
            "Evento anual que celebra a presença das baleias francas na região. O festival inclui passeios de barco para observação de baleias, palestras sobre a biologia e conservação destes mamíferos marinhos, e atividades educativas para todas as idades.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-baleia.jpg",
        },
        {
          name: "Rosa Surf Pro",
          description:
            "Competição de surf que atrai surfistas profissionais de todo o mundo. Além das competições, o evento oferece workshops sobre conservação marinha e exposições sobre a biodiversidade dos oceanos.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/rosa-surf.jpg",
        },
        {
          name: "Trilha Ecológica",
          description:
            "Atividade de trilha guiada pela região, com foco na observação da flora e fauna locais. Os participantes aprendem sobre as espécies nativas e as medidas de preservação ambiental em prática na Praia do Rosa.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/trilha-ecologica.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Arraial do Cabo",
      category: "Oceano",
      description:
        "Arraial do Cabo, localizado no Rio de Janeiro, é conhecido por suas praias de águas cristalinas e rica vida marinha. A região é popular para mergulho, onde é possível observar uma grande diversidade de peixes, corais e outros organismos marinhos.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/arraial-cabo.jpg",
      events: [
        {
          name: "Arraial Dive",
          description:
            "Encontro anual de mergulhadores, com atividades de mergulho livre e autônomo. Os participantes podem explorar a rica vida marinha dos recifes de coral e aprender sobre as práticas de mergulho sustentável.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/arraial-dive.jpg",
        },
        {
          name: "Festival do Mar",
          description:
            "Evento que celebra a biodiversidade marinha de Arraial do Cabo, com palestras, exposições e atividades educativas sobre a conservação dos oceanos. O festival também inclui passeios de barco e atividades de snorkel.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-mar.jpg",
        },
        {
          name: "Passeio de Barco",
          description:
            "Passeios de barco pelas praias de Arraial do Cabo, com paradas para mergulho e snorkel em áreas ricas em vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de preservação em prática.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/passeio-barco.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Ilha Grande",
      category: "Oceano",
      description:
        "Ilha Grande, localizada no Rio de Janeiro, é um paraíso ecológico com praias intocadas e rica vida marinha. A região é um destino popular para ecoturismo, onde é possível observar uma grande diversidade de peixes, corais e outros organismos marinhos.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/ilha-grande.jpg",
      events: [
        {
          name: "Festival de Ecoturismo",
          description:
            "Evento que promove atividades de ecoturismo e conservação ambiental. O festival inclui trilhas, passeios de barco, e palestras sobre a importância da preservação da biodiversidade marinha.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-ecoturismo.jpg",
        },
        {
          name: "Mergulho em Naufrágios",
          description:
            "Atividade de mergulho em naufrágios na costa de Ilha Grande. Os participantes têm a chance de explorar os navios afundados e observar a vida marinha que se desenvolveu ao redor deles.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/mergulho-naufragios.jpg",
        },
        {
          name: "Caminhada Ecológica",
          description:
            "Trilha guiada pela Mata Atlântica de Ilha Grande, com foco na observação da flora e fauna locais. Os participantes aprendem sobre as espécies nativas e as medidas de preservação ambiental em prática na região.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/caminhada-ecologica.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Porto de Galinhas",
      category: "Oceano",
      description:
        "Porto de Galinhas, localizado em Pernambuco, é conhecido por suas piscinas naturais e rica vida marinha. A região oferece diversas atividades de ecoturismo, como mergulho e passeios de jangada, onde é possível observar uma grande diversidade de peixes e corais.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/porto-galinhas.jpg",
      events: [
        {
          name: "Festival de Jangadas",
          description:
            "Evento tradicional que celebra a cultura local e a importância das jangadas. O festival inclui passeios de jangada, atividades culturais e palestras sobre a preservação da vida marinha.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-jangadas.jpg",
        },
        {
          name: "Mergulho nas Piscinas Naturais",
          description:
            "Atividade de mergulho nas piscinas naturais de Porto de Galinhas, onde os participantes podem observar a vida marinha de perto. Guias especializados fornecem informações sobre as espécies avistadas e as práticas de mergulho sustentável.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/mergulho-piscinas.jpg",
        },
        {
          name: "Passeio de Buggy",
          description:
            "Passeio de buggy pelas praias de Porto de Galinhas, com paradas para mergulho e snorkel em áreas ricas em vida marinha. Os guias fornecem informações sobre as espécies avistadas e as medidas de preservação em prática.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/passeio-buggy.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Praia da Pipa",
      category: "Oceano",
      description:
        "Localizada no Rio Grande do Norte, a Praia da Pipa é conhecida por suas falésias, praias de águas cristalinas e rica vida marinha. A região é um destino popular para ecoturismo, onde é possível observar golfinhos e tartarugas marinhas.",
      imageUrl:
        "https://www.visitbrasil.com/wp-content/uploads/2020/08/praia-pipa.jpg",
      events: [
        {
          name: "Festival de Música de Pipa",
          description:
            "Evento anual que reúne músicos de diversos gêneros para shows ao ar livre. Além da música, o festival promove atividades de conscientização ambiental e exposições sobre a biodiversidade marinha.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/festival-musica.jpg",
        },
        {
          name: "Passeio Ecológico de Barco",
          description:
            "Passeios de barco pela costa de Pipa, com foco na observação de golfinhos e tartarugas marinhas. Guias especializados fornecem informações sobre as espécies avistadas e as medidas de conservação em prática.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/passeio-barco.jpg",
        },
        {
          name: "Trilha das Falésias",
          description:
            "Trilha guiada pelas falésias da Praia da Pipa, com foco na observação da flora e fauna locais. Os participantes aprendem sobre as espécies nativas e as medidas de preservação ambiental em prática na região.",
          imageUrl:
            "https://www.visitbrasil.com/wp-content/uploads/2020/08/trilha-falesias.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Great Barrier Reef",
      category: "Oceano",
      description:
        "A Grande Barreira de Corais, localizada na Austrália, é o maior sistema de recifes de coral do mundo. É lar de milhares de espécies marinhas, incluindo peixes, corais, tubarões, raias e tartarugas marinhas. A área é conhecida por sua beleza natural e biodiversidade incrível.",
      imageUrl:
        "https://www.visitqueensland.com/wp-content/uploads/2020/08/great-barrier-reef.jpg",
      events: [
        {
          name: "Reef Fest",
          description:
            "Festival anual que celebra a Grande Barreira de Corais com atividades educativas, workshops e excursões de snorkel e mergulho. O evento promove a conscientização sobre a conservação dos recifes e a biodiversidade marinha.",
          imageUrl:
            "https://www.visitqueensland.com/wp-content/uploads/2020/08/reef-fest.jpg",
        },
        {
          name: "Coral Spawning Season",
          description:
            "Evento natural onde os corais liberam seus gametas para reprodução. Guias especializados conduzem mergulhos noturnos para observar este fenômeno incrível, proporcionando uma experiência única para os participantes.",
          imageUrl:
            "https://www.visitqueensland.com/wp-content/uploads/2020/08/coral-spawning.jpg",
        },
        {
          name: "Marine Biologist for a Day",
          description:
            "Programa educativo onde os participantes podem acompanhar biólogos marinhos em suas atividades diárias, aprendendo sobre as pesquisas em andamento e as estratégias de conservação do recife.",
          imageUrl:
            "https://www.visitqueensland.com/wp-content/uploads/2020/08/marine-biologist.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Galápagos Islands",
      category: "Oceano",
      description:
        "As Ilhas Galápagos, localizadas no Oceano Pacífico, são conhecidas por sua biodiversidade única e ecossistemas marinhos. Lar de espécies como as tartarugas gigantes, leões marinhos, iguanas marinhas e uma variedade de aves marinhas, as ilhas são um destino de ecoturismo e pesquisa científica.",
      imageUrl:
        "https://www.visitecuador.com/wp-content/uploads/2020/08/galapagos.jpg",
      events: [
        {
          name: "Galápagos Wildlife Festival",
          description:
            "Festival anual que celebra a fauna única das Galápagos, com atividades educativas, tours guiados e palestras de cientistas sobre a importância da preservação dos ecossistemas locais.",
          imageUrl:
            "https://www.visitecuador.com/wp-content/uploads/2020/08/wildlife-festival.jpg",
        },
        {
          name: "Marine Reserve Snorkeling Tour",
          description:
            "Passeios de snorkel pela Reserva Marinha das Galápagos, onde os participantes podem observar diversas espécies marinhas em seu habitat natural, incluindo tartarugas marinhas, peixes coloridos e tubarões.",
          imageUrl:
            "https://www.visitecuador.com/wp-content/uploads/2020/08/snorkeling-tour.jpg",
        },
        {
          name: "Charles Darwin Research Station Visit",
          description:
            "Visita à Estação de Pesquisa Charles Darwin, onde os visitantes podem aprender sobre os programas de conservação e as pesquisas em andamento para proteger as espécies nativas das ilhas.",
          imageUrl:
            "https://www.visitecuador.com/wp-content/uploads/2020/08/darwin-research.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Maui",
      category: "Oceano",
      description:
        "Maui, uma das ilhas do Havaí, é conhecida por suas praias de areia dourada, águas cristalinas e rica vida marinha. A ilha é um destino popular para atividades como mergulho, snorkel e observação de baleias, oferecendo uma grande diversidade de espécies marinhas para explorar.",
      imageUrl:
        "https://www.visithawaii.com/wp-content/uploads/2020/08/maui.jpg",
      events: [
        {
          name: "Maui Whale Festival",
          description:
            "Festival anual que celebra a migração das baleias jubarte, com atividades de observação de baleias, workshops e palestras sobre a conservação destes mamíferos marinhos.",
          imageUrl:
            "https://www.visithawaii.com/wp-content/uploads/2020/08/whale-festival.jpg",
        },
        {
          name: "Maui Ocean Center Night Dive",
          description:
            "Mergulho noturno no Maui Ocean Center, onde os participantes podem observar a vida marinha sob uma nova perspectiva, incluindo tubarões, raias e outras espécies noturnas.",
          imageUrl:
            "https://www.visithawaii.com/wp-content/uploads/2020/08/night-dive.jpg",
        },
        {
          name: "Hanauma Bay Snorkeling Tour",
          description:
            "Passeio de snorkel na Baía de Hanauma, famosa por seus recifes de coral e abundante vida marinha. Guias especializados fornecem informações sobre as espécies avistadas e as práticas de conservação em prática.",
          imageUrl:
            "https://www.visithawaii.com/wp-content/uploads/2020/08/snorkeling-tour.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Palau",
      category: "Oceano",
      description:
        "Palau, localizada na Micronésia, é conhecida por suas lagoas azul-turquesa e rica biodiversidade marinha. É um destino popular para mergulho, onde os visitantes podem explorar recifes de coral, naufrágios e uma grande variedade de espécies marinhas.",
      imageUrl:
        "https://www.visitpalau.com/wp-content/uploads/2020/08/palau.jpg",
      events: [
        {
          name: "Palau Shark Week",
          description:
            "Evento anual que celebra os tubarões e promove a conservação destes predadores marinhos. Inclui mergulhos guiados, palestras de especialistas e atividades educativas para todas as idades.",
          imageUrl:
            "https://www.visitpalau.com/wp-content/uploads/2020/08/shark-week.jpg",
        },
        {
          name: "Rock Islands Kayaking",
          description:
            "Passeio de caiaque pelas Rock Islands, onde os participantes podem explorar as águas cristalinas e observar a vida marinha, incluindo peixes coloridos, raias e tubarões.",
          imageUrl:
            "https://www.visitpalau.com/wp-content/uploads/2020/08/kayaking.jpg",
        },
        {
          name: "Jellyfish Lake Snorkeling",
          description:
            "Snorkeling no Lago das Águas-vivas, uma experiência única onde os participantes podem nadar entre milhares de águas-vivas não urticantes, aprendendo sobre este ecossistema único.",
          imageUrl:
            "https://www.visitpalau.com/wp-content/uploads/2020/08/jellyfish-lake.jpg",
        },
      ],
    }),
    generateTouristicSpot({
      name: "Maldives",
      category: "Oceano",
      description:
        "As Maldivas, localizadas no Oceano Índico, são conhecidas por suas ilhas paradisíacas, águas cristalinas e recifes de coral. A região é um destino popular para mergulho e snorkel, oferecendo uma rica diversidade de vida marinha, incluindo peixes tropicais, tubarões e raias.",
      imageUrl:
        "https://www.visitmaldives.com/wp-content/uploads/2020/08/maldives.jpg",
      events: [
        {
          name: "Maldives Underwater Festival",
          description:
            "Festival subaquático que celebra a rica biodiversidade marinha das Maldivas. Inclui mergulhos guiados, exposições de fotografia subaquática e palestras sobre a conservação dos recifes de coral.",
          imageUrl:
            "https://www.visitmaldives.com/wp-content/uploads/2020/08/underwater-festival.jpg",
        },
        {
          name: "Manta Ray Migration",
          description:
            "Evento sazonal onde os participantes podem observar a migração das raias manta. Passeios de snorkel e mergulho são organizados para permitir uma observação de perto desses majestosos animais.",
          imageUrl:
            "https://www.visitmaldives.com/wp-content/uploads/2020/08/manta-migration.jpg",
        },
        {
          name: "Coral Planting Workshop",
          description:
            "Oficina prática onde os participantes podem aprender sobre a importância dos corais e participar de atividades de plantio de corais, ajudando na restauração dos recifes das Maldivas.",
          imageUrl:
            "https://www.visitmaldives.com/wp-content/uploads/2020/08/coral-planting.jpg",
        },
      ],
    }),
  ]);
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
