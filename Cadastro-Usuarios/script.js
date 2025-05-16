document.addEventListener('DOMContentLoaded', function() {
    // Armazenamento de clientes (simulando um banco de dados)
    let clients = JSON.parse(localStorage.getItem('advocaciaClientes')) || [];
    
    // Elementos do DOM
    const clientForm = document.getElementById('clientForm');
    const clientTableBody = document.getElementById('clientTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const documentsModal = document.getElementById('documentsModal');
    const closeModal = document.querySelector('.close-modal');
    const documentsList = document.getElementById('documentsList');
    
    // Inicializar a tabela de clientes
    renderClientTable(clients);
    
    // Evento de submit do formulário
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
          documentos: []
        };
        
        // Processar arquivos anexados
        const files = document.getElementById('documentos').files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          
          reader.onload = function(e) {
            clientData.documentos.push({
              name: file.name,
              type: file.type,
              size: file.size,
              data: e.target.result.split(',')[1] // Armazena apenas a parte base64
            });
            
            // Quando todos os arquivos forem processados, salva o cliente
            if (i === files.length - 1) {
              saveClient(clientData);
            }
          };
          
          reader.readAsDataURL(file);
        }
        
        // Se não houver arquivos, salva o cliente imediatamente
        if (files.length === 0) {
          saveClient(clientData);
        }
      }
    });
    
    // Função para salvar cliente
    function saveClient(clientData) {
      clients.push(clientData);
      localStorage.setItem('advocaciaClientes', JSON.stringify(clients));
      renderClientTable(clients);
      clientForm.reset();
      alert('Cliente cadastrado com sucesso!');
    }
    
    // Função para validar o formulário
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
      
      // Validação adicional do CPF
      const cpfField = document.getElementById('cpf');
      if (cpfField.value && !validateCPF(cpfField.value)) {
        alert('CPF inválido!');
        isValid = false;
      }
      
      return isValid;
    }
    
    // Função para validar CPF (simplificada)
    function validateCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g,'');
      if(cpf == '') return false;
      
      // Elimina CPFs invalidos conhecidos
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
          
      // Valida 1o digito
      let add = 0;
      for (let i=0; i < 9; i ++)
          add += parseInt(cpf.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
          rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
          return false;
          
      // Valida 2o digito
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
    
    // Função para renderizar a tabela de clientes
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
            <button class="btn btn-view-docs" data-id="${client.id}">Ver Documentos</button>
            <button class="btn btn-delete" data-id="${client.id}">Excluir</button>
          </td>
        `;
        clientTableBody.appendChild(row);
      });
      
      // Adicionar eventos aos botões
      document.querySelectorAll('.btn-view-docs').forEach(btn => {
        btn.addEventListener('click', function() {
          viewDocuments(this.getAttribute('data-id'));
        });
      });
      
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
          deleteClient(this.getAttribute('data-id'));
        });
      });
    }
    
    // Função para formatar CPF
    function formatCPF(cpf) {
      if (!cpf) return '-';
      cpf = cpf.replace(/[^\d]+/g,'');
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    
   
    // Máscara para CPF
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
    
    // Máscara para telefone
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