const getUnfollowers = (followingJson, ...followersJson) => {
  // Precondition 1: input JSON must be in a properly format

  // Precondition 2: Check all json input files if user has more than one.

  // Merge all JSON files, which contain current user, in a single followers array.
  const followers = mergeAllFollowersJsonFiles(...followersJson)

  const followers_names = followers.map((follower) => follower.string_list_data[0].value)

  const following_names = followingJson.relationships_following.map(
    (following) => following.string_list_data[0].value
  )

  return following_names.filter((following) => !followers_names.includes(following))
}

/**
 * Merge all JSON files, which contain current user, in a single followers array.
 *
 * @param  {...any} followersJsonFiles Contains all JSON files which have current user followers.
 */
const mergeAllFollowersJsonFiles = (...followersJsonFiles) => {
  // merge all json files into one array with values
  return followersJsonFiles.reduce((acc, curr) => {
    return [...acc, ...curr]
  }, [])
}

export { getUnfollowers }
