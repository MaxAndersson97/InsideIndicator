var output = "0"; //placeholder for text output
var reader; //GLOBAL File Reader object for demo purpose only
/**
* display Google Charts
*/
google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawGauge);

var gaugeOptions = {
    min: 0, 
    max: 100, 
    yellowFrom: 75, 
    yellowTo: 90, 
    redFrom: 90, 
    redTo: 100, 
    minorTicks: 5
};

var gauge;
var gaugeData;

function drawGauge() {
    gaugeData = new google.visualization.DataTable();
    gaugeData.addColumn('number', 'LivingRoom');
    gaugeData.addColumn('number', 'Garden');
    gaugeData.addColumn('number', 'Kitchen');
    gaugeData.addColumn('number', 'Humidity');
    gaugeData.addColumn('number', 'Wind');
    gaugeData.addColumn('number', 'Others');
    gaugeData.addRows(2);
    gaugeData.setCell(0, 0, output);
    gaugeData.setCell(0, 1, output);
    gaugeData.setCell(0, 2, output);
    gaugeData.setCell(0, 3, output);
    gaugeData.setCell(0, 4, output);
    gaugeData.setCell(0, 5, output);

    gauge = new google.visualization.Gauge(document.getElementById('gauge_div'));
    gauge.draw(gaugeData, gaugeOptions);
    changeTemp();
    setInterval(function () {
        changeTemp();
    }, 1000);
}

function changeTemp() {
    $.ajax({
        url: "/input/LivingRoom.txt", 
        success: function(result){
            gaugeData.setValue(0, 0, parseInt(result));
            $.ajax({
                url: "/input/Garden.txt", 
                success: function(result){
                    gaugeData.setValue(0, 1, parseInt(result));
                    $.ajax({
                        url: "/input/Kitchen.txt", 
                        success: function(result){
                            gaugeData.setValue(0, 2, parseInt(result));
                            $.ajax({
                                url: "/input/Humidity.txt", 
                                success: function(result){
                                    gaugeData.setValue(0, 3, parseInt(result));
                                    $.ajax({
                                        url: "/input/Wind.txt", 
                                        success: function(result){
                                            gaugeData.setValue(0, 4, parseInt(result));
                                            $.ajax({
                                                url: "/input/Others.txt", 
                                                success: function(result){
                                                    gaugeData.setValue(0, 5, parseInt(result));
                                                    gauge.draw(gaugeData, gaugeOptions);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

$(document).ready(function() {
})
