import React from 'react'

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-screen-md w-full md:w-svw mx-auto pt-8 md:pt-16">
            {children}
        </div>
    );
}