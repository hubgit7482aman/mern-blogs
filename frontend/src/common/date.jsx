// latest blog k liye each blog ki published data bhi honi chahiye
// javascript function Date().month -> will give you number but we want word(like jan,feb) we need to map numbers to these words

let months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const getDay = (timestamp) => {
  let date = new Date(timestamp);
 return `${date.getDate()} ${months[date.getMonth()]}`
}

export const getFullDay = (timestamp) => {
  let date = new Date(timestamp);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}