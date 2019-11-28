
const weatherFrom = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")




weatherFrom.addEventListener("submit", (e)=>{
    e.preventDefault()
    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    const location = search.value
    console.log(location)

    const url = '/weather?address=' + location

    fetch(url).then((response) => {
    response.json().then((data) => {

        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ""
            //console.log(data.error)
        }
        else{
            //console.log(data.location, data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})