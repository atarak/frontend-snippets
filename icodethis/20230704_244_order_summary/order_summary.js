window.onload = function () {
    const inputs = document.getElementsByClassName("selectednum");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", updateCosts, false);
    }

    const increases = document.getElementsByClassName("increase");
    for (var i = 0; i < increases.length; i++) {
        increases[i].addEventListener("click", increaseQty, false);
    }

    const decreases = document.getElementsByClassName("decrease");
    for (var i = 0; i < decreases.length; i++) {
        decreases[i].addEventListener("click", decreaseQty, false);
    }

    const addBtn = document.getElementById("add-item");
    addBtn.addEventListener("click", addItem);

    const removeBtn = document.getElementsByClassName("remove-item");
    for (var i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener("click", removeLine, false);
    }

    updateSubtotal();
}

function updateCosts(e) {
    updateItemCost(e.target);
}

function updateItemCost(item) {
    var qty = item.getElementsByClassName("item-quantity")[0];
    var count = qty.getElementsByClassName("selectednum")[0].value;
    var cost = item.getElementsByClassName("item-cost")[0];
    var unitprice = cost.dataset.unitprice;
    cost.textContent = Number(count) * Number(unitprice);
    updateSubtotal();
}

function increaseQty(e) {
    updateItemQty(e.target.previousElementSibling, 1);
    updateItemCost(e.target.parentNode.parentNode);
}

function decreaseQty(e) {
    updateItemQty(e.target.nextElementSibling, -1);
    updateItemCost(e.target.parentNode.parentNode);
}

function updateItemQty(itemQty, amt) {
    if (itemQty) {
        itemQty.value = Number(itemQty.value) + Number(amt);
    }
}

function updateSubtotal() {
    console.log("updating subtotal");
    var itemCosts = document.getElementsByClassName("item-cost");
    var subtotal = 0.00;
    console.log("before: " + subtotal + " going to add... " + itemCosts.length);
    for (var i = 0; i < itemCosts.length; i++) {
        console.log("-- adding " + itemCosts[i].textContent);
        subtotal = subtotal + Number(itemCosts[i].textContent);
    }
    document.getElementById("subtotal").textContent = formatter.format(subtotal);

    if (subtotal > 0) {
        document.getElementById("shipping").textContent = formatter.format(2);
        document.getElementById("total-cost").textContent = formatter.format(subtotal + 2);
    } else {
        document.getElementById("shipping").textContent = formatter.format(0);
        document.getElementById("total-cost").textContent = formatter.format(0);
    }

}

function addItem() {
    var newItem = document.createElement("div");
    newItem.classList = "card-item";

    var newDesc = document.createElement("div");
    newDesc.classList = "item-description";
    var newName = document.createElement("div");
    newName.classList = "item-name";
    newName.textContent = "Coffee";
    var newSize = document.createElement("div");
    newSize.classList = "item-size";
    newSize.textContent = "Small";
    newDesc.appendChild(newName);
    newDesc.appendChild(newSize);
    newItem.appendChild(newDesc);

    var newQty = document.createElement("item-quantity");
    newQty.classList = "item-quantity";
    var decBtn = document.createElement("button");
    decBtn.classList = "decrease";
    decBtn.addEventListener("click", decreaseQty, false);
    var decSpan = document.createElement("span");
    decSpan.classList = "decrease-qty";
    var decIcon = document.createElement("i");
    decIcon.classList = "fa fa-minus decrease-icon";
    decSpan.appendChild(decIcon);
    decBtn.appendChild(decSpan);
    var newText = document.createElement("input");
    newText.type = "text";
    newText.classList = "selectednum";
    newText.pattern = "/{0-9}{0,2}/";
    newText.required = true;
    newText.placeholder = "1";
    newText.value = "1";
    var incBtn = document.createElement("button");
    incBtn.classList = "increase";
    incBtn.addEventListener("click", increaseQty, false);
    var incSpan = document.createElement("span");
    incSpan.classList = "increase-qty";
    var incIcon = document.createElement("i");
    incIcon.classList = "fa fa-plus increase-icon";
    incSpan.appendChild(incIcon);
    incBtn.appendChild(incSpan);
    newQty.appendChild(decBtn);
    newQty.appendChild(newText);
    newQty.appendChild(incBtn);
    newItem.appendChild(newQty);

    var newCost = document.createElement("div");
    newCost.classList = "item-cost";
    newCost.dataset.unitprice = "1.99";
    newCost.textContent = 1.99;
    newItem.append(newCost);

    var newAction = document.createElement("div");
    newAction.classList = "item-action";
    var removeBtn = document.createElement("button");
    removeBtn.classList = "remove-item";
    var removeSpn = document.createElement("span");
    removeSpn.classList = "remove";
    removeBtn.appendChild(removeSpn);
    newAction.appendChild(removeBtn);
    newAction.addEventListener("click", removeLine, false);
    newItem.append(newAction);

    document.getElementsByClassName("card-items")[0].appendChild(newItem);
    updateSubtotal();
}

function removeLine(e) {
    console.log("removing " + e.target);
    removeItem(e.target.parentNode.parentNode.parentNode.parentNode, e.target.parentNode.parentNode.parentNode);
}

function removeItem(parent, item) {
    parent.removeChild(item);
    updateSubtotal();
}

// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});