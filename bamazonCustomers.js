
//connect the requires to the node app and mysql
var mysql = require("mysql");
var inquirer = require("inquirer");
var validator = require("validator");
var colors = require("colors");


//declare the connection, username/password, and database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("hello user, you are connected to ".blue + connection.threadId.blue);
    console.log("                                          ")
    console.log("here are the items that you are able to buy:".green + "\n")
    displayProducts(); //calls the displayProducts function after the connection is accomplished

})

//displays all of the products that are available for purchase

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("item #: ".red + res[i].item_id + "\n"
                + "product: ".green + res[i].product_name.blue + "\n"
                + "department: ".green + res[i].department_name.blue + "\n"
                + "price: ".green + res[i].price + "\n"
                + "quantity left: ".green + res[i].stock_quantity + "\n"
                + "______________________________________________")
        }
    })

    //ask which product a customer wants from an available list

    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "choose the item # of the item you would like to buy".blue + "\n\n",

            //validate makes sure that the number entered is actully a number

            validate: function (itemNumber) {
                if (isNaN(itemNumber) === false) {
                    return true;
                }
                else {
                    return false;
                    console.log('please choose an actual "number"'.red);
                }
            }
        }
        //ask how many of the items that the user/shopper wants 
         

        
    // .then(function (choice) {
    //             var chosenItemId = choice.item_id
    //             console.log(chosenItemId);

    //             if (amountPurchased < res[chosenItemId].stock_quantity) {
    //                 console.log("you have purchased " + choice.stock_quantity)
    //             }
    //         })
}


