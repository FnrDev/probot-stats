import { BASE_API, DEFAULT_MEMBERS_LIMIT } from '../util/constants';

export async function fetchCreditsData() {
    const res = await fetch(`${BASE_API}/top_credits`);
    const data = await res.json();
    const formatCreditsUsers = [];
    for (let i = 0; i < DEFAULT_MEMBERS_LIMIT; i++) {
        formatCreditsUsers.push(`**#${i + 1}** | ${data.map(r => r.name)[i]}#${data.map(r => r.discriminator)[i]} | CREDITS: \`${data.map(r => r.credits.toLocaleString())[i]}\``)
    }
    return formatCreditsUsers;
};

export async function fetchXpData() {
    const res = await fetch(`${BASE_API}/top_xp`);
    const data = await res.json();
    const formatXpUsers = [];
    for (let i = 0; i < DEFAULT_MEMBERS_LIMIT; i++) {
        formatXpUsers.push(`**#${i + 1}** | ${data.map(r => r.name)[i]}#${data.map(r => r.discriminator)[i]} | XP: \`${data.map(r => r.xp.toLocaleString())[i]}\``)
    }
    return formatXpUsers;
}