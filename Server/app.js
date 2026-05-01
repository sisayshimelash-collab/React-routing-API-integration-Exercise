const { create } = require("domain");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "sisu2112",
  database: "myDB",
});

connection.connect((err) => {
  if (err) {
    console.log("cannot connect the database");
  } else {
    console.log("connected");
  }
});

app.get("/install", (req, res) => {
  let productTable = `
  CREATE TABLE IF NOT EXISTS Product_Table (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(55) NOT NULL,
    product_url VARCHAR(255) NOT NULL
  )
  `;

  let user = `CREATE TABLE IF NOT EXISTS users (
 user_id INT AUTO_INCREMENT PRIMARY KEY,
 user_name VARCHAR(50) NOT NULL,
 user_password VARCHAR(30)
)
`;

  let productDescription = ` CREATE TABLE IF NOT EXISTS Product_description (
Description_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT,
FOREIGN KEY (product_id) REFERENCES Product_Table(product_id),
product_brief_description VARCHAR(500),
product_description VARCHAR(1000),
product_img VARCHAR(255),
product_link VARCHAR(200)

)`;

  let price = `CREATE TABLE IF NOT EXISTS product_price(
price_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT,
FOREIGN KEY (product_id) REFERENCES Product_Table(product_id),
starting_price VARCHAR(50),
price_range VARCHAR(255)

) `;

  let orders = ` CREATE TABLE IF NOT EXISTS orders(
order_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT,
user_id INT,

FOREIGN KEY (product_id) REFERENCES Product_Table(product_id),

FOREIGN KEY (user_id) REFERENCES users(user_id)

) 
`;

  connection.query(productTable, (err) => {
    if (err) return res.send("Error creating product table");

    connection.query(user, (err) => {
      if (err) return res.send("Error creating user table");

      connection.query(productDescription, (err) => {
        if (err) return res.send("Error creating description table");

        connection.query(price, (err) => {
          if (err) return res.send("Error creating price table");

          connection.query(orders, (err) => {
            if (err) return res.send("Error creating orders table");

            res.send(" All tables created successfully");
          });
        });
      });
    });
  });
});

app.post("/add-product", (req, res) => {
  const {
    product_name,
    product_url,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
    user_name,
    user_password,
  } = req.body;

  const insertValue = `INSERT INTO Product_Table (product_name, product_url) VALUES(?,?)`;
  const insertDes = `INSERT INTO Product_description
    (product_id, product_brief_description, product_description, product_img, product_link)
    VALUES (?, ?, ?, ?, ?)`;
  const insertPrice = `INSERT INTO product_price
    (product_id, starting_price, price_range)
    VALUES (?, ?, ?)`;
  const insertUser = ` INSERT INTO users(user_name, user_password) VALUES(?,?)`;
  const insertOrder = `INSERT INTO orders(product_id, user_id) VALUES(?,?)`;

  connection.query(insertValue, [product_name, product_url], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Cannot insert product");
    }

    const productID = result.insertId;

    connection.query(
      insertDes,
      [
        productID,
        product_brief_description,
        product_description,
        product_img,
        product_link,
      ],
      (err) => {
        if (err) {
          console.log(err);
          return res.send("Failed to add description");
        }

        connection.query(
          insertPrice,
          [productID, starting_price, price_range],
          (err) => {
            if (err) {
              console.log(err);
              return res.send("Failed to insert price");
            }
          },
        );
      },
    );

    connection.query(
      insertUser,
      [user_name, user_password],
      (err, userResult) => {
        if (err) {
          return res.send("Failed to insert user data");
        }

        const userID = userResult.insertId;
        connection.query(insertOrder, [productID, userID], (err) => {
          if (err) {
            return res.send("Failed to insert order information");
          } else {
            res.send("All values inserted successfully");
          }
        });
      },
    );
  });
});

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
  const query = `
    SELECT 
      p.product_id,
      p.product_name,
      p.product_url,
      d.product_brief_description,
      d.product_description,
      d.product_img,
      d.product_link,
      pr.starting_price,
      pr.price_range
    FROM Product_Table p
    LEFT JOIN Product_description d ON p.product_id = d.product_id
    LEFT JOIN product_price pr ON p.product_id = pr.product_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching products");
    }
    res.json(results);
  });
});

//  GET SINGLE PRODUCT BY ID
app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  console.log("Fetching product with ID:", productId); // 

  const query = `
    SELECT 
      p.product_id,
      p.product_name,
      p.product_url,
      d.product_brief_description,
      d.product_description,
      d.product_img,
      d.product_link,
      pr.starting_price,
      pr.price_range
    FROM Product_Table p
    LEFT JOIN Product_description d ON p.product_id = d.product_id
    LEFT JOIN product_price pr ON p.product_id = pr.product_id
    WHERE p.product_id = ?
  `;

  connection.query(query, [productId], (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ error: "Error fetching product" });
    }

    console.log("Query results:", results); // Debug log

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]); // Send single product
  });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
