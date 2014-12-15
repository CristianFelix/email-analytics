//BarChart ------------------------------------------------------------------------
//----------------------------------------------------------------------------------
var barChart = function(selector, label) {
    var self = this;
    self.drawn = false;
    
    self.margin = {top: 10, right: 0, bottom: 20, left: 30};
    self.init = function(element){
        self.element = d3.select(selector);
        self.outWidth = 306.65625;
        self.outHeight = self.element.style("height").replace('px','');
        
        self.width = self.outWidth - self.margin.left - self.margin.right,
        self.height =  self.outHeight - self.margin.top - self.margin.bottom;
        self.x = d3.scale.ordinal().rangeRoundBands([0, self.width,.1,1]);
        self.y = d3.scale.linear().range([self.height, 0]);
        
        self.xValue = function(d){
            return d[label];    
        };

        self.yValue = function(d){
            return d.Sent + d.Received;    
        };
        
        self.ySent = function(d){
            return d.Sent;
        };
         
        //Create SVG element
        self.svg = self.element.append("svg")
                .attr("width", self.outWidth)
                .attr("height",  self.outHeight)
            .append("g")
                .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

        self.initialized = true;
    };
    
    self.redraw = function(data){
        self.data = data;
        console.log(data);
        self.x.domain(data.map(self.xValue));
        self.y.domain([0, d3.max(data, self.yValue)]);
        
        self.gy.call(self.yAxis);
        self.gx.call(self.xAxis);
        
        var enter = 
        
        self.svg.selectAll("rect").data(data);
        self.svg.selectAll(".colorSent").data(data);
        var t = self.svg.transition().duration(500);
        t.selectAll(".colorReceived")
                .attr("x", function(d) { return self.x(self.xValue(d)) +(0.3*self.x.rangeBand())/2 ; })
                .attr("width", self.x.rangeBand()-(0.3*self.x.rangeBand()))
                .attr("y", function(d) { return self.y(self.yValue(d));})
                .attr("height", function(d) { return self.height - self.y(self.yValue(d)) });
        
        
         t.selectAll(".colorSent")
                .attr("x", function(d) { return self.x(self.xValue(d))+(0.3*self.x.rangeBand())/2 ;  })
                .attr("width", self.x.rangeBand()-(0.3*self.x.rangeBand()))
                .attr("y", function(d) { return self.y(self.ySent(d));})
                .attr("height", function(d,i) { console.log(i + " - " + self.y(self.ySent(d)) + " - " + self.ySent(d) + " - "+ d.Sent); return self.height - self.y(self.ySent(d)) });
    }
    
    self.draw = function(data){
        if(self.drawn)
            return self.redraw(data);
              
        self.data = data;
        self.x.domain(data.map(self.xValue));
        self.y.domain([0, d3.max(data, self.yValue)]);
        
        self.yAxis = d3.svg.axis()
            .scale(self.y)
            .orient("left")
            .ticks(4)
            .tickSize(-self.width)
            .tickFormat(function (d) { return d == 0 ? '' : d; });
        
        self.gy = self.svg.append("g")
            .attr("class", "y axis")
            .call(self.yAxis);
        
        self.xAxis = d3.svg.axis()
            .scale(self.x)
            .orient("bottom");
        
        if(self.xformat)
            self.xAxis.tickFormat(self.xformat);
        
        self.gx = self.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (self.height) + ")")
            .call(self.xAxis);
        
        var enter = self.svg.selectAll(".bar")
            .data(data)
            .enter();
        
         enter.append("rect")
                .attr("class", "bar colorReceived")
                .attr("x", function(d) { return self.x(self.xValue(d)) +(0.3*self.x.rangeBand())/2 ; })
                .attr("width", self.x.rangeBand()-(0.3*self.x.rangeBand()))
                .attr("y", function(d) { return self.y(self.yValue(d));})
                .attr("height", function(d) { return self.height - self.y(self.yValue(d)) })
                .append("title").text(function(d) { return self.tooltip(d[label]) + " - Received:"+ d.Received });
        
        enter.append("rect")
                .attr("class", "bar colorSent")
                .attr("x", function(d) { return self.x(self.xValue(d))+(0.3*self.x.rangeBand())/2 ;  })
                .attr("width", self.x.rangeBand()-(0.3*self.x.rangeBand()))
                .attr("y", function(d) { return self.y(self.ySent(d));})
                .attr("height", function(d) { return self.height - self.y(self.ySent(d)) })
                .append("title").text(function(d) {  return  self.tooltip(d[label]) + " - Sent:"+  d.Sent; });
        
        self.drawn = true;
      
    }
    
    self.init();
}


//PieChart ---------------------------------------

var pieChart = function(selector, label, title) {
    var self = this;
    self.drawn = false;
    self.label = label;
    
    self.init = function(element){
        self.margin = {top: 10, right: 0, bottom: 20, left: 10};
        self.width = 250;
        self.height = 350;
        self.radius = Math.min(self.width, self.height) / 2;

        self.color = d3.scale.category20();
        self.pie = d3.layout.pie()
            .value(function(d) { return d[label]; })
            .sort(null);

        self.arc = d3.svg.arc()
            .innerRadius(self.radius - 80)
            .outerRadius(self.radius - 20);

        self.svg = d3.select(selector).append("svg")
            .attr("width", self.width)
            .attr("height", self.height)
            .append("g")
            .attr("transform", "translate(" + self.width / 2  + "," + (self.width / 2 + 50) + ")");
        
        self.svg.append("text")
            .text(title)
            .attr("text-anchor","middle")
            .attr("x", 0)
            .attr("y", -self.width/ 2)
            .attr("class", "chartTitle")
      
            
        
    
    }

    self.draw = function(data){
        if(self.drawn)
            return self.redraw(data);
        var path = self.svg.datum(data).selectAll("path")
            .data(self.pie)
            .enter()
                .append("path")
                .attr("fill", function(d, i) { return self.color(i); })
                .attr("d", self.arc)
                .append("title").text(function(d) { return d.data._id; });
      self.drawn = true;
    }
    
    self.redraw = function(data){
        self.svg.selectAll("path").remove();
        var path = self.svg.datum(data).selectAll("path")
            .data(self.pie)
            .enter().append("path")
                .attr("fill", function(d, i) { return self.color(i); })
                .attr("d", self.arc)
                .append("title").text(function(d) {  return d.data._id;  });
    }
    
    self.init();
}

//Histogram ------------------------------------------------------------------------
//----------------------------------------------------------------------------------
var DateHistogram = function(selector) {
    var self = this;
    self.initialized = false;
    self.margin = {top: 0, right: 10, bottom: 0, left: 10};
    
    self.init = function(element){
        self.element = d3.select(selector);
        self.outWidth = self.element.style("width").replace('px','');
        self.outHeight = self.element.style("height").replace('px','');
        
        self.width = self.outWidth - self.margin.left - self.margin.right,
        self.height =  self.outHeight - self.margin.top - self.margin.bottom;
        self.x = d3.scale.ordinal().rangeBands([0, self.width]);
        self.y = d3.scale.linear().range([self.height, 0]);
        
         
        //Create SVG element
        self.svg = self.element.append("svg")
                .attr("width", self.outWidth)
                .attr("height",  self.outHeight)
            .append("g")
                .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

        self.initialized = true;
    };
    
    self.xValue = function(d){
        return d.Date;    
    };
    
    self.yValue = function(d){
        return d.Sent + d.Received;    
    };
    self.draw = function(data){
        self.data = data;
        self.x.domain(data.map(self.xValue));
        self.y.domain([0, d3.max(data, self.yValue)]);
        
        //Draw bars
        self.svg.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return self.x(self.xValue(d)); })
                .attr("width", self.x.rangeBand())
                .attr("y", function(d) { return self.y(self.yValue(d));})
                .attr("height", function(d) { return self.height - self.y(self.yValue(d)) });
        
        //Draw labels
        self.svg.append("label")
            .data(data)
            .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return self.x(self.xValue(d)); })
                .attr("width", self.x.rangeBand())
                .attr("y", function(d) { return self.y(self.yValue(d));})
                .attr("height", function(d) { return self.height - self.y(self.yValue(d)) });
        
        
        //Draw brush
        self.brush = d3.svg.brush()
            .x(self.x)
            .extent([.3, .5])
            .on("brushstart", brushstart)
            .on("brush", brushmove)
            .on("brushend", brushend);
        
        var brushg = self.svg.append("g")
            .attr("class", "brush")
            .call(self.brush);
        
        brushg.selectAll("rect")
            .attr("height", self.height);
        
        
        brushg.selectAll(".resize")
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", self.height)
            .attr("style","stroke:#43AEA8;stroke-width:2");
        
        var start = data[data.length-30].Date;
        var end = data[data.length-1].Date;

        self.brush.extent([self.x(start), self.x(end)]);
        self.brush(d3.select(".brush"));
        self.brush.event(brushg)
        
        self.brushg = brushg;
            
    }
    
    function brushstart() {
      //svg.classed("selecting", true);
    }
    
    self.setDates = function(start, end){
        self.brush.extent([self.x(start), self.x(end)]);
        self.brush(d3.select(".brush"));
        self.brush.event(self.brushg)
    }
    
    function brushmove() {
        if(self.changing){
            var s = self.brush.extent();
            var xPos = s[0];
            var ePos = s[1];

            var leftEdges = self.x.range();
            var width = self.x.rangeBand();
            var i;
            for(i=0; xPos > (leftEdges[i] + width); i++) {}

            var j;
            for(j=0; ePos > (leftEdges[j] + width); j++) {}
                
        
            self.changing(self.x.domain()[i], self.x.domain()[j]);
        }
    }

    function brushend() {
     // svg.classed("selecting", !d3.event.target.empty());
        var s = self.brush.extent();
        var xPos = s[0];
        var ePos = s[1];
        
        var leftEdges = self.x.range();
        var width = self.x.rangeBand();
        var i;
        for(i=0; xPos > (leftEdges[i] + width); i++) {}
                    
        var j;
        for(j=0; ePos > (leftEdges[j] + width); j++) {}
           
        if(self.changed)
            self.changed(self.x.domain()[i], self.x.domain()[j]);
    }

    self.init();
    return self;
};
