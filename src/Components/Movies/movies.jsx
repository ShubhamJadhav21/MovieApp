import SikandarKaMuquadar from "../../assets/MoviesPoster/SikandarKaMuquadar.jpg";
import SinghamAgain from "../../assets/MoviesPoster/singhamAgain.avif";
import SabarmatiReport from "../../assets/MoviesPoster/sabarmatiReport.webp";
import Kill from "../../assets/MoviesPoster/kill.jpeg";
import DoPatti from "../../assets/MoviesPoster/doPatti.jpg";
import IronMan from "../../assets/MoviesPoster/ironMan.jpeg";
import BhoolBhulaiyaa3 from "../../assets/MoviesPoster/bhoolBhoolaiya3.webp";
import Animal from "../../assets/MoviesPoster/animal.jpg";
import TwelveFail from "../../assets/MoviesPoster/12th fail.jpg";
import LostLadies from "../../assets/MoviesPoster/lostLadies.jpg";
import HotelMumbai from "../../assets/MoviesPoster/hotelMumbai.jpg";
import KhelKhelMein from "../../assets/MoviesPoster/khel khel mein.avif";
import Agni from "../../assets/MoviesPoster/agni.jpg";
import Sector36 from "../../assets/MoviesPoster/sector 36.webp";
import The355 from "../../assets/MoviesPoster/the 355.jpg";
import BuckinghamMurders from "../../assets/MoviesPoster/the buckingham.avif";
import ChristmasWithTheSinghs from "../../assets/MoviesPoster/chrimas with singhs.jpg";
import Fighter from "../../assets/MoviesPoster/fighter.jpeg";
import Extraction from "../../assets/MoviesPoster/extraction.avif";
import Dangerous from "../../assets/MoviesPoster/dangerous.jpeg";
import Idiots from "../../assets/MoviesPoster/3 idiots.webp";
import VickyVidya from "../../assets/MoviesPoster/vickyVidya ka wo wala video.jpeg";
import Munjya from "../../assets/MoviesPoster/munjya.jpeg";
import Yudhra from "../../assets/MoviesPoster/yudhra.jpg";
import Dangal from "../../assets/MoviesPoster/dangal.jpg";
import KGF2 from "../../assets/MoviesPoster/KGF2.webp";
import GirlsWillBeGirls from "../../assets/MoviesPoster/girlsWillBeGirls.jpeg";
import Jawan from "../../assets/MoviesPoster/jawan.jpg";
import Tumbbad from "../../assets/MoviesPoster/tummbad.jpg";
import Sarfira from "../../assets/MoviesPoster/sarfira.jpg";

// Movie data array
const movies = [
  {
    id: 1,
    title: "Sikandar Ka Muqaddar",
    image: SikandarKaMuquadar,
    year: 2024,
    time: "2h 22m",
    desc: "After an unsolved diamond heist, a hard-nosed cop's pursuit of his key suspect turns into obsession, until they finally face each other and the truth.",
  },
  {
    id: 2,
    title: "Singham Again",
    image: SinghamAgain,
    year: 2024,
    time: "2h 24m",
    desc: "A new chase is coming - with reference to the epic Ramayana, Singham and his team face an ambiguous villain in order to save his wife.",
  },
  {
    id: 3,
    title: "The Sabarmati Report",
    image: SabarmatiReport,
    year: 2024,
    time: "2h 7m",
    desc: "Showcases the events of the morning of February 27, 2002, aboard the Sabarmati Express near the Godhra railway station in Gujrat.",
  },
  {
    id: 4,
    title: "Kill",
    image: Kill,
    year: 2023,
    time: "1h 45m",
    desc: "During a train trip to New Delhi, a pair of commandos face an army of invading bandits.",
  },
  {
    id: 5,
    title: "Do Patti",
    image: DoPatti,
    year: 2024,
    time: "2h 6m",
    desc: "Twins sisters harbouring deep secrets and a determined police inspector seeking to uncover the truth in an attempted murder case.",
  },
  {
    id: 6,
    title: "Iron Man",
    image: IronMan,
    year: 2008,
    time: "2h 6m",
    desc: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
  },
  {
    id: 7,
    title: "Bhool Bhulaiyaa 3",
    image: BhoolBhulaiyaa3,
    year: 2024,
    time: "2h 38m",
    desc: "Ruhaan, a fraudster posing as an exorcist, takes on a lucrative case at a haunted castle, unraveling a sinister plot involving mischievous priests, culminating in a hilarious yet thrilling ride filled with unexpected twists and scares.",
  },
  {
    id: 8,
    title: "Animal",
    image: Animal,
    year: 2023,
    time: "3h 24m",
    desc: "The hardened son of a powerful industrialist returns home after years abroad and vows to take bloody revenge on those threatening his father's life.",
  },
  {
    id: 9,
    title: "12th Fail",
    image: TwelveFail,
    year: 2023,
    time: "2h 27m",
    desc: "The real-life story of IPS Officer Mano Kumar Sharma and IRS Officer Shraddha Joshi.",
  },
  {
    id: 10,
    title: "Lost Ladies",
    image: LostLadies,
    year: 2023,
    time: "2h 2m",
    desc: "The misadventures of two young brides who get lost from the same train.",
  },
  {
    id: 11,
    title: "Hotel Mumbai",
    image: HotelMumbai,
    year: 2018,
    time: "2h 3m",
    desc: "The true story of the Taj Hotel terrorist attack in Mumbai.",
  },
  {
    id: 12,
    title: "Khel Khel Mein",
    image: KhelKhelMein,
    year: 2024,
    time: "2h 15m",
    desc: "Revolves around a group of friends who gather for a dinner and end up revealing secrets about each other.",
  },
  {
    id: 13,
    title: "Agni",
    image: Agni,
    year: 2024,
    time: "2h 2m",
    desc: "In a city plagued by a strange rise in fires, fireman Vithal and his policeman brother-in-law Samit reluctantly team up to solve the escalating crisis.",
  },
  {
    id: 14,
    title: "Sector 36",
    image: Sector36,
    year: 2024,
    time: "2h 3m",
    desc: "A fictional story inspired by true events.",
  },
  {
    id: 15,
    title: "The 355",
    image: The355,
    year: 2022,
    time: "2h 2m",
    desc: "When a top-secret weapon falls into mercenary hands, a wild-card C.I.A. agent joins forces with three international agents on a mission to retrieve it, while staying a step ahead of a mysterious woman who's tracking their every move.",
  },
  {
    id: 16,
    title: "The Buckingham Murders",
    image: BuckinghamMurders,
    year: 2023,
    time: "1h 47m",
    desc: "A grieving cop who loses her child to murder and moves to another town where she's tasked with investigating the disappearance of a missing child.",
  },
  {
    id: 17,
    title: "Christmas with the Singhs",
    image: ChristmasWithTheSinghs,
    year: 2024,
    time: "1h 24m",
    desc: "Holiday traditions and cultures collide when Asha and Jake meet their families.",
  },
  {
    id: 18,
    title: "Fighter",
    image: Fighter,
    year: 2024,
    time: "2h 46m",
    desc: "A reckless yet brilliant squadron leader and his team of elite fighter pilots face mortal dangers and inner demons as they unite for a deadly mission.",
  },
  {
    id: 19,
    title: "Extraction",
    image: Extraction,
    year: 2020,
    time: "1h 56m",
    desc: "Tyler Rake, a fearless black market mercenary, embarks on the most deadly extraction of his career when he's enlisted to rescue the kidnapped son of an imprisoned international crime lord.",
  },
  {
    id: 20,
    title: "Dangerous",
    image: Dangerous,
    year: 2022,
    time: "1h 39m",
    desc: "Rashmi, an aspiring model, rents an apartment and meets married neighbor Nalini.",
  },
  {
    id: 21,
    title: "3 Idiots",
    image: Idiots,
    year: 2009,
    time: "2h 50m",
    desc: "Two friends are searching for their long lost companion.",
  },
  {
    id: 22,
    title: "Vicky Vidya Ka Wow Wala Video",
    image: VickyVidya,
    year: 2024,
    time: "2h 32m",
    desc: "A newly married couple's relationship and reputation are put at risk when their private video CD is stolen.",
  },
  {
    id: 23,
    title: "Munjya",
    image: Munjya,
    year: 2024,
    time: "2h 3m",
    desc: "A young man's visit to his native village unveils a family secret and a vengeful spirit, the Munjya, who wants to get married.",
  },
  {
    id: 24,
    title: "Yudhra",
    image: Yudhra,
    year: 2024,
    time: "2h 22m",
    desc: "A young man consumed by vengeance, Yudhra infiltrates a ruthless cartel to avenge his murdered parents, only to discover a dark truth about his past that will test his limits.",
  },
  {
    id: 25,
    title: "Dangal",
    image: Dangal,
    year: 2016,
    time: "2h 41m",
    desc: "Mahavir Singh Phogat, a former wrestler, decides to fulfill his dream of winning a gold medal for his country by training his daughters for the Commonwealth Games despite the existing social stigmas.",
  },
  {
    id: 26,
    title: "K.G.F: Chapter 2",
    image: KGF2,
    year: 2022,
    time: "2h 46m",
    desc: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes, while the government sees him as a threat to law and order.",
  },
  {
    id: 27,
    title: "Girls Will Be Girls",
    image: GirlsWillBeGirls,
    year: 2024,
    time: "1h 58m",
    desc: "At a strict boarding school nestled in the Himalayan foothills, 18-year-old Mira first discovers desire and romance.",
  },
  {
    id: 28,
    title: "Jawan",
    image: Jawan,
    year: 2023,
    time: "2h 49m",
    desc: "A prison warden recruits inmates to commit outrageous crimes that shed light on corruption and injustice - and that lead him to an unexpected reunion.",
  },
  {
    id: 29,
    title: "Tumbbad",
    image: Tumbbad,
    year: 2018,
    time: "1h 48m",
    desc: "A mythological story about a goddess who created the entire universe.",
  },
  {
    id: 30,
    title: "Sarfira",
    image: Sarfira,
    year: 2024,
    time: "2h 35m",
    desc: "A man fights to make his dream of creating a low-cost airline a reality, facing opposition from devious competitive airline owners who threaten his business and his passengers' safety.",
  },
];

export default movies;
