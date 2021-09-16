const puppeteer = require('puppeteer');

function infoToArray(a){
    if(Array.isArray(a)){
        for(const e of a ){
            if(e.v){
                const stockInfo = e.v[1] || null;
                if(!null && stockInfo.toString().startsWith('T')){
                    const splitted = stockInfo.split('|');
                    return splitted;
                } 
            }
        }
    }
}

function formatToObject(a){
    if(Array.isArray(a)){
        const [timestamp, price,,, volume] = a;
        return {
            timestamp, price, volume
        }
    }
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('requestfinished', async (request) => {
        if(request.url().startsWith('')){ // ADD URL
        var response = await request.response();
        try {
            if (request.redirectChain().length === 0) {
                var responseBody = await response.buffer();
                const jsonObject = JSON.parse(responseBody.toString());


                const a = infoToArray(jsonObject);
                if(a){
                    // Example
                    console.log(formatToObject(a));
                }
                
            }
        }catch (err) { console.log(err); }
    }
    });
    page.on('request', request => {
        request.continue();
  });
  await page.goto(''); // ADD URL
})();