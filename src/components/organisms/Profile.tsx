import { useEffect, useState } from 'react';
import Repositories from './Repositories';

import { Profile, Repo } from '../../types/types';



const UserProfile = (props: { person: Profile }) => {
    const [result, setResult] = useState<Repo[]>([])

    useEffect(() => {
        fetch(`${props.person.repos_url}`)
            .then(res => res.json())
            .then(data => setResult(data))
    }, [props.person.repos_url])



    return (
        <><div>
            <details className="w-full border rounded-lg my-2 bg-slate-100">
                <summary style={{ listStyle: "none" }}><div className='flex flex-col'>
                    <div className='bg-slate-100  p-4 '>
                        <div className='flex-none sm:flex'><div className='relative h-32 w-32   sm:mb-0 mb-3'>
                            <img src={props.person.avatar_url} alt="aji" className=" w-32 h-32 object-cover rounded-2xl" />
                        </div>
                            <div className='flex-auto  justify-evenly'>
                                <div className='flex items-center justify-between sm:mt-2'>
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <div className="w-full flex-none text-lg text-black font-bold leading-none mx-2">{props.person.login}</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div></summary>
                {
                    result.length > 0 ?
                        result?.map((repository, i) => <Repositories key={i} repository={repository}></Repositories>)
                        : <p className='text-gray-500'> No repository found</p>
                }
            </details>

        </div></>

    );
};

export default UserProfile;