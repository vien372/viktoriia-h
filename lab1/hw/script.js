let products = JSON.parse(localStorage.getItem('shoppingCart')) || [
    { id: 1, name: 'Помідори', quantity: 1, isBought: false },
    { id: 2, name: 'Печиво', quantity: 1, isBought: false },
    { id: 3, name: 'Сир', quantity: 1, isBought: false }
];

function saveToStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(products));
}

const inputField = document.querySelector('.add-product-form input');
const addButton = document.querySelector('.btn-add');
const productsListContainer = document.querySelector('.products-list');

const remainingContainer = document.querySelector('.summary-box:nth-child(1) .stats-badges');
const boughtContainer = document.querySelector('.summary-box:nth-child(2) .stats-badges');

function render() {
    productsListContainer.innerHTML = '';
    remainingContainer.innerHTML = '';
    boughtContainer.innerHTML = '';

    products.forEach(product => {
        const item = document.createElement('div');
        item.className = `product-item ${product.isBought ? 'bought' : ''}`;

        const nameWrapper = document.createElement('div');
        nameWrapper.style.flex = '1';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'product-name';
        nameSpan.textContent = product.name;
        nameWrapper.appendChild(nameSpan);

        if (!product.isBought) {
            nameSpan.style.cursor = 'pointer';
            nameSpan.addEventListener('click', () => {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = product.name;
                editInput.className = 'edit-name-input';
                editInput.style.fontSize = '16px';
                editInput.style.padding = '2px 5px';
                
                nameWrapper.replaceChild(editInput, nameSpan);
                editInput.focus();

                const saveName = () => {
                    const newName = editInput.value.trim();
                    if (newName) {
                        product.name = newName;
                        saveToStorage();
                        render();
                    }
                };

                editInput.addEventListener('blur', saveName);
                editInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') saveName();
                });
            });
        }

        const controlsWrapper = document.createElement('div');
        controlsWrapper.className = 'controls-wrapper';

        if (!product.isBought) {
            const quantityControls = document.createElement('div');
            quantityControls.className = 'quantity-controls';

            const minusBtn = document.createElement('button');
            minusBtn.type = 'button';
            minusBtn.className = product.quantity === 1 ? 'btn-circle btn-minus-disabled' : 'btn-circle btn-minus';
            minusBtn.textContent = '−';
            minusBtn.disabled = product.quantity === 1;
            minusBtn.setAttribute('data-tooltip', 'Зменшити кількість');
            minusBtn.addEventListener('click', () => {
                if (product.quantity > 1) {
                    product.quantity--;
                    saveToStorage();
                    render();
                }
            });

            const qtyValue = document.createElement('span');
            qtyValue.className = 'quantity-value';
            qtyValue.textContent = product.quantity;

            const plusBtn = document.createElement('button');
            plusBtn.type = 'button';
            plusBtn.className = 'btn-circle btn-plus';
            plusBtn.textContent = '+';
            plusBtn.setAttribute('data-tooltip', 'Збільшити кількість');
            plusBtn.addEventListener('click', () => {
                product.quantity++;
                saveToStorage();
                render();
            });

            quantityControls.appendChild(minusBtn);
            quantityControls.appendChild(qtyValue);
            quantityControls.appendChild(plusBtn);
            controlsWrapper.appendChild(quantityControls);
        } else {
            const qtyBadge = document.createElement('span');
            qtyBadge.className = 'quantity-badge';
            qtyBadge.textContent = product.quantity;
            controlsWrapper.appendChild(qtyBadge);
        }

        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';

        const statusBtn = document.createElement('button');
        statusBtn.type = 'button';
        statusBtn.className = 'btn-status';
        statusBtn.textContent = product.isBought ? 'Не куплено' : 'Куплено';
        statusBtn.setAttribute('data-tooltip', product.isBought ? 'Повернути в список' : 'Позначити як куплене');
        statusBtn.addEventListener('click', () => {
            product.isBought = !product.isBought;
            saveToStorage();
            render();
        });
        actionButtons.appendChild(statusBtn);

        if (!product.isBought) {
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn-circle btn-delete';
            deleteBtn.textContent = '×';
            deleteBtn.setAttribute('data-tooltip', 'Вилучити зі списку');
            deleteBtn.addEventListener('click', () => {
                products = products.filter(p => p.id !== product.id);
                saveToStorage();
                render();
            });
            actionButtons.appendChild(deleteBtn);
        }

        controlsWrapper.appendChild(actionButtons);
        item.appendChild(nameWrapper);
        item.appendChild(controlsWrapper);
        productsListContainer.appendChild(item);

        const statsBadge = document.createElement('span');
        statsBadge.className = `stats-badge ${product.isBought ? 'bought-badge' : ''}`;
        statsBadge.innerHTML = `${product.name} <mark>${product.quantity}</mark>`;

        if (product.isBought) {
            boughtContainer.appendChild(statsBadge);
        } else {
            remainingContainer.appendChild(statsBadge);
        }
    });
}

function createNewProduct() {
    const productName = inputField.value.trim();
    if (productName === '') return;
    const newProduct = {
        id: Date.now(),
        name: productName,
        quantity: 1,
        isBought: false
    };

    products.push(newProduct);
    saveToStorage();
    render();

    inputField.value = '';
    inputField.focus();
}

addButton.addEventListener('click', createNewProduct);
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        createNewProduct();
    }
});
render();