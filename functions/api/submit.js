export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Rate limiting: Get client IP
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `ratelimit:${clientIP}`;

    // Check rate limit (max 3 submissions per hour per IP)
    const rateLimitData = await env.NEWSLETTER_DB.get(rateLimitKey);
    if (rateLimitData) {
      const { count, timestamp } = JSON.parse(rateLimitData);
      const oneHour = 60 * 60 * 1000;
      const timeSinceFirst = Date.now() - timestamp;

      if (timeSinceFirst < oneHour && count >= 3) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
          headers: { "Content-Type": "application/json" },
          status: 429
        });
      }

      // Reset counter if hour has passed
      if (timeSinceFirst >= oneHour) {
        await env.NEWSLETTER_DB.put(rateLimitKey, JSON.stringify({ count: 1, timestamp: Date.now() }), {
          expirationTtl: 3600 // 1 hour
        });
      } else {
        // Increment counter
        await env.NEWSLETTER_DB.put(rateLimitKey, JSON.stringify({ count: count + 1, timestamp }), {
          expirationTtl: 3600
        });
      }
    } else {
      // First request from this IP
      await env.NEWSLETTER_DB.put(rateLimitKey, JSON.stringify({ count: 1, timestamp: Date.now() }), {
        expirationTtl: 3600
      });
    }

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

    // Check if email already exists (prevent duplicates)
    const emailKey = `email:${sanitizedEmail}`;
    const existingEmail = await env.NEWSLETTER_DB.get(emailKey);
    if (existingEmail) {
      return new Response(JSON.stringify({ error: "Email already registered" }), {
        headers: { "Content-Type": "application/json" },
        status: 409
      });
    }

    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();

    // Save email with both ID-based and email-based keys for deduplication
    await env.NEWSLETTER_DB.put(id, JSON.stringify({ email: sanitizedEmail, timestamp }));
    await env.NEWSLETTER_DB.put(emailKey, JSON.stringify({ id, timestamp }));

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (err) {
    console.error('Newsletter signup error:', err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}