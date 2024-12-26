# Argous

Desenvolva e contrua uma rede social semelhante a platforma X (antigo twitter). Desenvolva e contrua o CRUD básico para o envio de postagens, registro de usuário e criação de comentarios em posts (Sub postagens). A plataforma deve realizar o gerenciamento de amigos.

## Requisitos Funcionais

### Autenticação e Autorização

- [ ] Permitir registro de usuários com validação de e-mail.
- [ ] Autenticação via login e senha com suporte a tokens de acesso (JWT).
- [ ] Suporte a autenticação por terceiros (OAuth 2.0, como Google, Facebook, etc.).
- [ ] Gerenciamento de sessões ativas e logout seguro.

### Gerenciamento de Usuários

- [ ] CRUD (Criar, Ler, Atualizar, Deletar) de perfis de usuários.
- [ ] Upload de avatar e gerenciamento de imagens de perfil.
- [ ] Exibir e editar informações básicas do perfil (nome, bio, localização, etc.).
- [ ] Funcionalidade para seguir e deixar de seguir outros usuários.

### Postagens

- [ ] Criar postagens de texto com limite de caracteres (e.g., 280 caracteres).
- [ ] Suporte a anexos em postagens (imagens, vídeos, links).
- [ ] Sistema de curtidas em postagens.
- [ ] Sistema de repostagens (similar a "retweets").
- [ ] Listagem de postagens do usuário e da linha do tempo personalizada.

### Linha do Tempo

- [ ] Exibir postagens de usuários seguidos, ordenadas por data (mais recente primeiro).
- [ ] Suporte a filtros de visualização (e.g., postagens populares, mais recentes).
- [ ] Atualizações em tempo real (via WebSocket ou tecnologias similares).

### Interações

- [ ] Permitir comentários em postagens.
- [ ] Sistema de notificação em emails para interações (curtidas, comentários, repostagens, novos seguidores). (Opcional);

### Infraestrutura e Integração

- [ ] API RESTful documentada para integração com frontend.
- [ ] Suporte a WebSocket para eventos em tempo real.
- [ ] Armazenamento eficiente para arquivos de mídia (imagens e vídeos).
- [ ] Logs e monitoramento de performance e erros.

## Preocupações de design pattern e segurança

A aplicação deve ser construída respeitando os conceitos básicos de SOLID, Repository Patern e Clean Code ( Seguindo a filosofia do Uncle BOB);

### Aplicação de Clean Code

O "Blue Book" do Uncle BOB define uma série de conceitos que deveriam ser adotados para a escrita de um código limpo e legível para a maioria dos programadores. Neste projeto será necessário a utilização de um dos conceitos dessa filosofia. O principal deles a ser adotado no projeto será a fragmentação da API em camadas separadas.

[Pasted](images/image_20241212100036.png)

### Testagem automatizada do VITE

Ao aplicar os conceitos descritos pelo Uncle Bob o desenvolvimento de uma suit de testagem para a aplicação não se torna dificil. A testagem automatizada permite que o programador tome noticia de erros dentro da sua aplicação antes mesmo que eles prejudiquem alguma parte crucial. Desenvolver testes automatizadas dá ao programador a garantia de que cada camada da aplicação está em funcionamento da maneira que deveria.  Cada camada da aplicação deve receber um grupo de testagem, porem neste projeto basta desenvolver a chamada "testagem unitaria" nos Casos de Uso da aplicação.

### Aplicação do SOLID

Solid é um dos principais pilares para escrever um código legível para a maioria das pessoas. Os principais conceitos a serem aplicados neste projeto são: Single "Responsability Principle" e a "Dependency Inversion"
[Pasted](images/image_20241212100534.png)

## Métodos de requisição

O funcionamento padrão da aplicação (incluindo o fluxo de postagens e criação de usuários) pode ser desenvolvido aplicando o método de requisição padrão (RESTFUL), porém, para cumprir o objetivo de um chat em tempo real, utilizamos um outro método de requisição asyncrona conhecido como WebSockets que permitem a comunicação em tempo real entre p servidor e o cliente.

- Para o funcionamento básico da aplicação desenvolva um api RESTFUL com as funcionalidades descritas acima.
- Para o funcionamento do chat em tempo real utilize a tecnologia dos WebSockets (sugiro utilizar o socket.io).
