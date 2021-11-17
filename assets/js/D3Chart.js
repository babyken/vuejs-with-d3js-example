Vue.component("d3-chart", {
  data: function () {
    return {
      count: 0,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    chartData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    chartData() {
      this.clearBarChart();
      this.generateBarChart();
    },
  },
  mounted() {
    this.generateBarChart();
  },
  methods: {
    clearBarChart() {
      d3.select("#d3").selectAll("*").remove();
    },
    generateBarChart() {
      const svg = d3.select("#d3");
      margin = 200;
      width = svg.attr("width") - margin;
      height = svg.attr("height") - margin;

      const xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

      const g = svg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

      const data = this.chartData;
      xScale.domain(
        data.map(function (d) {
          return d.year;
        })
      );
      yScale.domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        }),
      ]);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      g.append("g").call(
        d3
          .axisLeft(yScale)
          .tickFormat(function (d) {
            return "$" + d;
          })
          .ticks(10)
      );

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return xScale(d.year);
        })
        .attr("y", function (d) {
          return yScale(d.value);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
          return height - yScale(d.value);
        });
    },
  },
  template: `
        <div>
           <h3>{{ title }}</h3>
            <svg id="d3" width="500" height="400">            
            </svg>
        </div>
    `,
});
