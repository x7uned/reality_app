import 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			username: string
			email: string
			avatar?: string
			role?: string
		}
		access_token?: string
	}

	interface User {
		id: string
		username: string
		email: string
		avatar?: string
		role?: string
		access_token: string
		admin?: boolean
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string
		username: string
		email: string
		avatar?: string
		role?: string
		access_token: string
		admin?: boolean
	}
}
