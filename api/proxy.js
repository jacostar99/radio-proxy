export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
  maxDuration: 60,
};

export default async function handler(req, res) {
  const streamUrl = 'https://uk17freenew.listen2myradio.com/live.mp3?typeportmount=s1_6707_stream_865432299';

  try {
    const response = await fetch(streamUrl, {
      headers: {
        'Referer': 'http://radioaccioncali.radio12345.com',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return res.status(500).send('Stream no disponible');
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');

    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }

    res.end();

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error en streaming');
  }
}
