export default async function handler(req, res) {
  try {
    const url = "https://api-cpe-test.sunat.gob.pe/v1/contribuyente/enviossp";
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...req.headers,
        host: undefined  // MUY IMPORTANTE
      },
      body: req.body
    });

    const data = await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}
