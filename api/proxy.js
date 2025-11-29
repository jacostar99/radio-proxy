export default async function handler(req, res) {
    const streamUrl = 'https://uk17freenew.listen2myradio.com/live.mp3?typeportmount=s1_6707_stream_865432299';

    try {
        const response = await fetch(streamUrl, {
            headers: {
                'Referer': 'http://radioaccioncali.radio12345.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            return res.status(response.status).send('Error');
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'no-cache');

        for await (const chunk of response.body) {
            res.write(chunk);
        }

        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
}
