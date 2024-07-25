interface Veiculo {
    nome: string
    placa: string
    entrada: Date | string
}

const $ = (query: string): HTMLInputElement | null => document.querySelector(query);
const newElement = (tag: string): HTMLElement => document.createElement(tag);
const addGlobalEventListener = (event: string, selector: string, callback: (e: Event) => void) => {
    document.addEventListener(event, (e) => {
        const target = e.target as Element;
        if (target?.matches(selector)) {
            callback(e);
        }
    })
}

(function main() {
    $('#cadastrar')?.addEventListener("click", cadastrarVeiculo);
    addGlobalEventListener('click', '.deleteCarBtn', patio().remover)
    patio().render();
})()

function cadastrarVeiculo() {
    const nome = $('#nome')?.value.trim();
    const placa = $('#placa')?.value.trim();

    if (!nome || !placa) {
        alert('Os campos estão vazios');
        return;
    }

    const veiculo: Veiculo = { nome: nome, placa: placa, entrada: new Date().toISOString() }
    patio().adicionar(veiculo, true);

    $('#nome')!.value = '';
    $('#placa')!.value = '';
    $('#nome')!.focus();
}

function patio() {

    function ler(): Veiculo[] {

        let veiculos = localStorage.patio ? JSON.parse(localStorage.patio) : [];

        return veiculos
    }


    function salvar(veiculos: Veiculo[]) {
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }


    function adicionar(veiculo: Veiculo, salva?: boolean) {

        const row = newElement('tr');

        const nome = newElement('td')
        nome.innerText = veiculo.nome;

        const placa = newElement('td')
        placa.innerText = veiculo.placa;

        const entrada = newElement('td')
        entrada.innerText = formatTime(new Date(veiculo.entrada));

        const acao = newElement('td');
        const btn = newElement('button');
        btn.innerText = 'X';
        btn.classList.add('deleteCarBtn')
        btn.setAttribute('data-placa', veiculo.placa);
        acao.appendChild(btn);

        row.appendChild(nome);
        row.appendChild(placa);
        row.appendChild(entrada);
        row.appendChild(acao);
        $('#patio')!.appendChild(row);


        if (salva)
            salvar([...ler(), veiculo])
    }


    function remover(e: Event) {

        const target = e.target as Element | null;
        const placa = target?.getAttribute('data-placa');

        const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa)!;

        const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

        if (!confirm(`O carro ${nome} ficou: ${tempo}\nDeseja confirmar a saída?` )) return;

        const newArray: Veiculo[] = ler().filter(veiculo => veiculo.placa !== placa);
        salvar(newArray);
        target?.closest('tr')?.remove();


    }


    function render() {
        $('#patio')!.innerHTML = "";
        const patio: Veiculo[] = ler();

        if (patio.length > 0) {
            patio.forEach((veiculo: Veiculo) => { adicionar(veiculo, false) })
        }
    }

    return { ler, adicionar, remover, salvar, render };
}

function calcTempo(mil: number): string {
    const dias =  Math.floor(mil / 86400000);
    const horas = Math.floor((mil % 86400000) / 3600000);
    const min = Math.floor((mil% 3600000) / 60000);
    const sec = Math.floor((mil % 60000) / 1000);

    return `${dias} dias e ${horas}h : ${min}min : ${sec}s`
}

function formatTime(date: Date): string {

    let day = date.getDay().toString().padStart(2, '0');
    let month = date.getMonth().toString().padStart(2, '0');
    let year = date.getFullYear().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}