import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { CategoryModel, ArticleProperty, TagModel } from '@/types/article';
import { koreanSlugify } from './korean-slugify';
import { loadData, loadCategoryData } from './db-manager';

export const getCategoryList = async (): Promise<CategoryModel[]> => {
    const data = await loadData();

    const categoryCountMap = new Map();

    data.forEach((article) => {
        const categoryName = article.properties.Category.type === "select"
            ? article.properties.Category.select?.name : null;

        if (!categoryName) return;

        if (categoryCountMap.has(categoryName)) {
            categoryCountMap.set(categoryName, categoryCountMap.get(categoryName) + 1);
        } else {
            categoryCountMap.set(categoryName, 1);
        }
    });

    const categoryDescriptionData = await loadCategoryData();
    const categoryDescriptionMap = new Map<string, string>();

    categoryDescriptionData.forEach((category) => {
        const name = category.properties.Name?.type === "title"
            ? category.properties.Name.title[0].plain_text : null;

        const description = category.properties.Description?.type === "rich_text" &&
            category.properties.Description.rich_text[0]
            ? category.properties.Description.rich_text[0].plain_text : null;

        if (name && description) {
            categoryDescriptionMap.set(name, description);
        }
    });

    const categoryList = Array.from(categoryCountMap.entries()).map(([label, count]) => ({
        label,
        count,
        slug: koreanSlugify(label),
        description: categoryDescriptionMap.get(label) || "",
    }));

    return categoryList;
};

export const getTagList = async (): Promise<TagModel[]> => {
    const data: PageObjectResponse[] = await loadData();

    const tagCountMap = new Map();

    data.forEach((article: PageObjectResponse) => {
        const tagLabelList = article.properties.Tag.type === "multi_select"
            ? article.properties.Tag.multi_select : [];

        tagLabelList.forEach((tag) => {
            const tagName = tag.name;

            if (tagCountMap.has(tagName)) {
                tagCountMap.set(tagName, tagCountMap.get(tagName) + 1);
            } else {
                tagCountMap.set(tagName, 1);
            }
        });
    });

    const tagList = Array.from(tagCountMap.entries()).map(([label, count]) => ({
        label,
        count,
        slug: koreanSlugify(label),
    }));

    return tagList;
};

export const getPropertyInfo = (
    pageObj: PageObjectResponse,
): ArticleProperty => {
    let property: Partial<ArticleProperty> = {};

    if (!pageObj) {
        return property as ArticleProperty;
    }

    // Page
    if (pageObj.properties.Page?.type === "title" && pageObj.properties.Page?.title?.[0]) {
        const title = pageObj.properties.Page.title.map(item => item.plain_text).join('');
        property = {
            title,
            ...property,
        };
    }

    // slug
    if (pageObj.properties.slug?.type === "rich_text" && pageObj.properties.slug?.rich_text?.[0]) {
        const slug = pageObj.properties.slug.rich_text.map(item => item.plain_text).join('');
        property = {
            slug,
            ...property,
        };
    }

    // Description
    if (pageObj.properties.Description?.type === "rich_text" && pageObj.properties.Description?.rich_text?.[0]) {
        const description = pageObj.properties.Description.rich_text.map(item => item.plain_text).join('');
        property = {
            description,
            ...property,
        };
    }

    // Tag
    if (pageObj.properties.Tag?.type === "multi_select" && pageObj.properties.Tag?.multi_select) {
        const tags = pageObj.properties.Tag.multi_select;
        const tagList = tags.map((a) => a.name);

        property = {
            tags: tagList,
            ...property,
        };
    }

    // Category
    if (pageObj.properties.Category?.type === "select" && pageObj.properties.Category?.select?.name) {
        property = {
            category: pageObj.properties.Category.select.name,
            ...property,
        };
    }

    // Date
    if (pageObj.properties.Date?.type === "date" && pageObj.properties.Date?.date?.start) {
        property = {
            date: new Date(pageObj.properties.Date.date.start),
            ...property,
        };
    }

    // Author
    if (pageObj.properties.Author?.type === "multi_select" && pageObj.properties.Author?.multi_select) {
        const authors = pageObj.properties.Author.multi_select;
        const authorList = authors.map((a) => a.name);

        property = {
            author: authorList,
            ...property,
        };
    }

    return property as ArticleProperty;
};
