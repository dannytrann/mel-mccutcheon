import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import InstagramEmbed from "./InstagramEmbed";
import s from "./blackbird.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--bb-serif" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--bb-sans" });

export const metadata: Metadata = {
  title: "Blackbird Productions | Live Jazz on Vancouver Island",
  description:
    "Blackbird Productions brings people together through music, art and community in Campbell River and Comox, BC.",
};

const FB = "https://www.facebook.com/BlackbirdProductionsvanisle";
const ALBUMS = `${FB}/photos_albums`;
const ADMITONE = "https://admitone.com/events/comox/community/music/the-sarah-stevenson-trio-aegean/P36NYF";
const EVENTBRITE = "https://www.eventbrite.com/cc/winter-jazz-sessions-no1-6-4753763/";
const CALENDAR = "https://productionsbyblackbird.my.canva.site/";
const INSTAGRAM = "https://www.instagram.com/productionsbyblackbird/";
const EMAIL = "productionsbyblackbird@gmail.com";

function Ext({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function BirdMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="url(#bbg)" />
      <defs>
        <linearGradient id="bbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1fc2b4" />
          <stop offset="1" stopColor="#0d6f68" />
        </linearGradient>
      </defs>
      <path d="M10 46 C24 43 40 43 56 45" stroke="#0B1D2A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path
        d="M22 44 C20 37 23 30 30 27 C33 22 38 19 43 21 L48 20 L44 24 C45 30 42 36 36 39 L34 44 L32 44 L33 40 C29 41 25 42 22 44 Z"
        fill="#0B1D2A"
      />
      <path d="M30 27 C25 24 20 25 15 29 C21 29 25 31 28 34 Z" fill="#0B1D2A" />
      <circle cx="42" cy="23.5" r="0.9" fill="#C9A227" />
    </svg>
  );
}

const NAV = [
  ["About", "about"],
  ["Upcoming", "upcoming"],
  ["Watch", "watch"],
  ["Artists", "artists"],
  ["Photographers", "photographers"],
  ["Venues", "venues"],
  ["Season", "season"],
  ["Community", "community"],
] as const;

const STATS = [
  ["313", "Facebook followers"],
  ["17", "shows and counting"],
  ["100%", "recommend, 17 reviews"],
  ["1", "monthly jazz calendar for the whole coast"],
];

type EventCard = {
  title: string;
  when: string;
  where: string;
  body: string;
  links: [string, string][];
  embed?: string;
};

const EVENTS: EventCard[] = [
  {
    title: "Jazz Jam",
    when: "Thursday, November 26, 2026, 6 to 8 pm",
    where: "The Mex Pub, 1001 Ryan Road, Courtenay",
    body: "Co-hosted by Beau Stocker. An open jazz jam, not an open mic. A host band that changes each session, sign up with jam band manager Mel McCutcheon, two tunes per turn. Under 18 students are welcome in the Young Artist Hang. Backline provided: upright bass, guitar amp, keyboard, drum kit and microphone.",
    links: [["See it on Facebook", FB]],
  },
  {
    title: "Jazz Night, Swingin’ Christmas",
    when: "Thursday, December 10, 2026, 6 to 8 pm",
    where: "The Mex Pub, 1001 Ryan Road, Courtenay",
    body: "Mel McCutcheon and Melissa Thibeault, with Beau Stocker, John Hyde and Rick Jamison. Jazzy Christmas favourites and timeless standards. Kitchen open till 9:30 pm. Suggested donation $5 to $20.",
    links: [["See the Facebook event", "https://www.facebook.com/events/1065221926539062/"]],
  },
  {
    title: "The Sarah Stevenson Trio, Christmas Matinee",
    when: "Sunday, December 20, 2026, 1:30 to 3:30 pm, doors 12:30 pm",
    where: "40 Knots Winery, 2400 Anderton Road, Comox",
    body: "Sarah Stevenson on vocals, Andrew Janusson on guitar, Drake Shoemaker on bass. Opening act Aegean, a six-piece jazz group from the jazz program at Capilano University, many of its members with roots in the Comox Valley. Soup and roll, full bar, all ages. Sarah’s only Vancouver Island holiday show.",
    links: [
      ["Get tickets on AdmitONE", ADMITONE],
      ["See the Facebook event", "https://www.facebook.com/events/1733905401011973/"],
    ],
    embed: "https://www.instagram.com/p/Dd2lE5HipK2/",
  },
];

const REELS = [
  ["https://www.instagram.com/reel/DfliPdhiytX/", "Sarah Stevenson sings I’ll Be Home for Christmas, her promo for the December 20 matinee."],
  [
    "https://www.instagram.com/reel/Df2ybwVDW53/",
    "Katie Campbell and the MAKH Quartet perform Amy Winehouse’s Tears Dry On Their Own at 40 Knots, November 15. They met at soundcheck, ran it through once and a half, and played it live an hour later.",
  ],
  ["https://www.instagram.com/reel/DeqpRUnCSNA/", "The Valley Cats, live at 40 Knots, October 18."],
  ["https://www.instagram.com/reel/Dd2K0tvy8QP/", "Malakai, live at 40 Knots, October 18."],
];

const SESSIONS = [
  ["No. 1", "Late Fall, Smooth Call", "Saturday, November 22, 2025", "The Mel McCutcheon Quartet, with two opening acts. Rivercity Players, Campbell River."],
  ["No. 2", "Afternoon Groove", "Saturday, December 6, 2025", "The Drummond-Stocker Duo. 40 Knots Winery."],
  ["No. 3", "Take Five Below", "Saturday, January 10, 2026", "The Sharp Seven. 40 Knots Winery."],
  [
    "No. 4",
    "Sunday Swing",
    "Sunday, February 15, 2026",
    "Melissa Thibeault on vocals and Rick Jamison on guitar, with Drake Shoemaker. Presented with the Georgia Straight Jazz Society. 40 Knots Winery.",
  ],
  ["No. 5", "Tribute to Cole Porter", "Sunday, March 1, 2026", "Amy and Her Accomplices. 40 Knots Winery."],
  ["No. 6", "Syncopated Sunday", "Sunday, March 15, 2026", "Anderson Jazz Trio. 40 Knots Winery."],
];

const ARTISTS = [
  {
    name: "Sarah Stevenson",
    role: "Vocals",
    bio: "Nanaimo born, now making waves in Montreal’s jazz scene. Two DownBeat Magazine Awards at just 21 years old, and a performance at the Montreal International Jazz Festival. Smooth, silky vocals and fresh interpretations of jazz classics. Her Christmas matinee on December 20 is her only Vancouver Island holiday show.",
  },
  {
    name: "Katie Campbell",
    role: "Vocals and songwriter",
    bio: "Born and raised on Vancouver Island. She found her voice at 34, fronted her first band Live Edge, and stepped into the spotlight at 38 with her own original music. Five EPs, more than 200,000 Spotify streams, and over 10,000 TikTok followers. She also holds a Live Sound Technician Certification from Berklee College of Music and runs sound at the Mex Pub jams under her business Ridiculous Sound Solutions.",
  },
  {
    name: "Melissa Thibeault",
    role: "Vocals",
    bio: "Soulful vocals at the Sunday Swing matinee and the Swingin’ Christmas night. Her French set at the very first Blackbird concert is still talked about in the reviews.",
  },
  {
    name: "Malakai",
    role: "Singer-songwriter",
    bio: "A young Duncan, BC musician whose songwriting and musicianship belie his years. Folk, soul and contemporary influences, an intimate and expressive style. He opened the fall season at 40 Knots on October 18.",
  },
  {
    name: "The Valley Cats",
    role: "Jazz, R&B and funk",
    bio: "A six-piece Comox Valley band bringing jazz, R&B and funk: Charity Munro on vocals, Mike Berman on drums, Mike Eddy on keys, Grahame Edwards on bass, Jeff Agopsowicz on trombone, Dave Lymbuner on trumpet, with special guest Rachel Cooper on sax and clarinet.",
  },
  {
    name: "The MAKH Quartet",
    role: "Quartet",
    bio: "Brock Meades on bass, Eryn Krieger on trumpet and vocals, Michael Anderson on guitar and vocals, Ronin Hutton on drums. Jazz, funk, country, classical and world music in one adventurous, accessible sound. Michael is Nanaimo based, rhythm guitarist and vocalist for String Fever. Eryn is from Salt Spring Island and draws on Miles Davis, Chet Baker and Clark Terry.",
  },
];

const ALSO = [
  "Mel McCutcheon (quartet leader, jam band manager and host)",
  "Beau Stocker (drummer, Jazz Night host and sound engineer)",
  "The Sharp Seven",
  "Anderson Jazz Trio",
  "Amy and Her Accomplices",
  "Aegean (Capilano University jazz program)",
  "Drummond-Stocker Duo",
  "Rick Jamison (guitar)",
  "Drake Shoemaker (bass)",
  "John Hyde (bass)",
  "Andrew Janusson (guitar)",
  "Brett Jardine (guitar)",
  "Island Standard Time",
  "Mood Swings",
];

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
  ["Katie Campbell, Ridiculous Sound Solutions", "Sound"],
];

type Venue = { name: string; address: string; body: string; photo?: { src: string; alt: string; credit: string } };

const VENUES: Venue[] = [
  {
    name: "40 Knots Winery",
    address: "2400 Anderton Road, Comox",
    body: "Home of the Sunday matinees. A coastal vineyard above the Salish Sea, wines made from 100 percent Comox grapes, 90 percent estate grown, plus four ciders. In October 2026 it was acquired by the K’omoks Economic Development Corporation, making it Canada’s second Indigenous-owned winery.",
    photo: { src: "/blackbird/40knots-patio.jpg", alt: "The 40 Knots Winery patio with branded umbrellas", credit: "British Columbia Magazine" },
  },
  {
    name: "Rivercity Players",
    address: "1080 Hemlock Street, Campbell River",
    body: "Home of the very first Jazz Session on November 22, 2025.",
    photo: { src: "/blackbird/rivercity-mural.jpg", alt: "The painted mural on the Rivercity Players theatre", credit: "Rivercity Players mural, painted by Dan Rickey, 2012" },
  },
  {
    name: "The Mex Pub",
    address: "1001 Ryan Road, Courtenay",
    body: "Home of the Jazz Nights and the Jazz Jams, with the generous support of The Mex Pub and Grill.",
  },
  {
    name: "Painter’s Lodge",
    address: "Campbell River",
    body: "Hosted the Valentine’s Lunch Matinee on February 14, 2026.",
  },
  {
    name: "Little Red Church",
    address: "Comox",
    body: "Hosted One Winter Night 4 on February 7, 2026.",
  },
];

const SEASON = [
  ["November 15, 2026", "Matinee with The MAKH Quartet and Katie Campbell, 40 Knots Winery"],
  ["November 12, 2026", "Jazz Night with The Sharp Seven, The Mex Pub"],
  ["October 22, 2026", "Jazz Jam, The Mex Pub"],
  ["October 18, 2026", "Matinee with The Valley Cats and Malakai, 40 Knots Winery"],
  ["October 8, 2026", "Jazz Night with Beau Stocker and Friends, The Mex Pub"],
  ["September 24, 2026", "Jazz Jam, The Mex Pub"],
  ["September 10, 2026", "Beau Stocker and Friends, The Mex Pub"],
  ["March 15, 2026", "Jazz Session No. 6, Syncopated Sunday, Anderson Jazz Trio, 40 Knots Winery"],
  ["March 1, 2026", "Jazz Session No. 5, Tribute to Cole Porter, Amy and Her Accomplices, 40 Knots Winery"],
  ["February 28, 2026", "Island Standard Time matinee, sold out"],
  ["February 15, 2026", "Jazz Session No. 4, Sunday Swing, Melissa Thibeault, Rick Jamison and Drake Shoemaker, 40 Knots Winery"],
  ["February 14, 2026", "Valentine’s Lunch Matinee, Painter’s Lodge, Campbell River"],
  ["February 7, 2026", "One Winter Night 4, Little Red Church, Comox"],
  ["January 10, 2026", "Jazz Session No. 3, Take Five Below, The Sharp Seven, 40 Knots Winery"],
  ["December 6, 2025", "Jazz Session No. 2, Afternoon Groove, Drummond-Stocker Duo, 40 Knots Winery"],
  ["November 22, 2025", "Jazz Session No. 1, Late Fall, Smooth Call, The Mel McCutcheon Quartet, Rivercity Players, Campbell River"],
];

const QUOTES = [
  ["Well organized, well promoted, and well curated events for lovers of jazz.", "Elaine Prodor"],
  [
    "I recently had the privilege of joining Blackbird Productions in my first jazz gig. The event was well organized from start to finish, I felt welcomed and supported by Mel and the other musicians.",
    "Barb Dunnett",
  ],
  ["Artistically designed promo, managed all the arrangements, and even sent a thank-you card.", "Melissa Thibeault"],
  ["What an amazing night of jazz! Great venue, great musicians, and an amazing host.", "Kristi Walker"],
];

const initials = (name: string) =>
  name
    .replace(/^The /, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: React.ReactNode }) {
  return (
    <header className={s.head}>
      {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}
      <h2 className={s.h2}>{title}</h2>
      {sub ? <p className={s.sub}>{sub}</p> : null}
    </header>
  );
}

export default function BlackbirdPage() {
  return (
    <div className={`${s.page} ${playfair.variable} ${inter.variable}`}>
      <div className={s.topStrip}>
        <Link href="/">← Back to Mel McCutcheon</Link>
      </div>

      <header className={s.nav}>
        <div className={s.navInner}>
          <a href="#top" className={s.brand}>
            <BirdMark className={s.mark} />
            <span>Blackbird Productions</span>
          </a>
          <nav className={s.navLinks} aria-label="Sections">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <Ext href={FB} className={s.btnGold}>
            Follow on Facebook
          </Ext>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className={s.hero}>
          <Image
            src="/blackbird/40knots-sunset.jpg"
            alt="The 40 Knots Winery vineyard at sunset"
            fill
            priority
            sizes="100vw"
            className={s.heroImg}
          />
          <div className={s.heroShade} />
          <div className={`${s.wrap} ${s.heroInner}`}>
            <p className={s.eyebrow}>Campbell River • Comox • Vancouver Island</p>
            <h1 className={s.h1}>Live jazz, taking flight on Vancouver Island</h1>
            <p className={s.lede}>
              Blackbird Productions brings people together through music, art and community, one Sunday matinee at a time.
            </p>
            <div className={s.btnRow}>
              <a href="#upcoming" className={s.btnTeal}>
                See what’s coming up
              </a>
              <Ext href={FB} className={s.btnGhost}>
                Follow on Facebook
              </Ext>
            </div>
            <dl className={s.stats}>
              {STATS.map(([n, label]) => (
                <div key={label} className={s.stat}>
                  <dt>{n}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
            <p className={s.credit}>Photo: Comox Valley Food Bank</p>
          </div>
        </section>

        {/* About */}
        <section id="about" className={s.light}>
          <div className={s.wrap}>
            <SectionHead eyebrow="About" title="A new venture taking flight" />
            <p className={s.body}>
              Blackbird Productions is a new creative venture taking flight, bringing people together through music, art and
              community. Their mission is to create meaningful performance, networking and mentoring opportunities for
              accomplished musicians, emerging artists and students, while hosting vibrant events that celebrate creativity in
              motion.
            </p>
            <div className={s.grid3}>
              <article className={s.card}>
                <h3 className={s.h3}>Sunday matinees</h3>
                <p>
                  Afternoon jazz at 40 Knots Winery in Comox and Rivercity Players in Campbell River. Doors at 12:30, music at
                  1:30, soup and a bun on the table and wine by the glass.
                </p>
              </article>
              <article className={s.card}>
                <h3 className={s.h3}>Jazz Nights and Jams</h3>
                <p>
                  Evenings at The Mex Pub in Courtenay. Jazz Nights on the second Thursday of the month, open Jazz Jams where
                  local players sign up and sit in.
                </p>
              </article>
              <article className={s.card}>
                <h3 className={s.h3}>The jazz calendar</h3>
                <p>
                  A monthly roundup of live jazz from Campbell River to Qualicum, crowdsourced from the community. If you know
                  of a gig, Blackbird will add it.
                </p>
              </article>
            </div>
            <aside className={s.facts}>
              <h3 className={s.factsTitle}>Quick facts</h3>
              <dl>
                <div>
                  <dt>Based in</dt>
                  <dd>Campbell River and Comox, BC</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>Event Planner</dd>
                </div>
                <div>
                  <dt>First show</dt>
                  <dd>November 22, 2025</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    <a href="tel:+12365082897">(236) 508-2897</a>, <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        {/* Upcoming */}
        <section id="upcoming" className={s.dark}>
          <div className={s.wrap}>
            <SectionHead
              eyebrow="Upcoming"
              title="Coming up next"
              sub="Three dates on the calendar. Details change, so check the Facebook Page before you head out."
            />
            <div className={s.events}>
              {EVENTS.map((ev) => (
                <div key={ev.title} className={ev.embed ? s.eventWithEmbed : undefined}>
                  <article className={s.eventCard}>
                    <h3 className={s.h3}>{ev.title}</h3>
                    <p className={s.when}>{ev.when}</p>
                    <p className={s.where}>{ev.where}</p>
                    <p>{ev.body}</p>
                    <div className={s.btnRow}>
                      {ev.links.map(([label, href], i) => (
                        <Ext key={href} href={href} className={i === 0 ? s.btnTeal : s.btnGhost}>
                          {label}
                        </Ext>
                      ))}
                    </div>
                  </article>
                  {ev.embed ? (
                    <div className={s.embedBox}>
                      <InstagramEmbed url={ev.embed} caption="Sarah Stevenson Trio flyer" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Watch */}
        <section id="watch" className={s.light}>
          <div className={s.wrap}>
            <SectionHead eyebrow="Watch" title="Watch and listen" sub="Clips from the stage, posted by Blackbird and the artists." />
            <div className={s.reels}>
              {REELS.map(([url, caption]) => (
                <figure key={url} className={s.reel}>
                  <InstagramEmbed url={url} caption={caption} />
                  <figcaption>{caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className={s.textLinks}>
              <Ext href={`${FB}/reels`}>More reels on Facebook</Ext>
              <Ext href={ALBUMS}>Photo albums on Facebook</Ext>
            </p>
          </div>
        </section>

        {/* Winter Jazz Sessions */}
        <section className={s.dark}>
          <div className={s.wrap}>
            <SectionHead
              eyebrow="Where it started"
              title="The Winter Jazz Sessions"
              sub="Six Sunday matinees that started it all, November 2025 to March 2026. The first at Rivercity Players in Campbell River, the rest at 40 Knots Winery in Comox."
            />
            <ol className={s.timeline}>
              {SESSIONS.map(([no, name, date, body]) => (
                <li key={no}>
                  <span className={s.tlNo}>{no}</span>
                  <h3 className={s.h3}>{name}</h3>
                  <p className={s.when}>{date}</p>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <p className={s.textLinks}>
              <Ext href={EVENTBRITE}>The full series on Eventbrite</Ext>
            </p>
          </div>
        </section>

        {/* Artists */}
        <section id="artists" className={s.light}>
          <div className={s.wrap}>
            <SectionHead
              eyebrow="Artists"
              title="The voices and the players"
              sub="Accomplished musicians, emerging artists and students, all on the same stage. That mix is the whole point of Blackbird."
            />
            <div className={s.grid3}>
              {ARTISTS.map((a) => (
                <article key={a.name} className={s.card}>
                  <div className={s.avatar} aria-hidden="true">
                    {initials(a.name)}
                  </div>
                  <h3 className={s.h3}>{a.name}</h3>
                  <p className={s.role}>{a.role}</p>
                  <p>{a.bio}</p>
                </article>
              ))}
            </div>
            <div className={s.also}>
              <h3 className={s.h3}>Also on the Blackbird stage</h3>
              <ul>
                {ALSO.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Photographers */}
        <section id="photographers" className={s.dark}>
          <div className={s.wrap}>
            <SectionHead
              eyebrow="Photographers"
              title="Behind the lens"
              sub="A picture is worth a thousand words, and these photographers deserve a thousand thank-yous. That is Blackbird’s own line, from their November 17 thank-you post."
            />
            <div className={s.names}>
              {PHOTOGRAPHERS.map(([n, r]) => (
                <div key={n} className={s.nameCard}>
                  <strong>{n}</strong>
                  <span>{r}</span>
                </div>
              ))}
            </div>
            <h3 className={`${s.h3} ${s.rowLabel}`}>Crew</h3>
            <div className={s.names}>
              {CREW.map(([n, r]) => (
                <div key={n} className={s.nameCard}>
                  <strong>{n}</strong>
                  <span>{r}</span>
                </div>
              ))}
            </div>
            <p className={s.body}>
              Blackbird’s shows are photographed by volunteers, and the albums are part of the story. The MAKH Quartet and
              Katie Campbell matinee has 61 photos. The October 22 Mex Jam has 64. Every Jazz Session has its own album, from
              the first night at Rivercity Players to the Cole Porter tribute.
            </p>
            <div className={s.btnRow}>
              <Ext href={ALBUMS} className={s.btnTeal}>
                Browse the photo albums on Facebook
              </Ext>
            </div>
            <p className={s.small}>
              The photographers’ work also lives on in the 2027 Blackbird Wall Calendar, macrophotography images celebrating a
              year of live performance in the Comox Valley, sold on Etsy Canada, along with Blackbird water bottles, mugs,
              stickers and bags.
            </p>
          </div>
        </section>

        {/* Venues */}
        <section id="venues" className={s.light}>
          <div className={s.wrap}>
            <SectionHead
              eyebrow="Venues"
              title="Where the music happens"
              sub="A winery, a theatre, a pub, a lodge and a little red church."
            />
            <div className={s.grid3}>
              {VENUES.map((v) => (
                <article key={v.name} className={`${s.card} ${s.venueCard}`}>
                  {v.photo ? (
                    <figure className={s.venuePhoto}>
                      <div className={s.venueImg}>
                        <Image src={v.photo.src} alt={v.photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
                      </div>
                      <figcaption className={s.creditDark}>Photo: {v.photo.credit}</figcaption>
                    </figure>
                  ) : null}
                  <h3 className={s.h3}>{v.name}</h3>
                  <p className={s.role}>{v.address}</p>
                  <p>{v.body}</p>
                </article>
              ))}
            </div>
            <div className={s.photoStrip}>
              <figure>
                <div className={s.stripImg}>
                  <Image src="/blackbird/40knots-rows.jpg" alt="Vineyard rows at 40 Knots Winery" fill sizes="(max-width: 700px) 100vw, 50vw" />
                </div>
                <figcaption className={s.creditDark}>Photo: British Columbia Magazine</figcaption>
              </figure>
              <figure>
                <div className={s.stripImg}>
                  <Image src="/blackbird/40knots-tasting.jpg" alt="Wine tasting at 40 Knots Winery" fill sizes="(max-width: 700px) 100vw, 50vw" />
                </div>
                <figcaption className={s.creditDark}>Photo: Experience Comox Valley</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Season */}
        <section id="season" className={s.dark}>
          <div className={s.wrap}>
            <SectionHead eyebrow="Season" title="The season so far" sub="Every show Blackbird has put on, newest first." />
            <ul className={s.season}>
              {SEASON.map(([date, what]) => (
                <li key={date + what}>
                  <span className={s.seasonDate}>{date}</span>
                  <span>{what}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Community */}
        <section id="community" className={s.light}>
          <div className={s.wrap}>
            <SectionHead eyebrow="Community" title="More than the music" sub="Blackbird looks after the scene it is building." />
            <div className={s.grid3}>
              <article className={s.card}>
                <h3 className={s.h3}>The monthly jazz calendar</h3>
                <p>
                  Blackbird publishes a monthly calendar of live jazz from Campbell River to Qualicum, crowdsourced from the
                  community. Know of a gig? They will add it.
                </p>
                <Ext href={CALENDAR} className={s.btnTeal}>
                  See the November calendar
                </Ext>
              </article>
              <article className={s.card}>
                <h3 className={s.h3}>Looking after the people who make the music</h3>
                <p>
                  When working musician Joey Smith suffered a stroke, Blackbird shared his fundraiser: when a working musician
                  can’t perform, the impact goes far beyond the music.
                </p>
                <Ext href="https://www.gofundme.com/f/joey-smiths-stroke-recovery" className={s.btnTeal}>
                  Joey Smith’s GoFundMe
                </Ext>
              </article>
              <article className={s.card}>
                <h3 className={s.h3}>Take a piece home</h3>
                <p>
                  The 2027 Blackbird Wall Calendar, macrophotography images celebrating a year of live performance in the Comox
                  Valley, plus water bottles, mugs, stickers and bags, sold on Etsy Canada. Search Etsy for Blackbird
                  Productions 2027 Calendar.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className={s.dark}>
          <div className={s.wrap}>
            <SectionHead eyebrow="Reviews" title="What people say" sub="100 percent recommend, across 17 Facebook reviews." />
            <div className={s.quotes}>
              {QUOTES.map(([q, who]) => (
                <blockquote key={who} className={s.quote}>
                  <p>“{q}”</p>
                  <cite>{who}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <p className={s.footBig}>Come hear it live.</p>
          <ul className={s.footLinks}>
            <li>
              <Ext href={FB}>Facebook Page</Ext>
            </li>
            <li>
              <Ext href={INSTAGRAM}>Instagram</Ext>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <a href="tel:+12365082897">(236) 508-2897</a>
            </li>
            <li>
              <Ext href={CALENDAR}>Jazz calendar</Ext>
            </li>
            <li>
              Tickets: <Ext href={ADMITONE}>AdmitONE</Ext> and <Ext href={EVENTBRITE}>Eventbrite</Ext>
            </li>
          </ul>
          <p className={s.fine}>
            Built from Blackbird Productions’ public Facebook and Instagram posts. Event details can change, check the Facebook
            Page before you go. <Link href="/">Back to Mel McCutcheon</Link>.
          </p>
        </div>
      </footer>
    </div>
  );
}
