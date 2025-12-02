export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const email = body.email;

    // Validate email is present
    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    // Sanitize email (trim whitespace and convert to lowercase)
    const sanitizedEmail = email.trim().toLowerCase();

    // Check for reasonable length
    if (sanitizedEmail.length > 254) {
      return new Response(JSON.stringify({ error: "Email too long" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();

    // Saves to Cloudflare KV. Ensure you have bound NEWSLETTER_DB in Cloudflare dashboard.
    await env.NEWSLETTER_DB.put(id, JSON.stringify({ email: sanitizedEmail, timestamp }));

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}