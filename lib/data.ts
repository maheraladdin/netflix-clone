import {signOut} from "next-auth/react";

export const navItems = [
    {
        name: 'Home',
        path: '/',
        func: () => {},
    },
    {
        name: 'Series',
        path: '/series',
        func: () => {}
    },
    {
        name: 'Films',
        path: '/films',
        func: () => {}
    },
    {
        name: 'New & Popular',
        path: '/new-and-popular',
        func: () => {}
    },
    {
        name: 'My List',
        path: '/my-list',
        func: () => {}
    },
    {
        name: 'Browse by languages',
        path: '/browse-by-languages',
        func: () => {}
    }
];

export const accountItems = [
    {
        name: 'Sign Out from Netflix',
        path: '/sign-out',
        func: () => signOut({callbackUrl: '/'})
    }
]