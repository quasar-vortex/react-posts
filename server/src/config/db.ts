import mysql from "mysql2/promise";
import { dbConfig } from "./env";
import { Post } from "../types/Post";

const sql = `
    create table if not exists posts (id int auto_increment primary key, title varchar(100) not null unique, content text)
`;
const con = mysql.createPool(dbConfig);

// Create Posts table and add a record if none exists
(async () => {
  const myCon = await mysql.createConnection(dbConfig);
  const [s] = await myCon.query(sql);
  console.log(s);
  const [row] = await myCon.query(
    `select count(*) as postCount from posts where title = "testing"`
  );
  if ((row as { postCount: number }[])[0].postCount > 0) {
    const [rows, result] = await myCon.query(`select * from posts;`);
    console.log(rows);
  } else {
    const [res] = await myCon.execute(
      `insert into posts (title, content) values (?,?)`,
      ["testing", "testing"]
    );
    console.log(res);
  }
})();
export default con;
