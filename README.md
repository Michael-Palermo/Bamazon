# CLI Storefront Application
## Synopsis
An interactive shopping node app where MySQL and Node.JS are used to allow users to purchase items as a customer, view, track and update the product inventory as a manager, and track the total sales by department as a supervisor.
## Bamazon Customer Portal
The Bamazon Customer Portal allows users to view the current items available for purchase. The user will be prompted to enter the item id# and how many items they wish to purchase. If the item is in stock, the order will be completed and the user will see a notifiction. This terminal also has a quit option.
<div style="text-align: center;">
  <img src="img/bamazonCustomer.png">
</div>
## Bamazon Manager Portal
The Bamazon Manager Portal allows users to view and edit the inventory of the store. The user will be prompted to choose from the following options:

<ul>
 <li>View products for sale</li>
 <li>View low inventory</li>
 </ul>
 <div style="text-align: center;">
  <img src="img/1.png">
  <img src="img/2.png">
</div>
<ul>
 <li>Add to inventory</li>
 <li>Add a new product</li>
<div style="text-align: center;">
  <img src="img/3.png">
</div>
</ul>
The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, the price of the product, and how many are left in stock.
The second option allows the user to see a list of all inventory items that have less than 5 items in stock. If there are no products that meet this criteria, the console will tell the user that all items have a stock greater than 5.
The third option allows the user to update the inventory for a specific product. A prompt asks what the id is for the product the user wants to update. A second prompt asks how many items the user wishes to increase the quantity by.
The last option allows the user to add a new product to the inventory. Prompts ask the user for the product name, the department name, the price, and the stock quantity.

