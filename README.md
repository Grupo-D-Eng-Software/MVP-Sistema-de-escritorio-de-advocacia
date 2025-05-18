# 🏛️ MVP - Sistema de Escritório de Advocacia

Este repositório contém o MVP (Produto Mínimo Viável) de um sistema desenvolvido para auxiliar advogados na gestão de seus clientes, prazos e audiências. O objetivo principal é proporcionar uma organização eficiente e um acesso rápido às informações relevantes do dia a dia jurídico.

## Funcionalidades Implementadas

### 🔐 Tela de Login. (Adão Eduardo)

#### 📲 **Métodos de Acesso**
- **Login por Email** com validação de formato
- **Login por Telefone** com máscara automática `(00) 00000-0000`

#### 📱 **Responsividade**
- Layout adaptável para mobile
- Design consistente com o sistema existente


### Cadastro de Usuario (Jaine Bento) 

#### 📝 Formulário Inteligente

- Validação em tempo real de campos obrigatórios (nome, CPF, OAB, e-mail, telefone, senha)
- Máscaras automáticas para CPF, telefone e número da OAB
- Campos específicos para nome social, gênero e áreas de atuação jurídica

#### 🔍 Busca Avançada (a ser implementada na interface principal)

- Pesquisas rápidas por nome, CPF, OAB ou e-mail
- Resultados instantâneos exibidos em tabela
- Filtro de múltiplas áreas de atuação com botão para limpar filtros

#### ⚖️ Dados Profissionais Específicos

- Cadastro completo da inscrição na OAB com identificação da seccional
- Campo para informar a subseção da OAB e endereço profissional

#### 🛠️ Ferramentas de Gestão

- Confirmação de exclusão de dados com segurança
- Campos de senha com validação de mínimo de caracteres

#### 🎨 Design Profissional

- Paleta de cores sóbria e elegante (#3C4C6C como cor principal)
- Tipografia combinando sofisticação (Merriweather nos títulos, Montserrat nos textos)
- Layout responsivo e otimizado para dispositivos móveis e tablets

### Recuperação de senha de login (Eudo)

Essa funcionalidade permite ao usuário recuperar a senha se login. O processo de recuperação
consiste em 3 etapas:

#### Etapa 01:
- O usuário insere seu E-mail de login;
- No campo de E-mail ocorre (por JS) a validação do E-mail inserido 
- Não foi implementado a validação para confirmar se o E-mail inserido esta no BD;
- Após validação do E-mail, é enviado um código de 6 digitos para o Email (simulação);
- O código pode ser visualizado no console do navegador.

#### Etapa 02:
- Com o código em mãos, o usuário deverar inseri-lo no campo com 6 inputs;
- Ocorre validação nesses campos para confirmar se foram preenchidos;
- Também ocorre validação para confirmar se o código inserido é igual ao enviado (console);
- Após essas validações, o usuário é encaminhado para 3 página.

#### Etapa 03:
- Na etapa 3 ocorre o cadastro da nova senha;
- O usuário deve seguir as orientações de senhas disponiveis na pagina;
- Ocorre validação para verificação da tamanho da senha;
- Ocorre validação para verificação das combinações de numeros, simbolos, e letras (A-z);

#### Boas práticas:
- Uso corretos das tags HTML;
- Separação de HTML, CSS e JavaScript;
- Link para o scrip em JS no final do Body;
- Uso de branchs para cada funcionalidade implementadas;
- Descrição clara de commits;
- Validações de campos de inputs;
- Mensagens de feedback para o usuário.


### Menu e Agenda. (Alexandra de Paula)

#### 🧽 Menu Principal
- Interface de navegação com layout limpo e profissional  
- Avatar da assistente virtual **Mia (IA)** no topo  
- Ícones interativos para acesso aos módulos:
  - Agenda
  - Clientes
  - Processos
  - JusBrasil (site oficial)  
- Campo de busca com ícone de filtro  
- Posts organizados com redirecionamentos visuais

#### 🗓️ Agenda Jurídica
- Calendário interativo com visualização por mês  
- Navegação entre meses com setas de controle  
- Destaque visual para o **dia atual**  
- Indicação de dias com atividades marcadas  
- Modal para criação de nova atividade com campos:
  - Título
  - Horário  
- Armazenamento de dados local via **localStorage**  
- Filtro de atividades em tempo real

#### 🔍 Busca de Atividades
- Campo de pesquisa que filtra por título  
- Resultados atualizados instantaneamente

#### 🛠️ Ferramentas de Gerenciamento
- Ícone intuitivo para adicionar novas tarefas  
- Alternância de cores entre os cartões (vermelho/azul)  
- Persistência das informações após recarregar a página  
- Botões de navegação fixos na parte inferior do app

#### 🎨 Styles
- Paleta de cor (**#2B446C**)  
- Tipografia moderna com **Montserrat**  
- Layout responsivo, adaptado para mobile


### Cadastro de clientes. (Adão Eduardo)
#### 📝 Formulário Inteligente
- Validação em tempo real de campos obrigatórios
- Máscaras automáticas para CPF e telefone
- Upload de múltiplos documentos (PDF/JPG/PNG)

#### 🔍 Busca Avançada
- Pesquisa por nome, CPF ou e-mail
- Resultados instantâneos na tabela
- Botão para limpar filtros

#### 📂 Gerenciamento de Documentos
- Visualização em modal organizada
- Download individual de arquivos
- Exibição de tipo e tamanho dos documentos

#### 🛠️ Ferramentas de Gestão
- Exclusão segura com confirmação
- Persistência de dados no navegador
- Tabela responsiva e ordenável

#### 🎨 Design
- Cores profissionais (#3C4C6C como primária)
- Tipografia Merriweather/Montserrat
- Totalmente responsivo para mobile

### Perfil do Cliente (Rayane Amaro)

#### 👤 Visualização Detalhada
- Exibição de todos os dados pessoais do cliente (nome, CPF, RG, nascimento)
- Informações de contato (telefone, e-mail, endereço)
- Link direto para o processo do cliente

#### 📄 Documentos do Cliente
- Listagem dos documentos anexados ao perfil
- Download e visualização rápida dos arquivos
- Exibição do tipo e tamanho de cada documento

#### 🛠️ Ações no Perfil
- Botão para editar dados do cliente
- Atualização dos documentos anexados
- Exclusão segura do perfil com confirmação

#### 🎨 Design
- Layout limpo e organizado, seguindo o padrão visual do sistema
- Responsivo para dispositivos móveis
- Ícone de voltar para o menu principal


## Tecnologias Utilizadas
Abaixo estão as tecnologias e ferramentas utilizadas no desenvolvimento deste projeto:

- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  
  Para a estruturação e semântica das páginas web.

- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
  Para a estilização e design responsivo, garantindo uma boa experiência em dispositivos móveis e desktop.

- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  
  Para a interatividade, validação de formulários e simulação de requisições ao backend.
  

## Equipe
| Equipe     | Grupo | Integrante                                  | Matrícula   |
|------------|--------|---------------------------------------------|-------------|
| Engenharia de Software | D      | Adão Eduardo Gomes de Oliveira           | 2023010692 |
| Engenharia de Software | D      | Alexandra Silva de Paula                 | 2023018832 |
| Engenharia de Software | D      | Jaine Bento dos Santos                   | 2023009646 |
| Engenharia de Software | D      | Antonio Harisson Alencar Ferreira        | 2023018770 |
| Engenharia de Software | D      | Francisco Eudo da Silva                  | 2023011967 |
| Engenharia de Software | D      | Rayane Amaro dos Santos                  | 2023010280 |


### Agradecimentos
Agradecemos ao professor **Ricardo Vilela** e à instituição **Universidade Federal do Cariri** por proporcionar o conhecimento e a oportunidade de desenvolver este projeto. Também agradecemos a todos que contribuíram direta ou indiretamente para a realização deste trabalho.

