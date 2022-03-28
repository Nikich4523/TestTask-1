const { expect, assert } = require("chai");
const utils = require("ethers/lib/utils");
const { ethers, waffle } = require("hardhat");

describe("Donations contract", async function(){

    // Deploy contract when the tests are run
    let DonationsContractFactory, DonationsContract, owner, addr1, addr2;
    beforeEach(async function(){
        DonationsContractFactory = await ethers.getContractFactory("DonationsContract");
        DonationsContract = await DonationsContractFactory.deploy();
        [owner, addr1, addr2] = await ethers.getSigners();
    });

    describe("Function - Donate", async function(){
        it("Function should revert error if sum of donation less or equal 0", async function(){
            await expect(DonationsContract.Donate()).to.be.revertedWith("The sum of donation must be greater than 0");
        });

        it("Function should save sum of donation from every user", async function(){
            // frst
            await DonationsContract.connect(addr1).Donate({value: 100});
            let expectedSum = 100;
            let actualSum = await DonationsContract.Donations(addr1.address);
            expect(actualSum).to.equal(expectedSum);

            // scnd
            await DonationsContract.connect(addr1).Donate({value: 1000});
            expectedSum = 1100;
            actualSum = await DonationsContract.Donations(addr1.address);
            expect(actualSum).to.equal(expectedSum);

            // thrd
            await DonationsContract.connect(addr2).Donate({value: utils.parseEther("1")});
            expectedSum = utils.parseEther("1");
            actualSum = await DonationsContract.Donations(addr2.address);
            expect(actualSum).to.equal(expectedSum);
        });

        it("Function should store only unique donater's addresses", async function(){
            // frst
            await DonationsContract.connect(owner).Donate({value: 1000}); 
            let expectedDonaters = [owner.address];
            let actualDonaters = await DonationsContract.GetDonaters();
            expect(actualDonaters).to.have.all.members(expectedDonaters);

            // scnd
            await DonationsContract.connect(addr1).Donate({value: 1000}); 
            expectedDonaters = [owner.address, addr1.address];
            actualDonaters = await DonationsContract.GetDonaters();
            expect(actualDonaters).to.have.all.members(expectedDonaters);

            // thrd
            await DonationsContract.connect(addr1).Donate({value: 1000}); 
            expectedDonaters = [owner.address, addr1.address, addr1.address];
            actualDonaters = await DonationsContract.GetDonaters();
            expect(actualDonaters).to.not.have.all.members(expectedDonaters);
        });
    });

    describe("Function - WithdrawDonations", async function(){
        it("Function should revert error if it was not called by the contract owner", async function(){
            await expect(DonationsContract.connect(addr1).WithdrawDonations(100, addr2.address))
                .to.be.revertedWith("You are not the owner of the contract");
        });

        it("Function should revert error if contract's balance less then withdraw sum", async function(){
            await expect(DonationsContract.connect(owner).WithdrawDonations(100, addr2.address))
                .to.be.revertedWith("Not enough money");
        });

        it("Function should transfer sum from contract to given address", async function(){
            let provider = waffle.provider;
            await DonationsContract.connect(addr1).Donate({value: 1000});

            // frst // contract's balance = 1000
            let sum = 100;
            let expectedContractBalance = 900;
            await DonationsContract.connect(owner).WithdrawDonations(sum, addr2.address);
            let actualContractBalance = await provider.getBalance(DonationsContract.address);
            await expect(actualContractBalance).to.be.equal(expectedContractBalance);

            // scnd // contract's balance = 900
            sum = 350;
            expectedContractBalance = 550;
            await DonationsContract.connect(owner).WithdrawDonations(sum, addr1.address);
            actualContractBalance = await provider.getBalance(DonationsContract.address);
            await expect(actualContractBalance).to.be.equal(expectedContractBalance);
        });
    });
});