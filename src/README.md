# Usando o Firebase como Banco de dados #

O Primeiro passo é importar as configurações do seu web app firebase.
(Obs. é possível que mesmo com o hosting configurado o firebase não tenha um web app)

No console do firebase clique nas configurações do projeto do lado de "Visão geral do projeto".

Em "seus aplicativos" se não tiver um web app crie-o. Caso já tenha um web app copie o firebaseConfig 
na opção radio Configuração do Firebase SDK snippet, cole em um arquivo nomeado firebaseConfig.js na raiz do projeto (src).

Substitua o trecho 

> const firebaseConfig = {

por

> exports.config = {

# Regras do Firebase para que só possa 1 like por post #

Verifique o arquivo [rules.json](rules.json).