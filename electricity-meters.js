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
	async function topupElectricity(meterId, units) {
		console.log('meterID?'+meterId)
		const meterBalanceIncrease = await pool.query('UPDATE electricity_meter SET balance +20 WHERE meterId = $1', [meterId]);
		return meterBalanceIncrease;

	}
	
	// return the data for a given balance
	function meterData(meterId) {
	
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		const meterBalanceIncrease = await pool.query('UPDATE electricity_meter SET balance -30 WHERE meterId = $1', [meterId]);
		return meterBalanceIncrease;
	
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