# My Blog

A minimalist personal blog built with Next.js, Tailwind CSS, and Notion as CMS.

## Features

- Minimalist design with green accents
- Dark mode support
- Notion as content management system
- SEO optimized
- Static generation

## Getting Started

### 1. Notion Setup

1. Go to [Notion My Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the "Internal Integration Token"

4. Create a Notion database with these properties:
   - **Title** (Title)
   - **Slug** (Text)
   - **Date** (Date)
   - **Tags** (Multi-select)
   - **Excerpt** (Text)
   - **Published** (Checkbox)

5. Share the database with your integration

### 2. Environment Variables

Create a `.env.local` file:

```bash
NOTION_TOKEN=your_integration_token
NOTION_DATABASE_ID=your_database_id
```

To get the database ID:
- Open your database in Notion
- Copy the URL
- The ID is the part after the `/` and before the `?`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import the project
4. Add environment variables (`NOTION_TOKEN`, `NOTION_DATABASE_ID`)
5. Deploy

## Customization

- Edit `src/app/globals.css` to change colors
- Edit `src/app/layout.tsx` to change metadata
- Edit `src/app/page.tsx` to change the home page content

## License

MIT
