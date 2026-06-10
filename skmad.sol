// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/InternetHeist.sol";

contract SkateBoardMadness is ERC20, Ownable {
    address public adminWallet = 0xb523566E3A36b2fD313E4AeE2c90C0b131Ed8857;

    constructor() ERC20("SkateBoard Madness", "SKMAD") {
        _mint(adminWallet, 1000000 * 10**decimals());
    }

    function rewardUser(address to, uint256 amount) external onlyOwner {
        _transfer(adminWallet, to, amount);
    }

    function collectRevenue() external {
        payable(adminWallet).transfer(address(this).balance);
    }
}