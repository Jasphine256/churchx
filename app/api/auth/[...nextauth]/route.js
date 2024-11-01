import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getUser, createDocument, readDocumentByField,  } from '@utils/database'

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
                const docExists = await getUser("Users", user.email)
                if (docExists==false){
                    console.log("creating new user")
                    createDocument("Users", {
                        name: profile.name,
                        email: user.email,
                        image: profile.picture,
                    })
                    createDocument("AccountBalance", {
                        email: user.email,
                        amount: "0",
                    })
                }
                return true
            } catch (error) {
                console.log(error)
            }
        },

        async session({ session, token}) {
            const sessionUser = readDocumentByField("Users", "email", session.user.email)
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
