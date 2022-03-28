
module.exports = function () {
    task("donate", "Donate some sum to contract")
    .addParam("donateValue", "sum to donate")
    .setAction(async (taskArgs) => {
        const DonationsContractFactory = await ethers.getContractFactory("DonationsContract");
        const DonationsContract = await DonationsContractFactory.attach("0xEA2ca2a7f7a5f3E4C1ca39578B2DB1f96D7b1bae");
        await DonationsContract.Donate({ value: taskArgs.donateValue });

        console.log("Сумма успешно пожертвована!");
    })
};
