if (typeof importScripts === 'function') {
    importScripts('https://d3js.org/d3.v5.min.js');

    const datasets = {};

    self.addEventListener("message", e => {
        const csvURL = e.data.csvName;
        const year = e.data.year.toString();
        const parseDate = e.data.parseDate;

        if (!datasets[year]) {
            let parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
    
            d3.csv(csvURL).then(ds => {
                if (parseDate) {
                    ds.forEach(function (d) {
                        d.datahora = parseDate(d.datahora);
                    });
                }
                
                datasets[year] = ds;

                return postMessage({
                    data: ds,
                    year: parseInt(year)
                });
            });
        } else {
            return postMessage({
                data: datasets[year],
                year: parseInt(year)
            });
        }
    });
}