'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
const faqItems: FAQItem[] = [
  {
    id: 'item-1',
    icon: 'repeat',
    question: 'What’s the difference between Swap and Bridge?',
    answer: 'Swap allows you to exchange tokens within the same blockchain or across compatible chains. Bridge is used to move assets from one blockchain to another, such as transferring USDC from Ethereum to Arbitrum. VaultSwap uses the LiFiWidget to power both operations with smart routing.',
  },
  {
    id: 'item-2',
    icon: 'sliders',
    question: 'Is there a minimum amount required to swap or bridge?',
    answer: 'There is no fixed minimum. VaultSwap uses intelligent routing through LiFi, so the minimum amount depends on available liquidity and routes. If no route is found, try adjusting the amount or token selection.',
  },
  {
    id: 'item-3',
    icon: 'shield',
    question: 'Is VaultSwap safe to use?',
    answer: 'Yes. VaultSwap is a non-custodial DEX aggregator using the audited LiFi protocol. All operations require user wallet confirmation, and your assets stay in your control throughout the process.',
  },
  {
    id: 'item-4',
    icon: 'wallet',
    question: 'Do I need to connect my wallet?',
    answer: 'Yes. You’ll need to connect a Web3 wallet (like MetaMask, WalletConnect, or Coinbase Wallet) to use VaultSwap. The wallet is required for signing transactions and interacting with smart contracts.',
  },
  {
    id: 'item-5',
    icon: 'file-check',
    question: 'Why is my swap or bridge route unavailable?',
    answer: 'Some routes may be unavailable due to low liquidity, unsupported token pairs, or cross-chain incompatibilities. VaultSwap will always show the best available options and notify you if no route is found.',
  },
  {
    id: 'item-6',
    icon: "timer",
    question: 'How long does a swap or bridge take?',
    answer: 'Most swaps complete within a few minutes. Bridging can take longer depending on network congestion and the bridge used. The route preview will show estimated time before you confirm.',
  },
  {
    id: 'item-7',
    icon: 'globe',
    question: 'Can I send bridged tokens to another wallet?',
    answer: 'Yes. During a bridge operation, you can choose a different recipient by clicking the "Wallet" button and entering a custom address. Make sure you double-check the address before proceeding.',
  },
  {
    id: 'item-8',
    icon: 'repeat-2',
    question: 'Do I need to approve tokens before swapping or bridging?',
    answer: 'Yes. For most tokens, you’ll need to approve them for use via your wallet before the first swap or bridge. VaultSwap will prompt you for this step only when needed.',
  },
  {
    id: 'item-9',
    icon: 'arrow-up-right',
    question: 'Can I bridge tokens between any blockchains?',
    answer: 'VaultSwap supports many major EVM-compatible chains like Ethereum, Arbitrum, Polygon, BNB Chain, Optimism, and more. If a chain is unavailable, it may not be supported or may temporarily lack liquidity routes.',
  },
  {
    id: 'item-10',
    icon: 'user',
    question: 'Who can I contact for support?',
    answer: 'For support or questions, reach out to our admin team at t.me/@Opennode_tech. We’re here to help you with swaps, bridges, or any platform issues.',
  },
];

    return (
        <section className=" border-t rounded-t-4xl border-dashed  py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <Link
                                    href="https://t.me/@Opennode_tech"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    
                                    className="bg-background    border-b-0  px-4">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-muted-foreground ">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
