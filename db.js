const { Client } = require('pg');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const client = new Client({
    user: 'postgres',
    host: 'thickly-choice-kookaburra.data-1.use1.tembo.io',
    database: 'postgres',
    password: 'FbBzogv9yzTOwbJm',
    port: 5432,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query("SELECT getword('test_user');");
    const word = result.rows[0]?.getword;
    await client.end();
    
    res.json({ word });
  } catch (err) {
    console.error('Query Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch word' });
  }
}
