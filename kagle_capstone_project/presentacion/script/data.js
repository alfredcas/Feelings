var dbCSV = '../data/tweets_public_clean.csv';
var dbCSVMap = '../data/tweets_public_map.csv';
var dataCSV = new Array();
var dataCSVMap = new Array();

window.colors = {
    negative: '#E4523B',
    positive: '#3DB296',
    neutral: '#E8931E',
    general: '#000000'
};

window.markers = new Array();

Papa.parse(dbCSV, {
    header: true,
    download: true,
    complete: function(results) {
        dataCSV = results.data;
        
        addPieChart(dataCSV);
        addDateChart(dataCSV);
        addTimeChart(dataCSV);
        addAirlinesChart(dataCSV);
    }
});

Papa.parse(dbCSVMap, {
    header: true,
    download: true,
    complete: function(results) {
        dataCSVMap = results.data;
        
        makeMap(dataCSVMap);
    }
});