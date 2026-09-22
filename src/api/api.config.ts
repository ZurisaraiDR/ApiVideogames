import axios from "axios";

const clientId = "s00361npr4lms5g1vn5h2v5inrgdt1";
const token = "3qqila76mm304ew035atf5exb4axcp";

export const api = axios.create({
    baseURL: "https://api.igdb.com/v4",
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
        "Client-ID": clientId,
        Authorization: `Bearer ${token}`,
    },
});
