export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    crashreports: '/dashboard/crashreports',
    account: '/dashboard/account',
    borrows: '/dashboard/borrowrequests',
    equipments:'/dashboard/equipments',
    classrooms: '/dashboard/classrooms',
    settings: '/dashboard/settings',
  },
  user: {
    crashreports: '/user/crashreports',
    account: '/user/account',
    borrows: '/user/borrowrequests',
    equipments:'/user/equipments',
    classrooms: '/user/classrooms',
    settings: '/user/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
