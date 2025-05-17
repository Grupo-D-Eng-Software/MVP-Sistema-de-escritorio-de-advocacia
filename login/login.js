document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const emailBtn = document.getElementById('emailBtn');
  const phoneBtn = document.getElementById('phoneBtn');
  const termsLink = document.getElementById('termsLink');
  const privacyLink = document.getElementById('privacyLink');
  const emailModal = document.getElementById('emailModal');
  const phoneModal = document.getElementById('phoneModal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const emailForm = document.getElementById('emailForm');
  const phoneForm = document.getElementById('phoneForm');
  
  // Abrir modal de email
  emailBtn.addEventListener('click', function() {
    emailModal.style.display = 'block';
  });
  
  // Abrir modal de telefone
  phoneBtn.addEventListener('click', function() {
    phoneModal.style.display = 'block';
  });
  
  // Fechar modais
  closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      emailModal.style.display = 'none';
      phoneModal.style.display = 'none';
    });
  });
  
  // Fechar modais ao clicar fora
  window.addEventListener('click', function(event) {
    if (event.target === emailModal) {
      emailModal.style.display = 'none';
    }
    if (event.target === phoneModal) {
      phoneModal.style.display = 'none';
    }
  });
  
  // Links de termos e privacidade
  termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Termos e Condições serão exibidos aqui');
  });
  
  privacyLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Política de Privacidade será exibida aqui');
  });
  
  // Validação do formulário de email
  emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    if (!validateEmail(email)) {
      alert('Por favor, insira um email válido');
      return;
    }
    
    // Armazena o estado de login e redireciona
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    window.location.href = '../menu/index.html';
  });
  
  // Validação do formulário de telefone
  phoneForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    const phoneDigits = phone.replace(/\D/g, '');
    
    if (!validatePhone(phoneDigits)) {
      alert('Por favor, insira um telefone válido');
      return;
    }
    
    // Armazena o estado de login e redireciona
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userPhone', phoneDigits);
    window.location.href = '../menu/index.html';
  });
  
  // Máscara para telefone
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 0) {
        value = '(' + value;
      }
      if (value.length > 3) {
        value = value.substring(0, 3) + ') ' + value.substring(3);
      }
      if (value.length > 10) {
        value = value.substring(0, 10) + '-' + value.substring(10, 15);
      }
      if (value.length > 15) {
        value = value.substring(0, 15);
      }
      
      e.target.value = value;
    });
  }
  
  // Funções de validação
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePhone(phone) {
    return phone.length >= 10 && phone.length <= 11;
  }

  // Verifica se já está logado (evita mostrar login desnecessário)
  if (sessionStorage.getItem('loggedIn')) {
    window.location.href = '../menu/index.html';
  }
});