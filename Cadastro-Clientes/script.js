document.addEventListener('DOMContentLoaded', function() {
  let clients = JSON.parse(localStorage.getItem('advocaciaClientes')) || [];
  
  const clientForm = document.getElementById('clientForm');
  const clientTableBody = document.getElementById('clientTableBody');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const documentsModal = document.getElementById('documentsModal');
  const closeModal = document.querySelector('.close-modal');
  const documentsList = document.getElementById('documentsList');
  
  renderClientTable(clients);
  
  clientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      const formData = new FormData(clientForm);
      const clientData = {
        id: Date.now().toString(),
        nome: formData.get('nome'),
        cpf: formData.get('cpf'),
        rg: formData.get('rg'),
        nascimento: formData.get('nascimento'),
        telefone: formData.get('telefone'),
        email: formData.get('email'),
        endereco: formData.get('endereco'),
        processo: formData.get('processo'),
        documentos: []
      };
      
      const files = document.getElementById('documentos').files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
          clientData.documentos.push({
            name: file.name,
            type: file.type,
            size: file.size,
            data: e.target.result.split(',')[1]
          });
          
          if (i === files.length - 1) {
            saveClient(clientData);
          }
        };
        
        reader.readAsDataURL(file);
      }
      
      if (files.length === 0) {
        saveClient(clientData);
      }
    }
  });
  
  function saveClient(clientData) {
    clients.push(clientData);
    localStorage.setItem('advocaciaClientes', JSON.stringify(clients));
    renderClientTable(clients);
    clientForm.reset();
    alert('Cliente cadastrado com sucesso!');
  }
  
  function validateForm() {
    let isValid = true;
    const requiredFields = clientForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      const errorMessage = field.nextElementSibling;
      
      if (!field.value.trim()) {
        errorMessage.style.display = 'block';
        isValid = false;
      } else {
        errorMessage.style.display = 'none';
      }
    });
    
    const cpfField = document.getElementById('cpf');
    if (cpfField.value && !validateCPF(cpfField.value)) {
      alert('CPF inválido!');
      isValid = false;
    }
    
    const emailField = document.getElementById('email');
    if (emailField.value && !validateEmail(emailField.value)) {
      alert('Por favor, insira um e-mail válido!');
      isValid = false;
    }
    
    return isValid;
  }
  
  function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
    
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
        return false;
        
    let add = 0;
    for (let i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
        
    add = 0;
    for (let i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
        
    return true;
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function renderClientTable(clientsToRender) {
    clientTableBody.innerHTML = '';
    
    if (clientsToRender.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="5" style="text-align: center;">Nenhum cliente cadastrado</td>`;
      clientTableBody.appendChild(row);
      return;
    }
    
    clientsToRender.forEach(client => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${client.nome}</td>
        <td>${formatCPF(client.cpf)}</td>
        <td>${client.telefone || '-'}</td>
        <td>${client.email || '-'}</td>
        <td>
          <button class="btn btn-view-profile" data-id="${client.id}">Ver Perfil</button>
          <button class="btn btn-delete" data-id="${client.id}">Excluir</button>
        </td>
      `;
      clientTableBody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-view-profile').forEach(btn => {
      btn.addEventListener('click', function() {
        viewProfile(this.getAttribute('data-id'));
      });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function() {
        deleteClient(this.getAttribute('data-id'));
      });
    });
  }
  
  function formatCPF(cpf) {
    if (!cpf) return '-';
    cpf = cpf.replace(/[^\d]+/g,'');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  
  function viewProfile(clientId) {
    sessionStorage.setItem('currentClientId', clientId);
    window.location.href = 'perfil-cliente.html';
  }
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function deleteClient(clientId) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      clients = clients.filter(c => c.id !== clientId);
      localStorage.setItem('advocaciaClientes', JSON.stringify(clients));
      renderClientTable(clients);
    }
  }
  
  closeModal.addEventListener('click', function() {
    documentsModal.style.display = 'none';
  });
  
  window.addEventListener('click', function(e) {
    if (e.target === documentsModal) {
      documentsModal.style.display = 'none';
    }
  });
  
  searchBtn.addEventListener('click', searchClients);
  clearSearchBtn.addEventListener('click', function() {
    searchInput.value = '';
    renderClientTable(clients);
  });
  
  function searchClients() {
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) {
      renderClientTable(clients);
      return;
    }
    
    const filteredClients = clients.filter(client => 
      client.nome.toLowerCase().includes(searchTerm) ||
      (client.cpf && client.cpf.includes(searchTerm)) ||
      (client.email && client.email.toLowerCase().includes(searchTerm))
    );
    
    renderClientTable(filteredClients);
  }
  
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 3) {
      value = value.replace(/^(\d{3})/, '$1.');
    }
    if (value.length > 7) {
      value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
    }
    if (value.length > 11) {
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
    }
    if (value.length > 14) {
      value = value.substring(0, 14);
    }
    
    e.target.value = value;
  });
  
  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = '(' + value;
    }
    if (value.length > 3) {
      value = value.substring(0, 3) + ') ' + value.substring(3);
    }
    if (value.length > 10) {
      value = value.substring(0, 10) + '-' + value.substring(10, 14);
    }
    if (value.length > 15) {
      value = value.substring(0, 15);
    }
    
    e.target.value = value;
  });
});

// Código para a página perfil-cliente.html
if (window.location.pathname.includes('perfil-cliente.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    const clientId = sessionStorage.getItem('currentClientId');
    let clients = JSON.parse(localStorage.getItem('advocaciaClientes')) || [];
    let client = clients.find(c => c.id === clientId);

    const clientProfile = document.getElementById('clientProfile');
    const editProfileForm = document.getElementById('editProfileForm');
    const formEditarPerfil = document.getElementById('formEditarPerfil');
    const cancelEditBtn = document.getElementById('cancelEdit');

    function preencherPerfil() {
      document.getElementById('clientName').textContent = client.nome;
      document.getElementById('clientCpf').textContent = formatCPF(client.cpf);
      document.getElementById('clientRg').textContent = client.rg || '-';
      document.getElementById('clientNascimento').textContent = client.nascimento || '-';
      document.getElementById('clientTelefone').textContent = client.telefone || '-';
      document.getElementById('clientEmail').textContent = client.email || '-';
      document.getElementById('clientEndereco').textContent = client.endereco || '-';
      const processoLink = document.getElementById('clientProcesso');
      if (client.processo) {
        processoLink.href = client.processo;
        processoLink.textContent = 'Abrir Processo';
      } else {
        processoLink.textContent = 'Não informado';
        processoLink.removeAttribute('href');
      }
      const documentsContainer = document.getElementById('clientDocuments');
      documentsContainer.innerHTML = '';
      if (client.documentos && client.documentos.length > 0) {
        client.documentos.forEach(doc => {
          const docCard = document.createElement('div');
          docCard.className = 'document-card';
          docCard.innerHTML = `
            <h4>${doc.name}</h4>
            <p>Tipo: ${doc.type}</p>
            <p>Tamanho: ${formatFileSize(doc.size)}</p>
            <a href="data:${doc.type};base64,${doc.data}" download="${doc.name}" class="btn">
              Baixar Documento
            </a>
          `;
          documentsContainer.appendChild(docCard);
        });
      } else {
        documentsContainer.innerHTML = '<p>Nenhum documento anexado.</p>';
      }
    }

    function preencherFormularioEdicao() {
      document.getElementById('editNome').value = client.nome || '';
      document.getElementById('editCpf').value = client.cpf || '';
      document.getElementById('editRg').value = client.rg || '';
      document.getElementById('editNascimento').value = client.nascimento || '';
      document.getElementById('editTelefone').value = client.telefone || '';
      document.getElementById('editEmail').value = client.email || '';
      document.getElementById('editEndereco').value = client.endereco || '';
      document.getElementById('editProcesso').value = client.processo || '';
    }

    if (client) {
      preencherPerfil();
      document.getElementById('editProfile').addEventListener('click', function() {
        preencherFormularioEdicao();
        clientProfile.style.display = 'none';
        editProfileForm.style.display = 'block';
      });
      cancelEditBtn.addEventListener('click', function() {
        editProfileForm.style.display = 'none';
        clientProfile.style.display = 'block';
      });
      formEditarPerfil.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validação dos campos obrigatórios
        const requiredFields = formEditarPerfil.querySelectorAll('[required]');
        let isValid = true;
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
          } else {
            field.style.borderColor = '';
          }
        });
        if (!isValid) {
          alert('Preencha todos os campos obrigatórios!');
          return;
        }
        // Validação de formatos
        if (!validateCPF(document.getElementById('editCpf').value)) {
          alert('CPF inválido!');
          return;
        }
        if (!validateEmail(document.getElementById('editEmail').value)) {
          alert('E-mail inválido!');
          return;
        }
        // Atualizar dados do cliente
        client.nome = document.getElementById('editNome').value;
        client.cpf = document.getElementById('editCpf').value;
        client.rg = document.getElementById('editRg').value;
        client.nascimento = document.getElementById('editNascimento').value;
        client.telefone = document.getElementById('editTelefone').value;
        client.email = document.getElementById('editEmail').value;
        client.endereco = document.getElementById('editEndereco').value;
        client.processo = document.getElementById('editProcesso').value;
        // Anexar novos documentos
        const files = document.getElementById('editDocumentos').files;
        if (files.length > 0) {
          client.documentos = client.documentos || [];
          let filesProcessed = 0;
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function(e) {
              client.documentos.push({
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result.split(',')[1]
              });
              filesProcessed++;
              if (filesProcessed === files.length) {
                salvarEdicao();
              }
            };
            reader.readAsDataURL(file);
          }
        } else {
          salvarEdicao();
        }
        function salvarEdicao() {
          // Atualiza o cliente no array e no localStorage
          const idx = clients.findIndex(c => c.id === client.id);
          if (idx !== -1) {
            clients[idx] = client;
            localStorage.setItem('advocaciaClientes', JSON.stringify(clients));
            preencherPerfil();
            editProfileForm.style.display = 'none';
            clientProfile.style.display = 'block';
            alert('Perfil atualizado com sucesso!');
          }
        }
      });
    } else {
      alert('Cliente não encontrado!');
      window.location.href = 'index.html';
    }
  });

  function formatCPF(cpf) {
    if (!cpf) return '-';
    cpf = cpf.replace(/[^\d]+/g,'');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
        return false;
    let add = 0;
    for (let i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (let i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
  }
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}