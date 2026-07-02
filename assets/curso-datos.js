(function () {
  var SHEET_ID = '1eopuRyc4_WvFhnOss0PZI69DASZ1dRM9vbgn50zJO90';
  var CSV_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:csv&gid=0';

  function parseCSV(text) {
    var rows = [], row = [], field = '', inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQuotes = false;
        } else field += c;
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field); field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        if (row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else {
        field += c;
      }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function fmtMoney(value) {
    var num = Number(value);
    if (isNaN(num)) return value;
    return '$' + num.toLocaleString('es-AR');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var cursoId = document.body.getAttribute('data-curso-id');
    if (!cursoId) return;

    fetch(CSV_URL)
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(function (text) {
        var rows = parseCSV(text.trim());
        var headers = rows[0].map(function (h) { return h.trim(); });
        var dataRow = rows.slice(1).find(function (r) { return r[0] && r[0].trim() === cursoId; });
        if (!dataRow) return;

        var data = {};
        headers.forEach(function (h, i) { data[h] = (dataRow[i] || '').trim(); });

        var horarioTxt = document.getElementById('txt-horario');
        if (horarioTxt && data.dias_horario) {
          horarioTxt.textContent = data.fecha_inicio
            ? data.dias_horario + ' · Inicio ' + data.fecha_inicio
            : data.dias_horario;
        }

        var insc = document.getElementById('val-inscripcion');
        if (insc && data.inscripcion) insc.textContent = fmtMoney(data.inscripcion);

        var cuotas = document.getElementById('val-cuotas');
        if (cuotas && data.cuota && data.num_cuotas) {
          cuotas.textContent = '+ ' + data.num_cuotas + ' cuotas fijas de ' + fmtMoney(data.cuota) + ' cada una.';
        }
      })
      .catch(function () { /* red caída: se mantienen los valores estáticos del HTML */ });
  });
})();
