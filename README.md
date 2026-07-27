# Milton Resume

Curriculo web feito com Angular, TypeScript e CSS modular. A aplicacao renderiza um curriculo responsivo, permite edicao inline, troca de layout, upload local de foto e persistencia das customizacoes no navegador.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm test
pnpm format
pnpm check
```

## Arquitetura

- `src/app`: aplicacao Angular standalone, componentes de tela e services.
- `src/app/components`: componentes Angular de toolbar, dialogs, sidebar, conteudo e destaques.
- `src/app/services`: estado do curriculo, persistencia versionada e layout.
- `src/data`: conteudo base do curriculo.
- `src/types`: contratos TypeScript usados pelo estado e pelos templates.
- `src/constants`: chaves de storage, limites de upload e dados compartilhados.
- `src/features/icons`: integracao com os icones Lucide usados pelo template.
- `src/styles`: estilos globais separados por responsabilidade.

## Boas Praticas Aplicadas

- Angular standalone na versao 22.
- Estado do curriculo persistido como JSON estruturado e versionado, evitando salvar HTML cru.
- Templates declarativos com bindings Angular em vez de montagem manual de strings HTML.
- Tipagem explicita para o modelo de curriculo e nomes de icones.
- Layouts visuais reaproveitando as classes CSS existentes.
- Upload de imagem validado por tipo e tamanho antes da persistencia local.
- Importacao e exportacao do curriculo em JSON.
- Controles de edicao para adicionar, remover e reordenar itens repetidos.
- ESLint, Prettier, Husky, lint-staged, Vitest e CI com GitHub Actions.
