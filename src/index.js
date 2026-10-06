export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const asset = await env.ASSETS.fetch(request);

    if (asset.status !== 404) {
      return asset;
    }

    const fallback = await env.ASSETS.fetch(new URL('/index.html', url));

    return new Response(await fallback.text(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },
};
