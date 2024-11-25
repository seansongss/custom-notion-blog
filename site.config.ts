import { siteConfig } from "@/types/site-config"

export default siteConfig({
  // the site's database Ids (required)
  notionDatabaseId: '1463156cc7094bfea3d7933d865ebfa7',
  notionCategoryDatabaseId: '1286cdce0ccf80e286b8d69e89bbb444',

  // use notionPageId in base path when useNotionPageHome is true
  //   useNotionPageHome (required), notionPageId (optional)
  useNotionPageHome: true,
  notionPageId: '12d6cdce0ccf808a8b0ef8e06e20f645',
  
  // show StickyHeader/series information in base path (required)
  showHomeTab: false,
  showHomeCategory: true,

  // basic site info (required)
  name: 'Custom Notion Blog',
  domain: 'https://custom-notion-blog.vercel.app/',
  author: 'seansongss',

  // open graph metadata (optional)
  description: 'Custom blog template page for Notion',
  
  // show social accounts in base path (required)
  showSocialAccounts: true,

  // social description (optional)
  socialDescription: 'Social accounts example',

  // social usernames (optional)
  socialAccounts: {
    // twitter: '#', // optional twitter username
    github: 'seansongss', // optional github username
    // linkedin: '#', // optional linkedin username
    // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`
    // instagram: '#', // optional instagram id
    // resume: 'resume.pdf', // resume file name stored in public folder
    email: 'seansongss@gmail.com',
  },
  
})