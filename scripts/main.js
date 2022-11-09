// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.scss'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';

console.log('main.js is linked');

fetch('./groups.json')
    .then((response) => response.json())
    .then((json) => console.log(json));