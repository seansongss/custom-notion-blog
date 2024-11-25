import { loadData, loadCategoryData, revalidateCache } from "@/lib/db-manager";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const secretKey = searchParams.get('secretKey');

    if (secretKey !== process.env.SECRET_KEY) {
        return NextResponse.json({ message: 'Invalid secret key' }, { status: 401 });
    }

    try {
        revalidateCache();
        await loadData();
        await loadCategoryData();
        revalidatePath('/', 'layout');
        return NextResponse.json({ message: 'Revalidated articles' }, { status: 200 });
    } catch (err) {
        console.error('Revalidation error:', err);
        return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
    }
}
