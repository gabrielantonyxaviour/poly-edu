<p align="center">
  <a href="https://swc.rs/">
    <img alt="babel" src="https://raw.githubusercontent.com/router-protocol/router-widget/main/router-logo.png" width="546">
  </a>
</p>

<h1 align="center">
   Router Crosstalk <br/>
</h1>

<h4 align="center">
   Enabling crosschain contracts <br/>
</h4>

<p align="center">
    <img alt="npm Downloads" src="https://badgen.net/badge/license/MIT/blue">
    <img alt="undefined" src="https://badgen.net/npm/v/npm">
    <img alt="undefined" src="https://badgen.net/npm/node/next">
</p>

<p align="center">
    <a href="https://router-crosstalk-coverage-automated.netlify.app" target="_blank">
        <img alt="undefined" src="https://badgen.net/badge/icon/coverage?icon=codecov&label">
    </a>
    <a href="https://router-crosstalk-automated-documentation.netlify.app" target="_blank">
        <img alt="undefined" src="https://badgen.net/badge/icon/docs?icon=codacy&label">
    </a>
</p>

<p align="center">
    <a href="https://github.com/router-protocol/router-crosstalk/actions/workflows/main.yml" _target="_blank">
        <img alt="undefined" src="https://github.com/router-protocol/router-crosstalk/actions/workflows/main.yml/badge.svg">
    </a>
    <img alt="undefined" src="https://badgen.net/npm/dy/@routerprotocol/router-crosstalk">
</p>

# Router Crosstalk Library


Router's CrossTalk library is an extensible cross-chain framework that enables seamless state transitions across multiple chains akin to IBC for Cosmos. In simple terms, this library leverages Router's infrastructure to allow contracts on one chain to communicate with contracts deployed on some other chain. The library is structured in a way that it can be integrated seamlessly into your development environment to allow for cross-chain message passing without disturbing other parts of your product.



## Installation

This is a <a href="https://nodejs.org/en/" target="_blank">Node.js</a> module available through the npm registry.

Before installing, <a href="https://nodejs.org/en/download/" target="_blank">download and install Node.js</a>.

```console
$ npm install --save-dev @routerprotocol/router-crosstalk
```


## Features

* State-of-the-art cross-chain smart contract infrastructure.
* Focus on trustless system.
* Super-high test coverage.
* Developer-friendly library.


## Detailed Documentation

Detailed documentation of router crosstalk can be found at <a href="https://dev.routerprotocol.com/crosstalk-library/overview"> dev.routerprotocol.com/crosstalk-library </a>


## Quick Start

The quickest way to get started is to create a project using ```truffle``` or ```hardhat``` and installing the Crosstalk library using the command: 

```console
$ npm install @routerprotocol/router-crosstalk
```

While creating a new contract, make sure to import and inherit the Crosstalk Contract file from the library and initialize it using the ```generic handler``` address while initializing the contract. 

After the contracts have been developed, four tasks remain!
* Setting the linker address.
* Setting the fee token address.
* Approving fees to be spent by generic handler from the contract using ```approveFees``` function.
* Mapping the contracts on different chains using the generic handler.

Use the <a href="https://dev.routerprotocol.com/crosstalk-library/overview">documentation</a> to find out how these tasks can be accomplished.

## Sample Repository

We have also created a sample repository which contains a hardhat project with a Cross-chain Greeter contract and tasks created to set the variables such as linker address and fee token address as well as approving fees and mapping contracts.

Clone the repository at <a href="https://github.com/router-protocol/router-crosstalk-sample"> https://github.com/router-protocol/router-crosstalk-sample</a> and install the dependencies using the following commands:

```console
$ git clone https://github.com/router-protocol/router-crosstalk-sample.git
$ npm install
```

This will automatically install the ```Router Crosstalk Library``` along with other dependencies.
Read the ```Readme.md``` file for steps to use this repository.
