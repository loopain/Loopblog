import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/notion";
import { LikeButton } from "@/components/LikeButton";
import { CommentSection } from "@/components/CommentSection";

export async function generateStaticParams() {
  let posts = [
    { slug: "welcome" },
  ];

  try {
    const slugs = await getAllSlugs();
    if (slugs.length > 0) {
      posts = slugs;
    }
  } catch (e) {
    // use mock
  }

  return posts;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;

  try {
    const notionPost = await getPostBySlug(slug);
    if (notionPost) {
      post = notionPost;
    }
  } catch (e) {
    // use mock
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-accent transition-colors text-sm"
          >
            ← 返回首页
          </Link>
        </nav>
        
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        
        {/* Tags below title */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        
        {/* Date below tags */}
        <time className="text-sm text-gray-400">{post.date}</time>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-hover
        prose-code:text-accent prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-blockquote:border-l-accent prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      {/* Like Button */}
      <div className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
        <LikeButton slug={slug} />
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <CommentSection slug={slug} />
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link 
          href="/" 
          className="text-accent hover:text-accent-hover transition-colors"
        >
          ← 返回首页
        </Link>
      </footer>
    </div>
  );
}
