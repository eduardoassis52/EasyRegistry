//Informações do Contrato
const Vote_Contract_Address = "0xB747f0B044C10530Be1903821aEb5ed0a3287925";
const Vote_Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "buyProperty",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "event_buy",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "event_changed_status",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "event_registration",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "mudaStatusCasa",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
		"name": "Registration",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "landInfo",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "_owner",
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
				"name": "_isAvaliable",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_decription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contato",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "escritura",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "todasPropriedades",
		"outputs": [
			{
				"internalType": "contract LandRegistry[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
accounts = provider.listAccounts();
const signer = provider.getSigner(accounts[0]);
const contrato = new ethers.Contract(Vote_Contract_Address, Vote_Contract_ABI, signer);

const container = document.getElementById("area-propriedades");
const pro_recentes = document.getElementById("recentes");

let enderecoOwner;

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

const trocaStatusPropriedade = async(event) => {
	

	console.log(event.target.value)
	var botao = "botao"+event.target.value

	document.getElementById(botao).disabled = true;
	document.getElementById(botao).textContent  = "Em análise"
	
    bool = await contrato.mudaStatusCasa(event.target.value)
	if (bool) {
		window.alert("Funcionou")
		  
		return
	} else {
		window.alert("Ocorreu um Erro")
	}
}


const listarPropriedade = async() => {

    properties_list = await contrato.todasPropriedades()
    console.log(properties_list)
    for (i=0; i<properties_list.length; i++){
        prop = await contrato.landInfo(i)

		enderecoOwner = await signer.getAddress();

		if(prop._owner === await signer.getAddress()){
			console.log(prop)
			container.innerHTML += `
				<div class="propriedade">
				<h2>${prop.title}</h2>
				<img width="620px" src="${prop.image}">
				<h4>Descrição:</h4>
				<p>
					${prop._decription}
				</p>
				<h4>Endereço:</h4>
					<p>
						${prop._laddress}
					</p>
				<h4>Preço (Eth):</h4>
				<p>
				${parseInt(prop._lamount._hex, 16)/ (10**18)}
				</p>
				
				<button class="botoes" value="${i}" id="botao${i}" onClick="trocaStatusPropriedade(event)" >${prop._isAvaliable ?  "Não desejo mais vender" : "Vender casa"}</button>
				</div>
			`;	
		}

		if (prop._isAvaliable) {
			pro_recentes.innerHTML += ` 
				
			<div class="propriedades-lateral">
				<p>${prop.title}.</p>
				<a href="venda.html">Leia mais</a>
			</div>
			
			`;
		}

    }





}

listarPropriedade()


contrato.on("event_registration", (owner) => {
	if (owner == enderecoOwner){
		window.alert("Uma nova propriedade foi registrada com sucesso")
		window.location.reload()
	}
})

contrato.on("event_buy",  (owner, buyer) => {
	if (owner ==  enderecoOwner || buyer ==  enderecoOwner){
		window.location.reload()
	}
})

contrato.on("event_changed_status",  (owner, id) => {
	if (owner ==  enderecoOwner){
		window.location.reload()

		var botao = "botao"+id
		document.getElementById(botao).disabled = true;
	}
})