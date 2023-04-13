//"let" é uma palavra-chave do JavaScript usada para declarar uma variável local. 
//Ao contrário da palavra-chave "var", a palavra-chave "let" é usada para declarar uma variável local 
//que só pode ser acessada dentro do bloco em que foi declarada.


//querySelector é um método em JavaScript que permite selecionar um elemento HTML da página 
//usando uma sintaxe semelhante a um seletor CSS.

let titulo = document.querySelector('h1')
let instrucoes = document.querySelector('#instrucoes')
let aviso = document.querySelector('#aviso')
let respostaEsta = document.querySelector('#respostaEsta')
let pontos = 0 // pontos para o placar
let placar = 0 // placar

// PERGUNTA
let numQuestao = document.querySelector('#numQuestao')
let pergunta   = document.querySelector('#pergunta')

// ALTERNATIVAS
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')

// article com a class questoes
let articleQuestoes = document.querySelector('.questoes')
// ol li com as alternativas
let alternativas = document.querySelector('#alternativas')

//const é a variável que não muda, constante, sendo mais facil para chamar depois
const q0 = {
    numQuestao   : 0,
    pergunta     : "Pergunta",
    alternativaA : "Alternativa A",
    alternativaB : "Alternativa B",
    alternativaC : "Alternativa C",
    correta      : "0",
}

const q1 = {
    numQuestao   : 1,
    pergunta     : "QUAL É A NEGA MASTER DA SALA?",
    alternativaA : "MILIM BATMAN",
    alternativaB : "ENZO",
    alternativaC : "GUSTA COCA",
    correta      : "MILIM BATMAN",
}

const q2 = {
    numQuestao   : 2,
    pergunta     : "QUEM É O MAIS PEITUDO DA SALA?",
    alternativaA : "NICOLAS BROCHA",
    alternativaB : "MAFI SOLUÇO",
    alternativaC : "ENZO",
    correta      : "ENZO",
}

const q3 = {
    numQuestao   : 3,
    pergunta     : "QUEM É A FLORZINHA DA SALA?",
    alternativaA : "MIGUEL",
    alternativaB : "HENRI MAID",
    alternativaC : "WELLINGTON",
    correta      : "HENRI MAID",
}

// CONSTANTE COM UM ARRAY DE OBJETOS COM TODAS AS QUESTOES
//Um array é uma estrutura de dados que permite armazenar uma coleção de valores em uma única variável.
const questoes = [q0, q1, q2, q3]

let numero = document.querySelector('#numero')
let total  = document.querySelector('#total')
numero.textContent = q1.numQuestao

let totalDeQuestoes = (questoes.length)-1
console.log("Total de questões " + totalDeQuestoes)
total.textContent = totalDeQuestoes

// MONTAR A 1a QUESTAO COMPLETA, para iniciar o Quiz
numQuestao.textContent = q1.numQuestao
pergunta.textContent   = q1.pergunta
a.textContent = q1.alternativaA
b.textContent = q1.alternativaB
c.textContent = q1.alternativaC

// CONFIGURAR O VALUE INICIAL DA 1a QUESTAO COMPLETA
//setAttribute() Adiciona um novo atributo ou modifica o valor de um atributo existente 
//num elemento específico
//o valor do atributo "value" é enviado juntamente com o nome do elemento ao enviar o formulário
//permitindo que o servidor processe a resposta do usuário.

a.setAttribute('value', '1A')
b.setAttribute('value', '1B')
c.setAttribute('value', '1C')

// PARA MONTAR DINAMICAMENTE AS PROXIMAS QUESTOES
function proximaQuestao(nQuestao) {
    numero.textContent = nQuestao
    numQuestao.textContent = questoes[nQuestao].numQuestao
    pergunta.textContent   = questoes[nQuestao].pergunta
    a.textContent = questoes[nQuestao].alternativaA
    b.textContent = questoes[nQuestao].alternativaB
    c.textContent = questoes[nQuestao].alternativaC
    a.setAttribute('value', nQuestao+'A')
    b.setAttribute('value', nQuestao+'B')
    c.setAttribute('value', nQuestao+'C')
}
//essa função serve para bloquear as outras alternativas quando uma já está selecionada
//classList cria uma class "bloqueado" em CSS
function bloquearAlternativas() {
    a.classList.add('bloqueado')
    b.classList.add('bloqueado')
    c.classList.add('bloqueado')
}

function desbloquearAlternativas() {
    a.classList.remove('bloqueado')
    b.classList.remove('bloqueado')
    c.classList.remove('bloqueado')
}

function verificarSeAcertou(nQuestao, resposta) {

    let numeroDaQuestao = nQuestao.value
    console.log("Questão " + numeroDaQuestao)

    let respostaEscolhida = resposta.textContent
    console.log("RespU " + respostaEscolhida)

    let certa = questoes[numeroDaQuestao].correta
    console.log("RespC " + certa)

    if(respostaEscolhida == certa) {
        alert("Correta 😊")
        pontos += 10 // pontos = pontos + 10
    } else {
        alert("Errada 😢")
    }

    // atualizar placar
    placar = pontos
    instrucoes.textContent = "Pontos " + placar

      // bloquear a escolha de opcoes
    bloquearAlternativas()
        //setTimeout faz uma verificação para ver se está no final
    setTimeout(function() {
        //informa o numero da questão
        proxima = numeroDaQuestao+1

        if(proxima > totalDeQuestoes) {
            console.log('Fim do Jogo!')
            fimDoJogo()
        } else {
            proximaQuestao(proxima)
        }
    }, 250) //tempo de validação
    desbloquearAlternativas()
}

function fimDoJogo() {
    instrucoes.textContent = "Fim de Jogo!"
    numQuestao.textContent = ""

    let pont = '' //vazia para escrever os pontos na próxima linha
    pontos == 0 ? pont = 'ponto' : pont = 'pontos'

    pergunta.textContent   = "Você conseguiu " + pontos + " " + pont

    a.textContent = ""
    b.textContent = ""
    c.textContent = ""

    a.setAttribute('value', '0')
    b.setAttribute('value', '0')
    c.setAttribute('value', '0')

    // OCULTAR O ARTICLE DA QUESTAO 
    articleQuestoes.style.display = 'none'

    setTimeout(function() {
        pontos = 0 // zerar placar
        location.reload();
    }, 2000)
}