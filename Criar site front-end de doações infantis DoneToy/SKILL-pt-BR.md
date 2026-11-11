---
name: webdev
description: "Criar e entregar um site, aplicativo mobile ou jogo inicializado no Manus: planejamento, design, desenvolvimento, Preview, configuração, checkpoints, publicação e conexão com GitHub. Use para qualquer solicitação de criação de jogo, inclusive jogos simples em HTML5/canvas, a menos que o usuário peça explicitamente outro entregável, como um único arquivo HTML ou um script Python. Leia guias opcionais somente quando a tarefa precisar deles."
---

# Webdev — tradução para português do Brasil

## Fluxo de trabalho

Solicitações locais de Web/Mobile devem seguir primeiro o fluxo de Trabalho Local para redescobrir o projeto e escolher entre desenvolvimento gerenciado e local simples. Respeite essa escolha; jogos locais mantêm o fluxo gerenciado existente.

Use o estado do projeto retornado por `init` ou `attach`. Continue a solicitação e as decisões já aceitas sem repetir inicialização ou planejamento. Os caminhos dos arquivos são relativos ao diretório retornado do projeto. O jogo segue as instruções próprias entregues para ele. Web e Mobile compartilham as regras comuns abaixo; cada template pode adicionar fatos e substituir regras. O README de Mobile é responsável pelo fluxo fixo de Expo, dispositivo, backend, desenvolvimento e build.

## 1. Planejar

Se um Blueprint foi confirmado, ele é o plano aprovado: não escreva outro `plan.md` nem peça nova aprovação, mas leia os guias necessários e aplique diretamente as decisões de design antes do `TODO`.

Para infraestrutura e serviços, use por padrão os recursos fornecidos pelo Manus, a menos que o usuário peça outra alternativa.

Antes de planejar, selecione os guias necessários com base na solicitação e nos fatos da seção “Conjunto de guias de planejamento”. Leia os guias conhecidos em uma única rodada paralela e reutilize o conteúdo já carregado.

Quando um plano for necessário, mantenha implementação e design no mesmo `plan.md`. Explique como o produto será implementado, como as partes se conectam, quais dependências existem, as restrições materiais e como frontend/backend serão servidos. Diferencie requisitos obrigatórios de ideias opcionais.

Inclua no plano a estrutura do projeto, descrevendo as responsabilidades das pastas e módulos. Baseie essa estrutura nas capacidades reais do projeto, no template e nos guias aplicáveis. Não crie uma nova etapa de planejamento apenas para satisfazer esta regra.

Revise as premissas se os requisitos mudarem. Mantenha o plano focado na implementação e nas decisões de design necessárias. Não adicione um plano separado de validação nem transforme os requisitos em uma lista de testes passo a passo.

### Design

Reutilize o Blueprint, o estilo fornecido pelo usuário ou o estilo já existente. Caso não exista uma direção visual, liste três estilos distintos, cada um em no máximo uma frase, escolha um e desenvolva somente esse estilo no idioma do usuário.

O design escolhido deve documentar:

- **Movimento de design:** uma estética específica de referência.
- **Princípios centrais:** de 3 a 4 características que orientam todas as decisões.
- **Filosofia de cores:** a intenção emocional da paleta, não apenas seus valores.
- **Paradigma de layout:** uma estrutura distinta; evite layouts excessivamente centralizados e baseados apenas em grades.
- **Elementos de assinatura:** 2 ou 3 motivos visuais recorrentes.
- **Filosofia de interação:** como as interações refletem a personalidade do produto.
- **Animação:** orientações de movimento coerentes com o design.
- **Sistema tipográfico:** famílias e hierarquia que expressem o estilo.
- **Essência da marca:** o que é, para quem é e por que é diferente, além de três adjetivos.
- **Voz da marca:** tom de títulos, CTAs e microcopy, com dois exemplos. Evite frases genéricas como “Bem-vindo ao site”.
- **Wordmark e logo:** conceito de marca visual próprio, não apenas o nome em uma fonte padrão.
- **Cor principal da marca:** uma cor reconhecível e própria.

Mantenha essa descrição no `plan.md`.

## 2. TODO

Depois da aprovação do plano, crie ou atualize `TODO.md` antes da configuração ou implementação. Substitua títulos provisórios por resultados concretos e preserve o progresso já realizado quando ele corresponder ao mesmo resultado.

Copie para cada item os critérios reais de aceitação da solicitação e do plano aprovado. Preserve valores, mensagens, regras de campos, atores, transições e exceções. Não inclua chaves secretas nem justificativas internas de implementação.

Mantenha cada título junto de seus critérios completos. Um resumo ou link para o plano não substitui os critérios. Para solicitações sem estrutura, divida o trabalho em resultados independentemente entregáveis. Mescle critérios duplicados, mas mantenha grupos de funcionalidades distintos separados.

Compare o TODO com a solicitação original para garantir que todos os requisitos explícitos permaneçam. Os critérios devem descrever o comportamento do produto, não testes adicionais. Marque um resultado como concluído somente quando houver evidência de que ele foi entregue. Em tarefas complexas, use o agente de validação descrito abaixo.

## 3. Implementar

Prefira uma estrutura clara de projeto a um arquivo único muito grande. Escreva código legível, com quebras de linha e indentação adequadas à linguagem.

### Login no Preview incorporado

Em sites com login baseado em cookies, o cookie de sessão precisa usar `SameSite=None; Secure` no Preview HTTPS público. O Manus incorpora o Preview em um iframe de outra origem; `SameSite=Lax` ou `Strict` pode impedir o envio do cookie.

Não escolha esses atributos com base em `NODE_ENV` ou em `req.secure` do servidor de desenvolvimento. HTTPS público pode chegar ao servidor interno por HTTP. Mantenha o tratamento de HTTP local separado. Políticas do navegador contra cookies de terceiros ainda podem bloquear cookies entre origens.

### Metadados do logo

A marca da plataforma é diferente do favicon e dos ícones do site. Antes do checkpoint, defina no arquivo raiz `app.config.ts` um `logoUrl` literal entre aspas. Se o arquivo não existir, crie:

```ts
export default { logoUrl: "<URL HTTPS real>" };
```

Use uma URL HTTPS durável ou `manus-upload-file <arquivo-do-logo>` sem `--webdev`. O hook lê o literal do commit aceito e não avalia expressões. A URL pode ter até 2056 caracteres, sem credenciais ou espaços externos; o arquivo pode ter até 1 MiB. Caminhos relativos e URLs assinadas temporárias são inválidos.

### Imagens e assets

Reutilize imagens fornecidas pelo usuário ou já existentes. Se o usuário fornecer uma referência visual, use-a para orientar o design; não faça novas buscas apenas porque existe uma referência.

Quando uma imagem precisar representar uma pessoa, produto ou lugar real específico, use a imagem fornecida ou procure uma representação correta; não gere um sósia.

Para hero, banner ou ilustração personalizada, use `generate_image`. Antes de programar o site, defina onde cada imagem será usada e envie solicitações independentes em conjunto. Descreva sujeito, composição, cores e estilo. Gere somente imagens que tenham uso planejado e não substitua uma imagem personalizada por um banco genérico.

Use as URLs retornadas sem alterá-las. Continue o trabalho enquanto uma geração estiver em andamento; não faça polling, não reenvie a solicitação e não declare a tarefa concluída antes do resultado final.

### Upload de arquivos

O padrão é:

```sh
manus-upload-file --webdev <arquivo>
```

Use o caminho `/manus-storage/<chave>` retornado no site. Use `manus-upload-file <arquivo>` sem `--webdev` apenas quando o consumidor exigir uma URL pública absoluta, como `logoUrl` ou mídias do Shopify.

### Serviço de desenvolvimento

Defina `cwd` como o diretório absoluto do projeto. Para servidores residentes, use `service=true`. Inicie o servidor quando a interface já tiver conteúdo significativo e confirme que ele está pronto com uma requisição HTTP.

Em Cloud, o servidor usa `0.0.0.0` e a porta configurada. Localmente, usa a porta declarada da sessão e `127.0.0.1`. Não altere portas automaticamente. Em projetos existentes, inspecione o comando e declare a porta pelo `webdev.config` antes de usar o Preview; não reinicialize o projeto.

### Diagnósticos de código

Antes do primeiro lote de código, configure os diagnósticos para as linguagens usadas. Consulte `GET runtime/post-edit` e reutilize registros existentes. Use exatamente o caminho `runtime/post-edit`, sem o prefixo `config/`.

No Sandbox, confirme `registered: true` e as linguagens necessárias. A ausência de um lembrete de edição não significa que o código esteja limpo.

Quando o host gerenciar os diagnósticos, não inicie outro servidor LSP no Sandbox. Para selecionar linguagens, use:

```json
{"languages":["typescript","javascript","python","go","rust","json","yaml","html","css"]}
```

Em ambientes com servidor gerenciado pelo agente, use o launcher retornado por `GET runtime/post-edit`, inicialize o preset adequado e corrija diagnósticos reais. `ready` confirma a inicialização do protocolo, não que todos os arquivos foram verificados.

### Manifesto de rotas do site

Antes de iniciar o primeiro servidor Web, disponibilize `GET /manus-routes.json` na origem do site, por exemplo em `public/manus-routes.json`. O arquivo deve declarar todas as rotas de páginas atuais, inclusive rotas aninhadas, carregadas sob demanda e padrões dinâmicos. Não inclua APIs, assets, endpoints de sistema ou rotas que existam apenas para 404.

Exemplo:

```json
{"routes":[{"path":"/","title":"Home"},{"path":"/todo/:id","title":"Todo"}]}
```

As rotas devem começar com `/`, sem URLs absolutas, credenciais, espaços ou caracteres de controle. O limite é de 1 MiB, 1000 rotas e 2048 caracteres por caminho. Depois de iniciar ou alterar rotas, confirme HTTP 200 e JSON válido, não HTML de fallback SPA.

## 4. Validar antes da entrega

O banco de dados gerenciado do projeto é compartilhado entre desenvolvimento, testes e produção. Escritas e exclusões durante os testes afetam os dados de produção.

Prefira inspeção de código, diagnósticos automáticos e verificações existentes. Evite testes no navegador e screenshots, salvo quando solicitados ou necessários para investigar um defeito concreto.

Para tarefas complexas, use um agente somente leitura com `sandbox="shared"` para verificar a implementação contra os requisitos e rastrear como as partes da aplicação se conectam. Informe o diretório, o plano/TODO, fatos relevantes da plataforma e evidências existentes. O agente filho não herda a conversa principal.

Corrija problemas confirmados e revise somente os caminhos afetados; não repita uma aceitação completa sem necessidade.

## Paralelismo das ferramentas Webdev

Por padrão, agrupe chamadas independentes em paralelo: leituras, escritas, edições, comandos `exec` e chamadas MCP. Emita a ordem pretendida; o host preserva a ordem necessária.

Espere somente quando o resultado anterior for necessário para escolher a próxima ação, em operações exclusivas, durante uma entrada do usuário/Host ou enquanto uma sincronização, checkpoint ou vinculação ainda não estiver confirmada. Não coloque em fila operações concorrentes de configuração, portas, arquivos ou Git.

## Configuração

`webdev.config` opera o projeto vinculado; o código da aplicação usa as APIs de runtime. Consulte `GET config` antes de escritas, recuperação ou quando houver campos ausentes ou mudanças concorrentes.

Prefira `PUT config/{domain}` com o fragmento completo do domínio, por exemplo:

```json
{"runtime":{"port":3000}}
```

Preserve campos inalterados. Uma substituição completa deve incluir `version:1`, `runtime` e todas as configurações desejadas. Não misture transições de Git, novos segredos e alterações não relacionadas.

Uma resposta `{ok:true,revision:N}` significa que foi armazenado. `runtime_sync: applied/noop` significa que foi carregado localmente. Em falhas, leia a causa antes de tentar novamente. Em conflito de revisão, inspecione o documento e o estado pendente; não repita cegamente.

As features Web aceitam apenas `server` e `database`. Ambas começam desligadas. `server:true` não cria banco. `database:true` também ativa servidor quando ele é omitido. A ativação é unilateral. Login Manus exige servidor habilitado durante a inicialização.

A configuração `runtime` exige uma porta entre 1024 e 65535. Endpoints extras devem ter nomes válidos, portas diferentes e não podem usar nomes reservados. A configuração não inicia o aplicativo por conta própria.

## Deploy

Prepare a declaração correspondente ao tipo de publicação:

| Publicação | Configuração necessária |
| --- | --- |
| Saída estática | `build` |
| Container | `features.server:true` e `deploy` |
| Frontend estático + backend em container | `build`, `features.server:true`, `deploy` e regras `routes` |

O build deve declarar comando e diretório de saída, e o resultado precisa conter `index.html`. Em um site HTML sem build, use `command:"true"` e o diretório já versionado.

O deploy informa `dockerfilePath` e um `healthPath` que responda com sucesso sem autenticação. Comandos não podem conter credenciais literais. Caminhos devem ser relativos ao repositório e não podem conter segmentos vazios, `.` ou `..`.

O build deve partir do checkpoint registrado, não do diretório temporário do Sandbox. Dependências precisam ser instaladas pelo Dockerfile. Não dependa de credenciais privadas ou de `DATABASE_URL` durante a compilação. Somente valores seguros para o navegador podem entrar no bundle.

Mantenha `EXPOSE` consistente com a porta do aplicativo e aceite `PORT`, usando 3000 como padrão. A porta publicada é diferente da porta de Preview. Memória e arquivos graváveis do container são temporários; dados duráveis devem ir para banco ou storage.

### Roteamento publicado

As regras publicadas seguem a forma ordenada `{path,target:"static"|"server"}`. APIs, health checks, webhooks e SSR devem vir antes do fallback estático.

Exemplo híbrido:

```json
{"method":"PUT","path":"config/routes","body":{"routes":[{"path":"/api/*","target":"server"},{"path":"/styles.css","target":"static","cache":"no-cache"},{"path":"/*","target":"static","spaFallback":true}]}}
```

Os caminhos começam com `/`, aceitam letras, números, `.`, `_`, `~` e `-`, e podem terminar com `/*`. Rejeite duplicatas, espaços, consultas, fragmentos, wildcards no meio, segmentos vazios e regras sombreadas.

Caminhos reservados incluem `/favicon.ico`, `/manus-oauth/`, `/api/scheduled/`, `/manus-storage/`, `/__manus/`, `/__system__/`, `/sitemap.xml` e `/robots.txt`. As regras se aplicam após a publicação, não no Preview.

## Checkpoints e publicação

Um checkpoint é uma versão salva pelo Manus, identificada por um SHA de commit Git e mostrada no histórico de versões. Ele registra um commit aceito em `main` no repositório canônico. Commit local ou push para outra branch não é checkpoint. Salvar checkpoint e publicar são operações separadas.

Em Cloud, faça fetch de `origin/main`, preserve alterações remotas, rode as verificações e faça push para `origin/main`. O Manus registra o checkpoint automaticamente após o push. Confirme o SHA na versão retornada ou no histórico.

No fluxo Local, use `webdev.manus_git`, integre a referência remota devolvida e faça push pelo remote temporário `manus`. Preserve o Git separado do usuário.

Nunca force push nem reescreva o histórico principal. Não habilite `publishing.auto_publish` por conta própria. Se ele já estiver ativo e o usuário não quiser publicação, peça que desative a opção no Dashboard antes do push.

## Entrega

Para uma entrega comum de site, mantenha a resposta final curta, salvo se o usuário pedir detalhes. Informe o resultado e bloqueios. Inclua URL publicada somente quando a publicação tiver sido confirmada com sucesso. Não inclua URLs internas de Preview na mensagem; direcione o usuário ao Preview. Sucesso no Preview ou no checkpoint não significa que o site foi publicado.

## Conjunto de guias de planejamento

Estes guias expõem dependências explícitas e implícitas para implementação, verificação e entrega:

### Templates, ambiente e toolchains

- `templates/web-db-user/README.md`: comandos iniciais, código e configuração dependente de recursos.
- `templates/expo/README.md`: stack Mobile fixa, listeners, credenciais de dispositivo, ícones e builds.
- `references/dependency-setup.md`: pinagem do pnpm, permissões de ciclo de vida e recuperação de scripts bloqueados.
- `worklocally/SKILL.md`: escolha de diretório, permissões, identidade, Git gerenciado, variáveis de ambiente e Preview.

### Capacidades

- `references/service-api.md`: URLs compartilhadas, credenciais, HTTP/RPC, LLM, imagens, voz, mapas, storage e notificações.
- `references/authentication.md`: login, sessões, papéis, cookies de Preview e OAuth Manus.
- `references/database.md`: MySQL gerenciado, migrações e dados compartilhados de desenvolvimento/publicação.
- `references/storage.md`: transferências e caminhos duráveis `/manus-storage/`.
- `references/llm.md`: geração de texto/chat com IA Manus, modelos, saída estruturada e streaming.
- `references/images.md`: geração/edição de imagens e catálogo de modelos.
- `references/speech.md`: transcrição de áudio com texto e timestamps.
- `references/maps.md`: proxy Google para navegador e serviços Web.
- `references/api-hub.md`: chamadas para APIs externas gerenciadas.
- `references/owner-notifications.md`: mensagens somente para o proprietário do projeto.
- `references/scheduled-work.md`: callbacks publicados, retries e tarefas agendadas.
- `references/payments.md`: Stripe, checkout, webhooks e handoff ao pagamento.
- `references/shopify.md`: storefront, escolha da loja, Admin e fluxo de claim.
- `references/secrets.md`: chaves fornecidas pelo usuário, secrets de assinatura e DSNs externos.
- `seo/SKILL.md`: HTML inicial, metadados, sitemap, robots e descoberta por buscadores.
- `references/site-settings.md`: analytics e badge.
- `references/pwa.md`: responsabilidade pelo manifesto PWA.

### Configuração e entrega

- `references/configuration.md`: imports completos, cards interativos e estado armazenado/aplicado.
- `references/runtime.md`: conexões extras de Preview, proxy e recuperação de listeners.
- `references/hosting.md`: dimensionamento, política de ociosidade e observação de serving.
- `references/git-checkpoints.md`: publicação, rollback e recuperação Git.
- `references/git-canonical.md`: conexão com GitHub e troca de repositório.

### Configuração excepcional e recuperação

- `references/diagnostics.md`: LSP customizado, reload, falhas de verificação, logs e versão ativa.
- `references/build-contracts.md`: toolchains incomuns, falhas de build/startup e reprodução focada.
- `references/routing-and-responses.md`: transformação HTML, CSP, cache e falhas de rota.
- `references/features.md`: provisionamento e políticas não-Web.
- `references/errors.md`: consulta de códigos de erro e recuperação.
- `references/project.md`: falhas raras de init/attach, Sandbox ou projetos legados.

Antes de inicializar um jogo, leia `references/game-setup.md`. Three.js usa seu recibo de starter e o fluxo Web de build/checkpoint; Godot usa `references/game-workflow.md`. Ambos exigem as regras de compartilhamento do jogo antes de metadados e trabalho de Open Graph.

Para Godot, leia também a linguagem de ajustes em `references/game-runtime.md#tweak-presentation-language` antes de criar ou editar parâmetros Tweak.


