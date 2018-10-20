const createGraph = (data) => {
    const width = 1000
    const height = 500
    const padding = 50
    const barWidth = width / data.length
    let minDate = data[0][0].substr(0, 4)
    minDate = new Date(minDate)
    let maxDate = data[data.length - 1][0].substr(0, 4)
    maxDate = new Date(maxDate)
    const xAxisScale = d3.scaleTime().domain([minDate, maxDate]).range([padding, width - padding])
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d[1])]).range([height - padding, padding])

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xAxisScale(new Date(d[0])))
        .attr('y', (d) => yScale(d[1])) // svg-height(line 2) - bar-height(line 22)
        .attr('width', barWidth)
        .attr('height', (d) => height - yScale(d[1]) - padding)
        .attr('data-date', (d) => d[0])
        .attr('data-gdp', (d) => d[1])
        .on('mouseover', (d) => {
            const tooltip = document.getElementById('tooltip')
            tooltip.setAttribute('data-date', d[0])
            tooltip.setAttribute('class', 'active')
            tooltip.innerHTML = d[0].slice(0, 4) + ' ' + 'Q' + ((parseInt(d[0].slice(5, 7)) + 2) / 3) + '<br>' + `$${d[1]} Billion`
        })
        .on('mouseout', () => {
            const tooltip = document.getElementById('tooltip')
            tooltip.setAttribute('class', 'inactive')
        })

    const xAxis = d3.axisBottom(xAxisScale)
    const yAxis = d3.axisLeft(yScale)
    svg.append('g')
        .attr('transform', `translate(0, ${450})`)
        .attr('id', 'x-axis')
        .call(xAxis)
    svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .attr('id', 'y-axis')
        .call(yAxis)
}

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((res) => res.json())
    .then((info) => {
        data = info.data
        createGraph(data)
    })


/*
const createGraph = (data) => {
    const width = 1000
    const height = 500
    const padding = 50
    const barWidth = width / data.length
    const xScale = d3.scaleLinear().domain([d3.min(data, (d) => parseInt(d[0].slice(0, 4)), 10), d3.max(data, (d) => parseInt(d[0].slice(0, 4)), 10) + 1]).range([padding, width - padding])
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d[1])]).range([height - padding, padding])

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(parseInt(d[0].slice(0, 4)) + (parseInt(d[0].slice(5, 7) - 1) / 12 )))
        .attr('y', (d) => yScale(d[1])) // svg-height(line 2) - bar-height(line 22)
        .attr('width', barWidth)
        .attr('height', (d) => height - yScale(d[1]) - padding)
        .attr('data-date', (d) => parseInt(d[0].slice(0, 4)) + (parseInt(d[0].slice(5, 7) - 1) / 12 ))
        .attr('data-gdp', (d) => d[1])
        .on('mouseover', (d) => {
            const tooltip = document.getElementById('tooltip')
            tooltip.setAttribute('data-date', d[0])
            tooltip.setAttribute('class', 'active')
            tooltip.innerHTML = d[0].slice(0, 4) + ' ' + 'Q' + ((parseInt(d[0].slice(5, 7)) + 2) / 3) + '<br>' + `$${d[1]} Billion`
        })
        .on('mouseout', () => {
            const tooltip = document.getElementById('tooltip')
            tooltip.setAttribute('class', 'inactive')
        })

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    svg.append('g')
        .attr('transform', `translate(0, ${450})`)
        .attr('id', 'x-axis')
        .call(xAxis)
    svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .attr('id', 'y-axis')
        .call(yAxis)
}

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((res) => res.json())
    .then((info) => {
        data = info.data
        createGraph(data)
    })
*/