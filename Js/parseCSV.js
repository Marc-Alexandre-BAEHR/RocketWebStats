const fs = require("fs");
const csv = require("csv-parser");

// Simple fonction pour renvoyer le CSV (trouvé sur Internet, mais j'ai plsu le site)
function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", reject);
    });
}

module.exports = { parseCSV };
