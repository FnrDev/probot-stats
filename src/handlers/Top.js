import { BASE_API } from '../util/constants';

export async function fetchCreditsData(limit = 10) {
    const res = await fetch(`${BASE_API}/top_credits`);
    const data = await res.json();
    const formatCreditsUsers = [];
    for (let i = 0; i < limit; i++) {
        formatCreditsUsers.push(`**#${i + 1}** | ${data.map(r => r.name)[i]}#${data.map(r => r.discriminator)[i]} | CREDITS: \`${data.map(r => r.credits.toLocaleString())[i]}\``)
    }
    return formatCreditsUsers;
};

export async function fetchXpData(limit = 10) {
    const res = await fetch(`${BASE_API}/top_xp`);
    const data = await res.json();
    const formatXpUsers = [];
    for (let i = 0; i < limit; i++) {
        formatXpUsers.push(`**#${i + 1}** | ${data.map(r => r.name)[i]}#${data.map(r => r.discriminator)[i]} | XP: \`${data.map(r => r.xp.toLocaleString())[i]}\``)
    }
    return formatXpUsers;
}