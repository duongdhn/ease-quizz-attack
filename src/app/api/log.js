export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await req.text(); 
      console.log("[+] Full responseText:", body);
      res.status(200).send("Logged!");
    } catch (error) {
      console.error("[-] Error reading body:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).send("Method Not Allowed");
  }
}
