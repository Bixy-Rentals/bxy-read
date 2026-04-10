import { getCollection } from "astro:content";

export const prerender = true;

export async function GET() {
  const results = [];
  const blog = await getCollection("blog").catch(() => []);

  for (const post of blog) {
    if (post.data?.noindex) continue;
    const [lang, ...slugParts] = post.id.replace(/\.[^/.]+$/, "").split("/");
    const slug = slugParts.join("/");
    results.push({
      title: post.data?.title || slug,
      description: post.data?.description || "",
      url: `/${lang}/blog/${slug}`,
      body: post.body || "",
    });
  }

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
