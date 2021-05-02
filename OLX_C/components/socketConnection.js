import io from 'socket.io-client'
let socket = io("https://olx-clone-ia.herokuapp.com", {
    autoConnect: false
})
export default socket