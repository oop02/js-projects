class Pie {
  constructor(data) {
    this.data = data;
    this.checkData();

    this.x = 10;
    this.y = 10;
    this.width = 200;
    this.height = 200;
    this.style = {
      saturation: 80, //0 to 100
      brightness: 100, //0 to 100
      alfa: 1 //0 to 1
    }
  }

  show() {
    push();

    ellipseMode(CORNER);
    angleMode(DEGREES);
    colorMode(HSB);

    let totalValue = 0;
    for (let value of this.data) {
      totalValue += value;
    }

    let startAngle = -90;
    for (let i = 0; i < this.data.length; i++) {
      let angle = map(this.data[i], 0, totalValue, 0, 360); //angle of pie part
      let color = map(i, 0, this.data.length, 0, 360); //hue value of pie part

      //set color
      fill(color, this.style.saturation, this.style.brightness, this.style.alfa);
      stroke(color, this.style.saturation, this.style.brightness);
      arc(this.x, this.y, this.width, this.height, startAngle, startAngle + angle, PIE);
      startAngle += angle;
    }

    pop();
  }

  addValue(value) {
    if (value > 0) {
      this.data.push(value);
      this.sortData();
      return true;
    } else {
      console.error("The value " + value + " can not be added, because it is <= 0!");
      return false;
    }
  }

  changeData(newData) {
    this.data = newData;
    this.checkData();
  }

  sortData() {
    this.data.sort(function(a, b){return b-a});
  }

  checkData() {
    for (let i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i] <= 0) {
        console.error("Found a value <= 0 in pie chart data at index " + i);
        this.data.splice(i, 1);
      }
    }
    this.sortData();
  }
}

class Graph {
  constructor(dataX, dataY) {
    this.changeData(dataX, dataY);

    this.x = 10;
    this.y = 10;
    this.width = 400;
    this.height = 400;
    this.margin = 15;
    this.chartX = this.x + this.margin;
    this.chartY = this.y;
    this.chartWidth = this.width - this.margin;
    this.chartHeight = this.height - this.margin;
    this.chartMargin = 5;

    this.connect = false;
  }

  changeData(dataX, dataY) {
    //check data
    if (dataX.length !== dataY.length) {
      if (dataX.length > dataY.length) {
        dataX.length = dataY.length;
        console.warn("X-axis data array is longer that Y-axis data array!");
      } else {
        dataY.length = dataX.length;
        console.warn("Y-axis data array is longer that X-axis data array!");
      }
    }
    this.dataX = dataX;
    this.dataY = dataY;
    this.dataLength = this.dataX.length;

    //find records
    let dataXMin =  Infinity;
    let dataXMax = -Infinity;
    let dataYMin =  Infinity;
    let dataYMax = -Infinity;
    for (let x of this.dataX) {
      if (x > dataXMax) {
        dataXMax = x;
      }
      if (x < dataXMin) {
        dataXMin = x;
      }
    }
    for (let y of this.dataY) {
      if (y > dataYMax) {
        dataYMax = y;
      }
      if (y < dataYMin) {
        dataYMin = y;
      }
    }
    this.dataXMin = dataXMin;
    this.dataXMax = dataXMax;
    this.dataYMin = dataYMin;
    this.dataYMax = dataYMax;
  }

  show() {
    push();
    fill(200);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    fill(255);
    noStroke();
    rect(this.chartX, this.chartY, this.chartWidth, this.chartHeight);
    pop();

    push();
    stroke(0, 0, 255);
    strokeWeight(5);
    noFill();
    if (this.connect) {
      let prevX;
      let prevY;
      //these long things map the point X Y values to the chart size
      let x = map(this.dataX[0], this.dataXMin, this.dataXMax, this.chartX + this.chartMargin, this.chartX + this.chartWidth - this.chartMargin);
      let y = map(this.dataY[0], this.dataYMin, this.dataYMax, this.chartY + this.chartHeight - this.chartMargin, this.chartY + this.chartMargin);

      for (let i = 1; i < this.dataLength; i++) {
        prevX = x;
        prevY = y;

        x = map(this.dataX[i], this.dataXMin, this.dataXMax, this.chartX + this.chartMargin, this.chartX + this.chartWidth - this.chartMargin);
        y = map(this.dataY[i], this.dataYMin, this.dataYMax, this.chartY + this.chartHeight - this.chartMargin, this.chartY + this.chartMargin);
        line(prevX, prevY, x, y);
      }

    } else {
      for (let i = 0; i < this.dataLength; i++) {
        let pointX = map(this.dataX[i], this.dataXMin, this.dataXMax, this.chartX + this.chartMargin, this.chartX + this.chartWidth - this.chartMargin);
        let pointY = map(this.dataY[i], this.dataYMin, this.dataYMax, this.chartY + this.chartHeight - this.chartMargin, this.chartY + this.chartMargin);
        point(pointX, pointY);
      }
    }
    pop();
  }
}
