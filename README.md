# Milton Resume

Curriculo web feito com TypeScript e Vite, estruturado como um exemplo simples de componentizacao, renderizacao segura e separacao de responsabilidades.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
```

## Arquitetura

- `src/components`: componentes pequenos de UI e itens reutilizaveis.
- `src/sections`: composicao das secoes principais do curriculo.
- `src/features`: comportamentos interativos, como edicao inline, troca de layout e icones.
- `src/constants`: seletores, chaves de storage e valores compartilhados.
- `src/data`: conteudo base do curriculo.
- `src/types`: contratos TypeScript usados pela renderizacao.
- `src/utils`: helpers de formatacao e seguranca.
- `src/styles`: estilos separados por responsabilidade.

## Boas Praticas Aplicadas

- Componentes focados em uma unica responsabilidade.
- Tipagem explicita para os dados do curriculo e nomes de icones.
- Constantes centralizadas para evitar strings magicas espalhadas.
- Escape de HTML, atributos e URLs antes de renderizar dados dinamicos.
- HTML confiavel marcado de forma explicita com `renderTrustedHtml`.
- Persistencia de customizacoes isolada em uma feature propria.
- `main.ts` mantido como ponto de bootstrap da aplicacao.

## Observacao de Seguranca

O campo `professionalTitle` permite HTML intencionalmente para preservar o destaque visual existente. Novos campos devem usar `escapeHtml` por padrao e so usar `renderTrustedHtml` quando o HTML for controlado pelo proprio projeto.
