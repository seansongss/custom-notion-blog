import { getSiteConfig } from '@/lib/get-config-value'
import React from 'react'

const Footer: React.FC = () => {
    const author = getSiteConfig('author')
    return (
        <div className="flex flex-col py-8 justify-center items-center text-xs md:text-sm">
            <p>
                © 2024 <b>Designed & Made</b> with 🤍 by <b>{author}</b>
            </p>
        </div>
    )
}

export default Footer