
/*I couldnt figure out why they werent scraping from the sites. But here is my code attempt */ 

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
async function scrapeBulletin() {
    const url = 'https://bulletin.du.edu/undergraduate/coursedescriptions/comp/';
    const {data} = await axios.get(url, {
        headers: {'User-Agent': 'Mozilla/5.0' } //pretend to be a browser
    });

    const $ = cheerio.load(data);
    const courses = [];

    await fs.outputJson('results/bulletin.json', { courses }, { spaces: 2 });
    console.log("created bulletin.json ");
}

async function scrapeAthletics() {
    const url = 'https://denverpioneers.com/index.aspx';
    const { data } = await axios.get(url, {
        headers: {'User-Agent':'Mozilla/5.0' } 
    });
    const $ = cheerio.load(data);
    const events = [];
    await fs.outputJson('results/athletic_events.json', { events}, { spaces: 2 });
    console.log("created athletic_events.json");
}
async function scrapeCalendar() {
    const url ='https://www.du.edu/calendar';
    const { data } = await axios.get(url, {
        headers: {'User-Agent':'Mozilla/5.0' }
    });

    const $= cheerio.load(data);
    const events = [];

    await fs.outputJson('results/calendar_events.json',{events }, { spaces: 2});
    console.log("created calendar_events.json");
}
(async () => {
    await scrapeBulletin();
    await scrapeAthletics();
    await scrapeCalendar();
})();
