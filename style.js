const loginForm = document.getElementById('login-form');
const logout_form = document.getElementById('logout-form');
logout_form.style.display = 'none';
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let user = loginForm.user.value
    let password = loginForm.password.value
    const datauser = {user: user, password: password}
    loginsuccess(datauser);
})
const btn_menu = document.querySelector('.material-symbols-outlined');
const menu_left = document.querySelector('.menu-left');
const close_menu_left = document.getElementById('close-menu-left');
btn_menu.addEventListener('click',(e)=>{
    menu_left.style.display = 'block';
    btn_menu.style.display = 'none';
})
close_menu_left.addEventListener('click', (e)=>{
    menu_left.style.display = 'none';
    btn_menu.style.display = 'block';
});
function loginsuccess(datauser){
    if (datauser.user === 'passapol47' && datauser.password === '146990'){
        loginForm.style.display = 'none';
        logout_form.style.display = 'block';
        const user = document.getElementById('user');
        user.innerText = `user : ${datauser.user}`;
    }
}