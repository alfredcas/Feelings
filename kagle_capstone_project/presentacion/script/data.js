var dbCSV = '../data/tweets_public_clean.csv';
var dataCSV = new Array();
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
        
        makeMap(dataCSV);
        addPieChart(dataCSV);
        addDateChart(dataCSV);
        addTimeChart(dataCSV);
        addAirlinesChart(dataCSV);
    }
});