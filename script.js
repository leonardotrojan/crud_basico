const button = document.querySelector('#button');
const caixa = document.querySelector('#customers');

async function loadCustomers() {
    const response = await fetch('http://localhost:8080/customers');
    const customers = await response.json();

    caixa.innerHTML = '';

    customers.forEach(customer => {
        const div = document.createElement('div');

        div.innerHTML = `<strong>${customer.name}</strong><br> <span>${customer.email}</span><hr>`;

        caixa.appendChild(div);
    }); 
}

button.addEventListener('click', loadCustomers);