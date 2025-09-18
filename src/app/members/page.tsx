"use client";

import { useEffect, useState, useMemo } from "react";
import { Member } from "@/types/ai";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState("hot");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());

  // 加载收藏数据
  useEffect(() => {
    const stored = localStorage.getItem("ai-favorites");
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  // 保存收藏数据
  useEffect(() => {
    if (favorites.size > 0) {
      localStorage.setItem("ai-favorites", JSON.stringify(Array.from(favorites)));
    }
  }, [favorites]);

  // 加载会员数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          q,
          cat,
          sort,
          limit: "100"
        });
        const response = await fetch(`/api/members?${params}`);
        const data = await response.json();
        if (data.ok) {
          setMembers(data.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q, cat, sort]);

  // 切换收藏
  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // 切换对比选择
  const toggleCompare = (id: string) => {
    const newCompare = new Set(compareIds);
    if (newCompare.has(id)) {
      newCompare.delete(id);
    } else if (newCompare.size < 3) {
      newCompare.add(id);
    }
    setCompareIds(newCompare);
  };

  // 打开对比页面
  const openCompare = () => {
    const ids = Array.from(compareIds).join(',');
    window.open(`/members/compare?ids=${ids}`, '_blank');
  };

  // 获取价格标签样式
  const getPriceClass = (price?: string) => {
    switch(price) {
      case 'free': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'freemium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'paid': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // 获取分类标签样式
  const getCategoryClass = (category?: string) => {
    switch(category) {
      case 'model': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'tool': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'infra': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      case 'agent': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI 热门前100榜单
            </h1>
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
              返回首页
            </a>
          </div>
        </div>
      </nav>

      {/* 搜索和筛选栏 */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="搜索AI工具..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">全部类别</option>
              <option value="model">模型</option>
              <option value="tool">工具</option>
              <option value="infra">基础设施</option>
              <option value="agent">智能体</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="hot">综合热度</option>
              <option value="recent">最新发布</option>
              <option value="clicks">点击最多</option>
              <option value="score">评分最高</option>
            </select>
          </div>
        </div>
      </div>

      {/* 会员卡片网格 */}
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* 卡片头部 */}
                  <div className="flex items-start justify-between mb-4">
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
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <span className="text-gray-400">#{index + 1}</span>
                          {member.name}
                          {favorites.has(member.id) && (
                            <span className="text-yellow-500">⭐</span>
                          )}
                        </h3>
                        <div className="flex gap-2 mt-1">
                          {member.category && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryClass(member.category)}`}>
                              {member.category}
                            </span>
                          )}
                          {member.price && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriceClass(member.price)}`}>
                              {member.price}
                            </span>
                          )}
                          {member.openSource && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              开源
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 描述 */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {member.desc || "暂无描述"}
                  </p>

                  {/* 统计信息 */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {member.score && (
                      <div className="flex items-center gap-1">
                        <span>评分:</span>
                        <span className="font-semibold">{member.score}</span>
                      </div>
                    )}
                    {member.clicks7d && (
                      <div className="flex items-center gap-1">
                        <span>7日点击:</span>
                        <span className="font-semibold">{member.clicks7d.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <a
                      href={`/api/go?url=${encodeURIComponent(member.url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-center text-sm font-medium transition-colors"
                    >
                      访问官网
                    </a>
                    <button
                      onClick={() => toggleFavorite(member.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        favorites.has(member.id)
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {favorites.has(member.id) ? '已收藏' : '收藏'}
                    </button>
                    <button
                      onClick={() => toggleCompare(member.id)}
                      disabled={!compareIds.has(member.id) && compareIds.size >= 3}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        compareIds.has(member.id)
                          ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {compareIds.has(member.id) ? '✓' : '对比'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && members.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              没有找到匹配的AI工具
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              尝试调整搜索条件或清除筛选器
            </p>
          </div>
        )}
      </div>

      {/* 对比浮动条 */}
      {compareIds.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              已选择 {compareIds.size} 个项目进行对比
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCompareIds(new Set())}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                清除选择
              </button>
              <button
                onClick={openCompare}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                开始对比
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
