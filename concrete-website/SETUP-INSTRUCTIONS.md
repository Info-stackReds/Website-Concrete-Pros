# Concrete Pros IL — Form + SMS Automation Setup

## How to Set Up Google Form + Auto-Text + Owner Text Alert

### STEP 1 — Create Your Google Form
1. Go to forms.google.com
2. Create a new form with these fields:
   - First Name (Short answer)
   - Last Name (Short answer)
   - Phone Number (Short answer)
   - Email (Short answer)
   - Service Needed (Dropdown)
   - City (Dropdown)
   - Project Size (Dropdown)
   - Project Details (Paragraph)
3. Click the 3-dot menu → "Get pre-filled link" to get your form's action URL
4. Click Settings → turn on "Collect email addresses" if desired

### STEP 2 — Connect to Zapier (Free tier works)
Go to zapier.com and create a "Zap":

**Trigger:** Google Forms → New Response
**Actions (run 2):**

**Action 1 — Text YOU (the owner):**
- App: Twilio (or TextMagic)
- Action: Send SMS
- To: YOUR phone number
- Message: "New concrete lead! {{First Name}} {{Last Name}} | {{Phone}} | {{Service}} | {{City}} — Call them back ASAP!"

**Action 2 — Text the CUSTOMER:**
- App: Twilio (or TextMagic)  
- Action: Send SMS
- To: {{Phone Number field}}
- Message: "Hi {{First Name}}, this is Concrete Pros IL! We received your estimate request for {{Service}} in {{City}}. When's the best time for us to call you? Reply with a time and we'll reach out then. — (815) 403-7233"

### STEP 3 — Twilio Setup (Sends the texts)
1. Go to twilio.com — sign up free ($15 free credit to start)
2. Get a Twilio phone number (~$1/month)
3. Copy your Account SID and Auth Token
4. Paste them into your Zapier Twilio connection

### STEP 4 — Embed the Google Form on Your Site
Replace the current contact form in contact.html with:

```html
<iframe 
  src="YOUR_GOOGLE_FORM_EMBED_URL" 
  width="100%" 
  height="900" 
  frameborder="0" 
  marginheight="0" 
  marginwidth="0"
  style="border:none;border-radius:4px">
  Loading form...
</iframe>
```

Get the embed URL from Google Forms → Send → Embed icon (<>)

### STEP 5 — Alternative: Use Formspree (Simpler)
If Zapier feels complicated:
1. Go to formspree.io — free plan allows 50 submissions/month
2. Connect your form to Formspree
3. Formspree sends you an email on every submission
4. Use a separate service like TextMagic for SMS

### COST ESTIMATE
- Twilio: ~$1/month for phone number + ~$0.0079 per text
- Zapier: Free tier (100 tasks/month) — enough for most contractors
- Total: ~$1–5/month for full automation

### HOW IT WORKS END TO END
1. Customer fills form on your website
2. Google Sheets records the response
3. Zapier detects new row in 1-15 minutes
4. Zapier sends YOU a text: "New lead from Crystal Lake..."
5. Zapier sends CUSTOMER a text: "Hi John, when's a good time to call?"
6. Customer replies with a time
7. You call them at that time — they're expecting your call
8. Higher answer rate = more jobs booked
