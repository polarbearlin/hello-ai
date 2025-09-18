"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Member } from "@/types/ai";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const idsParam = searchParams.get('ids');
      if (!idsParam) {
        setLoading(false);
        return;
      }

      const ids = idsParam.split(',');
      
      try {
        const response = await fetch('/api/members');
        const data = await response.json();
        
        if (data.ok) {
          const filtered = data.items.filter((m: Member) => ids.includes(m.id));
          setMembers(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">没有选择对比项目</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">请从榜单页面选择要对比的AI工具</p>
        <a 
          href="/members"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          返回榜单
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* 头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI工具对比</h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              正在对比 {members.length} 个AI工具
            </p>
            <a 
              href="/members"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              返回榜单
            </a>
          </div>
        </div>

        {/* 对比表格 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                    属性
                  </th>
                  {members.map(member => (
                    <th key={member.id} className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white min-w-[200px]">
                      {member.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Logo和名称 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    Logo
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.logo ? (
                          <img 
                            src={member.logo} 
                            alt={member.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg ${member.logo ? 'hidden' : ''}`}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 类别 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    类别
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {member.category || '-'}
                    </td>
                  ))}
                </tr>

                {/* 价格 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    价格模式
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {member.price || '-'}
                    </td>
                  ))}
                </tr>

                {/* 开源 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    是否开源
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4 text-sm">
                      {member.openSource ? (
                        <span className="text-green-600 dark:text-green-400">✓ 开源</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 描述 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    描述
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {member.desc || '-'}
                    </td>
                  ))}
                </tr>

                {/* 评分 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    综合评分
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4">
                      {member.score ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                            {member.score}
                          </span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${member.score}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 7日点击 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    近7天点击
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {member.clicks7d ? member.clicks7d.toLocaleString() : '-'}
                    </td>
                  ))}
                </tr>

                {/* 创建时间 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    发布时间
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {member.createdAt || '-'}
                    </td>
                  ))}
                </tr>

                {/* 官网链接 */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800">
                    官网
                  </td>
                  {members.map(member => (
                    <td key={member.id} className="px-6 py-4">
                      <a
                        href={`/api/go?url=${encodeURIComponent(member.url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        访问官网 →
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
