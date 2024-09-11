import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDb } from '@utils/database'
import User from '@models/User'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                await connectToDb()

                const userExists = await User.findOne({ email: user.email })
    
                if (!userExists) {
                    await User.create({
                        name: profile.name,
                        email: user.email,
                        image: profile.picture,
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },

        async session({ session, token}) {
            const sessionUser = await User.findOne({email:session.user.email})
            session.user.id = token.sub; // Add user ID to the session
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id; // Store user ID in the token
            }
            return token;
        },
    },

    session: {
        strategy: 'jwt', // Use JWT instead of database sessions
        maxAge: 24 * 60 * 60, // Set session max age to 24 hours
        updateAge: 60 * 60, // Update session every hour
    },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // Set JWT secret for token signing
    },
})

export { handler as GET, handler as POST }
