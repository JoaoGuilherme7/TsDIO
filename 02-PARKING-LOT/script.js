"use strict";
const $ = (query) => document.querySelector(query);
const newElement = (tag) => document.createElement(tag);
const addGlobalEventListener = (event, selector, callback) => {
    document.addEventListener(event, (e) => {
        const target = e.target;
        if (target === null || target === void 0 ? void 0 : target.matches(selector)) {
            callback(e);
        }
    });
};
(function main() {
    var _a;
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", cadastrarVeiculo);
    addGlobalEventListener('click', '.deleteCarBtn', patio().remover);
    patio().render();
})();
function cadastrarVeiculo() {
    var _a, _b;
    const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value.trim();
    const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value.trim();
    if (!nome || !placa) {
        alert('Os campos estão vazios');
        return;
    }
    const veiculo = { nome: nome, placa: placa, entrada: new Date().toISOString() };
    patio().adicionar(veiculo, true);
    $('#nome').value = '';
    $('#placa').value = '';
    $('#nome').focus();
}
function patio() {
    function ler() {
        let veiculos = localStorage.patio ? JSON.parse(localStorage.patio) : [];
        return veiculos;
    }
    function salvar(veiculos) {
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }
    function adicionar(veiculo, salva) {
        const row = newElement('tr');
        const nome = newElement('td');
        nome.innerText = veiculo.nome;
        const placa = newElement('td');
        placa.innerText = veiculo.placa;
        const entrada = newElement('td');
        entrada.innerText = formatTime(new Date(veiculo.entrada));
        const acao = newElement('td');
        const btn = newElement('button');
        btn.innerText = 'X';
        btn.classList.add('deleteCarBtn');
        btn.setAttribute('data-placa', veiculo.placa);
        acao.appendChild(btn);
        row.appendChild(nome);
        row.appendChild(placa);
        row.appendChild(entrada);
        row.appendChild(acao);
        $('#patio').appendChild(row);
        if (salva)
            salvar([...ler(), veiculo]);
    }
    function remover(e) {
        var _a;
        const target = e.target;
        const placa = target === null || target === void 0 ? void 0 : target.getAttribute('data-placa');
        const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
        const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
        if (!confirm(`O carro ${nome} ficou: ${tempo}\nDeseja confirmar a saída?`))
            return;
        const newArray = ler().filter(veiculo => veiculo.placa !== placa);
        salvar(newArray);
        (_a = target === null || target === void 0 ? void 0 : target.closest('tr')) === null || _a === void 0 ? void 0 : _a.remove();
    }
    function render() {
        $('#patio').innerHTML = "";
        const patio = ler();
        if (patio.length > 0) {
            patio.forEach((veiculo) => { adicionar(veiculo, false); });
        }
    }
    return { ler, adicionar, remover, salvar, render };
}
function calcTempo(mil) {
    const dias = Math.floor(mil / 86400000);
    const horas = Math.floor((mil % 86400000) / 3600000);
    const min = Math.floor((mil % 3600000) / 60000);
    const sec = Math.floor((mil % 60000) / 1000);
    return `${dias} dias e ${horas}h : ${min}min : ${sec}s`;
}
function formatTime(date) {
    let day = date.getDay().toString().padStart(2, '0');
    let month = date.getMonth().toString().padStart(2, '0');
    let year = date.getFullYear().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
