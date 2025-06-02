const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_MptEaueYw35C@ep-holy-field-a1be4cgr-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
});

module.exports = pool;
