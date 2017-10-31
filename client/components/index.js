/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main.jsx'
export { default as UserHome } from './user-home.jsx'
export { Login, Signup } from './auth-form.jsx'
export { default as Home } from './home.jsx'
export { default as Navigation } from './navigation.jsx'
export { default as AllAlbums } from './allalbums.jsx'
export { default as AlbumCard } from './albumcard.jsx'

