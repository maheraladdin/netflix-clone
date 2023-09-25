import {useRouter} from "next/router";
import {ParsedUrlQuery} from "querystring";
import {FieldErrors, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCallback} from "react";
import {signIn} from "next-auth/react";
import axios from "axios";
import * as yup from "yup";

type formValues = {
    name?: string,
    email: string,
    password: string
}

const schema = yup.object({
    name: yup.string().optional(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});

const callbackUrl = "/profiles";

export default function useAuthForm() {
    const router = useRouter();
    const {formType}: ParsedUrlQuery = router.query;


    const {register, control, handleSubmit, formState: {errors}, getValues} = useForm<formValues>({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const onError = (errors: FieldErrors<formValues>) => {
        for (const [_, error] of Object.entries(errors)) {
            console.log(error.message);
        }
    }

    const toggleFormType = async () => {
        router.query.formType = formType === "sign-in" ? "sign-up" : "sign-in";
        await router.replace({query: router.query});
    }

    const signInHandler = useCallback(async () => {
        try {
            await signIn("credentials", {
                email: getValues("email"),
                password: getValues("password"),
                callbackUrl,
            });
        } catch (e) {
            console.log(e);
        }
    },[getValues("email"), getValues("password")]);

    const signUpHandler = useCallback(async () => {
        try {
            await axios.post("/api/user/register", {
                ...getValues()
            });
            await signInHandler();
        } catch (e) {
            console.log(e);
        }
    },[getValues("name"), getValues("email"), getValues("password")]);

    const onSubmit = () => {
        formType === "sign-in" ? signInHandler() : signUpHandler();
    }

    return {
        register,
        control,
        handleSubmit,
        errors,
        onSubmit,
        onError,
        toggleFormType,
        signIn,
        formType,
        callbackUrl
    }

}