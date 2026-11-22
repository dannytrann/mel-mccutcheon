import type { Metadata } from "next";
import homeData from "@/content/homepage/home.json";
import type { HomepageData } from "@/lib/tina-types";
import BlackbirdContent from "./BlackbirdContent";

export const metadata: Metadata = {
  title: "Blackbird Productions | Mel McCutcheon",
  description:
    "Blackbird Productions brings people together through music, art and community in Campbell River and Comox, BC.",
};

export default function BlackbirdPage() {
  return <BlackbirdContent data={homeData as unknown as HomepageData} />;
}
