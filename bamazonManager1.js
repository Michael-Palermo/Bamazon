//Initialize NPM packages
var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
require('./keys.js')

//Initial vars for server connect
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password: keys.password,
    database:"bamazon"
});

//Create connection to server
connection.connect(function(err){
    if(err){
        console.error("error connecting: " + err.stack);
    }
    managerMenuLoad();
});

//Get product data from the database
function managerMenuLoad() {
connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    //load manager menu with the products data passed into it
    managerMenuOptionsLoad(res);
});
}

//Load the manager menu options with products passed into it
function managerMenuOptionsLoad(products) {
    inquirer.prompt([
        {
            type: "list",
            name:"choice",
            choices: ["View Products", "View Low Invetory", "Add to Inventory", "Add a New Item", "Quit"],
            message:"What would you like to do?"
        }
    ]).then(function(val) {
        switch(val.choice) {
            case "View Products":
            console.table(products);
            managerMenuLoad();
            break;
            case "View Low Inventory":
            loadLowInventory();
            break;
            case "Add to Inventory":
            addToInventory(products);
            break;
            case "Add a New Product":
            newProductPrompt();
            break;
            default:
            console.log("Thank You!");
            process.exit(0);
            break;
        }
    });
}

//Database query for low inventory items
function loadLowInventory() {
    // selects all products with qty <= 5
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        // draw a table in terminal
        console.table(res);
        managerMenuLoad();
    });
}

//Prompt to add a quantity to existing item in inventory
function addToInventory(inventory) {
    console.table(inventory);
    inquirer.prompt([
        {
        type: "input",
        name: "choice",
        message: "What is the product ID?",
        validate: function(val) {
            return !isNaN(val);
            }
        }
    ]).then(function(val) {
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId, inventory);

        //If product exists already
        if (product) {
            quantityPrompt(product);
        } else{
            //Let user know item not in inventory
            console.log("\nNot an inventory item!");
            managerMenuLoad();
        }
    });
}

//function for quantity prompt
function quantityPrompt(product) {
    inquirer.prompt([
        {
            type:"input",
            name: "quantity",
            message: "How many are you adding to inventory?",
            validate: function(val) {
                return val > 0;
            }
        }
    ]).then(function(val) {
        var quantity = parseInt(val.quantity);
        addQuantity(product, quantity);
    });
}

// Add quantity function
function addQuantity(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [product.stock_quantity + quantity, product.item_id],
        function (err, res) {
            if (err) throw err;
            // Let user know qty is updated
            console.log("\nProduct was successfully updated!"),
            managerMenuLoad();
        }
    );
}

//Function for new produt prompt
function newProductPrompt(product) {
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What is the name of the product to be added?"
        },
        {
            type:"list",
            name: "department_name",
            choices: getDepeartments(products),
            message: "Which departmentis this product in?"
        },
        {
            type:"input",
            name: "quantity",
            message: "How much is the product being sold for?",
            validate: function(val) {
                return val >0;
            }
        }
    ]).then(addNewProduct);
}

//Function to add new product to the database
function addNewProduct() {
    connection.query(
        "INSERT INTO products (product_name, deprtment_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
        [val.product_name, val.department_name, val.price, val.quantity],
        function (err, res) {
            if (err) throw err;
            console.log(val.product_name + "ADDED TO BAMAZON");
            //Re run the loadManagerMenu function
            loadManagerMenu();
        }
    );
}

// Take an array of product objects, return array of departments
function getDepartments(products) {
    var departments = [];
    for(var i = 0; i < products.length; i++) {
        if(departments.indexOf(products[i].department_name) === -1) {
            departments.push(products[i].department_name);
        }
    } return departments;
}

//check to see if product is in inventory
function checkInventory(choiceId, inventory) {
    for(var i=0; i< inventory.length; i++) {
        if(inventory[i].item_id ===choiceId) {
            //If there is a product match return inventory
            return inventory[i];
        }
    }
    //otherwise return null
    return null;
}