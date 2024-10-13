import { AuthOptions, Session, User } from 'next-auth'
import axiosInstance from './axios'
import Credentials from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				login: { label: 'Login', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) return null

				try {
					const { login, password } = credentials
					const res = await axiosInstance.post('auth/login', {
						login,
						password,
					})

					if (res.data.access_token && res.data.user) {
						return {
							...res.data.user,
							access_token: res.data.access_token,
						}
					}
				} catch (error) {
					console.error('Authorization error', error)
				}
				return null // Возвращаем null, если аутентификация не удалась
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn() {
			return true
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (token) {
				session.access_token = token.access_token

				// Обработка дополнительных данных о пользователе
				try {
					const response = await axiosInstance.get('auth/me', {
						headers: {
							Authorization: `Bearer ${token.access_token}`, // Убедитесь, что заголовок корректен
						},
					})

					console.log(response.data)

					if (response.data) {
						const user = response.data

						session.user.id = user.id
						session.user.email = user.email
						session.user.username = user.username
						session.user.avatar = user.avatar
						session.user.role = user.status
					}
				} catch (error) {
					console.error(error)
				}
			}
			return session // Всегда возвращаем session
		},
		async jwt({ token, user }: { token: JWT; user: User }) {
			if (user) {
				token.id = user.id
				token.role = user.role
				token.access_token = user.access_token
			}
			return token // Возвращаем токен
		},
	},
}
