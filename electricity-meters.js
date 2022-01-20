// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
		const streetBalanceData = await pool.query('SELECT * from electricity_meter');
		return streetBalanceData.rows;

	}

	// return all the appliances
	async function appliances() {
		const applianceList = await pool.query('SELECT * FROM appliance');
		return applianceList.rows;
		// use a forEach
		// const allAppliances = [];
		// applianceList.rows.forEach(function(applianceNames){
		// 	allAppliances.push(applianceNames.name);

		// });

		// return allAppliances;
	}

	// increase the meter balance for the meterId supplied
	function topupElectricity(meterId, units) {
		// const meterBalanceIncrease = await pool.query('')

	}
	
	// return the data for a given balance
	function meterData(meterId) {
	
	}

	// decrease the meter balance for the meterId supplied
	function useElectricity(meterId, units) {
	
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity
	}


}