import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@nexus.com";
        const adminPass = process.env.ADMIN_PASSWORD || "nexus123";

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPass
        ) {
          return {
            id: '1',
            name: 'Admin User',
            email: adminEmail,
            image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-very-strong-secret-key',
};