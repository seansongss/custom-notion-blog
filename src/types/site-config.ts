export interface SiteConfig {
    notionDatabaseId: string;
    notionCategoryDatabaseId: string;

    useNotionPageHome: boolean;
    notionPageId?: string;

    showHomeTab: boolean;
    showHomeCategory: boolean;

    name: string;
    domain: string;
    author: string;
    description?: string;

    showSocialAccounts: boolean;
    socialDescription?: string;

    socialAccounts: {
        twitter?: string;
        github?: string;
        linkedin?: string;
        youtube?: string;
        instagram?: string;
        resume?: string;
        email?: string;
    }
    
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
    return config
}
