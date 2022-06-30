// data print and print console
d3.json("samples.json").then(function(data) {

    console.log(data.names);

    // build drop down feature
    for (i = 0; i < data.names.length; i++) {
      // selecting tag
      let dropdown = d3.select("#selDataset")
      // new option
      newoption = dropdown.append('option')
      // include ID as text
      newoption.text(data.names[i])
      newoption.attr('value', data.names[i])


    }
    const samples = data.samples
    const metadata = data.metadata

    buildtable(metadata[0])
    barchart(samples[0])
    gaugechart(metadata[0])
  });


// Metadata chart function
function buildtable(metadata) {
  console.log("buildtable func is excuting")
  console.log(metadata)
  let demotable = d3.select('#sample-metadata');
  let filltable = demotable.append("table")
  let row = filltable.append('tr')
  let tabledata = row.append('td')
  let id = tabledata.text('SAMPLE:' + metadata.id)
  // new row to table
  row = filltable.append('tr')
  // add table
  tabledata = row.append('td')
  let age = tabledata.text('AGE:' + metadata.age)
  row = filltable.append('tr')
  tabledata = row.append('td')
  let gender = tabledata.text('GENDER:' + metadata.gender)
  row = filltable.append('tr')
  tabledata = row.append('td')
  let location = tabledata.text('LOCATION:' + metadata.location)
  row = filltable.append('tr')
  tabledata = row.append('td')
  let wfreq = tabledata.text('WASH FREQ: ' + metadata.wfreq)

}

// build piechart
function barchart(sample) {
  console.log('barchart is running')
  console.log(sample.otu_ids.slice(0, 10))
  console.log(sample.sample_values.slice(0, 10))

  let toptenvalues = sample.sample_values.slice(0, 10)
  let topentenids = sample.sample_values.slice(0, 10).reverse
  let toptenlabels = sample.otu_labels.slice(0, 10).reverse

  var data = [{
    title: '<b>top 10 otus',
    type: 'bar',
    x: toptenvalues,
    y: topentenids,
    orientation: 'h',
    text: toptenlabels
  }];

  Plotly.newPlot('bar', data);


}
  

// Build Gauge Chart
function gaugechart(metadata) {
  console.log('gaugechart is running')
  console.log(metadata)

  let wash_frq = metadata.wfreq
  console.log(wash_frq)

  var w_data = [
    {
      domain: { x:[0, 1], y:[0, 1]},
      value: wash_frq,
      title: { text: "Weekly Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "#000082" },
        steps: [
          { range: [0, 1], color: "#fff4ed" },
          { range: [1, 2], color: "#ffddc6" },
          { range: [2, 3], color: "#ffc59f" },
          { range: [3, 4], color: "#ffae78" },
          { range: [4, 5], color: "#ff9650" },
          { range: [5, 6], color: "#ff7e29" },
          { range: [6, 7], color: "#ff6702" },
          { range: [7, 8], color: "#ed5f00" },
          { range: [8, 9], color: "#c64800" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490,
        },
      },
    },
  ];
  var layout = { width: 300, height: 225, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", data, layout);
}
  
    


d3.select("#selDataset").on('click', () => {

    console.log('Dropdown was changed')
}) 