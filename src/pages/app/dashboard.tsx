import { Helmet } from 'react-helmet-async'

export function Dashboard() {
	//throw new Error('Simulação de erro no Dashboard')
	return (
		<>
			<Helmet title='Dashboard' />
			<h2>Dashboard Page!</h2>
		</>
	)
}
