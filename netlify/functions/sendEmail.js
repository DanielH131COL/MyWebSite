// netlify/functions/sendEmail.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { from_name, from_email, message } = JSON.parse(event.body);

  const SERVICE_ID   = process.env.EMAILJS_SERVICE_ID;
  const TEMPLATE_ID  = process.env.EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY   = process.env.EMAILJS_PUBLIC_KEY;

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: { from_name, from_email, message }
      })
    });

    if (!res.ok) throw new Error('EmailJS failed');

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};