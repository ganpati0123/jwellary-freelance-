import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const auth = request.headers.get('Authorization');
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: auth ?? '' } } });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    const { amountInr } = await request.json();
    if (!Number.isInteger(amountInr) || amountInr <= 0) return new Response(JSON.stringify({ error: 'Invalid amount' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const secret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!keyId || !secret) throw new Error('Razorpay payment setup is not configured');
    const razorResponse = await fetch('https://api.razorpay.com/v1/orders', { method: 'POST', headers: { Authorization: `Basic ${btoa(`${keyId}:${secret}`)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: amountInr * 100, currency: 'INR', receipt: crypto.randomUUID() }) });
    if (!razorResponse.ok) throw new Error('Unable to create payment order');
    const razorOrder = await razorResponse.json();
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: order, error } = await admin.from('orders').insert({ user_id: user.id, razorpay_order_id: razorOrder.id, amount_inr: amountInr }).select('id').single();
    if (error) throw error;
    return new Response(JSON.stringify({ orderId: order.id, razorpayOrderId: razorOrder.id, amount: razorOrder.amount, keyId }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }
});
