import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostItemProps {
  style?: "previous" | "next" | "default";
  className?: string;
  title: string;
  description?: string;
  date?: Date;
  url: string;
  tags?: string[];
}

const PostItem: React.FC<PostItemProps> = ({
  style = "default",
  className,
  title,
  description,
  date,
  url,
  tags
}) => {
  return (
    <Link href={url}>
      <Card className={cn(
        "hover:shadow-lg transition duration-200 shadow-input",
        className
      )}>
        {style === "default" &&
          <>
            <CardHeader>
              {date &&
                <CardDescription>
                  {date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </CardDescription>
              }
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardFooter className="justify-between">
              <CardDescription>
                {tags && tags.map(tag => "#" + tag).join(" ")}
              </CardDescription>
              <CardDescription className="flex flex-row gap-1 justify-center items-center text-foreground">
                <span className="hidden md:block">Read More</span>
                <ArrowRight className="h-4 w-4" />
              </CardDescription>
            </CardFooter>
          </>
        }

        {style === "previous" &&
          <>
            <CardHeader>
              <CardDescription>Previous Article</CardDescription>
              <CardTitle className="text-lg truncate">{title}</CardTitle>
            </CardHeader>
          </>
        }

        {style === "next" &&
          <>
            <CardHeader>
              <CardDescription>Next Article</CardDescription>
              <CardTitle className="text-lg truncate">{title}</CardTitle>
            </CardHeader>
          </>
        }
      </Card>
    </Link>
  )
}

export default PostItem