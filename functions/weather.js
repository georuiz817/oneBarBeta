export async function onRequest(context) {
  const req = context.request;
  const lat = req.headers.get("CF-IPLatitude") || "40.7128";   // default NYC
  const lon = req.headers.get("CF-IPLongitude") || "-74.0060";
  const city = req.headers.get("CF-IPCity") || "Unknown";
  const country = req.headers.get("CF-IPCountry") || "";

  let weatherData = {};
  try{
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    weatherData = await res.json();
  }catch{}

  const weather = weatherData.current_weather || {};
  const tempC = weather.temperature || "N/A";
  const tempF = (typeof tempC==="number" ? ((tempC*9)/5+32).toFixed(1) : "N/A");
  const wind = weather.windspeed || "N/A";
  const code = weather.weathercode || "N/A";

  return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ONE BAR Weather</title>
<style>
body{background:black;color:white;font-family:monospace;}
a{color:white;}
</style>
</head>
<body>

<pre>
==================
    ONE BAR WX
==================

LOCATION: ${city}, ${country}
COND CODE: ${code}
TEMP: ${tempC} °C / ${tempF} °F
WIND: ${wind} km/h
</pre>

<p><a href="/">home</a></p>

</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}
