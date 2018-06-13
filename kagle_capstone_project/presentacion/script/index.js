$(window).resize(resizeMap);


function resizeMap(){
    $('.mapBox').width($(window).width());
};


$(document).ready(function(){
    $(window).trigger('resize');
    
    $('.btn').click(function(){
        var txt = $(this).attr('id');
        
        markers.forEach(element => {
            if(element['sentiment']==txt){
                element.setStyle({stroke: true, fill: true});
            }else{
                element.setStyle({stroke: false, fill: false});
            }            
        });    
        
        if(txt != 'general'){
            updateDateChart(txt);
            updateTimeChart(txt);
            updateAirlinesChart(txt);   
        }else{
            addDateChart(dataCSV);
            addTimeChart(dataCSV);
            addAirlinesChart(dataCSV);  
        };
    });
}); 