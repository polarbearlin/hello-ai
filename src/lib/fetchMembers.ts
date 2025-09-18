import { Member } from '@/types/ai';
import sampleData from '@/data/sample-members.json';

export const RANK_TAG = "rank-members";

// 归一化辅助函数
function normalize(value: number | undefined, min: number, max: number): number {
  if (!value || max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

// 解析CSV为Member数组
function parseCSV(csvText: string): Member[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const members: Member[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const member: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      if (!value || value === '') return;
      
      // 类型转换
      switch(header) {
        case 'openSource':
          member[header] = value.toLowerCase() === 'true';
          break;
        case 'score':
        case 'clicks7d':
          member[header] = parseFloat(value) || undefined;
          break;
        default:
          member[header] = value;
      }
    });
    
    if (member.id && member.name && member.url) {
      members.push(member as Member);
    }
  }
  
  return members;
}

// 去重函数：以url为键，后出现的覆盖前者
function deduplicateByUrl(members: Member[]): Member[] {
  const map = new Map<string, Member>();
  members.forEach(member => {
    map.set(member.url, member);
  });
  return Array.from(map.values());
}

// 获取会员数据
export async function fetchMembers(): Promise<Member[]> {
  let members: Member[] = [];
  
  if (process.env.SHEET_CSV_URL) {
    try {
      const response = await fetch(process.env.SHEET_CSV_URL, {
        next: { revalidate: 3600 } // 缓存1小时
      });
      
      if (response.ok) {
        const csvText = await response.text();
        members = parseCSV(csvText);
        console.log(`Loaded ${members.length} members from CSV`);
      } else {
        console.error('Failed to fetch CSV:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching CSV:', error);
    }
  }
  
  // 如果没有获取到CSV数据，使用本地示例数据
  if (members.length === 0) {
    members = sampleData as Member[];
    console.log('Using sample data');
  }
  
  // 去重
  return deduplicateByUrl(members);
}

// 计算综合热度并排序
export function computeRank(items: Member[]): Member[] {
  if (items.length === 0) return [];
  
  // 计算最大最小值用于归一化
  const clicks = items.map(m => m.clicks7d || 0);
  const scores = items.map(m => m.score || 0);
  const dates = items.map(m => m.createdAt ? new Date(m.createdAt).getTime() : 0);
  
  const minClicks = Math.min(...clicks);
  const maxClicks = Math.max(...clicks);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const minDate = Math.min(...dates.filter(d => d > 0));
  const maxDate = Math.max(...dates.filter(d => d > 0));
  
  // 计算每个项目的综合热度
  const rankedItems = items.map(item => {
    const normalizedClicks = normalize(item.clicks7d, minClicks, maxClicks);
    const normalizedScore = normalize(item.score, minScore, maxScore);
    const normalizedDate = item.createdAt 
      ? normalize(new Date(item.createdAt).getTime(), minDate, maxDate)
      : 0;
    
    // 综合热度 = 60%点击 + 30%评分 + 10%时效性
    const hotness = normalizedClicks * 0.6 + normalizedScore * 0.3 + normalizedDate * 0.1;
    
    return { ...item, _hotness: hotness };
  });
  
  // 按综合热度降序排序
  return rankedItems.sort((a, b) => b._hotness - a._hotness);
}

// 不同的排序方式
export function sortMembers(items: Member[], sortBy: string): Member[] {
  const sorted = [...items];
  
  switch(sortBy) {
    case 'hot':
      return computeRank(sorted);
    case 'recent':
      return sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    case 'clicks':
      return sorted.sort((a, b) => (b.clicks7d || 0) - (a.clicks7d || 0));
    case 'score':
      return sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
    default:
      return sorted;
  }
}
