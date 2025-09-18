import { NextRequest, NextResponse } from 'next/server';

// 开发环境使用内存存储点击数
const clicksMap = new Map<string, number>();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { ok: false, error: 'URL parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    // 记录点击
    const currentClicks = clicksMap.get(url) || 0;
    clicksMap.set(url, currentClicks + 1);
    console.log(`[Click] ${url} - Total clicks: ${currentClicks + 1}`);
    
    // 生产环境：如果配置了Redis，将点击数据发送到Redis
    if (process.env.REDIS_URL && process.env.REDIS_TOKEN) {
      // 预留Redis接口
      // 这里可以使用 @upstash/redis 包来实现
      // import { Redis } from '@upstash/redis';
      // const redis = new Redis({
      //   url: process.env.REDIS_URL,
      //   token: process.env.REDIS_TOKEN,
      // });
      // await redis.hincrby('clicks:7d', url, 1);
    }
    
    // 302重定向到目标URL
    return NextResponse.redirect(url, { status: 302 });
  } catch (error) {
    console.error('Error in /api/go:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to process redirect' },
      { status: 500 }
    );
  }
}
