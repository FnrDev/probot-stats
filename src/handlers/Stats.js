import { BASE_API } from '../util/constants';

export async function fetchStats() {
    try {
        const res = await fetch(`${BASE_API}/stats`);
        const data = await res.json();
        if (res.status !== 200) {
            return `Error: ${res.statusText}`
        }
        return data;
    } catch (error) {
        return error;
    }
}