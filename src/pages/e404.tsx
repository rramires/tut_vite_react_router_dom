import { Helmet } from 'react-helmet-async'

export function NotFound() {
	return (
		<>
			<Helmet title='Not Found' />
			<div>
				<h1>404 - Página não encontrada</h1>
				<h3>
					Voltar para a <a href='/'>página inicial</a>
				</h3>
			</div>
		</>
	)
}
