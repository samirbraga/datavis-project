if (typeof importScripts === 'function') {
    importScripts('https://d3js.org/d3.v5.min.js');

    self.addEventListener("message", e => {
        const csvURL = e.data.csvName;
        let csvReq = new XMLHttpRequest();
        csvReq.open("GET", csvURL, true);
        csvReq.onreadystatechange = function () {
            if (csvReq.readyState === 4 && csvReq.status === 200) {
                return postMessage({
                    data: d3.csvParse(csvReq.responseText),
                    year: e.data.year
                });
            }
        };
        csvReq.send();
    });
}