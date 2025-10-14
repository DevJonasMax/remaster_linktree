"use client";
import { useForm } from "react-hook-form";
import { schema, formSchema } from "@/schema/formRegister.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/inputs";
import Button from "@/components/button";

export default function FormRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formSchema>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data: formSchema) => {
        console.log(data);
    };

    return (
        <form
            className="w-full max-w-2xl flex flex-col p-4 gap-4 "
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full  flex flex-col">
                <label htmlFor="username">Username*</label>
                <Input
                    register={register}
                    name="username"
                    id="username"
                    type="text"
                    placeholder="@user"
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.username?.message}
                    error={errors.username?.message}
                />
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="name">Name Completo*</label>
                <Input
                    register={register}
                    name="name"
                    placeholder="Nome Completo"
                    type="text"
                    id="name"
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.name?.message}
                    error={errors.name?.message}
                />
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="email">Email*</label>
                <Input
                    register={register}
                    name="email"
                    placeholder="email@example.com"
                    type="email"
                    id="email"
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.email?.message}
                    error={errors.email?.message}
                />
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="password">Password*</label>
                <Input
                    register={register}
                    name="password"
                    placeholder="Mínimo 6 caracteres"
                    type="password"
                    id="password"
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.password?.message}
                    error={errors.password?.message}
                />
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="confirmPassword">Confirmar Password*</label>
                <Input
                    register={register}
                    name="confirmPassword"
                    placeholder="Mínimo 6 caracteres"
                    type="password"
                    id="confirmPassword"
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.confirmPassword?.message}
                    error={errors.confirmPassword?.message}
                />
            </div>
            <div className="w-full flex flex-col">
                <Button type="submit">Cadastrar</Button>
            </div>
        </form>
    );
}
