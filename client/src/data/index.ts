import pop from "../assets/pop.jpg";
import hiphop from "../assets/hiphop.jpg";
import rock from "../assets/Rock.jpg";
import classic from "../assets/Classical.jpg";
import country from "../assets/Country.jpg";
import randb from "../assets/randb.jpg";
import jazz from "../assets/jazz.jpg";
import electronic from "../assets/Electronic.jpg";

export interface IGener {
  name: string;
  image: string;
  bg: string;
}
export const genereobj = [
  {
    name: "Rock",
    image: rock,
    bg: "#2fc446",
  },
  {
    name: "Pop",
    image: pop,
    bg: "#2fc4a2",
  },
  {
    name: "Hip Hop",
    image: hiphop,
    bg: "#2fc4a2",
  },
  {
    name: "",
    image: "",
    bg: "#317773",
  },
  {
    name: "Jazz",
    image: jazz,
    bg: "#c42fa9",
  },
  {
    name: "Country",
    image: country,
    bg: "#3f2c4a",
  },
  {
    name: "Electronic",
    image: electronic,
    bg: "#c92e16",
  },
  {
    name: "R&B",
    image: randb,
    bg: "#018c75",
  },
  {
    name: "Classical",
    image: classic,
    bg: "#278701",
  },
];

export const musicGenres = [
  "Rock",
  "Pop",
  "Hip Hop",
  "Jazz",
  "Country",
  "Electronic",
  "R&B",
  "Classical",
];

export const colors = [
  "#317773",
  "#2fc446",
  "#2fc4a2",
  "#c42fa9",
  "#3f2c4a",
  "#c92e16",
  "#018c75",
  "#278701",
];

export const FilterConstants = ["All", "Albums", "Artists", "Generes", "Songs"];
export const genereimage = [
  rock,
  pop,
  hiphop,
  jazz,
  country,
  electronic,
  randb,
  classic,
];
export const languages = [
  "English",
  "Spanish",
  "Hindi",
  "Arabic",
  "French",
  "Korean",
  "Amharic",
  "Oromia",
  "Tigray",
];
