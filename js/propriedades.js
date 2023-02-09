//Informações do Contrato
const Vote_Contract_Address = "0x26cb54611eBAF17a9E1F133069C0c6549B0EaF30";
const Vote_Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_laddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_lamount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_key",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isAvailable",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contato",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_escritura",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "approved",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bought",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_id",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_isAvailable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_lamount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "set_id",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isAvailable",
				"type": "bool"
			}
		],
		"name": "set_isAvailable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
accounts = provider.listAccounts();
const signer = provider.getSigner(accounts[0]);
const contrato = new ethers.Contract(Vote_Contract_Address, Vote_Contract_ABI, signer);

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

const listarPropriedade = async() => {
    properties_list = await contrato.propriedades_usuario(signer.getAddress())
    console.log(properties_list)
    for (i=0; i<properties_list.length; i++){
        prop = await contrato.landInfo(i)
        console.log(prop)
        container.innerHTML += `
            <div class="propriedade">
            <h2>${prop._title}</h2>
            <span class="data-postagem">postado DATA QUALQUER</span>
            <img width="620px" src="${prop._image}">
            <h4>Descrição:</h4>
            <p>
                ${prop._decription}
            </p>
            <h4>Preço:</h4>
            <p>
            ${parseInt(prop._lamount._hex, 16)}
            </p>
            
            <button class="botoes">${prop._isAvaliable ?  "Não desejo mais vender" : "Vender casa"}</button>
            </div>
        `;
    }

}

listarPropriedade()

// const propriedades = Array.of(new propriedade("Casa teste", "Rua eurico", "teste", 100, "imagens/imagem1.jpg", "TESTE1", true), new propriedade("Casa teste 2", "Rua eurico", "teste", 100, "imagens/imagem1.jpg", "TESTE2", false));

// propriedades.forEach(prop => {
//     container.innerHTML += `
//     <div class="propriedade">
//         <h2>${prop.title}</h2>
//         <span class="data-postagem">postado ${prop.data}</span>
//         <img width="620px" src="${prop.pathImagem}">
//         <h4>Descrição:</h4>
//         <p>
//             ${prop.descricao}
//         </p>
//         <h4>Preço:</h4>
//         <p>
//          ${prop.preco}
//         </p>
        
//         <button class="botoes">${prop.disponivelVenda ?  "Não desejo mais vender" : "Vender casa"}</button>
//         </div>
// `;

// });

// const pro_recentes = document.getElementById("recentes");

// propriedades.slice(0, 2).forEach(prop => {
//     pro_recentes.innerHTML += ` 
        
//     <div class="propriedades-lateral">
//         <p>${prop.title}.</p>
//         <a href="">Leia mais</a>
//     </div>
    
// `;
// });