/**
 * Algoritimo RSA
 * 
 * JavaScript Object Literal
 */
const RSA = {

    numeroPrimoP: 0,
    numeroPrimoQ: 0,
    numeroSemiPrimoN: 0,
    limiteNumero: 65536,
    numeroPhi: 0,
    coPrimoDePhiE: 0,
    numeroD: 0,
    mensagem: "",
    mensagemMultiplicada: 1,
    mensagemCodificada: 0,
    mensagemDecodificada: 0,

    gerarNumeroAleatorio: function() {
        return Math.floor(Math.random() * this.limiteNumero)
    },

    verificaSeNumeroPrimo: function(numero) {
        let resultado = 0

        for (i = 2; i <= numero / 2; i++) {
            if (numero % i == 0) {
                resultado++
                break
            }
        }
        return resultado
    },

    gerarPrimoAleatorioPQ: function() {
        let verificaP = 0
        let verificaQ = 0

        if (this.numeroPrimoP == 0) {
            do {
                this.numeroPrimoP = this.gerarNumeroAleatorio()
                verificaP = this.verificaSeNumeroPrimo(this.numeroPrimoP)
            } while (verificaP != 0)
        }

        if (this.numeroPrimoQ == 0) {
            do {
                this.numeroPrimoQ = this.gerarNumeroAleatorio()
                verificaQ = this.verificaSeNumeroPrimo(this.numeroPrimoQ)
            } while (verificaQ != 0)
        }
    },

    gerarNumeroSemiPrimo: function () {
        this.numeroSemiPrimoN = this.numeroPrimoP * this.numeroPrimoQ
    },

    phi: function () {
        this.numeroPhi = this.numeroSemiPrimoN - 1
    },

    gerarNumeroCoPrimoDePhi: function () { 
        let numeroE = 0

        do {
            numeroE = Math.floor(Math.random() * this.numeroSemiPrimoN)
        } while (!(1 < numeroE < this.numeroSemiPrimoN));

        this.coPrimoDePhiE = numeroE
    },

    gerarNumeroD: function () {
        this.numeroD = (((2 * this.numeroSemiPrimoN) + 1) / this.coPrimoDePhiE)
    },

    getCharCodeFromCharString: function () {
        let tamanho = this.mensagem.length
        
        for (let index = 0; index < tamanho; index++) {
            this.mensagemMultiplicada *= this.mensagem[index].charCodeAt()
        }
    },

    codificarMensagem: function () {
        this.mensagemCodificada = (Math.pow(this.mensagemMultiplicada, this.coPrimoDePhiE) / this.numeroSemiPrimoN)
    },

    decodificarMensagem: function () {
        this.mensagemDecodificada = (Math.pow(this.mensagemCodificada, this.numeroD) / this.numeroSemiPrimoN)
    },

    init: function () {
        this.gerarPrimoAleatorioPQ()
        this.gerarNumeroSemiPrimo()
        this.phi()
        this.gerarNumeroCoPrimoDePhi()
        this.gerarNumeroD()
        this.getCharCodeFromCharString()
        this.codificarMensagem()
        this.decodificarMensagem()
    }
}

RSA.numeroPrimoP = 3
RSA.numeroPrimoQ = 7
RSA.mensagem = "dfasdfasfdasdfasfasfdasdfafdasfdasfsdfasdasdadfsfasdfasdfafasdsd"
RSA.init()
console.log({"Codificada": RSA.mensagemCodificada, "String Multiplicada 1": RSA.mensagemMultiplicada , "String Multiplicada 2": RSA.mensagemDecodificada})

// RSA.numeroPrimoP = 3
// RSA.numeroPrimoQ = 7
// RSA.gerarPrimoAleatorioPQ()
// RSA.gerarNumeroSemiPrimo()
// RSA.phi()
// RSA.gerarNumeroCoPrimoDePhi()
// RSA.gerarNumeroD()

// console.log(
//     "Numero P: " + RSA.numeroPrimoP +
//     "\nNumero Q: " + RSA.numeroPrimoQ +
//     "\nNumero Semi Primo: " + RSA.numeroSemiPrimoN,
//     "\nNumero PHI: " + RSA.numeroPhi +
//     "\nNumero Co primo de E: " + RSA.coPrimoDePhiE +
//     "\nNumero D: " + RSA.numeroD,
//     parseInt("A")
// )