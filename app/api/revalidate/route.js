import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server';

export function POST() {

  console.log("Running Webhook...")
  // revalidateTag('mi-etiqueta-de-cache');
  revalidatePath('/');
  revalidatePath('/testimonials', 'page');
  revalidatePath('/consultations', 'page');

  return NextResponse.json({ message: 'Cache revalidated' });
}
