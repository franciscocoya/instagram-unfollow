import axios from 'axios'
import cheerio from 'cheerio'

const getUnfollowers = (followersArr, followingArr) => {

  const followerNames = followersArr.map((follower) => follower.value)

  return followingArr.filter((follower) => {
    return !followerNames.includes(follower.value)
  })
}

/**
 * Merge all JSON files, which contain current user, in a single followers array.
 *
 * @param  {...any} followersJsonFiles Contains all JSON files which have current user followers.
 */
const mergeMultipleArrays = (...arrs) => {
  // merge all json files into one array with values
  return arrs.reduce((acc, curr) => {
    return [...acc, ...curr]
  }, [])
}

/**
 * Retrieve the profile image URL from Instagram.
 *
 * @param {*} username From which user to retrieve the profile image URL.
 * @returns
 */
const getInstagramUserInfo = async (username) => {
  try {
    const response = await axios.get(`https://www.instagram.com/${username}`, {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    })
    const $ = cheerio.load(response.data)

    // Find the profile image URL in the HTML
    return $('meta[property="og:image"]').attr('content')
  } catch (error) {
    console.error('Error fetching profile image:', error)
    return null
  }
}

export { getUnfollowers, getInstagramUserInfo, mergeMultipleArrays }
