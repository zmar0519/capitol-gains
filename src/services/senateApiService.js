import * as tokenService from '../services/tokenService';

const BASE_URL =
	"https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json"

function getAllSenateApi() {
	return fetch(BASE_URL).then((res) => res.json())
}

export { getAllSenateApi }
