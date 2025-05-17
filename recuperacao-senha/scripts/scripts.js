function validarEmail(email) {
  const testeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return testeEmail.test(email);
}

function irParaCodigo() {
      const email = document.getElementById('email').value;

      if (validarEmail(email)) {
        document.getElementById('tela-email').style.display = 'none';
        document.getElementById('tela-codigo').style.display = 'block';
      } else {
        alert("Por favor, insira um e-mail válido.");
        return;
      }

      
    }


   const inputs = document.querySelectorAll('.campo-cod input');

function inserirDigito(num) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      inputs[i].value = num;
      if (i < inputs.length - 1) inputs[i + 1].focus();
      break;
    }
  }
}

function removerDigito() {
  for (let i = inputs.length - 1; i >= 0; i--) {
    if (inputs[i].value !== '') {
      inputs[i].value = '';
      inputs[i].focus();
      break;
    }
  }
}

function getCodigoDigitado() {
  return Array.from(inputs).map(input => input.value).join('');
}

function verificarCodigo() {
  const codigo = getCodigoDigitado();
  if (codigo.length === 6) {
    document.getElementById('tela-codigo').style.display = 'none';
    document.getElementById('tela-nova-senha').style.display = 'block';
    document.getElementById('input1-senha').style.marginLeft = '25%'
    document.getElementById('input2-senha').style.marginLeft = '25%'
    document.getElementById('tela-codigo').style.textAlign = 'start'
  } else {
    alert('Digite os 6 dígitos.');
  }
}

function validarSenha(senha){
    const testeSenha = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#_%&])[A-Za-z\d@#_%&]{8,}$/;
    return testeSenha.test(senha);
}

function finalizar(){
    const senha1 = document.getElementById('input1-senha').value;
    const senha2 = document.getElementById('input2-senha').value;

    if (validarSenha(senha1)) {
        if (senha1 != senha2) {
            alert("As senhas são diferentes");
        } 
        else{             
            alert("Nova senha salva com sucesso!");
            window.location.href = "recuperacao.html";           
           
            }
       
    } else{
        alert("A senha deve ter no mínimo 8 caracteres, incluindo letra, número e caractere especial (@#_%&).");
     }
}
