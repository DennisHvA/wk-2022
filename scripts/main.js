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
                Place: parseInt (item["Position"]),
                Flag: item["SquadLogo"],
                Nation: item["Name"],
                P: parseInt (item["Points"]),
                G: parseInt (item["Played"]),
                W: parseInt (item["Winned"]),
                L: parseInt (item["Loosed"]),
                T: parseInt (item["Tie"]),
                GD: parseInt (item["Goal Difference"])
            }
				
            return newItem
        })

        console.log(cleanData);

        const mapData = [];
            
        cleanData.forEach(item => {
            mapData.push(item["Nation"])
        })
        
        const tableData = [];
            
        cleanData.forEach(groups => {
            tableData.push(groups)
        })

        console.log(mapData);

        const width = 900
        const height = 600   

        const svg = d3.select("svg").attr('width', width).attr('height', height)

        // projection
        const projection = d3.geoMercator().scale(120).translate([width / 2, height / 1.40]);

        // data map
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {

            const Tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style("background-color", "white")
                .style("padding", "2em")
                .style("position", "absolute")
            
            function showTooltip(e, d) {
                console.log(d.properties.name);
                Tooltip.style("opacity", 1)
                d3.select(this)
                .style("stroke", "black")
                .style("left", "100px")
                .style("top", "100px")

                d3.select(".tooltip")
                .html(`Land: ${d.properties.name}`)
    
            }
            // make map
            svg.append("g")
                .selectAll("path")
                .data(data.features)
                .join("path")
                    .attr("d", d3.geoPath()
                    .projection(projection)
                    )
                    .style("stroke", "#fff")
                    .style("stroke-width", 0.5)
                    .attr("fill", function (d) {
                        if(mapData.includes(d.properties.name)) {
                        // if(d.properties.name == "Brazil") {
                        return "#000"
                        } else {
                            return "#00F"
                        }
                    }
                )
                .on("mouseover", showTooltip)
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

        groupA.sort((a, b) => a.Place - b.Place);
        
        function generateTable() {
        
            let table = document.querySelector('table'); 
            let theading = document.querySelector('thead tr');
            let tbody = document.querySelector('tbody')
        
            Object.keys(groupA[0]).forEach(key => {

                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupA.forEach(obj => {
        
                let tr = document.createElement('tr');
                tbody.appendChild(tr);
        
                for (const [key, value] of Object.entries(obj)) {
                    
                    // console.log(key+" "+value)

                    let td = document.createElement('td');

                    if (key == "Flag"){
                        console.log(value)
                        let imageEl = document.createElement('img');
                        imageEl.src = value;
                        td.appendChild(imageEl);
                    }
                    else {
                        td.textContent = value; 
                    }

                    tr.appendChild(td)
        
                }
        
            })
        
        }
        
        generateTable();

        function generateTable2() {
        
            let table = document.querySelector('table'); 
            let theading = document.querySelector('#Bth #Btr');
            let tbody = document.querySelector('#Btb')
        
            Object.keys(groupB[0]).forEach(key => {

                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupB.forEach(obj => {
        
                let tr = document.createElement('tr');
                tbody.appendChild(tr);
        
                for (const [key, value] of Object.entries(obj)) {
                    
                    // console.log(key+" "+value)

                    let td = document.createElement('td');

                    if (key == "Flag"){
                        console.log(value)
                        let imageEl = document.createElement('img');
                        imageEl.src = value;
                        td.appendChild(imageEl);
                    }
                    else {
                        td.textContent = value; 
                    }

                    tr.appendChild(td)
        
                }
        
            })
        
        }
        
        generateTable2();

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