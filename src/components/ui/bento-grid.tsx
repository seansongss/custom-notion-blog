import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { Badge } from '@/components/ui/badge';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  icon,
  href,
  tags
}: {
  className?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  href?: Url;
  tags?: string[];
}) => {
  return (
    <Link href={href || ""} passHref className={cn("grid h-full", className)}>
      <Card className="h-full row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-muted justify-between flex flex-col space-y-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-grow">{icon}</CardContent>
        <CardContent className="flex gap-1 w-full">
          {tags?.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
};
