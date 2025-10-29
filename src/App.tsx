import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate='%s | Vite+RR-DOM' />
			<RouterProvider router={router} />
		</HelmetProvider>
	)
}
