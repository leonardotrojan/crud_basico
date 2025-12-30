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
        console.log(data);
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    searchUser();
})