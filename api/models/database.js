import pg from "pg";


const pool = new pg.Pool({
	user: "technical",
	host: "127.0.0.1",
	database: "Technical",
	password: "technical",
	port: 5432
});

// pool.query("SELECT NOW()", (err, res) => {
// console.log(err, res);
// pool.end();
// });

export default pool;
