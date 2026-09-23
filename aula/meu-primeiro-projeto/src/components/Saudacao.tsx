type SaudacaoProps = {
    nome: string;
};

function Saudacao({nome}:SaudacaoProps){
    return <h2>Olá, {nome}</h2>;
}

export default Saudacao;