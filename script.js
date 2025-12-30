const input = document.querySelector('#searchById');
const submit = document.querySelector('#search');

async function searchUser() {
    const inputValue = input.value.trim();

    if (!inputValue) {
        console.log('Please enter a user ID.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/customers/${inputValue}`);

        if (!response.ok) {
            console.error("Erro:", response.status);
            return;
        }

        const data = await response.json();

        const list = document.querySelector('#users')

        const li = document.createElement('li');

        li.dataset.id = data.id;

            li.innerHTML = `
                ${data.name} <br>
                ${data.email} 
                <span class="delete">x</span>
            `;
            list.appendChild(li);
            

    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    searchUser();
});

const list = document.querySelector('#users');

list.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete')) {

        const li = event.target.closest('li');
        const userId = li.dataset.id;

        try {

            if (!confirm("Tem certeza que deseja deletar este cliente?")) return;

            const response = await fetch(`http://localhost:8080/customers/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error("Erro ao deletar:", response.status);
                return;
            }

            li.remove();
        } catch (error) {
            console.error("Erro na requisição de delete:", error);
        }
    }
});

const listAllButton = document.querySelector('#listAll');

listAllButton.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/customers');
        const data = await response.json();

        const list = document.querySelector('#users');
        list.innerHTML = '';

        data.forEach(user => {
            const li = document.createElement('li');
            li.dataset.id = user.id;
            li.innerHTML = `
                ${user.name} <br>
                ${user.email}
                <span class="delete">x</span>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
})

const createButton = document.querySelector('#create');

createButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#newUsername');
    const emailInput = document.querySelector('#Newuseremail');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/customers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            console.error("Erro ao criar usuário:", response.status);
            return;
        }

        const newUser = await response.json();

        alert(`Usuário ${newUser.name} criado com sucesso!`);

        nameInput.value = '';
        emailInput.value = '';
    } catch (error) {
        console.error("Erro na requisição de criação:", error);    
    }
);
