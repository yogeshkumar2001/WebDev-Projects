//npm init -y
//npm axios 
//npm minimist
// npm jsdom
//node 100_imdbSeries.js --source="https://www.imdb.com/list/ls057886464/"
const axios =require("axios");
const minimist =  require("minimist");
const excel4node =  require("excel4node");
const jsdom =  require("jsdom");
const fs = require("fs");

let args =  minimist(process.argv);

let axiosPromise  =axios.get(args.source);
axiosPromise.then(function (response){
    let html = response.data;
    let dom = new jsdom.JSDOM(html);
    let document =  dom.window.document;
    // console.log(html);
    let seriesDivs = document.querySelectorAll("div.lister-item-content");
    let series=[];
    // console.log(seriesDivs.length);
    for(let i =0; i<seriesDivs.length;i++){
        seriesInfo={
            rank:"",
            year:"",
            name:"",
            rating:"",
            categories:"",
        }
        let seriesRank = seriesDivs[i].querySelector("span.lister-item-index");
        seriesInfo.rank=seriesRank.textContent;
        let seriesYear = seriesDivs[i].querySelector("span.lister-item-year");
        seriesInfo.year=seriesYear.textContent;
        let seriesCategories = seriesDivs[i].querySelector("span.genre");
        seriesInfo.categories=seriesCategories.textContent.trim();
        let seriesName = seriesDivs[i].querySelector("div.lister-item-content > h3 > a");
        seriesInfo.name=seriesName.textContent;
        let seriesRating = seriesDivs[i].querySelector("div.lister-item-content > div.ipl-rating-widget > div.ipl-rating-star.small > span.ipl-rating-star__rating")
        seriesInfo.rating=seriesRating.textContent;
        // console.log(seriesJSON); 

        series.push(seriesInfo);
    }
    let seriesJson = JSON.stringify(series);
    // console.log(seriesJson);
    fs.writeFileSync("series.json" , seriesJson , "utf-8");

    prepareExcel(series , args.excel);
})
function prepareExcel (series , excelFileName){
    let wb = new excel4node.Workbook();
    let seriessheet = wb.addWorksheet("Top 100"); 
    seriessheet.cell(1,1).string("Rank");
    seriessheet.cell(1,2).string("Name");
    seriessheet.cell(1,3).string("Rating");
    seriessheet.cell(1,4).string("Categories");
    seriessheet.cell(1,5).string("Year");
    for(let i =0; i<series.length;i++){
     seriessheet.cell(i+2 , 1).string(series[i].rank);
     seriessheet.cell(i+2 , 2).string(series[i].name);
     seriessheet.cell(i+2 , 3).string(series[i].rating);
     seriessheet.cell(i+2 , 4).string(series[i].categories);
     seriessheet.cell(i+2 , 5).string(series[i].year);
    }
    wb.write(excelFileName);
}