import Link from "next/link"
import { useRouter } from "next/router"

export default function Navbar() {
    const { pathname } = useRouter()

    return (
        <div className="">
            <nav className="w-screen">
                <ul className="flex items-end justify-between py-3 bg-transparent text-white pr-5">
                    <li className="flex items-end ml-5 pb-2">
                        Escrow
                    </li>
                    <li className="w-3/6">
                        <ul className="lg:flex justify-end font-bold mr-10 text-lg">

                            <li className="ml-2">
                                CONNECT

                                {/* <ConnectButton /> */}
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
