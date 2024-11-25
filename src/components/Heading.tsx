import { getCategoryList } from '@/lib/get-notion-property'
import { getSiteConfig } from '@/lib/get-config-value'
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Heading = async ({ heading, subheading }: { heading: string, subheading?: string }) => {
  const categoryList = await getCategoryList();
  const author = getSiteConfig('author');
  return (
    <div className="flex flex-col justify-start gap-4">
      <span className="text-xl font-bold">
        {heading}
      </span>
      {subheading &&
        <span>
          {subheading}
        </span>}

      {author &&
        <div className="md:hidden flex flex-row items-center justify-start gap-2 text-sm">
          <p>by</p>
          <Link href="/" className="p-1 underline underline-offset-2 bg-accent rounded-md">{author}</Link>
        </div>}

      {categoryList &&
        <div className="md:hidden flex flex-row gap-2">
          {categoryList.map((category) => (
            <Link key={category.slug} href={category.slug} className="flex flex-row justify-center items-center text-sm bg-accent p-1 rounded-md gap-0.5">
              {category.label}<ArrowUpRight className='h-4 w-4' />
            </Link>
          ))}
        </div>}
    </div>
  )
}

export default Heading