# Configuração do TypeScript

Este guia mostra como instalar o TypeScript como uma dependência de desenvolvimento em seu projeto e configurar o arquivo `tsconfig.json` com as opções necessárias.

## Instalação

Para instalar o TypeScript e outras dependências relacionadas, execute o seguinte comando:



```bash
yarn add typescript ts-node-dev @types/node tsconfig-paths -D
```

# Gerar migrate

```bash
yarn typeorm migration:create ./src/shared/typeorm/migrations/<NomeMigration>
