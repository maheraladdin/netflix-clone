import Image from "next/image";
import {useForm} from "react-hook-form";

export default function Auth() {
    const {register, handleSubmit, formState: {errors}} = useForm();


    return (
        <main>
            <div className={"relative h-screen w-screen bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed brightness-50"}>
                <Image className={"fixed top-5 left-12"} src={"/images/logo.png"} alt={"netflix logo"} width={192} height={51.9}/>
            </div>
            <section className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-16 lg:w-2/5 lg:max-w-md rounded-md w-full"}>
                <h2 className={"text-white text-4xl mb-8 font-semibold text-center"}>
                    Sign In
                </h2>
                <form className={"relative flex flex-col gap-4"}>
                    <div className={"relative flex flex-col gap-4"}>
                        <input id={"email"} className={"sign-in-input"} type="email" placeholder={" "} {...register("email")}/>
                        <label htmlFor="email"> Email </label>
                    </div>
                    <div className={"relative flex flex-col gap-4"}>
                        <input id={"password"} className={"sign-in-input"} type="password" placeholder={" "} {...register("password")}/>
                        <label htmlFor="password"> Password </label>
                    </div>
                </form>
            </section>
        </main>
    )
}