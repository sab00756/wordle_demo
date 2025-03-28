const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'thickly-choice-kookaburra.data-1.use1.tembo.io',
  database: 'postgres',
  password: 'FbBzogv9yzTOwbJm',
  port: 5432,
  ssl: { rejectUnauthorized: false } // Required for Tembo.io
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL on Tembo.io'))
  .catch(err => console.error('Connection error:', err.message));

async function executeQuery() {
  try {
    const result = await client.query('select getword(\'test_user\');'); // Change your_table_name
    const word = result.rows[0]?.getword;  // Safely accessing word from the first result
    console.log('Query Result:', word);  // Output the word
  } catch (err) {
    console.error('Query Error:', err.message);
  } finally {
    client.end(); // Close the connection after query execution
  }
}

executeQuery();
