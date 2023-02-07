// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract LandRegistry {
    
    address payable id;
    string laddress;
    uint256 lamount;
    uint256 key;
    bool isGovtApproved;
    bool isAvailable;
    string title;
    string description;
    string image;
    string contato;

    constructor(address payable _id, string memory _laddress, uint256 _lamount, uint256 _key, bool _isGovtApproved, bool _isAvailable, string memory _description, string memory _title, string memory _image, string memory _contato){
        id = _id;
        laddress = _laddress;
        lamount = _lamount;
        key = _key;
        isGovtApproved = _isGovtApproved;
        isAvailable = _isAvailable;
        description = _description;
        title = _title;
        image = _image;
        contato = _contato;
    }

    function get() view public returns(address payable, string memory, uint256, uint256, bool, bool, string memory){
        return (id, laddress, lamount, key, isGovtApproved, isAvailable, description);
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
        isGovtApproved = true;
        isAvailable = true;
    }

    function bought() public{
        isAvailable = false;
    }
}

contract LandRegistryFactory {
    LandRegistry[] lands;

    event event_registration();
    event event_buy();

    address admin;
    constructor(){
        admin = msg.sender;
    }

    function Registration(
        address payable _id,
        string memory _laddress,
        uint256 _lamount,
        string memory _description,
        string memory _title,
        string memory _image,
        string memory _contato
    ) public returns (bool) {
        LandRegistry terra = new LandRegistry(
            _id,
            _laddress,
            _lamount,
            lands.length,
            false,
            false,
            _description,
            _title,
            _image,
            _contato
        );
        lands.push(terra);
        emit event_registration();
        return true;
    }

    struct my_properties {
        LandRegistry[] assetList;
    }

    modifier landowner(uint256 _id) {
        require(msg.sender != lands[_id].get_id(),"Nao pode comprar seu proprio produto");
        _;
    }

    modifier landadmin() {
        require(msg.sender != admin, "Voce nao faz parte do governo");
        _;
    }

    mapping(address => my_properties) user_properties;

    function validate(uint index, bool status) landadmin() public {
        if (status) {
            lands[index].approved();
        }
    }

    function landInfo(uint256 id)
        public
        view
        returns (
            address payable,
            string memory,
            uint256,
            uint256,
            bool,
            bool,
            string memory
        )
    {
        return (
            lands[id].get()
        );
    }

    function buyProperty(uint256 _id) public payable landowner(_id){
        require((lands[_id].get_isAvailable()));
        require(msg.value == (lands[_id].get_lamount() * 1000000000000000000));
        lands[_id].get_id().transfer(
            lands[_id].get_lamount() * 1000000000000000000
        );
        lands[_id].set_id(payable(msg.sender));
        lands[_id].set_isAvailable(false);
        user_properties[msg.sender].assetList.push(lands[_id]);
        emit event_buy();
    }
}