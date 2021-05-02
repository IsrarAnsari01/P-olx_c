const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
let currentHour = date.getHours();
let formatter = "AM"
if (date.getHours() > 12) {
    currentHour -= 12
    formatter = "PM"
}
let currentTimeIn12HrFormat = `${currentHour}:${date.getMinutes()}:${date.getSeconds()} ${formatter}`
const TodayDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()+ ": " +currentTimeIn12HrFormat;
console.log(TodayDate)