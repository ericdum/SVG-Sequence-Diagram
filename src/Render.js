/**
 * Created by garethr on 10/12/13.
 */

var engine = new LayoutEngine({
                devices : [
                {name:"CUCM"},
                {name:"SBC"},
                {name:"FS01"},
                {name:"CS2K"}
            ],
                messages : [
                {from:"CUCM", to:"SBC",message:"INVITE"},
                {from:"SBC", to:"FS01",message:"INVITE"},
                {from:"FS01", to:"SBC",message:"INVITE"},
                {from:"SBC", to:"CS2K",message:"INVITE"}
            ]
    }
);





var margin = {top: 10, right: 10, bottom: 10, left: 10},
    viewWidth = 960 - margin.left - margin.right,
    viewHeight = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", viewWidth + margin.left + margin.right)
    .attr("height", viewHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", 5)
    .attr("refY", 5)
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 50)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 5 5 L 0 10 z");



var messages =svg.selectAll(".messages")
    .data(engine.getMessages()).enter()
    .append('g');

messages.append("svg:line")
    .attr("stroke","black")
    .attr("marker-end", "url(#arrowhead)")
    .attr("class", "messages")
    .attr("x1", function(d) {return engine.getMiddleXOfDeviceFromName(d.from);})
    .attr("y1",  function(d,i) {return engine.getMessageHeight(i);})
    .attr("x2", function(d){return  engine.getMiddleXOfDeviceFromName(d.to);})
    .attr("y2", function(d,i) {return engine.getMessageHeight(i);});


messages.append("text")//d3.min(
    .attr("x", function(d) {return engine.getMessageTextStartXPositionFromNames(d.to,d.from);})
    .attr("y",  function(d,i) {return engine.getMessageTextStartYPosition(i);})
    .text( function (d) { return  d.message; });


var devicesSVG = svg.selectAll(".devices")
    .data(engine.getDevices()).enter()
    .append("g");




devicesSVG.append("svg:rect")
    .attr("x",    function(d,i) {return engine.getDeviceXPosition(i);})
        .attr("y", 0)
        .attr("width",engine.deviceWidth)
        .attr("fill","none")
        .attr("stroke","black")
        .attr("height", engine.deviceHeight)
        .attr("class", "devices")
        .text(function(d) {
                return d.name;
            });

devicesSVG.append("text")
            .attr("x", function(d,i) {return engine.getDeviceTextX(i);})
            .attr("y", engine.getDeviceTextY())
            .text( function (d) { return  d.name; });

devicesSVG.append("svg:line")
    .attr("class", "devices")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("x1", function(d,deviceIndex) {return engine.getMiddleXOfDevice(deviceIndex);})
    .attr("y1", engine.deviceHeight)
    .attr("x2", function(d,deviceIndex) {return engine.getMiddleXOfDevice(deviceIndex);})
    .attr("y2", viewHeight);



