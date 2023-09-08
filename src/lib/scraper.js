import { load } from 'cheerio'
import axios from 'axios'

const getInstagramAccountPublicInfo = async (username) => {
  const page = await axios.get(`https://www.instagram.com/${username}/`, {
    headers:{
        'Access-Control-Allow-Origin': '*'
    },
    params: {
      __a: 1
    }
  })
  console.log(page.data)

  //   const $ = load(page.data)

  //   const profileImage = $(
  //     'img.xpdipgo.x6umtig.x1b1mbwd.xaqea5y.xav7gou.xk390pu.x5yr21d.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x11njtxf.xh8yej3"]'
  //   ).attr('src')

  //   const fullName = $(
  //     'span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.xvs91rp.x1s688f.x5n08af.x10wh9bi.x1wdrske.x8viiok.x18hxmgj'
  //   ).text()

  //   return {
  //     profileImage,
  //     fullName
  //   }
}

export { getInstagramAccountPublicInfo }
