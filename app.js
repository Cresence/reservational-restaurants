// Dependencies
// =============================================================
let express = require("express");
let path = require("path");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars customers (DATA)
// =============================================================
let customers = [
  {
    customerName: "customer1",
    phoneNumber: "Mitch",
    customerEmail: "person1@email.com",
    customerID: "Mi",
  },
  {
    customerName: "customer2",
    phoneNumber: "Anh",
    customerEmail: "person2@email.com",
    customerID: "An",
  },
  {
    customerName: "customer3",
    phoneNumber: "Dan",
    customerEmail: "person3@email.com",
    customerID: "Da"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
app.get("/tables", function(req, res) {
res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all customers
app.get("/api/customers", function(req, res) {
  return res.json(customers);
});

// Displays a single customer, or returns false
app.get("/api/customers/:customer", function(req, res) {
  let chosen = req.params.customer;

  console.log(chosen);

  for (let i = 0; i < customers.length; i++) {
    if (chosen === customers[i].routeName) {
      return res.json(customers[i]);
    }
  }

  return res.json(false);
});

// Create New customers - takes in JSON input
app.post("/api/customers", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newcustomer = req.body;

  // Using a RegEx Pattern to remove spaces from newcustomer
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcustomer.routeName = newcustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcustomer);

  customers.push(newcustomer);

  res.json(newcustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});