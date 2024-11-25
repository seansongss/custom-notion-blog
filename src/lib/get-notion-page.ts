import { notion } from "./notion";
import { getPropertyInfo } from "./get-notion-property";
import { ExtendedRecordMap } from "notion-types";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { loadData } from "./db-manager";
import { notFound } from "next/navigation";

export const getPageBySlug = async (slug: string): Promise<ExtendedRecordMap> => {
    slug = decodeURIComponent(slug);

    try {
        const data: PageObjectResponse[] = await loadData();

        const post: PageObjectResponse | undefined = data.find((post) => {
            return getPropertyInfo(post).slug === slug;
        });

        if (!post) notFound();

        return await notion.getPage(post.id);
    } catch (error) {
        console.error("Error fetching Notion page:", slug);
        notFound();
    }
};
