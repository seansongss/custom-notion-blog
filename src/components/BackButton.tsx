"use client";

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const BackButton = ({ href, name }: { href?: string, name?: string}) => {
    const router = useRouter();

    const handleGoBack = () => {
        if (href) {
            router.push(href);
            return;
        }

        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    }
    
    return (
        <Button variant="link" className="gap-2" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4" />
            { name ? name : "Back" }
        </Button>
    )
}

export default BackButton