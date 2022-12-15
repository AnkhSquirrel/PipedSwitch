window.browser = window.browser || window.chrome;

const YOUTUBE_URL = "https://www.youtube.com/";
const PIPED_URL = "https://piped.kavin.rocks/";

window.browser.contextMenus.create({
    "title": "Piped Switch",
    "onclick": Switch,
    "documentUrlPatterns": ['*://*.youtube.com/*', '*://piped.kavin.rocks/*']
})

function Switch(info) {
    const URL = info.pageUrl;
    let newUrl = URL;

    if (URL.includes(YOUTUBE_URL)) {
        newUrl = PIPED_URL + URL.split(YOUTUBE_URL)[1];
    } else if (URL.includes(PIPED_URL)) {
        newUrl = YOUTUBE_URL + URL.split(PIPED_URL)[1];
    }

    browser.tabs.update({
        url: newUrl,
    });
}
