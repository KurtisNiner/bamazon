
//connect the requires to the node app and mysql
var mysql = require("mysql");
var inquirer = require("inquirer");
var validator = require("validator");
var colors = require("colors");
var table = require("console.table");


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
      
        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "choose the item # of the item you would like to buy".blue,
    
                //validate makes sure that the number entered is actully a number

                validate: function (itemNumber) {
                    if (isNaN(itemNumber) === false) {
                        return true;
                    }
                    else {
                        console.log('please choose an actual "number"'.red);
                        return false;
                    }
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "how many of this product would you like?".blue,
    
                //make sure customer chooses a number
                validate: function (isNumber) {
                    if (isNaN(isNumber) === false) {
                        return true;
                    }
                    else {
                        console.log('please choose an actual "number"'.red);
                        return false;
                    };
                }
            }

            //now take away from inventory and add up cost 
        ]).then(function(answer){
            // console.log(answer);
            var itemChosen;
           
            for(var i = 0; i < res.lenth; i++){
                if (res[i].product_name === answer.item) {
                    itemChosen = res[i];
                    console.log(itemChosen);
                    //for some reason, my code is not taking itemChosen and console logging it, so the rest of the code does not work after. 
                    //i dont know why, or how to fix it
                  }
            var newQuantity = parseInt(itemChosen.stock_quantity) - parseInt(answer.quantity);
            console.log(newQuantity);
            connection.query(
                "UPDATE products SET ? WHERE ?",
                  {
                    stock_quantity: newQuantity
                  },
                  {
                    item_id: answer.item
                  }
             
              );

            }
        })
    })
}
