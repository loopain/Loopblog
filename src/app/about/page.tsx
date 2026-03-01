import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <header className="mb-16">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-accent transition-colors text-sm"
          >
            ← 返回首页
          </Link>
        </nav>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          关于我
        </h1>
      </header>

      <main className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          你好！我是博主，一个热爱技术和设计的人。
        </p>

        <h2>我是谁</h2>
        <p>
          我喜欢探索新技术、研究设计模式。这是我用来记录思考和分享知识的地方。
        </p>

        <h2>技术栈</h2>
        <ul>
          <li>前端: React, Next.js, TypeScript</li>
          <li>设计: Tailwind CSS, Figma</li>
          <li>工具: VS Code, Git, Docker</li>
        </ul>

        <h2>联系我</h2>
        <p>
          你可以通过以下方式找到我：
        </p>
        <ul>
          <li>GitHub: <a href="https://github.com" className="text-accent hover:text-accent-hover">github.com</a></li>

          <li>Twitter: <a href="https://twitter.com" className="text-accent hover:text-accent-hover">@yourhandle</a></li>
        </ul>
      </main>

      <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400">
        <p>© 2026 My Blog. Built with Next.js & Notion.</p>
      </footer>
    </div>
  );
}
