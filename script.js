let cart = [];

function addToCart(name, price, quantityId) {

    let quantity = parseInt(document.getElementById(quantityId).value);

    if (!quantity || quantity <= 0) {
        alert("Enter valid quantity");
        return;
    }

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    displayCart();
}

function displayCart() {

    let cartDiv = document.getElementById("cartItems");
    let totalDisplay = document.getElementById("totalAmount");
    let age = parseInt(document.getElementById("userAge").value);
    let discountMessage = document.getElementById("discountMessage");

    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartDiv.innerHTML += 
            `<p>${item.name} - ${item.quantity} x ₱${item.price} = ₱${itemTotal}</p>`;
    });

    /* ===== Senior Discount Logic ===== */
    if (age >= 60) {
        let discount = total * 0.12;
        total -= discount;
        discountMessage.innerHTML = "Senior Discount Applied (12%)";
    } else {
        discountMessage.innerHTML = "";
    }

    totalDisplay.innerHTML = "Total: ₱" + total.toFixed(2);
}
function payNow() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let age = parseInt(document.getElementById("userAge").value);
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Apply discount if 60+
    if (age >= 60) {
        total = total - (total * 0.12);
    }

    alert("Payment Successful!\nTotal Paid: ₱" + total.toFixed(2));

    // Clear cart after payment
    cart = [];
    displayCart();
}