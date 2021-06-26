import io from 'socket.io-client'
let socket = io("https://olx-type.herokuapp.com", {
    autoConnect: false
})
export default socket