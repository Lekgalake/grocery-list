let budget = 0;
let items = [];

function setBudget() {
    budget = parseFloat(document.getElementById('budget').value);
    if (!isNaN(budget) && budget > 0) {
        document.getElementById('remaining-budget').textContent = `Remaining Budget: R${budget.toFixed(2)}`;
    } else {
        alert('Please enter a valid budget.');
    }
}

function addItem() {
    if (budget <= 0) {
        alert('Please set your budget first.');
        return;
    }
    const itemName = document.getElementById('item').value;
    if (itemName) {
        items.push({ name: itemName, price: 0, bought: false });
        document.getElementById('item').value = '';
        updateItemList();
    }
}

function updateItemList() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <input type="number" id="price-${index}" placeholder="Price (R)" oninput="updatePrice(${index})">
            <input type="checkbox" id="checkbox-${index}" disabled onchange="buyItem(${index})">
        `;
        itemList.appendChild(li);
    });
}

function updatePrice(index) {
    const price = parseFloat(document.getElementById(`price-${index}`).value);
    if (!isNaN(price) && price > 0) {
        items[index].price = price;
        document.getElementById(`checkbox-${index}`).disabled = false;
    } else {
        items[index].price = 0;
        document.getElementById(`checkbox-${index}`).disabled = true;
    }
}

function buyItem(index) {
    const item = items[index];
    if (!item.bought) {
        budget -= item.price;
        item.bought = true;
    } else {
        budget += item.price;
        item.bought = false;
    }
    document.getElementById('remaining-budget').textContent = `Remaining Budget: R${budget.toFixed(2)}`;
    if (budget < 0) {
        document.getElementById('remaining-budget').classList.add('low-budget');
    } else {
        document.getElementById('remaining-budget').classList.remove('low-budget');
    }
}
