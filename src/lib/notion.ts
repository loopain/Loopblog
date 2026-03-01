import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
}) as any;

const n2m = new NotionToMarkdown({ notionClient: notion });

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getPublishedPosts() {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    console.warn("Notion credentials not configured");
    return [];
  }

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page: any) => {
    const title = page.properties.标题?.title[0]?.plain_text || "Untitled";
    const slug = page.properties.Slug?.rich_text[0]?.plain_text || generateSlug(title);
    return {
      id: page.id,
      title,
      slug,
      date: page.properties.Date?.date?.start || "",
      tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || "",
    };
  });
}

export async function getPostBySlug(slug: string) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return null;
  }

  // Try to find by Slug first
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (response.results.length === 0) {
    // Try to find by title (for auto-generated slugs)
    const allResponse = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "published",
        checkbox: {
          equals: true,
        },
      },
    });

    for (const page of allResponse.results) {
      const title = (page as any).properties.标题?.title[0]?.plain_text || "";
      const pageSlug = (page as any).properties.Slug?.rich_text[0]?.plain_text || generateSlug(title);
      if (pageSlug === slug) {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);
        return {
          id: page.id,
          title,
          slug: pageSlug,
          date: (page as any).properties.Date?.date?.start || "",
          tags: (page as any).properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          content: mdString.parent,
        };
      }
    }
    return null;
  }

  const page = response.results[0];
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const title = (page as any).properties.标题?.title[0]?.plain_text || "Untitled";
  const pageSlug = (page as any).properties.Slug?.rich_text[0]?.plain_text || generateSlug(title);

  return {
    id: page.id,
    title,
    slug: pageSlug,
    date: (page as any).properties.Date?.date?.start || "",
    tags: (page as any).properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    content: mdString.parent,
  };
}

export async function getAllSlugs() {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return [];
  }

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
    },
  });

  return response.results.map((page: any) => {
    const title = page.properties.标题?.title[0]?.plain_text || "Untitled";
    const slug = page.properties.Slug?.rich_text[0]?.plain_text || generateSlug(title);
    return { slug };
  });
}
