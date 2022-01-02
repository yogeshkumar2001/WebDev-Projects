//Pseudo code
//Step 1: Define chart properties.
//Step 2: Create the chart with defined properties and bind it to the DOM element.
//Step 3: Add the CandleStick Series.
//Step 4: Set the data and render.
//Step5 : Plug the socket to the chart

//Code
const log = console.log;
const arr1 = [
  {
    companyName: "SBI Cards",
    marketPrice: "₹1,129.50\n40.60(3.73%)",
    Percentage: "40.60(3.73%)",
  },
  {
    companyName: "Container Corp",
    marketPrice: "₹680.15\n15.75(2.37%)",
    Percentage: "15.75(2.37%)",
  },
  {
    companyName: "Muthoot Finance",
    marketPrice: "₹1,566.05\n34.55(2.26%)",
    Percentage: "34.55(2.26%)",
  },
  {
    companyName: "Bandhan Bank",
    marketPrice: "₹323.25\n6.75(2.13%)",
    Percentage: "6.75(2.13%)",
  },
  {
    companyName: "HDFC",
    marketPrice: "₹2,903.95\n59.85(2.10%)",
    Percentage: "59.85(2.10%)",
  },
  {
    companyName: "Indus Towers",
    marketPrice: "₹302.00\n6.20(2.10%)",
    Percentage: "6.20(2.10%)",
  },
  {
    companyName: "Bajaj Auto",
    marketPrice: "₹3,866.50\n62.50(1.64%)",
    Percentage: "62.50(1.64%)",
  },
  {
    companyName: "DLF",
    marketPrice: "₹413.65\n6.55(1.61%)",
    Percentage: "6.55(1.61%)",
  },
  {
    companyName: "HPCL",
    marketPrice: "₹327.85\n5.05(1.56%)",
    Percentage: "5.05(1.56%)",
  },
  {
    companyName: "ONGC",
    marketPrice: "₹157.05\n2.05(1.32%)",
    Percentage: "2.05(1.32%)",
  },
  {
    companyName: "Kotak Mahindra Bank",
    marketPrice: "₹2,171.40\n27.65(1.29%)",
    Percentage: "27.65(1.29%)",
  },
  {
    companyName: "Axis Bank",
    marketPrice: "₹816.70\n8.90(1.10%)",
    Percentage: "8.90(1.10%)",
  },
  {
    companyName: "Adani Transmission",
    marketPrice: "₹1,809.00\n19.40(1.08%)",
    Percentage: "19.40(1.08%)",
  },
  {
    companyName: "IndusInd Bank",
    marketPrice: "₹1,196.40\n12.00(1.01%)",
    Percentage: "12.00(1.01%)",
  },
  {
    companyName: "SBI Life Insurance",
    marketPrice: "₹1,167.20\n8.90(0.77%)",
    Percentage: "8.90(0.77%)",
  },
];
const arr2 = [
  {
    companyName: "Info Edge (India)",
    marketPrice: "₹6,289.65\n-439.90(6.54%)",
    Percentage: "-439.90(6.54%)",
  },
  {
    companyName: "Biocon",
    marketPrice: "₹323.80\n-21.15(6.13%)",
    Percentage: "-21.15(6.13%)",
  },
  {
    companyName: "Hindustan Zinc",
    marketPrice: "₹322.35\n-19.70(5.76%)",
    Percentage: "-19.70(5.76%)",
  },
  {
    companyName: "Hindalco",
    marketPrice: "₹470.45\n-23.30(4.72%)",
    Percentage: "-23.30(4.72%)",
  },
  {
    companyName: "Abbott India",
    marketPrice: "₹20,239.55\n-752.45(3.58%)",
    Percentage: "-752.45(3.58%)",
  },
  {
    companyName: "Coal India",
    marketPrice: "₹175.90\n-6.50(3.56%)",
    Percentage: "-6.50(3.56%)",
  },
  {
    companyName: "Piramal Enterprises",
    marketPrice: "₹2,588.15\n-95.05(3.54%)",
    Percentage: "-95.05(3.54%)",
  },
  {
    companyName: "Power Finance Corp",
    marketPrice: "₹137.10\n-4.90(3.45%)",
    Percentage: "-4.90(3.45%)",
  },
  {
    companyName: "Tata Motors",
    marketPrice: "₹490.90\n-17.10(3.37%)",
    Percentage: "-17.10(3.37%)",
  },
  {
    companyName: "ITC",
    marketPrice: "₹236.60\n-8.10(3.31%)",
    Percentage: "-8.10(3.31%)",
  },
  {
    companyName: "Indraprastha Gas",
    marketPrice: "₹476.10\n-15.25(3.10%)",
    Percentage: "-15.25(3.10%)",
  },
  {
    companyName: "Tata Consumer",
    marketPrice: "₹795.25\n-19.55(2.40%)",
    Percentage: "-19.55(2.40%)",
  },
  {
    companyName: "NMDC",
    marketPrice: "₹142.50\n-3.45(2.36%)",
    Percentage: "-3.45(2.36%)",
  },
  {
    companyName: "Divi's Labs",
    marketPrice: "₹5,073.40\n-120.25(2.32%)",
    Percentage: "-120.25(2.32%)",
  },
  {
    companyName: "Adani Ports",
    marketPrice: "₹761.80\n-17.55(2.25%)",
    Percentage: "-17.55(2.25%)",
  },
];
const arr3 = [
  {
    name: "NIFTY",
    exchangeName: "NSE",
    exhangeValue: "47.30 (0.26%)",
    value: "18,162.20",
  },
  {
    name: "SENSEX",
    exchangeName: "BSE",
    exhangeValue: "304.61 (0.50%)",
    value: "61,126.23",
  },
];
const chartProperties = {
  width: 900,
  height: 450,
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },
  layout: {
    background: {
      type: LightweightCharts.ColorType.VerticalGradient,
      topColor: "#181C27",
      bottomColor: "#181C27",
    },
    textColor: "#696969",
    fontSize: 12,
    fontFamily: "Calibri",
  },
  grid: {
    vertLines: {
      color: "#242733",
      style: 1,
      visible: true,
    },
    horzLines: {
      color: "#242733",
      style: 1,
      visible: true,
    },
  },
};

const domElement = document.getElementById("tvchart");
// const container = document.getElementsByClassName("top-container");
const table = document.getElementById("table");
const table2 = document.getElementById("table2");
const card = document.getElementsByClassName("card");

const btn = document.getElementById("btn");
const mydata = document.getElementById("myData");
const chart = LightweightCharts.createChart(domElement, chartProperties);
const candleSeries = chart.addCandlestickSeries();

fetch(
  `http://127.0.0.1:9665/fetchAPI?endpoint=https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`
)
  .then((res) => res.json())
  .then((data) => {
    const cdata = data.map((d) => {
      return {
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      };
    });
    candleSeries.setData(cdata);
  })
  .catch((err) => log(err));

//Dynamic Chart
const socket = io.connect("http://127.0.0.1:4000/");

socket.on("KLINE", (pl) => {
  // log(pl);
  candleSeries.update(pl);
});

function onLoadPage() {
  for (let i = 0; i < arr1.length; i++) {
    tr = document.createElement("tr");
    tr.setAttribute("class", "mainTR");
    table.appendChild(tr);

    var td1 = document.createElement("td");
    td1.textContent = arr1[i].companyName;
    td1.setAttribute("class", "td1");
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    td2.textContent = arr1[i].marketPrice;
    td2.setAttribute("class", "td2");
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.textContent = arr1[i].Percentage;
    td3.setAttribute("class", "td3");
    tr.appendChild(td3);
  }
  ////////////////////////////
  for (let i = 0; i < arr2.length; i++) {
    tr = document.createElement("tr");
    tr.setAttribute("class", "mainTR");
    table2.appendChild(tr);

    var td1 = document.createElement("td");
    td1.textContent = arr2[i].companyName;
    td1.setAttribute("class", "td1");
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    td2.textContent = arr2[i].marketPrice;
    td2.setAttribute("class", "td2");
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.textContent = arr2[i].Percentage;
    td3.setAttribute("class", "tl3");
    tr.appendChild(td3);
  }

  // var element = document.getElementById("name1");
  // element.innerHTML = arr3[0].name;
  var div = document.getElementById("value1");
  div.innerHTML = arr3[0].value;
  var div2 = document.getElementById("exValue");
  div2.innerHTML = arr3[0].exhangeValue; 
  var div3 = document.getElementById("value2");
  div3.innerHTML = arr3[1].value;
  var div4 = document.getElementById("exValue1");
  div4.innerHTML = arr3[1].exhangeValue;
}
