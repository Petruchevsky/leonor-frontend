import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server';

export function POST() {

  revalidateTag('mi-etiqueta-de-cache');

  return NextResponse.json({ message: 'Cache revalidated' });
}
