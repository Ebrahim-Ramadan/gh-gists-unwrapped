import Image from "next/image"
import { GetGists } from "./GetGists"

 const CTA= () => {
    return (
        <section className="relative max-w-screen-xl mx-auto py-4 px-4 md:px-8">
            <div className="absolute top-0 left-0 w-full h-full  opacity-40"></div>
            <div className="relative z-10 gap-5 items-center lg:flex">
                <div className="flex-1 space-y-2 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                    <h3 className="text-3xl text-gray-400 font-semibold md:text-4xl">
                        Get Your Gists Wrapped <span className="text-indigo-600">as cool as it is</span>
                    </h3>
                    <p className="text-gray-500 leading-relaxed mt-3">
                    Effortlessly showcase code snippets, snippets, and interactive elements from your repositories. Elevate your user experience by seamlessly embedding GitHub Gists into your Next.js application with ease.
                    </p>
                    <GetGists/>
                </div>
                <div
                    className="flex-1 mt-5 mx-auto w-1/2 lg:mt-0 w-auto"
                >
                    <Image 
                        width={500}
                        height={500}
                        src="/cta.webp" 
                        alt="" 
                        className="w-full rounded-lg" 
                    />
                </div>
            </div>
        </section>
    )
}

export default CTA