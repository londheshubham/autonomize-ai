import fs from 'fs/promises';
export async function getData() {
    try {
        const data = await fs.readFile('./data/employees.json', {encoding: 'utf-8'});
        return JSON.parse(data || []);
    } catch (err) {
        return [];
    }
}

export async function writeData(data) {
    try {
        const stringData = JSON.stringify(data);
        await fs.writeFile('./data/employees.json', stringData);
        return data.slice(-1)[0].employeeId || "";
    } catch(err) {
        return []
    }
}