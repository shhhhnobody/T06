// Set uo dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right; // Width of the chart area
const innerHeight = height - margin.top - margin.bottom; // Height of the chart area

let innerChartS;

const tooltipWidth = 65;
const tooltipHeight = 32;

/* Make the colours accessible globally */
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const xSclaeS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal()

// Create a bin generator using d3.bin
const binGenerator = d3.bin()
    .value(d => d.energyConsumption) // Accessor for energyConsumption

/* Make the filter options accessible globally */
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
]