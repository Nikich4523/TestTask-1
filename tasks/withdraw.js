
module.exports = function () {
    task("withdraw", "Withdraw some some from contract to given address")
    .addParam("withdrawValue", "sum to withdraw")
    .addParam("address", "The address that will receive the funds")
    .setAction(async (taskArgs) => {
        const DonationsContractFactory = await ethers.getContractFactory("DonationsContract");
        const DonationsContract = await DonationsContractFactory.attach("0xEA2ca2a7f7a5f3E4C1ca39578B2DB1f96D7b1bae");
        await DonationsContract.WithdrawDonations(taskArgs.withdrawValue, taskArgs.address);

        console.log(`На адрес ${taskArgs.address} переведено ${taskArgs.withdrawValue} wei!`);
    })
};
