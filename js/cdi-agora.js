function yearToMonth(rate) {
  return 100 * (Math.pow(rate / 100 + 1, 1/12.0) - 1);
}

function formatPct(num) {
  return (Math.round(num * 1e3) / 1e3).toLocaleString('pt-BR') + " %";
}

function fillPage(yearlyCDI, monthlyCDI, indexCDI, updatedAt) {
  document.getElementById("yearly-cdi").innerHTML = formatPct(yearlyCDI);
  document.getElementById("monthly-cdi").innerHTML = formatPct(monthlyCDI);
  document.getElementById("index-cdi").innerHTML = indexCDI;
  document.getElementById("updated-at").innerHTML = updatedAt;
}

function showMainPanel() {
  var mainPanel = document.getElementById("main-panel");
  removeClass(mainPanel, 'faded');
  addClass(mainPanel, 'fadein');
}

b3_request = new XMLHttpRequest();
b3_request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.responseText);
    var yearlyCDI = parseFloat(json.taxa.replace(',', '.'));
    var monthlyCDI = yearToMonth(yearlyCDI);
    var updatedAt = json.dataTaxa;
    var indexCDI = json.indice;

    fillPage(yearlyCDI, monthlyCDI, indexCDI, updatedAt);
    showMainPanel();
  }
};
b3_request.open("GET", "https://www2.cetip.com.br/ConsultarTaxaDi/ConsultarTaxaDICetip.aspx", true);
b3_request.send();
