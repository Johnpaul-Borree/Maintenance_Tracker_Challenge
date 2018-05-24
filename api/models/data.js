const client = new Client({
  user: "johnpaul",
  host: "localhost",
  database: "Maintenance-Track",
  password: "2geda4my99",
  port: 5432
});
client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});
