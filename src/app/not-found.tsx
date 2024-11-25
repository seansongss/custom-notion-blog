import Heading from '@/components/Heading'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <div className="md:hidden">
        <Heading heading="Page Not Found" />
      </div>
      <div className="pt-10 h-[70vh] flex flex-col justify-center items-center gap-4">
        <Image src="/not-found.png" alt="not-found" height={500} width={500} />
        <Link href="/" className="text-sm md:text-base bg-accent px-1.5 py-1 rounded-md gap-0.5">Return Home</Link>
      </div>
    </>
  )
}