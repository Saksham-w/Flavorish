# Newsletter System Setup Guide

## ✅ What's Been Set Up

I've implemented a complete newsletter subscription system with the following features:

### 1. **Database Schema**

- Added `Subscriber` model to track newsletter subscribers
- Fields: email (unique), createdAt, active status

### 2. **API Routes**

- **POST `/api/newsletter/subscribe`** - Handle new subscriptions
- **POST `/api/newsletter/send`** - Send newsletters to all subscribers

### 3. **Email Templates** (Using React Email)

- **WelcomeEmail** - Sent when user subscribes
- **NewPostEmail** - Sent when you publish a new post

### 4. **Footer Component**

- Interactive subscription form with real-time feedback
- Loading states and success/error messages
- Client-side form validation

---

## 🚀 Setup Instructions

### Step 1: Add Environment Variable

Add this to your `.env` file:

```bash
# Resend API Key (for sending emails)
RESEND_API_KEY=your_resend_api_key_here

# Optional: Your website URL (for email links)
NEXT_PUBLIC_URL=http://localhost:3000
```

### Step 2: Get Your Resend API Key

1. Go to https://resend.com and sign up (free tier: 3,000 emails/month)
2. Verify your domain OR use their test domain `onboarding@resend.dev`
3. Go to **API Keys** section
4. Create a new API key
5. Copy it to your `.env` file

### Step 3: Update Database

Run Prisma migration to add the Subscriber model:

```bash
npx prisma generate
npx prisma db push
```

### Step 4: Update Email "From" Address

In these files, change the `from` address to your verified domain:

- `src/app/api/newsletter/subscribe/route.js` (line 44)
- `src/utils/newsletter.js` (line 34)

```javascript
from: "FLAVORISH <newsletter@yourdomain.com>", // Change this
```

---

## 📧 How to Use

### For Users (Subscribers):

1. User enters their email in the footer
2. Clicks "Subscribe"
3. Receives welcome email
4. Gets notified when you publish new posts

### For You (Admin):

#### Option 1: Manual Trigger

After publishing a post, call this API:

```javascript
fetch("/api/newsletter/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ postSlug: "your-post-slug" }),
});
```

#### Option 2: Automatic (Recommended)

Add this to your post creation API:

```javascript
// After successfully creating a post
import { sendNewPostNotification } from "@/utils/newsletter";

// Send newsletter
await sendNewPostNotification(newPost);
```

---

## 🎨 Features Included

✅ **Duplicate Prevention** - Won't subscribe same email twice
✅ **Reactivation** - If user unsubscribed, can resubscribe
✅ **Welcome Email** - Beautiful branded email on signup
✅ **Post Notifications** - Styled email with post image & excerpt
✅ **Batch Processing** - Sends emails in batches (50 at a time) to avoid rate limits
✅ **Error Handling** - Graceful failures with user-friendly messages
✅ **Loading States** - Visual feedback during subscription
✅ **Responsive Design** - Works on all devices
✅ **Dark Mode Support** - Status messages adapt to theme

---

## 📁 Files Created/Modified

### New Files:

- `src/app/api/newsletter/subscribe/route.js` - Subscription endpoint
- `src/app/api/newsletter/send/route.js` - Send newsletter endpoint
- `src/emails/WelcomeEmail.jsx` - Welcome email template
- `src/emails/NewPostEmail.jsx` - New post notification template
- `src/utils/newsletter.js` - Newsletter utility functions

### Modified Files:

- `prisma/schema.prisma` - Added Subscriber model
- `src/components/footer/Footer.jsx` - Added subscription form
- `src/components/footer/Footer.module.css` - Added status message styles

---

## 🎯 Next Steps

1. **Add unsubscribe functionality** (optional):
   - Create `/unsubscribe` page
   - API route to set `active: false`

2. **Add to your post creation workflow**:
   - Automatically send newsletter when publishing
   - Or add a "Send Newsletter" button in your admin panel

3. **Customize emails**:
   - Edit templates in `src/emails/`
   - Add your branding, colors, etc.

4. **Analytics** (optional):
   - Track open rates with Resend dashboard
   - Add UTM parameters to links

---

## 🧪 Testing

Test the subscription:

```bash
# Start your dev server
npm run dev

# Go to footer and enter your email
# Check your email inbox for welcome message
```

Test sending newsletter:

```bash
# Use curl or Postman
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Content-Type: application/json" \
  -d '{"postSlug":"your-post-slug"}'
```

---

## 💡 Tips

- **Free Tier Limits**: Resend free tier = 3,000 emails/month, 100/day
- **Domain Verification**: For production, verify your domain in Resend
- **Testing**: Use `onboarding@resend.dev` for testing (works without verification)
- **Rate Limits**: The system sends 50 emails per batch with 1s delay
- **Error Monitoring**: Check console logs for failed email sends

---

## 🐛 Troubleshooting

**"Module not found: resend"**

- Run: `npm install resend react-email @react-email/components`

**"RESEND_API_KEY is not defined"**

- Add the API key to your `.env` file

**Emails not sending**

- Check Resend dashboard for logs
- Verify your API key is correct
- Check console for errors

**Duplicate subscriptions**

- The system prevents this automatically
- User will see "You're already subscribed!"

---

Need help? Let me know! 🚀
