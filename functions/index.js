export async function onRequest(context) {
  const countryCode = context.request.headers.get("CF-IPCountry") || "US";

  const countryDB = {
    FR: {name:"France", water:"Yes", borders:"Belgium, Germany, Italy, Spain, Switzerland, Luxembourg, Andorra, Monaco", ride:"Uber, Bolt", food:"Uber Eats, Deliveroo", pay:"Cards widely accepted; cash common"},
    ES: {name:"Spain", water:"Yes", borders:"Portugal, France, Andorra, Gibraltar", ride:"Uber, Cabify", food:"Glovo, Uber Eats", pay:"Cards accepted widely; cash common"},
    US: {name:"United States", water:"Yes", borders:"Canada, Mexico", ride:"Uber, Lyft", food:"DoorDash, Uber Eats, Grubhub", pay:"Cards accepted everywhere; cash optional"},
    MX: {name:"Mexico", water:"No (bottled recommended)", borders:"USA, Guatemala, Belize", ride:"Uber, DiDi", food:"Rappi, Uber Eats", pay:"Cards widely accepted; cash common"},
    TH: {name:"Thailand", water:"No (bottled recommended)", borders:"Myanmar, Laos, Cambodia, Malaysia", ride:"Grab, Bolt", food:"Foodpanda, GrabFood", pay:"Cards in cities; cash rural"},
    MY: {name:"Malaysia", water:"No (bottled recommended)", borders:"Thailand, Indonesia, Brunei", ride:"Grab", food:"Foodpanda, GrabFood", pay:"Cards in cities; cash common"},
    JP: {name:"Japan", water:"Yes", borders:"None", ride:"Uber (limited)", food:"Uber Eats, Demae-can", pay:"Cards accepted; cash common"}
  };

  const info = countryDB[countryCode];

  const overview = info
    ? `Current Country: ${info.name}
-----------------------
Drinkable Water: ${info.water}
Border Countries: ${info.borders}
Ride Apps: ${info.ride}
Food Delivery Apps: ${info.food}
Payment Info: ${info.pay}`
    : `(No overview available for your country yet)`;

  return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ONE BAR</title>
<style>
body { background:black; color:white; font-family:monospace; line-height:1.4; padding:1em; }
a { color:white; text-decoration:underline; }
.menu-link {
  display:block;
  font-size:1.4em;
  margin:1em 0;
  padding:0.5em 0.3em;
}
.menu-link:hover { color:#0af; }
pre.overview {
  background:#111;
  padding:0.8em;
  border-radius:4px;
  line-height:1.4;
}
</style>
</head>
<body>

<pre>
==================
    ONE BAR ▁ ▂ ▃
==================
</pre>

<h4>Useful info when your service is bad. Good for travelers or locals.</h4>

<pre class="overview">${overview}</pre>

<nav>
  <a class="menu-link" href="/weather">🌤 Weather</a>
  <a class="menu-link" href="/fx">💱 Currency Exchange</a>
  <a class="menu-link" href="/phrases">💬 Local Phrases</a>
  <a class="menu-link" href="#">📰 News</a>
</nav>

</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}