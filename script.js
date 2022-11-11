const axios = require("axios");
const cheerio = require("cheerio");

async function fetchData() {
  const BILETINIALURL = process.env.ACTIVITY_URL;

  try {
    const { data } = await axios.get(BILETINIALURL);
    const $ = await cheerio.load(data);
    const elemSelector =
      "body > main > div.listItems.container.mt-40.mb-40 > div > div.contents > div.contentGrid.flex.directionRowWrap.alignStart.justifyStart > div > a.flex.directionColumn.justifyStart.alignStart > div.eventContents";
    const keys = ["scene", "name", "address", "time"];
    let allActivity = [];

    $(elemSelector).each((i, e) => {
      let keyIndx = 0;
      const sceneObj = {};
      if (i <= 10) {
        $(e)
          .children()
          .each((si, se) => {
            const sceneData = $(se)
              .text()
              .replace(/[\r\n]/gm, "")
              .trim();
            if (se) {
              sceneObj[keys[keyIndx]] = sceneData;
              keyIndx++;
            }
          });
        allActivity.push({ id: i, ...sceneObj });
      }
    });
    return allActivity;
  } catch (error) {
    console.log(error, "---");
  }
}

module.exports = { fetchData };
