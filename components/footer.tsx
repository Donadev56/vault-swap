import { Logo } from '@/components/logo'
import Link from 'next/link'
import { FaTelegram, FaWhatsapp } from 'react-icons/fa'

const links = [
    {
        title: 'Features',
        href: '#',
    },
    {
        title: 'Solution',
        href: '#',
    },
    {
        title: 'Customers',
        href: '#',
    },
    {
        title: 'Pricing',
        href: '#',
    },
    {
        title: 'Help',
        href: '#',
    },
    {
        title: 'About',
        href: '#',
    },
]

export default function FooterSection() {
    return (
        <footer className="pb-16 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto  block size-fit">
                    <Logo color='currentColor' className={"size-[40px]"} />
                </Link>

              
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="https://www.whatsapp.com/channel/0029VbBHML75K3zYultuO11k"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Whatsapp"
                        className="text-muted-foreground transition-all gap-2 hover:bg-[#00e98f] hover:text-[black]  flex  items-center  py-1.5 rounded-3xl px-3 bg-[var(--second-color)]  ">
                     <FaWhatsapp size={30} /> Whatsapp
                    </Link>
                      <Link
                        href="https://t.me/@Opennode_tech"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        className="text-muted-foreground gap-2 transition-all hover:bg-[#00b8df] hover:text-[black]  flex  items-center  py-1.5 rounded-3xl px-3 bg-[var(--second-color)]  ">
                     <FaTelegram size={30} /> Telegram
                    </Link>
                 
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Opennode, All rights reserved</span>
            </div>
        </footer>
    )
}
