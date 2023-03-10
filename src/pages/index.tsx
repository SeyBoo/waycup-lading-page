import Head from 'next/head'
import {FormEvent, FunctionComponent, PropsWithChildren, useState} from "react";
import {ValidateEmail} from "@/common/utils/verifyEmail";
import Logo from "@/common/assets/logo.png";
import Image from "next/image";
import {Barista} from "@/common/assets/barista";
import MailchimpSubscribe from "react-mailchimp-subscribe"

export default function Home() {
    const [email, setEmail] = useState<string>('')

    const HighlightedText: FunctionComponent<PropsWithChildren> = ({children}) => {
        return (
            <span className="text-[#FF5E5D]">{" "}{children}</span>
        )
    }

    interface HandleSubmitFormProps {
        e: FormEvent;
        subscribe: (formData: any) => void;
    }
    const handleSubmitForm = async ({e, subscribe}: HandleSubmitFormProps) => {
        e.preventDefault();

        if (email === '' || !ValidateEmail(email)) return;

        subscribe({
            EMAIL: email,
        })
    }
    const url = "https://waycupapp.us18.list-manage.com/subscribe/post?u=b096ebe75780f66242fca40b3&id=5852780f27";

    const handleRenderForm = () => {
        const SimpleForm = () => <MailchimpSubscribe url={url}/>

        return (
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <div>
                        <form onSubmit={(e) => handleSubmitForm({
                            e,
                            subscribe: (formData) => subscribe(formData)
                        })} className="flex flex-col lg:flex-row items-center gap-4">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email Address"
                                   className="text-[#434343] bg-gray-50 w-full text-center py-3 rounded-full md:text-lg"/>
                            <input type="submit" value="Notify me"
                                   className="bg-[#FF5E5D] py-3 text-white w-full rounded-full font-medium cursor-pointer lg:w-[50%] md:text-lg"/>
                        </form>
                        {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
                        {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
                    </div>
                )}
            />
        )
    }

    return (
        <>
            <Head>
                <title>Waycup</title>
                <meta name="description" content="Digital loyalty reward tools for independent coffee shops to compete with Starbucks, Costa, Pret a manger and more."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="w-screen overflow-x-hidden relative min-h-screen">
                <main className="w-[90%] m-auto py-6 flex flex-col gap-12 max-w-[1660px] m-auto">
                    <header className="flex items-center">
                        <Image src={Logo} alt="Waycup-logo" width={180}/>
                    </header>
                    <div className="md:grid md:grid-cols-2 gap-4 lg:items-center xl:max-w-[90%] m-auto">
                        <div className="flex flex-col gap-4 lg:gap-8 items-start">
                            <span className="bg-[#FF5E5D] text-white py-0.5 px-6 rounded-full">For businesses</span>
                            <h1 className="font-bold text-xl md:text-3xl leading-7 text-gray-700">
                                Are you an independent coffee shop? We???re building
                                <HighlightedText>digital tools</HighlightedText> for you - and they???re <HighlightedText>
                                FREE!</HighlightedText>
                            </h1>
                            <p className="font-lights leading-6 text-[#555555] xl:text-xl">How can you guarantee that
                                your
                                customers
                                will
                                come back to you once they???ve left your store?
                                We???re building digital tools that will give you that guarantee and so much more. We know
                                the
                                struggles of running an independent business so we???re giving you the digital tools to
                                compete
                                with major coffee chains and it won???t cost you a thing.</p>
                            <div className="w-full hidden md:block md:mt-4">
                                {handleRenderForm()}
                            </div>
                        </div>
                        <div className="md:absolute right-[-150px] w-[60vw] max-w-[1000px] lg:relative">
                            <Barista/>
                        </div>
                    </div>
                    <div className="md:hidden">
                        {handleRenderForm()}
                    </div>
                </main>
            </div>
        </>
    )
}
