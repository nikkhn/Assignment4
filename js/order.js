$(function(){
    pizza();
    drinks();
    desserts();

function pizza(){
    var idx;
    var pizza;
    var template = $(".template-pizzas");
    var container = $(".box-pizza");
    var clonedTemplate;
    for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; idx++) {
        pizza = com.dawgpizza.menu.pizzas[idx];
        clonedTemplate = template.clone();
        clonedTemplate.find(".name").html(pizza.name);
        clonedTemplate.find(".description").html(pizza.description);
        clonedTemplate.find(".large").html("Large $" + pizza.prices[2]).attr("data-name", pizza.name).attr("data-price", pizza.prices[2]);
        clonedTemplate.find(".medium").html("Medium $" + pizza.prices[1]).attr("data-name", pizza.name).attr("data-price", pizza.prices[1]);
        clonedTemplate.find(".small").html("Small $" + pizza.prices[0]).attr("data-name", pizza.name).attr("data-price", pizza.prices[0]);

//find button, set inner hTML, sets attributes.
//when button gets clicked, we can grab the value for the attributes assigned to let us fill out the new cart item.

        clonedTemplate.removeClass("template-pizzas");
        container.append(clonedTemplate);
    }
}

function drinks (){
    var idx;
    var drink;
    var template = $(".template-drinks")
    var container = $(".box-drinks")
    var clonedTemplate; 
    for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
        drink = com.dawgpizza.menu.drinks[idx];
        clonedTemplate = template.clone();
        clonedTemplate.find(".name").html(drink.name);
        clonedTemplate.find(".drink").html("Order: $" + drink.price);

        clonedTemplate.removeClass("template-drinks");
        container.append(clonedTemplate);
    }
}

function desserts () {
    var idx;
    var drink;
    var template = $(".template-desserts")
    var container = $(".box-desserts")
    var clonedTemplate; 
    for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
        dessert = com.dawgpizza.menu.desserts[idx];
        clonedTemplate = template.clone();
        clonedTemplate.find(".name").html(dessert.name);
        clonedTemplate.find(".dessert").html("Order: $" + dessert.price);

        clonedTemplate.removeClass("template-desserts");
        container.append(clonedTemplate);
    } 
}

     
    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data


    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);
        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $(".cart-container"));
    });

    $('.place-order').click(function(){
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the 
        //total order is greater than $20 (see homework 
        //instructions) 
        postCart(cart, $('.cart-form'));
    });
});

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
    var idx, item;
    //empty the container of whatever is in there currently
    container.empty();
    //for each item in the cart...
    var template = $(".template-cart");
    var clonedTemplate; 
    for (idx = 0; idx < cart.items.length; idx++) {
        item = cart.items[idx];
        clonedTemplate = template.clone();
        clonedTemplate.find(".name").html(item.name);
        clonedTemplate.find(".price").html(item.price);

        clonedTemplate.removeClass("template-cart");
        container.append(clonedTemplate);

        //TODO: code to render the cart item

    } //for each cart item

    //TODO: code to render sub-total price of the cart
    //the tax amount (see instructions), 
    //and the grand total


//need index position for removal of the item
//add data.index(0) for each item in cart
//splice
//render cart again

} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();
}



//postCart()
