//Initialize the npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');
require("console.table");
require('./keys.js');

//Initializes the variables to connect to server
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.password,
    database: "bamazon"

});

// Connection to mysql server
connection.connect(function(err){
    if(err) {
        console.error("error connecting: " + err.stack)
    }
    productLoad();
});

//Load products table from mysql db
function productLoad() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        //console.table to draw table of result
        console.table(res);

        //prompt customer for product choice
        customerPromptItem(res);

    });
}

//Use prouct ID to prompt the customer
function customerPromptItem(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "What is the product ID you would like to purchase? [Q to quit terminal]",
            //validate the response with function
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ]).then(function(val) {
        //check for quit input
        didUserQuit(val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId, inventory);
  
        //If there is a valid user choice entered then prompt for quantity
        if (product) {
            //Pass chosen product into quantity prompt
        customerHowMany(product);
        } else{
            console.log("\nNot a valid inventory item.");
            productLoad();
        }
    });
}

//prompt for quantity of product
function customerHowMany(product){
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like? [Q to quit terminal]",
            validate: function(val) {
                return val > 0 || val.toLowerCase() === "q";
            }
        }
    ]).then(function(val){
        //check for quit input
        didUserQuit(val.quantity);
        var quantity = parseInt(val.quantity);

        //If there aren't enough in stock return notification and reload products
        if(quantity > product.stock_quantity) {
            console.log("\nNot enough in stock!");
            productLoad();  
        } else {
            // If quantity is in stock run customer purchase function
            customerPurchase(product, quantity);
        }
    });
}

//Write function to purchase the desired quantity and update the inventory
function customerPurchase(product, quantity){
    connection.query(
        "UPDATE productes SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function(err, res) {
            // Let the user know the purchase was successful then run productLoad
            console.log("\nThanks for your purchase of " + quantity + " " + product.product_name + "'s!");
            productLoad();
            }    
        );
}

//Check if the requested product is in inventory
function checkInventory(choiceId, inventory) {
for (var i = 0; i <inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
        //return the inventory if the matched product is found
    return inventory[i];
    }
}
//return null
return null;
}

//Function to check if the user quit
function didUserQuit(choice) {
    if(choice.toLowerCase() === "q") {
    //Log a sign off message and exit the node process
    console.log("Bye for now!");
    process.exit(0);
    }
}

