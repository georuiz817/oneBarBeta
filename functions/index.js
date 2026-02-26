export async function onRequest(context) {
  const country = context.request.headers.get("CF-IPCountry") || "US";
  const countryDB = {
    FR: "France", ES: "Spain", US: "United States", MX: "Mexico",
    TH: "Thailand", MY: "Malaysia", JP: "Japan"
  };
  const countryName = countryDB[country] || "Unknown";

  return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ONE BAR</title>
<style>
body { background:black; color:white; font-family:monospace; line-height:1.2; }
a { color:white; text-decoration:underline; }
</style>
</head>
<body>

<pre>
==================
    ONE BAR ▁ ▂ ▃
==================
</pre>

<h4>Useful info when your service is bad. Good for travelers or locals.</h4>

<pre>
Current Country: ${countryName}
</pre>

<ol>
  <li><a href="/weather">Weather</a></li>
  <li><a href="/fx">Currency Exchange</a></li>
  <li><a href="/phrases">Local Phrases</a></li>
  <li><a href="#">News</a></li>
</ol>

</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}