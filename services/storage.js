// Storage service for JSON file operations
// Provides async methods for reading and writing data

const fs = require('fs').promises;
const path = require('path');

class Storage {
    constructor(filename) {
        this.filePath = path.join(__dirname, '..', 'data', filename);
    }

    async read() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading ${this.filePath}:`, error);
            return [];
        }
    }

    async write(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error(`Error writing ${this.filePath}:`, error);
            return false;
        }
    }

    // Query method - allows filtering data with custom functions
    // For JSON files, we just return filtered results
    async query(filterFn = null) {
        const data = await this.read();
        if (filterFn && typeof filterFn === 'function') {
            return data.filter(filterFn);
        }
        return data;
    }
}

module.exports = Storage;
