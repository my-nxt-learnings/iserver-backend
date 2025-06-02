const pool = require("../db");

exports.getAllServers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM servers");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServersByRegion = async (req, res) => {
  const { region } = req.params;
  try {
    const result = await pool.query("SELECT * FROM servers WHERE region = $1", [region]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchServers = async (req, res) => {
  const { query } = req.params;
  try {
    const result = await pool.query("SELECT * FROM servers WHERE server_name ILIKE $1", [`%${query}%`]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addServer = async (req, res) => {
    const {
      region,
      priority,
      server_name,
      ip_address,
      site_code,
      location,
      support_group,
      server_status,
      server_class,
      owner,
      application_group
    } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO servers 
          (region, priority, server_name, ip_address, site_code, location, support_group, server_status, server_class, owner, application_group)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [
          region,
          priority,
          server_name,
          ip_address,
          site_code,
          location,
          support_group,
          server_status,
          server_class,
          owner,
          application_group
        ]
      );
  
      res.status(201).json({ message: "Server added successfully", server: result.rows[0] });
    } catch (err) {
      console.error("Error adding server:", err.message);
      res.status(500).json({ error: "Failed to add server" });
    }
  };
  
