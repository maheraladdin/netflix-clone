import Image from "next/image";
import {FieldErrors, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {DevTool} from "@hookform/devtools";

type formValues = {
    email: string,
    password: string
}

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})

export default function Auth() {
    const {register, control, handleSubmit, formState: {errors}} = useForm<formValues>({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: formValues) => {
        console.log(data);
    }

    const onError = (errors: FieldErrors<formValues>) => {
        for (const [_, error] of Object.entries(errors)) {
            console.log(error.message);
        }
    }


    return (
        <main>
            <DevTool control={control} placement={"top-right"}/>
            <div className={"relative h-screen w-screen bg-black sm:bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed sm:brightness-50"}>
                <Image className={"fixed top-5 left-5 sm:left-12 scale-50 sm:scale-100 origin-top-left"} src={"/images/logo.png"} alt={"netflix logo"} width={192} height={51.9}/>
            </div>
            <section className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-16 h-screen sm:h-fit sm:w-3/5 sm:max-w-md rounded-md w-screen flex flex-col justify-center items-center"}>
                <h2 className={"text-white text-4xl mb-8 font-semibold self-start px-5"}>
                    Sign In
                </h2>
                <form onSubmit={handleSubmit(onSubmit, onError)} className={"relative flex flex-col gap-8"}>
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
                    <button className={"bg-red-600 text-white rounded-md py-3"}>
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    )
}