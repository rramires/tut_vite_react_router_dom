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

### Troca de conteúdo em local determinado do Layout

1 - Adicione uma pasta **\_layouts** em **pages**:

```sh
mkdir src/pages/_layouts
```

- Nela vamos criar 2 layouts básicos para exemplificar.  
  Um para a área aberta e outro para a área logada.

2 - Na pasta **\_layouts** crie um aquivo **app.tsx** e adicione:

```js
import { Outlet } from 'react-router-dom'

export function AppLayout() {
	return (
		<>
			<header>
				<h1>AppLayout Header</h1>
			</header>
			<main>
				{/* Content will change here */}
				<Outlet />
			</main>
			<footer>
				<p>AppLayout Footer</p>
			</footer>
		</>
	)
}
```

3 - Na pasta **\_layouts** crie um aquivo **auth.tsx** e adicione:

```js
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
	return (
		<>
			<header>
				<h1>AuthLayout</h1>
			</header>
			<main>
				{/* Content will change here */}
				<Outlet />
			</main>
			<footer>
				<p>AuthLayout Footer</p>
			</footer>
		</>
	)
}
```

4 - Modifique o arquivo **routes.tsx** para criar a nova estrutura de rotas:

```js
export const router = createBrowserRouter([
	// remova
	/* {
		path: '/',
		element: <Dashboard />,
	},
	{
		path: '/sign-in',
		element: <SignIn />,
	}, */
	// adicione
	{
		path: '/',
		element: <AppLayout />,
		children: [{ index: true, element: <Dashboard /> }],
	},
	{
		path: '/sign-in',
		element: <AuthLayout />,
		children: [{ index: true, element: <SignIn /> }],
	},
])
```

- Index = true no elemento children, significa pegae a mesmo path do elemento pai.  
  No caso **/** e **/sign-in**, nas respectivas sub-páginas. Caso necessite que carregue só quando for usado um path diferente, remova **index: true** e adicione **path: '/alguma-coisa'**.
- Perceba que entrando em http://localhost:3001/ que é o "/",
  aparece o conteúdo da página AppLayout, e carrega no local que foi adicionado o Outlet o conteúdo de Dashboard: "Dashboard Page!"

    Troque a URL por http://localhost:3001/sign-in e veja carregar
    a outra página AuthLayout e no local do Outlet o conteúdo de SignIn: "SignIn Page!"

- Podemos ter várias sub-páginas usando sempre: **path, element e children** e usando o **Outlet** dentro delas para carregar o conteúdo desejado no local que quisermos, ex:

```js
// http://localhost:3001/sign-in/other-route
children: [
	{
		path: '/sign-in',
		element: <SignIn />,
		children: [{ index: true /* OR */ path: '/other-route', element: <OtherSubPage /> }],
	},
]
// use Outlet in SignIn page to load OtherSubPage
```

---

### Páginas de quando for usada uma rota inválida e de erro

1 - Adicione um arquivo chamado **e404.tsx** em **pages**, contendo:

```js
export function NotFound() {
	return (
		<div>
			<h1>404 - Página não encontrada</h1>
			<h3>
				Voltar para a <a href='/'>página inicial</a>
			</h3>
		</div>
	)
}
```

2 - Adicione como última rota em **routes.tsx**:

```js
{
	path: '*',
	element: <NotFound />,
},
```

- Assim vai passar por todas as rotas, e se não encontrar nenhuma exibe essa.

3 - Adicione um arquivo chamado **error.tsx** em **pages**, contendo:

```js
import { useRouteError } from 'react-router-dom'

interface RouteError {
	statusText?: string
	message?: string
}

export function ErrorPage() {
	const error = useRouteError() as RouteError
	console.error(error)

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Desculpe, ocorreu um erro.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	)
}
```

4 - Adicione na primeira rota **/** em **routes.tsx** e mova as 2 rotas existentes para dentro do **children** dessa, mantendo a rota **\*** not found, por último:

```js
{
	path: '/',
	errorElement: <ErrorPage />,
	children: [ /* Mova as 2 rotas existentes para cá */ ],
},
```

O arquivo final ficará assim:

```js
import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { NotFound } from './pages/e404'
import { ErrorPage } from './pages/error'

export const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <AppLayout />,
				children: [{ index: true, element: <Dashboard /> }],
			},
			{
				path: '/sign-in',
				element: <AuthLayout />,
				children: [{ index: true, element: <SignIn /> }],
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
```

Também é possível usar a sintaxe XML. No caso ficaria assim:

```js
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { NotFound } from './pages/e404'
import { ErrorPage } from './pages/error'

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' errorElement={<ErrorPage />}>
			<Route path='/' element={<AppLayout />}>
				<Route index element={<Dashboard />} />
			</Route>
			<Route path='/sign-in' element={<AuthLayout />}>
				<Route index element={<SignIn />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Route>,
	),
)
```

5 - Para testar, basta disparar um erro fictício de alguma página, ex:

```js
export function SignIn() {
	throw new Error('Simulação de erro no SignIn')
	return <h2>SignIn Page!</h2>
}
// ou
export function Dashboard() {
	throw new Error('Simulação de erro no Dashboard')
	return <h2>Dashboard Page!</h2>
}
```

- De refresh, acesse essas rotas e veja os erros.  
  Não esqueça de removê-los depois.

---
