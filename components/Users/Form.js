import { useRouter } from 'next/router';
import { useState } from 'react';

import { Link } from 'components/Links/Link';
// import { userService, alertService } from 'services';

export { Form };

function Form(props) {
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    const [isSubmitting, setIsSubmiting] = useState(false);

    // set default form values if user passed in props
    if (!isAddMode) {
        const { password, confirmPassword, ...defaultValues } = user;
        // formOptions.defaultValues = defaultValues;
    }

    function onSubmit(data) {
        setIsSubmiting(true);
        setTimeout(function () {
            setIsSubmiting(false);
        }, 2000);
        return false;
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
        <form onSubmit={onSubmit}>
            <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 mb-4 pr-4">
                    <label
                        className="block uppercase text-white text-xs font-bold mb-1"
                        htmlFor="name"
                    >
                        Nome
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                        placeholder="Nome completo"
                        onChange={() => { }}
                        value={user ? user.name : ""}
                    />
                </div>
                <div className="w-full md:w-6/12 mb-4 pl-4">
                    <label
                        className="block uppercase text-white text-xs font-bold mb-1"
                        htmlFor="name"
                    >
                        E-mail
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                        placeholder="E-mail"
                        onChange={() => { }}
                        value={user ? user.email : ""}
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-6/12 pr-4">
                    <div className="margin-top-link">
                        <Link href="/admin/users" className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm padding-link px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Cancelar</Link>
                    </div>
                </div>
                <div className="w-6/12 pl-4 text-right">
                    <button type="button" onClick={onSubmit} disabled={isSubmitting} className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
                        {isSubmitting && <span className="fas fa-circle-notch fa-spin mr-1"></span>}
                    Salvar
                </button>
                </div>
            </div>
        </form>
    );
}