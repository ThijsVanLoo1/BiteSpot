export async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Something went wrong your request! status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}