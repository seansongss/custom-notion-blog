import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';

// React-notion-x
export const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER || '',
    authToken: process.env.NOTION_TOKEN_V2 || ''
});

// Official Notion API
export const notionClient = new Client({ auth: process.env.NOTION_API_KEY || '' });