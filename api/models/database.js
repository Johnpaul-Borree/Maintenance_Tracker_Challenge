import pg from "pg";


const pool = new pg.Pool({
	user: "ziphejwliwuijt",
	host: "ec2-54-204-39-46.compute-1.amazonaws.com",
	database: "d4pagmnk0vjsmd",
	password: "6d4e573cfb8eecd7287dff61a959a2e3a56a80459d3438ff4326383c2a93f7c5",
	port: 5432
});

// pool.query("SELECT NOW()", (err, res) => {
// console.log(err, res);
// pool.end();
// });

export default pool;
