import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link } from '../Links/Link';

export { FormUser };

function FormUser(props) {
    const { register, handleSubmit } = useForm();
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    const [isSubmitting, setIsSubmiting] = useState(false);

    // set default form values if user passed in props
    if (!isAddMode) {
        const { password, confirmPassword, ...defaultValues } = user;
        // formOptions.defaultValues = defaultValues;
    }

    async function handleInsert(data) {
        console.log(data);
        // return isAddMode
        //     ? createUser(data)
        //     : updateUser(user.id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(handleInsert)}>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-24 shadow-lg rounded-lg bg-gray-800 border-0 mt-16">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="w-full px-4 flex justify-center">
                                <div className="relative">
                                    {
                                        (false) ? (
                                            <img
                                                alt="..."
                                                src="/img/team-2-800x800.jpg"
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        ) : (
                                            <span id="image-default-profile" className="text-sm text-emerald-500 bg-gray-700 shadow-xl inline-flex items-center justify-center rounded-full -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                                                <i className="fas fa-user rounded-full align-middle border-none shadow-lg icon-user"></i>
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-20">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-white text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                                            placeholder="Primeiro nome"
                                            {...register('name')}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-white text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Sobrenome
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                                            placeholder="Sobrenome"
                                            {...register('surname')}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-white text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                                            placeholder="E-mail"
                                            {...register('email')}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-white text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Tipo
                                        </label>
                                        <select 
                                            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                                            {...register('type')}
                                            >
                                            <option value="">Selecione...</option>
                                            <option value="1">Administrador</option>
                                            <option value="2">Usuário</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-white text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Senha
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                                            placeholder="Senha"
                                            {...register('paswword')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-6/12 px-4 pt-6">
                                    <div className="margin-top-link">
                                        <Link href="/admin/users" className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm padding-link px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Cancelar</Link>
                                    </div>
                                </div>
                                <div className="w-6/12 px-4 text-right pt-6">
                                    <button type="submit" disabled={isSubmitting} className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
                                        {isSubmitting && <span className="fas fa-circle-notch fa-spin mr-1"></span>}
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}