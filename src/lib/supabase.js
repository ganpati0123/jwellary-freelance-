import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const hasSupabaseConfig = () => Boolean(supabase);
export const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
export const signUp = (email, password, displayName) => supabase.auth.signUp({ email, password, options: { data: { display_name: displayName }, emailRedirectTo: `${window.location.origin}/auth/callback` } });
export const signOut = () => supabase?.auth.signOut();
export const getSession = () => supabase ? supabase.auth.getSession() : Promise.resolve({ data: { session: null } });
export const onAuthStateChange = (callback) => supabase?.auth.onAuthStateChange(callback);
export const getPaymentHistory = async (userId) => { if (!supabase || !userId) return []; const { data } = await supabase.from('payments').select('id, order_id, status, razorpay_payment_id, created_at').eq('user_id', userId).order('created_at', { ascending: false }); return data || []; };
export const createPaymentOrder = async (amountInr) => { const { data, error } = await supabase.functions.invoke('create-order', { body: { amountInr } }); if (error) throw error; return data; };
export const verifyPayment = async (payload) => { const { data, error } = await supabase.functions.invoke('verify-payment', { body: payload }); if (error) throw error; return data; };
export const loadRazorpay = () => window.Razorpay ? Promise.resolve(true) : new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = 'https://checkout.razorpay.com/v1/checkout.js'; script.onload = () => resolve(true); script.onerror = reject; document.body.appendChild(script); });
export async function startCheckout({ amountInr, user, onSuccess, onFailure }) { const order = await createPaymentOrder(amountInr); await loadRazorpay(); const checkout = new window.Razorpay({ key: order.keyId, amount: order.amount, currency: 'INR', name: 'Vani Kabir Studio', description: 'Studio order', order_id: order.razorpayOrderId, prefill: { email: user.email }, handler: async (response) => { try { await verifyPayment({ ...response, orderId: order.orderId }); onSuccess?.(); } catch (error) { onFailure?.(error); } }, modal: { ondismiss: () => onFailure?.(new Error('Payment cancelled.')) } }); checkout.open(); }
