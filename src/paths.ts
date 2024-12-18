export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    crashreports: '/dashboard/crashreports',
    account: '/dashboard/account',
    borrowequipmentrequests: '/dashboard/borrowequipmentrequests',
    borrowroomrequests: '/dashboard/borrowroomrequests',
    equipments:'/dashboard/equipments',
    classrooms: '/dashboard/classrooms',
    settings: '/dashboard/settings',
  },
  user: {
    crashreports: '/user/crashreports',
    account: '/user/account',
    equipments:'/user/equipments',
    borrowequipmentrequests: '/user/borrowequipmentrequests',
    borrowroomrequests: '/user/borrowroomrequests',
    classrooms: '/user/classrooms',
    settings: '/user/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
