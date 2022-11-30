// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.scss'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import { style } from 'd3';
const KEY = import.meta.env.VITE_API_KEY

console.log('main.js is linked');

fetch('./groups.json')
    .then((response) => response.json())
    .then(groups => {

        // ----------------------------------------
        // DATA
        // ----------------------------------------
                            
        const cleanData = groups.map(item => {
            let newItem = {
                Place: parseInt (item["Position"]),
                Flag: item["SquadLogo"],
                Nation: item["Name"],
                G: parseInt (item["Played"]),
                W: parseInt (item["Winned"]),
                L: parseInt (item["Loosed"]),
                T: parseInt (item["Tie"]),
                P: parseInt (item["Points"]),
                GD: parseInt (item["Goal Difference"])
            }
				
            return newItem
        })

        console.log(cleanData);
    
        fetch('./results.json')
        .then((response) => response.json())
        .then(data => {
            const testArray = []

            data.forEach(data => {
                testArray.push(data)
            })

            console.log(testArray)

        // ----------------------------------------
        // MAP
        // ----------------------------------------

        const mapData = [];
            
        cleanData.forEach(item => {
            mapData.push(item["Nation"])
        })

        console.log(mapData);

        const tooltipRawData = [];

        cleanData.forEach(item => {
            tooltipRawData.push({flag: item["Flag"], nation: item["Nation"]})
        })

        console.log(tooltipRawData)

        const width = 900
        const height = 600   

        const svg = d3.select("svg").attr('width', width).attr('height', height)

        // projection
        const projection = d3.geoMercator().scale(125).translate([width / 2.43, height / 1.40]);

        // data map
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {

            const Tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("opacity", 0)
                .style("background-color", "white")
                .style("padding", "2em")
            
            function mouseOver(e, d) {
                    if(mapData.includes(d.properties.name)) {
                        Tooltip.style("opacity", 1)
                        // d3.select(this)
                        // .style("stroke", "black")
                        d3.select(this)
                            .style("fill", "#00cfb7")
                        d3.select(".tooltip")
                           .html(`Land: ${d.properties.name}`)
                    } else {
                        console.log("fout")
                    }}
                // console.log(d.properties.name);

            function mouseMove (e) {
                d3.select(".tooltip")
                .style("left", e.pageX + 15 + "px")
                .style("top", e.pageY + 15 + "px")
            }

            function mouseOut (e, d) {
                if(mapData.includes(d.properties.name)) {
                    d3.select(this)
                        .style("fill", "#8a1538")
                }
                d3.select(".tooltip")
                .style("opacity", 0)
            }

            function handleZoom(e) {
                d3.select('svg g')
                  .attr('transform', e.transform);
              }
              
            let zoom = d3.zoom()
                .on('zoom', handleZoom)
                .scaleExtent([1, 3])
                .translateExtent([[0, 0], [width, height]]);

            // make map
            svg.append("g")
                .selectAll("path")
                .data(data.features)
                .join("path")
                    .attr("d", d3.geoPath()
                    .projection(projection)
                    )
                    .style("stroke", function (d) {
                        if(mapData.includes(d.properties.name)) {
                        return "#eeeee4"
                        } else {
                            return "#8a1538"
                        }
                    })
                    .style("stroke-width", 0.5)
                    .attr("fill", function (d) {
                        if(mapData.includes(d.properties.name)) {
                        // if(d.properties.name == "Brazil") {
                        return "#8a1538"
                        } else {
                            return "#eeeee4"
                        }
                    }
                )
                .on("mouseover", mouseOver)
                .on("mousemove", mouseMove)
                .on("mouseout", mouseOut)
                d3.select('svg')
                .call(zoom)
                .attr("viewBox", "0 0 " + width + " " + height )
                .attr("preserveAspectRatio", "xMinYMin");
                
        })

        // ----------------------------------------
        // GROUPS
        // ----------------------------------------

        const tableData = [];
            
        cleanData.forEach(groups => {
            tableData.push(groups)
        })

        console.log(tableData);

        const groupA = tableData.splice(0,4)
        const groupB = tableData.splice(0,4)
        const groupC = tableData.splice(0,4)
        const groupD = tableData.splice(0,4)
        const groupE = tableData.splice(0,4)
        const groupF = tableData.splice(0,4)
        const groupG = tableData.splice(0,4)
        const groupH = tableData.splice(0,4)

        groupA.sort((a, b) => a.Place - b.Place);
        groupB.sort((a, b) => a.Place - b.Place);
        groupC.sort((a, b) => a.Place - b.Place);
        groupD.sort((a, b) => a.Place - b.Place);
        groupE.sort((a, b) => a.Place - b.Place);
        groupF.sort((a, b) => a.Place - b.Place);
        groupG.sort((a, b) => a.Place - b.Place);
        groupH.sort((a, b) => a.Place - b.Place);
        
        function generateTableA() {
        
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

                    let td = document.createElement('td');

                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableA();

        function generateTableB() {
        
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
                    let td = document.createElement('td');
                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableB();
        
        function generateTableC() {
        
            let table = document.querySelector('table'); 
            let theading = document.querySelector('#Cth #Ctr');
            let tbody = document.querySelector('#Ctb')
        
            Object.keys(groupC[0]).forEach(key => {
                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupC.forEach(obj => {

                let tr = document.createElement('tr');
                tbody.appendChild(tr);

                for (const [key, value] of Object.entries(obj)) {
                    let td = document.createElement('td');
                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableC();

        function generateTableD() {
        
            let table = document.querySelector('table'); 
            let theading = document.querySelector('#Dth #Dtr');
            let tbody = document.querySelector('#Dtb')
        
            Object.keys(groupD[0]).forEach(key => {
                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupD.forEach(obj => {

                let tr = document.createElement('tr');
                tbody.appendChild(tr);

                for (const [key, value] of Object.entries(obj)) {
                    let td = document.createElement('td');
                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableD();

        function generateTableE() {
        
            let table = document.querySelector('table'); 

            // table.querySelector('th');

            let theading = document.querySelector('#Eth #Etr');
            let tbody = document.querySelector('#Etb')
        
            Object.keys(groupE[0]).forEach(key => {
                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupE.forEach(obj => {

                let tr = document.createElement('tr');
                tbody.appendChild(tr);

                for (const [key, value] of Object.entries(obj)) {
                    let td = document.createElement('td');
                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableE();

        function generateTableF() {
        
            let table = document.querySelector('table'); 
            let theading = document.querySelector('#Fth #Ftr');
            let tbody = document.querySelector('#Ftb')
        
            Object.keys(groupF[0]).forEach(key => {
                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupF.forEach(obj => {

                let tr = document.createElement('tr');
                tbody.appendChild(tr);

                for (const [key, value] of Object.entries(obj)) {
                    let td = document.createElement('td');
                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableF();

        function generateTableG() {
        
            let table = document.querySelector('table'); 
            let theading = document.querySelector('#Gth #Gtr');
            let tbody = document.querySelector('#Gtb')
        
            Object.keys(groupG[0]).forEach(key => {
                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupG.forEach(obj => {

                let tr = document.createElement('tr');
                tbody.appendChild(tr);

                for (const [key, value] of Object.entries(obj)) {
                    let td = document.createElement('td');
                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableG();

        function generateTableH() {
        
            let table = document.querySelector('table'); 
            let theading = document.querySelector('#Hth #Htr');
            let tbody = document.querySelector('#Htb')
        
            Object.keys(groupH[0]).forEach(key => {
                let newElement = document.createElement('th');
                newElement.textContent = key;
                theading.appendChild(newElement);
            })
        
            groupH.forEach(obj => {

                let tr = document.createElement('tr');
                tbody.appendChild(tr);

                for (const [key, value] of Object.entries(obj)) {
                    let td = document.createElement('td');
                    if (key == "Flag"){
                        // console.log(value)
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
        generateTableH();

        // ----------------------------------------
        // KNOCKOUT
        // ----------------------------------------
        const groupA1 = groupA.slice(0, 1)
        const seedA1 = []
        groupA1.forEach(item => {
            seedA1.push(item["Nation"])
        })
        document.getElementById('A1').innerHTML = seedA1;

        const groupA2 = groupA.slice(1, 2)
        const groupB1 = groupB.slice(0, 1)
        const groupB2 = groupB.slice(1, 2)
        const groupC1 = groupC.slice(0, 1)
        const groupC2 = groupC.slice(1, 2)
        const groupD1 = groupD.slice(0, 1)
        const groupD2 = groupD.slice(1, 2)
        const groupE1 = groupE.slice(0, 1)
        const groupE2 = groupE.slice(1, 2)
        const groupF1 = groupF.slice(0, 1)
        const groupF2 = groupF.slice(1, 2)
        const groupG1 = groupG.slice(0, 1)
        const groupG2 = groupG.slice(1, 2)
        const groupH1 = groupH.slice(0, 1)
        const groupH2 = groupH.slice(1, 2)
    });

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

    // --------------
    // fixtures
    // --------------

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': KEY,
    //         'X-RapidAPI-Host': 'football98.p.rapidapi.com'
    //     }
    // };
    
    // fetch('https://football98.p.rapidapi.com/fifaworldcup/fixtures', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));