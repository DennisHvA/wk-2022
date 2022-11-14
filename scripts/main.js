// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.scss'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
const KEY = import.meta.env.VITE_API_KEY

console.log('main.js is linked');

fetch('./groups.json')
    .then((response) => response.json())
    .then(groups => {
                            
        const cleanData = groups.map(item => {
            let newItem = {
                '#': parseInt (item["Position"]),
                Flag: item["SquadLogo"],
                Nation: item["Name"],
                Points: parseInt (item["Points"]),
                Played: parseInt (item["Played"]),
                Wins: parseInt (item["Winned"]),
                Losses: parseInt (item["Loosed"]),
                Ties: parseInt (item["Tie"]),
                Goaldif: parseInt (item["Goal Difference"])
            }
				
            return newItem
        })

        console.log(cleanData);

        const countryNames = [];
            
        cleanData.forEach(item => {
            countryNames.push(item["Nation"])
        })
        
        const tableData = [];
            
        cleanData.forEach(groups => {
            tableData.push(groups)
        })

        console.log(countryNames);
        console.log(tableData);

        const width = 900
        const height = 600   

        const svg = d3.select("svg").attr('width', width).attr('height', height)

        // Map and projection
        const projection = d3.geoMercator().scale(120).translate([width / 2, height / 1.40]);

        // Load external data and boot
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {

            // Draw the map
            svg.append("g")
                .selectAll("path")
                .data(data.features)
                .join("path")
                    .attr("fill", "#69b3a2")
                    .attr("d", d3.geoPath()
                    .projection(projection)
                    )
                    .style("stroke", "#fff")
                    .attr("fill", function (d) {
                        if(d.properties.name == "Brazil") {
                         console.log(d.id)
                        return "#000"
                        } else {
                            return "#00F"
                        }
                    }
                )

    })

        const groupA = tableData.splice(0,4)
        const groupB = tableData.splice(0,4)
        const groupC = tableData.splice(0,4)
        const groupD = tableData.splice(0,4)
        const groupE = tableData.splice(0,4)
        const groupF = tableData.splice(0,4)
        const groupG = tableData.splice(0,4)
        const groupH = tableData.splice(0,4)

        console.log(groupA)
        
        function generateTable() {
            /* Always define variables at the top of your scope! */
        
            let table = document.querySelector('table'); // Grab the entire table
            let theading = document.querySelector('thead tr'); // Grab the row in the thead
            let tbody = document.querySelector('tbody') // Grab the body
        
            Object.keys(groupA[0]).forEach(key => {
        
                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupA.forEach(obj => {
        
                let tr = document.createElement('tr');
                tbody.appendChild(tr);
        
                for (const [key, value] of Object.entries(obj)) {
        
                    let td = document.createElement('td');
                    td.textContent = value; // Use the value, not the property / key!
                    tr.appendChild(td) // And append it to the row we just made.
        
                }
        
            })
        
        }
        
        generateTable();
    });
    

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': KEY,
    //         'X-RapidAPI-Host': 'football98.p.rapidapi.com'
    //     }
    // };
    
    // fetch('https://football98.p.rapidapi.com/fifaworldcup/table', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));