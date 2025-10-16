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