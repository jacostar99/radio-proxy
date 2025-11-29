import { Readable } from 'stream';

export const config = {
    api: {
        responseLimit: false,
    },
};

export default async function handler(req, res) {
    const streamUrl = 'https://uk17freenew.listen2myradio.com/live.mp3?typeportmount=s1_6707_stream_865432299';

    try {
        const response = await fetch(streamUrl, {
            headers: {
                'Referer': 'http://radioaccioncali.radio12345.com',
                'User-Agent': 'Mozilla/5.0',
            }
        });

        if (!response.ok) {
            return res.status(500).send('Error');
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Convertir Web Stream a Node.js Stream
        const nodeStream = Readable.fromWeb(response.body);
        nodeStream.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
}
