import React from 'react';
import type { Metadata } from 'next'

import { getPropertyInfo, getCategoryList } from "@/lib/get-notion-property";
import BackButton from '@/components/BackButton';
import NotionPage from '@/components/NotionPage';
import ArticleFooter from '@/components/ArticleFooter';

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getPageBySlug } from '@/lib/get-notion-page';
import { CategoryModel } from '@/types/article';
import { loadData } from '@/lib/db-manager';
import { notFound } from 'next/navigation';
import { getSiteConfig } from '@/lib/get-config-value';

export async function generateMetadata(
  { params }: { params: { category: string, slug: string } }
): Promise<Metadata> {
  const decodedCategorySlug = decodeURIComponent(params.category);
  const decodedPostSlug = decodeURIComponent(params.slug);

  const author = getSiteConfig('author');
  const siteName = getSiteConfig('name');
  const db: PageObjectResponse[] = await loadData();

  const post = db.find((post) => {
    const property = getPropertyInfo(post);
    if (property.slug === decodedPostSlug) return property;
  });

  if (!post) notFound();

  const postProperty = getPropertyInfo(post);

  return {
    title: postProperty.title,
    description: postProperty.description,
    keywords: postProperty.tags,
    creator: author,
    publisher: author,
    category: postProperty.category,
    openGraph: {
      title: postProperty.title,
      description: postProperty.description,
      url: `/${decodedCategorySlug}/${postProperty.slug}`,
      siteName,
      type: 'article'
    },
  };
}

export async function generateStaticParams() {
  const categoryList: CategoryModel[] = await getCategoryList();
  const db: PageObjectResponse[] = await loadData();

  return db.map((post) => {
    const property = getPropertyInfo(post);
    const category = categoryList.find((category) => property.category === category.label);

    if (!category) return null;

    return ({
      category: category.slug,
      slug: property.slug,
    });
  }).filter(Boolean);
}

const Page = async ({ params }: { params: { category: string, slug: string } }) => {
  const decodedCategorySlug = decodeURIComponent(params.category);
  const decodedPostSlug = decodeURIComponent(params.slug);

  const recordMap = await getPageBySlug(decodedPostSlug);

  const categoryList: CategoryModel[] = await getCategoryList();
  const category = categoryList.find((categoryObj) => categoryObj.slug === decodedCategorySlug);

  if (!category) notFound();

  const db: PageObjectResponse[] = await loadData();
  const categoryDb = db.filter((post) => getPropertyInfo(post).category === category?.label);

  const postIdx = categoryDb.findIndex((post) => getPropertyInfo(post).slug === decodedPostSlug);
  const prevPostProperty = postIdx < categoryDb.length - 1 ? getPropertyInfo(categoryDb[postIdx + 1]) : null;
  const nextPostProperty = postIdx > 0 ? getPropertyInfo(categoryDb[postIdx - 1]) : null;

  return (
    <>
      <div className="flex mx-auto">
        <BackButton href={`/${params.category}`} name={category.label} />
      </div>
      <NotionPage recordMap={recordMap} />
      <ArticleFooter
        category={decodedCategorySlug}
        prevArticle={prevPostProperty}
        nextArticle={nextPostProperty}
      />
    </>
  );
};

export default Page;
