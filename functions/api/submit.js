export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const email = body.email;

    if (!email) {
      return new Response("Email required", { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();

    // Saves to Cloudflare KV. Ensure you have bound NEWSLETTER_DB in Cloudflare dashboard.
    await env.NEWSLETTER_DB.put(id, JSON.stringify({ email, timestamp }));

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}