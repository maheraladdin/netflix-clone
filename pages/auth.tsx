import Image from "next/image";
// import {DevTool} from "@hookform/devtools";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import useAuthForm from "@/hooks/auth-form-hook";


export default function Auth() {
    const {
        register,
        // control,
        handleSubmit,
        errors,
        onSubmit,
        onError,
        toggleFormType,
        signIn,
        formType,
        callbackUrl
    } = useAuthForm();

    return (
        <main>
            {/*<DevTool control={control} placement={"top-right"}/>*/}
            <div className={"relative h-screen w-screen bg-black sm:bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed sm:brightness-50"}>
                <Image className={"fixed top-5 left-5 sm:left-12 scale-50 sm:scale-100 origin-top-left"} src={"/images/logo.png"} alt={"netflix logo"} width={192} height={51.9}/>
            </div>
            <section className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-16 h-screen sm:h-fit sm:w-3/5 sm:max-w-md rounded-md w-screen flex flex-col gap-8 justify-center items-center"}>
                <h2 className={"text-white text-4xl font-semibold self-start"}>
                    {formType === "sign-in" ? "Sign in" : "Sign up"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit, onError)} className={"relative flex flex-col gap-8 w-full"}>
                    {
                        formType !== "sign-in" &&
                        <div className={"relative flex flex-col gap-4"}>
                            <div className={"relative flex flex-col gap-4"}>
                                <input id={"name"} className={"sign-in-input"} type="text"
                                       placeholder={" "} {...register("name")}/>
                                <label htmlFor={"name"}> Username </label>
                            </div>
                            <p className={"text-red-900"}>{errors.name?.message}</p>
                        </div>
                    }
                    <div className={"relative flex flex-col gap-4"}>
                        <div className={"relative flex flex-col gap-4"}>
                            <input id={"email"} className={"sign-in-input"} type="email" placeholder={" "} {...register("email")}/>
                            <label htmlFor="email"> Email </label>
                        </div>
                        <p className={"text-red-900"}>{errors.email?.message}</p>
                    </div>
                    <div className={"relative flex flex-col gap-4"}>
                        <div className={"relative flex flex-col gap-4"}>
                            <input id={"password"} className={"sign-in-input"} type="password" placeholder={" "} {...register("password")}/>
                            <label htmlFor="password"> Password </label>
                        </div>
                        <p className={"text-red-900"}>{errors.password?.message}</p>
                    </div>
                    <button className={"bg-red-600 hover:bg-red-700 transition text-white rounded-md py-3"}>
                        {formType === "sign-in" ? "Sign in" : "Sign up"}
                    </button>

                    <div className={"flex gap-4 justify-center"}>
                        <div
                            onClick={_ => signIn("google", {
                                callbackUrl,
                            })}
                            role={"button"} className={"icon-container"}>
                            <FcGoogle size={"30"}/>
                        </div>
                        <div
                            onClick={_ => signIn("facebook", {
                                callbackUrl,
                            })}
                            role={"button"}
                            className={"icon-container"}
                        >
                            <FaFacebook color={"#4267B2"} size={"30"}/>
                        </div>
                    </div>

                    <p className={"text-neutral-700 flex gap-2"}>
                        {
                            formType === "sign-in" ? (
                                <>
                                    New to Netflix?
                                    <span
                                        onClick={toggleFormType}
                                        role={"button"}
                                        className={"relative block text-white after:content-[''] after:absolute after:h-0.5 after:w-0 after:hover:w-full after:bg-white after:bottom-0 after:left-0 after:transition-all after:duration-300"}
                                    >
                                        Sign up now.
                                    </span>
                                </>
                            ) : (
                                <>
                                    Already have an account?
                                    <span
                                    onClick={toggleFormType}
                                        role={"button"}
                                        className={"relative block text-white after:content-[''] after:absolute after:h-0.5 after:w-0 after:hover:w-full after:bg-white after:bottom-0 after:left-0 after:transition-all after:duration-300"}
                                    >
                                        Sign in now.
                                    </span>
                                </>
                            )
                        }
                    </p>
                </form>
            </section>
        </main>
    )
}