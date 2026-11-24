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

const FB = "https://www.facebook.com/BlackbirdProductionsvanisle";
const ALBUMS = `${FB}/photos_albums`;

const ADMITONE = "https://admitone.com/events/comox/community/music/the-sarah-stevenson-trio-aegean/P36NYF";
const EVENTBRITE = "https://www.eventbrite.com/cc/winter-jazz-sessions-no1-6-4753763/";
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

const initials = (name: string) =>
  name
    .replace(/^The /, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

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

type Ev = {
  day: string;
  month: string;
  title: string;
  when: string;
  where: string;
  body: string;
  links: [string, string][];
  image?: [string, string];
};

const EVENTS: Ev[] = [
  {
    day: "26",
    month: "Nov",
    title: "Jazz Jam",
    when: "Thursday, November 26, 2026, 6 to 8 pm",
    where: "The Mex Pub, 1001 Ryan Road, Courtenay",
    body: "Co-hosted by Beau Stocker. An open jazz jam, not an open mic. A host band that changes each session, sign up with jam band manager Mel McCutcheon, two tunes per turn. Under 18 students are welcome in the Young Artist Hang. Backline provided: upright bass, guitar amp, keyboard, drum kit and microphone.",
    links: [["See it on Facebook", FB]],
  },
  {
    day: "10",
    month: "Dec",
    title: "Jazz Night, Swingin’ Christmas",
    when: "Thursday, December 10, 2026, 6 to 8 pm",
    where: "The Mex Pub, 1001 Ryan Road, Courtenay",
    body: "Mel McCutcheon and Melissa Thibeault, with Beau Stocker, John Hyde and Rick Jamison. Jazzy Christmas favourites and timeless standards. Kitchen open till 9:30 pm. Suggested donation $5 to $20.",
    links: [["See the Facebook event", "https://www.facebook.com/events/1065221926539062/"]],
  },
  {
    day: "20",
    month: "Dec",
    title: "The Sarah Stevenson Trio, Christmas Matinee",
    when: "Sunday, December 20, 2026, 1:30 to 3:30 pm, doors 12:30 pm",
    where: "40 Knots Winery, 2400 Anderton Road, Comox",
    body: "Sarah Stevenson on vocals, Andrew Janusson on guitar, Drake Shoemaker on bass. Opening act Aegean, a six-piece jazz group from the jazz program at Capilano University, many of its members with roots in the Comox Valley. Soup and roll, full bar, all ages. Sarah’s only Vancouver Island holiday show.",
    links: [
      ["Get tickets on AdmitONE", ADMITONE],
      ["See the Facebook event", "https://www.facebook.com/events/1733905401011973/"],
    ],
    image: ["/blackbird/sarah-stevenson-trio-flyer.jpg", "Flyer for The Sarah Stevenson Trio with opening act Aegean, Sunday December 20 at 40 Knots Winery"],
  },
];

const SESSIONS = [
  ["1", "Late Fall, Smooth Call", "Saturday, November 22, 2025", "The Mel McCutcheon Quartet, with two opening acts. Rivercity Players, Campbell River."],
  ["2", "Afternoon Groove", "Saturday, December 6, 2025", "The Drummond-Stocker Duo. 40 Knots Winery."],
  ["3", "Take Five Below", "Saturday, January 10, 2026", "The Sharp Seven. 40 Knots Winery."],
  [
    "4",
    "Sunday Swing",
    "Sunday, February 15, 2026",
    "Melissa Thibeault on vocals and Rick Jamison on guitar, with Drake Shoemaker. Presented with the Georgia Straight Jazz Society. 40 Knots Winery.",
  ],
  ["5", "Tribute to Cole Porter", "Sunday, March 1, 2026", "Amy and Her Accomplices. 40 Knots Winery."],
  ["6", "Syncopated Sunday", "Sunday, March 15, 2026", "Anderson Jazz Trio. 40 Knots Winery."],
];

const ARTISTS = [
  [
    "Sarah Stevenson",
    "Vocals",
    "Nanaimo born, now making waves in Montreal’s jazz scene. Two DownBeat Magazine Awards at just 21 years old, and a performance at the Montreal International Jazz Festival. Smooth, silky vocals and fresh interpretations of jazz classics.",
  ],
  [
    "Katie Campbell",
    "Vocals and songwriter",
    "Born and raised on Vancouver Island. She found her voice at 34, fronted her first band Live Edge, and stepped into the spotlight at 38 with her own original music. Five EPs, more than 200,000 Spotify streams, and over 10,000 TikTok followers. She also holds a Live Sound Technician Certification from Berklee College of Music and runs sound at the Mex Pub jams under her business Ridiculous Sound Solutions.",
  ],
  [
    "Melissa Thibeault",
    "Vocals",
    "Soulful vocals at the Sunday Swing matinee and the Swingin’ Christmas night. Her French set at the very first Blackbird concert is still talked about in the reviews.",
  ],
  [
    "Malakai",
    "Singer-songwriter",
    "A young Duncan, BC musician whose songwriting and musicianship belie his years. Folk, soul and contemporary influences, an intimate and expressive style. He opened the fall season at 40 Knots on October 18.",
  ],
  [
    "The Valley Cats",
    "Jazz, R&B and funk",
    "A six-piece Comox Valley band bringing jazz, R&B and funk: Charity Munro on vocals, Mike Berman on drums, Mike Eddy on keys, Grahame Edwards on bass, Jeff Agopsowicz on trombone, Dave Lymbuner on trumpet, with special guest Rachel Cooper on sax and clarinet.",
  ],
  [
    "The MAKH Quartet",
    "Quartet",
    "Brock Meades on bass, Eryn Krieger on trumpet and vocals, Michael Anderson on guitar and vocals, Ronin Hutton on drums. Jazz, funk, country, classical and world music in one adventurous, accessible sound. Michael is Nanaimo based, rhythm guitarist and vocalist for String Fever. Eryn is from Salt Spring Island and draws on Miles Davis, Chet Baker and Clark Terry.",
  ],
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
  ["Katie Campbell", "Sound, Ridiculous Sound Solutions"],
];

// logo: [src, background behind it, fit]. "cover" fills the panel (for square tiles), "contain" sits inside it.
type Venue = { name: string; address: string; body: string; logo?: [string, string, "contain" | "cover"] };

const VENUES: Venue[] = [
  {
    name: "40 Knots Winery",
    address: "2400 Anderton Road, Comox",
    body: "Home of the Sunday matinees. A coastal vineyard above the Salish Sea, wines made from 100 percent Comox grapes, 90 percent estate grown, plus four ciders. In October 2026 it was acquired by the K’omoks Economic Development Corporation, making it Canada’s second Indigenous-owned winery.",
    logo: ["/blackbird/logos/40-knots.png", "var(--color-bg-alt)", "contain"],
  },
  {
    name: "Rivercity Players",
    address: "1080 Hemlock Street, Campbell River",
    body: "Home of the very first Jazz Session on November 22, 2025.",
    logo: ["/blackbird/logos/rivercity-players.png", "#911934", "cover"],
  },
  {
    name: "The Mex Pub",
    address: "1001 Ryan Road, Courtenay",
    body: "Home of the Jazz Nights and the Jazz Jams, with the generous support of The Mex Pub and Grill.",
    logo: ["/blackbird/logos/the-mex.png", "#14242c", "contain"],
  },
  {
    name: "Painter’s Lodge",
    address: "Campbell River",
    body: "Hosted the Valentine’s Lunch Matinee on February 14, 2026.",
    logo: ["/blackbird/logos/painters-lodge.png", "#f4efe6", "contain"],
  },
  {
    name: "Little Red Church",
    address: "Comox",
    body: "Hosted One Winter Night 4 on February 7, 2026.",
    logo: ["/blackbird/logos/little-red-church.png", "#fff", "contain"],
  },
];

const SEASON = [
  ["Nov 15, 2026", "Matinee with The MAKH Quartet and Katie Campbell, 40 Knots Winery"],
  ["Nov 12, 2026", "Jazz Night with The Sharp Seven, The Mex Pub"],
  ["Oct 22, 2026", "Jazz Jam, The Mex Pub"],
  ["Oct 18, 2026", "Matinee with The Valley Cats and Malakai, 40 Knots Winery"],
  ["Oct 8, 2026", "Jazz Night with Beau Stocker and Friends, The Mex Pub"],
  ["Sep 24, 2026", "Jazz Jam, The Mex Pub"],
  ["Sep 10, 2026", "Beau Stocker and Friends, The Mex Pub"],
  ["Feb 28, 2026", "Island Standard Time matinee, sold out"],
  ["Feb 14, 2026", "Valentine’s Lunch Matinee, Painter’s Lodge, Campbell River"],
  ["Feb 7, 2026", "One Winter Night 4, Little Red Church, Comox"],
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
            <a href="#upcoming" className={`${s.btn} ${s.btnSolid}`}>
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

      {/* Upcoming */}
      <section id="upcoming" className={s.section}>
        <div className={s.wrap}>
          <Head
            eyebrow="Upcoming"
            title="Coming up next"
            sub="Three dates on the calendar. Details change, so check the Facebook Page before you head out."
          />
          <div className={s.rows}>
            {EVENTS.map((ev) => (
              <article key={ev.title} className={s.eventRow}>
                <div className={s.date}>
                  <span className={s.day}>{ev.day}</span>
                  <span className={s.month}>{ev.month}</span>
                </div>
                <div className={s.info}>
                  <div className={s.showTitle}>{ev.title}</div>
                  <div className={s.venue}>{ev.where}</div>
                  <div className={s.meta}>{ev.when}</div>
                  <p className={s.eventBody}>{ev.body}</p>
                  <div className={s.actions}>
                    {ev.links.map(([label, href]) => (
                      <Ext key={href} href={href} className={s.pill}>
                        {label}
                      </Ext>
                    ))}
                  </div>
                </div>
                {ev.image ? (
                  <div className={s.eventEmbed}>
                    <Image src={ev.image[0]} alt={ev.image[1]} width={1080} height={1080} sizes="(max-width: 900px) 100vw, 340px" />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Winter Jazz Sessions */}
      <section id="sessions" className={s.section}>
        <div className={s.wrap}>
          <Head
            eyebrow="Where it started"
            title="The Winter Jazz Sessions"
            sub="Six Sunday matinees that started it all, November 2025 to March 2026. The first at Rivercity Players in Campbell River, the rest at 40 Knots Winery in Comox."
          />
          <div className={s.rows}>
            {SESSIONS.map(([no, name, date, body]) => (
              <div key={no} className={s.sessionRow}>
                <div className={s.date}>
                  <span className={s.month}>No.</span>
                  <span className={s.day}>{no}</span>
                </div>
                <div className={s.info}>
                  <div className={s.showTitle}>{date}</div>
                  <div className={s.venue}>
                    <span className={s.venueName}>{name}</span>
                  </div>
                  <div className={s.meta}>{body}</div>
                </div>
              </div>
            ))}
          </div>
          <p className={s.more}>
            <Ext href={EVENTBRITE}>The full series on Eventbrite →</Ext>
          </p>
        </div>
      </section>

      {/* Season */}
      <section id="season" className={s.section}>
        <div className={s.wrap}>
          <Head eyebrow="Since the sessions" title="The season so far" sub="Every other show Blackbird has put on, newest first." />
          <div className={s.list}>
            {SEASON.map(([date, what]) => (
              <div key={date + what} className={s.row}>
                <div className={s.venue}>{what}</div>
                <div className={s.tag}>{date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artists */}
      <section id="artists" className={s.section}>
        <div className={s.wrap}>
          <Head
            eyebrow="The singers and musicians"
            title="The voices and the players"
            sub="Accomplished musicians, emerging artists and students, all on the same stage. That mix is the whole point of Blackbird."
          />
          <div className={s.grid}>
            {ARTISTS.map(([name, role, bio]) => (
              <div key={name} className={s.item}>
                <div className={s.placeholder} aria-hidden="true">
                  {initials(name)}
                </div>
                <h3 className={s.name}>{name}</h3>
                <div className={s.role}>{role}</div>
                <p className={s.description}>{bio}</p>
              </div>
            ))}
          </div>
          <div className={s.subheading}>Also on the Blackbird stage</div>
          <ul className={s.also}>
            {ALSO.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
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

      {/* Venues */}
      <section id="venues" className={s.section}>
        <div className={s.wrap}>
          <Head eyebrow="The venues" title="Where the music happens" sub="A winery, a theatre, a pub, a lodge and a little red church." />
          <div className={s.grid}>
            {VENUES.map((v) => (
              <div key={v.name} className={s.item}>
                {v.logo ? (
                  <div className={`${s.logoPanel} ${v.logo[2] === "cover" ? s.logoCover : ""}`} style={{ background: v.logo[1] }}>
                    <Image src={v.logo[0]} alt={`${v.name} logo`} fill sizes="(max-width: 800px) 100vw, 380px" />
                  </div>
                ) : (
                  <div className={s.placeholderPhoto} aria-hidden="true">
                    {initials(v.name)}
                  </div>
                )}
                <h3 className={s.name}>{v.name}</h3>
                <div className={s.role}>{v.address}</div>
                <p className={s.description}>{v.body}</p>
              </div>
            ))}
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
