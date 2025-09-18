"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI会员榜单
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="/members" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium hover:underline"
              >
                AI 会员榜单
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="py-32 px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            发现最优秀的AI工具
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          精选全球顶尖AI服务，助力您的创新与效率提升。探索人工智能的无限可能。
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="/members"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            查看AI榜单
          </a>
          <a
            href="/api/members"
            target="_blank"
            className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            API文档
          </a>
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">精选榜单</h3>
            <p className="text-gray-600 dark:text-gray-300">
              精心挑选的AI工具，涵盖模型、工具、基础设施等多个类别
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">智能搜索</h3>
            <p className="text-gray-600 dark:text-gray-300">
              快速搜索和筛选，找到最适合您需求的AI工具
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-2">一键访问</h3>
            <p className="text-gray-600 dark:text-gray-300">
              点击即可跳转到官网，快速体验各种AI服务
            </p>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p> 2024 AI. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="/members" className="hover:text-indigo-600 dark:hover:text-indigo-400">会员榜单</a>
            <span>·</span>
            <a href="/api/members" className="hover:text-indigo-600 dark:hover:text-indigo-400">API</a>
            <span>·</span>
            <a href="/api/echo" className="hover:text-indigo-600 dark:hover:text-indigo-400">Echo API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
