<p align="center">
  <img src="public/favicon.png" alt="Logo do Milton Resume" width="88" />
</p>

<h1 align="center">Milton Resume</h1>

<p align="center">
  Um currículo web feito em <strong>Angular standalone</strong>, com templates reutilizáveis para criar, editar e exportar currículos profissionais.
</p>

<p align="center">
  <strong>Português</strong> · <a href="README.md">English</a>
</p>

## Sobre o Projeto

Este projeto nasceu para hospedar o currículo de Milton Mateus Alves Teixeira Filho em uma experiência web limpa, responsiva e fácil de manter.

Além de servir como currículo pessoal, a aplicação também funciona como uma base para quem quiser usar os templates criados aqui e montar o próprio currículo. O conteúdo é estruturado em TypeScript, a edição pode ser feita direto pelo navegador e as alterações ficam salvas localmente.

## Funcionalidades

- Currículo em português e inglês, com seletor `PT-BR` / `EN-US`.
- Templates visuais para alternar o estilo do currículo: `Clássico`, `Executivo`, `Dark` e `Studio`.
- Edição inline dos textos diretamente na página.
- Upload local de foto de perfil.
- Backup em JSON com importação, exportação e restauração.
- Persistência no navegador usando `localStorage`.
- Seções para resumo, experiências, formação, certificados, projetos recentes, idiomas e destaques.
- Geração de PDF pelo fluxo de impressão do navegador.
- Controles para adicionar, remover e reordenar itens repetidos.

## Stack

- Angular 22 com componentes standalone.
- TypeScript.
- CSS modular organizado por responsabilidade.
- Lucide para ícones.
- pnpm como gerenciador de pacotes.
- ESLint, Prettier, Husky e lint-staged para padronização.
- Vitest para testes.
- GitHub Actions para validação de qualidade e deploy no GitHub Pages.

## Como Rodar

Instale as dependências:

```bash
pnpm install
```

Suba o servidor local:

```bash
pnpm dev
```

Acesse:

```text
http://localhost:4200
```

## Scripts Disponíveis

```bash
pnpm dev           # roda o Angular em modo desenvolvimento
pnpm build         # gera o build de produção
pnpm preview       # serve a configuração de produção localmente
pnpm lint          # executa o ESLint
pnpm test          # executa os testes com Vitest
pnpm format        # formata os arquivos com Prettier
pnpm audit         # verifica vulnerabilidades conhecidas
pnpm check         # lint + format check + testes + build
```

## Usando Como Template

Para criar seu próprio currículo a partir deste projeto:

1. Atualize os dados base em `src/data/resume.data.ts`.
2. Ajuste textos de interface em `src/data/ui-copy.data.ts`, se quiser mudar labels, botões ou mensagens.
3. Troque as imagens em `public/`, especialmente foto de perfil, favicon e placeholder.
4. Personalize cores, espaçamentos e variações visuais em `src/styles/`.
5. Rode `pnpm dev`, edite o currículo pela interface e exporte um backup em JSON quando terminar.

O projeto mantém os dados em objetos tipados, então fica mais simples versionar o conteúdo, traduzir o currículo e criar novos layouts sem duplicar marcação desnecessária.

## Estrutura

- `src/app`: aplicação Angular standalone, componentes e services.
- `src/app/components`: toolbar, diálogos, sidebar, conteúdo, destaques e controles reutilizáveis.
- `src/app/services`: estado do currículo, persistência local e seleção de layout.
- `src/data`: dados base do currículo e textos da interface.
- `src/types`: contratos TypeScript usados pelos templates e pelo estado.
- `src/constants`: chaves de storage, limites de upload e dados compartilhados.
- `src/features/icons`: integração com os ícones Lucide usados pela aplicação.
- `src/styles`: estilos globais separados por tema, layout e componentes.
- `public`: imagens públicas usadas pelo currículo.

## Qualidade

Antes de abrir um commit ou publicar mudanças, rode:

```bash
pnpm check
```

O projeto também possui Husky e lint-staged configurados para formatar e validar arquivos alterados antes do commit.

## Licença

Este projeto é uma base de currículo pessoal e portfólio. Você pode adaptar os templates para montar o seu próprio currículo, mantendo os devidos créditos quando fizer sentido.
