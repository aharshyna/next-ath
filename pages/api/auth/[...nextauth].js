import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

export const authOptions = {
  secret: 'YvTlOHaNSxIotKF93mthQtTtPjOxRhLPI720BcJnv7M=', // A random string is used to hash tokens, sign/encrypt cookies and generate cryptographic keys.
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')
        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          client.close()
          throw new Error('Couldn`t log you in')
        }

        client.close()

        return { email: user.email }
      },
    }),
  ],
}

export default NextAuth(authOptions)
