import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  const cookieStore = await cookies();
  cookieStore.delete('NEXT_LOCALE')

  return NextResponse.json('cookie is clear' + cookieStore.get('NEXT_LOCALE')?.value);
}
