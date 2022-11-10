// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.scss'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
const KEY = import.meta.env.VITE_API_KEY

console.log('main.js is linked');

fetch('./groups.json')
    .then((response) => response.json())
    .then(groups => {
                            
        const newArray = [];
            
        groups.forEach(item => {
            newArray.push(item["Name"])
        })
        
        console.log(newArray);
        
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