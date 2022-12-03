---
to: <%=path%>/<%=name%>.sol
---
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "../interfaces/iGenericHandler.sol";
import "./iRouterCrossTalk.sol";

/// @title <%=name%> contract
/// @author Router Protocol
abstract contract <%=name%> is Context , iRouterCrossTalk, ERC165 {

    iGenericHandler private handler;

    address private linkSetter;

    address private feeToken;

    mapping ( uint8 => address ) private Chain2Addr; // CHain ID to Address

    modifier isHandler(){
        require(_msgSender() == address(handler) , "RouterCrossTalk : Only GenericHandler can call this function" );
        _;
    }

    modifier isLinkSet(uint8 _chainID){
        require(Chain2Addr[_chainID] == address(0) , "RouterCrossTalk : Cross Chain Contract to Chain ID set" );
        _;
    }

    modifier isLinkUnSet(uint8 _chainID){
        require(Chain2Addr[_chainID] != address(0) , "RouterCrossTalk : Cross Chain Contract to Chain ID is not set" );
        _;
    }

    modifier isLinkSync( uint8 _srcChainID, address _srcAddress ){
        require(Chain2Addr[_srcChainID] == _srcAddress , "RouterCrossTalk : Source Address Not linked" );
        _;
    }

    modifier isSelf(){
        require(_msgSender() == address(this) , "RouterCrossTalk : Can only be called by Current Contract" );
        _;
    }

    constructor( ) {
        handler = iGenericHandler(0x<%=handler%>);
    }

    /// @notice Used to set linker address, this function is internal and can only be set by contract owner or admins
    /// @param _addr Address of linker.
    function setLink( address _addr ) internal {
        linkSetter = _addr;
    }

    /// @notice Used to set fee Token address, this function is internal and can only be set by contract owner or admins
    /// @param _addr Address of linker.
    function setFeeToken( address _addr ) internal {
        feeToken = _addr;
    }

    function fetchHandler( ) external override view returns ( address ) {
        return address(handler);
    }

    function fetchLinkSetter( ) external override view returns( address) {
        return linkSetter;
    }

    function fetchLink( uint8 _chainID ) external override view returns( address) {
        return Chain2Addr[_chainID];
    }

    function fetchFeetToken(  ) external override view returns( address) {
        return feeToken;
    }


    /// @notice routerSend This is internal function to generate a cross chain communication request.
    /// @param destChainId Destination ChainID.
    /// @param _selector Selector to interface on destination side.
    /// @param _data Data to be sent on Destination side.
    /// @param _gas Gas provided for cross chain send.
    function routerSend( uint8 destChainId , bytes4 _selector , bytes memory _data , uint256 _gas) internal isLinkUnSet( destChainId ) returns (bool success) {
        uint8 cid = handler.fetch_chainID();
        bytes32 hash = _hash(address(this),Chain2Addr[destChainId],destChainId, _selector, _data);
        handler.genericDeposit(destChainId , _selector , _data, hash , _gas , feeToken );
        emit CrossTalkSend( cid , destChainId , address(this), Chain2Addr[destChainId] ,_selector, _data , hash );
        return true;
    }

    function routerSync(uint8 srcChainID , address srcAddress , bytes4 _selector , bytes memory _data , bytes32 hash ) external override isLinkSync( srcChainID , srcAddress ) isHandler returns ( bool , bytes memory ) {
        uint8 cid = handler.fetch_chainID();
        bytes32 Dhash = _hash(Chain2Addr[srcChainID],address(this),cid, _selector, _data);
        require( Dhash == hash , "RouterSync : Valid Hash" );
        ( bool success , bytes memory _returnData ) = _routerSyncHandler( _selector , _data );
        emit CrossTalkReceive( srcChainID , cid , srcAddress , address(this), _selector, _data , hash );
        return ( success , _returnData );
    }

    /// @notice _hash This is internal function to generate the hash of all data sent or received by the contract.
    /// @param _srcAddress Source Address.
    /// @param _destAddress Destination Address.
    /// @param _destChainId Destination ChainID.
    /// @param _selector Selector to interface on destination side.
    /// @param _data Data to interface on Destination side.
    function _hash(address _srcAddress , address _destAddress , uint8 _destChainId , bytes4 _selector , bytes memory _data) internal pure returns (bytes32) {
        return keccak256(abi.encode(
            _srcAddress,
            _destAddress,
            _destChainId,
            _selector,
            keccak256(_data)
        ));
    }

    function Link(uint8 _chainID , address _linkedContract) external override isHandler isLinkSet(_chainID) {
        Chain2Addr[_chainID] = _linkedContract;
        emit Linkevent( _chainID , _linkedContract );
    }

    function Unlink(uint8 _chainID ) external override isHandler {
        emit Unlinkevent( _chainID , Chain2Addr[_chainID] );
        Chain2Addr[_chainID] = address(0);
    }

    function approveFees(address _feeToken , uint256 _value) external {
        IERC20 token = IERC20(_feeToken);
        token.approve( address(handler) , _value );
    }

    /// @notice _routerSyncHandler This is internal function to control the handling of various selectors and its corresponding .
    /// @param _selector Selector to interface.
    /// @param _data Data to be handled.
    function _routerSyncHandler( bytes4 _selector , bytes memory _data ) internal virtual returns ( bool ,bytes memory );
    uint256[100] private __gap;

}
