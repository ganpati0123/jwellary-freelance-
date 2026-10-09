# Supabase Edge Functions

Create these functions with `supabase functions new create-order`, `verify-payment`, and `razorpay-webhook`.

Required Supabase secrets: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET`.

The browser should call `create-order` and `verify-payment` through the Supabase client. The functions must validate the authenticated user, calculate prices from trusted server configuration, verify Razorpay HMAC signatures, and update `orders`/`payments` using the service role only after validation. The webhook must verify the original raw request body and deduplicate by `provider_event_id`.

Do not place any of these secrets in Vite environment variables.
