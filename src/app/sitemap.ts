import { loadData } from "@/lib/db-manager";
import { getSiteConfig } from "@/lib/get-config-value";
import { getPropertyInfo, getCategoryList } from "@/lib/get-notion-property";

export const dynamic = 'force-dynamic';

const siteMap = async () => {
    const basePath = getSiteConfig('domain'); // Ensure this returns the full URL
    const data = await loadData();
    const categoryList = await getCategoryList();

    return [
        {
            url: basePath,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0
        },
        ...categoryList.map(category => {
            return {
                url: `${basePath}/${category.slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.8,
            }
        }),
        ...data.map(post => {
            const postProperty = getPropertyInfo(post);
            const category = categoryList.find((categoryObj) => categoryObj.label === postProperty.category);
            return {
                url: `${basePath}/${category?.slug}/${postProperty.slug}`,
                lastModified: new Date(postProperty.date),
                changeFrequency: "yearly",
                priority: 0.6
            }
        }),
    ];
};

export default siteMap;
