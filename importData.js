const fs = require("fs");
const csv = require("csv-parser");
const pool = require("./db");

console.log('🔌 Connecting to DB...');
pool.query('SELECT current_database()', async (err, res) => {
  if (err) {
    console.error('❌ Cannot connect to DB:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to DB:', res.rows[0].current_database);

    console.log("🚀 Starting importData.js…");

    let rowCount = 0;
    const insertPromises = [];

    const insertServer = async (row) => {
      rowCount++;
      console.log(`→ Inserting row #${rowCount}: ${row.SERVER_NAME}`);

      const query = `
        INSERT INTO servers 
          (region, priority, server_name, ip_address, site_code, location, support_group, server_status, server_class)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      const values = [
        row.REGION,
        row.PRIORITY,
        row.SERVER_NAME,
        row.IP_ADDRESS,
        row.SITE_CODE,
        row.LOCATION,
        row.SUPPORT_GROUP,
        row.SERVER_STATUS,
        row.SERVER_CLASS,
      ];

      try {
        await pool.query(query, values);
      } catch (err) {
        console.error(`❌ Error inserting row #${rowCount} (${row.SERVER_NAME}): ${err.message}`);
      }
    };

    fs.createReadStream("servers.csv")
      .pipe(csv())
      .on("data", (data) => {
        insertPromises.push(insertServer(data));
      })
      .on("end", async () => {
        await Promise.all(insertPromises);
        console.log(`✅ Done importing ${rowCount} rows.`);
        process.exit();
      })
      .on("error", (err) => {
        console.error("❌ Error reading CSV file:", err.message);
        process.exit(1);
      });
  }
});
