const search = document.getElementById('search');
search.addEventListener('input',(e)=>{
    e.preventDefault();
    console.log(search.value)
})