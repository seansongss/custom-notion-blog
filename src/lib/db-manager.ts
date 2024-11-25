import { getNotionData, getCategoryData } from "./notion-api";
import { getSiteConfig } from "./get-config-value";

import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface DatabaseCache {
    data: PageObjectResponse[] | null;
    isDataLoaded: boolean;
}

let databaseCache: DatabaseCache = {
    data: null,
    isDataLoaded: false,
};

let categoryDatabaseCache: DatabaseCache = {
    data: null,
    isDataLoaded: false,
};

export const loadData = async (): Promise<PageObjectResponse[]> => {
    const databaseId = getSiteConfig('notionDatabaseId');

    if (!databaseId) {
        throw new Error("NOTION_DATABASE_ID is not defined in the environment variables.");
    }

    if (!databaseCache.isDataLoaded) {
        try {
            const data = await getNotionData(databaseId);
            databaseCache = { data, isDataLoaded: true };
        } catch (e) {
            console.error("Failed to fetch data from Notion:", e);
            throw new Error("Error loading data from Notion");
        }
    }

    return databaseCache.data as PageObjectResponse[];
};

export const loadCategoryData = async (): Promise<PageObjectResponse[]> => {
    const categoryDatabaseId = getSiteConfig('notionCategoryDatabaseId');

    if (!categoryDatabaseId) {
        throw new Error("NOTION_DATABASE_ID is not defined in the environment variables.");
    }

    if (!categoryDatabaseCache.isDataLoaded) {
        try {
            const data = await getCategoryData(categoryDatabaseId);
            categoryDatabaseCache = { data, isDataLoaded: true };
        } catch (e) {
            console.error("Failed to fetch data from Notion:", e);
            throw new Error("Error loading data from Notion");
        }
    }

    return categoryDatabaseCache.data as PageObjectResponse[];
};

export const revalidateCache = () => {
    databaseCache.isDataLoaded = false;
    categoryDatabaseCache.isDataLoaded = false;
};