import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPosts } from "@/lib/notion";

export const dynamic = 'force-dynamic';

const MOCK_POSTS = [
  {
    id: "1",
    title: "欢迎来到我的博客",
    slug: "welcome",
    date: "2026-03-01",
    tags: ["随笔", "介绍"],
    excerpt: "这是我博客的第一篇文章，记录一些思考和分享。",
  },
  {
    id: "2",
    title: "极简主义设计原则",
    slug: "minimalist-design",
    date: "2026-02-28",
    tags: ["设计", "极简主义"],
    excerpt: "探讨如何在数字产品中运用极简主义设计原则。",
  },
  {
    id: "3",
    title: "使用 Next.js 和 Notion 搭建博客",
    slug: "nextjs-notion-blog",
    date: "2026-02-25",
    tags: ["技术", "Next.js", "Notion"],
    excerpt: "手把手教你用 Next.js 和 Notion API 搭建个人博客。",
  },
];

export async function generateStaticParams() {
  let posts = MOCK_POSTS;
  try {
    const notionPosts = await getPublishedPosts();
    if (notionPosts.length > 0) {
      posts = notionPosts;
    }
  } catch (e) {
    // use mock
  }

  const allTags = [...new Set(posts.flatMap(post => post.tags))];
  return allTags.map(tag => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  let posts = MOCK_POSTS;
  let allPosts = MOCK_POSTS;

  try {
    const notionPosts = await getPublishedPosts();
    if (notionPosts.length > 0) {
      posts = notionPosts;
      allPosts = notionPosts;
    }
  } catch (e) {
    // use mock
  }

  // Filter posts by tag
  const filteredPosts = posts.filter(post => 
    post.tags.includes(decodedTag)
  );

  // Get recent posts for sidebar
  const recentPosts = allPosts.slice(0, 5);

  // Get all tags
  const allTags = [...new Set(allPosts.flatMap(post => post.tags))];

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          My Blog
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          记录思考、分享技术、探索设计
        </p>
        <nav className="mt-6 flex gap-6">
          <Link 
            href="/" 
            className="text-accent hover:text-accent-hover transition-colors"
          >
            首页
          </Link>
          <Link 
            href="/about" 
            className="text-gray-500 hover:text-accent transition-colors"
          >
            关于
          </Link>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              标签: {decodedTag}
            </h2>
            <p className="text-gray-500">
              共 {filteredPosts.length} 篇文章
            </p>
          </div>

          <section className="space-y-12">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="mb-3">
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((t) => (
                        <Link
                          key={t}
                          href={`/tags/${encodeURIComponent(t)}`}

                          className={`text-xs px-2 py-0.5 rounded transition-colors ${
                            t === decodedTag
                              ? "bg-accent text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-accent hover:text-white"
                          }`}
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <time className="text-sm text-gray-400">{post.date}</time>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </section>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-8">
            {/* Recent Posts */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">近期文章</h3>
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold mb-4">标签</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${encodeURIComponent(t)}`}
                    className={`text-sm px-3 py-1 rounded transition-colors ${
                      t === decodedTag
                        ? "bg-accent text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-accent hover:text-white"
                    }`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400">
        <p>© 2026 My Blog. Built with Next.js & Notion.</p>
      </footer>
    </div>
  );
}
