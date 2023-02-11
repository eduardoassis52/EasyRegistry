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

    address owner;

    //Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

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
            owner = msg.sender;
    }

    function get() view onlyOwner() public returns(address payable, string memory, uint256, uint256, bool, string memory, string memory, string memory, string memory, string memory){
        return (id, laddress, lamount, key, isAvailable, description, title, image, contato, escritura);
    }

    function get_isAvailable() view onlyOwner() public returns(bool){
        return isAvailable;
    }

    function set_isAvailable(bool _isAvailable) onlyOwner() public{
        isAvailable = _isAvailable;
    }

    function get_lamount() view onlyOwner() public returns(uint256){
        return lamount;
    }

    function get_id() view onlyOwner() public returns(address payable){
        return id;
    }

    function set_id(address payable _id) onlyOwner() public{
        id = _id;
    }

    function approved() onlyOwner() public{
        isAvailable = true;
    }

    function bought() onlyOwner() public{
        isAvailable = false;
    }
}

contract LandRegistryFactory {
    //Events
    event event_registration(address owner);
    event event_buy(address owner, address buyer);
    event event_changed_status(address owner);

    //Atributos
    LandRegistry[] lands;

    //Modifiers
    modifier landowner(uint256 _id) {
        require(msg.sender != lands[_id].get_id(),"Nao pode comprar sua propria propriedade");
        _;
    }

    constructor(){
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
        emit event_registration(_id);//Envia evonto de registro 
        return true;
    }

    function buyProperty(uint256 _id) public payable landowner(_id){
        require((lands[_id].get_isAvailable()));
        require(msg.value == (lands[_id].get_lamount() * 1000000000000000000));//
        address oldOwner = lands[_id].get_id();
        lands[_id].get_id().transfer(
            lands[_id].get_lamount() * 1000000000000000000
        );
        lands[_id].set_id(payable(msg.sender));
        lands[_id].set_isAvailable(false);

        emit event_buy(oldOwner, msg.sender);
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

    function mudaStatusCasa(uint256 _id) public{
        bool status = lands[_id].get_isAvailable();
        lands[_id].set_isAvailable(!status);
        emit event_changed_status(lands[_id].get_id());
    }
}