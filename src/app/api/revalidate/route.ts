import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { RANK_TAG } from '@/lib/fetchMembers';

export async function POST(request: NextRequest) {
  const token = request.headers.get('X-Token');
  
  // 验证token
  if (!process.env.REVALIDATE_TOKEN || token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
  
  try {
    // 重新验证缓存标签
    revalidateTag(RANK_TAG);
    
    return NextResponse.json({
      ok: true,
      message: 'Cache revalidated successfully',
      tag: RANK_TAG
    });
  } catch (error) {
    console.error('Error revalidating cache:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to revalidate cache' },
      { status: 500 }
    );
  }
}
