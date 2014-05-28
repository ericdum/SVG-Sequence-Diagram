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
            .data(that.layoutEngine.getMessages());


        this.messageGroupEnter = this.messages.enter()
            .append('g')
            .attr("class", "messages")
            .attr("transform",  function(d,i) { return "translate(" + that.layoutEngine.getMiddleXOfDeviceFromName(d.from) + ","+that.layoutEngine.getMessageHeight(i)+")";});

        this.messageGroupEnter.append("svg:line")
            .attr("stroke","black")
            .attr("marker-end", "url(#arrowhead)")
            .attr("x1", 0)
            .attr("y1",  0)
            .attr("x2",  function(d,i) { return  that.layoutEngine.getLengthBetweenDevicesByName(d.from, d.to);})
            .attr("y2",0);


        this.messageGroupEnter.append("text")
            .attr("x", function(d,i) { return  that.layoutEngine.getOffsetLengthBetweenDevicesByName(d.from, d.to);})
            .attr("y",  function(d,i) {return -5;})
            .text( function (d) { return  d.message; });


        this.devicesSVG = this.svg.selectAll(".devices")
            .data(this.layoutEngine.getDevices());


        this.devicesSVGEnterGroup =  this.devicesSVG.enter()
            .append("g")
            .attr("class", "devices")
            .attr("transform",  function(d,i) { return "translate(" + that.layoutEngine.getDeviceXPosition(i) + ",0)";});


        this.devicesSVGEnterGroup.append("svg:rect")
            .attr("width",that.layoutEngine.deviceWidth)
            .attr("fill","none")
            .attr("stroke","black")
            .attr("height", that.layoutEngine.deviceHeight)
            .text(function(d) {
                return d.name;
            });


        this.devicesSVGEnterGroup.append("text")
            .attr("x", that.layoutEngine.deviceWidth/2)
            .attr("y", that.layoutEngine.deviceHeight/2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .text( function (d) { return  d.name; });

        this.devicesSVGEnterGroup.append("svg:line")
            .attr("fill","none")
            .attr("stroke","black")
            .attr("x1", function(d,deviceIndex) {return that.layoutEngine.deviceWidth/2;})
            .attr("y1", that.layoutEngine.deviceHeight)
            .attr("x2", function(d,deviceIndex) {return that.layoutEngine.deviceWidth/2;})
            .attr("y2", that.viewHeight);

    };


    return RenderEngine;
})();
