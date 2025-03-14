# Aplicativo Bancário Multiplataforma

Este repositório contém o código-fonte de um aplicativo bancário desenvolvido com React Native Expo e NativeWind, projetado para funcionar em Web, Android e iOS. Ele se conecta à API [Nome da sua API] para fornecer funcionalidades completas de gerenciamento de contas.

## Funcionalidades

* Criação e gerenciamento de contas (PF/PJ)
* Transferências entre contas
* Consulta de extratos detalhados
* Visualização de saldos
* Operações de débito e crédito

## Tecnologias

* React Native Expo
* NativeWind (Tailwind CSS)
* [Outras tecnologias/bibliotecas, ex: Redux, React Navigation]

## Pré-requisitos

* Node.js e npm ou Yarn instalados
* Expo CLI instalado (`npm install -g expo-cli`)
* Um emulador Android ou iOS, ou um dispositivo físico

## Instalação

1.  Clone este repositório:

    ```bash
    git clone https://github.com/AlanPrzyvara/HorizonBank-EXPO.git
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd [nome do repositorio]
    ```

3.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

## Execução

1.  Inicie o servidor de desenvolvimento Expo:

    ```bash
    npx expo start
    # ou
    yarn expo start
    ```

2.  Use o aplicativo Expo Go no seu dispositivo ou emulador para visualizar o aplicativo.

## Configuração

* Certifique-se de que a API [Nome da sua API] esteja em execução e acessível.
* Configure as variáveis de ambiente necessárias no arquivo `.env` (se aplicável).

## 📂 Estrutura do Projeto:
```
└── app
├── tabs
│   └── Home.tsx
└── Login.tsx
└── components
└── constants
└── assets
```
