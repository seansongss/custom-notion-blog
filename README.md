# Custom Notion Blog

A **Next.js** blog project using **Notion as a CMS**. This project fetches data dynamically from Notion and provides a seamless blogging experience with features like series-based categorization, client-side caching, and support for SEO on Google and Naver.

## Contents

- [Custom Notion Blog](#custom-notion-blog)
- [Contents](#contents)
- [Intro](#intro)
- [Features](#-features)
- [Getting Started](#-getting-started)
    - [Prerequisite](#prerequisites)
    - [Installation](#installation)
    - [Site Configuration](#site-configuration)
    - [Deployment](#-deployment)
- [Notion Template Usage](#notion-template-usage)
- [Folder Structure](#-folder-structure)
- [Routes](#-routes)
- [Styles](#styles)
- [Private Pages](#private-pages)
- [Related](#related)
- [Contributions](#-contributions)
- [License](#-license)

![Project Screenshot](https://github.com/user-attachments/assets/1f97a37b-3c4d-44f7-a086-87f5927b1f24) <!-- Replace with your actual screenshot -->


## Intro

This project is on live with my personal website [seansongss.com](https://seansongss.com).

The project uses [Notion](https://www.notion.so) as a CMS, [react-notion-x](https://github.com/NotionX/react-notion-x), [Next.js](https://nextjs.org/), and [Vercel](https://vercel.com/).

This project is heavily inspired by the [Next.js Notion Starter Kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) for its structure and [Bepyan](https://bepyan.me/en/) for its styling. A huge thanks to both projects for their incredible contributions and ideas!

## 🌟 Features

- **Dynamic Content**: Fetches blog data from Notion, with each row in the Notion table representing an article.
- **Easy Content Management**: Since this uses Notion as CMS, posts and categories can easily be tracked through Notion.
- **Category-Based Organization**: Automatically categorizes posts, with each category represented as a tab on the blog.
- **SEO Friendly**: Optimized for search engines, making your blog posts discoverable on Google and other search engines.
- **Responsive Design**: Works seamlessly across desktop and mobile devices.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- A Notion account with a database configured for blog posts.
- Environment variables setup for Notion and your secret keys.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/custom-notion-blog.git

2. Navigate to the project directory:
   ```bash
   cd custom-notion-blog

3. Install dependencies:
   ```bash
   npm install

### Site Configuration

1. Set up environment variables with provided `template.env`:
    1. Follow instruction from [react-notion-x](https://github.com/NotionX/react-notion-x?tab=readme-ov-file#private-pages) for setting `NOTION_ACTIVE_USER` (= `notion_user_id`) and `NOTION_TOKEN_V2` (= `token_v2`)

    2. Set up new integration at [Notion API Integration](https://www.notion.so/profile/integrations) and link to template page:
        - Go to your blog page in Notion and connect to your api integration
![Notion API Connection](https://github.com/user-attachments/assets/1a3e40a7-9426-4018-99ff-27ac2058ab09)

    3. Generate secret key and edit button link in Notion page and set `REVALIDATE_SECRET_KEY`:
        - ```openssl rand -base64 32``` can be used for generating simple secret key

2. Set up `site.config.ts`
    1. Duplicate [Notion Blog Template](https://successful-mayflower-d05.notion.site/Blog-Template-1086cdce0ccf80809897f8d9c8c9e500) to get started.

    2. Copy database id to `site.config.ts`.
        - Copy two database id that can be retrieved by clicking database name, and extract first part of URL before ?v= which looks like `1463156cc7094bfea3d7933d865ebfa7`.
        - `notionDatabaseId` is Blog database (articles) and `notionCategoryDatabaseId` is Category Description database.
        - Set `useNotionPageHome: true` and copy page id to `notionPageId` to use notion page as homepage.

## 🛠 Deployment

The project is hosted on Vercel. To deploy:

1. Push your repository to GitHub.
2. Link your repository to Vercel.
3. Set up the environment variables in Vercel.
4. Deploy the project using Vercel’s deployment interface.

## Notion Template Usage

### Homepage
Website's homepage will display Homepage when `useNotionPageHome: true` in `site.config.ts`.

### Articles
![Notion Article Database](https://github.com/user-attachments/assets/6433540d-ac6e-41a5-8992-26df6e239d9e)

- Required fields are page name, slug, and category.
- Individual articles will only be posted on the website when Publish is checked in Notion property
- If no author is set in the articles, it will use default author set in `site.config.ts`

### Category

- Use category description database to set description for each category
- Sort property will determine the tab order and category display order in homepage.
- Each category name should match ones in the blog database (articles) and category with no articles will be ignored and not generated in the website

### Update Blog Button

- Should be set with your set domain and generated secret key as search parameter `secretKey`.
- When clicked, data will be revalidated and fetch current database from Notion.

## 📂 Folder Structure
    custom-notion-blog/
    ├── public/                 # Static files
    ├── src/                    # Source files
    │   ├── app/                # Next.js App Router pages and layouts
    │   ├── components/         # Reusable React components
    │   ├── lib/                # Utility functions (e.g., Notion API integration)
    │   ├── styles/             # CSS files (global styles, Notion-specific styles)
    │   ├── types/              # TypeScript type definitions and interfaces
    └── template.env            # Example environment file with required variables

## 📌 Routes
- Main Page: /
- Category Page: /[category]
- Post Page: /[category]/[postSlug]

## Style

### Notion Page (Individual posts)
Refer [Nextjs-notion-starter-kit Styles](https://github.com/transitive-bullshit/nextjs-notion-starter-kit?tab=readme-ov-file#styles) for styling notion page.

### Homepage

- You have option to set homepage as the notion page or to have custom homepage. To use custom homepage, set `useNotionPageHome: false` in `site.config.ts` and edit `CustomHome.tsx` in `components`.

- If you set `showHomeTab: true`, it will show `StickyHeader` in the homepage.

## Private Pages

You can setup Notion as private pages, but the images will not load when you set it as private pages. Publish `Blog` database through `share -> publish` in Notion to display images in the individual posts.

## Related

- Refer to [react-notion-x](https://github.com/NotionX/react-notion-x) for more information about Notion Page Renderer.

## 🤝 Contributions
Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create a new branch for your feature:
    ```bash
    git checkout -b feature/your-feature-name
3. Commit your changes:
    ```bash
    git commit -m "Add some feature"
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
5. Open a pull request.

## 🛡 License
This project is licensed under the MIT License.

MIT © [Sean Song](https://seansongss.com)