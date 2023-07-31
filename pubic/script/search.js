const search = document.getElementById('search');
const div_item = document.getElementById('div_item');
const div = div_item.querySelectorAll('div')
search.addEventListener('input',(e)=>{
    e.preventDefault();
    let value = search.value
    // if(value.length > 0){
        div.forEach((item)=>{
            if(item.id.includes(value)){
                div_item.insertBefore(item,div_item.firstChild)
            }else{
                try{
                    div_item.removeChild(item)   
                } catch{}
            }
        })
    // }
})
