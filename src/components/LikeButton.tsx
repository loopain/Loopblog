"use client";

import { useState, useEffect } from "react";

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load like count and status from localStorage
    const stored = localStorage.getItem(`likes_${slug}`);
    if (stored) {
      const data = JSON.parse(stored);
      setLikes(data.count || 0);
      setHasLiked(data.hasLiked || false);
    } else {
      setLikes(Math.floor(Math.random() * 50) + 10);
    }
    setLoading(false);
  }, [slug]);

  const handleLike = () => {
    const newLiked = !hasLiked;
    const newCount = newLiked ? likes + 1 : likes - 1;
    
    setHasLiked(newLiked);
    setLikes(newCount);
    
    localStorage.setItem(`likes_${slug}`, JSON.stringify({
      count: newCount,
      hasLiked: newLiked
    }));
  };

  if (loading) {
    return <div className="text-gray-400">加载中...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          hasLiked 
            ? "bg-accent text-white" 
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-accent hover:text-white"
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={hasLiked ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2" 
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <span>{likes}</span>
      </button>
      <span className="text-gray-500 text-sm">
        {hasLiked ? "谢谢你的点赞！" : "喜欢这篇文章？"}
      </span>
    </div>
  );
}
