# Google Analytics 4 Setup Guide

Your site is now configured with **GDPR-compliant** Google Analytics that only loads after user consent.

## Quick Setup (5 minutes)

### 1. Create Google Analytics 4 Account

1. Go to https://analytics.google.com/
2. Click **Admin** (bottom left)
3. Click **Create Property**
4. Fill in:
   - Property name: `Field of Command`
   - Reporting time zone: Your timezone
   - Currency: GBP
5. Click **Next** → **Create**
6. Click **Web** as platform
7. Set up data stream:
   - Website URL: `https://www.fieldofcommand.com`
   - Stream name: `Field of Command Website`
8. Click **Create stream**

### 2. Get Your Measurement ID

After creating the stream, you'll see:
```
Measurement ID: G-XXXXXXXXXX
```

Copy this ID (starts with `G-`).

### 3. Update Your Site

Open `js/main.js` and find line 133:

```javascript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 ID
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID:

```javascript
const GA_MEASUREMENT_ID = 'G-AB12CD34EF'; // Your real ID here
```

### 4. Deploy

Commit and push:
```bash
git add js/main.js
git commit -m "feat: add Google Analytics 4 tracking"
git push
```

### 5. Test It Works

1. Visit your site: https://www.fieldofcommand.com
2. Accept cookies
3. In Google Analytics, go to **Reports** → **Realtime**
4. You should see yourself as an active user!

## What's Already Configured

✅ **GDPR Compliance**: Analytics only loads AFTER user accepts cookies
✅ **IP Anonymization**: User IP addresses are anonymized
✅ **Secure Cookies**: SameSite and Secure flags set
✅ **Custom Events**: Cookie consent is tracked as an event
✅ **CSP Headers**: Content Security Policy updated for GA domains

## Tracked Events

### Automatic Events (Google Analytics default):
- Page views
- Scroll depth
- Outbound link clicks
- File downloads
- Video engagement

### Custom Events (already configured):
- `cookie_consent`: Fired when user accepts cookies

### Add More Custom Events (Optional)

Want to track specific actions? Add to `js/main.js`:

```javascript
// Track Steam wishlist button clicks
document.querySelectorAll('a[href*="steam"]').forEach(btn => {
    btn.addEventListener('click', () => {
        gtag('event', 'wishlist_click', {
            'event_category': 'engagement',
            'event_label': 'steam_wishlist'
        });
    });
});

// Track newsletter signups
form.addEventListener('submit', () => {
    gtag('event', 'newsletter_signup', {
        'event_category': 'conversion',
        'event_label': 'footer_form'
    });
});

// Track social media clicks
document.querySelectorAll('a[href*="discord"], a[href*="reddit"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = e.target.closest('a').href.includes('discord') ? 'discord' : 'reddit';
        gtag('event', 'social_click', {
            'event_category': 'engagement',
            'event_label': platform
        });
    });
});
```

## Important Dashboards to Set Up

### 1. Conversion Tracking

In GA4, create these conversions:
- Event name: `newsletter_signup` → Mark as conversion
- Event name: `wishlist_click` → Mark as conversion

### 2. Custom Reports

Recommended reports to create:
- **Newsletter Performance**: Track signup rate by traffic source
- **Wishlist Funnel**: See how many visitors click wishlist button
- **Social Engagement**: Compare Discord vs Reddit vs YouTube traffic

### 3. Alerts

Set up email alerts for:
- Traffic drops > 50%
- Spike in 404 errors
- Unusual bounce rate

## Privacy Policy Update

Your privacy policy already mentions analytics. Make sure it states:
- ✓ We use Google Analytics
- ✓ Data is anonymized
- ✓ Users can opt out via cookie banner
- ✓ Link to Google's privacy policy

Already done! See `privacy.html` line 42.

## Testing Checklist

Before going live with GA:

- [ ] Measurement ID is correct (starts with `G-`)
- [ ] Cookie banner appears on first visit
- [ ] Analytics only loads AFTER accepting cookies
- [ ] Real-time reports show activity
- [ ] Test on incognito/private browsing
- [ ] Test cookie rejection (analytics should NOT load)

## Advanced: Enhanced Measurement

In GA4, enable these (Admin → Data Streams → Your Site → Enhanced Measurement):

- ✅ Page views
- ✅ Scrolls (tracks 90% scroll depth)
- ✅ Outbound clicks
- ✅ Site search (if you add search later)
- ✅ Video engagement (for YouTube embeds)
- ✅ File downloads

## Troubleshooting

### "No data is showing up"

1. Check browser console for errors
2. Verify Measurement ID is correct
3. Make sure you accepted cookies
4. Wait 24-48 hours for historical data
5. Check AdBlockers aren't blocking GA

### "Cookie banner doesn't show"

Clear localStorage:
```javascript
localStorage.removeItem('cookiesAccepted');
```
Reload page.

### "Getting CSP errors"

Already fixed! CSP headers include Google Analytics domains.

## Data Retention

Set data retention in GA4:
- Admin → Data Settings → Data Retention
- Recommended: **14 months** (maximum for free tier)

## GDPR Compliance Checklist

Your site already complies with:

- ✅ Cookie consent before loading analytics
- ✅ IP anonymization enabled
- ✅ Privacy policy disclosure
- ✅ Opt-out mechanism (reject cookies)
- ✅ Data minimization (no PII collected)

## Resources

- GA4 Documentation: https://support.google.com/analytics/
- Debug Mode: Add `?debug_mode=true` to URL
- GA Debugger Extension: https://chrome.google.com/webstore (search "Google Analytics Debugger")
- Event Builder: https://ga-dev-tools.google/ga4/event-builder/

## Questions?

Common questions answered:

**Q: Does this slow down my site?**
A: No! Analytics loads asynchronously and only after consent.

**Q: Can users opt out?**
A: Yes! They can reject cookies or use browser's Do Not Track.

**Q: Is this GDPR compliant?**
A: Yes! Analytics only loads after explicit consent.

**Q: How long until I see data?**
A: Real-time data appears instantly. Historical reports take 24-48 hours.

**Q: Can I track conversions?**
A: Yes! Mark `newsletter_signup` and `wishlist_click` as conversions in GA4.
