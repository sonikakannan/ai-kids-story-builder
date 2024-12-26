'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';

const Header = () => {
    const { user, isSignedIn } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Ensure client-specific logic is only run on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    const MenuList = [
        { name: 'Home', path: '/' },
        { name: 'Create Story', path: '/create-story' },
        { name: 'Explore Stories', path: '/explore' },
    ];

    return (
        <Navbar maxWidth="full" onMenuOpenChange={setMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <NavbarBrand>
                    <Image src="/logo.svg" alt="logo" width={40} height={40} />
                    <h1 className="font-bold text-4xl text-primary ml-3">Kids Story</h1>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="center" className="hidden lg:flex">
                {MenuList.map((item, index) => (
                    <NavbarItem key={index} className="text-xl text-primary font-medium hover:underline mx-2">
                        <Link href={item.path} passHref>{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end" className="hidden lg:flex">
                {isClient && (
                    <>
                        <Link href={isSignedIn ? "/dashboard" : "/get-started"} passHref>
                            <Button color="primary">{isSignedIn ? 'Dashboard' : 'Get Started'}</Button>
                        </Link>
                        <UserButton />
                    </>
                )}
            </NavbarContent>
            <NavbarMenu>
                {MenuList.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link href={item.path} passHref>{item.name}</Link>
                    </NavbarMenuItem>
                ))}
                {isClient && (
                    <NavbarMenuItem>
                        <Link href={isSignedIn ? "/dashboard" : "/get-started"} passHref>
                            <Button color="primary">{isSignedIn ? 'Dashboard' : 'Get Started'}</Button>
                        </Link>
                    </NavbarMenuItem>
                )}
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;
