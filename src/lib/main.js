import axios from 'axios'

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

}

export { getUnfollowers, getInstagramUserInfo, mergeMultipleArrays }
