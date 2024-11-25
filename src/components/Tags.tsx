"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TagModel } from '@/types/article';

interface TagsProps {
    tags: TagModel[];
    activeTag: string;
    onClickTag: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({ tags, activeTag, onClickTag }) => {
    const total = tags.reduce((acc, tag) => {
        return acc + (tag.count ?? 0);
    }, 0);

    return (
        <div className="hidden md:flex flex-row gap-2 max-w-full overflow-x-scroll scrollbar-hide">
            <Badge
                key={"all"}
                variant={activeTag === "All" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onClickTag("All")}
            >
                {total} All
            </Badge>
            {tags.map(({ slug, label, count }) => (
                <Badge
                    key={slug}
                    variant={activeTag === label ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => onClickTag(label)}
                >
                    {count ?? 0} {label}
                </Badge>
            ))}
        </div>
    );
};

export default Tags;
