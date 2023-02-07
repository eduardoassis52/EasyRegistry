const container = document.getElementById("area-propriedades");

class propriedade{   
    constructor(title, endereco, descricao, preco , pathImagem, data, disponivelVenda){
        this.title = title;
        this.endereco = endereco;
        this.descricao = descricao;
        this.preco =preco ;
        this.pathImagem = pathImagem;
        this.data = data;
        this.disponivelVenda = disponivelVenda;
    }    
}


const propriedades = Array.of(new propriedade("Casa teste", "Rua eurico", "teste", 100, "imagens/imagem1.jpg", "TESTE1", true), new propriedade("Casa teste 2", "Rua eurico", "teste", 100, "imagens/imagem1.jpg", "TESTE2", false));

propriedades.forEach(prop => {
    container.innerHTML += `
    <div class="propriedade">
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
        
        <button class="botoes">${prop.disponivelVenda ?  "Não desejo mais vender" : "Vender casa"}</button>
        </div>
`;

});

const pro_recentes = document.getElementById("recentes");

propriedades.slice(0, 2).forEach(prop => {
    pro_recentes.innerHTML += ` 
        
    <div class="propriedades-lateral">
        <p>${prop.title}.</p>
        <a href="">Leia mais</a>
    </div>
    
`;
});