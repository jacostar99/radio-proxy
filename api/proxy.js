export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const target = "https://uk17freenew.listen2myradio.com/live.mp3?typeportmount=s1_6707_stream_865432299";

  try {
    const response = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return new Response('Stream error: ' + response.status, { status: 500 });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Connection': 'keep-alive',
      },
    });
  } catch (e) {
    return new Response('Proxy error: ' + e.message, { status: 500 });
  }
}
