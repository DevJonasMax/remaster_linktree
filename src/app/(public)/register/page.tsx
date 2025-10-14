"use client";
import FormRegister from "@/components/forms/formRegister";

export default function Register() {
    return (
        <div className="w-full h-[90vh] flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl flex flex-col items-center justify-center border rounded-2xl ">
                <h1 className="text-2xl font-bold my-4">Cadastro</h1>
                <FormRegister />
            </div>
        </div>
    );
}
