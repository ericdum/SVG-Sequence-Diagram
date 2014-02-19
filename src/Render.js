/**
 * Created by garethr on 10/12/13.
 */

var RenderEngine = (function () {

    function RenderEngine(layoutEngine) {
        this.margin = {top: 10, right: 10, bottom: 10, left: 10};
        this.viewWidth = 960 - this.margin.left - this.margin.right;
        this.viewHeight = 500 - this.margin.top - this.margin.bottom;


        this.layoutEngine = layoutEngine;

    }

    RenderEngine.prototype.Init = function()
    {
        var that = this;

        this.svg = d3.select("body").append("svg")
            .attr("width", that.viewWidth + that.margin.left + that.margin.right)
            .attr("height", that.viewHeight + that.margin.top + that.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");

        this.svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("refX", 5)
            .attr("refY", 5)
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", 50)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 L 5 5 L 0 10 z");
    };


    RenderEngine.prototype.Draw = function()
    {
        var that = this;

        this.messages =this.svg.selectAll(".messages")
            .data(that.layoutEngine.getMessages()).enter()
            .append('g');

        this.messages.append("svg:line")
            .attr("stroke","black")
            .attr("marker-end", "url(#arrowhead)")
            .attr("class", "messages")
            .attr("x1", function(d) {return  that.layoutEngine.getMiddleXOfDeviceFromName(d.from);})
            .attr("y1",  function(d,i) {return that.layoutEngine.getMessageHeight(i);})
            .attr("x2", function(d){return  that.layoutEngine.getMiddleXOfDeviceFromName(d.to);})
            .attr("y2", function(d,i) {return that.layoutEngine.getMessageHeight(i);});


        this.messages.append("text")
            .attr("x", function(d) {return that.layoutEngine.getMessageTextStartXPositionFromNames(d.to,d.from);})
            .attr("y",  function(d,i) {return that.layoutEngine.getMessageTextStartYPosition(i);})
            .text( function (d) { return  d.message; });


        this.devicesSVG = this.svg.selectAll(".devices")
            .data(this.layoutEngine.getDevices()).enter()
            .append("g");


        this.devicesSVG.append("svg:rect")
            .attr("x",    function(d,i) {return that.layoutEngine.getDeviceXPosition(i);})
            .attr("y", 0)
            .attr("width",that.layoutEngine.deviceWidth)
            .attr("fill","none")
            .attr("stroke","black")
            .attr("height", that.layoutEngine.deviceHeight)
            .attr("class", "devices")
            .text(function(d) {
                return d.name;
            });


        this.devicesSVG.append("text")
            .attr("x", function(d,i) {return that.layoutEngine.getDeviceTextX(i);})
            .attr("y", that.layoutEngine.getDeviceTextY())
            .text( function (d) { return  d.name; });

        this.devicesSVG.append("svg:line")
            .attr("class", "devices")
            .attr("fill","none")
            .attr("stroke","black")
            .attr("x1", function(d,deviceIndex) {return that.layoutEngine.getMiddleXOfDevice(deviceIndex);})
            .attr("y1", that.layoutEngine.deviceHeight)
            .attr("x2", function(d,deviceIndex) {return that.layoutEngine.getMiddleXOfDevice(deviceIndex);})
            .attr("y2", that.viewHeight);

    };


    return RenderEngine;
})();
