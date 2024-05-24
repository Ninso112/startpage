/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"etsy":"https://www.etsy.com/","pih":"pi.hole","amazon":"https://www.amazon.de/","reto":"https://www.twitch.tv/retoxan","drive":"https://drive.google.com/drive/my-drive","twitch":"https://www.twitch.tv/?lang=de","github":"https://github.com/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "https://search.brave.com/search?q{query}"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
  github: "https://github.com/",
  twitch: "https://www.twitch.tv/?lang=de",
  drive: "https://drive.google.com/drive/my-drive",
  reto: "https://www.twitch.tv/retoxan",
  amazon: "https://www.amazon.de/"
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"6CtZQAtbk9suCtLg","label":"Reddit","bookmarks":[{"id":"XR7iyTKAjsmYW9l6","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"Odbk7kWT9DMtvpz0","label":"r/ich_iel","url":"https://www.reddit.com/r/ich_iel/"},{"id":"bFZKT5F2oPgfYPwH","label":"r/pcmasterrace","url":"https://www.reddit.com/r/pcmasterrace/"}]},{"id":"aamEjkY0mqaMlG85","label":"Video","bookmarks":[{"id":"Is2COyG0QJzElNQ1","label":"Youtube","url":"https://www.youtube.com/"},{"id":"cOb8ZYdlmEAn5Q4m","label":"Twitch","url":"https://www.twitch.tv/"},{"id":"ROhWMP7t3bFTUOJm","label":"Twitch Reto","url":"https://dashboard.twitch.tv/u/retoxan/stream-manager"}]},{"id":"0ryTe5XCsIvlMZ3L","label":"Streaming/TV","bookmarks":[{"id":"nMT0HMdkFJeG41NK","label":"Crunchyroll","url":"https://www.crunchyroll.com/de/"},{"id":"WfpeXzU5WnNyzxdS","label":"Netflix","url":"https://www.netflix.com/browse"},{"id":"ynQPJvys69qCskWZ","label":"Prime Video","url":"https://www.amazon.de/Amazon-Video/b?node=3010075031"},{"id":"qGjmkgKGY7mZ7Fkg","label":"Disney+","url":"https://www.disneyplus.com/de-de/home"}]},{"id":"weCsafXJ5ZlLfQfK","label":"Server","bookmarks":[{"id":"fh4gPD2KVimA4UBq","label":"Unraid","url":"http://192.168.178.42/login"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
