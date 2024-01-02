import axios from 'axios';

export async function fetchPackages() {
	const res = await axios.get('/api/package');
	return res.data;
}

export async function fetchPackage(id: number) {
	const res = await axios.get(`/api/package/${id.toString()}`);
	return res.data;
}
