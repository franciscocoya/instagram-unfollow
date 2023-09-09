// import { chromium } from 'playwright'

const getInstagramAccountInfoByUsername = async (username) => {
  // const browser = await chromium.launch({ headless: true })
  // const context = await browser.newContext()
  // const page = await context.newPage()
  // await page.goto(`https://www.instagram.com/${username}/`)
  // await page.waitForSelector('div.-vDIg')
  // const accountInfo = await page.evaluate(() => {
  //   const accountInfo = {}
  //   accountInfo.username = document.querySelector('h1').innerText
  //   accountInfo.profileImage = document.querySelector('img').src
  //   accountInfo.posts = document.querySelector('span.g47SY').innerText
  //   accountInfo.followers = document.querySelector(
  //     'a[href="/franciscocoya/followers/"] > span'
  //   ).innerText
  //   accountInfo.following = document.querySelector(
  //     'a[href="/franciscocoya/following/"] > span'
  //   ).innerText
  //   accountInfo.bio = document.querySelector('div.-vDIg > span').innerText
  //   return accountInfo
  // })
  // await browser.close()

  // console.log('accountInfo', accountInfo)
  // return accountInfo
}

export { getInstagramAccountInfoByUsername }
