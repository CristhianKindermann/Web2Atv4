class Funcionario {
    constructor(nome, idade, salarioBase) {
        this.nome = nome;
        this.idade = idade;
        this.salarioBase = salarioBase;
    }
    get salario() {
        return this.salarioBase;
    }
}
class Gerente extends Funcionario {
    constructor(nome, idade, bonus) {
        super(nome, idade, 5000);
        this.bonus = bonus;
    }
    get salario() {
        return this.salarioBase + this.bonus;
    }
    getResumo() {
        return `Gerente: ${this.nome}, ${this.idade} anos, Salário: R$${this.salario}`;
    }
}
class Desenvolvedor extends Funcionario {
    constructor(nome, idade, linguagem) {
        super(nome, idade, 4000);
        this.linguagem = linguagem;
    }
    getResumo() {
        return `Desenvolvedor: ${this.nome}, ${this.idade} anos, Linguagem: ${this.linguagem}, Salário: R$${this.salario}`;
    }
}
const form = document.getElementById('formFuncionario');
const lista = document.getElementById('listaFuncionarios');
const campoEspecial = document.getElementById('campoEspecial');
const labelEspecial = document.getElementById('labelEspecial');
const inputEspecial = document.getElementById('inputEspecial');
const cargo = document.getElementById('cargo');
let funcionarios = [];
cargo.addEventListener('change', () => {
    if (cargo.value === 'gerente') {
        campoEspecial.classList.remove('hidden');
        labelEspecial.textContent = 'Bônus:';
        inputEspecial.type = 'number';
    }
    else if (cargo.value === 'desenvolvedor') {
        campoEspecial.classList.remove('hidden');
        labelEspecial.textContent = 'Linguagem:';
        inputEspecial.type = 'text';
    }
    else {
        campoEspecial.classList.add('hidden');
    }
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    let funcionario;
    if (cargo.value === 'gerente') {
        const bonus = parseFloat(inputEspecial.value);
        funcionario = new Gerente(nome, idade, bonus);
    }
    else if (cargo.value === 'desenvolvedor') {
        const linguagem = inputEspecial.value;
        funcionario = new Desenvolvedor(nome, idade, linguagem);
    }
    else {
        alert('Selecione um cargo.');
        return;
    }
    funcionarios.push(funcionario);
    atualizarLista();
    form.reset();
    campoEspecial.classList.add('hidden');
});
function atualizarLista() {
    lista.innerHTML = '';
    funcionarios.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f.getResumo();
        lista.appendChild(li);
    });
}
