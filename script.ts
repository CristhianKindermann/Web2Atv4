interface IPessoa {
    nome: string;
    idade: number;
    getResumo(): string;
  }
  
  abstract class Funcionario implements IPessoa {
    constructor(public nome: string, public idade: number, protected salarioBase: number) {}
    abstract getResumo(): string;
    get salario(): number {
      return this.salarioBase;
    }
  }
  
  class Gerente extends Funcionario {
    readonly bonus: number;
    constructor(nome: string, idade: number, bonus: number) {
      super(nome, idade, 5000);
      this.bonus = bonus;
    }
    get salario(): number {
      return this.salarioBase + this.bonus;
    }
    getResumo(): string {
      return `Gerente: ${this.nome}, ${this.idade} anos, Salário: R$${this.salario}`;
    }
  }
  
  class Desenvolvedor extends Funcionario {
    readonly linguagem: string;
    constructor(nome: string, idade: number, linguagem: string) {
      super(nome, idade, 4000);
      this.linguagem = linguagem;
    }
    getResumo(): string {
      return `Desenvolvedor: ${this.nome}, ${this.idade} anos, Linguagem: ${this.linguagem}, Salário: R$${this.salario}`;
    }
  }
  
  const form = document.getElementById('formFuncionario') as HTMLFormElement;
  const lista = document.getElementById('listaFuncionarios') as HTMLUListElement;
  const campoEspecial = document.getElementById('campoEspecial') as HTMLDivElement;
  const labelEspecial = document.getElementById('labelEspecial') as HTMLLabelElement;
  const inputEspecial = document.getElementById('inputEspecial') as HTMLInputElement;
  const cargo = document.getElementById('cargo') as HTMLSelectElement;
  
  let funcionarios: Funcionario[] = [];
  
  cargo.addEventListener('change', () => {
    if (cargo.value === 'gerente') {
      campoEspecial.classList.remove('hidden');
      labelEspecial.textContent = 'Bônus:';
      inputEspecial.type = 'number';
    } else if (cargo.value === 'desenvolvedor') {
      campoEspecial.classList.remove('hidden');
      labelEspecial.textContent = 'Linguagem:';
      inputEspecial.type = 'text';
    } else {
      campoEspecial.classList.add('hidden');
    }
  });
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const idade = parseInt((document.getElementById('idade') as HTMLInputElement).value);
  
    let funcionario: Funcionario;
  
    if (cargo.value === 'gerente') {
      const bonus = parseFloat(inputEspecial.value);
      funcionario = new Gerente(nome, idade, bonus);
    } else if (cargo.value === 'desenvolvedor') {
      const linguagem = inputEspecial.value;
      funcionario = new Desenvolvedor(nome, idade, linguagem);
    } else {
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
  