let vodSearch = async (data,callback)=>{
    let cheerio = require('cheerio')
    let movieList = new Array();
    console.log(data)
    // let data = req.body;
    let url = `https://www.justwatch.com/kr/검색?q=${data.search}`
    url = encodeURI(url)
    const {Builder,By,Key,until} = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);
        //driver가 정상적으로 작동하기 위해 sleep으로 잠시 멈춤
        await driver.wait(until.elementLocated(By.tagName('ion-row')),10000).then(async ()=>{

            let html = await driver.getPageSource()

            let $ = cheerio.load(html)
            let $searchmovie = $('#base > div.jw-container > div > div.tabs-inner > ion-tab > ion-content > div.title-list > div > div > div.title-list-row > ion-grid > div > ion-row')
            console.log($searchmovie.length)
            $searchmovie.map((i, elem)=>{
                let monetizations = $(elem).find('.monetizations')
                let tuples = new Object();
                try {
                    if (monetizations.text().trim() != '') {
                        ///////////////////////
                        tuples['title'] = $(elem).find('.title-list-row__row__title').text().trim()
                        tuples['poster'] = $(elem).find('.title-poster picture img').attr('src')
                        let stremalist = monetizations.find('.price-comparison__grid__row--stream .price-comparison__grid__row__element')
                        // console.log(stremalist.length)
                        if (stremalist.length != 0) {
                            let sc = new Array()
                            for (let i = 0; i < stremalist.length; i++) {
                                let scob = new Object()
                                scob['image'] = $(stremalist[i]).find('.price-comparison__grid__row__icon').attr('src');
                                scob['price'] = $(stremalist[i]).find('.price-comparison__grid__row__price').text().trim();
                                scob['link'] = $(stremalist[i]).find('.price-comparison__grid__row__element__icon > a').attr('href');
                                // console.log("----------------------------")
                                // console.log(tuples['title'])
                                // console.log(scob)
                                sc.push(scob)
                                if (stremalist.length - 1 == i) {
                                    tuples['stream'] = sc
                                }
                            }
                        }

                        let rentallist = monetizations.find('.price-comparison__grid__row--ren .price-comparison__grid__row__element')
                        if (rentallist.length != 0) {
                            let br = new Array()
                            for (let i = 0; i < rentallist.length; i++) {
                                brob['image'] = $(rentallist[i]).find('.price-comparison__grid__row__icon').attr('src');
                                brob['price'] = $(rentallist[i]).find('.price-comparison__grid__row__price').text().trim();
                                brob['link'] = $(rentallist[i]).find('.price-comparison__grid__row__element__icon > a').attr('href');
                                br.push(brob)
                                if (rentallist.length - 1 == i) {
                                    tuples['rental'] = br
                                }
                            }
                        }
                        let buylist = monetizations.find('.price-comparison__grid__row--buy .price-comparison__grid__row__element')
                        if (buylist.length != 0) {
                            let by = new Array()
                            for (let i = 0; i < buylist.length; i++) {
                                let byob = new Object()
                                byob['image'] = $(buylist[i]).find('.price-comparison__grid__row__icon').attr('src');
                                byob['price'] = $(buylist[i]).find('.price-comparison__grid__row__price').text().trim();
                                byob['link'] = $(buylist[i]).find('.price-comparison__grid__row__element__icon > a').attr('href');
                                by.push(byob)
                                if (buylist.length - 1 == i) {
                                    tuples['buy'] = by
                                }
                            }

                        }

                    }
                }catch (e) {
                    throw e
                }finally {
                    if(tuples['title'] != null)movieList.push(tuples)
                }
                /////////////////////
            })
        })
    }catch (e) {
        throw e;
    }finally {
        callback(movieList)
        await driver.quit()
    }
}
module.exports = vodSearch