// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract LandRegistry {
    
    address payable id;
    string laddress;
    uint256 lamount;
    uint256 key;
    bool isAvailable;
    string title;
    string description;
    string image;
    string contato;
    string escritura;

    constructor(address payable _id, string memory _laddress, uint256 _lamount, uint256 _key,
      bool _isAvailable, string memory _description, string memory _title,
      string memory _image, string memory _contato,  string memory _escritura){
        id = _id;
        laddress = _laddress;
        lamount = _lamount;
        key = _key;
        isAvailable = _isAvailable;
        description = _description;
        title = _title;
        image = _image;
        contato = _contato;
        escritura = _escritura;
    }

    function get() view public returns(address payable, string memory, uint256, uint256, bool, string memory, string memory, string memory, string memory, string memory){
        return (id, laddress, lamount, key, isAvailable, description, title, image, contato, escritura);
    }

    function get_isAvailable() view public returns(bool){
        return isAvailable;
    }

    function set_isAvailable(bool _isAvailable) public{
        isAvailable = _isAvailable;
    }

    function get_lamount() view public returns(uint256){
        return lamount;
    }

    function get_id() view public returns(address payable){
        return id;
    }

    function set_id(address payable _id) public{
        id = _id;
    }

    function approved() public{
        isAvailable = true;
    }

    function bought() public{
        isAvailable = false;
    }
}

contract LandRegistryFactory {
    //Events

    event event_registration();//
    event event_buy();//

    //Atributos
    LandRegistry[] lands;
    address admin;
    mapping(address => my_properties)  user_properties ;
    struct my_properties {
        uint[] assetList;
    }

    //Modifiers
    modifier landowner(uint256 _id) {
        require(msg.sender != lands[_id].get_id(),"Nao pode comprar sua propria propriedade");
        _;
    }

    // modifier landadmin() {
    //     require(msg.sender != admin, "Voce nao faz parte do governo");
    //     _;
    // }


    constructor(){
        admin = msg.sender;//
    }
    
    //Functions

    function Registration(
        address payable _id,
        string memory _laddress,
        uint256 _lamount,
        string memory _description,
        string memory _title,
        string memory _image,
        string memory _contato,
        string memory _escritura
    ) public returns (bool) {
        LandRegistry terra = new LandRegistry(
            _id,
            _laddress,
            _lamount,
            lands.length,
            true,
            _description,
            _title,
            _image,
            _contato,
            _escritura
        );
        lands.push(terra);//Adiciona a terra as propriedades do contrato
        user_properties[msg.sender].assetList.push(lands.length);//Adiciona a terra as terras em posse do usuário
        emit event_registration();//Envia evonto de registro 
        return true;
    }

    function propriedades_usuario(address usuario) view public returns (uint[]  memory) {
        return user_properties[usuario].assetList;
    }

    function buyProperty(uint256 _id) public payable landowner(_id){
        require((lands[_id].get_isAvailable()));
        require(msg.value == (lands[_id].get_lamount() * 1000000000000000000));//
        lands[_id].get_id().transfer(
            lands[_id].get_lamount() * 1000000000000000000
        );//
        lands[_id].set_id(payable(msg.sender));
        lands[_id].set_isAvailable(false);
        user_properties[msg.sender].assetList.push(_id);
        emit event_buy();
    }
    
    function todasPropriedades() view public returns(LandRegistry[] memory){
        return lands;
    }
        
    function landInfo(uint256 id)
        public
        view
        returns (
            address payable _owner,
            string memory _laddress,
            uint256 _lamount,
            uint256 _key,
            bool _isAvaliable,
            string memory _decription,      
            string memory title,
            string memory image,
            string memory contato,
            string memory escritura

        )
    {
        return (
            lands[id].get()
        );
    }



    function casaVenda(uint256 _id) public{
        lands[_id].set_isAvailable(true);
    }

    function tiraCasaVenda(uint256 _id) public{
        lands[_id].set_isAvailable(false);
    }

    // function validate(uint index, bool status) landadmin() public {
    //     if (status) {
    //         lands[index].approved();
    //     }
    // }
}