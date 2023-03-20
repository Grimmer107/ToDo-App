import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialProvider({
            id: 'credentials',
            name: 'ToDo App',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email"},
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials, req) {
                if (credentials) {
                    const res = await fetch("http://localhost:3000/api/user?" + new URLSearchParams({
                        email: credentials.email}) as string, {method: 'GET'});
                    const user = await res.json();
                    if (!res.ok) {
                        throw new Error(user.message);
                    }
                    if (res.ok && user[0].email === credentials.email && user[0].password === credentials.password) {
                        return user;
                    } else {
                        return null;
                    }
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {...token}
            }
            return token;
        },
        async session({ session, token, user }) {
            return session;
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    secret: process.env.JWT_SECRET,
});