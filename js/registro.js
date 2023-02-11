//Informações do Contrato
const Vote_Contract_Address = "0x26cb54611eBAF17a9E1F133069C0c6549B0EaF30";
const Vote_Contract_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "event_buy",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "event_registration",
		"type": "event"
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "casaVenda",
		"outputs": [],
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
		"inputs": [
			{
				"internalType": "address",
				"name": "usuario",
				"type": "address"
			}
		],
		"name": "propriedades_usuario",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "tiraCasaVenda",
		"outputs": [],
		"stateMutability": "nonpayable",
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "validate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
accounts = provider.listAccounts();
const signer = provider.getSigner(accounts[0]);
const contrato = new ethers.Contract(Vote_Contract_Address, Vote_Contract_ABI, signer);


const registraPropriedade = async() => {
	
	const title = document.querySelector("#title");
	const address = document.querySelector("#address");
	const description = document.querySelector("#description");
	const price = document.querySelector("#price");
	const path = document.querySelector("#path");
	const escritura = document.querySelector("#escritura");
	const contato = document.querySelector("#contato");
    // update button value
    btn_enviar.value = "...";

    // window.alert("Propriedade enviada para Análise");
        /* 5.3 Set vote details in smart contract */

	console.log("Endereco: "  + signer.getAddress() + " Adress: " + address.value + " Preço :" + price.value + " Descricao: " +   description.value + " Title: " + title.value + " Path: " + path.value);
    bool = await contrato.Registration(signer.getAddress(), address.value, price.value,  description.value, title.value, path.value, contato.value, escritura.value )
	if (bool) {
		window.alert("Funcionou")
		btn_enviar.value = "Enviar";
		// update button value
        window.alert("Teste");
        title.value = ""
        address.value = ""
        description.value = ""
        price.value = ""
        path.value = ""
        escritura.value = ""
        contato.value = ""        
		return
	} else {
		window.alert("Ocorreu um Erro")
	}
}

// Variáveis para manipulação dos botões
const btn_enviar = document.querySelector("#enviar");

btn_enviar.addEventListener("click", registraPropriedade);