# Alintra Markdown Editor

Um editor de markdown com suporte a edição local e visualização em tempo real. Desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- 📝 Visualização e edição de arquivos Markdown
- 💾 Armazenamento local de alterações
- 🔄 Indicador de sincronização
- 📊 Painel administrativo com diff de alterações
- 🌲 Navegação estruturada via sidebar
- ✨ Suporte a GitHub Flavored Markdown (GFM)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd alintra-markdown
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações:
```plaintext
NEXT_PUBLIC_API_BASE_URL=sua_url_da_api
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas
├── components/            # Componentes React
├── hooks/                # Hooks customizados
├── services/            # Serviços e APIs
└── types/              # Definições de tipos TypeScript
```

## 🔧 Tecnologias Utilizadas

- **Next.js** - Framework React
- **TypeScript** - Linguagem de programação
- **Tailwind CSS** - Framework CSS
- **React Markdown** - Renderização de Markdown
- **Axios** - Cliente HTTP
- **diff** - Comparação de textos

## 📄 Funcionalidades Detalhadas

### Modo de Visualização
- Renderização de Markdown com suporte a GFM
- Estilização consistente com Tailwind Typography
- Navegação via sidebar estruturada

### Modo de Edição
- Editor de texto em tela cheia
- Salvamento automático local
- Indicador de alterações não sincronizadas

### Painel Administrativo
- Lista de documentos editados
- Visualização de diferenças (diff)
- Histórico de modificações
