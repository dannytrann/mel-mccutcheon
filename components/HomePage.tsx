import type { HomepageData } from "@/lib/tina-types";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Sound from "./Sound";
import Ensembles from "./Ensembles";
import Shows from "./Shows";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Footer from "./Footer";

export default function HomePage({ data }: { data: HomepageData }) {
  return (
    <div>
      <div className="grain" />
      <Nav data={data} />
      <Hero data={data} />
      <About data={data} />
      <Sound data={data} />
      <Ensembles data={data} />
      <Shows data={data} />
      <Gallery data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </div>
  );
}
