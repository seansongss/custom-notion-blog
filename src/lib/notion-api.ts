import { notion, notionClient } from "./notion";

import { PageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { ExtendedRecordMap } from "notion-types";

// Fetch Notion page or database
export const getPageData = async (pageId: string): Promise<ExtendedRecordMap> => {
    try {
        return await notion.getPage(pageId);
    } catch (error) {
        console.error("Error fetching Notion page:", error);
        throw new Error(`Failed to fetch the Notion page: ${error}`);
    }
}

export const getNotionData = async (
    databaseId: string,
    additionalFilter?: any
): Promise<PageObjectResponse[]> => {
    try {
        const baseFilter = {
            property: "Publish",
            checkbox: {
                equals: true,
            },
        };

        const filter = additionalFilter
            ? {
                and: [baseFilter, additionalFilter],
            }
            : baseFilter;

        // Query the Notion database with the combined or base filter
        const response: QueryDatabaseResponse = await notionClient.databases.query({
            database_id: databaseId,
            filter,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
        });

        return response.results as PageObjectResponse[];
    } catch (error) {
        console.error("Error querying Notion database:", error);
        throw new Error("Failed to query the Notion database");
    }
};

export const getCategoryData = async (databaseId: string): Promise<PageObjectResponse[]> => {
    try {
        const response: QueryDatabaseResponse = await notionClient.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "Sort",
                    direction: 'ascending',
                }
            ],
        });

        return response.results as PageObjectResponse[];
    } catch (error) {
        console.error("Error querying Notion database:", error);
        throw new Error("Failed to query the Notion database");
    }
};
