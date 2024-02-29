let chart;
let chartv;
function generarGrafico() {

if (chart) {
chart.destroy(); // Destruir el gráfico anterior si existe
}

if (chartv) {
  chartv.destroy(); // Destruir el gráfico anterior si existe
  }
 
const initialPosition = parseFloat(document.getElementById('initialPosition').value);
const initialVelocity = parseFloat(document.getElementById('initialVelocity').value);
const acceleration = parseFloat(document.getElementById('acceleration').value);

const timeArray = generarArrayTiempo();
const positionArray = generarArrayPosicion(initialPosition, initialVelocity, acceleration, timeArray);
const velocityArray = generarArrayVelocidad(initialVelocity, acceleration, timeArray);

const datax = {
labels: timeArray,
datasets: [{
label: `\\(x(t) = (${initialPosition} \\,\\mbox{m})+(${initialVelocity} \\,\\mbox{m/s}) \\cdot t +\\displaystyle \\frac{1}{2} \\cdot (${acceleration}\\,\\mbox{m/s}^2) \\cdot t^2 \\)`,
borderColor: 'rgb(255, 204, 188)',
data: positionArray,
fill: false,
pointStyle: 'rect',
}]
};

const datav = {
  labels: timeArray,
  datasets: [{
  label: `\\(v(t) = (${initialVelocity} \\,\\mbox{m/s}) +\\displaystyle (${acceleration}\\,\\mbox{m/s}^2) \\cdot t \\)`,
  borderColor: 'rgb(255, 204, 188)',
  data: velocityArray,
  fill: false,
  pointStyle: 'rect',
  }]
  };

const opciones = {
	responsive: true,
	// aspectRatio: 1;
	scales: {
	  x: {
		display: true,
		title: {
		display: true,
		text: 'Tiempo (s)',
		color: '#3a2c60',
		font: {
		family: 'monospace',
		size: 12,
		weight: 'normal',
		lineHeight: 1.2,
		},
		padding: {top: 20, left: 0, right: 0, bottom: 0}
		}
		},
	  y: {
		display: true,
		title: {
		display: true,
		text: 'Posición (m)',
		color: '#3a2c60',
		font: {
		family: 'monospace',
		size: 12,
		style: 'normal',
		lineHeight: 1.2
		},
		padding: {top: 30, left: 0, right: 0, bottom: 0}
		}
	}
	},
plugins: {
	htmlLegend: {
// ID of the container to put the legend in
		containerID: 'legend-container',
	},
	legend: {
		display: false,
		},
	tooltip: {
		callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label = 'x= ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US').format(context.parsed.y) + ' m';
                        }
                        return label;
                    }
				}
			},
}
};

const opcionesv = {
	responsive: true,
	// aspectRatio: 1;
	scales: {
	  x: {
		display: true,
		title: {
		display: true,
		text: 'Tiempo (s)',
		color: '#3a2c60',
		font: {
		family: 'monospace',
		size: 12,
		weight: 'normal',
		lineHeight: 1.2,
		},
		padding: {top: 20, left: 0, right: 0, bottom: 0}
		}
		},
	  y: {
		display: true,
		title: {
		display: true,
		text: 'Velocidad (m/s)',
		color: '#3a2c60',
		font: {
		family: 'monospace',
		size: 12,
		style: 'normal',
		lineHeight: 1.2
		},
		padding: {top: 30, left: 0, right: 0, bottom: 0}
		}
	}
	},
plugins: {
	htmlLegendv: {
// ID of the container to put the legend in
		containerID: 'legend-container-v',
	},
	legend: {
		display: false,
		},
	tooltip: {
		callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label = 'v= ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US').format(context.parsed.y) + ' m/s';
                        }
                        return label;
                    }
				}
			},
}
};

const ctx = document.getElementById('chartCanvas').getContext('2d');
const ctv = document.getElementById('chartCanvas-v').getContext('2d');

chart = new Chart(ctx, {
type: 'line',
data: datax,
options: opciones,
plugins: [htmlLegendPlugin],
// maintainAspectRatio : false,
});

chartv = new Chart(ctv, {
  type: 'line',
  data: datav,
  options: opcionesv,
  plugins: [htmlLegendPluginv],
  // maintainAspectRatio : false,
  });
}

function generarArrayTiempo() {
const tmax = parseFloat(document.getElementById('tmax').value);

if (tmax > 0) {
const timeArray = [];
for (let t = 0; t <= tmax; t += 0.1) {
timeArray.push(t.toFixed(2));
}
return timeArray;
} else {
        // Muestra un mensaje de error o realiza otra acción
		alert('El tiempo máximo debe ser mayor que cero.');
        console.error('El tiempo máximo debe ser mayor que cero.');
        return null; // Otra opción: devuelve un valor que indica un error
    } 
}

function generarArrayPosicion(initialPosition, initialVelocity, acceleration, timeArray) {
const positionArray = [];
timeArray.forEach(t => {
const position = initialPosition + initialVelocity * t + 0.5 * acceleration * Math.pow(t, 2);
positionArray.push(position.toFixed(2));
});
return positionArray;
}

function generarArrayVelocidad(initialVelocity, acceleration, timeArray) {
  const velocityArray = [];
  timeArray.forEach(t => {
  const velocity = initialVelocity + acceleration * t;
  velocityArray.push(velocity.toFixed(2));
  });
  return velocityArray;
  }

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'row';
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach(item => {
      const li = document.createElement('li');
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '10px';
	    li.style.pointer = 'grab';

      // li.onclick = () => {
        // const {type} = chart.config;
        // if (type === 'pie' || type === 'doughnut') {
          // // Pie and doughnut charts only have a single dataset and visibility is per item
          // chart.toggleDataVisibility(item.index);
        // } else {
          // chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        // }
        // chart.update();
      // };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = '20px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '20px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
	  
	  MathJax.typeset();
    });
  }
};


const htmlLegendPluginv = {
  id: 'htmlLegendv',
  afterUpdate(chartv, args, options) {
    const ul = getOrCreateLegendList(chartv, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chartv.options.plugins.legend.labels.generateLabels(chartv);

    items.forEach(item => {
      const li = document.createElement('li');
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '10px';
	    li.style.pointer = 'grab';

      // li.onclick = () => {
        // const {type} = chart.config;
        // if (type === 'pie' || type === 'doughnut') {
          // // Pie and doughnut charts only have a single dataset and visibility is per item
          // chart.toggleDataVisibility(item.index);
        // } else {
          // chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        // }
        // chart.update();
      // };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = '20px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '20px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
	  
	  MathJax.typeset();
    });
  }
};
