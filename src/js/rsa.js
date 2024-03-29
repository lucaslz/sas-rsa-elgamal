/**
 * Algoritimo RSA
 *
 * JavaScript Object Literal
 */
const RSA = {

    tamanhoChave: 256,
    numeroPrimoP: 0,
    numeroPrimoQ: 0,
    mensagem: "",

    primoAleatorio: function() {
        let bits = this.tamanhoChave / 2
        const minimo = bigInt(bits, 100).shiftLeft(bits - 1)
        const maximo = bigInt(bits, 100).shiftLeft(bits).prev()
        // console.log(minimoOne, maximoOne)
        // const minimo = bigInt.one.shiftLeft(bits - 1)
        // const maximo = bigInt.one.shiftLeft(bits).prev()

        while (true) {
            let p = bigInt.randBetween(minimo, maximo)
            if (p.isProbablePrime(256)) return p
        }
    },

    gerarChaves: function() {
        // if (this.numeroPrimoP < 1 || this.numeroPrimoQ < 1) {
        //     this.numeroPrimoP = this.primoAleatorio()
        //     this.numeroPrimoQ = this.primoAleatorio()
        // }else {
        //     this.numeroPrimoP = bigInt(this.numeroPrimoP)
        //     this.numeroPrimoQ = bigInt(this.numeroPrimoQ)
        // }

        // let m = bigInt((this.numeroPrimoP.subtract(bigInt.one)).multiply(this.numeroPrimoQ.subtract(bigInt.one)))
        // let e = new bigInt("3")
        // while (bigInt.gcd(m, e).toString() > 1) e = e.add(bigInt("2"))

        const e = bigInt(65537)
        let totient = 0;
        if (this.numeroPrimoP < 1 || this.numeroPrimoQ < 1) {
            do {
                this.numeroPrimoP = this.primoAleatorio()
                this.numeroPrimoQ = this.primoAleatorio()
                totient = bigInt.lcm(this.numeroPrimoP.prev(), this.numeroPrimoQ.prev())
            } while (
                bigInt.gcd(e, totient).notEquals(1) ||
                this.numeroPrimoP.minus(this.numeroPrimoQ).abs().shiftRight((this.tamanhoChave / 2) - 100).isZero()
            )
        } else {
            this.numeroPrimoP = bigInt(this.numeroPrimoP)
            this.numeroPrimoQ = bigInt(this.numeroPrimoQ)
            totient = bigInt.lcm(this.numeroPrimoP.prev(), this.numeroPrimoQ.prev())
        }

        return {
            e,
            n: this.numeroPrimoP.multiply(this.numeroPrimoQ),
            d: e.modInv(totient)
        }
    },

    codificar: function() {
        let codigo = "";

        if (this.mensagem.length > 0) {
            codigo = this.mensagem.split('').map(i => i.charCodeAt()).join('')
        } else {
            console.error("Por favor digite uma mensagem para encriptar.")
        }
        return bigInt(codigo)
    },

    encriptar: function(mensagemCodificada, e, n) {
        return bigInt(mensagemCodificada).modPow(e, n)
    },

    decriptar: function(mensagemEncriptada, d, n) {
        return bigInt(mensagemEncriptada).modPow(d, n)
    },

    decodificar: function(mensagemDecriptada) {
        const stringCode = mensagemDecriptada.toString();
        let mensagem = '';

        for (let i = 0; i < stringCode.length; i += 2) {
          let numero = Number(stringCode.substr(i, 2));

            if (numero <= 30) {
                mensagem += String.fromCharCode(Number(stringCode.substr(i, 3)));
                i++;
            } else {
                mensagem += String.fromCharCode(numero);
            }
        }
        return mensagem;
    },

    codificaEncripta: function(e, n) {
        let mensagemCodificada = this.codificar()
        let mensagemEncriptada = this.encriptar(mensagemCodificada, e, n)
        return mensagemEncriptada
    },

    decriptaDecodifica: function (mensagemEncriptada, d, n) {
        let mensagemDecriptada = RSA.decriptar(mensagemEncriptada, d, n)
        let mensagemDecodificada = RSA.decodificar(mensagemDecriptada)
        return mensagemDecodificada
    }
}
