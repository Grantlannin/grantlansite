import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    main: process.env.ACTIVECAMPAIGN_MAIN_LIST_ID ?? null,
    identity: process.env.ACTIVECAMPAIGN_IDENTITY_LIST_ID ?? null,
    workWaitlist: process.env.ACTIVECAMPAIGN_WORK_WAITLIST_LIST_ID ?? null,
    workWaitlistEffective:
      process.env.ACTIVECAMPAIGN_WORK_WAITLIST_LIST_ID?.trim() ||
      process.env.ACTIVECAMPAIGN_MAIN_LIST_ID?.trim() ||
      process.env.ACTIVECAMPAIGN_LIST_ID?.trim() ||
      null,
  });
}
