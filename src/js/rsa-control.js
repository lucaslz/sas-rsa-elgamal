/**
 * Controle do algoritimo RSA
 */
const rsaControl = () => {

    //Setando a mensagem no algoritmo
    let mensagem = document.getElementById("mensagem").value
    if (mensagem == "") { alert("Por favor digite uma mensagem."); return; }
    RSA.mensagem = mensagem

    // Pegando o trabalho da chave
    let campoBitsChave = document.getElementById("quantidade-bits")
    if (campoBitsChave.value < 256) { alert("Por digit um numero maior que 256"); return; }
    if (campoBitsChave.value != 0 && campoBitsChave.value != null) RSA.tamanhoChave = parseInt(campoBitsChave.value)
    else campoBitsChave.value = RSA.tamanhoChave

    //Setar data de encriptacao
    let dataInicial = new Date();
    let tempoEncriptacao = document.getElementById("tempo-encriptacao")
    tempoEncriptacao.value = dataInicial.getHours()+":"+dataInicial.getMinutes()+":"+dataInicial.getSeconds()

    //Setando outras informacoes
    let campoNumeroPrimoQ = document.getElementById("numero-primo-p")
    if (campoNumeroPrimoQ.value > 0) RSA.numeroPrimoQ = campoNumeroPrimoQ.value

    let campoNumeroPrimoP = document.getElementById("numero-primo-q")
    if (campoNumeroPrimoP.value > 0) RSA.numeroPrimoP = campoNumeroPrimoP.value

    //Gerar as chaves do RSA
    let chaves = RSA.gerarChaves()

    let campoNumeroSemiPrimoN = document.getElementById("numero-semi-primo-n")
    campoNumeroSemiPrimoN.value = chaves.n.toString()
    if (campoNumeroPrimoP.value  == 0 || campoNumeroPrimoP.value == null) campoNumeroPrimoP.value = RSA.numeroPrimoP
    if (campoNumeroPrimoQ.value  == 0 || campoNumeroPrimoQ.value == null) campoNumeroPrimoQ.value = RSA.numeroPrimoQ

    //Setando a chave publica
    let chavePublica = "------------------------- CHAVE PUBLICA -------------------------\n"
    let chavePublicaBase64 = chaves.e.toString()
    chavePublicaBase64 += chaves.n.toString()
    chavePublica += btoa(chavePublicaBase64)
    chavePublica += "\n---------------------------------------------------------------"
    let campoChavePublica = document.getElementById("chave-publica")
    campoChavePublica.value = chavePublica

    //Setando a chave privada
    let chavePrivada = "------------------------- CHAVE PRIVADA -------------------------\n"
    let chavePrivadaBase64 = chaves.d.toString()
    chavePrivada += btoa(chavePrivadaBase64)
    chavePrivada += "\n---------------------------------------------------------------"
    let campoChavePrivada = document.getElementById("chave-privada")
    campoChavePrivada.value = chavePrivada

    //Setar Mensagem Encriptada
    mensagemEncriptada = RSA.codificaEncripta(chaves.e, chaves.n)
    let campoMensagemEncriptada = document.getElementById("mensagem-codificada")
    campoMensagemEncriptada.value = btoa(mensagemEncriptada)

    //Setar Mensagem Decriptada
    mensagemDecriptada = RSA.decriptaDecodifica(mensagemEncriptada, chaves.d, chaves.n)
    let campoMensagemDecriptada = document.getElementById("mensagem-decodificada")
    campoMensagemDecriptada.value = mensagemDecriptada

    //Setar data de decriptacao
    let dataFinal = new Date();
    let tempoDecriptacao = document.getElementById("tempo-decriptacao")
    tempoDecriptacao.value = dataFinal.getHours()+":"+dataFinal.getMinutes()+":"+dataFinal.getSeconds()
}