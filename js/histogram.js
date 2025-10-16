const drawHistogram = (data) => {
    // Set dimensions and margins of the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Responsive SVG
    
    // Create an inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    /*********************/
    /* Generate the bins */
    /*********************/
    const bins = binGenerator(data);
    console.log(bins); // Log the bins to the console for debugging

    const minEng = bins[0].x0; // lower bound of the first bin
    const maxEng = bins[bins.length - 1].x1; // upper bound of the last bin
    const binsMaxLength = d3.max(bins, d => d.length); // get the maximum length of the bins
    
    /*****************************************/
    /* Define scales (from shared constants) */
    /*****************************************/
    xScale
        .domain([minEng, maxEng]) // Set the domain based on min and max energy consumption
        .range([0, innerWidth]) // Set the range to the width of the chart area

    yScale
        .domain([0, binsMaxLength]) // Set the domain based on the maximum bin length
        .range([innerHeight, 0]) // Set the range to the height of the chart area (inverted for SVG)
        .nice(); // Use the nice() method to round the y-axis values

    /**********************************/
    /* Draw the bars of the histogram */
    /**********************************/
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScale(d.x0)) // Position the bar based on the lower bound of the bin
            .attr("y", d => yScale(d.length)) // Position the bar based on the length of the bin
            .attr("width", d => xScale(d.x1) - xScale(d.x0)) // Set the width of the bar
            .attr("height", d => innerHeight - yScale(d.length)) // Set the height of the bar
            .attr("fill", barColor) // Use the globally defined bar color
            .attr("stroke", bodyBackgroundColor) // Set the storke color give appearance of gap
            .attr("stroke-width", 2); // Set the stroke width

    /************/
    /* Add axes */
    /************/
    const bottomAxis = d3.axisBottom(xScale);

    // Add the x-axis to the bottom of the chart relatives to the inner chart
    innerChart
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`) // Move to the bottom of the chart area
        .call(bottomAxis);

    // Add the x-axis label
    svg
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width-20)
        .attr("y", height-5)
        .attr("class", "axis-label"); // Set the color of the label in visualisation.css

    const leftAxis = d3.axisLeft(yScale);

    // Add the y-axis to the bottom of the chart relative to the inner chart
    innerChart
        .append("g")
        .call(leftAxis);
    
    svg
        .append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label"); 
}