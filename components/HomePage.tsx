import type { HomepageData } from "@/lib/tina-types";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Music from "./Music";
import Events from "./Events";
import Gallery from "./Gallery";
import Shop from "./Shop";
import Contact from "./Contact";
import Footer from "./Footer";

export default function HomePage({ data }: { data: HomepageData }) {
  return (
    <div>
      <Nav data={data} />
      <Hero data={data} />
      <About data={data} />
      <Music data={data} />
      <Events data={data} />
      <Gallery data={data} />
      <Shop data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </div>
  );
}
