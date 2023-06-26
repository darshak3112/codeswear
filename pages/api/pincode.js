import pincodes from '../../pincode.json'

export default function handler(req, res) {
	/*let pincodes = {
		"313001" : ["Udaipur","Rajsthan"],
		"313002" : ["Jaipur","Rajasthan"],
		"313003" : ["Ahmedabad","Gujarat"]
	}*/
	res.status(200).json(pincodes)
}
  