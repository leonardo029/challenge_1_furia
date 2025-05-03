# FURIA CS | Challenge 1

![FURIA Logo](/assets/images/logoFuria.svg)

Este projeto é um chat iterativo criado para fãs do time de CS da FURIA. Desafio Técnico da FURIA Tech para a vaga de Assistente de Engenharia de Software.

## 📋 Sobre o Projeto

Este projeto é uma landing page para o time FURIA CS (Counter-Strike) que inclui um chatbot interativo. O site apresenta um design moderno com as cores da FURIA (preto e branco), permitindo que os fãs obtenham informações sobre o time através de um assistente virtual alimentado por inteligência artificial.

O chatbot é construído usando uma integração com n8n e o modelo GPT-4o-mini da OpenAI, configurado especificamente para responder perguntas sobre a organização FURIA Esports, seus times, jogadores e competições.

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Lucide React](https://lucide.dev/) - Biblioteca de ícones
- [React Markdown](https://github.com/remarkjs/react-markdown) - Renderização de Markdown
- [UUID](https://github.com/uuidjs/uuid) - Geração de identificadores únicos
- [n8n](https://n8n.io/) - Plataforma de automação para processamento das mensagens do chat

## ⚙️ Pré-requisitos

- Node.js (versão recomendada: 18.x ou superior)
- npm ou yarn

## 🔧 Instalação e Configuração

```bash
# Clone o repositório
git clone https://github.com/leonardo029/challenge_1_furia.git
cd challenge_1_furia

# Instale as dependências
npm install
# ou
yarn install
```

### Configuração do n8n (opcional)

Se você deseja configurar seu próprio webhook n8n para desenvolvimento ou personalização:

1. Crie uma conta ou faça login em [n8n.io](https://n8n.io/)
2. Importe o fluxo a partir do arquivo `furiaChat.json` 
3. Configure as credenciais da API OpenAI
4. Ative o fluxo e obtenha a URL do webhook
5. Atualize a URL no arquivo `src/services/chatService.ts`

```typescript
// Exemplo de como atualizar a URL no chatService.ts
sendMessage: async (message: string, sessionId: string = ''): Promise<string> => {
  try {
    const response = await fetch('SUA_URL_DO_WEBHOOK_N8N', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message,
        sessionId
      }),
    });
    // resto do código...
  }
}
```

## 🏃‍♂️ Como Executar

```bash
# Modo de desenvolvimento
npm run dev
# ou
yarn dev

# Build para produção
npm run build
# ou
yarn build

# Previsualizar build
npm run preview
# ou
yarn preview

# Executar linting
npm run lint
# ou
yarn lint
```

O site estará disponível em `http://localhost:5173` (ou na porta indicada no terminal).

### Webhook n8n

O projeto utiliza um webhook n8n para processar as mensagens do chat. O serviço está configurado no arquivo `chatService.ts` e aponta para o endpoint:

```
https://leonardomoreira.app.n8n.cloud/webhook/furia-chat
```

Este endpoint espera receber um objeto JSON com os campos:
- `message`: O texto da mensagem enviada pelo usuário
- `sessionId`: Um UUID para identificar a sessão do chat

O webhook retorna um objeto JSON contendo:
- `response`: Texto da resposta do bot

#### Estrutura do Fluxo n8n

O fluxo n8n implementa as seguintes etapas:
1. **Webhook**: Recebe solicitações POST na rota `/furia-chat`
2. **Validação**: Verifica se os campos obrigatórios `message` e `sessionId` estão presentes
3. **Processamento**: 
   - Extrai a mensagem e o ID de sessão do corpo da requisição
   - Envia a mensagem para um agente de IA configurado com o modelo OpenAI GPT-4o-mini
     - _**(Modelo esse referente a versão gratuita da OpenAi disponibilizada pela plataforma n8n)**_
   - O agente possui um sistema de memória para manter o contexto da conversa
   - É instruído a agir como um especialista na organização de esports Fúria e responder em português
4. **Resposta**: Retorna a resposta do agente de IA no formato JSON

O fluxo n8n inclui tratamento de erros para requisições inválidas, retornando um status 400 quando os campos obrigatórios não são fornecidos.

Nota: Para desenvolvimento local ou personalização, você pode precisar configurar seu próprio webhook n8n ou integrar com outro serviço de processamento de chat.

## 📦 Estrutura Principal do Projeto

```
challenge_1_furia/
├── assets/
│   └── images/ # Imagens usadas para estilizar a página web
│        ├── favicon.ico
│        └── logoFuria.svg
├── src/
│   ├── components/
│   │   ├── ChatButton.tsx          # Controla a lógica do chat e integração com o serviço
│   │   ├── ChatWindow.tsx          # Interface do chat
│   │   ├── MessageComponents.tsx   # Componentes de exibição de mensagens e indicador de carregamento
│   │   └── MessageInput.tsx        # Campo de entrada para novas mensagens
│   ├── services/
│   │   └── chatService.ts          # Serviço para comunicação com webhook n8n
│   ├── types/
│   │   └── types.ts                # Definições de tipos como a interface Message
│   ├── utils/
│   │   └── randomId.ts             # Utilitário para geração de IDs
│   ├── App.tsx                     # Componente principal da aplicação
│   ├── index.css                   # Estilos globais e customizações do Tailwind
│   └── main.tsx                    # Ponto de entrada da aplicação
├── .eslint.config.js               # Configuração do ESLint
├── furiaChat.json                  # Arquivo para configuração/importação do n8n
├── index.html                      # HTML de entrada
├── package.json                    # Dependências e scripts
├── postcss.config.js               # Configuração do PostCSS
├── tailwind.config.js              # Configuração do Tailwind CSS
├── tsconfig.json                   # Configuração do TypeScript
└── vite.config.ts                  # Configuração do Vite
```

## 🔍 Funcionalidades

### Landing Page
- Design responsivo com as cores da FURIA
- Exibição do logo e slogan (hipotético) da equipe
- Elementos visuais com efeitos de gradiente e sobreposição

### Chatbot
- Interface de chat intuitiva no canto inferior direito da tela
- Botão pulsante para chamar atenção dos usuários
- Processamento de mensagens via webhook n8n
- Suporte para formatação Markdown nas mensagens
- Indicador de digitação durante o carregamento de respostas
- Mensagem de boas-vindas personalizada
- Persistência de sessão com UUID para manter o contexto da conversa
- Tratamento de erros para falhas na comunicação com o servidor

## 🌐 Deploy com Vercel

O projeto está sendo hospedado na plataforma [Vercel](https://vercel.com/), uma ferramenta moderna de *deploy* contínuo focada em aplicações frontend, especialmente projetos criados com frameworks como React, Next.js, Vue e outros.

Na Vercel, o deploy é feito automaticamente a partir de um repositório Git (como GitHub ou GitLab). Sempre que há um novo *push* na branch configurada (geralmente `main`), a Vercel executa o processo de build e publica uma nova versão do site.

No caso deste projeto, o comando `vite build` é usado para gerar os arquivos estáticos da aplicação, que são então servidos por uma CDN global, garantindo alta performance e baixa latência para os usuários.

Além disso, o Vercel oferece:
- URLs automáticas para *preview* de cada *pull request*
- SSL gratuito (HTTPS)
- Deploys instantâneos e reversíveis

Para acessar o projeto em produção, acesse:  
👉 [https://challenge-1-furia.vercel.app/](https://challenge-1-furia.vercel.app/)
