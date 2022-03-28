
module.exports = function () {
    task("donatersList", "Get list of all donater addresses")
    .setAction(async (taskArgs) => {
        const DonationsContractFactory = await ethers.getContractFactory("DonationsContract");
        const DonationsContract = await DonationsContractFactory.attach("0xEA2ca2a7f7a5f3E4C1ca39578B2DB1f96D7b1bae");

        let donatersList = await DonationsContract.GetDonaters();
        console.log(donatersList);
    })
};
