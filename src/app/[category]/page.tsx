import type { Metadata } from 'next'
import Heading from "@/components/Heading";
import PostItem from "@/components/PostItem";
import { getPropertyInfo, getCategoryList } from "@/lib/get-notion-property";

import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { CategoryModel } from "@/types/article";
import { notFound } from 'next/navigation';
import { loadData } from '@/lib/db-manager';

export async function generateMetadata(
  { params }: { params: { category: string } }
): Promise<Metadata> {
  const categoryList: CategoryModel[] = await getCategoryList();
  const decodedCategorySlug = decodeURIComponent(params.category);
  const category = categoryList.find((categoryObj) => categoryObj.slug === decodedCategorySlug);

  if (!category) notFound();

  return {
    title: category.label,
    description: category.description,
    openGraph: {
      title: category.label,
      description: category.description,
      url: `/${category.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const categoryList: CategoryModel[] = await getCategoryList();

  return categoryList.map((category) => ({
    category: category.slug,
  }));
}

export default async function Page({ params }: { params: { category: string } }) {
  const categoryList: CategoryModel[] = await getCategoryList();
  const decodedCategorySlug = decodeURIComponent(params.category);
  const category = categoryList.find((categoryObj) => categoryObj.slug === decodedCategorySlug);

  if (!category) notFound();

  const db: PageObjectResponse[] = await loadData();

  return (
    <div className="w-full flex flex-col mx-auto gap-8">
      <Heading
        heading={category.label}
        subheading={category.description}
      />
      <div className="flex flex-col gap-4 pb-10">
        {db.map((article) => {
          const pageInfo = getPropertyInfo(article);

          if (pageInfo.category !== category.label) return null;

          const url = `/${decodedCategorySlug}/${pageInfo.slug}`;
          return (
            <PostItem
              key={pageInfo.slug}
              title={pageInfo.title}
              description={pageInfo.description}
              date={pageInfo.date}
              url={url}
              tags={pageInfo.tags}
            />
          );
        })}
      </div>
    </div>
  );
}
