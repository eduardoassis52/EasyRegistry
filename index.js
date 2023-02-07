const container = document.getElementById("area-propriedades");

class propriedade{
   
    constructor(title, endereco, descricao, preco , pathImagem, data){
        this.title = title;
        this.endereco = endereco;
        this.descricao = descricao;
        this.preco =preco ;
        this.pathImagem = pathImagem;
        this.data = data;
    }    
}


const propriedades = Array.of(new propriedade("Casa teste", "Rua eurico", "teste", 100, "imagens/imagem1.jpg", "TESTE"), new propriedade("Casa teste 2", "Rua eurico", "teste", 100, "imagens/imagem1.jpg", "TESTE"));

propriedades.forEach(prop => {
    container.innerHTML += `
    <div class="postagem">
        <h2>${prop.title}</h2>
        <span class="data-postagem">postado ${prop.data}</span>
        <img width="620px" src="${prop.pathImagem}">
        <h4>Descrição:</h4>
        <p>
            ${prop.descricao}
        </p>
        <h4>Preço:</h4>
        <p>
         ${prop.preco}
        </p>
        <button class="botoes">Vender casa</button>
        <button class="botoes">Não desejo mais vender</button>
        </div>
`;

});