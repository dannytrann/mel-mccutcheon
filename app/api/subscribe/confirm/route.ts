import { addSubscriber, readToken } from "@/lib/subscribe";

// Opened from the confirmation email. Adds the address to the list and sends
// the visitor back to the sign-up box with a status the form displays.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = readToken(url.searchParams.get("token"));
  const back = (status: string) => Response.redirect(new URL(`/?subscribed=${status}#updates`, url), 303);

  if (!email) return back("expired");
  try {
    await addSubscriber(email);
    return back("yes");
  } catch (err) {
    console.error("subscribe: confirm failed", err);
    return back("error");
  }
}
