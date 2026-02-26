export async function onRequest(context) {
  const country = context.request.headers.get("CF-IPCountry") || "US";
  const autoTargetMap = { TH:"THB", MY:"MYR", PH:"PHP", ID:"IDR", VN:"VND", MX:"MXN" };
  const autoTarget = autoTargetMap[country] || "EUR";

  let rates = {};
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/EUR");
    const data = await res.json();
    rates = data.rates || {};
  } catch {}

  return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ONE BAR FX</title>
<style>
body { background:black; color:white; font-family:monospace; }
select,input { background:black; color:white; font-family:monospace; }
a { color:white; }
</style>
</head>
<body>

<pre id="box">
==================
   ONE BAR FX
==================
</pre>

BASE:
<select id="base">
  <option value="EUR">EUR</option>
  <option value="USD">USD</option>
  <option value="GBP">GBP</option>
</select>

TO:
<select id="target"></select>

AMOUNT:
<input id="amount" type="number" value="1" />

<script>
const RATES = ${JSON.stringify(rates)};
const AUTO_TARGET = "${autoTarget}";

const box = document.getElementById("box");
const baseSelect = document.getElementById("base");
const targetSelect = document.getElementById("target");
const amountInput = document.getElementById("amount");

Object.keys(RATES).forEach(c => {
  const opt = document.createElement("option");
  opt.value = c;
  opt.textContent = c;
  targetSelect.appendChild(opt);
});

if(RATES[AUTO_TARGET]) targetSelect.value = AUTO_TARGET;

function render() {
  const base = baseSelect.value;
  const target = targetSelect.value;
  const amount = parseFloat(amountInput.value) || 0;
  let rate = 1;
  if(RATES[target] && RATES[base]) rate = RATES[target]/RATES[base];
  box.textContent=\`
==================
   ONE BAR FX
==================

BASE: \${base}
TO:   \${target}

RATE: \${rate.toFixed(6)}
AMOUNT: \${amount}
RESULT: \${(amount*rate).toFixed(4)}\`;
}

baseSelect.addEventListener("change", render);
targetSelect.addEventListener("change", render);
amountInput.addEventListener("input", render);
render();
</script>

<p><a href="/">home</a></p>

</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}