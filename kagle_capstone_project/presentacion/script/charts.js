/*Map*/
function makeMap(df){   
    var map = L.map('mapid').setView([0,0], 2);

    var tiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
    }).addTo(map);
    
    df.forEach(element => {
        if(element['lat'] != null || element['lon'] != null){
            var circle = L.circle([element['lat'], element['lon']], {
                color: colors[element['airline_sentiment']],
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);
            
            circle['sentiment'] = element['airline_sentiment'];
            
            markers.push(circle);
            
        }else if(element['tt_lat'] != null || element['tt_lng'] != null){
            var circle = L.circle([element['tt_lat'], element['tt_lng']], {
                color: colors[element['airline_sentiment']],
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);
            
            circle['sentiment'] = element['airline_sentiment'];
            
            markers.push(circle);
        }
    })
};


/*Pie chart*/
function addPieChart(df){ 
    var w = 500;
    window.pieChart = $("#pieChart")[0];
    
    var dataPie = {
        negative: df.filter(obj => {return obj.airline_sentiment == 'negative'}).length,
        positive: df.filter(obj => {return obj.airline_sentiment == 'positive'}).length,
        neutral: df.filter(obj => {return obj.airline_sentiment == 'neutral'}).length
    };
    

    window.pieData = {
      values: Object.values(dataPie),
      labels: Object.keys(dataPie),
      type: 'pie',
      marker: {
        colors: Object.values(colors),
        line: {color: '#FFFFFF'}
      }
    };

    window.pielayout = {
        width: w,
        height: w*0.75,
        title: 'Porcentaje de sentimiento de las aerolíneas',
        titlefont: {size: 12},
        xaxis: {showgrid: false, 
                showline: false},
        yaxis: {showgrid: false, 
                showline: false},
        showlegend: false,
        margin: {l: 50, r: 50, b: 50, t: 50},
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        hoverinfo: 'text',
        hovermode: 'closest'
    };    

    Plotly.newPlot(pieChart, [pieData], pielayout, {displayModeBar: false});
};


/*Line charts by date*/
function addDateChart(df){
    var w = 500;
    window.dateChart = $("#lineChartDate")[0];
    
    var x = new Array();
    var y = new Array();
    var s = new Array();
    
    df.forEach(element => {
        x.push(new Date(element['date']));
        y.push(1);
    });
    
    
    window.dateData = {
      type: 'bar',
      x: x,
      y: y,
      transforms: [{
        type: 'aggregate',
        groups: x,
        aggregations: [{
            target: 'y',
            func: 'sum',
            enabled: true
        }]
      }],
      marker: {color: '#000000'}
    };
    
    window.dateLayout = {
        width: w,
        height: w/2,
        title: 'Tweets según fechas',
        titlefont: {size: 12},
        xaxis: {showgrid: true, 
                gridcolor: '#DCDCDC',
                gridwidth: 0.3,
                showline: true, 
                linewidth: 1,
                linecolor: '#DCDCDC',
                tickangle: 45},
        yaxis: {showgrid: true, 
                gridcolor: '#DCDCDC',
                gridwidth: 0.3,
                showline: true, 
                linewidth: 1,
                linecolor: '#DCDCDC'},
        showlegend: false,
        margin: {l: 50, r: 50, b: 50, t: 50},
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        hoverinfo: 'text',
        hovermode: 'closest'
    }; 
    
    Plotly.newPlot(dateChart, [dateData], dateLayout, {displayModeBar: false});
};


function updateDateChart(sentiment){
    x = [];
    y = [];
    c = colors[sentiment];
    
    var dataFilter = dataCSV.filter(function(el){
        return el['airline_sentiment'] == sentiment
    });    
    
    dataFilter.forEach(element => {
        x.push(new Date(element['date']));
        y.push(1);
    });
    
    dateData['marker']['color'] = c;
    dateData['x'] = x;
    dateData['y'] = y;
    
    Plotly.update(dateChart, [dateData], dateLayout);
};


function addTimeChart(df){
    var w = 500;
    window.timeChart = $("#lineChartTime")[0];
    
    var x = new Array();
    var y = new Array();
    
    df.forEach(element => {
        x.push(element['hour']);
        y.push(1);
    });
    
    
    window.timeData = {
      type: 'bar',
      x: x,
      y: y,
      transforms: [{
        type: 'aggregate',
        groups: x,
        aggregations: [{
            target: 'y',
            func: 'sum',
            enabled: true
        }]
      }],
      marker: {color: '#000000'}
    };
    
    window.timeLayout = {
        width: w,
        height: w/2,
        title: 'Tweets según las horas del día',
        titlefont: {size: 12},
        xaxis: {showgrid: true, 
                gridcolor: '#DCDCDC',
                gridwidth: 0.3,
                showline: true, 
                linewidth: 1,
                linecolor: '#DCDCDC'},
        yaxis: {showgrid: true, 
                gridcolor: '#DCDCDC',
                gridwidth: 0.3,
                showline: true, 
                linewidth: 1,
                linecolor: '#DCDCDC'},
        showlegend: false,
        margin: {l: 50, r: 50, b: 50, t: 50},
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        hoverinfo: 'text',
        hovermode: 'closest'
    }; 
    
    Plotly.newPlot(timeChart, [timeData], timeLayout, {displayModeBar: false});
};


function updateTimeChart(sentiment){
    x = [];
    y = [];
    c = colors[sentiment];
    
    var dataFilter = dataCSV.filter(function(el){
        return el['airline_sentiment'] == sentiment
    });    
    
    dataFilter.forEach(element => {
        x.push(element['hour']);
        y.push(1);
    });
    
    timeData['marker']['color'] = c;
    timeData['x'] = x;
    timeData['y'] = y;
    
    Plotly.update(timeChart, [timeData], timeLayout);
};


function addAirlinesChart(df){
    var w = 500;
    window.airlineChart = $("#barChart")[0];
    
    $('#object').width($('#object').parent().width());
    
    var x = new Array();
    var y = new Array();
    
    df.forEach(element => {
        x.push(element['airline']);
        y.push(1);
    });
    
    
    window.airlinedata = {
      type: 'bar',
      x: x,
      y: y,
      transforms: [{
        type: 'aggregate',
        groups: x,
        aggregations: [{
            target: 'y',
            func: 'sum',
            enabled: true
        }]
      }],
      marker: {color: '#000000'}
    };
    
    window.airlineLayout = {
        width: w,
        height: w/2,
        title: 'Tweets de las aerolíneas',
        titlefont: {size: 12},
        xaxis: {showgrid: true, 
                gridcolor: '#DCDCDC',
                gridwidth: 0.3,
                showline: true, 
                linewidth: 1,
                linecolor: '#DCDCDC',
                tickangle: 45},
        yaxis: {showgrid: true, 
                gridcolor: '#DCDCDC',
                gridwidth: 0.3,
                showline: true, 
                linewidth: 1,
                linecolor: '#DCDCDC'},
        showlegend: false,
        margin: {l: 50, r: 50, b: 75, t: 50},
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        hoverinfo: 'text',
        hovermode: 'closest'
    }; 
    
    Plotly.newPlot(airlineChart, [airlinedata], airlineLayout, {displayModeBar: false});
};


function updateAirlinesChart(sentiment){
    x = [];
    y = [];
    c = colors[sentiment];
    
    var dataFilter = dataCSV.filter(function(el){
        return el['airline_sentiment'] == sentiment
    });    
    
    dataFilter.forEach(element => {
        x.push(element['airline']);
        y.push(1);
    });
    
    airlinedata['marker']['color'] = c;
    airlinedata['x'] = x;
    airlinedata['y'] = y;
    
    Plotly.update(airlineChart, [airlinedata], airlineLayout);
};