# Leads web app (Google Apps Script)

`Code.gs` receives website enquiries and WhatsApp-click beacons, saves each one as a row in a Google Sheet, emails the agency, and sends the visitor a branded confirmation.

## What it does

| Request `type` | Sheet tab | Emails |
| --- | --- | --- |
| `enquiry` | `Enquiries` | Agency alert to `NOTIFY_EMAILS`, plus a confirmation to the visitor (at most one per email address per day) |
| `whatsapp_click` | `WhatsApp Clicks` | Agency alert, at most one per session + page every 6 hours |

- The site sends requests as `text/plain` JSON, so the browser skips the CORS preflight. Responses are `{ "ok": true }` or `{ "ok": false, "error": "…" }`.
- A request is rejected when the `botcheck` honeypot is filled, when `token` doesn't match `SITE_TOKEN`, or when there are more than 10 requests from one session (150 across all visitors) in 10 minutes.
- Free Gmail accounts can send to about 100 recipients a day. When that runs out, the row is still saved and emails are skipped. The skip is logged under **Executions**. The visitor confirmation is sent only if the agency alert went out, so the site never promises a call-back nobody was told about.
- You can change the copy, brand colours, call-back promise (`CALLBACK_PROMISE`), office phones and limits in the constants at the top of `Code.gs`.

## Setup

1. Create (or open) the Google Sheet for leads using the account that should send the emails.
2. **Extensions → Apps Script**. Delete the starter code, paste in the whole of `Code.gs`, and save.
3. **Project Settings** (gear icon) → **Script properties** → add:
   - `NOTIFY_EMAILS`: the agency inboxes, comma-separated, e.g. `vanita@vconnectholidays.com,sales@vconnectholidays.com`
   - `SITE_TOKEN`: a long random string, e.g. the output of `openssl rand -hex 24`
   - While you're there, set **Time zone** to `(GMT+05:30) India Standard Time` so sheet timestamps are in IST.
4. In the editor, pick `setup` in the function dropdown and click **Run**. This creates both tabs with frozen, bold headers and starts the authorisation prompt. Google says the app isn't verified: click **Advanced → Go to (project name) (unsafe) → Allow**. This is expected for your own script.
5. Optional: run `testEnquiry` and `testWhatsAppClick`. Each one adds a row, the agency gets an alert, and the first `NOTIFY_EMAILS` address gets the visitor confirmation.
6. **Deploy → New deployment** → type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and authorise again if asked.
7. Copy the **Web app URL**, which ends in `/exec`.
8. In the website project:
   - Add these to `.env.local`:
     ```
     VITE_LEADS_ENDPOINT=https://script.google.com/macros/s/…/exec
     VITE_LEADS_TOKEN=<same value as SITE_TOKEN>
     ```
   - Add the same two variables in **Vercel → Project → Settings → Environment Variables** (Production and Preview), then redeploy the site so Vite bakes them in.
9. Health check: opening the `/exec` URL in a browser should return `{"ok":true,…}`.

## Updating the script later

After you edit `Code.gs`, go to **Deploy → Manage deployments**, select the web-app deployment, click ✏️ **Edit**, set **Version** to **New version**, then **Deploy**. This keeps the same `/exec` URL. If you create a *new deployment* instead, you get a new URL and must update `VITE_LEADS_ENDPOINT` everywhere.

## Notes

- `SITE_TOKEN` ships in the site's JavaScript, so it is not a secret. It only stops casual abuse of the URL. To rotate it, change the Script property, update `VITE_LEADS_TOKEN` in `.env.local` and Vercel, and redeploy the site. You don't need a new script version.
- User text is HTML-escaped in emails. In the sheet, values starting with `= + - @` get a leading `'` so they can't run as formulas.
- To debug a failed request, open **Executions** in the Apps Script sidebar.
