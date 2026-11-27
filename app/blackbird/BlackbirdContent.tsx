"use client";

// Client component for the same reason as app/page-static.tsx: the shared
// Nav calls tinaField(), which isn't safe in a server-only module graph.

import Image from "next/image";
import type { HomepageData } from "@/lib/tina-types";
import Nav from "@/components/Nav";
import footerStyles from "@/components/Footer.module.css";
import SiteCredit from "@/components/SiteCredit";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";
import s from "./blackbird.module.css";
import sh from "@/components/Shows.module.css";
import follow from "@/components/Subscribe.module.css";

const FB = "https://www.facebook.com/BlackbirdProductionsvanisle";
const ALBUMS = `${FB}/photos_albums`;

const ADMITONE = "https://admitone.com/events/comox/community/music/the-sarah-stevenson-trio-aegean/P36NYF";
const EVENTBRITE = "https://www.eventbrite.com/cc/winter-jazz-sessions-no1-6-4753763/";
const MEX = "The Mex Pub, Courtenay";
const KNOTS = "40 Knots Winery, Comox";
const fbEvent = (id: string) => `https://www.facebook.com/events/${id}/`;
const INSTAGRAM = "https://www.instagram.com/productionsbyblackbird/";
const EMAIL = "productionsbyblackbird@gmail.com";
const PHONE = "(236) 508-2897";

function Ext({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className={s.head}>
      <div className={s.eyebrow}>{eyebrow}</div>
      <h2 className={s.heading}>{title}</h2>
      {sub ? <p className={s.sub}>{sub}</p> : null}
    </div>
  );
}

// [name, schedule, admission, body]
const ABOUT_CARDS = [
  [
    "Thursday Jazz Jams | The Mex Pub",
    "Every 4th Thursday | 6–8 PM",
    "By donation",
    "An open gathering for jazz musicians to share their talents, collaborate and connect. A welcoming space for emerging and seasoned players alike.",
  ],
  [
    "2nd Thursday Dinner-Hour Performance | The Mex Pub",
    "Every 2nd Thursday | 6–8 PM",
    "By donation",
    "Featuring a rotating selection of local and regional musicians, these dinner-hour performances offer artists an opportunity to share their music, connect with new audiences and enjoy a welcoming performance setting.",
  ],
  [
    "Sunday Matinée Series | 40 Knots Winery",
    "Typically one Sunday each month",
    "Ticketed event",
    "An afternoon concert featuring an opening act and headline performer, celebrating the depth and diversity of musical talent in our region.",
  ],
];

// One row in the Shows & Events list, laid out like Show Updates on the homepage.
type Show = {
  day: string;
  month: string;
  title: string;
  venue: string;
  meta: string;
  details?: string;
  tickets?: string;
  poster?: string;
};

const UPCOMING: Show[] = [
  {
    day: "26",
    month: "Nov",
    title: "Jazz Jam",
    venue: MEX,
    meta: "Thursday, November 26, 6 to 8 pm · Suggested donation $5 to $20",
    details: fbEvent("1490374866267275"),
    poster: "/blackbird/jazz-jam-2026-11-26-poster.jpg",
  },
  {
    day: "10",
    month: "Dec",
    title: "Jazz Night: Swingin’ Christmas",
    venue: MEX,
    meta: "Thursday, December 10, 6 to 8 pm · Suggested donation $5 to $20",
    details: fbEvent("1065221926539062"),
    poster: "/blackbird/swingin-christmas-2026-12-10-poster.jpg",
  },
  {
    day: "20",
    month: "Dec",
    title: "The Sarah Stevenson Trio, Christmas Matinee",
    venue: KNOTS,
    meta: "Sunday, December 20, 1:30 pm, doors 12:30 pm",
    details: fbEvent("1733905401011973"),
    tickets: ADMITONE,
    poster: "/blackbird/sarah-stevenson-trio-flyer.jpg",
  },
];

const P = "/blackbird/shows/";

const PAST: Show[] = [
  { day: "15", month: "Nov", title: "Matinee with The MAKH Quartet and Katie Campbell", venue: KNOTS, meta: "Sunday, November 15, 2026", details: fbEvent("28325456410467145"), poster: `${P}2026-11-15-makh-quartet.jpg` },
  { day: "12", month: "Nov", title: "Jazz Night with The Sharp Seven", venue: MEX, meta: "Thursday, November 12, 2026", details: fbEvent("1714855223770243"), poster: `${P}2026-11-12-sharp-seven.jpg` },
  { day: "22", month: "Oct", title: "Jazz Jam", venue: MEX, meta: "Thursday, October 22, 2026", details: fbEvent("1106365731975151"), poster: `${P}2026-10-22-jazz-jam.jpg` },
  { day: "18", month: "Oct", title: "Matinee with The Valley Cats and Malakai", venue: KNOTS, meta: "Sunday, October 18, 2026", details: fbEvent("1085395997786628"), poster: `${P}2026-10-18-valley-cats.jpg` },
  { day: "8", month: "Oct", title: "Jazz Night with Beau Stocker and Friends", venue: MEX, meta: "Thursday, October 8, 2026", details: fbEvent("2822356178145973"), poster: `${P}2026-10-08-beau-stocker-friends.jpg` },
  { day: "24", month: "Sep", title: "Jazz Jam", venue: MEX, meta: "Thursday, September 24, 2026", details: fbEvent("3495772673917613"), poster: `${P}2026-09-24-jazz-jam.jpg` },
  { day: "10", month: "Sep", title: "Jazz Night with Beau Stocker and Friends", venue: MEX, meta: "Thursday, September 10, 2026", details: fbEvent("1663303729133191"), poster: `${P}2026-09-10-beau-stocker-friends.jpg` },
  { day: "15", month: "Mar", title: "Jazz Session No. 6: Syncopated Sunday, Anderson Jazz Trio", venue: KNOTS, meta: "Sunday, March 15, 2026", details: fbEvent("4288092601412757"), poster: `${P}2026-03-15-session-6-anderson-jazz-trio.jpg` },
  { day: "1", month: "Mar", title: "Jazz Session No. 5: Tribute to Cole Porter, Amy and Her Accomplices", venue: KNOTS, meta: "Sunday, March 1, 2026", details: EVENTBRITE, poster: `${P}2026-03-01-session-5-cole-porter.jpg` },
  { day: "15", month: "Feb", title: "Jazz Session No. 4: Sunday Swing, Melissa Thibeault, Rick Jamison and Drake Shoemaker", venue: KNOTS, meta: "Sunday, February 15, 2026", details: EVENTBRITE, poster: `${P}2026-02-15-session-4-sunday-swing.jpg` },
  { day: "10", month: "Jan", title: "Jazz Session No. 3: Take Five Below, The Sharp Seven", venue: KNOTS, meta: "Saturday, January 10, 2026" },
  { day: "6", month: "Dec", title: "Jazz Session No. 2: Afternoon Groove, The Drummond-Stocker Duo", venue: KNOTS, meta: "Saturday, December 6, 2025" },
  { day: "22", month: "Nov", title: "Jazz Session No. 1: Late Fall, Smooth Call, The Mel McCutcheon Quartet", venue: "Rivercity Players, Campbell River", meta: "Saturday, November 22, 2025, the very first Blackbird show" },
];

function ShowRow({ ev }: { ev: Show }) {
  return (
    <article className={sh.upcomingRow}>
      {ev.poster ? (
        <a href={ev.poster} data-lightbox="blackbird-posters" className={sh.poster} aria-label={`View poster for ${ev.title}`}>
          <Image src={ev.poster} alt={`Poster: ${ev.title}`} fill sizes="112px" />
        </a>
      ) : (
        // Empty frame keeps the date column lined up with rows that have a poster.
        <div className={sh.poster} style={{ cursor: "default" }} aria-hidden="true" />
      )}
      <div className={sh.date}>
        <span className={sh.day}>{ev.day}</span>
        <span className={sh.month}>{ev.month}</span>
      </div>
      <div className={sh.info}>
        <div className={sh.showTitle}>{ev.title}</div>
        <div className={sh.venue}>
          <span className={sh.venueName}>{ev.venue}</span>
        </div>
        <div className={sh.meta}>{ev.meta}</div>
      </div>
      <div className={sh.actions}>
        {ev.details ? (
          <Ext href={ev.details} className={sh.pill}>
            Details
          </Ext>
        ) : null}
        {ev.tickets ? (
          <Ext href={ev.tickets} className={sh.pill}>
            Tickets
          </Ext>
        ) : null}
      </div>
    </article>
  );
}

const PHOTOGRAPHERS = [
  ["Wilf Meier", "Volunteer photographer"],
  ["Katie Hubberstey", "Photographer"],
  ["Norman Prince", "Photographer"],
  ["Bob Ell", "Photographer"],
  ["Roshine Photography", "Photographer"],
  ["Nathan Senner", "Photographer"],
];

const CREW = [
  ["Steve Ray and Rocky Fahr", "Lighting"],
  ["Katie Campbell", "Sound, Ridiculous Sound Solutions"],
];

const QUOTES = [
  [
    "I recently had the privilege of joining Blackbird Productions in my first jazz gig. The event was well organized from start to finish, I felt welcomed and supported by Mel and the other musicians.",
    "Barb Dunnett",
  ],
  ["Well organized, well promoted, and well curated events for lovers of jazz.", "Elaine Prodor"],
  ["Artistically designed promo, managed all the arrangements, and even sent a thank-you card.", "Melissa Thibeault"],
  ["What an amazing night of jazz! Great venue, great musicians, and an amazing host.", "Kristi Walker"],
];

export default function BlackbirdContent({ data }: { data: HomepageData }) {
  const [featured, ...quotes] = QUOTES;

  return (
    <div>
      <div className="grain" />
      <Nav data={data} base="/" />

      {/* Hero (id="home" so ScrollReveal leaves it alone, like the homepage hero) */}
      <section id="home" className={s.hero}>
        <div className={s.heroPhoto}>
          <Image src="/blackbird/40knots-sunset.jpg" alt="The 40 Knots Winery vineyard at sunset" fill priority sizes="(max-width: 900px) 100vw, 55vw" />
          <span className={s.heroCredit}>Photo: Comox Valley Food Bank</span>
        </div>
        <div className={s.heroCopy}>
          <div className={s.kicker}>Campbell River • Comox • Vancouver Island</div>
          <h1 className={s.title}>
            Blackbird
            <br />
            <span className={s.accent}>Productions</span>
          </h1>
          <p className={s.tagline}>
            Live jazz, taking flight on Vancouver Island, one Sunday matinee at a time.
          </p>
          <div className={s.ctaRow}>
            <a href="#shows" className={`${s.btn} ${s.btnSolid}`}>
              See what’s coming up
            </a>
            <Ext href={FB} className={s.btn}>
              Follow on Facebook
            </Ext>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={s.section}>
        <div className={s.wrap}>
          <div className={s.split}>
            <div>
              <Head eyebrow="About Blackbird Productions" title="A creative community taking flight" />
              <p className={s.lead}>
                Born in the fall of 2025, Blackbird Productions is a growing creative collective bringing people together
                through music, art and community. Now in its second season, Blackbird continues to create opportunities for
                musicians and audiences to connect, collaborate and experience live music.
              </p>
              <p className={s.paragraph}>
                Spearheaded by Mel McCutcheon and Beau Stocker, Blackbird brings together like-minded, music and
                community-focused individuals with a shared passion for supporting local and regional talent.
              </p>
              <p className={s.paragraph}>
                Through collaborations with The Mex Pub in Courtenay and 40 Knots Winery in Comox, Blackbird supports and
                promotes performance opportunities for local and regional emerging and seasoned artists, while fostering
                connections between musicians, students, mentors and audiences.
              </p>
              <p className={s.paragraph}>
                Blackbird’s mission is to create meaningful performance, networking and mentoring opportunities for
                accomplished musicians, emerging artists and students, while celebrating creativity and strengthening our
                regional arts community.
              </p>
              <dl className={s.facts}>
                <div>
                  <dt>Based in</dt>
                  <dd>Campbell River and Comox, BC</dd>
                </div>
                <div>
                  <dt>First show</dt>
                  <dd>November 22, 2025</dd>
                </div>
              </dl>
            </div>
            <figure>
              <a href="/blackbird/40knots-rows.jpg" data-lightbox="blackbird" className={s.aboutPhoto} aria-label="View photo">
                <Image src="/blackbird/40knots-rows.jpg" alt="Vineyard rows at 40 Knots Winery" fill sizes="(max-width: 800px) 100vw, 50vw" />
              </a>
              <figcaption className={s.credit}>Photo: British Columbia Magazine</figcaption>
            </figure>
          </div>
          <div className={`${s.head} ${s.gridTop}`}>
            <h3 className={s.heading}>Three monthly live performance opportunities. One creative community.</h3>
            <p className={s.sub}>
              Through collaborations with local venues, Blackbird supports and promotes three monthly live performance
              opportunities, bringing musicians and audiences together through music and community.
            </p>
          </div>
          <div className={s.grid}>
            {ABOUT_CARDS.map(([name, schedule, admission, body]) => (
              <div key={name} className={s.item}>
                <h3 className={s.name}>{name}</h3>
                <div className={s.role}>
                  {schedule}
                  <br />
                  {admission}
                </div>
                <p className={s.description}>{body}</p>
              </div>
            ))}
          </div>
          <div className={`${s.head} ${s.gridTop}`}>
            <div className={s.eyebrow}>Creativity in motion</div>
            <p className={`${s.paragraph} ${s.narrow}`}>
              For Blackbird Productions, it’s about more than music. It’s about building connections, creating
              opportunities, nurturing talent and strengthening our local and regional arts community.
            </p>
            <p className={`${s.paragraph} ${s.narrow}`}>
              For more information, upcoming events and updates, follow Blackbird Productions on Facebook:
            </p>
            <div className={s.actions}>
              <Ext href={FB} className={s.pill}>
                Blackbird Productions on Facebook
              </Ext>
            </div>
          </div>
        </div>
      </section>

      {/* Shows & Events: same layout as Show Updates on the homepage */}
      <section id="shows" className={s.section}>
        <div className={s.wrap}>
          <Head eyebrow="Shows & Events" title="Coming up next" />
          <h3 className={sh.subheading}>Upcoming</h3>
          <div className={sh.upcomingList}>
            {UPCOMING.map((ev) => (
              <ShowRow key={ev.title} ev={ev} />
            ))}
          </div>
          <div className={follow.box}>
            <div>
              <h3 className={follow.title}>Never miss a show</h3>
              <p className={follow.text}>
                Every new date, poster and photo goes up on the Blackbird Productions Facebook page first.
              </p>
            </div>
            <div>
              <Ext href={FB} className={follow.button}>
                Follow on Facebook
              </Ext>
            </div>
          </div>
          <div className={sh.pastBreak} aria-hidden="true">
            <span className={sh.diamond} />
          </div>
          <h3 className={sh.subheading}>Past Shows</h3>
          <div className={`${sh.upcomingList} ${sh.pastList}`}>
            {PAST.map((ev) => (
              <ShowRow key={ev.title + ev.meta} ev={ev} />
            ))}
          </div>
        </div>
      </section>

      {/* Photographers */}
      <section id="photographers" className={s.section}>
        <div className={s.wrap}>
          <Head
            eyebrow="Behind the lens"
            title="A thousand thank-yous"
            sub="A picture is worth a thousand words, and these photographers deserve a thousand thank-yous."
          />
          <div className={s.subheading}>Photographers</div>
          <div className={s.nameGrid}>
            {PHOTOGRAPHERS.map(([n, r]) => (
              <div key={n} className={s.nameCell}>
                <span className={s.venueName}>{n}</span>
                <span className={s.tag}>{r}</span>
              </div>
            ))}
          </div>
          <div className={s.subheading}>Crew</div>
          <div className={s.nameGrid}>
            {CREW.map(([n, r]) => (
              <div key={n} className={s.nameCell}>
                <span className={s.venueName}>{n}</span>
                <span className={s.tag}>{r}</span>
              </div>
            ))}
          </div>
          <p className={`${s.paragraph} ${s.narrow}`}>
            Blackbird’s shows are captured by generous volunteer photographers who give their time and talent to every
            event. Their work keeps these moments alive for the musicians, the venues and everyone in the audience, and
            Blackbird is deeply grateful for it.
          </p>
          <div className={s.actions}>
            <Ext href={ALBUMS} className={s.pill}>
              Browse the photo albums on Facebook
            </Ext>
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className={s.section}>
        <div className={s.wrap}>
          <Head eyebrow="Community" title="More than the music" sub="Blackbird looks after the scene it is building." />
          <div className={`${s.grid} ${s.grid2}`}>
            <div className={s.item}>
              <h3 className={s.name}>Looking after the musicians</h3>
              <p className={s.description}>
                When working musician Joey Smith suffered a stroke, Blackbird shared his fundraiser: when a working musician
                can’t perform, the impact goes far beyond the music.
              </p>
              <div className={s.actions}>
                <Ext href="https://www.gofundme.com/f/joey-smiths-stroke-recovery" className={s.pill}>
                  Joey Smith’s GoFundMe
                </Ext>
              </div>
            </div>
            <div className={s.item}>
              <h3 className={s.name}>Take a piece home</h3>
              <p className={s.description}>
                The 2027 Blackbird Wall Calendar, macrophotography images celebrating a year of live performance in the Comox
                Valley, plus water bottles, mugs, stickers and bags, sold on Etsy Canada. Search Etsy for Blackbird Productions
                2027 Calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className={s.section}>
        <div className={s.wrap}>
          <Head eyebrow="What people say" title="100% recommend" sub="Across 17 Facebook reviews." />
          <blockquote className={s.featured}>
            <p>“{featured[0]}”</p>
            <cite className={s.cite}>{featured[1]}</cite>
          </blockquote>
          <div className={s.quotes}>
            {quotes.map(([q, who]) => (
              <blockquote key={who} className={s.card}>
                <p>“{q}”</p>
                <cite className={s.cite}>{who}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={s.section}>
        <div className={s.wrap}>
          <div className={s.eyebrow}>Get in touch</div>
          <div className={s.contactInner}>
            <a href={`mailto:${EMAIL}`} className={s.email}>
              Come hear it live
            </a>
            <ul className={s.social}>
              <li>
                <Ext href={FB}>Facebook</Ext>
              </li>
              <li>
                <Ext href={INSTAGRAM}>Instagram</Ext>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href="tel:+12365082897">{PHONE}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className={footerStyles.footer}>
        <div>© 2026 Blackbird Productions · Campbell River and Comox, BC</div>
        <SiteCredit />
      </footer>
      <ScrollReveal />
      <Lightbox />
    </div>
  );
}
