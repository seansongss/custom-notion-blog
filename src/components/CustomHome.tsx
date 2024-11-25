import { getSiteConfig } from "@/lib/get-config-value";

const CustomHome = () => {
    const author = getSiteConfig('author');
    const descripton = getSiteConfig('description');
    return (
        <>
            <h1 className="text-lg font-bold">{author}</h1>
            <span>{descripton}</span>
        </>
    )
}

export default CustomHome