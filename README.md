# Tutorial Vite + React Router DOM

Tutorial to configure:  
Vite + React Router DOM

- IMPORTANTE !  
  Esse tutorial é uma continuação da configuração do front-end usando React com TypeScript usando o Vite.  
  Antes deve ser concluído esse outro tutorial, para instalando e configurando o Vite, Prettier, etc:  
  [Tutorial Vite + Code Format](https://github.com/rramires/tut_vite_code-format/blob/master/README.md)

---

### Instalação do React Router DOM

1 - Instale o React Router DOM:  
[React Router](https://reactrouter.com/6.30.1/start/tutorial)

```sh
pnpm add react-router-dom localforage match-sorter sort-by
```

2 - Adicione uma pasta **pages** e dentro dela outras duas pastas **auth** e **app**:

```sh
mkdir src/pages
mkdir src/pages/auth
mkdir src/pages/app
```

3 - Crie uma página dentro de **pages/app** chamada **dashboard.tsx**, contendo:

```js
export function Dashboard() {
	return <h2>Dashboard Page</h2>
}
```

4 - Crie uma página dentro de **pages/auth** chamada **sign-in.tsx**, contendo:

```js
export function SignIn() {
	return <h2>SignIn Page</h2>
}
```

5 - Crie um arquivo chamado **routes.tsx** em **src** e adicione:

```js
import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
	},
	{
		path: '/sign-in',
		element: <SignIn />,
	},
])
```

5 - No arquivo **App.tsx** adicione, substituindo o Hello World:

```js
// adicione os imports
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export function App() {
	// substitua o Hello World
	return <RouterProvider router={router} />
}
```

6 - Rode para verificar:

```sh
pnpm dev
```

- Perceba que entrando em http://localhost:3001/ que é o "/",  
  aparece o conteúdo da página Dashboard: **"Dashboard Page!"**
- Troque a URL por http://localhost:3001/sign-in e veja carregar  
  a outra página SignIn: **"SignIn Page!"**

---
