// Tab Switching for Home Page Login Box
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        
        tabLogin.classList.add('text-[#005b9f]', 'border-b-2', 'border-[#005b9f]');
        tabLogin.classList.remove('text-gray-400');
        
        tabRegister.classList.add('text-gray-400');
        tabRegister.classList.remove('text-[#005b9f]', 'border-b-2', 'border-[#005b9f]');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        
        tabRegister.classList.add('text-[#005b9f]', 'border-b-2', 'border-[#005b9f]');
        tabRegister.classList.remove('text-gray-400');
        
        tabLogin.classList.add('text-gray-400');
        tabLogin.classList.remove('text-[#005b9f]', 'border-b-2', 'border-[#005b9f]');
    }
}