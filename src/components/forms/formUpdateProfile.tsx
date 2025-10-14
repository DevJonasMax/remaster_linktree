import { useForm } from "react-hook-form";
import { schema, updatProfileSchema } from "@/schema/updateProfile.schema";
import Input from "@/components/inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

interface FormUpdateProfileProps {
    defaultValues: updatProfileSchema;
    closeModal: (close: boolean) => void;
}

export default function FormUpdateProfile({
    defaultValues,
    closeModal,
}: FormUpdateProfileProps) {
    const [isPassword, setIsPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<updatProfileSchema>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues,
    });

    useEffect(() => {
        setIsPassword(watch("password") !== "");
    }, [watch("password")]);

    const onSubmit = (data: updatProfileSchema) => {
        // handleUpdateProfile(data);
        console.log(data);
        closeModal(false);
    };
    return (
        <form
            id="formUpdateProfile"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl flex flex-col p-4 gap-4 "
        >
            <div>
                <label htmlFor="username">@usuário</label>
                <Input
                    id="username"
                    name="username"
                    placeholder={`Digite seu "@"/ ex: @usuario `}
                    register={register}
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.username?.message}
                    error={errors.username?.message}
                />
            </div>
            <div>
                <label htmlFor="name">Nome Completo</label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Digite seu nome completo"
                    register={register}
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.name?.message}
                    error={errors.name?.message}
                />
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <Input
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    register={register}
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.password?.message}
                    error={errors.password?.message}
                />
            </div>
            {isPassword && (
                <div>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirme sua senha"
                        register={register}
                        rules={{ required: "Campo obrigatório" }}
                        inputError={!!errors.confirmPassword?.message}
                        error={errors.confirmPassword?.message}
                    />
                </div>
            )}
        </form>
    );
}
