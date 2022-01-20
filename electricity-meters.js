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
		const meterBalanceIncrease = await pool.query('UPDATE electricity_meter SET balance = balance+$2 WHERE id = $1', [meterId,units]);
		return meterBalanceIncrease;

	}
	
	// return the data for a given balance
	async function meterData(meterId) {
		const getMeter = await pool.query('SELECT balance from electricity_meter WHERE id = $1', [meterId]);
		return getMeter.rows;
		
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		const meterBalanceIncrease = await pool.query('UPDATE electricity_meter SET balance = balance-$2 WHERE id = $1', [meterId,units]);
		return meterBalanceIncrease;
	
	}

	// lowestBalanceMeter
	async function lowestBalanceMeter(meterId){
		const smallBalance = await pool.query('SELECT * from electricity_meter WHERE id = $1 ORDER BY balance asc LIMIT 1', [meterId]);
		return smallBalance;
	}

	// highestBalanceStreet
	async function highestBalanceStreet(meterId){
		const highestBalance = await pool.query('SELECT sum(balance) from electricity_meter WHERE id = $1 ORDER BY balance desc LIMIT 1', [meterId]);
		return highestBalance;
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		lowestBalanceMeter,
		highestBalanceStreet
	}


}