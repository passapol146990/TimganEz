const search = document.getElementById('search');
search.addEventListener('input',(e)=>{
    const div_item = document.getElementById('box_show_website');
    const div = div_item.querySelectorAll('div')
    e.preventDefault();
    let value = search.value
    div.forEach((item)=>{
        if(item.id.includes(value)){
            item.style.display = 'block';   
        }else{
            try{
                item.style.display = 'none';   
            } catch{}
        }
    })
})
