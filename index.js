

const dropdownEl = document.getElementById('colors')
const getBtn = document.getElementById('get-btn')
let colorsArray = []
window.addEventListener('DOMContentLoaded',()=>{
    renderColors()
})
getBtn.addEventListener('click', renderColors)

function renderColors(){
    let selectedColor = document.getElementById('color-picker').value
    selectedColor = selectedColor.split('').filter((char)=>{return char!='#'}).join('')
    let scheme = dropdownEl.value
    
    console.log(selectedColor)
    let url = `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${scheme}&count=5`
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let schemeColors = data.colors
            let colorsArray = schemeColors.map((color)=>{return color.hex.value})
            let sectionEl = document.getElementById('section')
            let colorsHtml = ''
            for(hex of colorsArray){
                colorsHtml += `
                <div class="rectangle" id = '${hex}'>
                    <div class="color" style = 'background: ${hex}'></div>
                    <div class="color-hex">${hex}</div>
                </div>`
            }
            sectionEl.innerHTML = colorsHtml


            let array = document.getElementsByClassName('rectangle')
            for(element of array){
                element.addEventListener('click',()=>{
                navigator.clipboard.writeText(element.id)
                let popup = document.getElementById('popup')
                popup.style.display = 'block';
                setTimeout(()=>{popup.style.display = 'none'},1000)
             })
            }
        })
    
}


