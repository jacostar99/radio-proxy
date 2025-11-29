export default async function handler(req, res) {
  const target = "https://uk17freenew.listen2myradio.com/live.mp3?typeportmount=s1_6707_stream_865432299";

  try {
    const response = await fetch(target);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");

    // Stream directo al cliente
    response.body.pipe(res);
  } catch (e) {
    res.status(500).send("Proxy error: " + e.toString());
  }
}
