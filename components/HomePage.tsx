import type { HomepageData } from "@/lib/tina-types";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Ensembles from "./Ensembles";
import Shows from "./Shows";
import Reviews from "./Reviews";
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
      <Ensembles data={data} />
      <Shows data={data} />
      <Reviews data={data} />
      <Gallery data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </div>
  );
}
