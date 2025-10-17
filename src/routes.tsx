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

/* export const router = createBrowserRouter([
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
]) */
