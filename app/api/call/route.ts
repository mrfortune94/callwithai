import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

export async function POST(req: Request) {
  const { to, prompt } = await req.json();
  const client = twilio(accountSid, authToken);

  try {
    const call = await client.calls.create({
      to,
      from: twilioNumber,
      twiml: `<Response><Say>${prompt}</Say></Response>`,
    });
    return NextResponse.json({ success: true, sid: call.sid });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}