const BASE_URL =
	"https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json"

function getAllHouseApi() {
	return fetch(BASE_URL).then((res) => res.json())
}

export { getAllHouseApi }
