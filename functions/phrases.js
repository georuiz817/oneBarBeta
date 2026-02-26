export async function onRequest(context) {
  const country = context.request.headers.get("CF-IPCountry") || "US";

  const phrasesDB = {
    TH: { country:"Thailand", language:"Thai", phrases:[
      ["Hello","Sawasdee","sa-wat-dee"],
      ["Thank you","Khob khun","kob-koon"],
      ["Help!","Chuay duay!","choo-ay duay"]
    ]},
    MY: { country:"Malaysia", language:"Malay", phrases:[
      ["Hello","Apa khabar","ah-pah kha-bar"],
      ["Thank you","Terima kasih","te-ree-ma ka-seh"],
      ["Help!","Tolong!","toh-long"]
    ]},
    MX: { country:"Mexico", language:"Spanish", phrases:[
      ["Hello","Hola","oh-lah"],
      ["Thank you","Gracias","grah-see-ahs"],
      ["Help!","¡Ayuda!","ah-yoo-dah"]
    ]}
  };

  let content = "No local phrases available.";
  if(phrasesDB[country]){
    const data = phrasesDB[country];
    content = `Location: ${data.country}\nLanguage: ${data.language}\n\n`;
    data.phrases.forEach((p,i)=>{
      content += `${i+1}. ${p[0]}\n   → ${p[1]}\n   → ${p[2]}\n\n`;
    });
  }

  return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ONE BAR Phrases</title>
<style>
body{background:black;color:white;font-family:monospace;}
a{color:white;}
</style>
</head>
<body>

<pre>
========================
   ONE BAR PHRASES
========================

${content}
</pre>

<p><a href="/">home</a></p>

</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}