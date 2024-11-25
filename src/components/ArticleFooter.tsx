import { ArticleProperty } from '@/types/article';
import React from 'react';
import PostItem from './PostItem';
import { cn } from "@/lib/utils";

interface ArticleFooterProps {
  category: string;
  className?: string;
  prevArticle: ArticleProperty | null;
  nextArticle: ArticleProperty | null;
}

const ArticleFooter: React.FC<ArticleFooterProps> = ({
  category,
  className = '',
  prevArticle,
  nextArticle,
}) => {
  if (!prevArticle && !nextArticle) return null;

  return (
    <div
      className={cn(
        "w-full flex flex-col-reverse md:flex-row max-w-screen-md mx-auto gap-4",
        className
      )}
    >
      <div className="w-full md:w-1/2">
        {prevArticle ? (
          <PostItem
            style="previous"
            className="w-full"
            title={prevArticle.title}
            url={`/${category}/${prevArticle.slug}`}
          />
        ) : (
          <div className="flex justify-center items-center h-full" />
        )}
      </div>

      <div className="w-full md:w-1/2">
        {nextArticle ? (
          <PostItem
            style="next"
            className="w-full"
            title={nextArticle.title}
            url={`/${category}/${nextArticle.slug}`}
          />
        ) : (
          <div className="flex justify-center items-center h-full" />
        )}
      </div>
    </div>
  );
};

export default ArticleFooter;
