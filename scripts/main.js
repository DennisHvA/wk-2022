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
                .style("position", "absolute")
                .style("opacity", 0)
                .style("background-color", "white")
                .style("padding", "2em")
            
            function mouseOver(e, d) {
                console.log(d.properties.name);
                Tooltip.style("opacity", 1)
                d3.select(this)
                .style("stroke", "black")

                d3.select(".tooltip")
                .html(`Land: ${d.properties.name}`)
            }

            function mouseMove (e) {
                d3.select(".tooltip")
                .style("left", e.pageX + 15 + "px")
                .style("top", e.pageY + 15 + "px")
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
                .on("mouseover", mouseOver)
                .on("mousemove", mouseMove)
        })

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
        generateTableD();

        function generateTableE() {
        
            let table = document.querySelector('table'); 
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
        generateTableH();
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