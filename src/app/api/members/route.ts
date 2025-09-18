import { NextRequest } from 'next/server';
import { fetchMembers, sortMembers } from '@/lib/fetchMembers';
import { Member } from '@/types/ai';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('cat') || '';
    const sort = searchParams.get('sort') || 'hot';
    const limit = parseInt(searchParams.get('limit') || '100');
    
    // 获取所有会员数据
    let members = await fetchMembers();
    
    // 名称模糊匹配
    if (q) {
      const query = q.toLowerCase();
      members = members.filter(m => 
        m.name.toLowerCase().includes(query) ||
        (m.desc && m.desc.toLowerCase().includes(query))
      );
    }
    
    // 类别精确匹配
    if (cat) {
      members = members.filter(m => m.category === cat);
    }
    
    // 排序
    members = sortMembers(members, sort);
    
    // 限制数量
    members = members.slice(0, limit);
    
    return Response.json(
      { ok: true, items: members },
      { 
        headers: { 
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      }
    );
  } catch (error) {
    console.error('Error in /api/members:', error);
    return Response.json(
      { ok: false, error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}
