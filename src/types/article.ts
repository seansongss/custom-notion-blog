export interface CategoryModel {
    label: string;
    count: number;
    slug: string;
    description: string;
}

export interface TagModel {
    label: string;
    count: number;
    slug: string;
}

export interface ArticleProperty {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    category: string;
    date: Date;
    author: string[];
}