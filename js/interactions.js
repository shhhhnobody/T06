const populateFilters = (data) => {
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
            .attr("class", d => `filter ${d.isActive ? "active" : ""}`) // Add 'active' class if isActive is true
            .text(d => d.label) 
            .on("click", (e, d) => {
                console.log("Clicked filter:", e);
                console.log("Clicked filter data:", d);
                if (!d.isActive) {
                    // make sure button clicked is not already active
                    filters_screen.forEach(filter => {
                        filter.isActive = d.id === filter.id ? true : false;
                    });
                    // update the filter buttons based on which one is clicked
                    d3.selectAll("#filters_screen .filter")
                        .classed("active", filter => filter.id === d.id ? true : false);

                    updateHistogram(d.id, data);
                }
            });
    
    const updateHistogram = (filterId, data) => {
        const updateData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);
        
        const updatedBins = binGenerator(updateData);

        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
                .duration(500)
                .ease(d3.easeCubicOut)
                .attr("y", d => yScale(d.length)) // Update the y position based on the new bin length
                .attr("height", d => innerHeight - yScale(d.length)); // Update the height based on the new bin length
    };
}

const createTooltip = (data) => {
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    tooltip.append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .attr("font-weight", 900); 
}

const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            d3.select(".tooltip text")
            .text(d.screenSize); // Update the text in the tooltip with the screenTech valur

            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5*tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            d3.select(".tooltip")
            .style("opacity", 0)
            .attr("transform", `translate(0, 500)`); 
        });
}