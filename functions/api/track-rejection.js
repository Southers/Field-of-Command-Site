// Track cookie rejections
export async function onRequest(context) {
    const { request, env } = context;

    // Only allow POST
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Get client IP for tracking
        const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
        const userAgent = request.headers.get('User-Agent') || 'unknown';
        const timestamp = new Date().toISOString();

        // Store rejection in KV with IP+timestamp as key
        const rejectionKey = `rejection:${Date.now()}:${clientIP}`;
        const rejectionData = {
            ip: clientIP,
            userAgent: userAgent,
            timestamp: timestamp,
            type: 'cookie_rejection'
        };

        // Store for 90 days (for tracking purposes)
        await env.NEWSLETTER_DB.put(
            rejectionKey,
            JSON.stringify(rejectionData),
            { expirationTtl: 90 * 24 * 60 * 60 }
        );

        console.log('Cookie rejection tracked:', rejectionKey);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error tracking rejection:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
