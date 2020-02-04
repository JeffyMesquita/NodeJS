interface Pessoa {
   nome: string;
}

function Ola(pessoa: Pessoa) {
   return "Olá, " + pessoa.nome;
}

Ola({nome: "TreinaWeb"});