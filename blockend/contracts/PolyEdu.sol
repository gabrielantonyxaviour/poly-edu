// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./valist/License.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@routerprotocol/router-crosstalk/contracts/RouterCrossTalk.sol";

error PolyEdu__Unauthorized();
error PolyEdu__MaxNoOfCourses();
error PolyEdu__CourseDoesNotExist(uint256);
error PolyEdu__CourseNotCompleted(uint256);
error PolyEdu__NotEnoughMoney(uint256, uint256);
error PolyEdu_CertificateAlreadyClaimed(uint, address);

/**@title PolyEdu
 * @author Gabriel Antony Xaviour
 * @notice This contract contains all the courses and soul-bound certificates awarded by our The PolyEdu Education
 * @dev This contract is bootstrapped with Openzeppelin and Chainlink
 */
contract PolyEdu is ERC1155, ERC1155URIStorage, Ownable, RouterCrossTalk {
    // structure
    struct Course {
        uint projectId;
        uint createdTimeStamp;
        string course_meta;
        string certificate_meta;
        uint[10] ans;
        address[] creators;
    }

    // Constants
    uint8 public constant POLYGON_CHAIN_ID = 1;

    // state variables
    mapping(uint256 => Course) public courses;
    mapping(address => mapping(uint => bool)) public isCompleted;
    uint256 private _crossChainGasLimit;
    Registry private _valist_registry;
    License private _valist_license;

    /**
        Certificate metadata structure
        {
            project_id: "PROJECT_ID",
            course_name: "NAME_OF_THE_COURSE",
            creator: "CREATOR_OF_THE_COURSE",
            created_at: "TIMESTAMP_OF_CREATION",
            certificate_hash: "IPFS_HASH_OF_THE_CERTIFICATE",
        }
    */

    // Events
    event CreateCourse(
        uint256 indexed projectId,
        uint[10] ans,
        address creator,
        string course_meta,
        string certificate_meta,
        uint timestamp
    );
    event CertificateIssued(
        uint indexed projectId,
        address student,
        uint timestamp,
        string certificate_meta
    );

    // Constructor - runs at deploy
    constructor(
        address valist_registry,
        address valist_license,
        address genericHandler_
    ) ERC1155("0x") RouterCrossTalk(genericHandler_) {
        _valist_registry = Registry(valist_registry);
        _valist_license = License(valist_license);
        _crossChainGasLimit = 2500000;
    }

    function completeCourse(address student, uint courseId) internal {
        isCompleted[student][courseId] = true;
    }

    /**
     * @notice This function creates a new course in PolyEdu :)
     * @dev This function adds a new latest course in the array which is listened by GraphQL and rendered in the frontend
     */
    function createCourse(
        uint projectId,
        uint[10] calldata ans,
        string calldata course_meta,
        string calldata certificate_meta
    ) external {
        require(
            _valist_registry.isAccountMember(
                _valist_registry.getProjectAccountID(projectId),
                msg.sender
            ),
            "PolyEdu - Not your project!"
        );
        require(courses[projectId].projectId == 0, "PolyEdu - Course Already Created");
        courses[projectId].projectId = projectId;
        courses[projectId].creators = _valist_registry.getProjectMembers(projectId);
        courses[projectId].createdTimeStamp = block.timestamp;
        courses[projectId].course_meta = course_meta;
        courses[projectId].certificate_meta = certificate_meta;
        courses[projectId].ans = ans;
        _setURI(projectId, certificate_meta);
        emit CreateCourse(
            projectId,
            ans,
            msg.sender,
            course_meta,
            certificate_meta,
            block.timestamp
        );
    }

    function validateQuiz(uint projectId, uint[10] calldata attempts) public returns (bool) {
        require(
            _valist_license.balanceOf(msg.sender, projectId) > 0 ||
                _valist_license.getPrice(projectId) == 0,
            "PolyEdu - You don't own the course!"
        );
        int score = 0;
        for (uint i = 0; i < 9; i++) {
            if (attempts[i] == courses[projectId].ans[i]) {
                score += 1;
            }
        }
        if (score >= 8) {
            completeCourse(msg.sender, projectId);
            return true;
        } else {
            return false;
        }
    }

    /**
     * @notice This function mints the certificate to the student after completing the quiz
     * @dev This function can be called only by the owner ( for security purposes ) whose private key is embedded in the frontend
     */
    function safeMint(uint projectId) public {
        if (isCompleted[msg.sender][projectId] == false) {
            revert PolyEdu__CourseNotCompleted(projectId);
        }
        if (balanceOf(msg.sender, projectId) > 0) {
            revert PolyEdu_CertificateAlreadyClaimed(projectId, msg.sender);
        }
        _mint(msg.sender, projectId, 1, "0x");
        emit CertificateIssued(
            projectId,
            msg.sender,
            block.timestamp,
            courses[projectId].certificate_meta
        );
    }

    // Router functions

    /**
     * @notice setLinker Used to set address of linker, this can only be set by Admin
     * @param _linker Address of the linker
     */
    function setLinker(address _linker) external onlyOwner {
        setLink(_linker);
    }

    /**
     * @notice _approveFees To approve handler to deduct fees from source contract, this can only be set by Admin
     * @param _feeToken Address of the feeToken
     * @param _amount Amount to be approved
     */
    function _approveFees(address _feeToken, uint256 _amount) external onlyOwner {
        approveFees(_feeToken, _amount);
    }

    /**
     * @notice setFeesToken To set the fee token in which fee is desired to be charged, this can only be set by Admin
     * @param _feeToken Address of the feeToken
     */
    function setFeesToken(address _feeToken) external onlyOwner {
        setFeeToken(_feeToken);
    }

    /**
     * @notice setCrossChainGasLimit Used to set CrossChainGasLimit, this can only be set by Admin
     * @param _gasLimit Amount of gasLimit that is to be set
     */
    function setCrossChainGasLimit(uint256 _gasLimit) external onlyOwner {
        _crossChainGasLimit = _gasLimit;
    }

    /**
     * @notice fetchCrossChainGasLimit Used to fetch CrossChainGasLimit
     * @return crossChainGasLimit that is set
     */
    function fetchCrossChainGasLimit() external view returns (uint256) {
        return _crossChainGasLimit;
    }

    function _sendCrossChain(
        address _recipient,
        uint256 _id,
        bytes memory _data
    ) internal returns (bool, bytes32) {
        bytes4 _selector = bytes4(keccak256("receiveCrossChain(address,uint256,uint256,bytes)"));
        bytes memory data = abi.encode(_recipient, _id, 1, _data);
        (bool success, bytes32 hash) = routerSend(
            POLYGON_CHAIN_ID,
            _selector,
            data,
            _crossChainGasLimit,
            28000000000
        );

        return (success, hash);
    }

    function receiveCrossChain(
        address _recipient,
        uint256 _id,
        bytes memory _data
    ) external isSelf returns (bool) {
        _mint(_recipient, _id, 1, _data);
        return true;
    }

    // Overrides
    function uri(
        uint256 tokenId
    ) public view override(ERC1155URIStorage, ERC1155) returns (string memory) {
        return courses[tokenId].certificate_meta;
    }

    function setApprovalForAll(address operator, bool approved) public override {}

    function isApprovedForAll(
        address owner,
        address operator
    ) public view override returns (bool) {}

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override {}

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) public override {}

    function _routerSyncHandler(
        bytes4 _selector,
        bytes memory _data
    ) internal override returns (bool, bytes memory) {
        (
            address _recipient,
            uint256[] memory _ids,
            uint256[] memory _amounts,
            bytes memory data
        ) = abi.decode(_data, (address, uint256[], uint256[], bytes));
        (bool success, bytes memory returnData) = address(this).call(
            abi.encodeWithSelector(_selector, _recipient, _ids, _amounts, data)
        );
        return (success, returnData);
    }
}
