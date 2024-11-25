import Link from "next/link";
import NotionPage from "@/components/NotionPage";
import { socialConfig } from "@/lib/social-config";
import { getSiteConfig } from "@/lib/get-config-value";
import { getCategoryList } from "@/lib/get-notion-property";
import { getPageData } from "@/lib/notion-api";
import CustomHome from "@/components/CustomHome";

export default async function Home() {
  const useNotionPageHome = getSiteConfig('useNotionPageHome');
  const notionPageId = useNotionPageHome && getSiteConfig('notionPageId');
  const recordMap = useNotionPageHome && notionPageId && await getPageData(notionPageId);

  const categoryList = await getCategoryList();

  return (
    <div className="flex flex-col mx-auto items-start justify-center gap-10 pt-8 md:pt-16">
      {useNotionPageHome ? (
        recordMap && <NotionPage recordMap={recordMap} isHome />
      ) : (
        // Place to add custom homepage
        <CustomHome />
      )}

      {getSiteConfig('showSocialAccounts') &&
        <div className="flex flex-col gap-4">
          {<span>{getSiteConfig('socialDescription')}</span>}
          {<div className="flex gap-4">
            {Object.entries(getSiteConfig('socialAccounts')).map(([platform, username]) => {
              const social = socialConfig[platform];
              const IconComponent = social?.icon;
              return (
                username && IconComponent && (
                  <Link
                    key={platform}
                    href={`${social.link}${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl md:hover:text-blue-500"
                  >
                    <IconComponent />
                  </Link>
                )
              );
            })}
          </div>}
        </div>
      }

      {getSiteConfig('showHomeCategory') &&
        <div className="flex flex-row gap-2">
          <span className="hidden md:block py-2 mr-6">My Space</span>
          <div className="flex flex-col items-start gap-4">
            {categoryList.map((category) => (
              <div key={category.slug} className="px-1 py-2 text-center font-semibold rounded-md underline underline-offset-8 hover:bg-accent">
                <Link href={category.slug}>{category.label}</Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {categoryList.map((category) => (
              <span
                key={category.slug}
                className="text-sm py-2.5 flex flex-row items-center justify-start gap-12"
              >
                {category.description || <span className="invisible h-5">Placeholder</span>}
              </span>
            ))}
          </div>
        </div>
      }
    </div>
  );
}