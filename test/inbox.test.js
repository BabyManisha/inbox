const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { bytecode, interface } = require('../compile');

let accounts, inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the above networks to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments : ['SivaMani'] })
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox Testing', () => {
    it('Deploys a Contract!', () => {
        assert.ok(inbox.options.address);
    })

    it('Checks Default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'SivaMani');
    })

    it('Set Custom Message', async() => {
        await inbox.methods.setMessage('Love you SM').send({from: accounts[1], gas: '1000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Love you SM');
    })

})